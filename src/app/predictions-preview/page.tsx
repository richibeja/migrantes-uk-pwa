'use client';

import React from 'react';
import { Target, Crown, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PredictionsPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🎯</div>
              <div>
                <h1 className="text-3xl font-bold text-gold">PREDICCIONES DESTACADAS</h1>
                <p className="text-gray-300">Vista previa - Requiere activación</p>
              </div>
            </div>
            
            <Link
              href="/"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Volver al Inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Banner de activación requerida */}
        <div className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 rounded-3xl p-8 mb-8 text-black text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Lock className="w-12 h-12" />
            <h2 className="text-4xl font-bold">ACTIVACIÓN REQUERIDA</h2>
            <Lock className="w-12 h-12" />
          </div>
          <p className="text-xl font-semibold mb-6">
            Las predicciones están disponibles solo para usuarios activados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/activate"
              className="bg-black text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Crown className="w-6 h-6" />
              <span>ACTIVAR CÓDIGO</span>
            </Link>
            <Link
              href="/auth/register"
              className="bg-white text-black px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-6 h-6" />
              <span>CREAR CUENTA</span>
            </Link>
          </div>
        </div>

        {/* Vista previa de lo que obtendrán */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <h3 className="text-2xl font-bold text-gold mb-4">🎯 Predicciones Premium</h3>
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Powerball - Próximo Sorteo</div>
                <div className="flex space-x-2 mb-2">
                  {[7, 15, 23, 31, 42].map((num, index) => (
                    <div key={index} className="bg-gold text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {num}
                    </div>
                  ))}
                  <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    12
                  </div>
                </div>
                <div className="text-gold font-bold">Confianza: 87%</div>
              </div>
              <div className="text-center text-gray-400">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <p>Activa tu cuenta para ver todas las predicciones</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <h3 className="text-2xl font-bold text-gold mb-4">📊 Análisis Avanzado</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-gold">95%</div>
                  <div className="text-gray-400 text-sm">Precisión</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">24/7</div>
                  <div className="text-gray-400 text-sm">Actualizaciones</div>
                </div>
              </div>
              <div className="text-center text-gray-400">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <p>Acceso completo con activación</p>
              </div>
            </div>
          </div>
        </div>

        {/* Beneficios de activarse */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-600/50">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">¿Qué obtienes al activarte?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Predicciones Reales</h4>
              <p className="text-gray-300 text-sm">
                Números analizados por IA con 95% de precisión
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Acceso Premium</h4>
              <p className="text-gray-300 text-sm">
                Todas las loterías internacionales sin restricciones
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Actualizaciones</h4>
              <p className="text-gray-300 text-sm">
                Predicciones que se actualizan cada 5 minutos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong>GANA FÁCIL</strong> - Predicciones Premium
            </p>
            <p className="text-xs mt-1">
              Activa tu cuenta para acceder a todas las predicciones
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
