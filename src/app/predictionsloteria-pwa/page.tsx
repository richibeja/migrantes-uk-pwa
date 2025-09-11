'use client';

import React from 'react';
import { 
  Target, 
  Zap, 
  Star, 
  TrendingUp, 
  Clock, 
  RefreshCw,
  Crown,
  AlertCircle
} from 'lucide-react';

export default function PredictionsLoteriaPWAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🎯</div>
              <div>
                <h1 className="text-3xl font-bold text-gold">PREDICCIONES LOTERÍA PWA</h1>
                <p className="text-gray-300">Sistema de predicciones optimizado para PWA</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-300">ONLINE</span>
              </div>
              
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
        {/* Banner de predicciones */}
        <div className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 rounded-3xl p-8 mb-8 text-black text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Crown className="w-12 h-12" />
            <h2 className="text-4xl font-bold">PREDICCIONES PWA</h2>
            <Crown className="w-12 h-12" />
          </div>
          <p className="text-xl font-semibold mb-4">
            Sistema optimizado para aplicaciones web progresivas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm">Confianza Promedio</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm">Loterías Activas</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-2xl font-bold">90%</div>
              <div className="text-sm">Precisión Histórica</div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="text-2xl font-bold">PWA</div>
              <div className="text-sm">Optimizado</div>
            </div>
          </div>
        </div>

        {/* Predicciones disponibles */}
        <div className="space-y-8">
          {/* Powerball */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-gold">Powerball</h3>
                  <p className="text-gray-300">🇺🇸 Estados Unidos</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gold text-xl font-bold">$25,000,000</div>
                <div className="text-gray-400 text-sm">Próximo sorteo</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Predicciones Disponibles</h4>
                <div className="space-y-2">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Método: Análisis Avanzado PWA</div>
                    <div className="text-gold font-bold">Confianza: 87%</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Estadísticas PWA</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <div className="text-gold font-bold">5</div>
                    <div className="text-gray-400">Predicciones</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <div className="text-gold font-bold">87%</div>
                    <div className="text-gray-400">Precisión</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mega Millions */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-gold">Mega Millions</h3>
                  <p className="text-gray-300">🇺🇸 Estados Unidos</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gold text-xl font-bold">$22,000,000</div>
                <div className="text-gray-400 text-sm">Próximo sorteo</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Predicciones Disponibles</h4>
                <div className="space-y-2">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Método: Análisis Avanzado PWA</div>
                    <div className="text-gold font-bold">Confianza: 85%</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Estadísticas PWA</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <div className="text-gold font-bold">4</div>
                    <div className="text-gray-400">Predicciones</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <div className="text-gold font-bold">85%</div>
                    <div className="text-gray-400">Precisión</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EuroMillions */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="text-2xl font-bold text-gold">EuroMillions</h3>
                  <p className="text-gray-300">🇪🇺 Europa</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gold text-xl font-bold">€50,000,000</div>
                <div className="text-gray-400 text-sm">Próximo sorteo</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Predicciones Disponibles</h4>
                <div className="space-y-2">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Método: Análisis Avanzado PWA</div>
                    <div className="text-gold font-bold">Confianza: 88%</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Estadísticas PWA</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <div className="text-gold font-bold">6</div>
                    <div className="text-gray-400">Predicciones</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <div className="text-gold font-bold">88%</div>
                    <div className="text-gray-400">Precisión</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información PWA */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gold mb-4">¿Cómo funciona nuestro sistema PWA?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Algoritmo PWA</h4>
                  <p className="text-gray-300 text-sm">
                    Análisis optimizado para aplicaciones web progresivas
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Análisis Estadístico</h4>
                  <p className="text-gray-300 text-sm">
                    Evaluación de frecuencias y probabilidades históricas
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Tiempo Real PWA</h4>
                  <p className="text-gray-300 text-sm">
                    Actualización continua optimizada para PWA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong>GANA FÁCIL PWA</strong> - Sistema de Predicciones Optimizado
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
