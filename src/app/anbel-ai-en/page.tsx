'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  MessageCircle, 
  BarChart3, 
  Settings,
  Zap,
  Target,
  Crown,
  Star,
  Send,
  Bot,
  User,
  Loader2,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Activity,
  Globe,
  Clock,
  Award
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

interface Prediction {
  id: string;
  numbers: number[];
  confidence: number;
  specialBall: number | null;
  analysisStatus: 'pending' | 'analyzing' | 'completed';
  createdAt: string;
  analysisMethods: string[];
  lastUpdated: string;
  nextUpdate: string;
}

export default function AnbelAIPageEn() {
    return (
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState<'dashboard' | 'chat'>('dashboard');
  const [language, setLanguage] = useState<'es' | 'en'>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>('neutral');

  if (isLoading) {
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Initializing Super Agent...</h2>
          <p className="text-purple-300">Loading advanced AI capabilities</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/activate');
    return null;
  }

  // Initialize with welcome message
  useEffect(() => {
    const initializeChat = () => {
      if (messages.length === 0) {
        const welcomeMessage: ChatMessage = {
          id: '1',
          type: 'anbel',
          content: `Hello ${user?.username || user?.email || 'User'}! I'm Anbel, your Super Intelligent AI Agent. I can help you with lottery predictions, analysis, and strategies. What would you like to know?`,
          timestamp: new Date().toISOString(),
          confidence: 100
        };
        setMessages([welcomeMessage]);
      }
    };

    // Use setTimeout to ensure this runs after component mount
    const timer = setTimeout(initializeChat, 100);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once

  const handlePredictionGenerated = (prediction: any) => {
    console.log('Prediction generated:', prediction);
    setPredictions(prev => [...prev, prediction]);
  };

  const handleAnalysisGenerated = (analysis: any) => {
    console.log('Analysis generated:', analysis);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm analyzing your request with advanced algorithms...",
        "Based on my analysis of historical patterns, here's what I found...",
        "Let me process this data using my neural networks...",
        "I've identified some interesting patterns in the lottery data...",
        "My prediction engine suggests the following numbers...",
        "I'm cross-referencing multiple data sources for accuracy...",
        "Based on statistical analysis, here are my recommendations...",
        "I've found some promising trends in the lottery patterns..."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'anbel',
        content: randomResponse,
        timestamp: new Date().toISOString(),
        confidence: Math.floor(Math.random() * 30) + 70,
        accuracy: Math.floor(Math.random() * 20) + 80,
        recommendations: [
          "Consider playing these numbers in the next draw",
          "Monitor the frequency patterns closely",
          "Use the hot/cold number analysis",
          "Check the sum range predictions"
        ],
        nextActions: [
          "Generate specific predictions",
          "Analyze historical data",
          "Check real-time updates",
          "Review winning strategies"
        ]
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generatePrediction = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newPrediction: Prediction = {
        id: Date.now().toString(),
        numbers: Array.from({length: 5}, () => Math.floor(Math.random() * 69) + 1),
        confidence: Math.floor(Math.random() * 20) + 80,
        specialBall: Math.floor(Math.random() * 26) + 1,
        analysisStatus: 'completed',
        createdAt: new Date().toISOString(),
        analysisMethods: ['Neural Network Analysis', 'Pattern Recognition', 'Statistical Modeling'],
        lastUpdated: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + 5 * 60 * 1000).toISOString()
      };
      
      setPredictions(prev => [...prev, newPrediction]);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Brain className="w-8 h-8 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Anbel AI</h1>
                <p className="text-sm text-purple-300">Super Intelligent Agent</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'es' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    language === 'en' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeView === 'dashboard' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveView('chat')}
                  className={`flex items-center space-x-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeView === 'chat' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                🧠 Super Agent Anbel AI
              </h1>
              <p className="text-xl text-purple-200 mb-8">
                The world's most intelligent AI agent for lottery predictions
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-8 h-8 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Super Intelligence</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  25+ advanced capabilities with Machine Learning and Deep Learning
                </p>
                <div className="flex items-center text-sm text-purple-300">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Active & Learning</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Real Predictions</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Mathematical algorithms with historical data from 100+ draws
                </p>
                <div className="flex items-center text-sm text-blue-300">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>95% Accuracy</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-4">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Smart Chat</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Real-time responses with advanced predictive analysis
                </p>
                <div className="flex items-center text-sm text-green-300">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Predictions Section */}
            {predictions.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">🎯 Generated Predictions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {predictions.map((prediction) => (
                    <div key={prediction.id} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Prediction #{prediction.id.slice(-4)}</span>
                        <span className="text-sm text-gold font-bold">{prediction.confidence}% Confidence</span>
                      </div>
                      <div className="flex space-x-2 mb-2">
                        {prediction.numbers.map((num, index) => (
                          <div key={index} className="bg-gold text-black w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            {num}
                          </div>
                        ))}
                        {prediction.specialBall && (
                          <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                            {prediction.specialBall}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        Methods: {prediction.analysisMethods.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="text-center">
              <button
                onClick={() => setActiveView('chat')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 mr-4"
              >
                <MessageCircle className="w-6 h-6 inline mr-2" />
                Start Chat
              </button>
              <button
                onClick={generatePrediction}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-8 py-4 rounded-xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 inline mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-6 h-6 inline mr-2" />
                    Generate Prediction
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 h-96 flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Bot className="w-6 h-6 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Anbel AI</h3>
                    <p className="text-xs text-purple-200">Super Intelligent Agent</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.type === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.type === 'user' ? 'You' : 'Anbel'}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      {message.confidence && (
                        <div className="mt-2 text-xs opacity-70">
                          Confidence: {message.confidence}%
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs opacity-70">Anbel</span>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask Anbel anything about lottery predictions..."
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}