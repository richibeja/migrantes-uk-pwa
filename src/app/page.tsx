'use client';

import { useState, useEffect } from 'react';
import { Brain, Crown, MessageCircle, Bot, Target, Sparkles, ChartLine, Bolt, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Zap, BarChart3, Shield, Lock, Award, CheckCircle, Globe } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-3 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              <span className="text-lg sm:text-2xl font-bold">GanaFácil</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-6">
              <a href="#features" className="hover:text-yellow-400 transition-colors text-sm">Características</a>
              <a href="#demo" className="hover:text-yellow-400 transition-colors text-sm">Cómo Funciona</a>
              <a href="#stats" className="hover:text-yellow-400 transition-colors text-sm">Resultados</a>
              <a href="#pricing" className="hover:text-yellow-400 transition-colors text-sm">Precios</a>
            </nav>
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-2 lg:gap-3">
              <a href="/auth/login" className="px-3 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-all text-sm">
                Iniciar Sesión
              </a>
              <a href="/activate-whatsapp" className="px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-sm">
                Activar WhatsApp
              </a>
              <a href="/page-en" className="px-3 py-2 border border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-all text-xs">
                🇺🇸 EN
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10 py-4 mt-3">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="px-4 py-2 hover:text-yellow-400 transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Características
                </a>
                <a href="#demo" className="px-4 py-2 hover:text-yellow-400 transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Cómo Funciona
                </a>
                <a href="#stats" className="px-4 py-2 hover:text-yellow-400 transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Resultados
                </a>
                <a href="#pricing" className="px-4 py-2 hover:text-yellow-400 transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Precios
                </a>
                <div className="border-t border-white/20 pt-4 mt-4">
                  <a href="/auth/login" className="block px-4 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-all text-sm text-center mb-2">
                    Iniciar Sesión
                  </a>
                  <a href="/activate-whatsapp" className="block px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-sm text-center mb-2">
                    Activar WhatsApp
                  </a>
                  <a href="/page-en" className="block px-4 py-2 border border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-all text-sm text-center">
                    🇺🇸 English
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Predicciones de Lotería con Inteligencia Artificial
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Descubre el poder de Anbel IA, nuestro sistema avanzado que analiza patrones y probabilidades para ayudarte a tomar decisiones más inteligentes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
            <a href="/activate-whatsapp" className="px-6 py-3 sm:px-8 sm:py-4 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 active:scale-95">
              Activar por WhatsApp
            </a>
            <a href="/demo-ia" className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all active:scale-95">
              Demo Interactiva
            </a>
            <button 
              onClick={() => setIsChatbotVisible(true)}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Chat con IA</span>
              <span className="sm:hidden">Chat IA</span>
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Simple */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">¿Listo para empezar?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
            Activa tu cuenta y comienza a usar Anbel IA para generar tus predicciones de lotería.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-lg mx-auto">
            <a href="/activate" className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-purple-600 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
              Activar Cuenta
            </a>
            <a href="/activate-whatsapp" className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all active:scale-95 flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - Simplificado */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">¿Qué hace GanaFácil?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <Brain className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">🤖 Anbel IA</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Tu asistente inteligente que genera predicciones para loterías de USA como Powerball y Mega Millions. 
                <strong className="text-blue-600"> Habla contigo en español e inglés</strong> y te ayuda con todo lo que necesites.
              </p>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <Target className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">🎯 Fácil de Usar</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Solo tienes que pedirle a Anbel IA los números que necesites. 
                <strong className="text-green-600"> También puede analizar tus tickets</strong> para ver si ganaste.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-3">✨ ¡Es así de simple!</h4>
              <p className="text-white/90 text-sm sm:text-base">
                1. Activa tu cuenta → 2. Habla con Anbel IA → 3. Recibe tus predicciones → 4. ¡Juega y gana!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Description & Lotteries Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              🎯 ¿Qué hace GanaFácil con Anbel IA?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Descubre el poder real de nuestra aplicación y las loterías que manejamos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* App Description */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-yellow-400 flex items-center">
                <Brain className="h-6 w-6 mr-3" />
                🧠 Lo que hace Anbel IA
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-gray-200">
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 text-lg">🎲</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Predicciones Inteligentes</p>
                    <p>Analiza patrones históricos de 200+ sorteos para generar predicciones con explicación detallada</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-400 mr-3 text-lg">📱</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Análisis de Tickets</p>
                    <p>Sube fotos de tus tickets y Anbel te dice si ganaste, cuánto y cómo mejorar</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-400 mr-3 text-lg">💬</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Chat Inteligente</p>
                    <p>Conversa con Anbel en español e inglés, te explica todo sobre loterías y predicciones</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3 text-lg">🏆</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Sistema de Puntos</p>
                    <p>Gana puntos, niveles y logros por usar la app y compartir predicciones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lotteries Description */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-400 flex items-center">
                <Globe className="h-6 w-6 mr-3" />
                🎰 Loterías que Maneja
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-gray-200">
                <div className="flex items-start">
                  <span className="text-red-400 mr-3 text-lg">🇺🇸</span>
                  <div>
                    <p className="font-semibold text-white mb-1">6 Loterías de USA</p>
                    <p>Powerball, Mega Millions, Cash4Life, Lucky for Life, Hot Lotto, Pick 6, Fantasy 5</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-400 mr-3 text-lg">🌍</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Loterías Internacionales</p>
                    <p>EuroMillions, Baloto, Primitiva, Bonoloto y más</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3 text-lg">📊</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Datos en Tiempo Real</p>
                    <p>APIs oficiales para jackpots actuales, horarios de sorteos y resultados</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-400 mr-3 text-lg">🔮</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Predicciones Específicas</p>
                    <p>Anbel conoce las reglas de cada lotería y adapta sus predicciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-lg sm:text-xl text-yellow-300 mb-6 font-semibold">
              🚀 ¿Listo para descubrir el poder de Anbel IA?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/activate-whatsapp" className="px-6 py-3 sm:px-8 sm:py-4 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 active:scale-95">
                🎯 Activar Ahora
              </a>
              <a href="/demo-ia" className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all active:scale-95">
                🧪 Probar Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section with Functional Tabs */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-100" id="demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">Experimenta el poder de la predicción inteligente</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Nuestra tecnología analiza múltiples factores simultáneamente para generar predicciones con alto porcentaje de precisión.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/demo-ia" className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-all text-center active:scale-95">
                Probar Demo Gratis
              </a>
              <a href="#pricing" className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-all text-center active:scale-95">
                Ver Precios
              </a>
              <a href="/activate-whatsapp" className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-all text-center active:scale-95">
                Activar WhatsApp
              </a>
            </div>
          </div>
          
          {/* Functional Tabs */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <GanaFacilTabs />
          </div>
        </div>
      </section>

      {/* Simple Info Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white" id="info">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12">¿Por qué elegir GanaFácil?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">🤖 Anbel IA</h3>
              <p className="text-blue-100">
                Tu asistente personal que habla contigo en español e inglés. 
                Te ayuda con predicciones, análisis de tickets y responde todas tus preguntas.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-green-400">🎯 Loterías USA</h3>
              <p className="text-blue-100">
                Especializado en las principales loterías de Estados Unidos: 
                Powerball, Mega Millions, Cash4Life y más.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 sm:p-8 border border-white/20">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">✨ ¡Comienza ahora!</h3>
            <p className="text-blue-100 mb-6">
              Activa tu cuenta y empieza a usar Anbel IA para generar tus predicciones. 
              Es fácil, rápido y funciona en cualquier dispositivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a href="/activate" className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all">
                Activar Cuenta
              </a>
              <a href="/activate-whatsapp" className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">
                WhatsApp
              </a>
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