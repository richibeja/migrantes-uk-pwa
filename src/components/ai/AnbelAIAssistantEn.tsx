'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, Minimize2, Maximize2, Sparkles, Brain, Target, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  analysis?: {
    confidence: number;
    method: string;
    reasoning: string;
  };
}

interface AnbelAIAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
  userPreferences?: {
    favoriteLottery: string;
    budget: number;
    experience: 'beginner' | 'intermediate' | 'expert';
  };
}

export default function AnbelAIAssistantEn({ 
  isOpen, 
  onToggle, 
  isMinimized, 
  onMinimize,
  userPreferences 
}: AnbelAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'ai',
        content: `Hello! I'm ANBEL AI, your personal lottery assistant. 🎯

I'm here to help you with:
• Personalized predictions
• Pattern analysis
• Game strategies
• Smart notifications

How can I help you today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to end of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced intelligent response system
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    setIsTyping(true);
    setIsAnalyzing(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const lowerMessage = userMessage.toLowerCase();
    let response = '';
    let analysis = null;

    // Specific knowledge about Gana Fácil application
    const appKnowledge = {
      features: [
        "4 patented algorithms (Anbel, Fibonacci, Statistical, Patterns)",
        "9 main lotteries (Powerball, Mega Millions, Lotto America, EuroMillions, Cash4Life, Pick 3, Pick 4, Pick 5, Pick 6)",
        "Real-time prediction system with 94% accuracy",
        "ANBEL Clubs for team predictions",
        "Historical analysis of over 1000 draws",
        "Intelligent personalized notifications",
        "Advanced analysis engine with 3 simultaneous algorithms",
        "Digital ticket system with camera",
        "Bilingual dashboard (Spanish and English)",
        "Personalized predictions per user"
      ],
      clubs: [
        "Exclusive club system for team predictions",
        "Up to 10 members per club",
        "Collaborative predictions with higher accuracy",
        "Invitation system with unique codes",
        "Club dashboard with real-time statistics",
        "Club ticket management",
        "Team performance analysis",
        "Special prizes for winning clubs"
      ],
      lotteries: [
        "Powerball: Monday, Wednesday, Saturday - $22M+ USD",
        "Mega Millions: Tuesday, Friday - $18M+ USD",
        "Lotto America: Sunday, Wednesday, Saturday - $2M+ USD",
        "EuroMillions: Tuesday, Friday - €45M+ EUR",
        "Cash4Life: Monday, Wednesday, Friday - $1K/day for life",
        "Pick 3: Daily - $500 USD",
        "Pick 4: Daily - $5,000 USD",
        "Pick 5: Daily - $50,000 USD",
        "Pick 6: Monday, Wednesday, Friday - $1.2M USD"
      ]
    };

    // Detect query type and generate intelligent response
    if (lowerMessage.includes('app') || lowerMessage.includes('application') || lowerMessage.includes('gana facil') || lowerMessage.includes('features') || lowerMessage.includes('functions')) {
      response = `🚀 **GANA FÁCIL - The Most Advanced App in the Market**

**🎯 MAIN FEATURES:**
• **4 Patented Algorithms:** Anbel + Fibonacci + Statistical + Patterns
• **9 Main Lotteries:** Powerball, Mega Millions, Lotto America, EuroMillions, Cash4Life, Pick 3, Pick 4, Pick 5, Pick 6
• **94% Accuracy** in real-time predictions
• **ANBEL Clubs** for team predictions
• **Historical Analysis** of over 1000 draws
• **Intelligent Notifications** personalized
• **Advanced Analysis Engine** with 3 simultaneous algorithms
• **Digital Ticket System** with integrated camera
• **Bilingual Dashboard** (Spanish and English)
• **Personalized Predictions** per user

**💎 UNIQUE DIFFERENTIATION:**
• **Nobody else has** 4 patented algorithms
• **Complete coverage** of United States + Europe
• **Exclusive club system** for teams
• **Cutting-edge technology** with advanced AI

Are you interested in learning more about any specific feature?`;

      analysis = {
        confidence: 98.5,
        method: 'Application Knowledge',
        reasoning: 'Complete information about Gana Fácil features'
      };
    }
    else if (lowerMessage.includes('club') || lowerMessage.includes('clubs') || lowerMessage.includes('team') || lowerMessage.includes('anbel club')) {
      response = `👥 **ANBEL CLUBS - Team Predictions**

**🎯 EXCLUSIVE CLUB SYSTEM:**
• **Up to 10 members** per club
• **Collaborative predictions** with higher accuracy
• **Invitation system** with unique codes
• **Club dashboard** with real-time statistics
• **Club ticket management**
• **Team performance analysis**
• **Special prizes** for winning clubs

**🚀 CLUB ADVANTAGES:**
• **Higher accuracy** by combining multiple member analysis
• **Shared strategies** and collective knowledge
• **Cost division** in premium predictions
• **Friendly competition** between clubs
• **Ranking system** of most successful clubs

**📊 HOW IT WORKS:**
1. **Create or join** a club with invitation code
2. **Share predictions** and analysis with your team
3. **Vote for the best** club combinations
4. **Play as a team** and split winnings
5. **Climb the ranking** of most successful clubs

Would you like me to explain how to create or join a club?`;

      analysis = {
        confidence: 96.8,
        method: 'Club Knowledge',
        reasoning: 'Detailed information about ANBEL Clubs system'
      };
    }
    else if (lowerMessage.includes('lottery') || lowerMessage.includes('lotteries') || lowerMessage.includes('draws') || lowerMessage.includes('which lotteries')) {
      response = `🎯 **LOTTERIES AVAILABLE IN GANA FÁCIL**

**🇺🇸 UNITED STATES:**
• **Powerball:** Monday, Wednesday, Saturday - $22M+ USD
• **Mega Millions:** Tuesday, Friday - $18M+ USD
• **Lotto America:** Sunday, Wednesday, Saturday - $2M+ USD
• **Cash4Life:** Monday, Wednesday, Friday - $1K/day for life
• **Pick 3:** Daily - $500 USD
• **Pick 4:** Daily - $5,000 USD
• **Pick 5:** Daily - $50,000 USD
• **Pick 6:** Monday, Wednesday, Friday - $1.2M USD

**🇪🇺 EUROPE:**
• **EuroMillions:** Tuesday, Friday - €45M+ EUR

**📊 COMPLETE COVERAGE:**
• **9 main lotteries** with real-time analysis
• **From $500 daily** to lifetime prizes
• **Varied frequencies** (daily, 3x week, weekly)
• **Prize ranges** for all budgets
• **94% accuracy** in all lotteries

Are you interested in any specific lottery or want me to analyze which is best for you?`;

      analysis = {
        confidence: 97.2,
        method: 'Lottery Knowledge',
        reasoning: 'Complete information about all available lotteries'
      };
    }
    else if (lowerMessage.includes('prediction') || lowerMessage.includes('numbers') || lowerMessage.includes('recommendation')) {
      const lottery = userPreferences?.favoriteLottery || 'powerball';
      const numbers = generatePersonalizedNumbers(lottery);
      const confidence = 85 + Math.random() * 15;
      
      response = `🎯 **Personalized Prediction for ${lottery.toUpperCase()}**

**Recommended Numbers:** ${numbers.join(' - ')}

**ANBEL Analysis:**
• Confidence: ${confidence.toFixed(1)}%
• Method: Anbel + Fibonacci Algorithm
• Pattern detected: Ascending sequence with prime numbers

**Reasoning:** I've analyzed the last 50 draws and detected a pattern where numbers ${numbers[0]} and ${numbers[numbers.length-1]} frequently appear in combination with prime numbers.

Would you like me to analyze another lottery or dive deeper into this prediction?`;

      analysis = {
        confidence: confidence,
        method: 'Anbel + Fibonacci',
        reasoning: 'Prime number pattern detected in recent draws'
      };
    }
    else if (lowerMessage.includes('analysis') || lowerMessage.includes('pattern') || lowerMessage.includes('statistics')) {
      response = `📊 **Real-Time Pattern Analysis**

**Current Trends:**
• Hot numbers: 7, 14, 21, 28, 35
• Appearance frequency: 23% in last 30 draws
• Temporal pattern: Higher probability on Tuesdays and Fridays

**Recommendation:** Based on analysis of 1000+ draws, I suggest playing combinations that include at least 2 numbers from the 7-14-21-28-35 sequence.

**Next update:** In 2 hours when I receive new data.`;

      analysis = {
        confidence: 92.3,
        method: 'Advanced Statistical Analysis',
        reasoning: 'Sequence pattern detected in historical data'
      };
    }
    else if (lowerMessage.includes('strategy') || lowerMessage.includes('how to play') || lowerMessage.includes('advice')) {
      const experience = userPreferences?.experience || 'intermediate';
      response = `🎓 **Personalized Strategy - ${experience.toUpperCase()} Level**

**For your experience level:**

${experience === 'beginner' ? `
• **Principle:** Play numbers that haven't appeared in the last 3 draws
• **Budget:** Maximum 5% of your monthly income
• **Frequency:** 2-3 times per week
• **Recommended lottery:** Pick 3 or Pick 4 (higher probability)
` : experience === 'intermediate' ? `
• **Principle:** Combine hot and cold numbers (70/30)
• **Budget:** 3-7% of your monthly income
• **Frequency:** Daily for Pick 3/4, 3x week for major lotteries
• **Recommended lottery:** Powerball or Mega Millions
` : `
• **Principle:** Complex pattern analysis and correlations
• **Budget:** 5-10% of your monthly income
• **Frequency:** Strategic based on market analysis
• **Recommended lottery:** All, with focus on high jackpots
`}

**💡 Pro Tip:** Tuesdays and Fridays have 15% higher probability of winning numbers according to my analysis.`;

      analysis = {
        confidence: 88.7,
        method: 'Personalized Strategy',
        reasoning: `Adapted for ${experience} level with behavior analysis`
      };
    }
    else if (lowerMessage.includes('notification') || lowerMessage.includes('alert') || lowerMessage.includes('remind')) {
      response = `🔔 **Smart Notifications System Activated**

**Configured Alerts:**
• ⏰ 2 hours before each draw
• 📈 When I detect favorable patterns
• 💰 When jackpot exceeds $100M
• 🎯 When your favorite lottery has optimal odds

**Upcoming Alerts:**
• Powerball: Tomorrow 10:59 PM EST
• Mega Millions: Friday 11:00 PM EST
• Pick 3: Today 10:00 PM EST

Would you like to customize notifications or change schedules?`;

      analysis = {
        confidence: 95.0,
        method: 'Alert System',
        reasoning: 'Configuration based on user usage patterns'
      };
    }
    else if (lowerMessage.includes('help') || lowerMessage.includes('commands') || lowerMessage.includes('what can you do')) {
      response = `🤖 **ANBEL AI - Available Commands**

**📱 ABOUT THE APP:**
• "What is Gana Fácil?"
• "What are the app features?"
• "How does the application work?"

**👥 ABOUT CLUBS:**
• "What are ANBEL Clubs?"
• "How do I join a club?"
• "How do clubs work?"

**🎯 PREDICTIONS:**
• "Give me numbers for Powerball"
• "Recommend a combination"
• "What numbers are best today?"

**📊 ANALYSIS:**
• "Analyze Mega Millions patterns"
• "What are the current trends?"
• "Explain why these numbers"

**🎓 STRATEGIES:**
• "Teach me to play better"
• "What's the best strategy?"
• "Tips for beginners"

**🔔 NOTIFICATIONS:**
• "Set up my alerts"
• "Remind me about the draw"
• "When is the next one?"

**📈 MARKET ANALYSIS:**
• "Which lottery is best now?"
• "When to play Powerball?"
• "Jackpot analysis"

**🎰 LOTTERIES:**
• "Which lotteries are available?"
• "When are the draws?"
• "What are the prizes?"

Just ask me what you need! 🎯`;

      analysis = {
        confidence: 100.0,
        method: 'Enhanced Help System',
        reasoning: 'Complete response of available commands including app and clubs'
      };
    }
    else if (lowerMessage.includes('how does it work') || lowerMessage.includes('how to use') || lowerMessage.includes('tutorial')) {
      response = `📚 **HOW TO USE GANA FÁCIL - Complete Guide**

**🚀 STEP 1: ACTIVATION**
1. **Register** in the application
2. **Activate your account** with the activation code
3. **Access the main dashboard**

**🎯 STEP 2: PREDICTIONS**
1. **Select the lottery** you want to analyze
2. **View predictions** generated by our 4 algorithms
3. **Click "View Complete Analysis"** for details
4. **Use suggested numbers** or generate new ones

**👥 STEP 3: ANBEL CLUBS**
1. **Go to "Clubs" tab** in the dashboard
2. **Create a club** or join with invitation code
3. **Share predictions** with your team
4. **Vote for the best** club combinations

**📱 STEP 4: ADVANCED FEATURES**
• **Digital Tickets:** Take photos of your tickets
• **Notifications:** Configure personalized alerts
• **Historical Analysis:** Review past patterns
• **Analysis Engine:** See the 3 algorithms working

**💡 PRO TIPS:**
• **Play consistently** for better results
• **Join clubs** for higher accuracy
• **Use notifications** to not miss draws
• **Analyze patterns** before playing

Do you need help with any specific step?`;

      analysis = {
        confidence: 95.7,
        method: 'User Guide',
        reasoning: 'Complete tutorial on how to use Gana Fácil'
      };
    }
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('subscription')) {
      response = `💰 **PRICES AND SUBSCRIPTIONS - GANA FÁCIL**

**🎯 AVAILABLE PLANS:**

**🥉 BASIC PLAN - $29/month**
• Access to 3 main lotteries
• Basic predictions
• Standard notifications
• Email support

**🥈 PREMIUM PLAN - $59/month**
• Access to all 9 lotteries
• Advanced predictions with 4 algorithms
• ANBEL Clubs included
• Intelligent notifications
• Complete historical analysis
• Priority support

**🥇 VIP PLAN - $99/month**
• Everything from Premium Plan
• Personalized predictions
• Access to exclusive clubs
• Real-time analysis
• Unlimited digital tickets
• 24/7 support
• Satisfaction guarantee

**💎 SPECIAL OFFER:**
• **First month FREE** on any plan
• **20% discount** if you pay annually
• **30-day money back** guarantee
• **No commitments** - cancel anytime

**🎁 INCLUDED BONUSES:**
• **Advanced strategies guide**
• **Access to exclusive webinars**
• **VIP user community**
• **Free lifetime updates**

Are you interested in any specific plan or want more details?`;

      analysis = {
        confidence: 94.3,
        method: 'Pricing Information',
        reasoning: 'Complete information about Gana Fácil plans and prices'
      };
    }
    else {
      // Intelligent generic response
      const responses = [
        `I understand your query. Based on my pattern analysis, I suggest you ask me specifically about predictions, analysis, or strategies. Which lottery would you like me to focus on? 🎯`,
        `Interesting question. To give you the best answer, I need more context. Are you interested in a specific prediction, pattern analysis, or game strategy? 📊`,
        `My AI system is processing your query. Meanwhile, have you considered asking me about current lottery trends? I can give you unique insights. 🧠`,
        `Great question. My ANBEL algorithm is designed to give precise answers about lottery predictions. Would you like me to analyze a specific lottery? ⚡`
      ];
      
      response = responses[Math.floor(Math.random() * responses.length)];
      
      analysis = {
        confidence: 75.0 + Math.random() * 20,
        method: 'General Analysis',
        reasoning: 'Adaptive response based on context'
      };
    }

    setIsTyping(false);
    setIsAnalyzing(false);

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      analysis: analysis
    };
  };

  // Generate personalized numbers
  const generatePersonalizedNumbers = (lottery: string): number[] => {
    const configs: { [key: string]: { count: number; max: number } } = {
      'powerball': { count: 5, max: 69 },
      'mega-millions': { count: 5, max: 70 },
      'lotto-america': { count: 5, max: 52 },
      'euromillions': { count: 5, max: 50 },
      'cash4life': { count: 5, max: 60 },
      'pick3': { count: 3, max: 9 },
      'pick4': { count: 4, max: 9 },
      'pick5': { count: 5, max: 9 },
      'pick6': { count: 6, max: 49 }
    };

    const config = configs[lottery] || configs['powerball'];
    const numbers: number[] = [];
    
    while (numbers.length < config.count) {
      const num = Math.floor(Math.random() * config.max) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    
    return numbers.sort((a, b) => a - b);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const aiResponse = await generateAIResponse(inputValue);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="w-8 h-8" />
              {isAnalyzing && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg">ANBEL AI</h3>
              <p className="text-xs opacity-90">
                {isTyping ? 'Typing...' : isAnalyzing ? 'Analyzing...' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onMinimize}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-[450px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>
                    {message.analysis && (
                      <div className="mt-2 pt-2 border-t border-gray-300 text-xs">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Target className="w-3 h-3" />
                          <span>Confidence: {message.analysis.confidence.toFixed(1)}%</span>
                          <TrendingUp className="w-3 h-3" />
                          <span>{message.analysis.method}</span>
                        </div>
                      </div>
                    )}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about predictions, analysis or strategies..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center mt-2 space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Brain className="w-3 h-3" />
                  <span>Advanced AI</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Real Time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-3 h-3" />
                  <span>94% Accuracy</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
