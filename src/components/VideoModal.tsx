'use client';

import { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Welcome to WIN EASY!",
      description: "Hi! I'm Sarah, and I've been using WIN EASY for 6 months. Let me show you how this amazing Lotto prediction app works.",
      avatar: "👩‍💼",
      appScreen: "welcome"
    },
    {
      title: "Opening the App",
      description: "First, I open the app and check today's predictions. The interface is clean and easy to use.",
      avatar: "📱",
      appScreen: "home"
    },
    {
      title: "Today's Predictions",
      description: "Look at these numbers - they have an 85% accuracy rate! The app shows me the most likely winning numbers.",
      avatar: "🎯",
      appScreen: "predictions"
    },
    {
      title: "My Success Story",
      description: "I've won over $15,000 using these predictions. The best part? It's only $27 for lifetime access!",
      avatar: "💰",
      appScreen: "results"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % demoSteps.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, demoSteps.length]);

  const renderAppScreen = (screen: string) => {
    switch (screen) {
      case "welcome":
        return (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">WIN EASY</h3>
              <p className="text-sm opacity-90">Lotto Predictions</p>
            </div>
          </div>
        );
      case "home":
        return (
          <div className="w-full h-full bg-white p-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg mb-4">
              <h4 className="font-bold">Today's Predictions</h4>
            </div>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-gray-600">Powerball - 85% Accuracy</p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[7, 23, 31, 42, 55].map((num, index) => (
                  <div key={index} className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "predictions":
        return (
          <div className="w-full h-full bg-white p-4">
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800 font-medium">✅ High Probability Numbers</p>
                <p className="text-xs text-green-600">Based on 6 months of data</p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[12, 28, 35, 41, 58].map((num, index) => (
                  <div key={index} className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {num}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Powerball: 12</p>
              </div>
            </div>
          </div>
        );
      case "results":
        return (
          <div className="w-full h-full bg-white p-4">
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800 font-medium">🎉 Congratulations!</p>
                <p className="text-xs text-yellow-600">You won $3,200!</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">$15,420</p>
                <p className="text-xs text-gray-500">Total Winnings</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-bold text-gray-900">WIN EASY Live Demo</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setCurrentStep(0)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Avatar Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 text-white rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                    {demoSteps[currentStep].avatar}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Sarah Johnson</h4>
                    <p className="text-sm opacity-90">WIN EASY User & Winner</p>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">{demoSteps[currentStep].title}</h5>
                  <p className="text-sm leading-relaxed">
                    {demoSteps[currentStep].description}
                  </p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Step {currentStep + 1} of {demoSteps.length}</span>
                  <span>{Math.round(((currentStep + 1) / demoSteps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* App Demo Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Live App Demo</h4>
              
              <div className="relative">
                <div className="w-80 h-96 bg-gray-900 rounded-3xl p-2 mx-auto">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    {renderAppScreen(demoSteps[currentStep].appScreen)}
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  LIVE
                </div>
                <div className="absolute -bottom-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  DEMO
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-green-600">85%</div>
                  <div className="text-xs text-gray-600">Accuracy</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-blue-600">10K+</div>
                  <div className="text-xs text-gray-600">Users</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-purple-600">$2.5M</div>
                  <div className="text-xs text-gray-600">Won</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
