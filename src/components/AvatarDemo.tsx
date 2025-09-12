'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function AvatarDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Hi! I'm Sarah, and I've been using WIN EASY for 6 months...",
    "Let me show you how this amazing Lotto prediction app works...",
    "First, I open the app and check today's predictions...",
    "Look at these numbers - they have an 85% accuracy rate!",
    "I've won over $15,000 using these predictions...",
    "The best part? It's only $27 for lifetime access!"
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentMessage(prev => (prev + 1) % messages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, messages.length]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Avatar Section */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-2xl">👩‍💼</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">Sarah Johnson</h3>
            <p className="text-sm opacity-90">WIN EASY User & Winner</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          <p className="text-sm leading-relaxed">
            {messages[currentMessage]}
          </p>
        </div>
      </div>

      {/* Demo Section */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Live Demo - See the App in Action</h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Phone Mockup */}
          <div className="relative">
            <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 mx-auto">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                {/* App Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold">WIN EASY</h5>
                    <span className="text-xs">Lotto Predictions</span>
                  </div>
                </div>
                
                {/* App Content */}
                <div className="p-4 space-y-4">
                  <div className="text-center">
                    <h6 className="font-semibold text-gray-900">Today's Predictions</h6>
                    <p className="text-sm text-gray-600">Powerball - 85% Accuracy</p>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {[7, 23, 31, 42, 55].map((num, index) => (
                      <div key={index} className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {num}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Powerball: 12</p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs text-green-800 font-medium">✅ High Probability Numbers</p>
                    <p className="text-xs text-green-600">Based on 6 months of data</p>
                  </div>
                  
                  <div className="text-center">
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold py-2 px-4 rounded-lg">
                      Get More Predictions
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              LIVE
            </div>
          </div>

          {/* Stats & Features */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h6 className="font-semibold text-gray-900 mb-2">Real-time Stats</h6>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Accuracy Rate:</span>
                  <span className="font-bold text-green-600">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Users Today:</span>
                  <span className="font-bold text-blue-600">2,847</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wins This Week:</span>
                  <span className="font-bold text-purple-600">1,234</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h6 className="font-semibold text-gray-900 mb-2">Why It Works</h6>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Advanced AI algorithms</li>
                <li>• Historical data analysis</li>
                <li>• Pattern recognition</li>
                <li>• Real-time updates</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h6 className="font-semibold text-gray-900 mb-2">Sarah's Results</h6>
              <div className="text-sm text-gray-700">
                <p>• Total Winnings: $15,420</p>
                <p>• Best Win: $3,200</p>
                <p>• Success Rate: 78%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
