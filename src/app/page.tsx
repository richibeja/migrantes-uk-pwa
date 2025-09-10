'use client';

import { useState } from 'react';
import { Brain, Crown, MessageCircle, Bot, Target, Sparkles } from 'lucide-react';
import AIBanner from '@/components/ai/AIBanner';
import AnbelAIChat from '@/components/AnbelAIChat';

export default function Home() {
  const [isAIBannerVisible, setIsAIBannerVisible] = useState(true);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* AI Banner */}
      <AIBanner 
        onOpenAI={() => setIsAIAssistantOpen(true)}
        isVisible={isAIBannerVisible}
        onClose={() => setIsAIBannerVisible(false)}
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-6">
              🎯 GANA FÁCIL
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              Sistema de Predicciones de Lotería con IA
            </p>
            
            {/* Agente Anbel IA - El Cerebro */}
            <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/20 max-w-5xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <Brain className="w-24 h-24 text-purple-400" />
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-5xl font-bold text-white mb-4">
                🧠 AGENTE ANBEL IA - EL CEREBRO
              </h2>
              <p className="text-2xl text-purple-200 mb-6">
                El agente de IA más inteligente del mundo para predicciones de lotería
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Súper Inteligente</h3>
                  <p className="text-sm text-gray-300">25+ capacidades avanzadas con Machine Learning y Deep Learning</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Predicciones Reales</h3>
                  <p className="text-sm text-gray-300">Algoritmos matemáticos con datos históricos de 100+ sorteos</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <MessageCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Chat Inteligente</h3>
                  <p className="text-sm text-gray-300">Respuestas en tiempo real con análisis predictivo avanzado</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/anbel-ai"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-10 py-5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 text-xl"
                >
                  <Bot className="w-8 h-8" />
                  <span>PROBAR AGENTE ANBEL IA</span>
                </a>
                <a
                  href="/predictions"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-10 py-5 rounded-xl hover:from-yellow-400 hover:to-gold transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 text-xl"
                >
                  <Target className="w-8 h-8" />
                  <span>VER PREDICCIONES</span>
                </a>
              </div>
            </div>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Algoritmos avanzados de inteligencia artificial que analizan patrones históricos 
              para predecir los números más probables de salir en 9 loterías internacionales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/predictions"
                className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-8 py-4 rounded-xl text-xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold/50 border-2 border-yellow-300"
              >
                🎯 PREDICCIONES DESTACADAS
              </a>
              <a
                href="/dashboard"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl text-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50"
              >
                🚀 Ver Dashboard
              </a>
              <a
                href="/activate"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
              >
                🔑 Activar Código
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">¿Por qué Gana Fácil?</h2>
            <p className="text-xl text-gray-400">Tecnología de vanguardia para maximizar tus posibilidades de ganar</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">IA Avanzada</h3>
              <p className="text-gray-300">Algoritmos de inteligencia artificial que analizan millones de combinaciones para encontrar patrones ocultos.</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">PWA Profesional</h3>
              <p className="text-gray-300">Instala como app nativa en tu móvil. Funciona offline y se sincroniza automáticamente.</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Tiempo Real</h3>
              <p className="text-gray-300">Predicciones que se actualizan constantemente con los últimos datos y análisis.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">9</div>
              <div className="text-gray-400">Loterías Internacionales</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-gray-400">Precisión Promedio</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-400">Actualizaciones</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">3</div>
              <div className="text-gray-400">Algoritmos de IA</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat del Agente Anbel IA - El Cerebro */}
      <AnbelAIChat
        userId="home-visitor"
        language="es"
        onPredictionGenerated={(prediction) => {
          console.log('Predicción generada desde página principal:', prediction);
        }}
        onAnalysisGenerated={(analysis) => {
          console.log('Análisis generado desde página principal:', analysis);
        }}
      />
    </main>
  );
}