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
              <span className="text-lg sm:text-2xl font-bold">Gana Fácil</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-6">
              <a href="#features" className="hover:text-yellow-400 transition-colors text-sm">Features</a>
              <a href="#demo" className="hover:text-yellow-400 transition-colors text-sm">How It Works</a>
              <a href="#stats" className="hover:text-yellow-400 transition-colors text-sm">Results</a>
              <a href="#pricing" className="hover:text-yellow-400 transition-colors text-sm">Pricing</a>
            </nav>
            
            {/* Desktop Buttons */}
            <div className="hidden md:flex gap-2 lg:gap-3">
              <a href="/auth/login-en" className="px-3 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-all text-sm">
                Log In
              </a>
              <a href="/payment" className="px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-sm">
                Buy Now
              </a>
              <a href="#" className="px-3 py-2 border border-white text-white rounded-full bg-white/10 text-xs">
                🇬🇧 EN
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
                  Features
                </a>
                <a href="#demo" className="px-4 py-2 hover:text-yellow-400 transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  How It Works
                </a>
                <a href="#stats" className="px-4 py-2 hover:text-yellow-400 transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Results
                </a>
                <a href="#pricing" className="px-4 py-2 hover:text-yellow-400 transition-colors text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  Pricing
                </a>
                <div className="border-t border-white/20 pt-4 mt-4">
                  <a href="/auth/login-en" className="block px-4 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-900 transition-all text-sm text-center mb-2">
                    Log In
                  </a>
                  <a href="/payment" className="block px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all text-sm text-center mb-2">
                    Buy Now
                  </a>
                  <a href="#" className="block px-4 py-2 border border-white text-white rounded-full bg-white/10 transition-all text-sm text-center">
                    🇬🇧 English
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
            AI-Powered Lottery Predictions
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Discover the power of Anbel AI, our advanced system that analyzes patterns and probabilities to help you make smarter decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
            <a href="/payment" className="px-6 py-3 sm:px-8 sm:py-4 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              <Crown className="h-5 w-5" />
              Get Started Now
            </a>
            <a href="/demo-ia" className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all active:scale-95">
              Try Free Demo
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Simple */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
            Activate your account and start using Anbel AI to generate your lottery predictions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-lg mx-auto">
            <a href="/payment" className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-purple-600 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
              Buy Now
            </a>
            <a href="/demo-ia" className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
              Try Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - Simplificado */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">What Does Gana Fácil Do?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <Brain className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">🤖 Anbel AI</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Your intelligent assistant that generates predictions for UK, European and USA lotteries like Powerball and EuroMillions. 
                <strong className="text-blue-600"> Speaks with you in English</strong> and helps you with everything you need.
              </p>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg text-center hover:transform hover:-translate-y-2 transition-all duration-300">
              <Target className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">🎯 Easy to Use</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Just ask Anbel AI for the numbers you need. 
                <strong className="text-green-600"> It can also analyze your tickets</strong> to see if you won.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-12">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-3">✨ It's that simple!</h4>
              <p className="text-white/90 text-sm sm:text-base">
                1. Activate your account → 2. Chat with Anbel AI → 3. Get your predictions → 4. Play and win!
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
              🎯 What Does Gana Fácil Do with Anbel AI?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed">
              Discover the real power of our application and the lotteries we support
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* App Description */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-yellow-400 flex items-center">
                <Brain className="h-6 w-6 mr-3" />
                🧠 What Anbel AI Does
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-gray-200">
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 text-lg">🎲</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Intelligent Predictions</p>
                    <p>Analyzes historical patterns from 200+ draws to generate predictions with detailed explanations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-400 mr-3 text-lg">📱</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Ticket Analysis</p>
                    <p>Upload photos of your tickets and Anbel tells you if you won, how much, and how to improve</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-400 mr-3 text-lg">💬</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Smart Chat</p>
                    <p>Chat with Anbel in English, get explanations about lotteries and predictions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3 text-lg">🏆</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Points System</p>
                    <p>Earn points, levels and achievements for using the app and sharing predictions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lotteries Description */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-green-400 flex items-center">
                <Globe className="h-6 w-6 mr-3" />
                🎰 Lotteries We Support
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-gray-200">
                <div className="flex items-start">
                  <span className="text-blue-400 mr-3 text-lg">🇬🇧</span>
                  <div>
                    <p className="font-semibold text-white mb-1">3 UK Lotteries</p>
                    <p>National Lottery, Thunderball, Set For Life</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3 text-lg">🇪🇺</span>
                  <div>
                    <p className="font-semibold text-white mb-1">European Lotteries</p>
                    <p>EuroMillions, EuroMillions HotPicks</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-3 text-lg">🇺🇸</span>
                  <div>
                    <p className="font-semibold text-white mb-1">2 USA Lotteries</p>
                    <p>Powerball, Mega Millions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-3 text-lg">📊</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Real-Time Data</p>
                    <p>Official APIs for current jackpots, draw schedules and results</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-purple-400 mr-3 text-lg">🔮</span>
                  <div>
                    <p className="font-semibold text-white mb-1">Specific Predictions</p>
                    <p>Anbel knows the rules of each lottery and adapts predictions accordingly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-lg sm:text-xl text-yellow-300 mb-6 font-semibold">
              🚀 Ready to discover the power of Anbel AI?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/payment" className="px-6 py-3 sm:px-8 sm:py-4 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 active:scale-95">
                🎯 Buy Now
              </a>
              <a href="/demo-ia" className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all active:scale-95">
                🧪 Try Free Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section with Functional Tabs */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-100" id="demo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800">Experience the Power of Smart Predictions</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Our technology analyzes multiple factors simultaneously to generate predictions with high accuracy rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="/demo-ia" className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-green-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-all text-center active:scale-95">
                Try Free Demo
              </a>
              <a href="#pricing" className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-purple-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-purple-600 transition-all text-center active:scale-95">
                View Pricing
              </a>
              <a href="/payment" className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-blue-500 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 transition-all text-center active:scale-95">
                Buy Now
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12">Why Choose Gana Fácil?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">🤖 Anbel AI</h3>
              <p className="text-blue-100">
                Your personal assistant that speaks with you in English. 
                Helps you with predictions, ticket analysis and answers all your questions.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 text-green-400">🎯 UK, Europe & USA Lotteries</h3>
              <p className="text-blue-100">
                Specialized in major lotteries from UK, Europe and USA: 
                National Lottery, EuroMillions, Powerball, Mega Millions and more.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 sm:p-8 border border-white/20">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">✨ Start Now!</h3>
            <p className="text-blue-100 mb-6">
              Activate your account and start using Anbel AI to generate your predictions. 
              It's easy, fast and works on any device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a href="/payment" className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all">
                Buy Now
              </a>
              <a href="/demo-ia" className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Try Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that best fits your needs. All include full access to Anbel AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Free Trial Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Trial</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">FREE</div>
                <div className="text-sm text-gray-500 line-through">£39</div>
                <p className="text-gray-600 mt-2">3 days</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Basic predictions (3 draws)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Access to basic statistics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">WhatsApp support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">No commitment</span>
                </li>
              </ul>
              <a 
                href="/payment" 
                className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-all block text-center"
              >
                Start Free Trial
              </a>
            </div>

            {/* Basic Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Plan</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">£39</div>
                <div className="text-sm text-gray-500 line-through">£59</div>
                <p className="text-gray-600 mt-2">3 months</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Predictions for 5 daily draws</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Detailed AI statistics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">WhatsApp support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Push notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Mobile app access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">90-day history</span>
                </li>
              </ul>
              <a 
                href="/payment" 
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-all block text-center"
              >
                Select Plan
              </a>
            </div>

            {/* Premium Plan - MOST POPULAR */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-2xl p-8 text-center relative transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                <div className="text-4xl font-bold mb-2">£79</div>
                <div className="text-sm text-yellow-200 line-through">£119</div>
                <p className="text-purple-100 mt-2">3 months</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Predictions for 10+ daily draws</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Advanced analysis with Anbel AI</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Priority WhatsApp support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Real-time notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Unlimited complete history</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Exclusive strategies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Trend analysis</span>
                </li>
              </ul>
              <a 
                href="/payment" 
                className="w-full bg-white text-purple-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-all block text-center"
              >
                Select Plan
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h3>
                <div className="text-4xl font-bold text-yellow-600 mb-2">£149</div>
                <div className="text-sm text-gray-500 line-through">£199</div>
                <p className="text-gray-600 mt-2">3 months</p>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Unlimited predictions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Advanced AI with machine learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Personalized VIP support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Ultra-fast notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Real-time trend analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Personalized strategies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Access to beta features</span>
                </li>
              </ul>
              <a 
                href="/payment" 
                className="w-full bg-yellow-500 text-black py-3 px-6 rounded-xl font-semibold hover:bg-yellow-400 transition-all block text-center"
              >
                Select Plan
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
              Ready to Change Your Life?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Join over 10,000 users already winning with Gana Fácil
            </p>
            
            {/* Urgency Elements */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-400/30">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Limited Offer</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-400/30">
                <span className="text-sm font-semibold">Only 24 hours remaining</span>
              </div>
            </div>

            {/* Pricing Highlight */}
            <div className="bg-white/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="text-3xl font-bold mb-2">Try FREE for 3 days</div>
              <div className="text-lg text-blue-200 mb-4">Then from £39 for 3 months</div>
              <div className="text-sm text-gray-300 line-through">Regular price: £59 for 3 months</div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/demo-ia" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
              >
                <Zap className="h-6 w-6" />
                Try FREE Demo
              </a>
              <a 
                href="/payment" 
                className="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
              >
                <Crown className="h-6 w-6" />
                Buy Now
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No commitment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>24/7 Support</span>
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
              Your Security is Our Priority
            </h2>
            <p className="text-lg text-gray-600">
              We protect your information with the highest security standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">30-Day Guarantee</h3>
              <p className="text-gray-600">
                If you're not satisfied, we'll refund your money, no questions asked
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure Data</h3>
              <p className="text-gray-600">
                SSL encryption and GDPR compliance to protect your privacy
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Quality Certificate</h3>
              <p className="text-gray-600">
                Algorithms verified and tested by statistics experts
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
              <h3 className="text-2xl font-bold mb-4">Gana Fácil</h3>
              <p className="text-gray-300 mb-6">
                The most advanced lottery prediction platform, powered by artificial intelligence.
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
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Features</a></li>
                <li><a href="#demo" className="text-gray-300 hover:text-green-400 transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-green-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-gray-300 hover:text-green-400 transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Disclaimer</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-300">
                  <Mail className="h-4 w-4" />
                  support@ganafacil.app
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <Phone className="h-4 w-4" />
                  +44 7123 456789
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <MapPin className="h-4 w-4" />
                  London, United Kingdom
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 Gana Fácil - All rights reserved. Play responsibly. 18+
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
        language="en"
      />
      <ConnectionStatusBilingual language="en" />
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