'use client';

import { useState, useEffect, useCallback } from 'react';
import { getRealTimeUSResults, USLotteryResult } from '@/lib/us-lottery-apis';

export interface RealTimeUSLotteryData {
  results: USLotteryResult[];
  lastUpdate: string;
  isLive: boolean;
  error: string | null;
  nextUpdate: string;
}

export function useRealTimeUSLottery() {
  const [data, setData] = useState<RealTimeUSLotteryData>({
    results: [],
    lastUpdate: '',
    isLive: false,
    error: null,
    nextUpdate: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  const updateData = useCallback(async () => {
    try {
      setIsLoading(true);
      setData(prev => ({ ...prev, error: null }));

      console.log('🔄 Actualizando datos de loterías de EE.UU...');
      const results = await getRealTimeUSResults();

      const now = new Date();
      const nextUpdate = new Date(now.getTime() + 2 * 60 * 1000); // Próxima actualización en 2 minutos

      setData({
        results,
        lastUpdate: now.toISOString(),
        isLive: true,
        error: null,
        nextUpdate: nextUpdate.toISOString()
      });

      setUpdateCount(prev => prev + 1);
      console.log(`✅ Datos actualizados (${updateCount + 1} actualizaciones)`);

      // Guardar en localStorage para persistencia
      localStorage.setItem('usLotteryData', JSON.stringify({
        results,
        lastUpdate: now.toISOString(),
        updateCount: updateCount + 1
      }));

    } catch (error) {
      console.error('❌ Error actualizando datos de loterías:', error);
      setData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error desconocido',
        isLive: false
      }));

      // Intentar cargar datos del localStorage como respaldo
      try {
        const cachedData = localStorage.getItem('usLotteryData');
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setData(prev => ({
            ...prev,
            results: parsed.results || [],
            lastUpdate: parsed.lastUpdate || '',
            isLive: false
          }));
        }
      } catch (cacheError) {
        console.error('Error cargando datos en caché:', cacheError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [updateCount]);

  // Actualización inicial
  useEffect(() => {
    updateData();
  }, []);

  // Actualizaciones automáticas cada 2 minutos
  useEffect(() => {
    const interval = setInterval(updateData, 2 * 60 * 1000); // 2 minutos
    return () => clearInterval(interval);
  }, [updateData]);

  // Actualización manual
  const refresh = useCallback(() => {
    updateData();
  }, [updateData]);

  // Obtener resultados para una lotería específica
  const getResultsForLottery = useCallback((lotteryId: string) => {
    return data.results.find(r => r.id === lotteryId);
  }, [data.results]);

  // Obtener loterías por estado
  const getLotteriesByStatus = useCallback((status: 'real' | 'fallback') => {
    return data.results.filter(r => r.source === status);
  }, [data.results]);

  // Obtener loterías con jackpot más alto
  const getHighestJackpotLotteries = useCallback(() => {
    return data.results
      .filter(r => r.jackpot && r.jackpot !== '$1,000 daily for life')
      .sort((a, b) => {
        const aValue = parseFloat(a.jackpot.replace(/[$,]/g, ''));
        const bValue = parseFloat(b.jackpot.replace(/[$,]/g, ''));
        return bValue - aValue;
      });
  }, [data.results]);

  // Obtener loterías con próximos sorteos
  const getUpcomingDraws = useCallback(() => {
    const now = new Date();
    return data.results
      .filter(r => {
        const nextDraw = new Date(r.nextDraw);
        const timeDiff = nextDraw.getTime() - now.getTime();
        return timeDiff > 0 && timeDiff < 24 * 60 * 60 * 1000; // Próximas 24 horas
      })
      .sort((a, b) => new Date(a.nextDraw).getTime() - new Date(b.nextDraw).getTime());
  }, [data.results]);

  // Obtener estadísticas generales
  const getStatistics = useCallback(() => {
    const totalLotteries = data.results.length;
    const realDataCount = data.results.filter(r => r.source === 'real').length;
    const fallbackDataCount = data.results.filter(r => r.source === 'fallback').length;
    const totalWinners = data.results.reduce((sum, r) => sum + r.winners.jackpot, 0);
    const averageJackpot = data.results.reduce((sum, r) => {
      const value = parseFloat(r.jackpot.replace(/[$,]/g, ''));
      return sum + (isNaN(value) ? 0 : value);
    }, 0) / totalLotteries;

    return {
      totalLotteries,
      realDataCount,
      fallbackDataCount,
      totalWinners,
      averageJackpot: Math.round(averageJackpot),
      dataAccuracy: totalLotteries > 0 ? Math.round((realDataCount / totalLotteries) * 100) : 0
    };
  }, [data.results]);

  // Obtener loterías con números más frecuentes
  const getFrequentNumbers = useCallback(() => {
    const numberCount: Record<number, number> = {};
    
    data.results.forEach(result => {
      result.numbers.forEach(num => {
        numberCount[num] = (numberCount[num] || 0) + 1;
      });
    });

    return Object.entries(numberCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([num, count]) => ({ number: parseInt(num), count }));
  }, [data.results]);

  return {
    ...data,
    isLoading,
    updateCount,
    refresh,
    getResultsForLottery,
    getLotteriesByStatus,
    getHighestJackpotLotteries,
    getUpcomingDraws,
    getStatistics,
    getFrequentNumbers
  };
}
