'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAnbelAI } from '@/hooks/useAnbelAI';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Brain,
  Zap,
  Target
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'anbel';
  content: string;
  timestamp: string;
  confidence?: number;
  accuracy?: number;
  recommendations?: string[];
  nextActions?: string[];
}

interface AnbelAIChatProps {
  userId: string;
  language: 'es' | 'en';
  onPredictionGenerated?: (prediction: any) => void;
  onAnalysisGenerated?: (analysis: any) => void;
}

export default function AnbelAIChat({ 
  userId, 
  language = 'es',
  onPredictionGenerated,
  onAnalysisGenerated 
}: AnbelAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isActive,
    isInitializing,
    status,
    error,
    processIntelligentChat,
    generateAdvancedPrediction,
    getRecentResponses
  } = useAnbelAI();

  // Mensaje de bienvenida
  useEffect(() => {
    const initializeWelcome = () => {
      if (isActive && !isInitializing && messages.length === 0) {
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          type: 'anbel',
          content: language === 'es' 
            ? '¡Hola! Soy Anbel IA, tu agente súper inteligente de predicciones de lotería. ¿En qué puedo ayudarte?'
            : 'Hello! I\'m Anbel AI, your super intelligent lottery prediction agent. How can I help you?',
          timestamp: new Date().toISOString(),
          confidence: 100,
          accuracy: 100,
          recommendations: language === 'es' 
            ? ['Generar predicción', 'Analizar patrones', 'Ver estadísticas']
            : ['Generate prediction', 'Analyze patterns', 'View statistics'],
          nextActions: language === 'es'
            ? ['Escribir mensaje', 'Seleccionar lotería', 'Ver dashboard']
            : ['Type message', 'Select lottery', 'View dashboard']
        };
        setMessages([welcomeMessage]);
      }
    };

    const timer = setTimeout(initializeWelcome, 100);
  }, []); // Empty dependency array to run only once

  // Auto-scroll al final
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !isActive) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Procesar mensaje con Anbel IA
      const response = await processIntelligentChat(inputMessage, userId, language);
      
      if (response) {
        const anbelMessage: ChatMessage = {
          id: `anbel-${Date.now()}`,
          type: 'anbel',
          content: response.content,
          timestamp: response.timestamp,
          confidence: response.confidence,
          accuracy: response.accuracy,
          recommendations: response.recommendations,
          nextActions: response.nextActions
        };

        setMessages(prev => [...prev, anbelMessage]);

        // Manejar acciones específicas
        if (response.type === 'prediction' && onPredictionGenerated) {
          onPredictionGenerated(response.data);
        }
        
        if (response.type === 'analysis' && onAnalysisGenerated) {
          onAnalysisGenerated(response.data);
        }
      }
    } catch (error) {
      console.error('Error procesando mensaje:', error);
      
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'anbel',
        content: language === 'es'
          ? 'Lo siento, hubo un error procesando tu mensaje. Por favor, inténtalo de nuevo.'
          : 'Sorry, there was an error processing your message. Please try again.',
        timestamp: new Date().toISOString(),
        confidence: 0,
        accuracy: 0
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = async (action: string) => {
    const actionMessages = {
      'prediction': language === 'es' 
        ? 'Genera una predicción para Powerball'
        : 'Generate a prediction for Powerball',
      'analysis': language === 'es'
        ? 'Analiza los patrones de las últimas semanas'
        : 'Analyze patterns from the last weeks',
      'statistics': language === 'es'
        ? 'Muestra las estadísticas de precisión'
        : 'Show accuracy statistics'
    };

    setInputMessage(actionMessages[action as keyof typeof actionMessages] || action);
    await handleSendMessage();
  };

  if (isInitializing) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <div>
              <p className="font-semibold">
                {language === 'es' ? 'Inicializando Anbel IA...' : 'Initializing Anbel AI...'}
              </p>
              <p className="text-sm opacity-80">
                {language === 'es' ? 'Preparando capacidades súper inteligentes' : 'Preparing super intelligent capabilities'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center space-x-3 mb-3">
            <AlertCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">
                {language === 'es' ? 'Anbel IA Desactivado' : 'Anbel AI Deactivated'}
              </p>
              <p className="text-sm opacity-80">
                {language === 'es' ? 'El agente no está disponible' : 'Agent is not available'}
              </p>
            </div>
          </div>
          <a
            href="/activate"
            className="block w-full bg-gold text-black text-center py-2 px-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
          >
            {language === 'es' ? '🔑 ACTIVAR CUENTA' : '🔑 ACTIVATE ACCOUNT'}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón de chat */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Ventana de chat */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-96 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold">Anbel IA</h3>
                <p className="text-xs opacity-80">
                  {language === 'es' ? 'Agente Súper Inteligente' : 'Super Intelligent Agent'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'anbel' && (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      {message.confidence && (
                        <div className="mt-2 text-xs opacity-70">
                          <div className="flex items-center space-x-2">
                            <Target className="w-3 h-3" />
                            <span>
                              {language === 'es' ? 'Confianza:' : 'Confidence:'} {message.confidence}%
                            </span>
                          </div>
                          {message.accuracy && (
                            <div className="flex items-center space-x-2">
                              <Zap className="w-3 h-3" />
                              <span>
                                {language === 'es' ? 'Precisión:' : 'Accuracy:'} {message.accuracy}%
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      {message.recommendations && message.recommendations.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold mb-1">
                            {language === 'es' ? 'Recomendaciones:' : 'Recommendations:'}
                          </p>
                          <ul className="text-xs space-y-1">
                            {message.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Acciones rápidas */}
          <div className="p-2 border-t">
            <div className="flex space-x-2 mb-2">
              <button
                onClick={() => handleQuickAction('prediction')}
                className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
              >
                {language === 'es' ? 'Predicción' : 'Prediction'}
              </button>
              <button
                onClick={() => handleQuickAction('analysis')}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                {language === 'es' ? 'Análisis' : 'Analysis'}
              </button>
              <button
                onClick={() => handleQuickAction('statistics')}
                className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
              >
                {language === 'es' ? 'Estadísticas' : 'Statistics'}
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
