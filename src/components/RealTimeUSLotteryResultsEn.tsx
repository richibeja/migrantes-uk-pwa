'use client';

import React from 'react';
import { useRealTimeUSLottery } from '@/hooks/useRealTimeUSLottery';
import { 
  RefreshCw, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Wifi, 
  WifiOff,
  AlertCircle,
  CheckCircle,
  Star
} from 'lucide-react';

export default function RealTimeUSLotteryResultsEn() {
  const {
    results,
    lastUpdate,
    isLive,
    error,
    nextUpdate,
    isLoading,
    updateCount,
    refresh,
    getStatistics,
    getHighestJackpotLotteries,
    getUpcomingDraws,
    getFrequentNumbers
  } = useRealTimeUSLottery();

  const stats = getStatistics();
  const highestJackpots = getHighestJackpotLotteries();
  const upcomingDraws = getUpcomingDraws();
  const frequentNumbers = getFrequentNumbers();

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusIcon = (source: string) => {
    return source === 'real' ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <AlertCircle className="w-4 h-4 text-yellow-500" />
    );
  };

  const getStatusText = (source: string) => {
    return source === 'real' ? 'Real Data' : 'Simulated Data';
  };

  const getStatusColor = (source: string) => {
    return source === 'real' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  if (isLoading && results.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Loading US Lotteries
          </h3>
          <p className="text-gray-600">
            Getting real-time data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with statistics */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">United States Lotteries</h2>
              <p className="text-blue-100">Real-time data</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isLive ? (
                <Wifi className="w-5 h-5 text-green-400" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-400" />
              )}
              <span className="text-sm">
                {isLive ? 'Live' : 'Offline'}
              </span>
            </div>
            
            <button
              onClick={refresh}
              disabled={isLoading}
              className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-2xl font-bold">{stats.totalLotteries}</div>
            <div className="text-blue-100 text-sm">Lotteries</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-2xl font-bold">{stats.dataAccuracy}%</div>
            <div className="text-blue-100 text-sm">Accuracy</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-2xl font-bold">{stats.totalWinners}</div>
            <div className="text-blue-100 text-sm">Winners</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <div className="text-2xl font-bold">${stats.averageJackpot.toLocaleString()}</div>
            <div className="text-blue-100 text-sm">Average</div>
          </div>
        </div>

        {/* Update information */}
        <div className="mt-4 flex items-center justify-between text-sm text-blue-100">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>
              Last update: {formatTime(lastUpdate)} ({updateCount} updates)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>
              Next: {formatTime(nextUpdate)}
            </span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">Connection Error</span>
          </div>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Highest jackpots */}
      {highestJackpots.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            <span>Highest Jackpots</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highestJackpots.slice(0, 4).map((lottery) => (
              <div key={lottery.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{lottery.name}</h4>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(lottery.source)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(lottery.source)}`}>
                      {getStatusText(lottery.source)}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">{lottery.jackpot}</div>
                <div className="text-sm text-gray-600">
                  Next draw: {formatDate(lottery.nextDraw)} at {formatTime(lottery.nextDraw)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lottery results */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Star className="w-6 h-6 text-yellow-500" />
          <span>Recent Results</span>
        </h3>
        <div className="space-y-4">
          {results.map((lottery) => (
            <div key={lottery.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-900">{lottery.name}</h4>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(lottery.source)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(lottery.source)}`}>
                      {getStatusText(lottery.source)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {formatDate(lottery.drawDate)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(lottery.drawDate)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Numbers:</span>
                  <div className="flex space-x-1">
                    {lottery.numbers.map((number, index) => (
                      <span
                        key={index}
                        className="w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold"
                      >
                        {number}
                      </span>
                    ))}
                    {lottery.powerball && (
                      <span className="w-8 h-8 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {lottery.powerball}
                      </span>
                    )}
                    {lottery.megaBall && (
                      <span className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {lottery.megaBall}
                      </span>
                    )}
                    {lottery.bonusBall && (
                      <span className="w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {lottery.bonusBall}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{lottery.jackpot}</div>
                  <div className="text-sm text-gray-600">
                    {lottery.winners.jackpot} winners
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most frequent numbers */}
      {frequentNumbers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <span>Most Frequent Numbers</span>
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {frequentNumbers.map(({ number, count }) => (
              <div key={number} className="text-center">
                <div className="w-10 h-10 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-1">
                  {number}
                </div>
                <div className="text-xs text-gray-600">{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
