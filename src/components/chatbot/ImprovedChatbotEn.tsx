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

export default function ImprovedChatbotEn({ isVisible, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined chatbot responses
  const chatResponses = {
    'prediction': {
      text: 'Our Anbel algorithm analyzes historical patterns with 94.5% accuracy. It uses 4 integrated algorithms to generate predictions based on frequency analysis, temporal correlation and machine learning.',
      suggestions: ['How does it work?', 'What algorithms do you use?', 'What is the accuracy?']
    },
    'how it works': {
      text: 'Anbel AI works in 3 stages: 1) Collects data from 9 international lotteries, 2) Processes with machine learning and deep learning algorithms, 3) Generates predictions with advanced probabilistic analysis.',
      suggestions: ['What data do you analyze?', 'How long does it take?', 'Is it safe?']
    },
    'register': {
      text: 'By registering you get full access to personalized predictions, detailed analysis, 24/7 AI chat, and specific recommendations for each lottery. You can register for free or activate with a code.',
      suggestions: ['Is it free?', 'How do I activate my account?', 'What does registration include?']
    },
    'price': {
      text: 'We have 3 plans: Basic (1 week) $10.000, Premium (1 month) $30.000, VIP (3 months) $75.000. All include full access to Anbel AI and 24/7 support.',
      suggestions: ['Are there discounts?', 'Can I try for free?', 'How do I pay?']
    },
    'activate': {
      text: 'You can activate your account in 3 ways: 1) With activation code, 2) Email registration, 3) WhatsApp contact. The process takes less than 5 minutes.',
      suggestions: ['How do I get a code?', 'What do I need to register?', 'What is the WhatsApp?']
    },
    'security': {
      text: 'Your information is 100% protected. We use bank-grade encryption, do not share personal data, and comply with the strictest data protection regulations.',
      suggestions: ['Is my payment safe?', 'Do you protect my privacy?', 'Can I cancel?']
    },
    'support': {
      text: 'Our support team is available 24/7. You can contact us via WhatsApp (+57 321 334 9045), email (support@ganafacil.com) or live chat.',
      suggestions: ['What is the WhatsApp?', 'Do you respond quickly?', 'Is there live chat?']
    },
    'default': {
      text: 'I don\'t understand your question. I can help you with information about predictions, registrations, prices, activation or support. How else can I help you?',
      suggestions: ['How does it work?', 'How much does it cost?', 'How do I register?']
    }
  };

  // Detect keywords in the message
  const detectIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('prediction') || lowerMessage.includes('predict') || lowerMessage.includes('numbers')) {
      return 'prediction';
    }
    if (lowerMessage.includes('how it works') || lowerMessage.includes('works') || lowerMessage.includes('algorithm')) {
      return 'how it works';
    }
    if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('account')) {
      return 'register';
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('plan')) {
      return 'price';
    }
    if (lowerMessage.includes('activate') || lowerMessage.includes('code') || lowerMessage.includes('activation')) {
      return 'activate';
    }
    if (lowerMessage.includes('safe') || lowerMessage.includes('security') || lowerMessage.includes('privacy')) {
      return 'security';
    }
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
      return 'support';
    }
    
    return 'default';
  };

  // Generate chatbot response
  const generateResponse = (userMessage: string): string => {
    const intent = detectIntent(userMessage);
    return chatResponses[intent as keyof typeof chatResponses].text;
  };

  // Get suggestions
  const getSuggestions = (userMessage: string): string[] => {
    const intent = detectIntent(userMessage);
    return chatResponses[intent as keyof typeof chatResponses].suggestions;
  };

  // Send message
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

    // Simulate response time
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  // Handle suggestion
  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'Hello! I\'m Anbel AI, your intelligent assistant. I can help you with information about predictions, registrations, prices and more. How can I help you?',
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
              <h3 className="font-semibold">Anbel AI</h3>
              <p className="text-xs opacity-90">Intelligent Assistant</p>
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
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              
              {/* Quick suggestions */}
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
