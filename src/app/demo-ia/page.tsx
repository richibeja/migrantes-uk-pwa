'use client';

import { useState, useEffect } from 'react';
import { Brain, ChartLine, Bot, ArrowLeft, Zap, Target, BarChart3, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/components/MetaPixel';

const algorithms = {
  anbel: {
    name: "Anbel Algorithm",
    accuracy: "94.5%",
    description: "Advanced AI with complex pattern analysis",
    generate: function() {
      return generateUniqueNumbers(1, 60, 6);
    }
  },
  probabilistic: {
    name: "Probabilistic Algorithm",
    accuracy: "91.2%",
    description: "Statistical analysis of distributions",
    generate: function() {
      return generateUniqueNumbers(1, 60, 6);
    }
  },
  historical: {
    name: "Historical Algorithm",
    accuracy: "89.7%",
    description: "Analysis of temporal trends",
    generate: function() {
      return generateUniqueNumbers(1, 60, 6);
    }
  },
  crossfilter: {
    name: "Cross-Filter Algorithm",
    accuracy: "96.8%",
    description: "Intelligent correlation filtering",
    generate: function() {
      return generateUniqueNumbers(1, 60, 6);
    }
  }
};

// Generate unique numbers
function generateUniqueNumbers(min: number, max: number, count: number): number[] {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

export default function DemoIAEnPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('anbel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prediction, setPrediction] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', message: 'Hello, I\'m Anbel AI! 👋 I generate intelligent lottery predictions with 94.5% accuracy. To get real predictions, you need a Premium account. Want to learn more or activate now?' }
  ]);
  const [userInput, setUserInput] = useState('');

  // Generate prediction
  const generatePrediction = async () => {
    setIsGenerating(true);
    setShowResult(false);
    setProgress(0);

    // Simulate progressive analysis
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Generate result
          const numbers = algorithms[selectedAlgorithm as keyof typeof algorithms].generate();
          setPrediction(numbers);
          setShowResult(true);
          setIsGenerating(false);
          
          // Add message to chat
          addChatMessage('ai', `I've generated a prediction using the ${algorithms[selectedAlgorithm as keyof typeof algorithms].name}. The numbers with highest probability are: ${numbers.join(', ')}.`);
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Add message to chat
  const addChatMessage = (type: 'user' | 'ai', message: string) => {
    setChatMessages(prev => [...prev, { type, message }]);
  };

  // Send message
  const sendMessage = () => {
    if (!userInput.trim()) return;

    addChatMessage('user', userInput);
    const response = generateAIResponse(userInput);
    
    setTimeout(() => {
      addChatMessage('ai', response);
    }, 1000);

    setUserInput('');
  };

  // Generate AI response - NO FREE PREDICTIONS, PUSH TO BUY
  const generateAIResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    // Keywords for prediction requests
    if (lowerMsg.includes('prediction') || lowerMsg.includes('numbers') || lowerMsg.includes('powerball') || lowerMsg.includes('mega') || lowerMsg.includes('euromillions') || lowerMsg.includes('lottery') || lowerMsg.includes('give me') || lowerMsg.includes('yes') || lowerMsg.includes('y')) {
      return "🎯 I'd love to generate predictions for you! However, real AI predictions with 94.5% accuracy are available only for Premium members. Click 'Buy Now' below to get instant access to unlimited predictions for all 7 lotteries (UK, Europe & USA). Plans start at just £39!";
    } else if (lowerMsg.includes('how') || lowerMsg.includes('work') || lowerMsg.includes('algorithm')) {
      return "Our AI analyzes 200+ historical draws using 4 advanced algorithms. Premium members get real-time predictions with confidence scores. Want to see real predictions? Activate your account now!";
    } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('plan')) {
      return "💰 We have 3 plans: Basic (£39), Premium (£79) - Most Popular, and Pro (£149). All include AI predictions for 7 lotteries. Click 'Buy Now' below to get started!";
    } else if (lowerMsg.includes('buy') || lowerMsg.includes('purchase') || lowerMsg.includes('activate')) {
      return "🚀 Great! Click the 'Buy Now' button below to choose your plan. After payment, you'll receive instant access via email with your login credentials. Start getting winning predictions in 5 minutes!";
    } else if (lowerMsg.includes('free') || lowerMsg.includes('trial') || lowerMsg.includes('demo')) {
      return "✨ This is a demo preview. For full access to real predictions, you need a Premium account. We have a 3-day FREE trial available! Click 'Buy Now' to start your trial.";
    } else if (lowerMsg.includes('help') || lowerMsg.includes('support')) {
      return "I can help you understand our AI prediction system. For real predictions and full features, you'll need to activate an account. Ready to get started? Click 'Buy Now' below!";
    } else {
      // Default responses that push to buy
      const salesResponses = [
        "Interesting! To get personalized predictions for your favorite lotteries, you'll need a Premium account. Ready to activate? Click 'Buy Now' below!",
        "I understand! Real AI predictions with detailed analysis are available in our Premium plans starting at £39. Want to get started?",
        "Great question! Our Premium members get unlimited predictions for all 7 lotteries. Click 'Buy Now' to join over 10,000 winning users!",
        "To unlock the full power of Anbel AI with real predictions, activate your account now. Plans start at just £39 for 3 months!"
      ];
      return salesResponses[Math.floor(Math.random() * salesResponses.length)];
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Initialize demo
  useEffect(() => {
    // Track demo page view
    trackEvent('ViewContent', {
      content_name: 'Anbel AI Demo',
      content_type: 'demo',
      content_category: 'AI Demo'
    });

    setTimeout(() => {
      addChatMessage('ai', "This is a demo preview. For REAL predictions with 94.5% accuracy for UK, European and USA lotteries, you need to activate your Premium account. Plans start at £39 for 3 months. Ready to get started?");
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
            <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="h-12 w-12 text-green-400" />
              <span className="text-3xl font-bold">Gana Fácil</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Anbel AI Demo</h1>
            <p className="text-blue-100">Experience the power of intelligent prediction</p>
          </div>

          {/* Stats */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">94.5%</div>
                <div className="text-gray-600 text-sm">Algorithm accuracy</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">1,240+</div>
                <div className="text-gray-600 text-sm">Successful predictions</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">4</div>
                <div className="text-gray-600 text-sm">Integrated algorithms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Number Prediction */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <ChartLine className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Number Prediction</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Algorithm
              </label>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(algorithms).map(([key, algo]) => (
                  <option key={key} value={key}>
                    {algo.name} ({algo.accuracy} accuracy)
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-600 mt-2">
                {algorithms[selectedAlgorithm as keyof typeof algorithms].description}
              </p>
            </div>

            <button
              onClick={() => {
                generatePrediction();
                trackEvent('Lead', {
                  content_name: 'Demo Prediction Generated',
                  content_category: 'Demo Interaction',
                  value: 0,
                  currency: 'USD'
                });
              }}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Generate Prediction
                </>
              )}
            </button>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Analyzing historical patterns... {progress}%
                </p>
              </div>
            )}

            {/* Result */}
            {showResult && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Generated Prediction</h3>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {prediction.map((number, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg"
                    >
                      {number}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Success probability: <strong>{algorithms[selectedAlgorithm as keyof typeof algorithms].accuracy}</strong></p>
                  <p>Algorithm: <strong>{algorithms[selectedAlgorithm as keyof typeof algorithms].name}</strong></p>
                </div>
              </div>
            )}
          </div>

          {/* Chat with AI */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Chat with Anbel AI</h2>
            </div>
            
            <div className="h-80 bg-gray-50 rounded-xl p-4 overflow-y-auto mb-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-3 rounded-lg max-w-xs ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white ml-auto'
                      : 'bg-white text-gray-900 border'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.type === 'ai' && <Bot className="h-4 w-4 text-green-600 mt-0.5" />}
                    <span className="text-sm">{msg.message}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for more?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            This is a demonstration with limited capabilities. Register to access personalized predictions, 
            complete analysis and real-time results tracking.
          </p>
          <div className="flex flex-col gap-4 justify-center max-w-md mx-auto">
            <a
              href="/payment"
              onClick={() => {
                trackEvent('InitiateCheckout', { 
                  content_name: 'Purchase from Demo', 
                  value: 79, 
                  currency: 'GBP',
                  content_category: 'AI Predictions',
                  content_ids: ['premium-plan']
                });
              }}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-5 rounded-xl font-bold text-2xl hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-2xl"
            >
              🚀 BUY NOW - From £39
            </a>
            <p className="text-center text-sm text-gray-500">
              ⚡ Instant access via email • 💰 30-day money back guarantee • 🔒 Secure payment
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Get full access to AI predictions for 7 real lotteries
          </p>
        </div>

        {/* Note */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Important Note</h4>
              <p className="text-yellow-700 text-sm">
                This is a demonstration with sample data. Real predictions require updated historical data 
                analysis and are available only to registered users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}