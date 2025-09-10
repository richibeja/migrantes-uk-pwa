'use client';

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Zap, 
  Star, 
  TrendingUp, 
  Clock, 
  RefreshCw,
  Copy,
  CheckCircle,
  AlertCircle,
  Crown
} from 'lucide-react';

interface Prediction {
  id: string;
  numbers: number[];
  confidence: number;
  specialBall: number | null;
  analysisStatus: 'pending' | 'analyzing' | 'completed';
  createdAt: string;
  analysisMethods: string[];
  lastUpdated: string;
  nextUpdate: string;
}

interface Lottery {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  drawDays: string[];
  jackpot: string;
  nextDraw: string;
  predictions: Prediction[];
  confidence: number;
  lastWin: string;
  winAmount: string;
  logo: string;
  specialBallName: string;
  specialBallRange: number;
  totalNumbers: number;
  specialBallNumbers: number;
  isVerified?: boolean;
  lastDrawResults?: number[];
  lastDrawDate?: string;
  drawTime: string;
  timezone: string;
}

interface PredictionHighlightProps {
  lottery: Lottery;
  onAnalyze?: (lotteryId: string, predictionId: string) => void;
}

export default function PredictionHighlightEn({ lottery, onAnalyze }: PredictionHighlightProps) {
  const [copiedNumbers, setCopiedNumbers] = useState<string | null>(null);
  const [showAllPredictions, setShowAllPredictions] = useState(false);

  const copyNumbers = (numbers: number[], specialBall?: number | null) => {
    const numbersText = numbers.join(', ');
    const fullText = specialBall ? `${numbersText} + ${specialBall}` : numbersText;
    
    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedNumbers(fullText);
      setTimeout(() => setCopiedNumbers(null), 2000);
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-400 bg-green-900/30 border-green-500';
    if (confidence >= 90) return 'text-yellow-400 bg-yellow-900/30 border-yellow-500';
    if (confidence >= 85) return 'text-orange-400 bg-orange-900/30 border-orange-500';
    return 'text-red-400 bg-red-900/30 border-red-500';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 95) return <Crown className="w-5 h-5" />;
    if (confidence >= 90) return <Star className="w-5 h-5" />;
    if (confidence >= 85) return <TrendingUp className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 95) return 'EXCELLENT';
    if (confidence >= 90) return 'VERY HIGH';
    if (confidence >= 85) return 'HIGH';
    return 'MEDIUM';
  };

  const formatNextDraw = (nextDraw: string) => {
    const date = new Date(nextDraw);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Already passed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };

  const displayedPredictions = showAllPredictions ? lottery.predictions : lottery.predictions.slice(0, 1);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-6 border-2 border-gold/30 shadow-2xl shadow-gold/20">
      {/* Header with lottery information */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="text-4xl">🎯</div>
          <div>
            <h3 className="text-2xl font-bold text-gold">{lottery.name}</h3>
            <p className="text-gray-300">{lottery.country}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-gold font-bold text-lg">{lottery.jackpot}</div>
            <div className="text-gray-400 text-sm">Jackpot</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-gold font-bold text-lg">{formatNextDraw(lottery.nextDraw)}</div>
            <div className="text-gray-400 text-sm">Next Draw</div>
          </div>
        </div>
      </div>

      {/* Highlighted predictions */}
      <div className="space-y-4">
        {displayedPredictions.map((prediction, index) => (
          <div key={prediction.id} className="bg-gray-800/70 rounded-2xl p-6 border border-gray-600/50">
            {prediction.analysisStatus === 'pending' ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-lg mb-6">
                  🔒 Numbers are hidden until analysis
                </div>
                <button
                  onClick={() => onAnalyze?.(lottery.id, prediction.id)}
                  className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold/50 border-2 border-yellow-300"
                >
                  🔍 Analyze Prediction
                </button>
              </div>
            ) : prediction.analysisStatus === 'analyzing' ? (
              <div className="text-center py-8">
                <div className="text-gold text-lg mb-6 animate-pulse">
                  🔬 Analyzing numbers in real time...
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-gold h-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <div className="text-sm text-gray-400">Processing prediction algorithms...</div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main numbers */}
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Target className="w-6 h-6 text-gold" />
                    <h4 className="text-gold font-bold text-xl">Predicted Numbers</h4>
                    <Target className="w-6 h-6 text-gold" />
                  </div>
                  
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {prediction.numbers.map((num, numIndex) => (
                      <div 
                        key={numIndex} 
                        className="bg-gradient-to-br from-gold to-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-yellow-300 transform hover:scale-110 transition-all duration-300"
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                  {/* Special number */}
                  {prediction.specialBall && (
                    <div className="mt-4">
                      <div className="text-sm text-gray-400 mb-2">{lottery.specialBallName}</div>
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-purple-300 mx-auto transform hover:scale-110 transition-all duration-300">
                        {prediction.specialBall}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confidence information */}
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getConfidenceIcon(prediction.confidence)}
                      <span className="text-white font-semibold">Confidence Level</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getConfidenceColor(prediction.confidence)}`}>
                      {getConfidenceText(prediction.confidence)}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold mb-2">
                      {prediction.confidence}%
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-gold to-yellow-400 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Analysis methods */}
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5 text-gold" />
                    <span className="text-white font-semibold">Analysis Methods</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {prediction.analysisMethods.map((method, methodIndex) => (
                      <span 
                        key={methodIndex}
                        className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium border border-gold/30"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => copyNumbers(prediction.numbers, prediction.specialBall)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {copiedNumbers === prediction.numbers.join(', ') + (prediction.specialBall ? ` + ${prediction.specialBall}` : '') ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                    <span>
                      {copiedNumbers === prediction.numbers.join(', ') + (prediction.specialBall ? ` + ${prediction.specialBall}` : '') ? 'Copied!' : 'Copy Numbers'}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => onAnalyze?.(lottery.id, prediction.id)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Re-analyze</span>
                  </button>
                </div>

                {/* Update information */}
                <div className="text-center text-sm text-gray-400">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Last update: {new Date(prediction.lastUpdated).toLocaleTimeString('en-US')}</span>
                  </div>
                  <div className="mt-1">
                    Next update: {new Date(prediction.nextUpdate).toLocaleTimeString('en-US')}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Button to show more predictions */}
        {lottery.predictions.length > 1 && (
          <div className="text-center">
            <button
              onClick={() => setShowAllPredictions(!showAllPredictions)}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2 mx-auto"
            >
              <TrendingUp className="w-5 h-5" />
              <span>
                {showAllPredictions ? 'Show less' : `View ${lottery.predictions.length - 1} more prediction`}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Footer with statistics */}
      <div className="mt-6 pt-4 border-t border-gray-600">
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <div className="text-gray-400">Last Win</div>
            <div className="text-white font-semibold">{lottery.lastWin}</div>
          </div>
          <div>
            <div className="text-gray-400">Prize</div>
            <div className="text-gold font-semibold">{lottery.winAmount}</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500">
            Draw days: {lottery.drawDays.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
}
