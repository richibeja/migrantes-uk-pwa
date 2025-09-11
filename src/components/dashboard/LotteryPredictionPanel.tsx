'use client';

import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Clock, Star } from 'lucide-react';

interface Prediction {
  id: string;
  lotteryName: string;
  numbers: number[];
  specialBall?: number;
  confidence: number;
  method: string;
  lastUpdated: string;
  nextUpdate: string;
}

interface AnalysisResult {
  id: string;
  lotteryName: string;
  method: string;
  confidence: number;
  numbers: number[];
  specialBall?: number;
  timestamp: string;
}

export default function LotteryPredictionPanel() {
    return (
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLottery, setSelectedLottery] = useState<string>('all');

  useEffect(() => {
    // Simular carga de datos
    const mockPredictions: Prediction[] = [
      {
        id: '1',
        lotteryName: 'Powerball',
        numbers: [7, 15, 23, 31, 42],
        specialBall: 12,
        confidence: 87,
        method: 'Análisis Avanzado',
        lastUpdated: '2024-01-15 14:30',
        nextUpdate: '2024-01-15 15:30'
      },
      {
        id: '2',
        lotteryName: 'Mega Millions',
        numbers: [3, 11, 19, 27, 35],
        specialBall: 8,
        confidence: 85,
        method: 'Patrones Históricos',
        lastUpdated: '2024-01-15 14:25',
        nextUpdate: '2024-01-15 15:25'
      }
    ];

    const mockAnalysis: AnalysisResult[] = [
      {
        id: '1',
        lotteryName: 'Powerball',
        method: 'Análisis Probabilístico',
        confidence: 89,
        numbers: [7, 15, 23, 31, 42],
        specialBall: 12,
        timestamp: '2024-01-15 14:30'
      }
    ];

    setTimeout(() => {
      setPredictions(mockPredictions);
      setAnalysis(mockAnalysis);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredPredictions = selectedLottery === 'all' 
    ? predictions 
    : predictions.filter(p => p.lotteryName === selectedLottery);

  if (isLoading) {
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Panel de Predicciones</h2>
        <select
          value={selectedLottery}
          onChange={(e) => setSelectedLottery(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
        >
          <option value="all">Todas las Loterías</option>
          <option value="Powerball">Powerball</option>
          <option value="Mega Millions">Mega Millions</option>
          <option value="EuroMillions">EuroMillions</option>
        </select>
      </div>

      {/* Predicciones */}
      <div className="space-y-4 mb-6">
        {filteredPredictions.map((prediction) => (
          <div key={prediction.id} className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{prediction.lotteryName}</h3>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-gold" />
                <span className="text-gold font-bold">{prediction.confidence}%</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-3">
              {prediction.numbers.map((number, index) => (
                <div key={index} className="bg-gold text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {number}
                </div>
              ))}
              {prediction.specialBall && (
                <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {prediction.specialBall}
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{prediction.method}</span>
              <span>Actualizado: {prediction.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Análisis */}
      {analysis.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Análisis Recientes</h3>
          <div className="space-y-3">
            {analysis.map((item) => (
              <div key={item.id} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{item.lotteryName}</span>
                  <span className="text-gold font-bold">{item.confidence}%</span>
                </div>
                <div className="text-sm text-gray-400">{item.method}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Acción única */}
      <div className="text-center">
        <button className="bg-gold text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
          📊 Ver Análisis Completo
        </button>
      </div>
    </div>
  );
}