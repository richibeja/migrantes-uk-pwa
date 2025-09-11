'use client';

import React from 'react';
import RealTimeUSLotteryResultsEn from '@/components/RealTimeUSLotteryResultsEn';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RealTimeDashboardEn() {
    return (
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/activate-user');
    }
  }, [isAuthenticated, isLoading]); // Removed router dependency

  if (isLoading) {
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gold">🇺🇸 US Lotteries - Real Time</h1>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">LIVE</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/dashboard-en"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <RealTimeUSLotteryResultsEn />
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong>EASY WIN</strong> - Real-Time Prediction System
            </p>
            <p className="text-xs mt-1">
              Data updated every 2 minutes • Official US Lottery APIs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
