'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, Zap, X, MessageCircle, ArrowRight, Star } from 'lucide-react';

interface AIBannerProps {
  onOpenAI: () => void;
  isVisible?: boolean;
  onClose?: () => void;
}

export default function AIBannerEn({ onOpenAI, isVisible = true, onClose }: AIBannerProps) {
  if (!isVisible) return null;

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    "🧠 Intelligent Emotional Analysis",
    "🎯 Personalized Predictions",
    "⚡ Real-Time Responses",
    "🔮 Continuous Learning",
    "💎 Conversation Memory",
    "🚀 Proactive Suggestions"
  ];

  useEffect(() => {
    setIsAnimating(true);
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transform transition-all duration-500 ${
      isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - AI Info */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-bold">ANBEL AI - MEGA INTELLIGENT</h3>
                  <div className="flex space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="animate-pulse">{features[currentFeature]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3 text-green-400" />
                    <span>94% Accuracy</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="w-3 h-3 text-blue-400" />
                    <span>Advanced AI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - CTA Button */}
            <div className="flex items-center space-x-3">
              <button
                onClick={onOpenAI}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-sm hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>TALK TO AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-300 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
