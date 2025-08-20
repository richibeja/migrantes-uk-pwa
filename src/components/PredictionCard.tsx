'use client';

import { motion } from 'framer-motion';

interface Prediction {
  id: string;
  lottery: string;
  numbers: number[];
  confidence: number;
  nextDraw: string;
  createdAt: string;
  isHot: boolean;
}

interface PredictionCardProps {
  prediction: Prediction;
  index: number;
}

export default function PredictionCard({ prediction, index }: PredictionCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-yellow-400';
    if (confidence >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 90) return '🔥';
    if (confidence >= 80) return '⚡';
    if (confidence >= 70) return '💫';
    return '⭐';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      className={`bg-gray-800 rounded-2xl p-6 glass-effect border-l-4 ${
        prediction.isHot ? 'border-red-500' : 'border-gold'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold text-gold">{prediction.lottery}</h3>
            {prediction.isHot && (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                🔥 CALIENTE
              </span>
            )}
          </div>
          
          <div className="mb-4">
            <p className="text-gray-300 mb-2">Números Recomendados:</p>
            <div className="flex flex-wrap gap-2">
              {prediction.numbers.map((number, numIndex) => (
                <span
                  key={numIndex}
                  className="bg-gold text-black px-3 py-2 rounded-lg font-bold text-lg min-w-[3rem] text-center"
                >
                  {number.toString().padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Próximo Sorteo:</span>
              <p className="text-white font-semibold">
                {new Date(prediction.nextDraw).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div>
              <span className="text-gray-400">Generado:</span>
              <p className="text-white font-semibold">
                {new Date(prediction.createdAt).toLocaleDateString('es-ES')}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center md:text-right">
          <div className={`text-4xl font-bold mb-2 ${getConfidenceColor(prediction.confidence)}`}>
            {getConfidenceIcon(prediction.confidence)}
          </div>
          <div className={`text-3xl font-bold mb-1 ${getConfidenceColor(prediction.confidence)}`}>
            {prediction.confidence}%
          </div>
          <p className="text-gray-400 text-sm">Confianza</p>
        </div>
      </div>
    </motion.div>
  );
}
