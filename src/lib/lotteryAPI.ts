import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { es, enUS } from 'date-fns/locale';

export interface LotteryResult {
  id: string;
  lotteryId: string;
  lotteryName: string;
  drawDate: string;
  drawNumber: string;
  numbers: number[];
  bonusNumbers?: number[];
  jackpot?: string;
  currency?: string;
  nextDraw?: string;
  isActive: boolean;
  source: string;
  lastUpdated: string;
}

export interface LotteryAPIResponse {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

export class LotteryAPI {
  private baseURLs: { [key: string]: string };
  private apiKeys: { [key: string]: string };
  private cache: Map<string, { data: any; timestamp: number }>;
  private cacheTimeout: number = 5 * 60 * 1000; // 5 minutos

  constructor() {
    this.baseURLs = {
      // APIs oficiales de loterías
      'baloto': 'https://www.baloto.com/api',
      'lotto-uk': 'https://www.national-lottery.co.uk/api',
      'euromillions-uk': 'https://www.national-lottery.co.uk/api',
      'euromillones': 'https://www.euromillones.com/api',
      'primitiva': 'https://www.loteriasyapuestas.es/api',
      'bonoloto': 'https://www.loteriasyapuestas.es/api',
      'powerball': 'https://www.powerball.com/api',
      'mega-millions': 'https://www.megamillions.com/api',
      'florida-lotto': 'https://www.flalottery.com/api'
    };

    // API Keys para servicios alternativos (cuando las APIs oficiales no estén disponibles)
    this.apiKeys = {
      'lottery-api': process.env.NEXT_PUBLIC_LOTTERY_API_KEY || '',
      'rapidapi': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
      'alternative': process.env.NEXT_PUBLIC_ALTERNATIVE_API_KEY || ''
    };

    this.cache = new Map();
  }

  /**
   * Obtiene los resultados más recientes de una lotería específica
   */
  async getLatestResults(lotteryId: string): Promise<LotteryResult | null> {
    try {
      // Verificar caché primero
      const cached = this.getFromCache(lotteryId);
      if (cached) {
        return cached;
      }

      // En desarrollo, usar directamente datos simulados para evitar CORS
      if (process.env.NODE_ENV === 'development') {
        const result = await this.getSimulatedResults(lotteryId);
        if (result) {
          this.setCache(lotteryId, result);
          return result;
        }
      }

      // Intentar obtener de la API oficial solo en producción
      let result = await this.fetchFromOfficialAPI(lotteryId);
      
      // Si falla, usar API alternativa
      if (!result) {
        result = await this.fetchFromAlternativeAPI(lotteryId);
      }

      // Si aún no hay resultado, usar datos simulados como fallback
      if (!result) {
        result = await this.getSimulatedResults(lotteryId);
      }

      if (result) {
        this.setCache(lotteryId, result);
        return result;
      }

      return null;
    } catch (error) {
      console.error(`Error obteniendo resultados para ${lotteryId}:`, error);
      return await this.getSimulatedResults(lotteryId);
    }
  }

  /**
   * Obtiene resultados de múltiples loterías
   */
  async getMultipleResults(lotteryIds: string[]): Promise<LotteryResult[]> {
    const results: LotteryResult[] = [];
    
    for (const lotteryId of lotteryIds) {
      try {
        const result = await this.getLatestResults(lotteryId);
        if (result) {
          results.push(result);
        }
      } catch (error) {
        console.error(`Error obteniendo resultados para ${lotteryId}:`, error);
        // Agregar resultado simulado como fallback
        const fallbackResult = await this.getSimulatedResults(lotteryId);
        if (fallbackResult) {
          results.push(fallbackResult);
        }
      }
    }
    
    return results;
  }

  /**
   * Intenta obtener resultados de la API oficial de la lotería
   */
  private async fetchFromOfficialAPI(lotteryId: string): Promise<LotteryResult | null> {
    try {
      const baseURL = this.baseURLs[lotteryId];
      if (!baseURL) {
        return null;
      }

      let url = '';
      let params: any = {};

      // Configurar URLs específicas para cada lotería
      switch (lotteryId) {
        case 'baloto':
          url = `${baseURL}/results/latest`;
          break;
        case 'lotto-uk':
          url = `${baseURL}/results/latest`;
          break;
        case 'euromillions-uk':
          url = `${baseURL}/results/latest`;
          break;
        case 'euromillones':
          url = `${baseURL}/results/latest`;
          break;
        case 'primitiva':
          url = `${baseURL}/results/latest`;
          params = { juego: 'primitiva' };
          break;
        case 'bonoloto':
          url = `${baseURL}/results/latest`;
          params = { juego: 'bonoloto' };
          break;
        case 'powerball':
          url = `${baseURL}/results/latest`;
          break;
        case 'mega-millions':
          url = `${baseURL}/results/latest`;
          break;
        case 'florida-lotto':
          url = `${baseURL}/results/latest`;
          break;
        default:
          return null;
      }

      const response = await axios.get(url, {
        params,
        timeout: 10000,
        headers: {
          'User-Agent': 'MigrantesUK/1.0 (Fetcher)',
          'Accept': 'application/json',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
        }
      });

      if (response.status === 200 && response.data) {
        return this.parseOfficialResponse(lotteryId, response.data);
      }

      return null;
    } catch (error) {
      console.log(`API oficial no disponible para ${lotteryId}, usando alternativa`);
      return null;
    }
  }

  /**
   * Intenta obtener resultados de una API alternativa
   */
  private async fetchFromAlternativeAPI(lotteryId: string): Promise<LotteryResult | null> {
    try {
      // API alternativa genérica
      const alternativeURL = 'https://api.lottery.com/v1/results';
      const response = await axios.get(`${alternativeURL}/${lotteryId}`, {
        timeout: 10000,
        headers: {
          'User-Agent': 'MigrantesUK/1.0 (Alternative API)',
          'Accept': 'application/json'
        }
      });

      if (response.status === 200 && response.data) {
        return this.parseAlternativeResponse(lotteryId, response.data);
      }

      return null;
    } catch (error) {
      console.log(`API alternativa no disponible para ${lotteryId}, usando fallback local`);
      return this.generateFallbackResult(lotteryId);
    }
  }

  /**
   * Genera resultados simulados como fallback
   */
  private async getSimulatedResults(lotteryId: string): Promise<LotteryResult> {
    return this.generateFallbackResult(lotteryId);
  }

  /**
   * Genera un resultado de fallback local
   */
  private generateFallbackResult(lotteryId: string): LotteryResult {
    const lottery = this.getLotteryConfig(lotteryId);
    const now = new Date();
    
    const numbers = this.generateRandomNumbers(6, 49);
    const bonusNumbers = this.generateRandomNumbers(1, 10);
    
    return {
      id: `${lotteryId}_fallback_${Date.now()}`,
      lotteryId,
      lotteryName: lottery?.name || lotteryId,
      drawDate: now.toISOString(),
      drawNumber: `Simulado - ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
      numbers,
      bonusNumbers,
      jackpot: 'Simulado',
      currency: lottery?.currency || 'USD',
      nextDraw: undefined,
      isActive: true,
      source: 'simulated',
      lastUpdated: now.toISOString()
    };
  }

  /**
   * Obtiene la configuración de una lotería específica
   */
  private getLotteryConfig(lotteryId: string) {
    const configs: { [key: string]: { name: string; currency: string } } = {
      'baloto': { name: 'Baloto Colombia', currency: 'COP' },
      'lotto-uk': { name: 'Lotto UK', currency: 'GBP' },
      'euromillions-uk': { name: 'EuroMillions UK', currency: 'GBP' },
      'euromillones': { name: 'EuroMillones', currency: 'EUR' },
      'primitiva': { name: 'La Primitiva', currency: 'EUR' },
      'bonoloto': { name: 'Bonoloto', currency: 'EUR' },
      'powerball': { name: 'Powerball USA', currency: 'USD' },
      'mega-millions': { name: 'Mega Millions', currency: 'USD' },
      'florida-lotto': { name: 'Florida Lotto', currency: 'USD' }
    };
    
    return configs[lotteryId];
  }

  /**
   * Genera números aleatorios para simulaciones
   */
  private generateRandomNumbers(count: number, max: number): number[] {
    const numbers: number[] = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * max) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  }

  /**
   * Parsea la respuesta de la API oficial
   */
  private parseOfficialResponse(lotteryId: string, data: any): LotteryResult | null {
    try {
      // Implementar parsing específico para cada lotería
      // Por ahora, retornar null para usar fallback
      return null;
    } catch (error) {
      console.error(`Error parseando respuesta oficial de ${lotteryId}:`, error);
      return null;
    }
  }

  /**
   * Parsea la respuesta de la API alternativa
   */
  private parseAlternativeResponse(lotteryId: string, data: any): LotteryResult | null {
    try {
      // Implementar parsing específico para API alternativa
      // Por ahora, retornar null para usar fallback
      return null;
    } catch (error) {
      console.error(`Error parseando respuesta alternativa de ${lotteryId}:`, error);
      return null;
    }
  }

  /**
   * Obtiene datos del caché
   */
  private getFromCache(lotteryId: string): LotteryResult | null {
    const cached = this.cache.get(lotteryId);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  /**
   * Guarda datos en el caché
   */
  private setCache(lotteryId: string, data: LotteryResult): void {
    this.cache.set(lotteryId, {
      data,
      timestamp: Date.now()
    });
  }

  /**
   * Limpia el caché expirado
   */
  clearExpiredCache(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.cache.delete(key);
      }
    }
  }
}

// Instancia singleton
export const lotteryAPI = new LotteryAPI();
