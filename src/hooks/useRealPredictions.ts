'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateRealPrediction, RealPredictionResult } from '@/lib/real-prediction-engine';

export interface RealPredictionData {
  predictions: RealPredictionResult[];
  lastUpdate: string;
  isGenerating: boolean;
  error: string | null;
  accuracy: number;
}

export function useRealPredictions() {
  const [data, setData] = useState<RealPredictionData>({
    predictions: [],
    lastUpdate: '',
    isGenerating: false,
    error: null,
    accuracy: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  const generatePredictions = useCallback(async () => {
    try {
      setIsLoading(true);
      setData(prev => ({ ...prev, error: null, isGenerating: true }));

      console.log('🎯 Generando predicciones REALES...');
      
      const lotteryIds = ['powerball', 'mega-millions', 'euromillions'];
      const methods = ['advanced', 'frequency', 'pattern'];
      
      const predictions: RealPredictionResult[] = [];
      
      // Generar predicciones para cada lotería con diferentes métodos
      for (const lotteryId of lotteryIds) {
        for (const method of methods) {
          try {
            const prediction = await generateRealPrediction(lotteryId, method);
            predictions.push(prediction);
          } catch (error) {
            console.error(`Error generating prediction for ${lotteryId} with ${method}:`, error);
          }
        }
      }

      // Calcular precisión promedio
      const totalAccuracy = predictions.reduce((sum, pred) => sum + pred.accuracy, 0);
      const averageAccuracy = predictions.length > 0 ? totalAccuracy / predictions.length : 0;

      const now = new Date();
      setData({
        predictions,
        lastUpdate: now.toISOString(),
        isGenerating: false,
        error: null,
        accuracy: Math.round(averageAccuracy * 100) / 100
      });

      setUpdateCount(prev => prev + 1);
      console.log(`✅ Predicciones REALES generadas: ${predictions.length} predicciones`);

      // Guardar en localStorage para persistencia
      localStorage.setItem('realPredictions', JSON.stringify({
        predictions,
        lastUpdate: now.toISOString(),
        accuracy: averageAccuracy,
        updateCount: updateCount + 1
      }));

    } catch (error) {
      console.error('❌ Error generando predicciones reales:', error);
      setData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error desconocido',
        isGenerating: false
      }));

      // Intentar cargar datos del localStorage como respaldo
      try {
        const cachedData = localStorage.getItem('realPredictions');
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setData(prev => ({
            ...prev,
            predictions: parsed.predictions || [],
            lastUpdate: parsed.lastUpdate || '',
            accuracy: parsed.accuracy || 0,
            isGenerating: false
          }));
        }
      } catch (cacheError) {
        console.error('Error cargando predicciones en caché:', cacheError);
      }
    } finally {
      setIsLoading(false);
    }
  }, [updateCount]);

  // Generación inicial
  useEffect(() => {
    generatePredictions();
  }, []);

  // Actualizaciones automáticas cada 10 minutos
  useEffect(() => {
    const interval = setInterval(generatePredictions, 10 * 60 * 1000); // 10 minutos
    return () => clearInterval(interval);
  }, [generatePredictions]);

  // Actualización manual
  const refresh = useCallback(() => {
    generatePredictions();
  }, [generatePredictions]);

  // Obtener predicciones para una lotería específica
  const getPredictionsForLottery = useCallback((lotteryId: string) => {
    return data.predictions.filter(p => p.lotteryId === lotteryId);
  }, [data.predictions]);

  // Obtener predicciones por método
  const getPredictionsByMethod = useCallback((method: string) => {
    return data.predictions.filter(p => p.method === method);
  }, [data.predictions]);

  // Obtener predicciones con mayor confianza
  const getHighestConfidencePredictions = useCallback(() => {
    return data.predictions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);
  }, [data.predictions]);

  // Obtener predicciones más recientes
  const getLatestPredictions = useCallback(() => {
    return data.predictions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 6);
  }, [data.predictions]);

  // Obtener estadísticas
  const getStatistics = useCallback(() => {
    const totalPredictions = data.predictions.length;
    const averageConfidence = data.predictions.reduce((sum, p) => sum + p.confidence, 0) / totalPredictions;
    const averageAccuracy = data.accuracy;
    
    const methodCounts = data.predictions.reduce((acc, p) => {
      acc[p.method] = (acc[p.method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const lotteryCounts = data.predictions.reduce((acc, p) => {
      acc[p.lotteryId] = (acc[p.lotteryId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalPredictions,
      averageConfidence: Math.round(averageConfidence * 10) / 10,
      averageAccuracy,
      methodCounts,
      lotteryCounts,
      updateCount
    };
  }, [data.predictions, data.accuracy, updateCount]);

  // Generar nueva predicción para una lotería específica
  const generateNewPrediction = useCallback(async (lotteryId: string, method: string = 'advanced') => {
    try {
      setData(prev => ({ ...prev, isGenerating: true, error: null }));
      
      const prediction = await generateRealPrediction(lotteryId, method);
      
      setData(prev => ({
        ...prev,
        predictions: [prediction, ...prev.predictions],
        isGenerating: false,
        lastUpdate: new Date().toISOString()
      }));
      
      return prediction;
    } catch (error) {
      console.error('Error generando nueva predicción:', error);
      setData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error generando predicción',
        isGenerating: false
      }));
      throw error;
    }
  }, []);

  // Analizar predicción específica
  const analyzePrediction = useCallback((predictionId: string) => {
    const prediction = data.predictions.find(p => p.id === predictionId);
    if (!prediction) return null;

    return {
      id: prediction.id,
      lotteryId: prediction.lotteryId,
      numbers: prediction.numbers,
      specialNumbers: prediction.specialNumbers,
      confidence: prediction.confidence,
      method: prediction.method,
      analysis: prediction.analysis,
      accuracy: prediction.accuracy,
      timestamp: prediction.timestamp
    };
  }, [data.predictions]);

  return {
    ...data,
    isLoading,
    updateCount,
    refresh,
    getPredictionsForLottery,
    getPredictionsByMethod,
    getHighestConfidencePredictions,
    getLatestPredictions,
    getStatistics,
    generateNewPrediction,
    analyzePrediction
  };
}
