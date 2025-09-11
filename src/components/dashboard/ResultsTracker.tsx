'use client';

import { useState, useEffect } from 'react';

interface LotteryResult {
  id: string;
  lotteryName: string;
  drawDate: string;
  numbers: number[];
  bonusNumbers?: number[];
  jackpot: string;
  winners: number;
  predictionAccuracy: number;
  status: 'hit' | 'partial' | 'miss';
}

export default function ResultsTracker() {

  const [results, setResults] = useState<LotteryResult[]>([]);
  const [selectedLottery, setSelectedLottery] = useState('all');
  const [timeFilter, setTimeFilter] = useState('week');

  const lotteries = [
    { id: 'all', name: 'Todas las Loterías' },
    { id: 'euromillions', name: 'EuroMillions' },
    { id: 'powerball', name: 'Powerball' },
    { id: 'megamillions', name: 'Mega Millions' },
    { id: 'uk-national', name: 'UK National Lottery' },
    { id: 'primitiva', name: 'El Gordo de la Primitiva' },
    { id: 'lotto-6-49', name: 'Lotto 6/49' },
    { id: 'takarakuji', name: 'Takarakuji' },
    { id: 'lotto-6-45', name: 'Lotto 6/45' },
    { id: 'china-welfare', name: 'China Welfare Lottery' }
  ];

  // Generar resultados simulados
  useEffect(() => {
    generateResults();
  }, [timeFilter]);

  const generateResults = () => {
    const mockResults: LotteryResult[] = [
      {
        id: 'result-1',
        lotteryName: 'EuroMillions',
        drawDate: '2025-01-20',
        numbers: [7, 23, 31, 44, 50],
        bonusNumbers: [3, 8],
        jackpot: '€17M',
        winners: 2,
        predictionAccuracy: 87,
        status: 'partial'
      },
      {
        id: 'result-2',
        lotteryName: 'Powerball',
        drawDate: '2025-01-19',
        numbers: [12, 18, 25, 33, 47],
        bonusNumbers: [15],
        jackpot: '$20M',
        winners: 1,
        predictionAccuracy: 92,
        status: 'hit'
      },
      {
        id: 'result-3',
        lotteryName: 'Mega Millions',
        drawDate: '2025-01-18',
        numbers: [8, 15, 22, 38, 49],
        bonusNumbers: [12],
        jackpot: '$25M',
        winners: 0,
        predictionAccuracy: 89,
        status: 'partial'
      },
      {
        id: 'result-4',
        lotteryName: 'UK National Lottery',
        drawDate: '2025-01-17',
        numbers: [3, 11, 19, 27, 35, 42],
        jackpot: '£2M',
        winners: 3,
        predictionAccuracy: 85,
        status: 'miss'
      },
      {
        id: 'result-5',
        lotteryName: 'El Gordo de la Primitiva',
        drawDate: '2025-01-16',
        numbers: [5, 13, 21, 29, 37, 45],
        jackpot: '€5M',
        winners: 1,
        predictionAccuracy: 83,
        status: 'partial'
      }
    ];

    setResults(mockResults);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hit': return 'text-green-400';
      case 'partial': return 'text-yellow-400';
      case 'miss': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hit': return '🎯';
      case 'partial': return '🎲';
      case 'miss': return '❌';
      default: return '⚪';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-400';
    if (accuracy >= 80) return 'text-yellow-400';
    if (accuracy >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const filteredResults = selectedLottery === 'all' 
    ? results 
    : results.filter(r => r.lotteryName === lotteries.find(l => l.id === selectedLottery)?.name);

  const totalAccuracy = filteredResults.length > 0 
    ? Math.round(filteredResults.reduce((acc, r) => acc + r.predictionAccuracy, 0) / filteredResults.length)
    : 0;

  const hitRate = filteredResults.length > 0
    ? Math.round((filteredResults.filter(r => r.status === 'hit').length / filteredResults.length) * 100)
    : 0;

    <div className="space-y-6">
      {/* Panel de Control */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-2">
              🏆 Seguimiento de Resultados
            </h3>
            <p className="text-gray-300">
              Monitoreo en tiempo real de predicciones vs resultados reales
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select
              value={selectedLottery}
              onChange={(e) => setSelectedLottery(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-gold focus:outline-none"
            >
              {lotteries.map((lottery) => (
                <option key={lottery.id} value={lottery.id}>
                  {lottery.name}
                </option>
              ))}
            </select>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-gold focus:outline-none"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mes</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Año</option>
            </select>
            <button className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              🔄 Actualizar
            </button>
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {filteredResults.length}
            </div>
            <div className="text-gray-300 text-sm">Total Sorteos</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {totalAccuracy}%
            </div>
            <div className="text-gray-300 text-sm">Precisión Promedio</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {hitRate}%
            </div>
            <div className="text-gray-300 text-sm">Tasa de Acierto</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {filteredResults.filter(r => r.status === 'hit').length}
            </div>
            <div className="text-gray-300 text-sm">Aciertos Totales</div>
          </div>
        </div>
      </div>

      {/* Lista de Resultados */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <div key={result.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30 hover:border-gold/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h4 className="text-lg font-bold text-gold mb-1">{result.lotteryName}</h4>
                <p className="text-gray-400 text-sm">Sorteo: {result.drawDate}</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="text-center">
                  <div className={`text-lg font-bold ${getAccuracyColor(result.predictionAccuracy)}`}>
                    {result.predictionAccuracy}%
                  </div>
                  <div className="text-gray-400 text-xs">Precisión</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={getStatusColor(result.status)}>
                    {getStatusIcon(result.status)}
                  </span>
                  <span className={`text-sm font-medium ${getStatusColor(result.status)}`}>
                    {result.status === 'hit' ? 'Acierto' : result.status === 'partial' ? 'Parcial' : 'Falló'}
                  </span>
                </div>
              </div>
            </div>

            {/* Números del Sorteo */}
            <div className="mb-4">
              <h5 className="text-white font-medium mb-2">Números Ganadores:</h5>
              <div className="flex flex-wrap gap-2 mb-2">
                {result.numbers.map((number, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {number}
                  </div>
                ))}
              </div>
              {result.bonusNumbers && (
                <div>
                  <h6 className="text-gray-400 text-sm mb-1">Números Bono:</h6>
                  <div className="flex flex-wrap gap-2">
                    {result.bonusNumbers.map((number, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold"
                      >
                        {number}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Información del Sorteo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400 mb-1">
                  {result.jackpot}
                </div>
                <div className="text-gray-400 text-xs">Jackpot</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400 mb-1">
                  {result.winners}
                </div>
                <div className="text-gray-400 text-xs">Ganadores</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-400 mb-1">
                  {result.numbers.length}
                </div>
                <div className="text-gray-400 text-xs">Números</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400 mb-1">
                  {result.bonusNumbers ? result.bonusNumbers.length : 0}
                </div>
                <div className="text-gray-400 text-xs">Bonus</div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                📊 Ver Análisis
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                💾 Guardar
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                📱 Compartir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de Rendimiento */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <h4 className="text-xl font-bold text-gold mb-4">📈 Resumen de Rendimiento</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {filteredResults.filter(r => r.status === 'hit').length}
            </div>
            <div className="text-gray-300">Aciertos Completos</div>
            <div className="text-green-400 text-sm">
              {hitRate}% de todos los sorteos
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {filteredResults.filter(r => r.status === 'partial').length}
            </div>
            <div className="text-gray-300">Aciertos Parciales</div>
            <div className="text-yellow-400 text-sm">
              {filteredResults.length > 0 ? Math.round((filteredResults.filter(r => r.status === 'partial').length / filteredResults.length) * 100) : 0}% de todos los sorteos
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {filteredResults.filter(r => r.status === 'miss').length}
            </div>
            <div className="text-gray-300">Predicciones Fallidas</div>
            <div className="text-red-400 text-sm">
              {filteredResults.length > 0 ? Math.round((filteredResults.filter(r => r.status === 'miss').length / filteredResults.length) * 100) : 0}% de todos los sorteos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
