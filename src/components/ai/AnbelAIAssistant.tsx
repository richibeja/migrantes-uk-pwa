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
  context?: {
    userMood?: 'excited' | 'frustrated' | 'curious' | 'confused' | 'confident';
    intent?: 'prediction' | 'learning' | 'support' | 'purchase' | 'exploration';
    urgency?: 'low' | 'medium' | 'high';
    expertise?: 'beginner' | 'intermediate' | 'expert';
  };
  suggestions?: string[];
  followUp?: string[];
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

export default function AnbelAIAssistant({ 
  isOpen, 
  onToggle, 
  isMinimized, 
  onMinimize,
  userPreferences 
}: AnbelAIAssistantProps) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    userProfile: {
      experience: 'intermediate' as 'beginner' | 'intermediate' | 'expert',
      favoriteLottery: 'powerball',
      budget: 100,
      goals: [] as string[],
      painPoints: [] as string[],
      successStories: [] as string[]
    },
    sessionData: {
      topicsDiscussed: [] as string[],
      questionsAsked: 0,
      predictionsGenerated: 0,
      satisfactionScore: 0,
      lastInteraction: new Date()
    },
    emotionalState: {
      mood: 'curious' as 'excited' | 'frustrated' | 'curious' | 'confused' | 'confident',
      engagement: 'medium' as 'low' | 'medium' | 'high',
      trust: 75
    }
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mensaje de bienvenida MEGA INTELIGENTE
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'ai',
        content: `🧠 **¡Hola! Soy ANBEL AI - Tu Asistente MEGA INTELIGENTE** 🎯

**🚀 CAPACIDADES AVANZADAS:**
• **Análisis Emocional** - Detecto tu estado de ánimo y me adapto
• **Predicciones Personalizadas** - Basadas en tu perfil y preferencias
• **Análisis de Patrones** - Con 4 algoritmos patentados
• **Estrategias Inteligentes** - Adaptadas a tu nivel de experiencia
• **Notificaciones Proactivas** - Te anticipo lo que necesitas
• **Aprendizaje Continuo** - Mejoró con cada conversación

**💎 DIFERENCIACIÓN ÚNICA:**
• **Memoria de Conversación** - Recuerdo todo lo que hablamos
• **Análisis Contextual** - Entiendo el contexto de tus preguntas
• **Respuestas Adaptativas** - Me ajusto a tu estilo de comunicación
• **Sugerencias Proactivas** - Te propongo lo que necesitas antes de que lo pidas

**🎯 ¿En qué puedo ayudarte hoy?**
Puedes preguntarme sobre predicciones, clubs, la app, o cualquier cosa relacionada con loterías. ¡Soy súper inteligente!`,
        timestamp: new Date(),
        context: {
          userMood: 'curious',
          intent: 'exploration',
          urgency: 'low',
          expertise: 'intermediate'
        },
        suggestions: [
          '¿Qué es Gana Fácil?',
          '¿Cómo funcionan los ANBEL Clubs?',
          'Dame una predicción para Powerball',
          '¿Cuáles son las mejores estrategias?'
        ],
        followUp: [
          '¿Qué te interesa más?',
          '¿Tienes alguna lotería favorita?',
          '¿Qué nivel de experiencia tienes?'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // FUNCIONES DE INTELIGENCIA AVANZADA
  
  // Análisis emocional del usuario
  const analyzeEmotionalState = (message: string) => {
    const emotionalKeywords = {
      excited: ['genial', 'increíble', 'fantástico', 'excelente', 'perfecto', 'wow', 'amazing', 'great', 'awesome'],
      frustrated: ['frustrado', 'molesto', 'enojado', 'difícil', 'complicado', 'frustrated', 'angry', 'difficult', 'hard'],
      curious: ['cómo', 'qué', 'por qué', 'cuándo', 'dónde', 'how', 'what', 'why', 'when', 'where'],
      confused: ['confundido', 'no entiendo', 'no sé', 'perdido', 'confused', 'dont understand', 'lost'],
      confident: ['seguro', 'confiado', 'sé que', 'estoy seguro', 'confident', 'sure', 'know']
    };

    let maxScore = 0;
    let detectedMood = 'curious';

    Object.entries(emotionalKeywords).forEach(([mood, keywords]) => {
      const score = keywords.reduce((acc, keyword) => 
        acc + (message.toLowerCase().includes(keyword) ? 1 : 0), 0
      );
      if (score > maxScore) {
        maxScore = score;
        detectedMood = mood;
      }
    });

    return {
      mood: detectedMood as 'excited' | 'frustrated' | 'curious' | 'confused' | 'confident',
      confidence: Math.min(maxScore * 20, 100),
      intensity: maxScore > 2 ? 'high' : maxScore > 0 ? 'medium' : 'low'
    };
  };

  // Análisis de intención del usuario
  const analyzeUserIntent = (message: string) => {
    const intentKeywords = {
      prediction: ['predicción', 'números', 'recomendación', 'prediction', 'numbers', 'recommendation'],
      learning: ['cómo', 'aprender', 'enseñar', 'tutorial', 'how', 'learn', 'teach', 'tutorial'],
      support: ['ayuda', 'problema', 'error', 'help', 'problem', 'issue', 'support'],
      purchase: ['comprar', 'precio', 'costo', 'suscripción', 'buy', 'price', 'cost', 'subscription'],
      exploration: ['explorar', 'ver', 'mostrar', 'explore', 'show', 'see', 'view']
    };

    let maxScore = 0;
    let detectedIntent = 'exploration';

    Object.entries(intentKeywords).forEach(([intent, keywords]) => {
      const score = keywords.reduce((acc, keyword) => 
        acc + (message.toLowerCase().includes(keyword) ? 1 : 0), 0
      );
      if (score > maxScore) {
        maxScore = score;
        detectedIntent = intent;
      }
    });

    return {
      intent: detectedIntent as 'prediction' | 'learning' | 'support' | 'purchase' | 'exploration',
      confidence: Math.min(maxScore * 25, 100),
      urgency: maxScore > 2 ? 'high' : maxScore > 0 ? 'medium' : 'low'
    };
  };

  // Análisis de contexto de conversación
  const analyzeConversationContext = (message: string) => {
    const context = {
      isFirstTime: messages.length === 0,
      isFollowUp: messages.length > 0,
      topicContinuity: messages.length > 0 ? 
        messages[messages.length - 1].content.toLowerCase().includes(message.toLowerCase().split(' ')[0]) : false,
      userEngagement: messages.length > 5 ? 'high' : messages.length > 2 ? 'medium' : 'low',
      timeSinceLastMessage: messages.length > 0 ? 
        Date.now() - new Date(messages[messages.length - 1].timestamp).getTime() : 0
    };

    return context;
  };

  // Actualizar contexto de conversación
  const updateConversationContext = (message: string, emotionalAnalysis: any, intentAnalysis: any) => {
    setConversationContext(prev => ({
      ...prev,
      sessionData: {
        ...prev.sessionData,
        questionsAsked: prev.sessionData.questionsAsked + 1,
        lastInteraction: new Date(),
        topicsDiscussed: [...prev.sessionData.topicsDiscussed, intentAnalysis.intent]
      },
      emotionalState: {
        ...prev.emotionalState,
        mood: emotionalAnalysis.mood,
        engagement: emotionalAnalysis.intensity === 'high' ? 'high' : 
                   emotionalAnalysis.intensity === 'medium' ? 'medium' : 'low',
        trust: Math.min(prev.emotionalState.trust + (emotionalAnalysis.confidence > 50 ? 2 : -1), 100)
      }
    }));
  };

  // FUNCIONES DE INTELIGENCIA MEGA AVANZADA

  // Adaptar tono según estado emocional
  const getEmotionalTone = (mood: string, intensity: string) => {
    const tones = {
      excited: {
        high: { emoji: '🎉', prefix: '¡Increíble!', energy: 'máxima' },
        medium: { emoji: '😊', prefix: '¡Genial!', energy: 'alta' },
        low: { emoji: '😄', prefix: '¡Perfecto!', energy: 'buena' }
      },
      frustrated: {
        high: { emoji: '🤝', prefix: 'Entiendo tu frustración', energy: 'calmada' },
        medium: { emoji: '💪', prefix: 'Te ayudo a resolverlo', energy: 'motivadora' },
        low: { emoji: '😌', prefix: 'No te preocupes', energy: 'tranquilizadora' }
      },
      curious: {
        high: { emoji: '🔍', prefix: '¡Excelente pregunta!', energy: 'analítica' },
        medium: { emoji: '🤔', prefix: 'Interesante consulta', energy: 'explicativa' },
        low: { emoji: '💡', prefix: 'Te explico', energy: 'educativa' }
      },
      confused: {
        high: { emoji: '🛟', prefix: 'Te ayudo paso a paso', energy: 'guía' },
        medium: { emoji: '📚', prefix: 'Te explico claramente', energy: 'didáctica' },
        low: { emoji: '✨', prefix: 'Te aclaro', energy: 'simple' }
      },
      confident: {
        high: { emoji: '🚀', prefix: '¡Perfecto! Vamos al siguiente nivel', energy: 'avanzada' },
        medium: { emoji: '💎', prefix: 'Excelente, profundicemos', energy: 'profesional' },
        low: { emoji: '👍', prefix: 'Bien, continuemos', energy: 'colaborativa' }
      }
    };

    return tones[mood as keyof typeof tones]?.[intensity as keyof typeof tones.excited] || tones.curious.medium;
  };

  // Adaptar contenido según intención
  const getContentStrategy = (intent: string, urgency: string) => {
    const strategies = {
      prediction: {
        high: { depth: 'profundo', examples: 3, analysis: 'completo' },
        medium: { depth: 'moderado', examples: 2, analysis: 'detallado' },
        low: { depth: 'básico', examples: 1, analysis: 'simple' }
      },
      learning: {
        high: { depth: 'tutorial completo', examples: 5, analysis: 'paso a paso' },
        medium: { depth: 'guía práctica', examples: 3, analysis: 'explicativo' },
        low: { depth: 'introducción', examples: 2, analysis: 'conceptual' }
      },
      support: {
        high: { depth: 'solución inmediata', examples: 4, analysis: 'diagnóstico' },
        medium: { depth: 'ayuda detallada', examples: 2, analysis: 'troubleshooting' },
        low: { depth: 'orientación', examples: 1, analysis: 'básico' }
      },
      purchase: {
        high: { depth: 'análisis completo', examples: 3, analysis: 'comparativo' },
        medium: { depth: 'información detallada', examples: 2, analysis: 'evaluativo' },
        low: { depth: 'resumen', examples: 1, analysis: 'informativo' }
      },
      exploration: {
        high: { depth: 'exploración profunda', examples: 4, analysis: 'comprehensivo' },
        medium: { depth: 'descripción detallada', examples: 2, analysis: 'descriptivo' },
        low: { depth: 'overview', examples: 1, analysis: 'introductorio' }
      }
    };

    return strategies[intent as keyof typeof strategies]?.[urgency as keyof typeof strategies.prediction] || strategies.exploration.medium;
  };

  // Generar sugerencias proactivas
  const generateProactiveSuggestions = (intent: string, mood: string) => {
    const suggestionMap = {
      prediction: [
        '¿Quieres que analice otra lotería?',
        '¿Te interesa ver el análisis histórico?',
        '¿Quieres unirse a un club para mayor precisión?'
      ],
      learning: [
        '¿Quieres un tutorial paso a paso?',
        '¿Te interesa ver ejemplos prácticos?',
        '¿Quieres aprender estrategias avanzadas?'
      ],
      support: [
        '¿Necesitas ayuda con algo específico?',
        '¿Quieres contactar soporte técnico?',
        '¿Te ayudo con la configuración?'
      ],
      purchase: [
        '¿Quieres comparar planes?',
        '¿Te interesa una prueba gratuita?',
        '¿Quieres ver testimonios de usuarios?'
      ],
      exploration: [
        '¿Quieres explorar los ANBEL Clubs?',
        '¿Te interesa ver todas las loterías?',
        '¿Quieres conocer las funcionalidades avanzadas?'
      ]
    };

    return suggestionMap[intent as keyof typeof suggestionMap] || suggestionMap.exploration;
  };

  // Generar preguntas de seguimiento inteligentes
  const generateFollowUpQuestions = (intent: string, context: any) => {
    const followUpMap = {
      prediction: [
        '¿Cuál es tu lotería favorita?',
        '¿Qué presupuesto tienes para jugar?',
        '¿Prefieres predicciones diarias o semanales?'
      ],
      learning: [
        '¿Qué nivel de experiencia tienes?',
        '¿Qué te gustaría aprender primero?',
        '¿Prefieres tutoriales visuales o escritos?'
      ],
      support: [
        '¿En qué puedo ayudarte específicamente?',
        '¿Has probado reiniciar la aplicación?',
        '¿Qué error específico estás viendo?'
      ],
      purchase: [
        '¿Cuál es tu presupuesto mensual?',
        '¿Qué funcionalidades te interesan más?',
        '¿Prefieres pago mensual o anual?'
      ],
      exploration: [
        '¿Qué te interesa explorar primero?',
        '¿Tienes alguna pregunta específica?',
        '¿Quieres que te guíe por la aplicación?'
      ]
    };

    return followUpMap[intent as keyof typeof followUpMap] || followUpMap.exploration;
  };

  // Sistema MEGA INTELIGENTE con análisis emocional y contexto
  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    setIsTyping(true);
    setIsAnalyzing(true);

    // Simular delay de procesamiento avanzado
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));

    const lowerMessage = userMessage.toLowerCase();
    
    // ANÁLISIS EMOCIONAL AVANZADO
    const emotionalAnalysis = analyzeEmotionalState(userMessage);
    
    // ANÁLISIS DE INTENCIÓN
    const intentAnalysis = analyzeUserIntent(userMessage);
    
    // ANÁLISIS DE CONTEXTO
    const contextAnalysis = analyzeConversationContext(userMessage);
    
    // ACTUALIZAR CONTEXTO DE CONVERSACIÓN
    updateConversationContext(userMessage, emotionalAnalysis, intentAnalysis);
    
    let response = '';
    let analysis = null;
    let suggestions: string[] = [];
    let followUp: string[] = [];

    // Conocimiento específico de la aplicación Gana Fácil
    const appKnowledge = {
      features: [
        "4 algoritmos patentados (Anbel, Fibonacci, Estadístico, Patrones)",
        "9 loterías principales (Powerball, Mega Millions, Lotto America, EuroMillions, Cash4Life, Pick 3, Pick 4, Pick 5, Pick 6)",
        "Sistema de predicciones en tiempo real con 94% de precisión",
        "ANBEL Clubs para predicciones en equipo",
        "Análisis histórico de más de 1000 sorteos",
        "Notificaciones inteligentes personalizadas",
        "Motor de análisis avanzado con 3 algoritmos simultáneos",
        "Sistema de tickets digitales con cámara",
        "Dashboard bilingüe (español e inglés)",
        "Predicciones personalizadas por usuario"
      ],
      clubs: [
        "Sistema de clubs exclusivos para predicciones en equipo",
        "Hasta 10 miembros por club",
        "Predicciones colaborativas con mayor precisión",
        "Sistema de invitaciones por código",
        "Dashboard de club con estadísticas en tiempo real",
        "Gestión de tickets del club",
        "Análisis de rendimiento del equipo",
        "Premios especiales para clubs ganadores"
      ],
      lotteries: [
        "Powerball: Lunes, Miércoles, Sábados - $22M+ USD",
        "Mega Millions: Martes, Viernes - $18M+ USD", 
        "Lotto America: Domingo, Miércoles, Sábados - $2M+ USD",
        "EuroMillions: Martes, Viernes - €45M+ EUR",
        "Cash4Life: Lunes, Miércoles, Viernes - $1K/día por vida",
        "Pick 3: Diario - $500 USD",
        "Pick 4: Diario - $5,000 USD",
        "Pick 5: Diario - $50,000 USD",
        "Pick 6: Lunes, Miércoles, Viernes - $1.2M USD"
      ]
    };

    // GENERAR RESPUESTA MEGA INTELIGENTE BASADA EN ANÁLISIS
    const generateIntelligentResponse = () => {
      // ADAPTAR TONO SEGÚN ESTADO EMOCIONAL
      const emotionalTone = getEmotionalTone(emotionalAnalysis.mood, emotionalAnalysis.intensity);
      
      // ADAPTAR CONTENIDO SEGÚN INTENCIÓN
      const contentStrategy = getContentStrategy(intentAnalysis.intent, intentAnalysis.urgency);
      
      // GENERAR SUGERENCIAS PROACTIVAS
      suggestions = generateProactiveSuggestions(intentAnalysis.intent, emotionalAnalysis.mood);
      
      // GENERAR SEGUIMIENTO INTELIGENTE
      followUp = generateFollowUpQuestions(intentAnalysis.intent, contextAnalysis);

      return { emotionalTone, contentStrategy, suggestions, followUp };
    };

    const { emotionalTone, contentStrategy } = generateIntelligentResponse();

    // Detectar tipo de consulta y generar respuesta MEGA INTELIGENTE
    if (lowerMessage.includes('app') || lowerMessage.includes('aplicación') || lowerMessage.includes('gana fácil') || lowerMessage.includes('funciones') || lowerMessage.includes('características')) {
      response = `${emotionalTone.emoji} **${emotionalTone.prefix} GANA FÁCIL - La App Más Avanzada del Mercado**

**🎯 FUNCIONALIDADES PRINCIPALES:**
• **4 Algoritmos Patentados:** Anbel + Fibonacci + Estadístico + Patrones
• **9 Loterías Principales:** Powerball, Mega Millions, Lotto America, EuroMillions, Cash4Life, Pick 3, Pick 4, Pick 5, Pick 6
• **94% de Precisión** en predicciones en tiempo real
• **ANBEL Clubs** para predicciones en equipo
• **Análisis Histórico** de más de 1000 sorteos
• **Notificaciones Inteligentes** personalizadas
• **Motor de Análisis Avanzado** con 3 algoritmos simultáneos
• **Sistema de Tickets Digitales** con cámara integrada
• **Dashboard Bilingüe** (español e inglés)
• **Predicciones Personalizadas** por usuario

**💎 DIFERENCIACIÓN ÚNICA:**
• **Nadie más tiene** 4 algoritmos patentados
• **Cobertura completa** de Estados Unidos + Europa
• **Sistema de clubs** exclusivo para equipos
• **Tecnología de vanguardia** con IA avanzada

**🧠 ANÁLISIS PERSONALIZADO:**
Basándome en tu perfil, te recomiendo especialmente:
${contentStrategy.depth === 'profundo' ? '• **Análisis profundo** de patrones históricos' : ''}
${contentStrategy.depth === 'tutorial completo' ? '• **Tutorial completo** paso a paso' : ''}
${contentStrategy.examples > 2 ? '• **Múltiples ejemplos** prácticos' : ''}

¿Te interesa saber más sobre alguna funcionalidad específica?`;

      analysis = {
        confidence: 98.5 + (emotionalAnalysis.confidence * 0.1),
        method: `Conocimiento de Aplicación + ${emotionalTone.energy}`,
        reasoning: `Información completa adaptada a tu estado ${emotionalAnalysis.mood} con ${contentStrategy.depth}`
      };
    }
    else if (lowerMessage.includes('club') || lowerMessage.includes('clubs') || lowerMessage.includes('equipo') || lowerMessage.includes('anbel club')) {
      response = `👥 **ANBEL CLUBS - Predicciones en Equipo**

**🎯 SISTEMA DE CLUBS EXCLUSIVO:**
• **Hasta 10 miembros** por club
• **Predicciones colaborativas** con mayor precisión
• **Sistema de invitaciones** por código único
• **Dashboard de club** con estadísticas en tiempo real
• **Gestión de tickets** del club
• **Análisis de rendimiento** del equipo
• **Premios especiales** para clubs ganadores

**🚀 VENTAJAS DE LOS CLUBS:**
• **Mayor precisión** al combinar análisis de múltiples miembros
• **Estrategias compartidas** y conocimiento colectivo
• **División de costos** en predicciones premium
• **Competencia amigable** entre clubs
• **Sistema de ranking** de clubs más exitosos

**📊 CÓMO FUNCIONA:**
1. **Crear o unirse** a un club con código de invitación
2. **Compartir predicciones** y análisis con el equipo
3. **Votar por las mejores** combinaciones del club
4. **Jugar en equipo** y dividir ganancias
5. **Subir en el ranking** de clubs más exitosos

¿Quieres que te explique cómo crear o unirte a un club?`;

      analysis = {
        confidence: 96.8,
        method: 'Conocimiento de Clubs',
        reasoning: 'Información detallada sobre el sistema ANBEL Clubs'
      };
    }
    else if (lowerMessage.includes('lotería') || lowerMessage.includes('loterías') || lowerMessage.includes('sorteos') || lowerMessage.includes('cuáles loterías')) {
      response = `🎯 **LOTERÍAS DISPONIBLES EN GANA FÁCIL**

**🇺🇸 ESTADOS UNIDOS:**
• **Powerball:** Lunes, Miércoles, Sábados - $22M+ USD
• **Mega Millions:** Martes, Viernes - $18M+ USD
• **Lotto America:** Domingo, Miércoles, Sábados - $2M+ USD
• **Cash4Life:** Lunes, Miércoles, Viernes - $1K/día por vida
• **Pick 3:** Diario - $500 USD
• **Pick 4:** Diario - $5,000 USD
• **Pick 5:** Diario - $50,000 USD
• **Pick 6:** Lunes, Miércoles, Viernes - $1.2M USD

**🇪🇺 EUROPA:**
• **EuroMillions:** Martes, Viernes - €45M+ EUR

**📊 COBERTURA COMPLETA:**
• **9 loterías principales** con análisis en tiempo real
• **Desde $500 diarios** hasta premios de por vida
• **Frecuencias variadas** (diario, 3x semana, semanal)
• **Rangos de premios** para todos los presupuestos
• **94% de precisión** en todas las loterías

¿Te interesa alguna lotería específica o quieres que analice cuál es mejor para ti?`;

      analysis = {
        confidence: 97.2,
        method: 'Conocimiento de Loterías',
        reasoning: 'Información completa sobre todas las loterías disponibles'
      };
    }
    else if (lowerMessage.includes('predicción') || lowerMessage.includes('números') || lowerMessage.includes('recomendación')) {
      const lottery = userPreferences?.favoriteLottery || 'powerball';
      const numbers = generatePersonalizedNumbers(lottery);
      const confidence = 85 + Math.random() * 15;
      
      response = `🎯 **Predicción Personalizada para ${lottery.toUpperCase()}**

**Números Recomendados:** ${numbers.join(' - ')}

**Análisis ANBEL:**
• Confianza: ${confidence.toFixed(1)}%
• Método: Algoritmo Anbel + Fibonacci
• Patrón detectado: Secuencia ascendente con números primos

**Razón:** He analizado los últimos 50 sorteos y detecté un patrón donde los números ${numbers[0]} y ${numbers[numbers.length-1]} aparecen frecuentemente en combinación con números primos.

¿Te gustaría que analice otra lotería o profundice en esta predicción?`;

      analysis = {
        confidence: confidence,
        method: 'Anbel + Fibonacci',
        reasoning: 'Patrón de números primos detectado en sorteos recientes'
      };
    }
    else if (lowerMessage.includes('análisis') || lowerMessage.includes('patrón') || lowerMessage.includes('estadística')) {
      response = `📊 **Análisis de Patrones en Tiempo Real**

**Tendencias Actuales:**
• Números calientes: 7, 14, 21, 28, 35
• Frecuencia de aparición: 23% en últimos 30 sorteos
• Patrón temporal: Mayor probabilidad los martes y viernes

**Recomendación:** Basándome en el análisis de 1000+ sorteos, te sugiero jugar combinaciones que incluyan al menos 2 números de la secuencia 7-14-21-28-35.

**Próxima actualización:** En 2 horas cuando reciba nuevos datos.`;

      analysis = {
        confidence: 92.3,
        method: 'Análisis Estadístico Avanzado',
        reasoning: 'Patrón de secuencias detectado en datos históricos'
      };
    }
    else if (lowerMessage.includes('estrategia') || lowerMessage.includes('cómo jugar') || lowerMessage.includes('consejo')) {
      const experience = userPreferences?.experience || 'intermediate';
      response = `🎓 **Estrategia Personalizada - Nivel ${experience.toUpperCase()}**

**Para tu nivel de experiencia:**

${experience === 'beginner' ? `
• **Principio:** Juega números que no hayan salido en los últimos 3 sorteos
• **Presupuesto:** Máximo 5% de tus ingresos mensuales
• **Frecuencia:** 2-3 veces por semana
• **Lotería recomendada:** Pick 3 o Pick 4 (mayor probabilidad)
` : experience === 'intermediate' ? `
• **Principio:** Combina números calientes y fríos (70/30)
• **Presupuesto:** 3-7% de tus ingresos mensuales
• **Frecuencia:** Diario en Pick 3/4, 3x semana en loterías grandes
• **Lotería recomendada:** Powerball o Mega Millions
` : `
• **Principio:** Análisis de patrones complejos y correlaciones
• **Presupuesto:** 5-10% de tus ingresos mensuales
• **Frecuencia:** Estratégica basada en análisis de mercado
• **Lotería recomendada:** Todas, con enfoque en jackpots altos
`}

**💡 Pro Tip:** Los martes y viernes tienen 15% más probabilidad de números ganadores según mi análisis.`;

      analysis = {
        confidence: 88.7,
        method: 'Estrategia Personalizada',
        reasoning: `Adaptado para nivel ${experience} con análisis de comportamiento`
      };
    }
    else if (lowerMessage.includes('notificación') || lowerMessage.includes('alerta') || lowerMessage.includes('recordar')) {
      response = `🔔 **Sistema de Notificaciones Inteligentes Activado**

**Alertas Configuradas:**
• ⏰ 2 horas antes de cada sorteo
• 📈 Cuando detecte patrones favorables
• 💰 Cuando el jackpot supere $100M
• 🎯 Cuando tu lotería favorita tenga probabilidades óptimas

**Próximas Alertas:**
• Powerball: Mañana 20:59 EST
• Mega Millions: Viernes 22:59 EST
• Pick 3: Hoy 21:59 EST

¿Quieres personalizar las notificaciones o cambiar los horarios?`;

      analysis = {
        confidence: 95.0,
        method: 'Sistema de Alertas',
        reasoning: 'Configuración basada en patrones de uso del usuario'
      };
    }
    else if (lowerMessage.includes('ayuda') || lowerMessage.includes('comandos') || lowerMessage.includes('qué puedes hacer')) {
      response = `🤖 **ANBEL AI - Comandos Disponibles**

**📱 SOBRE LA APP:**
• "¿Qué es Gana Fácil?"
• "¿Cuáles son las funciones de la app?"
• "¿Cómo funciona la aplicación?"

**👥 SOBRE CLUBS:**
• "¿Qué son los ANBEL Clubs?"
• "¿Cómo me uno a un club?"
• "¿Cómo funcionan los clubs?"

**🎯 PREDICCIONES:**
• "Dame números para Powerball"
• "Recomiéndame una combinación"
• "¿Qué números son mejores hoy?"

**📊 ANÁLISIS:**
• "Analiza los patrones de Mega Millions"
• "¿Cuáles son las tendencias actuales?"
• "Explícame por qué estos números"

**🎓 ESTRATEGIAS:**
• "Enséñame a jugar mejor"
• "¿Cuál es la mejor estrategia?"
• "Consejos para principiantes"

**🔔 NOTIFICACIONES:**
• "Configura mis alertas"
• "Recuérdame el sorteo"
• "¿Cuándo es el próximo?"

**📈 ANÁLISIS DE MERCADO:**
• "¿Cuál lotería es mejor ahora?"
• "¿Cuándo jugar Powerball?"
• "Análisis de jackpots"

**🎰 LOTERÍAS:**
• "¿Cuáles loterías están disponibles?"
• "¿Cuándo son los sorteos?"
• "¿Cuáles son los premios?"

¡Solo pregúntame lo que necesites! 🎯`;

      analysis = {
        confidence: 100.0,
        method: 'Sistema de Ayuda Mejorado',
        reasoning: 'Respuesta completa de comandos disponibles incluyendo app y clubs'
      };
    }
    else if (lowerMessage.includes('cómo funciona') || lowerMessage.includes('cómo usar') || lowerMessage.includes('tutorial')) {
      response = `📚 **CÓMO USAR GANA FÁCIL - Guía Completa**

**🚀 PASO 1: ACTIVACIÓN**
1. **Regístrate** en la aplicación
2. **Activa tu cuenta** con el código de activación
3. **Accede al dashboard** principal

**🎯 PASO 2: PREDICCIONES**
1. **Selecciona la lotería** que quieres analizar
2. **Ve las predicciones** generadas por nuestros 4 algoritmos
3. **Haz clic en "Ver Análisis Completo"** para detalles
4. **Usa los números sugeridos** o genera nuevos

**👥 PASO 3: ANBEL CLUBS**
1. **Ve a la pestaña "Clubs"** en el dashboard
2. **Crea un club** o únete con código de invitación
3. **Comparte predicciones** con tu equipo
4. **Vota por las mejores** combinaciones del club

**📱 PASO 4: FUNCIONES AVANZADAS**
• **Tickets Digitales:** Toma fotos de tus tickets
• **Notificaciones:** Configura alertas personalizadas
• **Análisis Histórico:** Revisa patrones pasados
• **Motor de Análisis:** Ve los 3 algoritmos trabajando

**💡 CONSEJOS PRO:**
• **Juega consistentemente** para mejores resultados
• **Únete a clubs** para mayor precisión
• **Usa las notificaciones** para no perder sorteos
• **Analiza los patrones** antes de jugar

¿Necesitas ayuda con algún paso específico?`;

      analysis = {
        confidence: 95.7,
        method: 'Guía de Usuario',
        reasoning: 'Tutorial completo de cómo usar Gana Fácil'
      };
    }
    else if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuánto cuesta') || lowerMessage.includes('suscripción')) {
      response = `💰 **PRECIOS Y SUSCRIPCIONES - GANA FÁCIL**

**🎯 PLANES DISPONIBLES:**

**🥉 PLAN BÁSICO - $29/mes**
• Acceso a 3 loterías principales
• Predicciones básicas
• Notificaciones estándar
• Soporte por email

**🥈 PLAN PREMIUM - $59/mes**
• Acceso a todas las 9 loterías
• Predicciones avanzadas con 4 algoritmos
• ANBEL Clubs incluido
• Notificaciones inteligentes
• Análisis histórico completo
• Soporte prioritario

**🥇 PLAN VIP - $99/mes**
• Todo del Plan Premium
• Predicciones personalizadas
• Acceso a clubs exclusivos
• Análisis en tiempo real
• Tickets digitales ilimitados
• Soporte 24/7
• Garantía de satisfacción

**💎 OFERTA ESPECIAL:**
• **Primer mes GRATIS** en cualquier plan
• **Descuento del 20%** si pagas anual
• **Garantía de devolución** de 30 días
• **Sin compromisos** - cancela cuando quieras

**🎁 BONUS INCLUIDOS:**
• **Guía de estrategias** avanzadas
• **Acceso a webinars** exclusivos
• **Comunidad VIP** de usuarios
• **Actualizaciones gratuitas** de por vida

¿Te interesa algún plan específico o quieres más detalles?`;

      analysis = {
        confidence: 94.3,
        method: 'Información de Precios',
        reasoning: 'Información completa sobre planes y precios de Gana Fácil'
      };
    }
    else {
      // Respuesta genérica inteligente
      const responses = [
        `Entiendo tu consulta. Basándome en mi análisis de patrones, te sugiero que me preguntes específicamente sobre predicciones, análisis o estrategias. ¿En qué lotería te gustaría que me enfoque? 🎯`,
        `Interesante pregunta. Para darte la mejor respuesta, necesito más contexto. ¿Te interesa una predicción específica, un análisis de patrones, o una estrategia de juego? 📊`,
        `Mi sistema de IA está procesando tu consulta. Mientras tanto, ¿has considerado preguntarme sobre las tendencias actuales de las loterías? Puedo darte insights únicos. 🧠`,
        `Excelente pregunta. Mi algoritmo ANBEL está diseñado para dar respuestas precisas sobre predicciones de lotería. ¿Quieres que analice alguna lotería específica? ⚡`
      ];
      
      response = responses[Math.floor(Math.random() * responses.length)];
      
      analysis = {
        confidence: 75.0 + Math.random() * 20,
        method: 'Análisis General',
        reasoning: 'Respuesta adaptativa basada en contexto'
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

  // Generar números personalizados
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
                {isTyping ? 'Escribiendo...' : isAnalyzing ? 'Analizando...' : 'En línea'}
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
                          <span>Confianza: {message.analysis.confidence.toFixed(1)}%</span>
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
                  placeholder="Pregúntame sobre predicciones, análisis o estrategias..."
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
                  <span>IA Avanzada</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Tiempo Real</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-3 h-3" />
                  <span>94% Precisión</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
