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
            href="/activate" 
            className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
          >
            Activate Account
          </Link>
        </div>
      </div>
    );
  }

  // Show the original Anbel AI dashboard
  return (
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
  );
}
