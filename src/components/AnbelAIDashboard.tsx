'use client';

import React, { useState, useEffect } from 'react';
import { useAnbelAI } from '@/hooks/useAnbelAI';
import { 
  Brain, 
  Target, 
  Zap, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  Award,
  Star,
  Crown,
  RefreshCw,
  Settings,
  Bell,
  MessageCircle,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface AnbelAIDashboardProps {
  userId: string;
  language: 'es' | 'en';
  onPredictionGenerated?: (prediction: any) => void;
  onAnalysisGenerated?: (analysis: any) => void;
}

export default function AnbelAIDashboard({ 
  userId, 
  language = 'es',
  onPredictionGenerated,
  onAnalysisGenerated 
}: AnbelAIDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'predictions' | 'analysis' | 'settings'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    isActive,
    isInitializing,
    status,
    error,
    lastUpdate,
    capabilities,
    generateIntelligentDashboard,
    generateAdvancedPrediction,
    sendIntelligentNotification,
    getAgentStatistics,
    getRecentResponses,
    updateAgent
  } = useAnbelAI();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [statistics, setStatistics] = useState<any>(null);

  // Cargar dashboard inteligente
  useEffect(() => {
    if (isActive && !isInitializing) {
      loadDashboard();
    }
  }, [isActive, isInitializing, userId]);

  const loadDashboard = async () => {
    try {
      const data = await generateIntelligentDashboard(userId);
      if (data) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error cargando dashboard:', error);
    }
  };

  const loadStatistics = async () => {
    try {
      const stats = getAgentStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await updateAgent();
      await loadDashboard();
      await loadStatistics();
    } catch (error) {
      console.error('Error actualizando dashboard:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleGeneratePrediction = async (lotteryId: string) => {
    try {
      const prediction = await generateAdvancedPrediction(lotteryId, userId);
      if (prediction && onPredictionGenerated) {
        onPredictionGenerated(prediction.data);
      }
    } catch (error) {
      console.error('Error generando predicción:', error);
    }
  };

  const handleSendNotification = async (type: 'pattern' | 'hotNumber' | 'trend' | 'opportunity') => {
    try {
      await sendIntelligentNotification(type, userId, { test: true });
    } catch (error) {
      console.error('Error enviando notificación:', error);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, [getAgentStatistics]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">
            {language === 'es' ? 'Inicializando Anbel IA...' : 'Initializing Anbel AI...'}
          </h2>
          <p className="text-lg opacity-80">
            {language === 'es' ? 'Preparando capacidades súper inteligentes' : 'Preparing super intelligent capabilities'}
          </p>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center">
        <div className="text-center text-white">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {language === 'es' ? 'Anbel IA Desactivado' : 'Anbel AI Deactivated'}
          </h2>
          <p className="text-lg opacity-80">
            {language === 'es' ? 'El agente no está disponible' : 'Agent is not available'}
          </p>
        </div>
      </div>
    );
  }

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
                <h1 className="text-xl font-bold text-white">Anbel IA</h1>
                <p className="text-sm text-purple-300">
                  {language === 'es' ? 'Agente Súper Inteligente' : 'Super Intelligent Agent'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{language === 'es' ? 'Actualizar' : 'Refresh'}</span>
              </button>
              
              <div className="text-right text-sm text-gray-300">
                <p>{language === 'es' ? 'Última actualización:' : 'Last update:'}</p>
                <p>{new Date(lastUpdate).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-black/10 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: language === 'es' ? 'Resumen' : 'Overview', icon: BarChart3 },
              { id: 'predictions', label: language === 'es' ? 'Predicciones' : 'Predictions', icon: Target },
              { id: 'analysis', label: language === 'es' ? 'Análisis' : 'Analysis', icon: Activity },
              { id: 'settings', label: language === 'es' ? 'Configuración' : 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {language === 'es' ? 'Estado' : 'Status'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {language === 'es' ? 'Activo' : 'Active'}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {language === 'es' ? 'Capacidades' : 'Capabilities'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {Object.keys(capabilities).length}
                    </p>
                  </div>
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {language === 'es' ? 'Predicciones' : 'Predictions'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {statistics?.totalResponses || 0}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      {language === 'es' ? 'Precisión' : 'Accuracy'}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {Math.round(statistics?.averageAccuracy || 0)}%
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'es' ? 'Acciones Rápidas' : 'Quick Actions'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleGeneratePrediction('powerball')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-3"
                >
                  <Target className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">
                      {language === 'es' ? 'Predicción Powerball' : 'Powerball Prediction'}
                    </p>
                    <p className="text-sm opacity-80">
                      {language === 'es' ? 'Generar predicción avanzada' : 'Generate advanced prediction'}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleGeneratePrediction('mega-millions')}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center space-x-3"
                >
                  <Target className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">
                      {language === 'es' ? 'Predicción Mega Millions' : 'Mega Millions Prediction'}
                    </p>
                    <p className="text-sm opacity-80">
                      {language === 'es' ? 'Generar predicción avanzada' : 'Generate advanced prediction'}
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleGeneratePrediction('euromillions')}
                  className="bg-gradient-to-r from-green-600 to-yellow-600 text-white p-4 rounded-lg hover:from-green-700 hover:to-yellow-700 transition-all duration-300 flex items-center space-x-3"
                >
                  <Target className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">
                      {language === 'es' ? 'Predicción EuroMillions' : 'EuroMillions Prediction'}
                    </p>
                    <p className="text-sm opacity-80">
                      {language === 'es' ? 'Generar predicción avanzada' : 'Generate advanced prediction'}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'es' ? 'Actividad Reciente' : 'Recent Activity'}
              </h3>
              <div className="space-y-4">
                {getRecentResponses(5).map((response, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{response.content}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(response.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400 text-sm font-semibold">
                        {response.confidence}%
                      </p>
                      <p className="text-gray-400 text-xs">
                        {language === 'es' ? 'Confianza' : 'Confidence'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'es' ? 'Predicciones Avanzadas' : 'Advanced Predictions'}
              </h3>
              <p className="text-gray-300 mb-6">
                {language === 'es' 
                  ? 'Genera predicciones inteligentes usando el poder de Anbel IA'
                  : 'Generate intelligent predictions using the power of Anbel AI'
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 'powerball', name: 'Powerball', color: 'from-purple-600 to-blue-600' },
                  { id: 'mega-millions', name: 'Mega Millions', color: 'from-blue-600 to-green-600' },
                  { id: 'euromillions', name: 'EuroMillions', color: 'from-green-600 to-yellow-600' }
                ].map((lottery) => (
                  <div key={lottery.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-2">{lottery.name}</h4>
                    <p className="text-gray-300 text-sm mb-4">
                      {language === 'es' 
                        ? 'Predicción basada en análisis avanzado'
                        : 'Prediction based on advanced analysis'
                      }
                    </p>
                    <button
                      onClick={() => handleGeneratePrediction(lottery.id)}
                      className={`w-full bg-gradient-to-r ${lottery.color} text-white py-2 px-4 rounded-lg hover:opacity-80 transition-opacity`}
                    >
                      {language === 'es' ? 'Generar Predicción' : 'Generate Prediction'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'es' ? 'Análisis Inteligente' : 'Intelligent Analysis'}
              </h3>
              <p className="text-gray-300 mb-6">
                {language === 'es' 
                  ? 'Anbel IA puede realizar análisis profundos de patrones y tendencias'
                  : 'Anbel AI can perform deep analysis of patterns and trends'
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {language === 'es' ? 'Análisis de Patrones' : 'Pattern Analysis'}
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    {language === 'es' 
                      ? 'Detecta patrones complejos en los datos históricos'
                      : 'Detects complex patterns in historical data'
                    }
                  </p>
                  <button
                    onClick={() => handleSendNotification('pattern')}
                    className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {language === 'es' ? 'Analizar Patrones' : 'Analyze Patterns'}
                  </button>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {language === 'es' ? 'Análisis de Tendencias' : 'Trend Analysis'}
                  </h4>
                  <p className="text-gray-300 text-sm mb-4">
                    {language === 'es' 
                      ? 'Identifica tendencias emergentes y cambios'
                      : 'Identifies emerging trends and changes'
                    }
                  </p>
                  <button
                    onClick={() => handleSendNotification('trend')}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {language === 'es' ? 'Analizar Tendencias' : 'Analyze Trends'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === 'es' ? 'Configuración del Agente' : 'Agent Settings'}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'es' ? 'Frecuencia de Actualización' : 'Update Frequency'}
                  </label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                    <option value="5">{language === 'es' ? 'Cada 5 minutos' : 'Every 5 minutes'}</option>
                    <option value="10">{language === 'es' ? 'Cada 10 minutos' : 'Every 10 minutes'}</option>
                    <option value="30">{language === 'es' ? 'Cada 30 minutos' : 'Every 30 minutes'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'es' ? 'Notificaciones' : 'Notifications'}
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-white text-sm">
                        {language === 'es' ? 'Alertas de patrones' : 'Pattern alerts'}
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-white text-sm">
                        {language === 'es' ? 'Notificaciones de tendencias' : 'Trend notifications'}
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-white text-sm">
                        {language === 'es' ? 'Alertas de oportunidades' : 'Opportunity alerts'}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'es' ? 'Idioma' : 'Language'}
                  </label>
                  <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
