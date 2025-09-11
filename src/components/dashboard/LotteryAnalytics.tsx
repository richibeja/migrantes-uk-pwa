'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Target, Award } from 'lucide-react';

interface AnalyticsData {
  lottery: string;
  accuracy: number;
  totalPredictions: number;
  successfulPredictions: number;
  averageConfidence: number;
  trend: 'up' | 'down' | 'stable';
}

export default function LotteryAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    // Simular carga de datos
    const mockData: AnalyticsData[] = [
      {
        lottery: 'Powerball',
        accuracy: 87.5,
        totalPredictions: 1250,
        successfulPredictions: 1094,
        averageConfidence: 89.2,
        trend: 'up'
      },
      {
        lottery: 'Mega Millions',
        accuracy: 82.3,
        totalPredictions: 980,
        successfulPredictions: 807,
        averageConfidence: 85.7,
        trend: 'stable'
      },
      {
        lottery: 'EuroMillions',
        accuracy: 79.8,
        totalPredictions: 750,
        successfulPredictions: 599,
        averageConfidence: 83.1,
        trend: 'up'
      }
    ];

    setTimeout(() => {
      setAnalytics(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Analytics de Loterías</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
        >
          <option value="7d">Últimos 7 días</option>
          <option value="30d">Últimos 30 días</option>
          <option value="90d">Últimos 90 días</option>
        </select>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gold mb-1">
            {analytics.reduce((acc, curr) => acc + curr.totalPredictions, 0)}
          </div>
          <div className="text-gray-400 text-sm">Predicciones Totales</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {(analytics.reduce((acc, curr) => acc + curr.accuracy, 0) / analytics.length).toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm">Precisión Promedio</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {analytics.reduce((acc, curr) => acc + curr.successfulPredictions, 0)}
          </div>
          <div className="text-gray-400 text-sm">Predicciones Exitosas</div>
        </div>
      </div>

      {/* Detalles por lotería */}
      <div className="space-y-4">
        {analytics.map((item, index) => (
          <div key={index} className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{item.lottery}</h3>
              <div className={`flex items-center space-x-1 ${
                item.trend === 'up' ? 'text-green-400' : 
                item.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${
                  item.trend === 'down' ? 'rotate-180' : ''
                }`} />
                <span className="text-sm">{item.trend === 'up' ? 'Subiendo' : item.trend === 'down' ? 'Bajando' : 'Estable'}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-gold">{item.accuracy}%</div>
                <div className="text-gray-400 text-xs">Precisión</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">{item.totalPredictions}</div>
                <div className="text-gray-400 text-xs">Total</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">{item.successfulPredictions}</div>
                <div className="text-gray-400 text-xs">Exitosas</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">{item.averageConfidence}%</div>
                <div className="text-gray-400 text-xs">Confianza</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Acción única */}
      <div className="mt-6 text-center">
        <button className="bg-gold text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
          📊 Ver Análisis Completo
        </button>
      </div>
    </div>
  );
}