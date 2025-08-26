'use client';

import { useState, useEffect } from 'react';

interface Prediction {
  id: string;
  lotteryName: string;
  numbers: number[];
  specialBall?: number;
  confidence: number;
  method: string;
  lastUpdated: string;
  nextUpdate: string;
}

interface AnalysisResult {
  id: string;
  lotteryName: string;
  patternScore: number;
  correlationScore: number;
  hotNumbers: number[];
  coldNumbers: number[];
  lastDrawAnalysis: string;
}

interface Lottery {
  id: string;
  name: string;
  country: string;
  numbers: number;
  specialBall: boolean;
  nextDraw: string;
  jackpot: string;
  currency: string;
}

export default function LotteryPredictionPanel() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedLottery, setSelectedLottery] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [lotteries] = useState<Lottery[]>([
    {
      id: 'baloto',
      name: 'Baloto',
      country: '🇴 Colombia',
      numbers: 5,
      specialBall: true,
      nextDraw: '2025-01-21 21:00',
      jackpot: '$25.000M COP',
      currency: 'COP'
    },
    {
      id: 'powerball',
      name: 'Powerball',
      country: '🇺🇸 Estados Unidos',
      numbers: 5,
      specialBall: true,
      nextDraw: '2025-01-20 22:59',
      jackpot: '$150M USD',
      currency: 'USD'
    },
    {
      id: 'mega-millions',
      name: 'Mega Millions',
      country: '🇺🇸 Estados Unidos',
      numbers: 5,
      specialBall: true,
      nextDraw: '2025-01-21 23:00',
      jackpot: '$120M USD',
      currency: 'USD'
    },
    {
      id: 'euromillions',
      name: 'EuroMillions',
      country: '🇪🇺 Europa',
      numbers: 5,
      specialBall: true,
      nextDraw: '2025-01-21 20:45',
      jackpot: '€85M EUR',
      currency: 'EUR'
    },
    {
      id: 'uk-national',
      name: 'UK National Lottery',
      country: '🇬🇧 Reino Unido',
      numbers: 6,
      specialBall: false,
      nextDraw: '2025-01-22 20:30',
      jackpot: '£8M GBP',
      currency: 'GBP'
    }
  ]);

  useEffect(() => {
    generateInitialPredictions();
  }, []);

  const generateInitialPredictions = () => {
    const newPredictions: Prediction[] = lotteries.map(lottery => ({
      id: lottery.id,
      lotteryName: lottery.name,
      numbers: generateRandomNumbers(lottery.numbers, 1, 50),
      specialBall: lottery.specialBall ? generateRandomNumbers(1, 1, 10)[0] : undefined,
      confidence: Math.floor(Math.random() * 30) + 70,
      method: getRandomMethod(),
      lastUpdated: new Date().toLocaleString(),
      nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()
    }));

    setPredictions(newPredictions);
  };

  const generateRandomNumbers = (count: number, min: number, max: number): number[] => {
    const numbers: number[] = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  };

  const getRandomMethod = (): string => {
    const methods = ['Análisis Estadístico', 'Patrones Históricos', 'Algoritmo ML', 'Análisis de Frecuencia'];
    return methods[Math.floor(Math.random() * methods.length)];
  };

  const analyzePrediction = async (lotteryId: string) => {
    setIsAnalyzing(true);
    
    // Simular análisis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const lottery = lotteries.find(l => l.id === lotteryId);
    if (!lottery) return;

    const hotNumbers = generateRandomNumbers(3, 1, 50);
    const coldNumbers = generateRandomNumbers(3, 1, 50);
    
    const analysisResult: AnalysisResult = {
      id: lotteryId,
      lotteryName: lottery.name,
      patternScore: Math.floor(Math.random() * 40) + 60,
      correlationScore: Math.floor(Math.random() * 40) + 60,
      hotNumbers: hotNumbers,
      coldNumbers: coldNumbers,
      lastDrawAnalysis: new Date().toLocaleString()
    };

    setAnalysisResults(prev => {
      const filtered = prev.filter(r => r.id !== lotteryId);
      return [...filtered, analysisResult];
    });

    setIsAnalyzing(false);
  };

  const filteredPredictions = selectedLottery === 'all' 
    ? predictions 
    : predictions.filter(p => p.lotteryName === selectedLottery);

  const filteredAnalysis = selectedLottery === 'all' 
    ? analysisResults 
    : analysisResults.filter(a => a.lotteryName === selectedLottery);

  return (
    <div className="space-y-6">
      {/* Panel de Control */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-2">
              🎯 Panel de Predicciones de Loterías
            </h3>
            <p className="text-gray-300">
              Análisis avanzado y predicciones para todas las loterías
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <select
              value={selectedLottery}
              onChange={(e) => setSelectedLottery(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-gold focus:outline-none"
            >
              <option value="all">Todas las Loterías</option>
              {lotteries.map((lottery) => (
                <option key={lottery.id} value={lottery.name}>
                  {lottery.name}
                </option>
              ))}
            </select>
            <button 
              onClick={() => generateInitialPredictions()}
              className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors w-full sm:w-auto"
            >
              🔄 Actualizar
            </button>
          </div>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {filteredPredictions.length}
            </div>
            <div className="text-gray-300 text-sm">Predicciones</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {filteredAnalysis.length}
            </div>
            <div className="text-gray-300 text-sm">Análisis</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {Math.round(filteredPredictions.reduce((acc, p) => acc + p.confidence, 0) / filteredPredictions.length || 0)}%
            </div>
            <div className="text-gray-300 text-sm">Confianza Promedio</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {lotteries.length}
            </div>
            <div className="text-gray-300 text-sm">Loterías</div>
          </div>
        </div>
      </div>

      {/* Lista de Predicciones */}
      <div className="space-y-4">
        {filteredPredictions.map((prediction) => (
          <div key={prediction.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{prediction.lotteryName}</h4>
                <p className="text-gray-300 text-sm">
                  Próximo sorteo: {lotteries.find(l => l.id === prediction.id)?.nextDraw}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold mb-1">
                    {prediction.confidence}%
                  </div>
                  <div className="text-gray-300 text-sm">Confianza</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400 mb-1">
                    {prediction.method}
                  </div>
                  <div className="text-gray-300 text-sm">Método</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400 mb-1">
                    {prediction.lastUpdated}
                  </div>
                  <div className="text-gray-300 text-sm">Última Actualización</div>
                </div>
              </div>
            </div>

            {/* Números Predichos */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-gray-400 text-sm">Números:</span>
                {prediction.numbers.map((num, index) => (
                  <span key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {num.toString().padStart(2, '0')}
                  </span>
                ))}
                {prediction.specialBall && (
                  <>
                    <span className="text-gray-400 text-sm">Balota Especial:</span>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {prediction.specialBall.toString().padStart(2, '0')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => analyzePrediction(prediction.id)}
                disabled={isAnalyzing}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
              >
                {isAnalyzing ? ' Analizando...' : '📊 Analizar'}
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto">
                📈 Ver Historial
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors w-full sm:w-auto">
                📱 Compartir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resultados de Análisis */}
      {filteredAnalysis.length > 0 && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
          <h4 className="text-xl font-bold text-gold mb-4"> Resultados de Análisis</h4>
          <div className="space-y-4">
            {filteredAnalysis.map((analysis) => (
              <div key={analysis.id} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-lg font-bold text-white">{analysis.lotteryName}</h5>
                  <span className="text-gray-400 text-sm">{analysis.lastDrawAnalysis}</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400 mb-1">
                      {analysis.patternScore}%
                    </div>
                    <div className="text-gray-300 text-sm">Patrón</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400 mb-1">
                      {analysis.correlationScore}%
                    </div>
                    <div className="text-gray-300 text-sm">Correlación</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400 mb-1">
                      {analysis.hotNumbers.join(', ')}
                    </div>
                    <div className="text-gray-300 text-sm">Números Calientes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-400 mb-1">
                      {analysis.coldNumbers.join(', ')}
                    </div>
                    <div className="text-gray-300 text-sm">Números Fríos</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="flex flex-wrap gap-4">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors w-full sm:w-auto">
          💾 Exportar Predicciones
        </button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto">
          📊 Gráficos Detallados
        </button>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors w-full sm:w-auto">
          🔔 Alertas de Predicciones
        </button>
      </div>
    </div>
  );
}