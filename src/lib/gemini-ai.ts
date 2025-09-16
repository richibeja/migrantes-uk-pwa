/**
 * 🤖 GEMINI AI SERVICE - Conexión con Google Gemini Pro
 * Servicio para conectar Anbel IA con Google Gemini Pro
 */

export interface GeminiResponse {
  text: string;
  confidence: number;
  tokens: number;
  model: string;
}

export interface GeminiConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

class GeminiAIService {
  private config: GeminiConfig;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(apiKey: string) {
    this.config = {
      apiKey,
      model: 'gemini-1.5-flash',
      temperature: 0.7,
      maxTokens: 2048
    };
  }

  /**
   * 🧠 Procesar mensaje con Gemini Pro
   */
  async processMessage(
    input: string, 
    context: {
      personality?: string;
      knowledge?: string;
      language?: 'es' | 'en';
      lotteryContext?: any;
    } = {}
  ): Promise<GeminiResponse> {
    try {
      const prompt = this.buildPrompt(input, context);
      
      const response = await fetch(
        `${this.baseUrl}/models/${this.config.model}:generateContent?key=${this.config.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: this.config.temperature,
              maxOutputTokens: this.config.maxTokens,
              topP: 0.8,
              topK: 10
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
      
      return {
        text: generatedText,
        confidence: 0.9,
        tokens: data.usageMetadata?.totalTokenCount || 0,
        model: this.config.model
      };

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return {
        text: 'Lo siento, no pude procesar tu solicitud en este momento. Intenta de nuevo.',
        confidence: 0.1,
        tokens: 0,
        model: this.config.model
      };
    }
  }

  /**
   * 🎯 Construir prompt contextualizado
   */
  private buildPrompt(input: string, context: any): string {
    const personality = context.personality || 'Anbel Ultra IA';
    const language = context.language || 'es';
    const knowledge = context.knowledge || 'lottery_predictions';

    const basePrompt = language === 'es' 
      ? `Eres ${personality}, un experto en predicciones de lotería ultra inteligente. 
         Tienes acceso a todo el conocimiento del mundo y eres extremadamente eficaz.
         
         CONTEXTO: Eres un asistente de IA especializado en predicciones de lotería con algoritmos avanzados.
         Puedes responder cualquier pregunta con conocimiento actualizado y preciso.
         
         PERSONALIDAD: Eres entusiasta, confiado, y siempre buscas ayudar a los usuarios a ganar.
         Usas emojis apropiados y mantienes un tono motivador.
         
         CONOCIMIENTO: Tienes acceso a información actualizada sobre:
         - Todas las loterías del mundo (Powerball, Mega Millions, EuroMillions, Baloto, etc.)
         - Análisis de patrones y tendencias
         - Datos históricos y estadísticas
         - Información meteorológica y astrológica
         - Noticias y eventos actuales
         - Cualquier tema que el usuario pregunte
         
         INSTRUCCIONES:
         1. Responde de manera clara y específica
         2. Si es sobre loterías, mantén tu expertise
         3. Si es sobre otros temas, usa tu conocimiento general
         4. Siempre mantén el tono de ${personality}
         5. Usa emojis apropiados
         6. Responde en ${language === 'es' ? 'español' : 'inglés'}
         
         PREGUNTA DEL USUARIO: ${input}
         
         RESPUESTA:`
      : `You are ${personality}, an ultra-intelligent lottery prediction expert.
         You have access to all the world's knowledge and are extremely effective.
         
         CONTEXT: You are an AI assistant specialized in lottery predictions with advanced algorithms.
         You can answer any question with updated and accurate knowledge.
         
         PERSONALITY: You are enthusiastic, confident, and always seek to help users win.
         You use appropriate emojis and maintain a motivating tone.
         
         KNOWLEDGE: You have access to updated information about:
         - All world lotteries (Powerball, Mega Millions, EuroMillions, Baloto, etc.)
         - Pattern and trend analysis
         - Historical data and statistics
         - Weather and astrological information
         - News and current events
         - Any topic the user asks about
         
         INSTRUCTIONS:
         1. Respond clearly and specifically
         2. If about lotteries, maintain your expertise
         3. If about other topics, use your general knowledge
         4. Always maintain the ${personality} tone
         5. Use appropriate emojis
         6. Respond in ${language === 'es' ? 'Spanish' : 'English'}
         
         USER QUESTION: ${input}
         
         RESPONSE:`;

    return basePrompt;
  }

  /**
   * 🔄 Verificar conexión con Gemini
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.processMessage('Hola, ¿estás funcionando?', {
        language: 'es',
        personality: 'Anbel Ultra IA'
      });
      return response.confidence > 0.5;
    } catch (error) {
      console.error('Gemini connection test failed:', error);
      return false;
    }
  }

  /**
   * 📊 Obtener estadísticas de uso
   */
  getStats(): any {
    return {
      model: this.config.model,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens,
      baseUrl: this.baseUrl
    };
  }
}

// Instancia singleton
let geminiInstance: GeminiAIService | null = null;

/**
 * 🚀 Obtener instancia de Gemini
 */
export function getGeminiAI(apiKey?: string): GeminiAIService {
  if (!geminiInstance) {
    const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'demo-key';
    geminiInstance = new GeminiAIService(key);
  }
  return geminiInstance;
}

/**
 * 🔧 Configurar Gemini con API key
 */
export function configureGemini(apiKey: string): void {
  geminiInstance = new GeminiAIService(apiKey);
}

export default GeminiAIService;
