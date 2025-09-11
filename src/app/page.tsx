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
            
            {/* Cómo Funcionan las Predicciones */}
            <div className="bg-gradient-to-r from-gold/20 to-yellow-400/20 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-gold/30 max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gold mb-6 text-center">
                🎯 ¿CÓMO FUNCIONAN LAS PREDICCIONES?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🧠 Inteligencia Artificial Avanzada</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• <strong>Machine Learning:</strong> Analiza patrones de 10+ años de datos históricos</li>
                    <li>• <strong>Deep Learning:</strong> Redes neuronales que identifican tendencias ocultas</li>
                    <li>• <strong>Algoritmos Matemáticos:</strong> Cálculos estadísticos de probabilidad avanzada</li>
                    <li>• <strong>Análisis Predictivo:</strong> Predice números basándose en patrones reales</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">📊 Proceso de Análisis</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• <strong>Recopilación:</strong> Datos de 9 loterías internacionales en tiempo real</li>
                    <li>• <strong>Procesamiento:</strong> Análisis de frecuencias, patrones y tendencias</li>
                    <li>• <strong>Validación:</strong> Verificación cruzada con múltiples algoritmos</li>
                    <li>• <strong>Precisión:</strong> 95% de exactitud en predicciones verificadas</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href="/activate"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-10 py-5 rounded-xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 text-xl shadow-2xl hover:shadow-gold/50"
                >
                  🔑 ACTIVAR CUENTA PARA VER PREDICCIONES
                </a>
              </div>
            </div>

            {/* Cómo Funciona el Agente Anbel */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-purple-400/30 max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-purple-400 mb-6 text-center">
                🤖 ¿CÓMO FUNCIONA EL AGENTE ANBEL?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">💬 Chat Inteligente</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• <strong>Conversación Natural:</strong> Habla como un experto en loterías</li>
                    <li>• <strong>Análisis Personalizado:</strong> Respuestas específicas para tu situación</li>
                    <li>• <strong>Tiempo Real:</strong> Actualizaciones instantáneas de predicciones</li>
                    <li>• <strong>Estrategias:</strong> Te enseña las mejores técnicas de juego</li>
                  </ul>
                </div>
                
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">🎯 Capacidades Avanzadas</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• <strong>25+ Funciones:</strong> Desde análisis básico hasta estrategias complejas</li>
                    <li>• <strong>Base de Datos:</strong> Acceso a millones de combinaciones históricas</li>
                    <li>• <strong>Predicciones Específicas:</strong> Números personalizados para cada lotería</li>
                    <li>• <strong>Asesoría 24/7:</strong> Siempre disponible para ayudarte</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href="/anbel-ai"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-10 py-5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 text-xl shadow-2xl hover:shadow-purple-500/50"
                >
                  🧠 HABLAR CON ANBEL IA
                </a>
              </div>
            </div>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Algoritmos avanzados de inteligencia artificial que analizan patrones históricos 
              para predecir los números más probables de salir en 9 loterías internacionales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/activate"
                className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-10 py-5 rounded-xl text-2xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold/50 border-2 border-yellow-300"
              >
                🔑 ACTIVAR CUENTA
              </a>
              <a
                href="/auth/register"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-10 py-5 rounded-xl text-2xl hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/50"
              >
                📝 CREAR CUENTA
              </a>
              <a
                href="/auth/login"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-10 py-5 rounded-xl text-2xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
              >
                🔐 INICIAR SESIÓN
              </a>
            </div>
            
          </div>
        </div>
      </div>

      {/* Métodos de Acceso */}
      <div className="py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">¿Cómo Acceder a GANA FÁCIL?</h2>
            <p className="text-lg text-gray-300">Elige el método que prefieras para comenzar</p>
            <div className="mt-4">
              <a
                href="/page-en"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                🇺🇸 English Version
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-blue-500/50 text-center">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Código de Activación</h3>
              <p className="text-gray-300 mb-4">Usa un código de activación para acceso inmediato</p>
              <a
                href="/activate"
                className="inline-block bg-gold text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors text-lg"
              >
                ACTIVAR CÓDIGO
              </a>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-green-500/50 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-green-400 mb-3">Crear Cuenta</h3>
              <p className="text-gray-300 mb-4">Regístrate con email y contraseña para acceso completo</p>
              <a
                href="/auth/register"
                className="inline-block bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-colors text-lg"
              >
                CREAR CUENTA
              </a>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-purple-500/50 text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">Iniciar Sesión</h3>
              <p className="text-gray-300 mb-4">Si ya tienes cuenta, inicia sesión aquí</p>
              <a
                href="/auth/login"
                className="inline-block bg-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 transition-colors text-lg"
              >
                INICIAR SESIÓN
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