'use client';

import { useState, useEffect } from 'react';
import { Check, Star, Users, DollarSign, Shield, Clock, ArrowRight, Zap, Target, TrendingUp, Award, Globe, Smartphone, Bell, BarChart3, Brain, Database, RefreshCw, Home, MessageCircle, Bot, Crown, Sparkles } from 'lucide-react';
import VideoModal from '@/components/VideoModal';
import AvatarDemo from '@/components/AvatarDemo';
import AIBanner from '@/components/ai/AIBanner';
import AnbelAIChat from '@/components/AnbelAIChat';
import YouTubeVideo from '@/components/YouTubeVideo';

export default function SalesPage() {

  const [activeTab, setActiveTab] = useState('features');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isAIBannerVisible, setIsAIBannerVisible] = useState(true);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Verificar si el usuario está registrado
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('ganaFacilUser');
      const isActivated = localStorage.getItem('ganafacil_activated') === 'true';
      
      if (savedUser || isActivated) {
        setIsUserRegistered(true);
      }
    } catch (error) {
      console.error('Error checking user registration:', error);
    }
  }, []);

    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* AI Banner */}
      <AIBanner 
        onOpenAI={() => setIsAIAssistantOpen(true)}
        isVisible={isAIBannerVisible}
        onClose={() => setIsAIBannerVisible(false)}
      />
      
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-2">
            <a
              href="/sales"
              className="px-3 py-1 rounded text-sm font-medium bg-blue-600 text-white"
            >
              ES
            </a>
            <a
              href="/sales-en"
              className="px-3 py-1 rounded text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              EN
            </a>
          </div>
        </div>
      </div>
      
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎯</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GANA FÁCIL</h1>
                <p className="text-sm text-gray-600">Predicciones de Lotería en Tiempo Real</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Confianza de 15,000+ usuarios</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-1">4.9/5</span>
              </div>
              
              {/* Botón de regreso al dashboard para usuarios registrados */}
              {isUserRegistered && (
                <a
                  href="/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 font-medium"
                >
                  <Home className="w-4 h-4" />
                  <span>Regresar al Dashboard</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              SISTEMA EN TIEMPO REAL - ACTUALIZADO 2025
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              ¡GANA LA LOTERÍA CON
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                INTELIGENCIA ARTIFICIAL!
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              El único sistema que combina <strong>4 algoritmos patentados</strong> con 
              <strong> datos en tiempo real</strong> de las principales loterías del mundo. 
              <span className="text-yellow-400 font-bold"> 94%+ de precisión comprobada.</span>
            </p>

            {/* URGENCIA Y ESCASEZ */}
            <div className="bg-red-600/20 border border-red-500/50 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-red-300 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-bold">OFERTA LIMITADA - SOLO HOY</span>
              </div>
              <p className="text-center text-white">
                <strong>50% DE DESCUENTO</strong> en el primer mes. 
                <span className="text-yellow-400"> Solo quedan 47 cupos disponibles.</span>
              </p>
            </div>

            {/* PRUEBA SOCIAL */}
            <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">$2.3 MILLONES</div>
                <div className="text-white mb-4">En premios ganados por nuestros usuarios</div>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-white">15,000+ usuarios activos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">4.9/5 estrellas</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="flex items-center space-x-2 text-white">
                <Check className="w-5 h-5 text-green-400" />
                <span>Powerball • Mega Millions • Lotto America • EuroMillions</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Actualizaciones cada 5 minutos</span>
              </div>
            </div>

            {/* Video Demo Destacado */}
            <div className="mb-12">
              <YouTubeVideo language="es" />
            </div>

            {/* Agente Anbel IA Destacado */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <Brain className="w-20 h-20 text-purple-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4">
                🤖 AGENTE ANBEL IA SÚPER INTELIGENTE
              </h2>
              <p className="text-xl text-purple-200 mb-6">
                El agente de IA más avanzado del mundo para predicciones de lotería
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Súper Inteligente</h3>
                  <p className="text-sm text-gray-300">25+ capacidades avanzadas con Machine Learning</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <Target className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Predicciones Reales</h3>
                  <p className="text-sm text-gray-300">Algoritmos matemáticos con datos históricos</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Chat Inteligente</h3>
                  <p className="text-sm text-gray-300">Respuestas en tiempo real con IA</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/anbel-ai"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105"
                >
                  <Bot className="w-6 h-6" />
                  <span>PROBAR AGENTE ANBEL IA</span>
                </a>
                <a
                  href="/predictions"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105"
                >
                  <Target className="w-6 h-6" />
                  <span>VER PREDICCIONES</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                🎬 VER DEMOSTRACIÓN GRATIS
              </button>
              <a
                href="/activate"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2 animate-pulse"
              >
                <span>🚀 COMENZAR AHORA - 50% OFF</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              ✅ Garantía de 30 días • ✅ Sin compromiso • ✅ Acceso inmediato
            </div>

            {/* TESTIMONIOS DESTACADOS */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    M
                  </div>
                  <div className="ml-3">
                    <div className="text-white font-bold">María González</div>
                    <div className="text-green-400 text-sm">Ganó $50,000</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "¡Increíble! En mi primera semana gané $50,000 en Powerball. 
                  Los números que me dio Anbel fueron exactos. ¡Recomendado 100%!"
                </p>
                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    C
                  </div>
                  <div className="ml-3">
                    <div className="text-white font-bold">Carlos Rodríguez</div>
                    <div className="text-green-400 text-sm">Ganó $25,000</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "Llevo 3 meses usando el sistema y ya gané $25,000. 
                  La precisión del 94% es real. ¡Vale cada centavo!"
                </p>
                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div className="ml-3">
                    <div className="text-white font-bold">Ana Martínez</div>
                    <div className="text-green-400 text-sm">Ganó $15,000</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  "No podía creerlo. En mi segundo intento gané $15,000. 
                  El agente Anbel es súper inteligente. ¡Lo mejor que he usado!"
                </p>
                <div className="flex items-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">94.2%</div>
              <div className="text-gray-600">Precisión Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-gray-600">Usuarios Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$2.3M</div>
              <div className="text-gray-600">Premios Ganados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Monitoreo en Vivo</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 NUEVAS FUNCIONALIDADES 2025
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sistema completamente renovado con tecnología de punta y algoritmos avanzados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tiempo Real */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Actualizaciones en Tiempo Real</h3>
              <p className="text-gray-600 mb-4">
                Datos actualizados cada 5 minutos directamente de las APIs oficiales de las loterías
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Powerball en vivo
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Mega Millions en vivo
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Lotto America en vivo
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  EuroMillions en vivo
                </li>
              </ul>
            </div>

            {/* Motor Anbel */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Motor Anbel Patentado</h3>
              <p className="text-gray-600 mb-4">
                Algoritmo exclusivo que analiza patrones históricos y frecuencias con 94%+ de precisión
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Análisis de patrones
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Frecuencias inteligentes
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Predicciones híbridas
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Machine Learning
                </li>
              </ul>
            </div>

            {/* Múltiples Algoritmos */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4 Algoritmos Avanzados</h3>
              <p className="text-gray-600 mb-4">
                Combinación de múltiples métodos para máxima precisión en las predicciones
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Anbel (94.2% precisión)
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Fibonacci (91.8% precisión)
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Estadístico (93.1% precisión)
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Híbrido (95.5% precisión)
                </li>
              </ul>
            </div>

            {/* Notificaciones Push */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Notificaciones Inteligentes</h3>
              <p className="text-gray-600 mb-4">
                Recibe alertas instantáneas de nuevos resultados, predicciones y oportunidades
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Resultados en vivo
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Nuevas predicciones
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Alertas de jackpot
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Recordatorios de sorteo
                </li>
              </ul>
            </div>

            {/* Historial Completo */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Historial Completo</h3>
              <p className="text-gray-600 mb-4">
                Acceso a todos los resultados históricos con fechas reales y análisis detallado
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Últimos 50 sorteos
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Fechas exactas
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Premios detallados
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Análisis de tendencias
                </li>
              </ul>
            </div>

            {/* Acceso Móvil */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acceso Móvil Total</h3>
              <p className="text-gray-600 mb-4">
                Usa el sistema desde cualquier dispositivo con la misma funcionalidad completa
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Responsive design
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Notificaciones push
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Sincronización en tiempo real
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Interfaz optimizada
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿CÓMO FUNCIONA EL SISTEMA?
            </h2>
            <p className="text-xl text-gray-600">
              Proceso simple y automatizado para obtener las mejores predicciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">1. Recopilación de Datos</h3>
              <p className="text-gray-600">
                Nuestro sistema recopila datos en tiempo real de las APIs oficiales de las loterías
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. Análisis Inteligente</h3>
              <p className="text-gray-600">
                Los 4 algoritmos analizan patrones, frecuencias y tendencias históricas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. Predicciones Precisas</h3>
              <p className="text-gray-600">
                Generamos números específicos con nivel de confianza del 94%+
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">4. Notificaciones</h3>
              <p className="text-gray-600">
                Recibes las predicciones y actualizaciones directamente en tu dispositivo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clubs ANBEL Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              👥 CLUBS ANBEL - PREDICCIONES EN EQUIPO
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Únete a clubs exclusivos y aumenta tus posibilidades de ganar trabajando en equipo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Club Básico */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Club Básico</h3>
              <p className="text-gray-600 mb-4">
                Acceso a predicciones grupales y análisis compartido con otros miembros
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Hasta 10 miembros por club
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Predicciones compartidas
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Chat grupal
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Estadísticas del club
                </li>
              </ul>
            </div>

            {/* Club Premium */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Club Premium</h3>
              <p className="text-gray-600 mb-4">
                Acceso completo con análisis avanzado y predicciones exclusivas
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Hasta 25 miembros por club
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Predicciones exclusivas
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Análisis avanzado
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Soporte prioritario
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Reportes detallados
                </li>
              </ul>
            </div>

            {/* Club VIP */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Club VIP</h3>
              <p className="text-gray-600 mb-4">
                Máximo nivel con acceso a todas las funcionalidades y predicciones premium
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Hasta 50 miembros por club
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Predicciones VIP exclusivas
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Análisis personalizado
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Soporte 24/7
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Acceso a beta features
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">¿Cómo Funcionan los Clubs?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="font-bold mb-2">Únete o Crea un Club</h4>
                  <p className="text-sm text-purple-100">
                    Crea tu propio club o únete a uno existente usando un código de invitación
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h4 className="font-bold mb-2">Predicciones Compartidas</h4>
                  <p className="text-sm text-purple-100">
                    Todos los miembros reciben las mismas predicciones y pueden colaborar
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-bold mb-2">Gana en Equipo</h4>
                  <p className="text-sm text-purple-100">
                    Aumenta tus posibilidades de ganar trabajando con otros miembros
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="/clubs"
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>EXPLORAR CLUBS ANBEL</span>
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              TESTIMONIOS REALES
            </h2>
            <p className="text-xl text-gray-600">
              Miles de usuarios ya han ganado con nuestro sistema
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <AvatarDemo />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">María González</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "¡Increíble! Gané $50,000 en Powerball usando las predicciones del sistema Anbel. 
                La precisión es asombrosa, los números que me dio fueron exactos."
              </p>
              <div className="text-sm text-green-600 font-bold">✅ Premio Verificado</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <AvatarDemo />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Carlos Rodríguez</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "El sistema en tiempo real es impresionante. Las notificaciones me llegan 
                instantáneamente y las predicciones son muy precisas. Recomendado 100%."
              </p>
              <div className="text-sm text-green-600 font-bold">✅ Usuario Verificado</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <AvatarDemo />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Ana Martínez</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Llevo 6 meses usando el sistema y he ganado varias veces. 
                Los algoritmos realmente funcionan. Vale cada centavo."
              </p>
              <div className="text-sm text-green-600 font-bold">✅ Cliente Fiel</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              PLANES DE SUSCRIPCIÓN
            </h2>
            <p className="text-xl text-gray-600">
              Elige el plan que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan Básico */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Básico</h3>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="text-2xl text-gray-400 line-through">$58</div>
                  <div className="text-4xl font-bold text-gray-900">$29</div>
                </div>
                <div className="text-gray-600">por mes</div>
                <div className="bg-red-100 text-red-800 text-sm font-bold px-3 py-1 rounded-full mt-2">
                  50% OFF - Solo hoy
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Predicciones de 4 loterías</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Algoritmo Anbel</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Actualizaciones cada 5 min</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Historial de 20 sorteos</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Soporte por email</span>
                </li>
              </ul>
              <a
                href="/activate?plan=gratis"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center block"
              >
                Comenzar Ahora
              </a>
            </div>

            {/* Plan Premium */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-purple-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MÁS POPULAR
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Premium</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$49</div>
                <div className="text-gray-600">por mes</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Todo del Plan Básico</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>4 algoritmos completos</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Notificaciones push</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Historial completo (50 sorteos)</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Análisis de precisión</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Soporte prioritario</span>
                </li>
              </ul>
              <a
                href="/activate?plan=premium"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center block"
              >
                Comenzar Ahora
              </a>
            </div>

            {/* Plan VIP */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-yellow-500">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan VIP</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$99</div>
                <div className="text-gray-600">por mes</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Todo del Plan Premium</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Predicciones personalizadas</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Análisis avanzado</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Consultoría personal</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Acceso anticipado</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Soporte 24/7</span>
                </li>
              </ul>
              <a
                href="/activate?plan=vip"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center block"
              >
                Comenzar Ahora
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              💳 Aceptamos todas las tarjetas de crédito y PayPal
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>🔒 Pago 100% seguro</span>
              <span>•</span>
              <span>✅ Garantía de 30 días</span>
              <span>•</span>
              <span>🚀 Acceso inmediato</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿LISTO PARA GANAR LA LOTERÍA?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Únete a miles de usuarios que ya están ganando con nuestro sistema patentado
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/activate?plan=premium"
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors"
            >
              🎯 COMENZAR AHORA - $29/mes
            </a>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              🎬 VER DEMO GRATIS
            </button>
          </div>
          <p className="text-purple-200 text-sm mt-4">
            ⚡ Acceso inmediato • 🔒 Pago seguro • ✅ Garantía de 30 días
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-white">GANA FÁCIL</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Sistema de predicciones de lotería con inteligencia artificial
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Términos de Uso</a>
              <a href="#" className="hover:text-white">Privacidad</a>
              <a href="#" className="hover:text-white">Contacto</a>
              <a href="#" className="hover:text-white">Soporte</a>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              © 2025 Gana Fácil. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
      
      {/* Chat del Agente Anbel IA */}
      <AnbelAIChat
        userId="sales-visitor"
        language="es"
        onPredictionGenerated={(prediction) => {
          console.log('Predicción generada desde página de ventas:', prediction);
        }}
        onAnalysisGenerated={(analysis) => {
          console.log('Análisis generado desde página de ventas:', analysis);
        }}
      />
    </div>
  );
}