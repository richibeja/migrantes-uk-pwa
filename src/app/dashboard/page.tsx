'use client';

import { useState, useEffect } from 'react';
import { Brain, TrendingUp, Crown, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { getEnabledLotteries } from '@/config/lotteries-uk-production';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lotteriesCount, setLotteriesCount] = useState(8);

  useEffect(() => {
    // Check if user is activated
    const userData = localStorage.getItem('user');
    const isActivated = localStorage.getItem('ganafacil_activated');
    
    if (!userData || !isActivated) {
      // Redirect to login if not activated
      window.location.href = '/auth/login-en';
      return;
    }

    setUser(JSON.parse(userData));
    
    // Get active lotteries count
    const activeLotteries = getEnabledLotteries();
    setLotteriesCount(activeLotteries.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('ganafacil_activated');
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">Gana Fácil</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-white hover:text-yellow-400 transition-colors">
                Dashboard
              </Link>
              <Link href="/anbel-ai" className="text-white hover:text-yellow-400 transition-colors">
                AI Chat
              </Link>
              <Link href="/predictions" className="text-white hover:text-yellow-400 transition-colors">
                Predictions
              </Link>
              <Link href="/profile" className="text-white hover:text-yellow-400 transition-colors">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <nav className="flex flex-col gap-3">
                <Link href="/dashboard" className="text-white hover:text-yellow-400 transition-colors py-2">
                  Dashboard
                </Link>
                <Link href="/anbel-ai" className="text-white hover:text-yellow-400 transition-colors py-2">
                  AI Chat
                </Link>
                <Link href="/predictions" className="text-white hover:text-yellow-400 transition-colors py-2">
                  Predictions
                </Link>
                <Link href="/profile" className="text-white hover:text-yellow-400 transition-colors py-2">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors justify-center"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.email?.split('@')[0] || 'User'}! 👋
          </h1>
          <p className="text-blue-200">
            Your {user.plan || 'Premium'} plan is active and ready to use
          </p>
        </div>

        {/* Subscription Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Crown className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Your Plan</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-400 capitalize">{user.plan || 'Premium'}</p>
            <p className="text-sm text-blue-200 mt-1">Active subscription</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Predictions Today</h3>
            </div>
            <p className="text-2xl font-bold text-green-400">10</p>
            <p className="text-sm text-blue-200 mt-1">Remaining</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">AI Accuracy</h3>
            </div>
            <p className="text-2xl font-bold text-purple-400">94.5%</p>
            <p className="text-sm text-blue-200 mt-1">Success rate</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            href="/anbel-ai"
            className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl p-6 text-white hover:scale-105 transition-transform"
          >
            <Brain className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-1">AI Chat</h3>
            <p className="text-sm text-purple-100">Chat with Anbel AI</p>
          </Link>

          <Link
            href="/predictions"
            className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-6 text-white hover:scale-105 transition-transform"
          >
            <TrendingUp className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Predictions</h3>
            <p className="text-sm text-green-100">Get AI predictions</p>
          </Link>

          <Link
            href="/clubs"
            className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white hover:scale-105 transition-transform"
          >
            <Crown className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Clubs</h3>
            <p className="text-sm text-yellow-100">Lottery clubs</p>
          </Link>

          <Link
            href="/profile"
            className="bg-gradient-to-br from-pink-500 to-red-500 rounded-xl p-6 text-white hover:scale-105 transition-transform"
          >
            <Crown className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-1">Profile</h3>
            <p className="text-sm text-pink-100">Your account</p>
          </Link>
        </div>

        {/* Lotteries Preview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Today's Featured Lotteries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* UK National Lottery */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇬🇧</span>
                <h3 className="text-lg font-semibold text-white">UK National Lottery</h3>
              </div>
              <p className="text-sm text-blue-200 mb-3">Next Draw: Wednesday 20:30 GMT</p>
              <Link
                href="/predictions"
                className="block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Prediction
              </Link>
            </div>

            {/* Powerball */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇺🇸</span>
                <h3 className="text-lg font-semibold text-white">Powerball</h3>
              </div>
              <p className="text-sm text-blue-200 mb-3">Next Draw: Saturday 22:59 ET</p>
              <Link
                href="/predictions"
                className="block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Prediction
              </Link>
            </div>

            {/* EuroMillions */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇪🇺</span>
                <h3 className="text-lg font-semibold text-white">EuroMillions</h3>
              </div>
              <p className="text-sm text-blue-200 mb-3">Next Draw: Friday 20:45 CET</p>
              <Link
                href="/predictions"
                className="block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Prediction
              </Link>
            </div>

            {/* Baloto - NUEVO */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                NEW
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇨🇴</span>
                <h3 className="text-lg font-semibold text-white">Baloto</h3>
              </div>
              <p className="text-sm text-blue-200 mb-3">Next Draw: Saturday 23:00 COT</p>
              <Link
                href="/predictions"
                className="block w-full bg-green-500 text-white text-center py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                Get Prediction
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/predictions"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
            >
              View All {lotteriesCount} Lotteries →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}




