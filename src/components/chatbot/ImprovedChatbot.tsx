'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ImprovedChatbot({ isVisible, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Respuestas predefinidas del chatbot
  const chatResponses = {
    'predicción': {
      text: 'Nuestro algoritmo Anbel analiza patrones históricos con 94.5% de precisión. Utiliza 4 algoritmos integrados para generar predicciones basadas en análisis de frecuencia, correlación temporal y machine learning.',
      suggestions: ['¿Cómo funciona?', '¿Qué algoritmos usan?', '¿Cuál es la precisión?']
    },
    'cómo funciona': {
      text: 'Anbel IA funciona en 3 etapas: 1) Recopila datos de 9 loterías internacionales, 2) Procesa con algoritmos de machine learning y deep learning, 3) Genera predicciones con análisis probabilístico avanzado.',
      suggestions: ['¿Qué datos analizan?', '¿Cuánto tiempo toma?', '¿Es seguro?']
    },
    'registro': {
      text: 'Al registrarte obtienes acceso completo a predicciones personalizadas, análisis detallados, chat con IA 24/7, y recomendaciones específicas para cada lotería. Puedes registrarte gratis o activar con código.',
      suggestions: ['¿Es gratis?', '¿Cómo activo mi cuenta?', '¿Qué incluye el registro?']
    },
    'precio': {
      text: 'Tenemos 3 planes: Básico (1 semana) $10.000, Premium (1 mes) $30.000, VIP (3 meses) $75.000. Todos incluyen acceso completo a Anbel IA y soporte 24/7.',
      suggestions: ['¿Hay descuentos?', '¿Puedo probar gratis?', '¿Cómo pago?']
    },
    'activar': {
      text: 'Puedes activar tu cuenta de 3 formas: 1) Con código de activación, 2) Registro con email, 3) Contacto por WhatsApp. El proceso toma menos de 5 minutos.',
      suggestions: ['¿Cómo obtengo un código?', '¿Qué necesito para registrarme?', '¿Cuál es el WhatsApp?']
    },
    'seguridad': {
      text: 'Tu información está 100% protegida. Usamos encriptación de grado bancario, no compartimos datos personales, y cumplimos con las normativas de protección de datos más estrictas.',
      suggestions: ['¿Es seguro mi pago?', '¿Protegen mi privacidad?', '¿Puedo cancelar?']
    },
    'soporte': {
      text: 'Nuestro equipo de soporte está disponible 24/7. Puedes contactarnos por WhatsApp (+57 321 334 9045), email (soporte@ganafacil.com) o chat en vivo.',
      suggestions: ['¿Cuál es el WhatsApp?', '¿Responden rápido?', '¿Hay chat en vivo?']
    },
    'default': {
      text: 'No entiendo tu pregunta. Puedo ayudarte con información sobre predicciones, registros, precios, activación o soporte. ¿En qué más puedo ayudarte?',
      suggestions: ['¿Cómo funciona?', '¿Cuánto cuesta?', '¿Cómo me registro?']
    }
  };

  // Detectar palabras clave en el mensaje
  const detectIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('predicción') || lowerMessage.includes('predecir') || lowerMessage.includes('números')) {
      return 'predicción';
    }
    if (lowerMessage.includes('cómo funciona') || lowerMessage.includes('funciona') || lowerMessage.includes('algoritmo')) {
      return 'cómo funciona';
    }
    if (lowerMessage.includes('registro') || lowerMessage.includes('registrarse') || lowerMessage.includes('cuenta')) {
      return 'registro';
    }
    if (lowerMessage.includes('precio') || lowerMessage.includes('cuesta') || lowerMessage.includes('costo') || lowerMessage.includes('plan')) {
      return 'precio';
    }
    if (lowerMessage.includes('activar') || lowerMessage.includes('código') || lowerMessage.includes('activación')) {
      return 'activar';
    }
    if (lowerMessage.includes('seguro') || lowerMessage.includes('seguridad') || lowerMessage.includes('privacidad')) {
      return 'seguridad';
    }
    if (lowerMessage.includes('soporte') || lowerMessage.includes('ayuda') || lowerMessage.includes('contacto')) {
      return 'soporte';
    }
    
    return 'default';
  };

  // Generar respuesta del chatbot
  const generateResponse = (userMessage: string): string => {
    const intent = detectIntent(userMessage);
    return chatResponses[intent as keyof typeof chatResponses].text;
  };

  // Obtener sugerencias
  const getSuggestions = (userMessage: string): string[] => {
    const intent = detectIntent(userMessage);
    return chatResponses[intent as keyof typeof chatResponses].suggestions;
  };

  // Enviar mensaje
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular tiempo de respuesta
    await new Promise(resolve => setTimeout(resolve, 1500));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: generateResponse(text),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  // Manejar envío de formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  // Manejar sugerencia
  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mensaje de bienvenida
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: '¡Hola! Soy Anbel IA, tu asistente inteligente. Puedo ayudarte con información sobre predicciones, registros, precios y más. ¿En qué puedo ayudarte?',
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isVisible, messages.length]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-16 h-16' : 'w-96 h-[500px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Anbel IA</h3>
              <p className="text-xs opacity-90">Asistente Inteligente</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isUser ? 'bg-blue-500' : 'bg-green-400'
                    }`}>
                      {message.isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.isUser 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
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

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              
              {/* Sugerencias rápidas */}
              {messages.length > 0 && !isTyping && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {getSuggestions(messages[messages.length - 1].text).slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
