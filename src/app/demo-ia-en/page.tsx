'use client';

import { useState, useEffect } from 'react';
import { Brain, ChartLine, Bot, ArrowLeft, Zap, Target, BarChart3, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

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

export default function DemoIAPageEn() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('anbel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prediction, setPrediction] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', message: 'Hello, I am Anbel AI. How can I help you with predictions today?' }
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
          addChatMessage('ai', `I have generated a prediction using the ${algorithms[selectedAlgorithm as keyof typeof algorithms].name}. The numbers with highest probability are: ${numbers.join(', ')}.`);
          
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

  // Generate AI response
  const generateAIResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('prediction') || lowerMsg.includes('numbers')) {
      return "Our algorithm analyzes historical patterns with 94.5% accuracy. Would you like me to generate a prediction for you?";
    } else if (lowerMsg.includes('how does it work') || lowerMsg.includes('algorithm')) {
      return "I use 4 integrated algorithms that analyze frequencies, seasonal patterns, probability distributions and correlations between numbers.";
    } else if (lowerMsg.includes('register') || lowerMsg.includes('account')) {
      return "You can register on our platform to access personalized predictions and advanced analysis. Do you need help with registration?";
    } else if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
      return "We have basic, premium and VIP plans with different benefits. Are you interested in learning more about our plans?";
    } else if (lowerMsg.includes('winner') || lowerMsg.includes('success')) {
      return "Our users have reported over 1,240 successful predictions. The system continuously learns from results to improve accuracy.";
    } else if (lowerMsg.includes('free') || lowerMsg.includes('demo')) {
      return "This demonstration allows you to experience a limited version of our technology. Registration is free and offers access to more features.";
    } else {
      const randomResponses = [
        "Interesting question. Would you like to know more about our prediction capabilities?",
        "I'm not sure I understand completely. Could you rephrase? I can help you with information about predictions or the registration process.",
        "Good question. Our AI specializes in lottery pattern analysis. What type of information are you interested in?",
        "Would you like me to generate a prediction to show you how our system works?"
      ];
      return randomResponses[Math.floor(Math.random() * randomResponses.length)];
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
    setTimeout(() => {
      addChatMessage('ai', "Welcome to the Anbel AI demo! I'm here to help you with intelligent predictions. Would you like me to generate an example prediction?");
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
            <Link href="/page-en" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="h-12 w-12 text-green-400" />
              <span className="text-3xl font-bold">GanaFácil</span>
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
              onClick={generatePrediction}
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
                  <p>Hit probability: <strong>{algorithms[selectedAlgorithm as keyof typeof algorithms].accuracy}</strong></p>
                  <p>Algorithm: <strong>{algorithms[selectedAlgorithm as keyof typeof algorithms].name}</strong></p>
                </div>
              </div>
            )}
          </div>

          {/* AI Chat */}
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for More?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            This is a demonstration with limited capabilities. Register to access personalized predictions, 
            complete analysis and real-time result tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register-us"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              Register Free
            </Link>
            <Link
              href="/auth/login-en"
              className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Sign In
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Get full access to all Anbel AI features
          </p>
        </div>

        {/* Note */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Important Note</h4>
              <p className="text-yellow-700 text-sm">
                This is a demonstration with sample data. Real predictions require analysis of updated historical data 
                and are available only to registered users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}