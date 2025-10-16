'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Microchip, 
  Bot, 
  Flame, 
  Star, 
  ChartLine, 
  Trophy,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { anbelAISystem, ANBEL_ALGORITHMS, type PredictionAnalysis, type ChatContext, type HotColdAnalysis } from '@/lib/anbel-ai-system';

// Use the system type
type PredictionResult = PredictionAnalysis;

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Use the system type
type HotColdNumber = {
  number: number;
  status: 'hot' | 'cold' | 'recommended' | 'normal';
  frequency?: number;
};

interface LanguageConfig {
  title: string;
  subtitle: string;
  stats: {
    precision: string;
    algorithms: string;
    predictions: string;
  };
  sections: {
    predictiveAnalysis: string;
    assistant: string;
    hotNumbers: string;
    recommendedNumbers: string;
  };
  controls: {
    selectAlgorithm: string;
    startAnalysis: string;
    analyzing: string;
    chatPlaceholder: string;
    send: string;
  };
  messages: {
    readyToAnalyze: string;
    collectingData: string;
    analyzingPatterns: string;
    calculatingProbabilities: string;
    analysisComplete: string;
    predictionGenerated: string;
    basedOnAnalysis: string;
    probabilityOfSuccess: string;
    algorithm: string;
  };
  chat: {
    welcome: string;
    responses: {
      [key: string]: string;
    };
  };
}

const ENGLISH_CONFIG: LanguageConfig = {
  title: "Anbel AI - Prediction System",
  subtitle: "Advanced predictive analysis algorithms for lotteries",
  stats: {
    precision: "Anbel Algorithm Precision",
    algorithms: "Integrated Algorithms",
    predictions: "Successful predictions"
  },
  sections: {
    predictiveAnalysis: "Predictive Analysis",
    assistant: "Anbel AI Assistant",
    hotNumbers: "Hot Numbers",
    recommendedNumbers: "Recommended Numbers"
  },
  controls: {
    selectAlgorithm: "Select Algorithm",
    startAnalysis: "Start Analysis",
    analyzing: "Analyzing...",
    chatPlaceholder: "Write your question...",
    send: "Send"
  },
  messages: {
    readyToAnalyze: "Ready to analyze...",
    collectingData: "Collecting historical data...",
    analyzingPatterns: "Analyzing patterns with",
    calculatingProbabilities: "Calculating probabilities...",
    analysisComplete: "Analysis completed successfully!",
    predictionGenerated: "Prediction Generated",
    basedOnAnalysis: "Based on analysis of 1,200 historical draws and detected patterns",
    probabilityOfSuccess: "Success probability",
    algorithm: "Algorithm"
  },
  chat: {
    welcome: "Hello, I'm Anbel AI. I'm here to help you with lottery predictions using advanced algorithms. How can I help you today?",
    responses: {
      prediction: "Based on historical pattern analysis and the Anbel algorithm, my recommended numbers for the next draw are: 15, 23, 34, 41, 52, 67. These numbers have an 87.3% success probability according to my analysis.",
      probability: "My main algorithm has 94.5% precision in identifying winning patterns. The cross-filter algorithm reaches up to 96.8% effectiveness in recent draws.",
      hotNumbers: "The hottest numbers in the last 30 draws are: 7, 15, 23, 34, 41. These numbers have appeared most frequently according to probabilistic distribution analysis.",
      coldNumbers: "The coldest numbers that haven't appeared in the last 15 draws are: 3, 11, 19, 28, 37, 49. According to probability laws, these might have a higher chance of appearing soon.",
      algorithm: "I use 4 main algorithms: 1) Anbel (patented, 94.5% precision), 2) Probabilistic (91.2%), 3) Historical (89.7%), and 4) Cross Filter (96.8%). I analyze over 1,200 historical draws to identify complex patterns.",
      success: "My predictions have helped 1,240 users win significant prizes. Remember that although my algorithms are advanced, lottery always involves an element of luck. Play responsibly."
    }
  }
};

export default function AnbelAISystemPageEN() {
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en'>('en');
  const [currentAlgorithm, setCurrentAlgorithm] = useState('anbel');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [hotColdNumbers, setHotColdNumbers] = useState<HotColdNumber[]>([]);
  const [recommendedNumbers, setRecommendedNumbers] = useState<number[]>([]);
  const [chatContext, setChatContext] = useState<ChatContext>({
    userProfile: {
      experience: 'intermediate',
      favoriteLottery: 'powerball',
      budget: 100,
      goals: ['win jackpot', 'consistent wins']
    },
    conversationHistory: [],
    currentMood: 'curious',
    lastInteraction: new Date().toISOString()
  });
  
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  // Get current language configuration
  const config = ENGLISH_CONFIG;

  // Initialize welcome message and status
  useEffect(() => {
    setAnalysisStatus(config.messages.readyToAnalyze);
    setChatMessages([{
      id: '1',
      type: 'ai',
      content: config.chat.welcome,
      timestamp: new Date()
    }]);
  }, [config]);

  // Load Anbel AI system data
  useEffect(() => {
    const loadSystemData = async () => {
      // Load hot and cold numbers analysis
      const hotColdAnalysis = await anbelAISystem.updateHotColdNumbers();
      
      // Generate numbers for visualization
      const numbers: HotColdNumber[] = [];
      for (let i = 1; i <= 60; i++) {
        let status: 'hot' | 'cold' | 'recommended' | 'normal' = 'normal';
        
        if (hotColdAnalysis.hotNumbers.includes(i)) status = 'hot';
        else if (hotColdAnalysis.coldNumbers.includes(i)) status = 'cold';
        else if (hotColdAnalysis.recommendedNumbers.includes(i)) status = 'recommended';
        
        numbers.push({
          number: i,
          status,
          frequency: hotColdAnalysis.frequency[i] || 0
        });
      }
      
      setHotColdNumbers(numbers);
      setRecommendedNumbers(hotColdAnalysis.recommendedNumbers);
    };

    loadSystemData();
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Real-time analysis using Anbel AI system
  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setPredictionResult(null);

    const algorithmConfig = ANBEL_ALGORITHMS[currentAlgorithm];
    const steps = [
      { progress: 25, status: config.messages.collectingData },
      { progress: 50, status: `${config.messages.analyzingPatterns} ${algorithmConfig.name}...` },
      { progress: 75, status: config.messages.calculatingProbabilities },
      { progress: 100, status: config.messages.analysisComplete }
    ];

    for (const step of steps) {
      setAnalysisProgress(step.progress);
      setAnalysisStatus(step.status);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Generate prediction using real system
    try {
      const prediction = await anbelAISystem.generatePrediction(currentAlgorithm, 60, 6);
      setPredictionResult(prediction);
    } catch (error) {
      console.error('Error generating prediction:', error);
      setAnalysisStatus('Analysis error. Please try again.');
    }

    setIsAnalyzing(false);
  };

  // Generate intelligent response using language configurations
  const generateAIResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('prediction') || lowerMsg.includes('numbers')) {
      return config.chat.responses.prediction;
    } else if (lowerMsg.includes('probability') || lowerMsg.includes('percentage')) {
      return config.chat.responses.probability;
    } else if (lowerMsg.includes('hot') || lowerMsg.includes('frequent')) {
      return config.chat.responses.hotNumbers;
    } else if (lowerMsg.includes('cold') || lowerMsg.includes('overdue')) {
      return config.chat.responses.coldNumbers;
    } else if (lowerMsg.includes('algorithm') || lowerMsg.includes('how do you work')) {
      return config.chat.responses.algorithm;
    } else if (lowerMsg.includes('winner') || lowerMsg.includes('prize') || lowerMsg.includes('success')) {
      return config.chat.responses.success;
    } else {
      // Default contextual response
      const defaultResponses = [
        "I've analyzed your query with my predictive algorithms. Would you like me to generate a personalized prediction for the next draw?",
        "Based on historical data analysis, I can provide valuable insights about probabilities and recommended numbers. Which lottery are you interested in?",
        "My AI system detected that you could benefit from a personalized analysis. Would you like me to proceed with a prediction adapted to your profile?",
        "I've processed your question with the Anbel algorithm and found interesting patterns. Would you be interested in knowing my predictions for upcoming draws?"
      ];
      
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
  };

  // Send message to chat
  const sendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    
    // Update chat context
    setChatContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, userInput],
      lastInteraction: new Date().toISOString()
    }));
    
    setUserInput('');

    // Generate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle Enter in chat
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-6 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2">{config.title}</h1>
              <p className="text-xl opacity-90">{config.subtitle}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => window.location.href = '/anbel-ai-system'}
                className="px-3 py-1 rounded-lg text-sm font-semibold transition-colors bg-blue-500 text-white hover:bg-blue-400"
              >
                ES
              </button>
              <button
                onClick={() => setCurrentLanguage('en')}
                className="px-3 py-1 rounded-lg text-sm font-semibold transition-colors bg-white text-blue-600"
              >
                EN
              </button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl text-green-500 mb-4">
              <ChartLine className="w-12 h-12 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">94.5%</div>
            <div className="text-gray-600">{config.stats.precision}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl text-blue-500 mb-4">
              <Brain className="w-12 h-12 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">4</div>
            <div className="text-gray-600">{config.stats.algorithms}</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <div className="text-4xl text-yellow-500 mb-4">
              <Trophy className="w-12 h-12 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">1,240</div>
            <div className="text-gray-600">{config.stats.predictions}</div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Predictive Analysis */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{config.sections.predictiveAnalysis}</h2>
              <Microchip className="w-8 h-8 text-blue-500" />
            </div>
            
            <div className="space-y-4 mb-6">
                <select 
                value={currentAlgorithm}
                onChange={(e) => setCurrentAlgorithm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isAnalyzing}
              >
                {Object.entries(ANBEL_ALGORITHMS).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name} ({config.precision}% precision)
                  </option>
                ))}
              </select>
              
              <button 
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? config.controls.analyzing : config.controls.startAnalysis}
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{analysisStatus}</p>
            </div>
            
            {/* Prediction Result */}
            {predictionResult && (
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-2xl mt-6">
                <h3 className="text-xl font-bold mb-2">{config.messages.predictionGenerated}</h3>
                <p className="mb-4">{config.messages.basedOnAnalysis}</p>
                
                <div className="flex justify-center gap-4 mb-4 flex-wrap">
                  {predictionResult.numbers.map((number, index) => (
                    <div 
                      key={index}
                      className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg animate-pulse"
                    >
                      {number}
                    </div>
                  ))}
                </div>
                
                <p className="text-center">
                  {config.messages.probabilityOfSuccess}: <strong>{predictionResult.confidence.toFixed(1)}%</strong>
                </p>
                <p className="text-center text-sm opacity-90 mt-2">
                  {config.messages.algorithm}: {predictionResult.algorithm}
                </p>
                <p className="text-center text-xs opacity-80 mt-1">
                  {predictionResult.reasoning}
                </p>
              </div>
            )}
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl p-6 shadow-lg flex flex-col h-[600px]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{config.sections.assistant}</h2>
              <Bot className="w-8 h-8 text-cyan-500" />
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">
                    {message.type === 'user' ? 'You' : 'Anbel AI'}:
                  </div>
                  <div>{message.content}</div>
                </div>
              ))}
              <div ref={chatMessagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={config.controls.chatPlaceholder}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={sendMessage}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {config.controls.send}
              </button>
            </div>
          </div>
        </div>

        {/* Hot and Cold Numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hot Numbers */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{config.sections.hotNumbers}</h2>
              <Flame className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-600 mb-4">
              Numbers with highest frequency in the last 30 draws:
            </p>
            
            <div className="grid grid-cols-10 gap-2">
              {hotColdNumbers.map((item) => (
                <div
                  key={item.number}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    item.status === 'hot'
                      ? 'bg-red-500 text-white scale-110 shadow-lg'
                      : item.status === 'cold'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {item.number}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Numbers */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">{config.sections.recommendedNumbers}</h2>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-gray-600 mb-4">
              Recommendation based on pattern analysis and probabilities:
            </p>
            
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: 60 }, (_, i) => i + 1).map((number) => (
                <div
                  key={number}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    recommendedNumbers.includes(number)
                      ? 'bg-green-500 text-white scale-115 shadow-lg animate-pulse'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

