'use client';

import { useState, useEffect } from 'react';
import { Brain, Crown, Users, TrendingUp, LogOut, Menu, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ClubsPage() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const isActivated = localStorage.getItem('ganafacil_activated');
    
    if (!userData || !isActivated) {
      window.location.href = '/auth/login-en';
      return;
    }

    setUser(JSON.parse(userData));
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
          <p>Loading...</p>
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
        {/* Back Button */}
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white hover:text-yellow-400 transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </Link>

        {/* Coming Soon Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-12 text-center">
          <Users className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Lottery Clubs
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Coming Soon!
          </p>
          <p className="text-lg text-blue-300 max-w-2xl mx-auto mb-8">
            Join forces with other players to increase your chances of winning. 
            Pool resources, share costs, and celebrate victories together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/5 rounded-xl p-6">
              <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Premium Clubs</h3>
              <p className="text-sm text-blue-200">Join exclusive high-stake pools</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-sm text-blue-200">Connect with other players</p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Better Odds</h3>
              <p className="text-sm text-blue-200">Increase your winning chances</p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

