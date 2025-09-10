import { useState, useEffect, useCallback } from 'react';
import { getAllLotteryResults, generateAllPredictions, LotteryResult, PredictionResult } from '@/lib/lottery-apis';

export interface RealtimeLotteryData {
  results: LotteryResult[];
  predictions: PredictionResult[];
  lastUpdate: string;
  isLive: boolean;
  error: string | null;
}

export function useRealtimeLottery() {
  const [data, setData] = useState<RealtimeLotteryData>({
    results: [],
    predictions: [],
    lastUpdate: '',
    isLive: false,
    error: null
  });

  const [isLoading, setIsLoading] = useState(true);

  const updateData = useCallback(async () => {
    try {
      setIsLoading(true);
      setData(prev => ({ ...prev, error: null }));

      // Obtener resultados y predicciones en paralelo
      const [results, predictions] = await Promise.all([
        getAllLotteryResults(),
        generateAllPredictions()
      ]);

      setData({
        results,
        predictions,
        lastUpdate: new Date().toISOString(),
        isLive: true,
        error: null
      });

      // Guardar en localStorage para persistencia
      localStorage.setItem('lotteryData', JSON.stringify({
        results,
        predictions,
        lastUpdate: new Date().toISOString()
      }));

    } catch (error) {
      console.error('Error updating lottery data:', error);
      setData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error',
        isLive: false
      }));

      // Intentar cargar datos del localStorage como respaldo
      try {
        const cachedData = localStorage.getItem('lotteryData');
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setData(prev => ({
            ...prev,
            results: parsed.results || [],
            predictions: parsed.predictions || [],
            lastUpdate: parsed.lastUpdate || '',
            isLive: false
          }));
        }
      } catch (cacheError) {
        console.error('Error loading cached data:', cacheError);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Actualización inicial
  useEffect(() => {
    updateData();
  }, [updateData]);

  // Actualizaciones automáticas cada 5 minutos
  useEffect(() => {
    const interval = setInterval(updateData, 5 * 60 * 1000); // 5 minutos
    return () => clearInterval(interval);
  }, [updateData]);

  // Actualización manual
  const refresh = useCallback(() => {
    updateData();
  }, [updateData]);

  // Obtener predicciones para una lotería específica
  const getPredictionsForLottery = useCallback((lotteryId: string) => {
    return data.predictions.filter(p => p.lotteryId === lotteryId);
  }, [data.predictions]);

  // Obtener resultado para una lotería específica
  const getResultForLottery = useCallback((lotteryId: string) => {
    return data.results.find(r => r.id === lotteryId);
  }, [data.results]);

  // Obtener predicciones por método
  const getPredictionsByMethod = useCallback((method: string) => {
    return data.predictions.filter(p => p.method === method);
  }, [data.predictions]);

  // Calcular precisión de predicciones
  const calculateAccuracy = useCallback((lotteryId: string) => {
    const predictions = getPredictionsForLottery(lotteryId);
    const result = getResultForLottery(lotteryId);
    
    if (!result || predictions.length === 0) return 0;

    let totalAccuracy = 0;
    let count = 0;

    predictions.forEach(prediction => {
      const matches = prediction.numbers.filter(num => 
        result.numbers.includes(num)
      ).length;
      
      const accuracy = (matches / result.numbers.length) * 100;
      totalAccuracy += accuracy;
      count++;
    });

    return count > 0 ? totalAccuracy / count : 0;
  }, [getPredictionsForLottery, getResultForLottery]);

  return {
    ...data,
    isLoading,
    refresh,
    getPredictionsForLottery,
    getResultForLottery,
    getPredictionsByMethod,
    calculateAccuracy
  };
}
