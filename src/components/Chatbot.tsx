'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const responses = {
  'predicción': 'Nuestro algoritmo Anbel analiza patrones históricos con 94.5% de precisión. Utiliza 4 algoritmos integrados para identificar números con mayor probabilidad de aparición.',
  'predicciones': 'Nuestro algoritmo Anbel analiza patrones históricos con 94.5% de precisión. Utiliza 4 algoritmos integrados para identificar números con mayor probabilidad de aparición.',
  'cómo funciona': 'Anbel IA utiliza 4 algoritmos integrados para analizar patrones históricos, frecuencias de números y tendencias temporales. Procesa miles de sorteos para generar predicciones precisas.',
  'como funciona': 'Anbel IA utiliza 4 algoritmos integrados para analizar patrones históricos, frecuencias de números y tendencias temporales. Procesa miles de sorteos para generar predicciones precisas.',
  'registro': 'Al registrarte obtienes acceso a predicciones personalizadas, análisis detallados, chat con IA y notificaciones en tiempo real. ¡Es completamente gratis!',
  'registrarse': 'Al registrarte obtienes acceso a predicciones personalizadas, análisis detallados, chat con IA y notificaciones en tiempo real. ¡Es completamente gratis!',
  'precios': 'Tenemos planes básico ($3.99/semana), premium ($11.99/mes) y VIP ($28.99/3 meses). También ofrecemos una prueba gratuita de 3 días.',
  'precio': 'Tenemos planes básico ($3.99/semana), premium ($11.99/mes) y VIP ($28.99/3 meses). También ofrecemos una prueba gratuita de 3 días.',
  'costos': 'Tenemos planes básico ($3.99/semana), premium ($11.99/mes) y VIP ($28.99/3 meses). También ofrecemos una prueba gratuita de 3 días.',
  'números': 'Basado en el análisis actual, los números con mayor probabilidad son: 7, 14, 23, 31, 42, 8. Estos se basan en patrones de frecuencia y tendencias recientes.',
  'números recomendados': 'Basado en el análisis actual, los números con mayor probabilidad son: 7, 14, 23, 31, 42, 8. Estos se basan en patrones de frecuencia y tendencias recientes.',
  'recomendados': 'Basado en el análisis actual, los números con mayor probabilidad son: 7, 14, 23, 31, 42, 8. Estos se basan en patrones de frecuencia y tendencias recientes.',
  'ayuda': 'Puedo ayudarte con información sobre predicciones, cómo funciona Anbel IA, precios, registro y números recomendados. ¿En qué te puedo ayudar?',
  'hola': '¡Hola! Soy el asistente de Anbel IA. Puedo ayudarte con información sobre predicciones, precios, registro y cómo funciona nuestro sistema. ¿En qué te puedo ayudar?',
  'gracias': '¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas, no dudes en preguntarme.',
  'default': 'No entiendo completamente tu pregunta. Puedo ayudarte con información sobre predicciones, cómo funciona Anbel IA, precios, registro o números recomendados. ¿Podrías ser más específico?'
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy el asistente de Anbel IA. ¿En qué puedo ayudarte hoy?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return responses.default;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">Anbel IA</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
