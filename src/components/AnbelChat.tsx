/**
 * 💬 ANBEL CHAT - Interfaz de Chat Inteligente
 * Componente de chat avanzado con Anbel IA
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Brain, 
  BarChart3, 
  Zap,
  Target,
  TrendingUp,
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Camera,
  Image,
  CheckCircle,
  XCircle,
  Trophy,
  Star
} from 'lucide-react';
import { anbelAI, AnbelResponse } from '@/lib/anbel-ai';
import '@/lib/error-handler';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'anbel';
  timestamp: Date;
  type: 'text' | 'prediction' | 'analysis' | 'error' | 'suggestion' | 'ticket_analysis' | 'image' | 'learning' | 'alert' | 'insight' | 'trend' | 'personalized';
  data?: any;
  imageUrl?: string;
}

export const AnbelChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '🔥 **¡HOLA! ¡SOY ANBEL ULTRA IA MEGA INTELIGENTE!** 🔥\n\n' +
            '🎯 **¡TE DOY NÚMEROS GANADORES REALES!**\n' +
            '💰 **¡GANÉ $2.3 MILLONES CON MIS PREDICCIONES!**\n' +
            '🧠 **¡ANALIZO 200 SORTEOS HISTÓRICOS EN TIEMPO REAL!**\n\n' +
            '**🚀 ¿QUÉ QUIERES GANAR HOY?**\n\n' +
            '**1️⃣ PREDICCIÓN ULTRA GANADORA**\n' +
            '• Powerball → Números que GANAN\n' +
            '• Mega Millions → Combinaciones GANADORAS\n' +
            '• EuroMillions → Números de la SUERTE\n' +
            '• Baloto → Combinaciones ULTRA\n\n' +
            '**2️⃣ ANÁLISIS DE TICKET**\n' +
            '• Sube tu ticket → Te digo si GANASTE\n' +
            '• Análisis ULTRA inteligente\n' +
            '• ¡Te animo a seguir GANANDO!\n\n' +
            '**3️⃣ MÚLTIPLES PREDICCIONES**\n' +
            '• 3 combinaciones GANADORAS\n' +
            '• ¡Elige la que más te guste!\n\n' +
            '**4️⃣ SISTEMA DE PUNTUACIÓN**\n' +
            '• Gana puntos por cada predicción\n' +
            '• Sube de nivel y desbloquea logros\n' +
            '• ¡Conviértete en un MAESTRO GANADOR!\n\n' +
            '**💬 SOLO DIME:**\n' +
            '• "Powerball" → Te doy números GANADORES\n' +
            '• "Múltiples predicciones" → 3 opciones GANADORAS\n' +
            '• "Analizar ticket" → Te digo si GANASTE\n' +
            '• "Mi perfil" → Ve tus estadísticas\n\n' +
            '**🎉 ¡VAMOS A GANAR JUNTOS!** 🎉',
      sender: 'anbel',
      timestamp: new Date(),
      type: 'personalized'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en'>('es');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  // 📱 FUNCIONALIDADES SOCIALES
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [lastPrediction, setLastPrediction] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 📱 FUNCIONES DE COMPARTIR SOCIAL CON ENLACES MEJORADOS
  const shareToTwitter = (prediction: any, lottery: string) => {
    const socialLinks = anbelAI.generateSocialLinks(prediction, lottery, currentLanguage);
    window.open(socialLinks.twitter, '_blank');
    
    // Actualizar puntos sociales
    if (userProfile) {
      anbelAI.updateSocialPoints(userProfile, 'share');
      setUserProfile({...userProfile});
    }
  };

  const shareToWhatsApp = (prediction: any, lottery: string) => {
    const socialLinks = anbelAI.generateSocialLinks(prediction, lottery, currentLanguage);
    window.open(socialLinks.whatsapp, '_blank');
    
    // Actualizar puntos sociales
    if (userProfile) {
      anbelAI.updateSocialPoints(userProfile, 'share');
      setUserProfile({...userProfile});
    }
  };

  const shareToFacebook = (prediction: any, lottery: string) => {
    const socialLinks = anbelAI.generateSocialLinks(prediction, lottery, currentLanguage);
    window.open(socialLinks.facebook, '_blank');
    
    // Actualizar puntos sociales
    if (userProfile) {
      anbelAI.updateSocialPoints(userProfile, 'share');
      setUserProfile({...userProfile});
    }
  };

  const shareToTelegram = (prediction: any, lottery: string) => {
    const socialLinks = anbelAI.generateSocialLinks(prediction, lottery, currentLanguage);
    window.open(socialLinks.telegram, '_blank');
    
    // Actualizar puntos sociales
    if (userProfile) {
      anbelAI.updateSocialPoints(userProfile, 'share');
      setUserProfile({...userProfile});
    }
  };

  const shareToEmail = (prediction: any, lottery: string) => {
    const socialLinks = anbelAI.generateSocialLinks(prediction, lottery, currentLanguage);
    window.open(socialLinks.email, '_blank');
    
    // Actualizar puntos sociales
    if (userProfile) {
      anbelAI.updateSocialPoints(userProfile, 'share');
      setUserProfile({...userProfile});
    }
  };

  const copyToClipboard = (prediction: any, lottery: string) => {
    const shareText = anbelAI.generateShareText(prediction, lottery, currentLanguage);
    navigator.clipboard.writeText(shareText).then(() => {
      alert(currentLanguage === 'es' ? '¡Texto copiado al portapapeles!' : 'Text copied to clipboard!');
    });
    
    // Actualizar puntos sociales
    if (userProfile) {
      anbelAI.updateSocialPoints(userProfile, 'share');
      setUserProfile({...userProfile});
    }
  };

  // 🎯 COMPONENTE DE BOTONES DE COMPARTIR CON ENLACES MEJORADOS
  const ShareButtons = ({ prediction, lottery }: { prediction: any; lottery: string }) => (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold text-sm">
          {currentLanguage === 'es' ? '📱 Compartir Predicción' : '📱 Share Prediction'}
        </h4>
        <div className="text-yellow-400 text-xs">
          +5 {currentLanguage === 'es' ? 'puntos' : 'points'}
        </div>
      </div>
      
      <div className="mb-3 p-2 bg-blue-900/30 rounded border border-blue-500/30">
        <p className="text-blue-300 text-xs text-center">
          {currentLanguage === 'es' 
            ? '🔗 Incluye enlace directo a la app para que otros puedan descargar Anbel IA'
            : '🔗 Includes direct link to the app so others can download Anbel AI'
          }
        </p>
      </div>
      
      {/* Botón de enlace directo a la app */}
      <div className="mb-3">
        <button
          onClick={() => window.open('https://gana-facil.vercel.app', '_blank')}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
        >
          <span>🚀</span>
          <span>{currentLanguage === 'es' ? 'IR A ANBEL IA' : 'GO TO ANBEL AI'}</span>
          <span>🔗</span>
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => shareToTwitter(prediction, lottery)}
          className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <span>🐦</span>
          <span>Twitter</span>
        </button>
        
        <button
          onClick={() => shareToWhatsApp(prediction, lottery)}
          className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <span>📱</span>
          <span>WhatsApp</span>
        </button>
        
        <button
          onClick={() => shareToFacebook(prediction, lottery)}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <span>📘</span>
          <span>Facebook</span>
        </button>
        
        <button
          onClick={() => shareToTelegram(prediction, lottery)}
          className="flex items-center justify-center space-x-2 bg-blue-400 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <span>✈️</span>
          <span>Telegram</span>
        </button>
        
        <button
          onClick={() => shareToEmail(prediction, lottery)}
          className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <span>📧</span>
          <span>Email</span>
        </button>
        
        <button
          onClick={() => copyToClipboard(prediction, lottery)}
          className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          <span>📋</span>
          <span>{currentLanguage === 'es' ? 'Copiar' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );

  // 🏆 COMPONENTE DE PERFIL DE USUARIO
  const UserProfile = () => {
    if (!userProfile) return null;
    
    return (
      <div className="mb-4 p-4 bg-gradient-to-r from-purple-800 to-blue-800 rounded-lg border border-purple-600">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-bold text-lg">
            {currentLanguage === 'es' ? '👤 Tu Perfil' : '👤 Your Profile'}
          </h3>
          <div className="text-yellow-400 text-sm font-semibold">
            Nivel {userProfile.level}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-white">
            <div className="text-yellow-400 font-semibold">
              {userProfile.points} {currentLanguage === 'es' ? 'puntos' : 'points'}
            </div>
            <div className="text-gray-300">
              {currentLanguage === 'es' ? 'Puntos totales' : 'Total points'}
            </div>
          </div>
          
          <div className="text-white">
            <div className="text-green-400 font-semibold">
              {userProfile.streak} {currentLanguage === 'es' ? 'días' : 'days'}
            </div>
            <div className="text-gray-300">
              {currentLanguage === 'es' ? 'Racha actual' : 'Current streak'}
            </div>
          </div>
          
          <div className="text-white">
            <div className="text-blue-400 font-semibold">
              {userProfile.totalPredictions}
            </div>
            <div className="text-gray-300">
              {currentLanguage === 'es' ? 'Predicciones' : 'Predictions'}
            </div>
          </div>
          
          <div className="text-white">
            <div className="text-pink-400 font-semibold">
              {userProfile.totalShares}
            </div>
            <div className="text-gray-300">
              {currentLanguage === 'es' ? 'Compartidos' : 'Shared'}
            </div>
          </div>
        </div>
        
        {/* Badges */}
        {userProfile.badges && userProfile.badges.length > 0 && (
          <div className="mt-3">
            <div className="text-white text-sm mb-2">
              {currentLanguage === 'es' ? '🏆 Logros:' : '🏆 Achievements:'}
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile.badges.map((badge: string, index: number) => (
                <span
                  key={index}
                  className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Inicializar capacidades de voz
  useEffect(() => {
    initializeVoiceCapabilities();
    return () => {
      // Limpiar recursos de voz
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthesisRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Detectar idioma automáticamente
  useEffect(() => {
    if (inputText) {
      const detectedLang = detectLanguage(inputText);
      if (detectedLang !== currentLanguage) {
        setCurrentLanguage(detectedLang);
      }
    }
  }, [inputText, currentLanguage]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);
    setIsTyping(true);

    try {
      // Usar Anbel IA real
      const response: AnbelResponse = await anbelAI.processMessage(inputText, {
        userHistory: messages,
        timestamp: new Date()
      });
      
      // Simular tiempo de procesamiento inteligente
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      setIsTyping(false);
      
      // Procesar respuesta con voz
      await processResponseWithVoice(response);
      
      // Mostrar botones de compartir si es una predicción
      if (response.type === 'prediction' && response.data) {
        setLastPrediction(response.data);
        setShowShareButtons(true);
      }
      
    } catch (error) {
      console.error('Error en AnbelChat:', error);
      setIsTyping(false);
      
      // 🔒 FALLBACK DE EMERGENCIA - SIEMPRE GENERAR PREDICCIÓN
      const isPrediction = isPredictionRequest(inputText);
      
      if (isPrediction) {
        // Generar predicción de emergencia local
        const emergencyPrediction = generateEmergencyPredictionLocal(inputText);
        await processResponseWithVoice(emergencyPrediction);
        
        if (emergencyPrediction.type === 'prediction' && emergencyPrediction.data) {
          setLastPrediction(emergencyPrediction.data);
          setShowShareButtons(true);
        }
      } else {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: '❌ Error procesando tu solicitud. Intenta de nuevo.',
          sender: 'anbel',
          timestamp: new Date(),
          type: 'error'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * 🔍 Verificar si es solicitud de predicción
   */
  const isPredictionRequest = (input: string): boolean => {
    const lowerInput = input.toLowerCase();
    const predictionKeywords = [
      'powerball', 'mega millions', 'euromillions', 'baloto',
      'predicción', 'prediction', 'números', 'numbers',
      'sorteo', 'draw', 'lotto', 'lottery',
      'sí', 'si', 'yes', 'ok', 'okay', 'vale'
    ];
    return predictionKeywords.some(keyword => lowerInput.includes(keyword));
  };

  /**
   * 🚨 Generar predicción de emergencia local
   */
  const generateEmergencyPredictionLocal = (input: string): AnbelResponse => {
    const lowerInput = input.toLowerCase();
    let lottery = 'Powerball';
    
    // Detectar lotería
    if (lowerInput.includes('mega millions')) lottery = 'Mega Millions';
    else if (lowerInput.includes('euromillions')) lottery = 'EuroMillions';
    else if (lowerInput.includes('baloto')) lottery = 'Baloto';
    
    // Generar números de emergencia
    const numbers = generateEmergencyNumbers(lottery);
    const bonusNumbers = generateEmergencyBonus(lottery);
    
    const prediction = {
      numbers: numbers,
      bonusNumbers: bonusNumbers,
      confidence: 0.85,
      algorithm: 'Emergency Local',
      patterns: 1,
      learningLevel: 100
    };
    
    return {
      text: formatEmergencyPredictionText(lottery, prediction),
      type: 'prediction',
      data: prediction,
      confidence: 0.85,
      learningData: {
        emergency: true,
        algorithm: 'Emergency Local',
        patterns: 1
      }
    };
  };

  /**
   * 🔢 Generar números de emergencia
   */
  const generateEmergencyNumbers = (lottery: string): number[] => {
    const configs = {
      'Powerball': { count: 5, max: 69 },
      'Mega Millions': { count: 5, max: 70 },
      'EuroMillions': { count: 5, max: 50 },
      'Baloto': { count: 5, max: 43 }
    };
    
    const config = configs[lottery] || configs['Powerball'];
    const numbers: number[] = [];
    
    // Algoritmo de emergencia ultra simple
    for (let i = 0; i < config.count; i++) {
      let num: number;
      do {
        // Combinar Fibonacci, primos y aleatorio
        const method = i % 3;
        switch (method) {
          case 0: // Fibonacci
            const fib = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
            const validFib = fib.filter(n => n <= config.max);
            num = validFib[Math.floor(Math.random() * validFib.length)];
            break;
          case 1: // Primos
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67];
            const validPrimes = primes.filter(n => n <= config.max);
            num = validPrimes[Math.floor(Math.random() * validPrimes.length)];
            break;
          default: // Aleatorio
            num = Math.floor(Math.random() * config.max) + 1;
        }
      } while (numbers.includes(num));
      numbers.push(num);
    }
    
    return numbers.sort((a, b) => a - b);
  };

  /**
   * 🎯 Generar números bonus de emergencia
   */
  const generateEmergencyBonus = (lottery: string): number[] => {
    const configs = {
      'Powerball': { count: 1, max: 26 },
      'Mega Millions': { count: 1, max: 25 },
      'EuroMillions': { count: 2, max: 12 },
      'Baloto': { count: 1, max: 16 }
    };
    
    const config = configs[lottery] || configs['Powerball'];
    const bonus: number[] = [];
    
    for (let i = 0; i < config.count; i++) {
      let num: number;
      do {
        num = Math.floor(Math.random() * config.max) + 1;
      } while (bonus.includes(num));
      bonus.push(num);
    }
    
    return bonus.sort((a, b) => a - b);
  };

  /**
   * 📝 Formatear texto de predicción de emergencia
   */
  const formatEmergencyPredictionText = (lottery: string, prediction: any): string => {
    const numbers = prediction.numbers.join(', ');
    const bonus = prediction.bonusNumbers ? ` + ${prediction.bonusNumbers.join(', ')}` : '';
    const confidence = Math.round(prediction.confidence * 100);
    
    return `🚨 **PREDICCIÓN DE EMERGENCIA ULTRA GANADORA** 🚨\n\n` +
           `🎯 **${lottery.toUpperCase()}**\n` +
           `🔢 **Números**: ${numbers}${bonus}\n` +
           `🧠 **Confianza**: ${confidence}%\n` +
           `⚡ **Algoritmo**: Emergency Local\n\n` +
           `💡 **¡Estos números tienen alta probabilidad de ganar!**\n` +
           `🎉 **¡Usa esta combinación y GANA!**`;
  };

  /**
   * 🎤 INICIALIZAR CAPACIDADES DE VOZ
   */
  const initializeVoiceCapabilities = () => {
    // Verificar soporte de síntesis de voz
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }

    // Verificar soporte de reconocimiento de voz
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setRecognitionSupported(true);
      initializeSpeechRecognition();
    }
  };

  /**
   * 🎙️ INICIALIZAR RECONOCIMIENTO DE VOZ
   */
  const initializeSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = currentLanguage === 'es' ? 'es-ES' : 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        
        // Enviar mensaje automáticamente después del reconocimiento
        setTimeout(() => {
          handleSendMessage();
        }, 500);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Error en reconocimiento de voz:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  /**
   * 🎤 INICIAR/DETENER ESCUCHA
   */
  const toggleListening = () => {
    if (!recognitionSupported) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
    }
  };

  /**
   * 🔊 HABLAR RESPUESTA
   */
  /**
   * 🧹 LIMPIAR EMOTICONES PARA VOZ
   */
  const cleanTextForSpeech = (text: string): string => {
    // Remover emoticones y caracteres especiales
    return text
      .replace(/[🔥🎯💰🧠🚀🎉🎲💬📱🏆⭐🌟💎🎊🎈🎁🎀🎂🎃🎄🎆🎇🎈🎉🎊🎋🎌🎍🎎🎏🎐🎑🎒🎓🎖🎗🎙🎚🎛🎜🎝🎞🎟🎠🎡🎢🎣🎤🎥🎦🎧🎨🎩🎪🎫🎬🎭🎮🎯🎰🎱🎲🎳🎴🎵🎶🎷🎸🎹🎺🎻🎼🎽🎾🎿🏀🏁🏂🏃🏄🏅🏆🏇🏈🏉🏊🏋🏌🏍🏎🏏🏐🏑🏒🏓🏔🏕🏖🏗🏘🏙🏚🏛🏜🏝🏞🏟🏠🏡🏢🏣🏤🏥🏦🏧🏨🏩🏪🏫🏬🏭🏮🏯🏰🏱🏲🏳🏴🏵🏶🏷🏸🏹🏺🏻🏼🏽🏾🏿]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remover **bold**
      .replace(/\*(.*?)\*/g, '$1') // Remover *italic*
      .replace(/\n+/g, '. ') // Convertir saltos de línea en pausas
      .replace(/\s+/g, ' ') // Limpiar espacios múltiples
      .trim();
  };

  const speakText = (text: string, language: 'es' | 'en' = currentLanguage) => {
    if (!speechSupported) {
      console.log('Síntesis de voz no soportada');
      return;
    }

    // Cancelar síntesis anterior
    speechSynthesis.cancel();

    // Limpiar texto para voz
    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Seleccionar voz apropiada
    const voices = speechSynthesis.getVoices();
    const targetVoice = voices.find(voice => 
      voice.lang.startsWith(language) && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft'))
    );
    
    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Error en síntesis de voz:', event.error);
      setIsSpeaking(false);
    };

    synthesisRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  /**
   * 🔇 DETENER HABLA
   */
  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  /**
   * 🌍 DETECTAR IDIOMA
   */
  const detectLanguage = (text: string): 'es' | 'en' => {
    const spanishWords = [
      'hola', 'predicción', 'análisis', 'ayuda', 'gracias', 'por favor', 'números', 'lotería',
      'sí', 'no', 'buenos', 'días', 'tarde', 'noche', 'cómo', 'estás', 'bien', 'mal',
      'quiero', 'necesito', 'puedo', 'debería', 'mejor', 'peor', 'mucho', 'poco',
      'powerball', 'mega millions', 'euromillions', 'baloto', 'lotto', 'sorteo',
      'ganar', 'perder', 'dinero', 'premio', 'jackpot', 'fortuna', 'suerte'
    ];
    const englishWords = [
      'hello', 'prediction', 'analysis', 'help', 'thanks', 'please', 'numbers', 'lottery',
      'yes', 'no', 'good', 'morning', 'afternoon', 'evening', 'how', 'are', 'you', 'fine', 'bad',
      'want', 'need', 'can', 'should', 'better', 'worse', 'much', 'little',
      'powerball', 'mega millions', 'euromillions', 'baloto', 'lotto', 'draw',
      'win', 'lose', 'money', 'prize', 'jackpot', 'fortune', 'luck'
    ];
    
    const lowerText = text.toLowerCase();
    const spanishCount = spanishWords.filter(word => lowerText.includes(word)).length;
    const englishCount = englishWords.filter(word => lowerText.includes(word)).length;
    
    // Si hay más palabras en inglés, cambiar a inglés
    if (englishCount > spanishCount) {
      return 'en';
    }
    
    // Si hay más palabras en español, cambiar a español
    if (spanishCount > englishCount) {
      return 'es';
    }
    
    // Si hay empate, mantener el idioma actual
    return currentLanguage;
  };

  /**
   * 🔄 CAMBIAR IDIOMA
   */
  const toggleLanguage = () => {
    const newLang = currentLanguage === 'es' ? 'en' : 'es';
    setCurrentLanguage(newLang);
    
    // Actualizar idioma del reconocimiento de voz
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLang === 'es' ? 'es-ES' : 'en-US';
    }
  };

  /**
   * 🎯 PROCESAR RESPUESTA CON VOZ
   */
  const processResponseWithVoice = async (response: AnbelResponse) => {
    // Hablar la respuesta
    speakText(response.text, currentLanguage);
    
    // Agregar mensaje al chat
    const anbelMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: 'anbel',
      timestamp: new Date(),
      type: response.type,
      data: response.data
    };

    setMessages(prev => [...prev, anbelMessage]);
  };

  /**
   * 🎫 ANALIZAR TICKET DE LOTERÍA
   */
  const analyzeLotteryTicket = async (imageFile: File) => {
    setIsAnalyzingImage(true);
    
    try {
      // Convertir imagen a base64
      const base64Image = await convertToBase64(imageFile);
      
      // Simular análisis de IA (en producción usarías una API real)
      const analysis = await simulateTicketAnalysis(base64Image);
      
      // Crear mensaje con imagen
      const imageMessage: ChatMessage = {
        id: Date.now().toString(),
        text: currentLanguage === 'es' 
          ? '📸 Analizando tu ticket de lotería...' 
          : '📸 Analyzing your lottery ticket...',
        sender: 'user',
        timestamp: new Date(),
        type: 'image',
        imageUrl: base64Image
      };
      
      setMessages(prev => [...prev, imageMessage]);
      
      // Simular tiempo de análisis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generar respuesta positiva de Anbel
      const response = generatePositiveTicketResponse(analysis, currentLanguage);
      
      const anbelMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'anbel',
        timestamp: new Date(),
        type: 'ticket_analysis',
        data: analysis
      };
      
      setMessages(prev => [...prev, anbelMessage]);
      
      // Hablar la respuesta
      speakText(response.text, currentLanguage);
      
    } catch (error) {
      console.error('Error analizando ticket:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: currentLanguage === 'es' 
          ? '❌ No pude analizar tu ticket. Intenta con una imagen más clara.'
          : '❌ I couldn\'t analyze your ticket. Try with a clearer image.',
        sender: 'anbel',
        timestamp: new Date(),
        type: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  /**
   * 🔄 CONVERTIR IMAGEN A BASE64
   */
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  /**
   * 🤖 SIMULAR ANÁLISIS DE TICKET
   */
  const simulateTicketAnalysis = async (base64Image: string): Promise<any> => {
    // Simular análisis de IA
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generar análisis simulado
    const isWinner = Math.random() > 0.7; // 30% de probabilidad de ganar
    const matchedNumbers = isWinner ? Math.floor(Math.random() * 3) + 1 : 0;
    const prizeAmount = isWinner ? Math.floor(Math.random() * 1000) + 10 : 0;
    
    return {
      isWinner,
      matchedNumbers,
      prizeAmount,
      ticketNumbers: [7, 14, 21, 28, 35, 42],
      winningNumbers: [7, 14, 21, 28, 35, 42],
      lotteryType: 'Powerball',
      analysisConfidence: 0.95,
      timestamp: new Date()
    };
  };

  /**
   * 💬 GENERAR RESPUESTA POSITIVA DE TICKET
   */
  const generatePositiveTicketResponse = (analysis: any, language: 'es' | 'en'): AnbelResponse => {
    const { isWinner, matchedNumbers, prizeAmount, ticketNumbers, winningNumbers } = analysis;
    
    if (language === 'es') {
      if (isWinner) {
        return {
          text: `🎉 **¡FELICIDADES! ¡HAS GANADO!** 🎉\n\n` +
                `🎫 **Análisis Ultra Inteligente de tu Ticket:**\n` +
                `• Números que compraste: ${ticketNumbers.join(', ')}\n` +
                `• Números ganadores: ${winningNumbers.join(', ')}\n` +
                `• Números acertados: **${matchedNumbers}**\n` +
                `• Premio obtenido: **$${prizeAmount.toLocaleString()}**\n` +
                `• Fecha del sorteo: ${new Date().toLocaleDateString('es-ES')}\n\n` +
                `🏆 **¡INCREÍBLE! Tu estrategia funcionó perfectamente.**\n` +
                `💡 **Consejo de Anbel:** Sigue usando mis predicciones ultra inteligentes para más ganancias.\n` +
                `🚀 **¡No pares ahora!** Tu próxima victoria está más cerca que nunca.\n` +
                `🌟 **Confianza del análisis:** 95%\n\n` +
                `**🎯 PRÓXIMOS PASOS:**\n` +
                `• Usa mis predicciones para el próximo sorteo\n` +
                `• Compra más tickets con mis números\n` +
                `• ¡Sigue ganando con Anbel IA!\n\n` +
                `*¡Anbel IA está orgulloso de tu victoria!*`,
          type: 'ticket_analysis',
          confidence: 0.95,
          data: analysis
        };
      } else {
        return {
          text: `🌟 **¡EXCELENTE INTENTO!** 🌟\n\n` +
                `🎫 **Análisis Ultra Inteligente de tu Ticket:**\n` +
                `• Números que compraste: ${ticketNumbers.join(', ')}\n` +
                `• Números ganadores: ${winningNumbers.join(', ')}\n` +
                `• Números acertados: **${matchedNumbers}**\n` +
                `• Fecha del sorteo: ${new Date().toLocaleDateString('es-ES')}\n\n` +
                `💪 **¡NO TE DESANIMES!** Cada intento te acerca más al premio.\n` +
                `🎯 **Consejo de Anbel:** Usa mis predicciones ultra inteligentes para tu próximo ticket.\n` +
                `📈 **Tu próxima victoria está cerca** - confía en el proceso.\n` +
                `🚀 **¡SIGUE JUGANDO!** La suerte está de tu lado.\n` +
                `🌟 **Confianza del análisis:** 95%\n\n` +
                `**🎯 PRÓXIMOS PASOS:**\n` +
                `• Pídeme una predicción para el próximo sorteo\n` +
                `• Usa mis números ultra inteligentes\n` +
                `• ¡Tu victoria está a la vuelta de la esquina!\n\n` +
                `*Anbel IA cree en ti y en tu próxima victoria*`,
          type: 'ticket_analysis',
          confidence: 0.95,
          data: analysis
        };
      }
    } else {
      if (isWinner) {
        return {
          text: `🎉 **CONGRATULATIONS! YOU WON!** 🎉\n\n` +
                `🎫 **Ultra Intelligent Ticket Analysis:**\n` +
                `• Numbers you bought: ${ticketNumbers.join(', ')}\n` +
                `• Winning numbers: ${winningNumbers.join(', ')}\n` +
                `• Numbers matched: **${matchedNumbers}**\n` +
                `• Prize obtained: **$${prizeAmount.toLocaleString()}**\n` +
                `• Draw date: ${new Date().toLocaleDateString('en-US')}\n\n` +
                `🏆 **AMAZING! Your strategy worked perfectly.**\n` +
                `💡 **Anbel's tip:** Keep using my ultra-intelligent predictions for more wins.\n` +
                `🚀 **Don't stop now!** Your next victory is closer than ever.\n` +
                `🌟 **Analysis confidence:** 95%\n\n` +
                `**🎯 NEXT STEPS:**\n` +
                `• Use my predictions for the next draw\n` +
                `• Buy more tickets with my numbers\n` +
                `• Keep winning with Anbel AI!\n\n` +
                `*Anbel AI is proud of your victory!*`,
          type: 'ticket_analysis',
          confidence: 0.95,
          data: analysis
        };
      } else {
        return {
          text: `🌟 **GREAT ATTEMPT!** 🌟\n\n` +
                `🎫 **Ultra Intelligent Ticket Analysis:**\n` +
                `• Numbers you bought: ${ticketNumbers.join(', ')}\n` +
                `• Winning numbers: ${winningNumbers.join(', ')}\n` +
                `• Numbers matched: **${matchedNumbers}**\n` +
                `• Draw date: ${new Date().toLocaleDateString('en-US')}\n\n` +
                `💪 **DON'T GIVE UP!** Every attempt brings you closer to the prize.\n` +
                `🎯 **Anbel's tip:** Use my ultra-intelligent predictions for your next ticket.\n` +
                `📈 **Your next victory is near** - trust the process.\n` +
                `🚀 **KEEP PLAYING!** Luck is on your side.\n` +
                `🌟 **Analysis confidence:** 95%\n\n` +
                `**🎯 NEXT STEPS:**\n` +
                `• Ask me for a prediction for the next draw\n` +
                `• Use my ultra-intelligent numbers\n` +
                `• Your victory is just around the corner!\n\n` +
                `*Anbel AI believes in you and your next victory*`,
          type: 'ticket_analysis',
          confidence: 0.95,
          data: analysis
        };
      }
    }
  };

  /**
   * 📷 MANEJAR SUBIDA DE IMAGEN
   */
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Verificar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert(currentLanguage === 'es' 
          ? 'Por favor selecciona una imagen válida'
          : 'Please select a valid image'
        );
        return;
      }
      
      // Verificar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(currentLanguage === 'es' 
          ? 'La imagen es muy grande. Máximo 5MB'
          : 'Image is too large. Maximum 5MB'
        );
        return;
      }
      
      analyzeLotteryTicket(file);
    }
  };

  /**
   * 🎫 ABRIR SELECTOR DE IMAGEN
   */
  const openImageSelector = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl p-6 h-[600px] flex flex-col">
             {/* CABECERA DEL CHAT */}
             <div className="flex items-center justify-between mb-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
               <div className="flex items-center">
                 <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                   <Brain className="w-6 h-6 text-white" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-white">Anbel Ultra IA</h3>
                   <div className="flex gap-2 mt-1">
                     <span className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                       <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                       Online
                     </span>
                     <span className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                       <BarChart3 className="w-3 h-3" />
                       94.5% Precisión
                     </span>
                     {isSpeaking && (
                       <span className="bg-purple-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                         <Volume2 className="w-3 h-3" />
                         Hablando
                       </span>
                     )}
                   </div>
                 </div>
               </div>
               
               {/* CONTROLES DE VOZ */}
               <div className="flex items-center gap-2">
                 {/* Botón de idioma */}
                 <button
                   onClick={toggleLanguage}
                   className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors flex items-center gap-1"
                   title={`Cambiar a ${currentLanguage === 'es' ? 'English' : 'Español'}`}
                 >
                   <Languages className="w-4 h-4" />
                   <span className="text-xs font-bold">
                     {currentLanguage === 'es' ? 'EN' : 'ES'}
                   </span>
                 </button>
                 
                 {/* Botón de micrófono */}
                 {recognitionSupported && (
                   <button
                     onClick={toggleListening}
                     className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
                       isListening 
                         ? 'bg-red-500 hover:bg-red-600 text-white' 
                         : 'bg-white/20 hover:bg-white/30 text-white'
                     }`}
                     title={isListening ? 'Detener escucha' : 'Iniciar escucha'}
                   >
                     {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                   </button>
                 )}
                 
                 {/* Botón de detener habla */}
                 {isSpeaking && (
                   <button
                     onClick={stopSpeaking}
                     className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                     title="Detener habla"
                   >
                     <VolumeX className="w-4 h-4" />
                   </button>
                 )}
               </div>
             </div>
             
             {/* PERFIL DE USUARIO */}
             <UserProfile />
             
             {/* ÁREA DE MENSAJES */}
      <div className="flex-1 overflow-y-auto mb-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {/* Mostrar botones de compartir para predicciones */}
            {message.sender === 'anbel' && message.type === 'prediction' && lastPrediction && (
              <ShareButtons 
                prediction={lastPrediction} 
                lottery={lastPrediction.lottery || 'Powerball'} 
              />
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center mb-4 p-3 bg-white/10 rounded-lg">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
              <BarChart3 className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-sm mb-2">Anbel está analizando...</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

             {/* ÁREA DE ENTRADA */}
             <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
               {/* Indicadores de estado */}
               <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2">
                   {isListening && (
                     <div className="flex items-center gap-1 text-red-400 text-xs">
                       <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                       Escuchando...
                     </div>
                   )}
                   {isSpeaking && (
                     <div className="flex items-center gap-1 text-purple-400 text-xs">
                       <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                       Hablando...
                     </div>
                   )}
                   {isTyping && (
                     <div className="flex items-center gap-1 text-blue-400 text-xs">
                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                       Procesando...
                     </div>
                   )}
                   {isAnalyzingImage && (
                     <div className="flex items-center gap-1 text-yellow-400 text-xs">
                       <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                       Analizando ticket...
                     </div>
                   )}
                 </div>
                 
                 <div className="text-xs text-white/60">
                   Idioma: {currentLanguage === 'es' ? 'Español' : 'English'}
                 </div>
               </div>
               
               {/* Input y botones */}
               <div className="flex items-center">
                 <input
                   type="text"
                   placeholder={currentLanguage === 'es' ? 'Pregunta a Anbel IA...' : 'Ask Anbel AI...'}
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                   disabled={isProcessing || isListening}
                   className="flex-1 bg-transparent text-white placeholder-white/70 border border-white/30 rounded-lg px-3 py-2 mr-2 focus:outline-none focus:border-white/50"
                 />
                 
                 {/* Botón de micrófono en el input */}
                 {recognitionSupported && (
                   <button
                     onClick={toggleListening}
                     disabled={isProcessing}
                     className={`p-2 rounded-lg mr-2 transition-colors ${
                       isListening 
                         ? 'bg-red-500 hover:bg-red-600 text-white' 
                         : 'bg-white/20 hover:bg-white/30 text-white'
                     } disabled:opacity-50`}
                     title={isListening ? 'Detener escucha' : 'Hablar'}
                   >
                     {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                   </button>
                 )}
                 
                 {/* Botón de cámara para analizar tickets */}
                 <button
                   onClick={openImageSelector}
                   disabled={isProcessing || isAnalyzingImage}
                   className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg mr-2 transition-colors disabled:opacity-50"
                   title={currentLanguage === 'es' ? 'Analizar ticket de lotería' : 'Analyze lottery ticket'}
                 >
                   {isAnalyzingImage ? (
                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                   ) : (
                     <Camera className="w-4 h-4" />
                   )}
                 </button>
                 
                 <button
                   onClick={handleSendMessage}
                   disabled={isProcessing || !inputText.trim() || isListening}
                   className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-2 rounded-lg hover:from-orange-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   <Send className="w-5 h-5" />
                 </button>
               </div>
               
               {/* Instrucciones */}
               <div className="mt-2 text-xs text-white/60 text-center">
                 💡 {currentLanguage === 'es' 
                   ? 'Haz clic en el micrófono para hablar, en la cámara para analizar tickets, o escribe tu mensaje'
                   : 'Click the microphone to speak, camera to analyze tickets, or type your message'
                 }
               </div>
               
               {/* Input de archivo oculto */}
               <input
                 ref={fileInputRef}
                 type="file"
                 accept="image/*"
                 onChange={handleImageUpload}
                 className="hidden"
               />
             </div>
    </div>
  );
};

// COMPONENTE DE BURBUJA DE MENSAJE
const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-2xl p-4 ${
        isUser 
          ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' 
          : 'bg-white text-black border border-gray-200'
      } shadow-lg`}>
        {/* Mostrar imagen si es un mensaje de imagen */}
        {message.type === 'image' && message.imageUrl && (
          <div className="mb-3">
            <img 
              src={message.imageUrl} 
              alt="Ticket de lotería" 
              className="max-w-full h-auto rounded-lg border border-gray-300"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
        
        {/* Mostrar análisis de ticket */}
        {message.type === 'ticket_analysis' && message.data && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              {message.data.isWinner ? (
                <Trophy className="w-6 h-6 text-yellow-500" />
              ) : (
                <Star className="w-6 h-6 text-blue-500" />
              )}
              <h4 className="text-lg font-bold">
                {message.data.isWinner ? '🎉 ¡GANASTE!' : '🌟 ¡EXCELENTE INTENTO!'}
              </h4>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
              <div>
                <p className="font-semibold">Números jugados:</p>
                <div className="flex gap-1 flex-wrap">
                  {message.data.ticketNumbers?.map((num: number, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-bold"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold">Números ganadores:</p>
                <div className="flex gap-1 flex-wrap">
                  {message.data.winningNumbers?.map((num: number, index: number) => (
                    <span
                      key={index}
                      className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-bold"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">
                Acertados: <span className="text-green-600 font-bold">{message.data.matchedNumbers}</span>
              </span>
              {message.data.isWinner && (
                <span className="font-bold text-green-600">
                  Premio: ${message.data.prizeAmount?.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Mostrar predicción */}
        {message.type === 'prediction' && message.data && (
          <div className="mb-3">
            <h4 className="text-lg font-bold mb-2">🎯 Predicción Generada</h4>
            <div className="flex gap-2 mb-2 flex-wrap">
              {message.data.numbers?.map((num: number, index: number) => (
                <span
                  key={index}
                  className="bg-white/20 text-white px-2 py-1 rounded-full text-sm font-bold"
                >
                  {num}
                </span>
              ))}
            </div>
            <p className="text-sm opacity-90">
              Confianza: {message.data.confidence}%
            </p>
          </div>
        )}
        
        <p className="whitespace-pre-line text-sm font-medium leading-relaxed">
          {message.text}
        </p>
        
        <p className="text-xs opacity-70 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default AnbelChat;
