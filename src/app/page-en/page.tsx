'use client';

import { useState, useEffect } from 'react';
import { Brain, Crown, MessageCircle, Bot, Target, Sparkles, ChartLine, Bolt, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Zap, BarChart3, Shield, CheckCircle } from 'lucide-react';

export default function PageEn() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="text-white text-xl mt-4">Loading Anbel IA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              GanaFácil with{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Anbel IA
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              The world's most advanced lottery prediction system powered by artificial intelligence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Activate Code
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Revolutionary Features
            </h2>
            <p className="text-xl text-blue-100">
              Powered by the most advanced AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Mega Intelligence</h3>
              <p className="text-blue-100">
                6 advanced ML algorithms working together to provide the most accurate predictions
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Chat</h3>
              <p className="text-blue-100">
                Conversational AI that understands and responds in multiple languages
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Predictions</h3>
              <p className="text-blue-100">
                Get instant predictions with 96.8% accuracy for 15+ lotteries worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">GanaFácil</h3>
              <p className="text-blue-100">
                The most advanced lottery prediction system powered by Anbel IA
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Mega Intelligence</li>
                <li>Real-time Predictions</li>
                <li>Smart Chat</li>
                <li>Multi-language Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-blue-100">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Documentation</li>
                <li>API Reference</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-blue-100 hover:text-white cursor-pointer" />
                <Twitter className="w-6 h-6 text-blue-100 hover:text-white cursor-pointer" />
                <Instagram className="w-6 h-6 text-blue-100 hover:text-white cursor-pointer" />
                <Youtube className="w-6 h-6 text-blue-100 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-blue-100">
            <p>&copy; 2024 GanaFácil with Anbel IA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
