'use client';

import React from 'react';
import { Target, Crown, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PredictionsPreviewEnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🎯</div>
              <div>
                <h1 className="text-3xl font-bold text-gold">FEATURED PREDICTIONS</h1>
                <p className="text-gray-300">Preview - Activation Required</p>
              </div>
            </div>
            
            <Link
              href="/"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Activation required banner */}
        <div className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 rounded-3xl p-8 mb-8 text-black text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Lock className="w-12 h-12" />
            <h2 className="text-4xl font-bold">ACTIVATION REQUIRED</h2>
            <Lock className="w-12 h-12" />
          </div>
          <p className="text-xl font-semibold mb-6">
            Predictions are available only for activated users
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/activate"
              className="bg-black text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Crown className="w-6 h-6" />
              <span>ACTIVATE CODE</span>
            </Link>
            <Link
              href="/auth/register"
              className="bg-white text-black px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-6 h-6" />
              <span>CREATE ACCOUNT</span>
            </Link>
          </div>
        </div>

        {/* Preview of what they'll get */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <h3 className="text-2xl font-bold text-gold mb-4">🎯 Premium Predictions</h3>
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-2">Powerball - Next Draw</div>
                <div className="flex space-x-2 mb-2">
                  {[7, 15, 23, 31, 42].map((num, index) => (
                    <div key={index} className="bg-gold text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {num}
                    </div>
                  ))}
                  <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                    12
                  </div>
                </div>
                <div className="text-gold font-bold">Confidence: 87%</div>
              </div>
              <div className="text-center text-gray-400">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <p>Activate your account to see all predictions</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <h3 className="text-2xl font-bold text-gold mb-4">📊 Advanced Analysis</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-gold">95%</div>
                  <div className="text-gray-400 text-sm">Accuracy</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">24/7</div>
                  <div className="text-gray-400 text-sm">Updates</div>
                </div>
              </div>
              <div className="text-center text-gray-400">
                <Lock className="w-8 h-8 mx-auto mb-2" />
                <p>Full access with activation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits of activation */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-600/50">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">What do you get when you activate?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Real Predictions</h4>
              <p className="text-gray-300 text-sm">
                AI-analyzed numbers with 95% accuracy
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Premium Access</h4>
              <p className="text-gray-300 text-sm">
                All international lotteries without restrictions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Updates</h4>
              <p className="text-gray-300 text-sm">
                Predictions updated every 5 minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong>GANA FÁCIL</strong> - Premium Predictions
            </p>
            <p className="text-xs mt-1">
              Activate your account to access all predictions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
