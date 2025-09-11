'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
// import AnbelAIDashboard from '@/components/AnbelAIDashboard';
// import AnbelAIChat from '@/components/AnbelAIChat';
import { 
  Brain, 
  MessageCircle, 
  BarChart3, 
  Settings,
  Zap,
  Target,
  Crown,
  Star
} from 'lucide-react';

export default function AnbelAIPageEn() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<'dashboard' | 'chat'>('dashboard');
  const [language, setLanguage] = useState<'es' | 'en'>('en');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/activate-user');
    return null;
  }

  const handlePredictionGenerated = (prediction: any) => {
    console.log('Prediction generated:', prediction);
    // Handle generated prediction
  };

  const handleAnalysisGenerated = (analysis: any) => {
    console.log('Analysis generated:', analysis);
    // Handle generated analysis
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Brain className="w-8 h-8 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Anbel AI</h1>
                <p className="text-sm text-purple-300">
                  {language === 'es' ? 'Agente Súper Inteligente' : 'Super Intelligent Agent'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'es' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'en' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeView === 'dashboard' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>{language === 'es' ? 'Dashboard' : 'Dashboard'}</span>
                </button>
                <button
                  onClick={() => setActiveView('chat')}
                  className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeView === 'chat' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'es' ? 'Chat' : 'Chat'}</span>
                </button>
              </div>

              {/* Back Button */}
              <button
                onClick={() => router.push('/dashboard-en')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {language === 'es' ? '← Volver' : '← Back'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeView === 'dashboard' ? (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <Brain className="w-24 h-24 text-purple-400 mx-auto mb-4" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                {language === 'es' ? 'Anbel IA Dashboard' : 'Anbel AI Dashboard'}
              </h1>
              
              <p className="text-xl text-purple-300 mb-8">
                {language === 'es' 
                  ? 'Tu agente súper inteligente está listo para ayudarte'
                  : 'Your super intelligent agent is ready to help you'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'es' ? 'Predicciones' : 'Predictions'}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'es' 
                    ? 'Genera predicciones inteligentes'
                    : 'Generate intelligent predictions'
                  }
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'es' ? 'Análisis' : 'Analysis'}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'es' 
                    ? 'Análisis profundo de patrones'
                    : 'Deep pattern analysis'
                  }
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Crown className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'es' ? 'Inteligencia' : 'Intelligence'}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'es' 
                    ? 'IA súper inteligente'
                    : 'Super intelligent AI'
                  }
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                {language === 'es' ? 'Estado del Sistema' : 'System Status'}
              </h3>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">
                  {language === 'es' ? 'Activo y Funcionando' : 'Active and Running'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl mx-auto px-4">
            <div className="relative mb-8">
              <Brain className="w-24 h-24 text-purple-400 mx-auto mb-4" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              {language === 'es' ? 'Anbel IA Chat' : 'Anbel AI Chat'}
            </h1>
            
            <p className="text-xl text-purple-300 mb-8">
              {language === 'es' 
                ? 'Tu agente súper inteligente está listo para ayudarte'
                : 'Your super intelligent agent is ready to help you'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'es' ? 'Predicciones' : 'Predictions'}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'es' 
                    ? 'Genera predicciones inteligentes'
                    : 'Generate intelligent predictions'
                  }
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'es' ? 'Análisis' : 'Analysis'}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'es' 
                    ? 'Análisis profundo de patrones'
                    : 'Deep pattern analysis'
                  }
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <Crown className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'es' ? 'Inteligencia' : 'Intelligence'}
                </h3>
                <p className="text-sm text-gray-300">
                  {language === 'es' 
                    ? 'IA súper inteligente'
                    : 'Super intelligent AI'
                  }
                </p>
              </div>
            </div>
            
            <p className="text-gray-300">
              {language === 'es' 
                ? 'El chat de Anbel IA aparecerá en la esquina inferior derecha'
                : 'Anbel AI chat will appear in the bottom right corner'
              }
            </p>
          </div>
        </div>
      )}

      {/* Chat Component - Simplified */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors cursor-pointer">
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
