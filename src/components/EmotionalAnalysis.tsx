'use client';

import React, { useState, useEffect } from 'react';
import { useAnbelAI } from '@/hooks/useAnbelAI';

interface EmotionalAnalysisProps {
  userId: string;
  language: 'es' | 'en';
  onEmotionChange?: (emotion: string) => void;
}

export default function EmotionalAnalysis({ userId, language, onEmotionChange }: EmotionalAnalysisProps) {
  const [currentEmotion, setCurrentEmotion] = useState<any>(null);
  const [emotionHistory, setEmotionHistory] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { anbelAI } = useAnbelAI();

  const analyzeText = async (text: string) => {
    if (!anbelAI || !text.trim()) return;
    
    try {
      setIsAnalyzing(true);
      const emotion = await anbelAI.analyzeEmotion(text);
      setCurrentEmotion(emotion);
      
      // Agregar a historial
      setEmotionHistory(prev => [emotion, ...prev.slice(0, 9)]); // Mantener últimos 10
      
      // Notificar cambio de emoción
      if (onEmotionChange) {
        onEmotionChange(emotion.emotion);
      }
      
    } catch (error) {
      console.error('Error analizando emoción:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'angry': return '😠';
      case 'excited': return '🤩';
      case 'worried': return '😰';
      case 'neutral': return '😐';
      default: return '🤖';
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'from-green-400 to-green-600';
      case 'sad': return 'from-blue-400 to-blue-600';
      case 'angry': return 'from-red-400 to-red-600';
      case 'excited': return 'from-yellow-400 to-yellow-600';
      case 'worried': return 'from-orange-400 to-orange-600';
      case 'neutral': return 'from-gray-400 to-gray-600';
      default: return 'from-purple-400 to-purple-600';
    }
  };

  const getEmotionText = (emotion: string) => {
    const texts = {
      happy: language === 'es' ? 'Feliz' : 'Happy',
      sad: language === 'es' ? 'Triste' : 'Sad',
      angry: language === 'es' ? 'Enojado' : 'Angry',
      excited: language === 'es' ? 'Emocionado' : 'Excited',
      worried: language === 'es' ? 'Preocupado' : 'Worried',
      neutral: language === 'es' ? 'Neutral' : 'Neutral'
    };
    return texts[emotion as keyof typeof texts] || 'Desconocido';
  };

  return (
    <div className="space-y-4">
      {/* Análisis Actual */}
      {currentEmotion && (
        <div className={`bg-gradient-to-r ${getEmotionColor(currentEmotion.emotion)} p-4 rounded-lg`}>
          <h3 className="text-white font-bold mb-3 flex items-center">
            {getEmotionIcon(currentEmotion.emotion)} {language === 'es' ? 'Estado Emocional' : 'Emotional State'}
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">
                {language === 'es' ? 'Emoción:' : 'Emotion:'}
              </span>
              <span className="text-white font-bold text-lg">
                {getEmotionText(currentEmotion.emotion)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">
                {language === 'es' ? 'Confianza:' : 'Confidence:'}
              </span>
              <span className="text-white font-bold">
                {currentEmotion.confidence}%
              </span>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentEmotion.confidence}%` }}
              ></div>
            </div>
            
            {currentEmotion.suggestions && currentEmotion.suggestions.length > 0 && (
              <div className="space-y-1">
                <p className="text-white/80 text-sm font-medium">
                  {language === 'es' ? 'Sugerencias:' : 'Suggestions:'}
                </p>
                {currentEmotion.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-start text-white/70 text-sm">
                    <span className="mr-2">💡</span>
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Historial de Emociones */}
      {emotionHistory.length > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-3 flex items-center">
            📊 {language === 'es' ? 'Historial Emocional' : 'Emotional History'}
          </h3>
          
          <div className="space-y-2">
            {emotionHistory.slice(0, 5).map((emotion, index) => (
              <div key={index} className="bg-white/10 p-2 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getEmotionIcon(emotion.emotion)}</span>
                  <span className="text-white font-medium">
                    {getEmotionText(emotion.emotion)}
                  </span>
                </div>
                <div className="text-white/60 text-sm">
                  {emotion.confidence}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón de Análisis */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-lg">
        <h3 className="text-white font-bold mb-3 flex items-center">
          🧠 {language === 'es' ? 'Análisis Emocional' : 'Emotional Analysis'}
        </h3>
        
        <div className="space-y-3">
          <p className="text-white/80 text-sm">
            {language === 'es' 
              ? 'Anbel puede analizar tu estado emocional y adaptar sus respuestas para ayudarte mejor.'
              : 'Anbel can analyze your emotional state and adapt its responses to help you better.'
            }
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={() => analyzeText('Estoy muy feliz y emocionado por las predicciones')}
              disabled={isAnalyzing}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50"
            >
              {isAnalyzing ? '🔄 Analizando...' : '😊 Probar Feliz'}
            </button>
            
            <button
              onClick={() => analyzeText('Me siento preocupado por no ganar')}
              disabled={isAnalyzing}
              className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50"
            >
              {isAnalyzing ? '🔄 Analizando...' : '😰 Probar Preocupado'}
            </button>
            
            <button
              onClick={() => analyzeText('¡Estoy súper emocionado por ganar!')}
              disabled={isAnalyzing}
              className="px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50"
            >
              {isAnalyzing ? '🔄 Analizando...' : '🤩 Probar Emocionado'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
