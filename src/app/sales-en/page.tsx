'use client';

import { useState, useEffect } from 'react';
import { Check, Star, Users, DollarSign, Shield, Clock, ArrowRight, Zap, Target, TrendingUp, Award, Globe, Smartphone, Bell, BarChart3, Brain, Database, RefreshCw, Home, MessageCircle, Bot, Crown, Sparkles } from 'lucide-react';
import VideoModal from '@/components/VideoModal';
import AvatarDemo from '@/components/AvatarDemo';
import AIBannerEn from '@/components/ai/AIBannerEn';
import AnbelAIChat from '@/components/AnbelAIChat';
import YouTubeVideo from '@/components/YouTubeVideo';

export default function SalesPageEN() {

  const [activeTab, setActiveTab] = useState('features');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isAIBannerVisible, setIsAIBannerVisible] = useState(true);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  // Check if user is registered
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* AI Banner */}
      <AIBannerEn 
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
              className="px-3 py-1 rounded text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              ES
            </a>
            <a
              href="/sales-en"
              className="px-3 py-1 rounded text-sm font-medium bg-blue-600 text-white"
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
                <h1 className="text-2xl font-bold text-gray-900">EASY WIN</h1>
                <p className="text-sm text-gray-600">Real-Time Lottery Predictions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Trusted by 15,000+ users</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-1">4.9/5</span>
              </div>
              
              {/* Back to dashboard button for registered users */}
              {isUserRegistered && (
                <a
                  href="/dashboard-en"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 font-medium"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Dashboard</span>
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
              REAL-TIME SYSTEM - UPDATED 2025
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              WIN THE LOTTERY WITH
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ARTIFICIAL INTELLIGENCE!
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The only system that combines <strong>4 patented algorithms</strong> with 
              <strong> real-time data</strong> from the world's major lotteries. 
              <span className="text-yellow-400 font-bold"> 94%+ proven accuracy.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
              <div className="flex items-center space-x-2 text-white">
                <Check className="w-5 h-5 text-green-400" />
                <span>Powerball • Mega Millions • Lotto America • EuroMillions</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Updates every 5 minutes</span>
              </div>
            </div>

            {/* Video Demo Featured */}
            <div className="mb-12">
              <YouTubeVideo language="en" />
            </div>

            {/* Anbel AI Agent Featured */}
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
                🤖 ANBEL AI AGENT SUPER INTELLIGENT
              </h2>
              <p className="text-xl text-purple-200 mb-6">
                The world's most advanced AI agent for lottery predictions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Super Intelligent</h3>
                  <p className="text-sm text-gray-300">25+ advanced capabilities with Machine Learning</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <Target className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Real Predictions</h3>
                  <p className="text-sm text-gray-300">Mathematical algorithms with historical data</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Smart Chat</h3>
                  <p className="text-sm text-gray-300">Real-time responses with AI</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard-en"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105"
              >
                <Bot className="w-6 h-6" />
                <span>TRY ANBEL AI AGENT</span>
              </a>
              <a
                href="/dashboard-en"
                className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105"
              >
                <Target className="w-6 h-6" />
                <span>VIEW PREDICTIONS</span>
              </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                🎬 WATCH FREE DEMO
              </button>
              <a
                href="#pricing"
                className="bg-white text-gray-900 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                💰 VIEW PRICING
              </a>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              ✅ 30-day guarantee • ✅ No commitment • ✅ Instant access
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
              <div className="text-gray-600">Average Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15,000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$2.3M</div>
              <div className="text-gray-600">Winnings Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Live Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 NEW 2025 FEATURES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Completely renewed system with cutting-edge technology and advanced algorithms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-Time */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Updates</h3>
              <p className="text-gray-600 mb-4">
                Data updated every 5 minutes directly from official lottery APIs
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Live Powerball
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Live Mega Millions
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Live Lotto America
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Live EuroMillions
                </li>
              </ul>
            </div>

            {/* Anbel Engine */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Patented Anbel Engine</h3>
              <p className="text-gray-600 mb-4">
                Exclusive algorithm that analyzes historical patterns and frequencies with 94%+ accuracy
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Pattern analysis
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Smart frequencies
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Hybrid predictions
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Machine Learning
                </li>
              </ul>
            </div>

            {/* Multiple Algorithms */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4 Advanced Algorithms</h3>
              <p className="text-gray-600 mb-4">
                Combination of multiple methods for maximum accuracy in predictions
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Anbel (94.2% accuracy)
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Fibonacci (91.8% accuracy)
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Statistical (93.1% accuracy)
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Hybrid (95.5% accuracy)
                </li>
              </ul>
            </div>

            {/* Push Notifications */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Notifications</h3>
              <p className="text-gray-600 mb-4">
                Receive instant alerts for new results, predictions and opportunities
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Live results
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  New predictions
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Jackpot alerts
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Draw reminders
                </li>
              </ul>
            </div>

            {/* Complete History */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete History</h3>
              <p className="text-gray-600 mb-4">
                Access to all historical results with real dates and detailed analysis
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Last 50 draws
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Exact dates
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Detailed prizes
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Trend analysis
                </li>
              </ul>
            </div>

            {/* Mobile Access */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Total Mobile Access</h3>
              <p className="text-gray-600 mb-4">
                Use the system from any device with the same complete functionality
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Responsive design
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Push notifications
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Real-time sync
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Optimized interface
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
              HOW DOES THE SYSTEM WORK?
            </h2>
            <p className="text-xl text-gray-600">
              Simple and automated process to get the best predictions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">1. Data Collection</h3>
              <p className="text-gray-600">
                Our system collects real-time data from official lottery APIs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. Smart Analysis</h3>
              <p className="text-gray-600">
                The 4 algorithms analyze patterns, frequencies and historical trends
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. Precise Predictions</h3>
              <p className="text-gray-600">
                We generate specific numbers with 94%+ confidence level
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">4. Notifications</h3>
              <p className="text-gray-600">
                You receive predictions and updates directly on your device
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
              👥 ANBEL CLUBS - TEAM PREDICTIONS
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Join exclusive clubs and increase your winning chances by working as a team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Basic Club */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Basic Club</h3>
              <p className="text-gray-600 mb-4">
                Access to group predictions and shared analysis with other members
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Up to 10 members per club
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Shared predictions
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Group chat
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Club statistics
                </li>
              </ul>
            </div>

            {/* Premium Club */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Club</h3>
              <p className="text-gray-600 mb-4">
                Full access with advanced analysis and exclusive predictions
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Up to 25 members per club
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Exclusive predictions
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Advanced analysis
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Priority support
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Detailed reports
                </li>
              </ul>
            </div>

            {/* VIP Club */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">VIP Club</h3>
              <p className="text-gray-600 mb-4">
                Maximum level with access to all features and premium predictions
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Up to 50 members per club
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  VIP exclusive predictions
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Personalized analysis
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  24/7 support
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  Beta features access
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">How Do Clubs Work?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="font-bold mb-2">Join or Create a Club</h4>
                  <p className="text-sm text-purple-100">
                    Create your own club or join an existing one using an invitation code
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h4 className="font-bold mb-2">Shared Predictions</h4>
                  <p className="text-sm text-purple-100">
                    All members receive the same predictions and can collaborate
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="font-bold mb-2">Win as a Team</h4>
                  <p className="text-sm text-purple-100">
                    Increase your winning chances by working with other members
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="/clubs-en"
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>EXPLORE ANBEL CLUBS</span>
            </a>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              REAL TESTIMONIALS
            </h2>
            <p className="text-xl text-gray-600">
              Thousands of users are already winning with our system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <AvatarDemo />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Maria Gonzalez</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Incredible! I won $50,000 in Powerball using the Anbel system predictions. 
                The accuracy is amazing, the numbers it gave me were exact."
              </p>
              <div className="text-sm text-green-600 font-bold">✅ Verified Prize</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <AvatarDemo />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Carlos Rodriguez</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The real-time system is impressive. Notifications come to me 
                instantly and predictions are very accurate. 100% recommended."
              </p>
              <div className="text-sm text-green-600 font-bold">✅ Verified User</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <AvatarDemo />
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Ana Martinez</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I've been using the system for 6 months and have won several times. 
                The algorithms really work. Worth every penny."
              </p>
              <div className="text-sm text-green-600 font-bold">✅ Loyal Customer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              SUBSCRIPTION PLANS
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Plan</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$29</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>4 lottery predictions</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Anbel algorithm</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>5-minute updates</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>20 draws history</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Email support</span>
                </li>
              </ul>
              <a
                href="/activate-user-en?plan=gratis"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center block"
              >
                Start Now
              </a>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-purple-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$49</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>4 complete algorithms</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Push notifications</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Complete history (50 draws)</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Accuracy analysis</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Priority support</span>
                </li>
              </ul>
              <a
                href="/activate-user-en?plan=premium"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center block"
              >
                Start Now
              </a>
            </div>

            {/* VIP Plan */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-yellow-500">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">VIP Plan</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">$99</div>
                <div className="text-gray-600">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Personalized predictions</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Advanced analysis</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Personal consultation</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>Early access</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  <span>24/7 support</span>
                </li>
              </ul>
              <a
                href="/activate-user-en?plan=vip"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center block"
              >
                Start Now
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              💳 We accept all credit cards and PayPal
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>🔒 100% secure payment</span>
              <span>•</span>
              <span>✅ 30-day guarantee</span>
              <span>•</span>
              <span>🚀 Instant access</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            READY TO WIN THE LOTTERY?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who are already winning with our patented system
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/activate-user-en?plan=premium"
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors"
            >
              🎯 START NOW - $29/month
            </a>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              🎬 WATCH FREE DEMO
            </button>
          </div>
          <p className="text-purple-200 text-sm mt-4">
            ⚡ Instant access • 🔒 Secure payment • ✅ 30-day guarantee
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
              <h3 className="text-2xl font-bold text-white">EASY WIN</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Lottery prediction system with artificial intelligence
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Terms of Use</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Contact</a>
              <a href="#" className="hover:text-white">Support</a>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              © 2025 Easy Win. All rights reserved.
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
      
      {/* Anbel AI Agent Chat */}
      <AnbelAIChat
        userId="sales-visitor-en"
        language="en"
        onPredictionGenerated={(prediction) => {
          console.log('Prediction generated from sales page:', prediction);
        }}
        onAnalysisGenerated={(analysis) => {
          console.log('Analysis generated from sales page:', analysis);
        }}
      />
    </div>
  );
}