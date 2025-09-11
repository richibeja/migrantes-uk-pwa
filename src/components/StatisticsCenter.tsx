'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award, 
  Calendar,
  DollarSign,
  Users,
  Zap,
  Star,
  Trophy
} from 'lucide-react';

interface PredictionStats {
  totalPredictions: number;
  correctPredictions: number;
  accuracyRate: number;
  totalWinnings: number;
  bestStreak: number;
  currentStreak: number;
  favoriteLottery: string;
  averageConfidence: number;
  monthlyStats: MonthlyStats[];
  lotteryStats: LotteryStats[];
}

interface MonthlyStats {
  month: string;
  predictions: number;
  accuracy: number;
  winnings: number;
}

interface LotteryStats {
  lotteryId: string;
  lotteryName: string;
  predictions: number;
  accuracy: number;
  winnings: number;
  bestPrediction: number;
}

export default function StatisticsCenter() {

  const [stats, setStats] = useState<PredictionStats | null>(null);
  return (
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, [selectedPeriod]);

  const loadStatistics = async () => {
    setIsLoading(true);
    
    // Simular carga de estadísticas
    setTimeout(() => {
      const mockStats: PredictionStats = {
        totalPredictions: 247,
        correctPredictions: 89,
        accuracyRate: 36.0,
        totalWinnings: 15420,
        bestStreak: 12,
        currentStreak: 3,
        favoriteLottery: 'Powerball',
        averageConfidence: 87.5,
        monthlyStats: [
          { month: 'Ene', predictions: 45, accuracy: 42.2, winnings: 2100 },
          { month: 'Feb', predictions: 52, accuracy: 38.5, winnings: 1800 },
          { month: 'Mar', predictions: 48, accuracy: 41.7, winnings: 2200 },
          { month: 'Abr', predictions: 51, accuracy: 35.3, winnings: 1900 },
          { month: 'May', predictions: 49, accuracy: 40.8, winnings: 2050 },
          { month: 'Jun', predictions: 46, accuracy: 43.5, winnings: 2300 },
          { month: 'Jul', predictions: 44, accuracy: 36.4, winnings: 1750 },
          { month: 'Ago', predictions: 47, accuracy: 38.3, winnings: 1950 },
          { month: 'Sep', predictions: 50, accuracy: 40.0, winnings: 2000 },
          { month: 'Oct', predictions: 48, accuracy: 37.5, winnings: 1850 },
          { month: 'Nov', predictions: 46, accuracy: 41.3, winnings: 2100 },
          { month: 'Dic', predictions: 43, accuracy: 39.5, winnings: 1920 }
        ],
        lotteryStats: [
          { lotteryId: 'powerball', lotteryName: 'Powerball', predictions: 89, accuracy: 42.7, winnings: 6200, bestPrediction: 97 },
          { lotteryId: 'mega-millions', lotteryName: 'Mega Millions', predictions: 76, accuracy: 38.2, winnings: 4800, bestPrediction: 94 },
          { lotteryId: 'euromillions', lotteryName: 'EuroMillions', predictions: 45, accuracy: 35.6, winnings: 2100, bestPrediction: 91 },
          { lotteryId: 'baloto', lotteryName: 'Baloto', predictions: 37, accuracy: 40.5, winnings: 2320, bestPrediction: 89 }
        ]
      };
      
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 40) return 'text-green-600';
    if (accuracy >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 40) return 'bg-green-100 text-green-800';
    if (accuracy >= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (isLoading) {
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-8 h-8 text-yellow-500" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Centro de Estadísticas</h2>
            <p className="text-gray-600">Rendimiento de tus predicciones</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period === 'week' ? 'Semana' : period === 'month' ? 'Mes' : 'Año'}
            </button>
          ))}
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Predicciones</p>
              <p className="text-3xl font-bold">{stats.totalPredictions}</p>
            </div>
            <Target className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Tasa de Acierto</p>
              <p className="text-3xl font-bold">{stats.accuracyRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Ganancias Totales</p>
              <p className="text-3xl font-bold">${stats.totalWinnings.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Mejor Racha</p>
              <p className="text-3xl font-bold">{stats.bestStreak}</p>
            </div>
            <Trophy className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Gráfico de Rendimiento Mensual */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Rendimiento Mensual</h3>
        <div className="space-y-4">
          {stats.monthlyStats.map((month, index) => (
            <div key={month.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{month.month}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">{month.predictions} predicciones</span>
                  <span className={`text-sm font-medium ${getAccuracyColor(month.accuracy)}`}>
                    {month.accuracy}% acierto
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${month.accuracy}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-20 text-right">
                <span className="text-sm font-medium text-green-600">
                  ${month.winnings.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas por Lotería */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Rendimiento por Lotería</h3>
        <div className="space-y-4">
          {stats.lotteryStats.map((lottery) => (
            <div key={lottery.lotteryId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{lottery.lotteryName}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAccuracyBadge(lottery.accuracy)}`}>
                  {lottery.accuracy}% acierto
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Predicciones</p>
                  <p className="font-semibold text-gray-900">{lottery.predictions}</p>
                </div>
                <div>
                  <p className="text-gray-600">Ganancias</p>
                  <p className="font-semibold text-green-600">${lottery.winnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Mejor Predicción</p>
                  <p className="font-semibold text-yellow-600">{lottery.bestPrediction}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Promedio</p>
                  <p className="font-semibold text-blue-600">${Math.round(lottery.winnings / lottery.predictions)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logros y Reconocimientos */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🏆 Logros y Reconocimientos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6" />
              <div>
                <p className="font-semibold">Predicción Perfecta</p>
                <p className="text-sm opacity-90">97% de confianza en Powerball</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6" />
              <div>
                <p className="font-semibold">Racha de Éxito</p>
                <p className="text-sm opacity-90">{stats.bestStreak} predicciones seguidas</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6" />
              <div>
                <p className="font-semibold">Lotería Favorita</p>
                <p className="text-sm opacity-90">{stats.favoriteLottery}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de Rendimiento */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen de Rendimiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Métricas Clave</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Promedio de Confianza</span>
                <span className="font-semibold">{stats.averageConfidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Racha Actual</span>
                <span className="font-semibold">{stats.currentStreak}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Predicciones Correctas</span>
                <span className="font-semibold">{stats.correctPredictions}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recomendaciones</h4>
            <div className="space-y-2 text-sm">
              <p className="text-green-600">✅ Excelente rendimiento en Powerball</p>
              <p className="text-yellow-600">⚠️ Considera más predicciones en EuroMillions</p>
              <p className="text-blue-600">💡 Tu confianza promedio es muy alta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
