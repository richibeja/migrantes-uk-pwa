'use client';

import { useState, useEffect } from 'react';
import { Brain, Target, BarChart3, TrendingUp, Users, Zap, Crown, CheckCircle } from 'lucide-react';

interface PredictionData {
  id: string;
  numbers: number[];
  confidence: number;
  createdAt: Date;
  isCorrect?: boolean;
}

interface DashboardStats {
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
  activeUsers: number;
  todayPredictions: number;
}

export default function AnbelAIDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPredictions: 0,
    correctPredictions: 0,
    accuracy: 0,
    activeUsers: 0,
    todayPredictions: 0
  });

  const [recentPredictions, setRecentPredictions] = useState<PredictionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simular datos de estadísticas
      setStats({
        totalPredictions: 1247,
        correctPredictions: 312,
        accuracy: 25.1,
        activeUsers: 89,
        todayPredictions: 23
      });

      // Simular predicciones recientes
      setRecentPredictions([
        {
          id: '1',
          numbers: [7, 14, 21, 28, 35, 42],
          confidence: 87.5,
          createdAt: new Date(),
          isCorrect: true
        },
        {
          id: '2',
          numbers: [3, 12, 19, 26, 33, 40],
          confidence: 92.1,
          createdAt: new Date(Date.now() - 3600000),
          isCorrect: false
        },
        {
          id: '3',
          numbers: [1, 8, 15, 22, 29, 36],
          confidence: 78.3,
          createdAt: new Date(Date.now() - 7200000),
          isCorrect: true
        }
      ]);

      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-white animate-pulse mx-auto mb-4" />
          <p className="text-white text-lg">Cargando Dashboard Anbel IA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-yellow-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Anbel IA Dashboard</h1>
          </div>
          <p className="text-xl text-gray-300">Sistema de Predicciones de Lotería con Inteligencia Artificial</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center">
              <Target className="w-8 h-8 text-blue-400 mr-3" />
              <div>
                <p className="text-gray-300 text-sm">Total Predicciones</p>
                <p className="text-2xl font-bold text-white">{stats.totalPredictions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
              <div>
                <p className="text-gray-300 text-sm">Predicciones Correctas</p>
                <p className="text-2xl font-bold text-white">{stats.correctPredictions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-yellow-400 mr-3" />
              <div>
                <p className="text-gray-300 text-sm">Precisión</p>
                <p className="text-2xl font-bold text-white">{stats.accuracy}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-400 mr-3" />
              <div>
                <p className="text-gray-300 text-sm">Usuarios Activos</p>
                <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Predictions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3" />
            Predicciones Recientes
          </h2>
          
          <div className="space-y-4">
            {recentPredictions.map((prediction) => (
              <div key={prediction.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-white font-semibold">
                      {prediction.numbers.join(' - ')}
                    </span>
                    <span className="ml-3 px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                      {prediction.confidence}% confianza
                    </span>
                  </div>
                  <div className="flex items-center">
                    {prediction.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <span className="text-red-400 text-sm">Pendiente</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  {prediction.createdAt.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Status */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-3" />
            Estado del Sistema IA
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Brain className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-white font-semibold">IA Activa</p>
              <p className="text-gray-400 text-sm">Sistema funcionando</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Crown className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-white font-semibold">Modelo Premium</p>
              <p className="text-gray-400 text-sm">Última versión</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-white font-semibold">Precisión Alta</p>
              <p className="text-gray-400 text-sm">Optimizado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}