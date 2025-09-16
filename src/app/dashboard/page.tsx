'use client';

import { useState, useEffect } from 'react';
import { Brain, Target, Zap, Crown, CheckCircle, Globe, Trophy, Activity, BarChart3, Calendar, Star, Award, TrendingUp, Users, Bell, Settings, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { AnbelChat } from '@/components/AnbelChat';
import { LOTTERY_CONFIGS } from '@/lib/lotteryConfig';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [anbelStatus, setAnbelStatus] = useState('initializing');
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    // Simular datos de usuario para demo
    setUserData({
      id: 'demo-user',
      name: 'Usuario Demo',
      plan: 'premium',
      code: 'DEMO123',
      isActivated: true,
      status: 'active'
    });
    
    // Inicializar Anbel IA
    initializeAnbelIA();
  }, []);

  const initializeAnbelIA = async () => {
    try {
      setAnbelStatus('initializing');
      
      // Simular inicialización de Anbel IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnbelStatus('ready');
      
      // Generar predicciones de ejemplo
      generateSamplePredictions();
      
    } catch (error) {
      console.error('Error inicializando Anbel IA:', error);
      setAnbelStatus('error');
    }
  };

  const generateSamplePredictions = () => {
    const samplePredictions = [
      {
        lottery: 'Powerball',
        numbers: [12, 24, 36, 48, 60],
        powerball: 15,
        confidence: 96.8,
        algorithm: 'Anbel Ultra AI',
        nextDraw: '2024-01-15'
      },
      {
        lottery: 'Mega Millions',
        numbers: [7, 14, 21, 28, 35],
        megaBall: 9,
        confidence: 94.2,
        algorithm: 'Anbel Ultra AI',
        nextDraw: '2024-01-16'
      }
    ];
    
    setPredictions(samplePredictions);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Cargando Dashboard...</h2>
          <p className="text-lg opacity-80">Preparando tu experiencia personalizada</p>
        </div>
      </div>
    );
  }

  // Solo loterías de USA (Powerball y Mega Millions)
  const usaLotteries = LOTTERY_CONFIGS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Brain className="w-8 h-8 text-yellow-400" />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${
                  anbelStatus === 'ready' ? 'bg-green-400' : 
                  anbelStatus === 'initializing' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CLUB ANBEL - GanaFácil</h1>
                <p className="text-sm text-yellow-300">
                  Anbel IA Mega Inteligente - {anbelStatus === 'ready' ? 'Online' : 'Inicializando...'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm text-gray-300">
                <p>Usuario: {userData?.name || 'Demo'}</p>
                <p>Plan: {userData?.plan?.toUpperCase() || 'PREMIUM'}</p>
                <p className="text-xs text-yellow-400">Código: {userData?.code || 'N/A'}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl font-bold">¡Bienvenido {userData?.name || 'Usuario'}!</h1>
          </div>
          <p className="text-xl mb-6">
            Tu cuenta está completamente activada con código: <span className="text-yellow-400 font-bold">{userData?.code || 'N/A'}</span>
          </p>
          <p className="text-lg mb-6">
            Plan: <span className="text-yellow-400 font-bold">{userData?.plan?.toUpperCase() || 'PREMIUM'}</span> - Acceso completo al Club Anbel
          </p>
          <div className="flex items-center justify-center space-x-8 text-lg">
            <div className="flex items-center">
              <Globe className="w-6 h-6 mr-2" />
              <span>9 Loterías Mundiales</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              <span>6 Loterías de USA</span>
            </div>
            <div className="flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              <span>Anbel IA 94.5% Precisión</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Estado</p>
                <p className="text-2xl font-bold text-white">Activo</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Predicciones</p>
                <p className="text-2xl font-bold text-white">{predictions.length}</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Aciertos</p>
                <p className="text-2xl font-bold text-white">94.5%</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Anbel IA</p>
                <p className="text-2xl font-bold text-white">
                  {anbelStatus === 'ready' ? 'Online' : 'Iniciando...'}
                </p>
              </div>
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Anbel IA Chat */}
        <div className="mb-8" data-chat-section>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-yellow-400" />
            Chat con Anbel IA
          </h3>
          <AnbelChat />
        </div>

        {/* Predicciones Recientes */}
        {predictions.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-purple-400" />
              Predicciones Recientes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">{prediction.lottery}</h4>
                    <span className="text-xs text-green-400">{prediction.confidence}% confianza</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {prediction.numbers.map((num: number, i: number) => (
                      <span key={i} className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                        {num}
                      </span>
                    ))}
                    {prediction.powerball && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                        {prediction.powerball}
                      </span>
                    )}
                    {prediction.megaBall && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                        {prediction.megaBall}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mb-2">
                    Algoritmo: {prediction.algorithm}
                  </p>
                  <p className="text-xs text-gray-400">
                    Próximo sorteo: {prediction.nextDraw}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9 Loterías Mundiales */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-blue-400" />
            9 Loterías Mundiales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {allLotteries.map((lottery, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{lottery.name}</h4>
                  <span className="text-xs text-gray-400">{lottery.country}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{lottery.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-bold">${lottery.jackpot}</span>
                  <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors">
                    Predecir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Loterías de USA */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-8 h-8 mr-3 text-red-400" />
            6 Loterías de USA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {usaLotteries.map((lottery, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{lottery.name}</h4>
                  <span className="text-xs text-gray-400">USA</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{lottery.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-bold">${lottery.jackpot}</span>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors">
                    Predecir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas Avanzadas */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-green-400" />
            Estadísticas de Rendimiento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">94.5%</div>
              <div className="text-sm text-gray-300">Precisión General</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-green-400 h-2 rounded-full" style={{width: '94.5%'}}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
              <div className="text-sm text-gray-300">Predicciones Generadas</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{width: '87%'}}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$2.4M</div>
              <div className="text-sm text-gray-300">Ganancias Totales</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">15</div>
              <div className="text-sm text-gray-300">Días Consecutivos</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Predicciones en Tiempo Real */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Activity className="w-8 h-8 mr-3 text-red-400" />
            Predicciones en Tiempo Real
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Powerball</h4>
                <div className="flex items-center text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm">EN VIVO</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white text-red-600 px-3 py-1 rounded-full font-bold">12</span>
                <span className="bg-white text-red-600 px-3 py-1 rounded-full font-bold">24</span>
                <span className="bg-white text-red-600 px-3 py-1 rounded-full font-bold">36</span>
                <span className="bg-white text-red-600 px-3 py-1 rounded-full font-bold">48</span>
                <span className="bg-white text-red-600 px-3 py-1 rounded-full font-bold">60</span>
                <span className="bg-yellow-400 text-red-600 px-3 py-1 rounded-full font-bold">15</span>
              </div>
              <div className="text-sm text-white/80">
                <p>Confianza: <span className="font-bold text-yellow-400">96.8%</span></p>
                <p>Próximo sorteo: <span className="font-bold">Hoy 10:59 PM</span></p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Mega Millions</h4>
                <div className="flex items-center text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm">EN VIVO</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold">7</span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold">14</span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold">21</span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold">28</span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-bold">35</span>
                <span className="bg-yellow-400 text-blue-600 px-3 py-1 rounded-full font-bold">9</span>
              </div>
              <div className="text-sm text-white/80">
                <p>Confianza: <span className="font-bold text-yellow-400">94.2%</span></p>
                <p>Próximo sorteo: <span className="font-bold">Mañana 11:00 PM</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-yellow-400" />
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              href="/dashboard/real-time"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-3"
            >
              <Activity className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Tiempo Real USA</p>
                <p className="text-sm opacity-80">Resultados en vivo</p>
              </div>
            </Link>

            <button 
              onClick={() => {
                // Scroll al chat de Anbel
                const chatElement = document.querySelector('[data-chat-section]');
                if (chatElement) {
                  chatElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                  alert('Chat con Anbel IA disponible en esta página');
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
            >
              <Brain className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Chat con Anbel IA</p>
                <p className="text-sm opacity-80">Asistente inteligente</p>
              </div>
            </button>

            <button 
              onClick={() => {
                alert('Análisis Avanzado:\n\n• Patrones de frecuencia detectados\n• Números calientes: 12, 24, 36\n• Tendencia: Secuencias pares en aumento\n• Confianza: 89.3%\n\nPróximamente: Página dedicada de análisis');
              }}
              className="bg-gradient-to-r from-green-600 to-yellow-600 text-white p-4 rounded-lg hover:from-green-700 hover:to-yellow-700 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
            >
              <BarChart3 className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Análisis Avanzado</p>
                <p className="text-sm opacity-80">Patrones y tendencias</p>
              </div>
            </button>

            <button 
              onClick={() => {
                alert('Historial de Ganancias:\n\n• Total ganado: $2,400,000\n• Aciertos: 1,247 predicciones\n• Precisión: 94.5%\n• Mejor racha: 15 días consecutivos\n• Última ganancia: $50,000 (Powerball)\n\nPróximamente: Página detallada de historial');
              }}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
            >
              <Trophy className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Historial de Ganancias</p>
                <p className="text-sm opacity-80">Ver resultados</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
