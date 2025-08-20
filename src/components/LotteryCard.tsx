'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface LotteryCardProps {
  lottery: {
    id: string;
    name: string;
    country: string;
    drawDays: string;
    jackpot: string;
    description: string;
  };
  onRefresh?: () => void;
}

export default function LotteryCard({ lottery, onRefresh }: LotteryCardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [forecast, setForecast] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  // Traducciones directas para evitar errores de hidratación
  const translations = {
    analyzing: 'Analizando...',
    inactive: 'Inactiva',
    analyze: 'Analizar'
  };

  const getLotteryIcon = (lotteryId: string) => {
    const icons: { [key: string]: string } = {
      'baloto': '🇨🇴',
      'powerball': '🇺🇸',
      'mega-millions': '🇺🇸',
      'euromillions': '🇪🇺',
      'uk-national': '🇬🇧',
      'el-gordo': '🇪🇸',
      'lotto-6-49': '🇨🇦',
      'mega-sena': '🇧🇷',
      'loteria-nacional': '🇦🇷'
    };
    return icons[lotteryId] || '🎰';
  };

  const getLotteryColor = (lotteryId: string) => {
    const colors: { [key: string]: string } = {
      'baloto': 'border-blue-500',
      'powerball': 'border-red-700',
      'mega-millions': 'border-yellow-600',
      'euromillions': 'border-yellow-500',
      'uk-national': 'border-red-500',
      'el-gordo': 'border-red-600',
      'lotto-6-49': 'border-red-500',
      'mega-sena': 'border-green-600',
      'loteria-nacional': 'border-blue-500'
    };
    return colors[lotteryId] || 'border-gray-500';
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysis('');
    setForecast([]);
    setIsSpinning(false);
    
    // Secuencia de análisis con números que se van revelando
    const analysisSteps = [
      { text: '🔍 Iniciando análisis de patrones históricos...', delay: 800 },
      { text: '📊 Calculando frecuencias de números...', delay: 1200 },
      { text: '🧮 Aplicando algoritmo ANBEL...', delay: 1000 },
      { text: '⚡ Procesando datos en tiempo real...', delay: 900 },
      { text: '🎯 Generando predicciones...', delay: 1100 }
    ];
    
    // Mostrar pasos de análisis uno por uno
    for (let i = 0; i < analysisSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, analysisSteps[i].delay));
      setAnalysis(analysisSteps[i].text);
    }
    
    // Mostrar números que "corren" durante el análisis
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAnalysis('🎯 Analizando números ganadores...');
    
    // Efecto de números que "corren" (cambian rápidamente)
    for (let i = 0; i < 5; i++) {
      const runningNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1);
      const runningBonus = Array.from({ length: 1 }, () => Math.floor(Math.random() * 10) + 1);
      setForecast([...runningNumbers, ...runningBonus]);
      await new Promise(resolve => setTimeout(resolve, 300)); // Cambiar cada 300ms
    }
    
    // Mensaje final y números en cero
    setAnalysis('🔒 Números ganadores bloqueados - Activa tu cuenta para revelar');
    
    // Volver a números en cero (bloqueados)
    const hiddenNumbers = Array.from({ length: 6 }, () => 0);
    const hiddenBonus = Array.from({ length: 1 }, () => 0);
    setForecast([...hiddenNumbers, ...hiddenBonus]);
    
    // Iniciar animación de giro
    setIsSpinning(true);
    
    // Detener el giro después de 3 segundos
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
    
    setIsAnalyzing(false);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES');
    } catch {
      return 'Fecha no disponible';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-900/80 backdrop-blur-sm border-2 ${getLotteryColor(lottery.id)} rounded-xl p-6 shadow-xl`}
    >
      {/* Header de la Lotería */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{getLotteryIcon(lottery.id)}</span>
          <div>
            <h3 className="text-xl font-bold text-white">{lottery.name}</h3>
            <p className="text-sm text-gray-400">
              {lottery.country} - {lottery.drawDays}
            </p>
          </div>
        </div>
        
        <div className="text-sm text-gray-400 text-right">
          <span className="font-semibold text-gold">{lottery.jackpot}</span>
        </div>
      </div>

      {/* Descripción de la Lotería */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">
          Descripción:
        </h4>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-gray-300 text-sm">
            {lottery.description}
          </p>
        </div>
      </div>

      {/* Sección de Análisis */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">
          Análisis:
        </h4>
        <div className="bg-gray-800/50 rounded-lg p-4 min-h-[60px]">
          {!analysis && !isAnalyzing && (
            <p className="text-gray-400 text-sm">
              No hay análisis disponible.
            </p>
          )}
          {isAnalyzing && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gold"></div>
              <span className="text-gold text-sm">{translations.analyzing}</span>
            </div>
          )}
          {analysis && !isAnalyzing && (
            <p className="text-green-400 text-sm">{analysis}</p>
          )}
        </div>
      </div>

      {/* Sección de Pronóstico */}
      {forecast.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-300 mb-3">
            {forecast[0] === 0 ? '🔒 Números Ganadores (Bloqueados)' : '🎯 Números Ganadores Encontrados'}
          </h4>
          <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 rounded-lg p-4 border border-gold/30">
            <div className="flex flex-wrap gap-2">
              {forecast.slice(0, 6).map((num, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-300 ${
                    num === 0 
                      ? 'bg-gray-800/50 border-2 border-gray-600/50' 
                      : 'bg-gold/30 border-2 border-gold'
                  }`}
                >
                  <span className={`${num === 0 ? 'text-gray-500' : 'text-white'} ${
                    num === 0 && isSpinning ? 'animate-spin' : ''
                  }`}>
                    {num === 0 ? '🔒' : num}
                  </span>
                </div>
              ))}
              {forecast.slice(6).map((num, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-300 ${
                    num === 0 
                      ? 'bg-gray-800/50 border-2 border-gray-600/50' 
                      : 'bg-purple-500/30 border-2 border-purple-400'
                  }`}
                >
                  <span className={`${num === 0 ? 'text-gray-500' : 'text-white'} ${
                    num === 0 && isSpinning ? 'animate-spin' : ''
                  }`}>
                    {num === 0 ? '🔒' : num}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-gold text-xs mt-2 text-center">
              {forecast[0] === 0 ? 'Números ganadores bloqueados - Activa tu cuenta para revelar' : 'Números ganadores encontrados'}
            </p>
            {forecast[0] === 0 && (
              <div className="mt-3 p-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
                <p className="text-center text-blue-400 font-semibold text-xs">
                  💎 Activa tu cuenta premium para revelar los números ganadores
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Acciones */}
      <div className="flex space-x-3">
        <button
          onClick={handleAnalysis}
          disabled={isAnalyzing}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
            isAnalyzing
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gold hover:bg-yellow-500 text-black hover:shadow-lg'
          }`}
        >
          {isAnalyzing ? translations.analyzing : '🔮 Analizar'}
        </button>
        
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          title="Actualizar resultados"
        >
          🔄
        </button>
      </div>

      {/* Botón para Revelar Números (solo cuando están en cero y no girando) */}
      {forecast.length > 0 && forecast[0] === 0 && !isSpinning && (
        <div className="mt-3">
          <button
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={() => {
              setAnalysis('🔒 Para revelar los números ganadores, activa tu cuenta premium con un código de activación.');
            }}
          >
            💎 Revelar Números Ganadores
          </button>
        </div>
      )}

      {/* Estado de la Lotería */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Premio: {lottery.jackpot}
          </span>
          <span className="px-2 py-1 bg-green-600/20 text-green-400 border border-green-600/30 rounded-full text-xs">
            Activa
          </span>
        </div>
      </div>
    </motion.div>
  );
}
