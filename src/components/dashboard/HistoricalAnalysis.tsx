'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';

interface HistoricalData {
  date: string;
  lottery: string;
  accuracy: number;
  predictions: number;
  successful: number;
}

export default function HistoricalAnalysis() {
    return (
  const [data, setData] = useState<HistoricalData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLottery, setSelectedLottery] = useState('all');

  useEffect(() => {
    // Simular carga de datos históricos
    const mockData: HistoricalData[] = [
      {
        date: '2024-01-15',
        lottery: 'Powerball',
        accuracy: 87.5,
        predictions: 45,
        successful: 39
      },
      {
        date: '2024-01-14',
        lottery: 'Powerball',
        accuracy: 82.3,
        predictions: 38,
        successful: 31
      },
      {
        date: '2024-01-13',
        lottery: 'Mega Millions',
        accuracy: 89.1,
        predictions: 42,
        successful: 37
      },
      {
        date: '2024-01-12',
        lottery: 'EuroMillions',
        accuracy: 85.7,
        predictions: 35,
        successful: 30
      }
    ];

    setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredData = selectedLottery === 'all' 
    ? data 
    : data.filter(item => item.lottery === selectedLottery);

  if (isLoading) {
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
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
        <h2 className="text-xl font-bold text-white">Análisis Histórico</h2>
        <select
          value={selectedLottery}
          onChange={(e) => setSelectedLottery(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
        >
          <option value="all">Todas las Loterías</option>
          <option value="Powerball">Powerball</option>
          <option value="Mega Millions">Mega Millions</option>
          <option value="EuroMillions">EuroMillions</option>
        </select>
      </div>

      {/* Resumen estadístico */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gold mb-1">
            {filteredData.length}
          </div>
          <div className="text-gray-400 text-sm">Días Analizados</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {(filteredData.reduce((acc, curr) => acc + curr.accuracy, 0) / filteredData.length || 0).toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm">Precisión Promedio</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {filteredData.reduce((acc, curr) => acc + curr.predictions, 0)}
          </div>
          <div className="text-gray-400 text-sm">Predicciones Totales</div>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {filteredData.reduce((acc, curr) => acc + curr.successful, 0)}
          </div>
          <div className="text-gray-400 text-sm">Exitosas</div>
        </div>
      </div>

      {/* Datos históricos */}
      <div className="space-y-3">
        {filteredData.map((item, index) => (
          <div key={index} className="bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-white font-medium">{item.date}</span>
                <span className="text-gray-400">-</span>
                <span className="text-gold">{item.lottery}</span>
              </div>
              <div className="text-gold font-bold">{item.accuracy}%</div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{item.predictions} predicciones</span>
              <span>{item.successful} exitosas</span>
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