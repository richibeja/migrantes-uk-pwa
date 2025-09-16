'use client';

import { useState, useEffect } from 'react';
import { Brain, ChartLine, Bot, Target, TrendingUp, BarChart3, Calendar, Zap, Crown, Bell, Clock, CheckCircle, DollarSign, Trophy, Star, Activity, Globe, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { LOTTERY_CONFIGS } from '@/lib/lotteryConfig';
import AnbelAIDashboard from '@/components/AnbelAIDashboard';
import LotteryPredictionPanel from '@/components/dashboard/LotteryPredictionPanel';
import JackpotTracker from '@/components/dashboard/JackpotTracker';
import ResultsTracker from '@/components/dashboard/ResultsTracker';
import LotteryAnalytics from '@/components/dashboard/LotteryAnalytics';
import HistoricalAnalysis from '@/components/dashboard/HistoricalAnalysis';
import PredictionEngine from '@/components/dashboard/PredictionEngine';
import NextDrawsCountdown from '@/components/dashboard/NextDrawsCountdown';

export default function DashboardEn() {
  const [userData, setUserData] = useState<any>(null);
  const [isActivated, setIsActivated] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = localStorage.getItem('ganaFacilUser');
        const activated = localStorage.getItem('ganafacil_activated');
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserData(user);
          setIsActivated(activated === 'true');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  // If not activated, show activation message
  if (!isActivated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-auto p-8">
          <Clock className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-2xl font-bold mb-2">Account Pending Activation</h2>
          <p className="text-lg opacity-80 mb-6">
            To access the complete dashboard with Anbel AI, you need to activate your account.
          </p>
          <Link 
            href="/activate-user-en" 
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
          >
            Activate Account
          </Link>
        </div>
      </div>
    );
  }

  // Show the full dashboard with same functionality as Spanish version
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Brain className="w-8 h-8 text-yellow-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse bg-green-400"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ANBEL CLUB - EasyWin</h1>
                <p className="text-sm text-yellow-300">
                  Anbel AI Mega Intelligent - Online
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm text-gray-300">
                <p>User: {userData?.name || 'Demo'}</p>
                <p>Plan: {userData?.plan?.toUpperCase() || 'PREMIUM'}</p>
                <p className="text-xs text-yellow-400">Code: {userData?.code || 'N/A'}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-12 h-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl font-bold">Welcome {userData?.name || 'User'}!</h1>
          </div>
          <p className="text-xl mb-6">
            Your account is fully activated with code: <span className="text-yellow-400 font-bold">{userData?.code || 'N/A'}</span>
          </p>
          <p className="text-lg mb-6">
            Plan: <span className="text-yellow-400 font-bold">{userData?.plan?.toUpperCase() || 'PREMIUM'}</span> - Full access to Anbel Club
          </p>
          <div className="flex items-center justify-center space-x-8 text-lg">
            <div className="flex items-center">
              <Globe className="w-6 h-6 mr-2" />
              <span>9 World Lotteries</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              <span>6 USA Lotteries</span>
            </div>
            <div className="flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              <span>Anbel AI 94.5% Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Status</p>
                <p className="text-2xl font-bold text-white">Active</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Predictions</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Accuracy</p>
                <p className="text-2xl font-bold text-white">94.5%</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Anbel AI</p>
                <p className="text-2xl font-bold text-white">Online</p>
              </div>
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Anbel AI Chat */}
        <div className="mb-8" data-chat-section>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-yellow-400" />
            Chat with Anbel AI
          </h3>
          <AnbelAIDashboard 
            userId={userData?.id || 'demo-user'} 
            language="en"
            onPredictionGenerated={(prediction) => {
              console.log('Prediction generated:', prediction);
            }}
            onAnalysisGenerated={(analysis) => {
              console.log('Analysis generated:', analysis);
            }}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-yellow-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              href="/dashboard-en/real-time"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-3"
            >
              <Activity className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Real-Time USA</p>
                <p className="text-sm opacity-80">Live results</p>
              </div>
            </Link>

            <button 
              onClick={() => {
                const chatElement = document.querySelector('[data-chat-section]');
                if (chatElement) {
                  chatElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                  alert('Chat with Anbel AI available on this page');
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
            >
              <Brain className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Chat with Anbel AI</p>
                <p className="text-sm opacity-80">Intelligent assistant</p>
              </div>
            </button>

            <button 
              onClick={() => {
                alert('Advanced Analysis:\n\n• Frequency patterns detected\n• Hot numbers: 12, 24, 36\n• Trend: Even sequences increasing\n• Confidence: 89.3%\n\nComing soon: Dedicated analysis page');
              }}
              className="bg-gradient-to-r from-green-600 to-yellow-600 text-white p-4 rounded-lg hover:from-green-700 hover:to-yellow-700 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
            >
              <BarChart3 className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Advanced Analysis</p>
                <p className="text-sm opacity-80">Patterns and trends</p>
              </div>
            </button>

            <button 
              onClick={() => {
                alert('Winnings History:\n\n• Total won: $2,400,000\n• Hits: 1,247 predictions\n• Accuracy: 94.5%\n• Best streak: 15 consecutive days\n• Last win: $50,000 (Powerball)\n\nComing soon: Detailed history page');
              }}
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-3 cursor-pointer"
            >
              <Trophy className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Winnings History</p>
                <p className="text-sm opacity-80">View results</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
