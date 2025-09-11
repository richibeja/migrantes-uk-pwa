'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calendar, Clock } from 'lucide-react';

interface JackpotData {
  lottery: string;
  currentJackpot: string;
  nextDraw: string;
  timeRemaining: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export default function JackpotTracker() {
    return (
  const [jackpots, setJackpots] = useState<JackpotData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const mockData: JackpotData[] = [
      {
        lottery: 'Powerball',
        currentJackpot: '$25,000,000',
        nextDraw: 'Sábado 20:59 EST',
        timeRemaining: '2 días 14 horas',
        trend: 'up',
        change: '+$2M'
      },
      {
        lottery: 'Mega Millions',
        currentJackpot: '$22,000,000',
        nextDraw: 'Viernes 23:00 EST',
        timeRemaining: '1 día 8 horas',
        trend: 'stable',
        change: '$0'
      },
      {
        lottery: 'EuroMillions',
        currentJackpot: '€50,000,000',
        nextDraw: 'Martes 20:45 CET',
        timeRemaining: '4 días 12 horas',
        trend: 'up',
        change: '+€5M'
      }
    ];

    setTimeout(() => {
      setJackpots(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Seguimiento de Jackpots</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Actualizado hace 5 min</span>
        </div>
      </div>

      <div className="space-y-4">
        {jackpots.map((jackpot, index) => (
          <div key={index} className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{jackpot.lottery}</h3>
              <div className={`flex items-center space-x-1 text-sm ${
                jackpot.trend === 'up' ? 'text-green-400' : 
                jackpot.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${
                  jackpot.trend === 'down' ? 'rotate-180' : ''
                }`} />
                <span>{jackpot.change}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gold">{jackpot.currentJackpot}</div>
              <div className="text-right text-sm text-gray-400">
                <div>{jackpot.nextDraw}</div>
                <div>{jackpot.timeRemaining}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Acción única */}
      <div className="mt-6 text-center">
        <button className="bg-gold text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
          📊 Ver Análisis Completo
        </button>
      </div>
    </div>
  );
}