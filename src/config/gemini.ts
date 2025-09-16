/**
 * 🔧 CONFIGURACIÓN DE GEMINI AI
 * Configuración para la integración con Google Gemini Pro
 */

export const GEMINI_CONFIG = {
  // API Key de Gemini (configurar en variables de entorno)
  API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'demo-key',
  
  // Configuración del modelo
  MODEL: 'gemini-1.5-flash',
  
  // Configuración de generación
  TEMPERATURE: 0.7,
  MAX_TOKENS: 2048,
  TOP_P: 0.8,
  TOP_K: 10,
  
  // URLs de la API
  BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
  
  // Configuración de personalidad
  PERSONALITY: 'Anbel Ultra IA',
  
  // Conocimiento especializado
  KNOWLEDGE: 'lottery_predictions',
  
  // Configuración de fallback
  FALLBACK_ENABLED: true,
  FALLBACK_MESSAGE: 'Lo siento, no pude procesar tu solicitud en este momento. Intenta de nuevo.',
  
  // Configuración de cache
  CACHE_ENABLED: true,
  CACHE_TTL: 300000, // 5 minutos
  
  // Configuración de rate limiting
  RATE_LIMIT_ENABLED: true,
  MAX_REQUESTS_PER_MINUTE: 60,
  
  // Configuración de logging
  LOG_ENABLED: true,
  LOG_LEVEL: 'info'
};

/**
 * 🚀 Obtener configuración de Gemini
 */
export function getGeminiConfig() {
  return GEMINI_CONFIG;
}

/**
 * 🔑 Verificar si la API key está configurada
 */
export function isGeminiConfigured(): boolean {
  return GEMINI_CONFIG.API_KEY !== 'demo-key' && GEMINI_CONFIG.API_KEY.length > 0;
}

/**
 * 📊 Obtener estadísticas de configuración
 */
export function getGeminiStats() {
  return {
    configured: isGeminiConfigured(),
    model: GEMINI_CONFIG.MODEL,
    temperature: GEMINI_CONFIG.TEMPERATURE,
    maxTokens: GEMINI_CONFIG.MAX_TOKENS,
    fallbackEnabled: GEMINI_CONFIG.FALLBACK_ENABLED,
    cacheEnabled: GEMINI_CONFIG.CACHE_ENABLED
  };
}
