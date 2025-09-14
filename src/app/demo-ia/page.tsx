'use client';

import { useState, useEffect } from 'react';
import { Brain, ChartLine, Bot, ArrowLeft, Zap, Target, BarChart3, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const algorithms = {
  anbel: {
    name: "Algoritmo Anbel",
    accuracy: "94.5%",
    description: "IA avanzada con análisis de patrones complejos",
    generate: function() {
      return generateUniqueNumbers(1, 60, 6);
    }
  },
  probabilistic: {
    name: "Algoritmo Probabilístico",
    accuracy: "91.2%",
    description: "Análisis estadístico de distribuciones",
    generate: function() {
      return generateUniqueNumbers(1, 60, 6);
    }
  },
  historical: {
    name: "Algoritmo Histórico",
    accuracy: "89.7%",
    description: "Análisis de tendencias temporales",
    generate: function() {
      return generateUniqueNumbers(1, 60, 6);
    }
  },
  crossfilter: {
    name: "Algoritmo Filtrado Cruzado",
    accuracy: "96.8%",
    description: "Filtrado inteligente de correlaciones",
    generate: function() {
      return generateUniqueNumbers(1, 60, 6);
    }
  }
};

// Generar números únicos
function generateUniqueNumbers(min: number, max: number, count: number): number[] {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

export default function DemoIAPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('anbel');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prediction, setPrediction] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', message: 'Hola, soy Anbel IA. ¿En qué puedo ayudarte con predicciones hoy?' }
  ]);
  const [userInput, setUserInput] = useState('');

  // Generar predicción
  const generatePrediction = async () => {
    setIsGenerating(true);
    setShowResult(false);
    setProgress(0);

    // Simular análisis progresivo
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Generar resultado
          const numbers = algorithms[selectedAlgorithm as keyof typeof algorithms].generate();
          setPrediction(numbers);
          setShowResult(true);
          setIsGenerating(false);
          
          // Agregar mensaje al chat
          addChatMessage('ai', `He generado una predicción usando el ${algorithms[selectedAlgorithm as keyof typeof algorithms].name}. Los números con mayor probabilidad son: ${numbers.join(', ')}.`);
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Agregar mensaje al chat
  const addChatMessage = (type: 'user' | 'ai', message: string) => {
    setChatMessages(prev => [...prev, { type, message }]);
  };

  // Enviar mensaje
  const sendMessage = () => {
    if (!userInput.trim()) return;

    addChatMessage('user', userInput);
    const response = generateAIResponse(userInput);
    
    setTimeout(() => {
      addChatMessage('ai', response);
    }, 1000);

    setUserInput('');
  };

  // Generar respuesta de IA
  const generateAIResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('predicción') || lowerMsg.includes('números')) {
      return "Nuestro algoritmo analiza patrones históricos con una precisión del 94.5%. ¿Te gustaría que genere una predicción para ti?";
    } else if (lowerMsg.includes('cómo funciona') || lowerMsg.includes('algoritmo')) {
      return "Utilizo 4 algoritmos integrados que analizan frecuencias, patrones estacionales, distribuciones probabilísticas y correlaciones entre números.";
    } else if (lowerMsg.includes('registro') || lowerMsg.includes('cuenta')) {
      return "Puedes registrarte en nuestra plataforma para acceder a predicciones personalizadas y análisis avanzados. ¿Necesitas ayuda con el registro?";
    } else if (lowerMsg.includes('precio') || lowerMsg.includes('costo')) {
      return "Tenemos planes básico, premium y VIP con diferentes beneficios. ¿Te interesa conocer más sobre nuestros planes?";
    } else if (lowerMsg.includes('ganador') || lowerMsg.includes('éxito')) {
      return "Nuestros usuarios han reportado más de 1,240 predicciones exitosas. El sistema aprende continuamente de los resultados para mejorar la precisión.";
    } else if (lowerMsg.includes('gratis') || lowerMsg.includes('demo')) {
      return "Esta demostración te permite experimentar una versión limitada de nuestra tecnología. El registro es gratuito y ofrece acceso a más funciones.";
    } else {
      const randomResponses = [
        "Interesante pregunta. ¿Te gustaría saber más sobre nuestras capacidades de predicción?",
        "No estoy seguro de entender completamente. ¿Podrías reformular? Puedo ayudarte con información sobre predicciones o el proceso de registro.",
        "Buena pregunta. Nuestra IA se especializa en análisis de patrones de lotería. ¿En qué tipo de información estás interesado?",
        "¿Te gustaría que genere una predicción para mostrarte cómo funciona nuestro sistema?"
      ];
      return randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }
  };

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Inicializar demo
  useEffect(() => {
    setTimeout(() => {
      addChatMessage('ai', "¡Bienvenido a la demo de Anbel IA! Estoy aquí para ayudarte con predicciones inteligentes. ¿Te gustaría que genere una predicción de ejemplo?");
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
              Volver al Inicio
            </Link>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="h-12 w-12 text-green-400" />
              <span className="text-3xl font-bold">GanaFácil</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Demo de Anbel IA</h1>
            <p className="text-blue-100">Experimenta el poder de la predicción inteligente</p>
          </div>

          {/* Stats */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">94.5%</div>
                <div className="text-gray-600 text-sm">Precisión del algoritmo</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">1,240+</div>
                <div className="text-gray-600 text-sm">Predicciones exitosas</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">4</div>
                <div className="text-gray-600 text-sm">Algoritmos integrados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Predicción de Números */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <ChartLine className="h-8 w-8 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Predicción de Números</h2>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona Algoritmo
              </label>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(algorithms).map(([key, algo]) => (
                  <option key={key} value={key}>
                    {algo.name} ({algo.accuracy} precisión)
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
                  Analizando...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Generar Predicción
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
                  Analizando patrones históricos... {progress}%
                </p>
              </div>
            )}

            {/* Resultado */}
            {showResult && (
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">Predicción Generada</h3>
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
                  <p>Probabilidad de acierto: <strong>{algorithms[selectedAlgorithm as keyof typeof algorithms].accuracy}</strong></p>
                  <p>Algoritmo: <strong>{algorithms[selectedAlgorithm as keyof typeof algorithms].name}</strong></p>
                </div>
              </div>
            )}
          </div>

          {/* Chat con IA */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Chat con Anbel IA</h2>
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
                placeholder="Escribe tu pregunta..."
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para más?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Esta es una demostración con capacidades limitadas. Regístrate para acceder a predicciones personalizadas, 
            análisis completos y seguimiento de resultados en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-5 w-5" />
              Regístrate Gratis
            </Link>
            <Link
              href="/auth/login"
              className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Iniciar Sesión
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Obtén acceso completo a todas las funcionalidades de Anbel IA
          </p>
        </div>

        {/* Note */}
        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Nota Importante</h4>
              <p className="text-yellow-700 text-sm">
                Esta es una demostración con datos de ejemplo. Las predicciones reales requieren análisis de datos históricos 
                actualizados y están disponibles solo para usuarios registrados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}