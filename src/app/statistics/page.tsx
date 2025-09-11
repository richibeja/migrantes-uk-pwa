'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award,
  Calendar,
  Clock,
  Users,
  Star
} from 'lucide-react';

export default function StatisticsPage() {

  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const stats = {
    totalPredictions: 1250,
    accuracy: 87.5,
    topLottery: 'Powerball',
    bestDay: 'Sábado',
    averageConfidence: 89.2,
    totalUsers: 3420,
    activeUsers: 1250,
    predictionsToday: 45
  };

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">📊</div>
              <div>
                <h1 className="text-3xl font-bold text-gold">ESTADÍSTICAS</h1>
                <p className="text-gray-300">Análisis detallado del rendimiento</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </select>
              
              <a
                href="/dashboard"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Volver al Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold text-gold">{stats.totalPredictions}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Predicciones Totales</h3>
            <p className="text-gray-400 text-sm">En el período seleccionado</p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-400">{stats.accuracy}%</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Precisión Promedio</h3>
            <p className="text-gray-400 text-sm">Tasa de aciertos</p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-purple-400">{stats.topLottery}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Lotería Top</h3>
            <p className="text-gray-400 text-sm">Mayor precisión</p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-400">{stats.totalUsers}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Usuarios Totales</h3>
            <p className="text-gray-400 text-sm">Registrados</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Accuracy Chart */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <h3 className="text-xl font-bold text-white mb-6">Precisión por Día</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[85, 87, 89, 91, 88, 90, 87].map((height, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-gold rounded-t w-8 mb-2"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-400">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Predictions Chart */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <h3 className="text-xl font-bold text-white mb-6">Predicciones por Lotería</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Powerball</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-gold h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-gold font-bold">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Mega Millions</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-green-400 font-bold">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">EuroMillions</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-purple-400 font-bold">45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
          <h3 className="text-xl font-bold text-white mb-6">Métricas de Rendimiento</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">{stats.averageConfidence}%</div>
              <div className="text-gray-400">Confianza Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{stats.bestDay}</div>
              <div className="text-gray-400">Mejor Día</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stats.predictionsToday}</div>
              <div className="text-gray-400">Predicciones Hoy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong>GANA FÁCIL</strong> - Estadísticas del Sistema
            </p>
            <p className="text-xs mt-1">
              Última actualización: {new Date().toLocaleString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
