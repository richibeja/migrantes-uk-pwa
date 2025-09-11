'use client';

import { useState } from 'react';
import { Brain, Crown, MessageCircle, Bot, Target, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomeEn() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-6">
              🎯 WIN EASY
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4">
              AI-Powered Lottery Prediction System
            </p>
            
            {/* Anbel AI Agent - The Brain */}
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
                🧠 ANBEL AI AGENT - THE BRAIN
              </h2>
              <p className="text-2xl text-purple-200 mb-6">
                The world's most intelligent AI agent for lottery predictions
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Super Intelligent</h3>
                  <p className="text-sm text-gray-300">25+ advanced capabilities with Machine Learning and Deep Learning</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <Target className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Real Predictions</h3>
                  <p className="text-sm text-gray-300">Mathematical algorithms with historical data from 100+ draws</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 text-center">
                  <MessageCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Smart Chat</h3>
                  <p className="text-sm text-gray-300">Real-time responses with advanced predictive analysis</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/anbel-ai-en"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-10 py-5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 text-xl"
                >
                  <Bot className="w-8 h-8" />
                  <span>TRY ANBEL AI AGENT</span>
                </Link>
                <Link
                  href="/predictions-preview-en"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-10 py-5 rounded-xl hover:from-yellow-400 hover:to-gold transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105 text-xl"
                >
                  <Target className="w-8 h-8" />
                  <span>VIEW PREDICTIONS</span>
                </Link>
              </div>
            </div>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Advanced artificial intelligence algorithms that analyze historical patterns 
              to predict the most likely numbers to come out in 9 international lotteries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/predictions-preview-en"
                className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-8 py-4 rounded-xl text-xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold/50 border-2 border-yellow-300"
              >
                🎯 FEATURED PREDICTIONS
              </Link>
              <Link
                href="/dashboard-en"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl text-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50"
              >
                🚀 View Dashboard
              </Link>
              <Link
                href="/activate"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50"
              >
                🔑 Activate Code
              </Link>
            </div>
            
            {/* Access Methods */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/register"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-6 py-3 rounded-lg text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
              >
                📝 Create Account
              </Link>
              <Link
                href="/auth/login"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold px-6 py-3 rounded-lg text-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
              >
                🔐 Sign In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold px-6 py-3 rounded-lg text-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📋 Alternative Registration
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Access Methods */}
      <div className="py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How to Access WIN EASY?</h2>
            <p className="text-lg text-gray-300">Choose the method you prefer to get started</p>
            <div className="mt-4">
              <a
                href="/"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                🇪🇸 Versión en Español
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-blue-500/50 text-center">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">Activation Code</h3>
              <p className="text-gray-300 mb-4">Use an activation code for immediate access</p>
              <Link
                href="/activate"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                Activate Code
              </Link>
              <Link
                href="/predictions-preview-en"
                className="inline-block bg-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors ml-2"
              >
                View Predictions
              </Link>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-green-500/50 text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-green-400 mb-3">Create Account</h3>
              <p className="text-gray-300 mb-4">Register with email and password for full access</p>
              <Link
                href="/auth/register"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
              >
                Create Account
              </Link>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-purple-500/50 text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold text-purple-400 mb-3">Sign In</h3>
              <p className="text-gray-300 mb-4">If you already have an account, sign in here</p>
              <Link
                href="/auth/login"
                className="inline-block bg-purple-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Win Easy?</h2>
            <p className="text-xl text-gray-400">Cutting-edge technology to maximize your chances of winning</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Advanced AI</h3>
              <p className="text-gray-300">Artificial intelligence algorithms that analyze millions of combinations to find hidden patterns.</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Professional PWA</h3>
              <p className="text-gray-300">Install as a native app on your mobile. Works offline and syncs automatically.</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Real Time</h3>
              <p className="text-gray-300">Predictions that update constantly with the latest data and analysis.</p>
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
              <div className="text-gray-400">International Lotteries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-gray-400">Average Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-400">Updates</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">3</div>
              <div className="text-gray-400">AI Algorithms</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
