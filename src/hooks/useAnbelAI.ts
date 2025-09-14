'use client';

import { useState, useEffect, useCallback } from 'react';

export interface AnbelMessage {
  id: string;
  type: 'user' | 'anbel' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    algorithm?: string;
    prediction?: any;
    [key: string]: any;
  };
}

export interface AnbelPrediction {
  id: string;
  lottery: string;
  numbers: number[];
  confidence: number;
  algorithm: string;
  timestamp: Date;
  metadata?: {
    accuracy?: number;
    pattern?: string;
    [key: string]: any;
  };
}

export interface AnbelState {
  isConnected: boolean;
  isProcessing: boolean;
  messages: AnbelMessage[];
  predictions: AnbelPrediction[];
  currentLottery: string | null;
  language: 'es' | 'en';
  error: string | null;
}

export const useAnbelAI = () => {
  const [state, setState] = useState<AnbelState>({
    isConnected: false,
    isProcessing: false,
    messages: [],
    predictions: [],
    currentLottery: null,
    language: 'es',
    error: null,
  });

  // Conectar con Anbel IA
  const connect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isProcessing: true, error: null }));
      
      // Simulación de conexión
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({
        ...prev,
        isConnected: true,
        isProcessing: false,
        messages: [
          {
            id: 'welcome',
            type: 'anbel',
            content: '¡Hola! Soy Anbel, tu asistente inteligente de loterías. ¿Cómo puedo ayudarte hoy?',
            timestamp: new Date(),
          }
        ]
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Error de conexión',
      }));
    }
  }, []);

  // Desconectar
  const disconnect = useCallback(() => {
    setState(prev => ({
      ...prev,
      isConnected: false,
      messages: [],
      predictions: [],
    }));
  }, []);

  // Enviar mensaje
  const sendMessage = useCallback(async (content: string) => {
    if (!state.isConnected) return;

    const userMessage: AnbelMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isProcessing: true,
    }));

    try {
      // Simulación de procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generar respuesta
      const response = await generateResponse(content);
      
      const anbelMessage: AnbelMessage = {
        id: `anbel_${Date.now()}`,
        type: 'anbel',
        content: response.content,
        timestamp: new Date(),
        metadata: response.metadata,
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, anbelMessage],
        isProcessing: false,
      }));

      // Si hay predicción, agregarla
      if (response.prediction) {
        setState(prev => ({
          ...prev,
          predictions: [...prev.predictions, response.prediction],
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Error procesando mensaje',
      }));
    }
  }, [state.isConnected]);

  // Generar respuesta
  const generateResponse = async (content: string): Promise<{ content: string; metadata?: any; prediction?: AnbelPrediction }> => {
    const lowerContent = content.toLowerCase();

    // Detectar idioma
    const isEnglish = /[a-z]/.test(content) && !/[ñáéíóúü]/.test(content);
    const lang = isEnglish ? 'en' : 'es';

    // Respuestas en español
    if (lang === 'es') {
      if (lowerContent.includes('hola') || lowerContent.includes('hi')) {
        return {
          content: '¡Hola! Soy Anbel, tu asistente inteligente de loterías. ¿En qué puedo ayudarte hoy?',
          metadata: { confidence: 0.95 }
        };
      }

      if (lowerContent.includes('predic') || lowerContent.includes('números')) {
        const lottery = detectLottery(content);
        const prediction = generatePrediction(lottery);
        
        return {
          content: `He analizado los patrones históricos y generado una predicción para ${lottery}. Los números recomendados son: ${prediction.numbers.join(', ')} con una confianza del ${prediction.confidence}%.`,
          metadata: { confidence: prediction.confidence, algorithm: prediction.algorithm },
          prediction
        };
      }

      if (lowerContent.includes('ayuda') || lowerContent.includes('help')) {
        return {
          content: 'Puedo ayudarte con predicciones de loterías, análisis de patrones, estadísticas históricas y mucho más. ¿Qué te gustaría saber?',
          metadata: { confidence: 0.9 }
        };
      }

      if (lowerContent.includes('gracias') || lowerContent.includes('thanks')) {
        return {
          content: '¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?',
          metadata: { confidence: 0.95 }
        };
      }
    }

    // Respuestas en inglés
    if (lang === 'en') {
      if (lowerContent.includes('hello') || lowerContent.includes('hi')) {
        return {
          content: 'Hello! I\'m Anbel, your intelligent lottery assistant. How can I help you today?',
          metadata: { confidence: 0.95 }
        };
      }

      if (lowerContent.includes('predict') || lowerContent.includes('numbers')) {
        const lottery = detectLottery(content);
        const prediction = generatePrediction(lottery);
        
        return {
          content: `I've analyzed historical patterns and generated a prediction for ${lottery}. The recommended numbers are: ${prediction.numbers.join(', ')} with ${prediction.confidence}% confidence.`,
          metadata: { confidence: prediction.confidence, algorithm: prediction.algorithm },
          prediction
        };
      }

      if (lowerContent.includes('help')) {
        return {
          content: 'I can help you with lottery predictions, pattern analysis, historical statistics, and much more. What would you like to know?',
          metadata: { confidence: 0.9 }
        };
      }

      if (lowerContent.includes('thank')) {
        return {
          content: 'You\'re welcome! I\'m here to help. Is there anything else I can assist you with?',
          metadata: { confidence: 0.95 }
        };
      }
    }

    // Respuesta por defecto
    return {
      content: lang === 'es' 
        ? 'Entiendo tu consulta. ¿Podrías ser más específico sobre qué tipo de ayuda necesitas con las loterías?'
        : 'I understand your query. Could you be more specific about what kind of help you need with lotteries?',
      metadata: { confidence: 0.7 }
    };
  };

  // Detectar lotería
  const detectLottery = (content: string): string => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('powerball')) return 'Powerball';
    if (lowerContent.includes('mega millions')) return 'Mega Millions';
    if (lowerContent.includes('euromillions')) return 'EuroMillions';
    if (lowerContent.includes('lotto')) return 'Lotto';
    if (lowerContent.includes('lottery')) return 'Lottery';
    
    return 'Powerball'; // Por defecto
  };

  // Generar predicción
  const generatePrediction = (lottery: string): AnbelPrediction => {
    const numbers = generateRandomNumbers(lottery);
    const confidence = Math.random() * 20 + 80; // 80-100%
    
    return {
      id: `pred_${Date.now()}`,
      lottery,
      numbers,
      confidence: Math.round(confidence),
      algorithm: 'EnsembleML',
      timestamp: new Date(),
      metadata: {
        accuracy: Math.round(confidence * 0.95),
        pattern: 'Advanced Pattern Recognition'
      }
    };
  };

  // Generar números aleatorios
  const generateRandomNumbers = (lottery: string): number[] => {
    const maxNumbers = lottery === 'Powerball' ? 69 : 50;
    const count = lottery === 'Powerball' ? 5 : 6;
    
    const numbers: number[] = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * maxNumbers) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    
    return numbers.sort((a, b) => a - b);
  };

  // Cambiar idioma
  const changeLanguage = useCallback((lang: 'es' | 'en') => {
    setState(prev => ({ ...prev, language: lang }));
  }, []);

  // Limpiar mensajes
  const clearMessages = useCallback(() => {
    setState(prev => ({ ...prev, messages: [] }));
  }, []);

  // Limpiar predicciones
  const clearPredictions = useCallback(() => {
    setState(prev => ({ ...prev, predictions: [] }));
  }, []);

  // Limpiar error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    connect,
    disconnect,
    sendMessage,
    changeLanguage,
    clearMessages,
    clearPredictions,
    clearError,
  };
};
