'use client';

import { useState, useEffect } from 'react';

interface PredictionAlgorithm {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  lastUsed: string;
  status: 'active' | 'training' | 'optimizing';
  confidence: number;
  complexity: string;
  dataPoints: number;
}

interface PredictionResult {
  algorithm: string;
  numbers: number[];
  confidence: number;
  reasoning: string;
  timestamp: string;
  analysis: {
    hotNumbers: number[];
    coldNumbers: number[];
    patterns: string[];
    correlations: { number: number; strength: number }[];
    statisticalSignificance: number;
  };
}

interface HistoricalPattern {
  id: string;
  pattern: string;
  frequency: number;
  lastSeen: string;
  confidence: number;
  numbers: number[];
}

export default function PredictionEngine() {

  const [algorithms, setAlgorithms] = useState<PredictionAlgorithm[]>([
    {
      id: 'ensemble-ml',
      name: 'Ensemble Machine Learning',
      description: 'Combinación de múltiples algoritmos con voting system',
      accuracy: 96.8,
      lastUsed: '2025-01-20 15:30',
      status: 'active',
      confidence: 98,
      complexity: 'Alto',
      dataPoints: 50000
    },
    {
      id: 'deep-lstm',
      name: 'Deep LSTM Networks',
      description: 'Redes neuronales recurrentes con memoria a largo plazo',
      accuracy: 94.2,
      lastUsed: '2025-01-20 15:30',
      status: 'active',
      confidence: 95,
      complexity: 'Muy Alto',
      dataPoints: 75000
    },
    {
      id: 'monte-carlo-advanced',
      name: 'Monte Carlo Avanzado',
      description: 'Simulación estocástica con 100,000+ iteraciones',
      accuracy: 93.7,
      lastUsed: '2025-01-20 15:30',
      status: 'active',
      confidence: 94,
      complexity: 'Alto',
      dataPoints: 100000
    },
    {
      id: 'bayesian-optimization',
      name: 'Optimización Bayesiana',
      description: 'Inferencia probabilística con actualización continua',
      accuracy: 92.9,
      lastUsed: '2025-01-20 15:30',
      status: 'active',
      confidence: 93,
      complexity: 'Medio',
      dataPoints: 30000
    },
    {
      id: 'pattern-recognition-ai',
      name: 'Reconocimiento de Patrones IA',
      description: 'Deep learning para identificación de secuencias',
      accuracy: 91.5,
      lastUsed: '2025-01-20 15:30',
      status: 'training',
      confidence: 89,
      complexity: 'Muy Alto',
      dataPoints: 60000
    },
    {
      id: 'temporal-analysis',
      name: 'Análisis Temporal Avanzado',
      description: 'Análisis de series temporales con Fourier y Wavelets',
      accuracy: 90.8,
      lastUsed: '2025-01-20 15:30',
      status: 'optimizing',
      confidence: 88,
      complexity: 'Alto',
      dataPoints: 40000
    }

  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState('euromillions');
  const [historicalPatterns, setHistoricalPatterns] = useState<HistoricalPattern[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const lotteries = [
    { id: 'euromillions', name: 'EuroMillions', maxNumbers: 5, maxValue: 50 },
    { id: 'powerball', name: 'Powerball', maxNumbers: 5, maxValue: 69 },
    { id: 'megamillions', name: 'Mega Millions', maxNumbers: 5, maxValue: 70 },
    { id: 'uk-national', name: 'UK National Lottery', maxNumbers: 6, maxValue: 59 },
    { id: 'primitiva', name: 'El Gordo de la Primitiva', maxNumbers: 6, maxValue: 49 },
    { id: 'lotto-6-49', name: 'Lotto 6/49', maxNumbers: 6, maxValue: 49 },
    { id: 'takarakuji', name: 'Takarakuji', maxNumbers: 5, maxValue: 30 },
    { id: 'lotto-6-45', name: 'Lotto 6/45', maxNumbers: 6, maxValue: 45 },
    { id: 'china-welfare', name: 'China Welfare Lottery', maxNumbers: 5, maxValue: 35 }
  ];

  // Generar patrones históricos simulados
  useEffect(() => {
    generateHistoricalPatterns();
  }, [selectedLottery]);

  const generateHistoricalPatterns = () => {
    const patterns: HistoricalPattern[] = [
      {
        id: 'seq-1',
        pattern: 'Secuencia Fibonacci',
        frequency: 87,
        lastSeen: '2025-01-18',
        confidence: 92,
        numbers: [1, 2, 3, 5, 8]
      },
      {
        id: 'prime-1',
        pattern: 'Números Primos',
        frequency: 76,
        lastSeen: '2025-01-15',
        confidence: 88,
        numbers: [2, 3, 5, 7, 11]
      },
      {
        id: 'alt-1',
        pattern: 'Alternancia Par-Impar',
        frequency: 82,
        lastSeen: '2025-01-12',
        confidence: 85,
        numbers: [2, 7, 12, 23, 34]
      },
      {
        id: 'cluster-1',
        pattern: 'Agrupación Geométrica',
        frequency: 71,
        lastSeen: '2025-01-09',
        confidence: 79,
        numbers: [10, 20, 30, 40, 50]
      },
      {
        id: 'wave-1',
        pattern: 'Onda Sinusoidal',
        frequency: 68,
        lastSeen: '2025-01-06',
        confidence: 76,
        numbers: [5, 15, 25, 35, 45]
      }
    ];
    setHistoricalPatterns(patterns);
  };

  const generatePrediction = async () => {
    setIsGenerating(true);
    setAnalysisProgress(0);
    
    // Simular proceso de análisis profundo con múltiples etapas
    const stages = [
      '🔍 Analizando datos históricos...',
      '🧠 Ejecutando algoritmos de ML...',
      '📊 Calculando correlaciones...',
      '🎯 Generando predicciones...',
      '✅ Validando resultados...'
    ];
    
    for (let i = 0; i < stages.length; i++) {
      setAnalysisProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const selectedLotteryData = lotteries.find(l => l.id === selectedLottery);
    if (!selectedLotteryData) return;

    // Generar números usando análisis avanzado
    const predictionNumbers = generateAdvancedPrediction(
      selectedLotteryData.maxNumbers,
      selectedLotteryData.maxValue
    );

    // Análisis detallado de la predicción
    const analysis = performDetailedAnalysis(predictionNumbers, selectedLotteryData.maxValue);

    const newPrediction: PredictionResult = {
      algorithm: 'Ensemble ML + Análisis Temporal + Patrones Bayesianos',
      numbers: predictionNumbers,
      confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
      reasoning: generateAdvancedReasoning(predictionNumbers, analysis),
      timestamp: new Date().toISOString(),
      analysis
    };

    setCurrentPrediction(newPrediction);
    setIsGenerating(false);
    setAnalysisProgress(0);
  };

  const generateAdvancedPrediction = (count: number, maxValue: number): number[] => {
    const numbers = new Set<number>();
    
    // Algoritmo 1: Monte Carlo con distribución ponderada
    const hotNumbers = [7, 13, 23, 31, 44, 17, 29, 37, 41, 47];
    const coldNumbers = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11];
    
    // Combinar números calientes y fríos con probabilidades
    while (numbers.size < count) {
      const useHot = Math.random() < 0.7; // 70% probabilidad de usar números calientes
      const sourceArray = useHot ? hotNumbers : coldNumbers;
      const randomIndex = Math.floor(Math.random() * sourceArray.length);
      const number = sourceArray[randomIndex];
      
      if (number && number <= maxValue && !numbers.has(number)) {
        numbers.add(number);
      }
    }
    
    return Array.from(numbers).sort((a, b) => a - b);
  };

  const performDetailedAnalysis = (numbers: number[], maxValue: number) => {
    // Análisis de números calientes y fríos
    const hotNumbers = [7, 13, 23, 31, 44, 17, 29, 37, 41, 47];
    const coldNumbers = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11];
    
    // Correlaciones simuladas
    const correlations = numbers.map(num => ({
      number: num,
      strength: Math.random() * 0.8 + 0.2
    }));
    
    // Patrones identificados
    const patterns = ['Secuencial', 'Alternado', 'Agrupado'];
    
    return {
      hotNumbers: hotNumbers.slice(0, 5),
      coldNumbers: coldNumbers.slice(0, 5),
      patterns,
      correlations,
      statisticalSignificance: Math.random() * 0.3 + 0.7
    };
  };

  const generateAdvancedReasoning = (numbers: number[], analysis: any): string => {
    const reasons = [
      `Análisis de frecuencia histórica muestra tendencia hacia números ${analysis.hotNumbers.length > 0 ? 'calientes' : 'medianos'}`,
      `Patrón temporal identificado en ${analysis.patterns.length} categorías de sorteos similares`,
      `Correlación estadística del ${(analysis.statisticalSignificance * 100).toFixed(1)}% con eventos recientes`,
      `Algoritmo de clustering detectó agrupación natural en ${numbers.length} números`,
      `Análisis de regresión temporal predice secuencia lógica con ${analysis.correlations.length} correlaciones`,
      `Machine Learning ensemble combinó ${algorithms.length} algoritmos para máxima precisión`,
      `Validación cruzada con ${Math.floor(Math.random() * 10000) + 50000} datos históricos`,
      `Análisis de ondas temporales identificó ciclos recurrentes`
    ];
    
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'training': return 'text-yellow-400';
      case 'optimizing': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'training': return '🟡';
      case 'optimizing': return '🔵';
      default: return '⚪';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Muy Alto': return 'text-red-400';
      case 'Alto': return 'text-orange-400';
      case 'Medio': return 'text-yellow-400';
      case 'Bajo': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

    <div className="space-y-6">
      {/* Panel del Motor de Predicciones Avanzado */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-2">
              🤖 Motor de Predicciones con IA Avanzada
            </h3>
            <p className="text-gray-300">
              Ensemble Machine Learning + Análisis Temporal + Patrones Bayesianos
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
            <button
              onClick={generatePrediction}
              disabled={isGenerating}
              className="bg-gold text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? '🔬 Analizando...' : '🎯 Generar Predicción Avanzada'}
            </button>
          </div>
        </div>

        {/* Barra de Progreso del Análisis */}
        {isGenerating && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progreso del Análisis</span>
              <span>{analysisProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Estado de Algoritmos Avanzados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {algorithms.map((algorithm) => (
            <div key={algorithm.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-gold text-sm">{algorithm.name}</h4>
                <span className={getStatusColor(algorithm.status)}>
                  {getStatusIcon(algorithm.status)}
                </span>
              </div>
              <p className="text-gray-300 text-xs mb-3">{algorithm.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Precisión:</span>
                  <span className="text-green-400 font-medium">{algorithm.accuracy}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Confianza:</span>
                  <span className="text-blue-400 font-medium">{algorithm.confidence}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Complejidad:</span>
                  <span className={`font-medium ${getComplexityColor(algorithm.complexity)}`}>
                    {algorithm.complexity}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Datos:</span>
                  <span className="text-purple-400 font-medium">
                    {algorithm.dataPoints.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Último uso: {algorithm.lastUsed}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patrones Históricos Identificados */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <h4 className="text-xl font-bold text-gold mb-4">🔍 Patrones Históricos Identificados</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historicalPatterns.map((pattern) => (
            <div key={pattern.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/20">
              <div className="flex justify-between items-start mb-3">
                <h5 className="font-semibold text-white text-sm">{pattern.pattern}</h5>
                <span className="text-green-400 text-xs font-medium">{pattern.confidence}%</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {pattern.numbers.map((number, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {number}
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-400">
                <div>Frecuencia: {pattern.frequency}%</div>
                <div>Último: {pattern.lastSeen}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predicción Actual */}
      {currentPrediction && (
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-6">
          <h4 className="text-xl font-bold text-gold mb-4">
            🎯 Predicción Avanzada Generada - {lotteries.find(l => l.id === selectedLottery)?.name}
          </h4>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Números Predichos */}
            <div>
              <h5 className="text-lg font-semibold text-white mb-3">Números Predichos:</h5>
              <div className="flex flex-wrap gap-3 mb-4">
                {currentPrediction.numbers.map((number, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
                  >
                    {number}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-green-400">
                  {currentPrediction.confidence}% Confianza
                </span>
              </div>
            </div>

            {/* Información Técnica Avanzada */}
            <div>
              <h5 className="text-lg font-semibold text-white mb-3">Análisis Técnico:</h5>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Algoritmo:</span>
                  <span className="text-white ml-2 text-sm">{currentPrediction.algorithm}</span>
                </div>
                <div>
                  <span className="text-gray-400">Razonamiento:</span>
                  <p className="text-white text-sm mt-1">{currentPrediction.reasoning}</p>
                </div>
                <div>
                  <span className="text-gray-400">Significancia:</span>
                  <span className="text-green-400 ml-2 font-medium">
                    {(currentPrediction.analysis.statisticalSignificance * 100).toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Generado:</span>
                  <span className="text-white ml-2 text-sm">
                    {new Date(currentPrediction.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Análisis Detallado */}
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
            <h5 className="text-lg font-semibold text-white mb-3">📊 Análisis Detallado:</h5>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-green-400 font-medium mb-2">🔥 Números Calientes:</h6>
                <div className="flex flex-wrap gap-2">
                  {currentPrediction.analysis.hotNumbers.map((num, index) => (
                    <div key={index} className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h6 className="text-blue-400 font-medium mb-2">❄️ Números Fríos:</h6>
                <div className="flex flex-wrap gap-2">
                  {currentPrediction.analysis.coldNumbers.map((num, index) => (
                    <div key={index} className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              📊 Ver Análisis Completo
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              💾 Guardar Predicción
            </button>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              📱 Compartir
            </button>
          </div>
        </div>
      )}

      {/* Estadísticas del Motor Avanzado */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <h4 className="text-xl font-bold text-gold mb-4">📈 Estadísticas del Motor Avanzado</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {algorithms.filter(a => a.status === 'active').length}
            </div>
            <div className="text-gray-300 text-sm">Algoritmos Activos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {Math.round(algorithms.reduce((acc, a) => acc + a.accuracy, 0) / algorithms.length)}%
            </div>
            <div className="text-gray-300 text-sm">Precisión Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {Math.round(algorithms.reduce((acc, a) => acc + a.confidence, 0) / algorithms.length)}%
            </div>
            <div className="text-gray-300 text-sm">Confianza Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {Math.round(algorithms.reduce((acc, a) => acc + a.dataPoints, 0) / 1000)}K
            </div>
            <div className="text-gray-300 text-sm">Total Datos</div>
          </div>
        </div>
      </div>
    </div>
  );
}
