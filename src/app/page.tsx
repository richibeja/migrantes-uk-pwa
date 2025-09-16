'use client';

import { useState, useEffect } from 'react';
import { Brain, Crown, MessageCircle, Bot, Target, Sparkles, ChartLine, Bolt, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Zap, BarChart3, Shield, Lock, Award, CheckCircle } from 'lucide-react';
import AIBanner from '@/components/ai/AIBanner';
import ImprovedChatbot from '@/components/chatbot/ImprovedChatbot';
import PWAInstallBannerBilingual from '@/components/pwa/PWAInstallBannerBilingual';
import ConnectionStatusBilingual from '@/components/pwa/ConnectionStatusBilingual';
import PWADiagnostic from '@/components/pwa/PWADiagnostic';
import { GanaFacilTabs } from '@/components/Tabs';
import Chatbot from '@/components/Chatbot';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Analytics from '@/components/Analytics';

export default function Home() {
  const [isAIBannerVisible, setIsAIBannerVisible] = useState(true);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isPWAInstallVisible, setIsPWAInstallVisible] = useState(true);

  // Counter animation for statistics
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = parseInt(counter.textContent?.replace(/[^\d]/g, '') || '0');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            const displayValue = Math.round(current);
            counter.textContent = displayValue + (counter.textContent?.includes('%') ? '%' : '+');
            setTimeout(updateCounter, 40);
          } else {
            counter.textContent = target + (counter.textContent?.includes('%') ? '%' : '+');
          }
        };
        
        updateCounter();
      });
    };

    // Smooth scroll for navigation links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners
    document.querySelectorAll('nav a, .btn-outline').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      document.querySelectorAll('nav a, .btn-outline').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* AI Banner */}
      <AIBanner 
        onOpenAI={() => {}}
        isVisible={isAIBannerVisible}
        onClose={() => setIsAIBannerVisible(false)}
      />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold">GanaFácil</span>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <a href="#features" className="hover:text-yellow-400 transition-colors">Características</a>
              <a href="#demo" className="hover:text-yellow-400 transition-colors">Cómo Funciona</a>
              <a href="#stats" className="hover:text-yellow-400 transition-colors">Resultados</a>
              <a href="#pricing" className="hover:text-yellow-400 transition-colors">Precios</a>
            </nav>
            
            <div className="flex gap-3">
              <a href="/auth/login" className="px-4 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-all">
                Iniciar Sesión
              </a>
              <a href="/activate-whatsapp" className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all">
                Activar por WhatsApp
              </a>
              <a href="/page-en" className="px-4 py-2 border border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-all text-sm">
                🇺🇸 EN
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Predicciones de Lotería con Inteligencia Artificial
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Descubre el poder de Anbel IA, nuestro sistema avanzado que analiza patrones y probabilidades para ayudarte a tomar decisiones más inteligentes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="/activate-whatsapp" className="px-8 py-4 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105">
              Activar por WhatsApp
            </a>
            <a href="/demo-ia" className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all">
              Demo Interactiva
            </a>
            <button 
              onClick={() => setIsChatbotVisible(true)}
              className="px-8 py-4 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Chat con IA
            </button>
          </div>
          </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Experimenta Anbel IA Ahora</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Prueba nuestras capacidades de predicción sin registrarte. Genera predicciones de demostración y descubre el poder de la inteligencia artificial.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Predicciones Instantáneas</h3>
              <p className="text-gray-300">Genera predicciones en tiempo real con nuestros algoritmos avanzados</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Análisis Detallado</h3>
              <p className="text-gray-300">Obtén explicaciones detalladas del razonamiento de cada predicción</p>
      </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Brain className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Múltiples Algoritmos</h3>
              <p className="text-gray-300">Prueba diferentes algoritmos: Anbel, Probabilístico e Histórico</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/demo-ia" className="px-8 py-4 bg-white text-purple-600 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Probar Demo Interactiva
            </a>
            <a href="/activate-whatsapp" className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Activar con WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Potenciado por Anbel IA</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <ChartLine className="h-16 w-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Análisis Predictivo</h3>
              <p className="text-gray-600">Nuestros algoritmos analizan miles de sorteos históricos para identificar patrones y tendencias.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <Bot className="h-16 w-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Asistente Inteligente</h3>
              <p className="text-gray-600">Conversa con nuestro asistente IA que te guiará y responderá tus preguntas sobre predicciones.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <Bolt className="h-16 w-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Resultados en Tiempo Real</h3>
              <p className="text-gray-600">Obtén predicciones actualizadas al instante con los últimos datos de sorteos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section with Functional Tabs */}
      <section className="py-20 bg-gray-100" id="demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Experimenta el poder de la predicción inteligente</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Nuestra tecnología analiza múltiples factores simultáneamente para generar predicciones con alto porcentaje de precisión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/demo-ia" className="inline-block px-8 py-4 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600 transition-all text-center">
                Probar Demo Gratis
              </a>
              <a href="#pricing" className="inline-block px-8 py-4 bg-purple-500 text-white rounded-full text-lg font-semibold hover:bg-purple-600 transition-all text-center">
                Ver Precios
              </a>
              <a href="/activate-whatsapp" className="inline-block px-8 py-4 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-all text-center">
                Activar por WhatsApp
              </a>
            </div>
          </div>
          
          {/* Functional Tabs */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <GanaFacilTabs />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white stats" id="stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">Resultados Comprobados</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="p-6">
              <div className="text-5xl font-bold mb-3 stat-number">94.5%</div>
              <div className="text-lg opacity-90">Precisión del algoritmo Anbel</div>
            </div>
            
            <div className="p-6">
              <div className="text-5xl font-bold mb-3 stat-number">1,240+</div>
              <div className="text-lg opacity-90">Predicciones exitosas</div>
            </div>
            
            <div className="p-6">
              <div className="text-5xl font-bold mb-3 stat-number">4</div>
              <div className="text-lg opacity-90">Algoritmos integrados</div>
            </div>
            
            <div className="p-6">
              <div className="text-5xl font-bold mb-3 stat-number">98%</div>
              <div className="text-lg opacity-90">Satisfacción de usuarios</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">María González</h4>
                  <div className="flex text-yellow-400">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
              <p className="text-blue-100 italic">
                "¡Increíble! GanaFácil me ayudó a ganar $2,500 en Powerball. 
                Sus predicciones son muy precisas y fáciles de entender."
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  J
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">Juan Pérez</h4>
                  <div className="flex text-yellow-400">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
              <p className="text-blue-100 italic">
                "La IA de Anbel es impresionante. He estado usando la app 
                por 3 meses y ya recuperé mi inversión 10 veces."
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-lg">Ana Rodríguez</h4>
                  <div className="flex text-yellow-400">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
              <p className="text-blue-100 italic">
                "Me encanta la interfaz y lo fácil que es usar. 
                Las notificaciones me mantienen al día con los mejores números."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Planes de Suscripción</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades. Todos incluyen acceso completo a Anbel IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Plan Prueba Gratis */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Prueba Gratis</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">GRATIS</div>
                <div className="text-sm text-gray-500 line-through">$39</div>
                <p className="text-gray-600 mt-2">3 días</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Predicciones básicas (3 sorteos)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Acceso a estadísticas básicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Soporte por WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Sin compromiso</span>
                </li>
              </ul>
              <a 
                href="/activate-whatsapp" 
                className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-all block text-center"
              >
                Comenzar Gratis
              </a>
            </div>

            {/* Plan Básico */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Básico</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">$39</div>
                <div className="text-sm text-gray-500 line-through">$59</div>
                <p className="text-gray-600 mt-2">3 meses</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Predicciones para 5 sorteos diarios</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Estadísticas detalladas con IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Soporte por WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Notificaciones push</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Acceso a app móvil</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Historial de 90 días</span>
                </li>
              </ul>
              <a 
                href="/activate-whatsapp" 
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-all block text-center"
              >
                Seleccionar Plan
              </a>
            </div>

            {/* Plan Premium - MÁS POPULAR */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-2xl p-8 text-center relative transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                  MÁS POPULAR
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Plan Premium</h3>
                <div className="text-4xl font-bold mb-2">$79</div>
                <div className="text-sm text-yellow-200 line-through">$119</div>
                <p className="text-purple-100 mt-2">3 meses</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Predicciones para 10+ sorteos diarios</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Análisis avanzado con Anbel IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Soporte prioritario por WhatsApp</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Notificaciones en tiempo real</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Historial completo ilimitado</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Estrategias exclusivas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Análisis de tendencias</span>
                </li>
              </ul>
              <a 
                href="/activate-whatsapp" 
                className="w-full bg-white text-purple-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-all block text-center"
              >
                Seleccionar Plan
              </a>
            </div>

            {/* Plan Pro */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Pro</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-2">$149</div>
                <div className="text-sm text-gray-500 line-through">$199</div>
                <p className="text-gray-600 mt-2">3 meses</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Predicciones ilimitadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">IA avanzada con machine learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Soporte VIP personalizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Notificaciones ultra-rápidas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Análisis de tendencias en tiempo real</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Estrategias personalizadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Acceso a funciones beta</span>
                </li>
              </ul>
              <a 
                href="/activate-whatsapp" 
                className="w-full bg-yellow-500 text-black py-3 px-6 rounded-xl font-semibold hover:bg-yellow-400 transition-all block text-center"
              >
                Seleccionar Plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Cambiar tu Vida?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Únete a más de 10,000 usuarios que ya están ganando con GanaFácil
            </p>
            
            {/* Urgency Elements */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-400/30">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Oferta Limitada</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-400/30">
                <span className="text-sm font-semibold">Solo 24 horas restantes</span>
              </div>
            </div>

            {/* Pricing Highlight */}
            <div className="bg-white/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="text-3xl font-bold mb-2">Prueba GRATIS por 3 días</div>
              <div className="text-lg text-blue-200 mb-4">Luego desde $39 por 3 meses</div>
              <div className="text-sm text-gray-300 line-through">Valor normal: $59 por 3 meses</div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/demo-ia" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
              >
                <Zap className="h-6 w-6" />
                Probar Demo GRATIS
              </a>
              <a 
                href="/activate-whatsapp" 
                className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
              >
                <MessageCircle className="h-6 w-6" />
                Activar Ahora
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Cancelar en cualquier momento</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Guarantee Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tu Seguridad es Nuestra Prioridad
            </h2>
            <p className="text-lg text-gray-600">
              Protegemos tu información con los más altos estándares de seguridad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Garantía de 30 Días</h3>
              <p className="text-gray-600">
                Si no estás satisfecho, te devolvemos tu dinero sin preguntas
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Datos Seguros</h3>
              <p className="text-gray-600">
                Encriptación SSL y cumplimiento con GDPR para proteger tu privacidad
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Certificado de Calidad</h3>
              <p className="text-gray-600">
                Algoritmos verificados y probados por expertos en estadísticas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">GanaFácil</h3>
              <p className="text-gray-300 mb-6">
                La plataforma de predicción de lotería más avanzada, potenciada por inteligencia artificial.
              </p>
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Inicio</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Características</a></li>
                <li><a href="#demo" className="text-gray-300 hover:text-green-400 transition-colors">Cómo Funciona</a></li>
                <li><a href="#stats" className="text-gray-300 hover:text-green-400 transition-colors">Resultados</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Responsabilidad</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-300">
                  <Mail className="h-4 w-4" />
                  info@ganafacil.com
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Phone className="h-4 w-4" />
                  +1 (234) 567-8900
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  Ciudad, País
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2023 GanaFácil - Todos los derechos reservados. Juega responsablemente.
            </p>
          </div>
        </div>
      </footer>

      {/* Improved Chatbot */}
      <ImprovedChatbot 
        isVisible={isChatbotVisible}
        onClose={() => setIsChatbotVisible(false)}
      />

      {/* PWA Components */}
      <PWAInstallBannerBilingual 
        isVisible={isPWAInstallVisible}
        onClose={() => setIsPWAInstallVisible(false)}
        language="es"
      />
      <ConnectionStatusBilingual language="es" />
      <PWADiagnostic />
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* Smooth Scroll */}
      <SmoothScroll />
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Back to Top */}
      <BackToTop />
      
      {/* Analytics */}
      <Analytics />
    </main>
  );
}