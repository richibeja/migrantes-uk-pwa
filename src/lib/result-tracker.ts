/**
 * 🏆 RESULT TRACKER - Sistema de Seguimiento de Resultados REALES
 * 
 * PROPÓSITO: Medir el éxito real de las predicciones de Anbel IA
 * CRÍTICO PARA: "NECESITAMOS QUE LA GENTE GANE"
 * 
 * ✅ Solo MEJORA el sistema existente
 * ❌ No simula ni daña nada
 */

export interface PredictionResult {
  id: string;
  predictionId: string;
  userId?: string;
  lottery: string;
  predictedNumbers: number[];
  predictedBonus?: number[];
  actualNumbers?: number[];
  actualBonus?: number[];
  drawDate: string;
  createdAt: Date;
  checkedAt?: Date;
  
  // Resultados del tracking
  matches: {
    mainNumbers: number;
    bonusNumbers: number;
    total: number;
  };
  
  prize: {
    won: boolean;
    amount: string;
    tier: string; // 'jackpot', 'match5', 'match4', 'match3', etc.
  };
  
  confidence: number;
  algorithm: string;
  status: 'pending' | 'checked' | 'won' | 'lost';
  
  // Para testimonios y marketing
  isPublic: boolean;
  testimonial?: string;
  userConsent: boolean;
}

export interface WinStatistics {
  totalPredictions: number;
  totalWins: number;
  totalPrizeAmount: number;
  winRate: number;
  averageConfidence: number;
  
  // Por categoría de premio
  jackpotWins: number;
  majorWins: number; // match5, match4
  minorWins: number; // match3, match2
  
  // Por lotería
  lotteryStats: {
    [lottery: string]: {
      predictions: number;
      wins: number;
      winRate: number;
      totalPrizes: number;
    };
  };
  
  // Tendencias
  last30Days: {
    predictions: number;
    wins: number;
    winRate: number;
  };
  
  // Para testimonios
  publicWins: PredictionResult[];
  recentWins: PredictionResult[];
}

class ResultTracker {
  private results: Map<string, PredictionResult> = new Map();
  private statistics: WinStatistics | null = null;
  private storageKey = 'anbel_prediction_results';
  
  constructor() {
    this.loadResults();
  }
  
  /**
   * 📝 REGISTRAR NUEVA PREDICCIÓN
   * Llamar cuando Anbel IA genera una predicción
   */
  trackPrediction(prediction: {
    id: string;
    userId?: string;
    lottery: string;
    numbers: number[];
    bonusNumbers?: number[];
    confidence: number;
    algorithm: string;
  }): string {
    const result: PredictionResult = {
      id: `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      predictionId: prediction.id,
      userId: prediction.userId,
      lottery: prediction.lottery,
      predictedNumbers: [...prediction.numbers],
      predictedBonus: prediction.bonusNumbers ? [...prediction.bonusNumbers] : undefined,
      drawDate: this.getNextDrawDate(prediction.lottery),
      createdAt: new Date(),
      
      matches: {
        mainNumbers: 0,
        bonusNumbers: 0,
        total: 0
      },
      
      prize: {
        won: false,
        amount: '$0',
        tier: 'none'
      },
      
      confidence: prediction.confidence,
      algorithm: prediction.algorithm,
      status: 'pending',
      isPublic: false,
      userConsent: false
    };
    
    this.results.set(result.id, result);
    this.saveResults();
    
    console.log(`🎯 Predicción registrada para tracking: ${result.lottery} - ${result.predictedNumbers.join(', ')}`);
    return result.id;
  }
  
  /**
   * 🔍 VERIFICAR RESULTADOS CONTRA SORTEOS REALES
   * Llamar cuando se obtienen resultados oficiales
   */
  async checkResults(lottery: string, actualResults: {
    numbers: number[];
    bonusNumbers?: number[];
    drawDate: string;
    prizes?: { [tier: string]: string };
  }): Promise<PredictionResult[]> {
    const checkedResults: PredictionResult[] = [];
    const drawDateStr = actualResults.drawDate;
    
    // Buscar predicciones pendientes para esta lotería y fecha
    for (const [id, result] of this.results.entries()) {
      if (result.lottery === lottery && 
          result.status === 'pending' && 
          result.drawDate === drawDateStr) {
        
        // Calcular coincidencias
        const mainMatches = this.countMatches(result.predictedNumbers, actualResults.numbers);
        const bonusMatches = result.predictedBonus && actualResults.bonusNumbers 
          ? this.countMatches(result.predictedBonus, actualResults.bonusNumbers)
          : 0;
        
        result.actualNumbers = [...actualResults.numbers];
        result.actualBonus = actualResults.bonusNumbers ? [...actualResults.bonusNumbers] : undefined;
        result.checkedAt = new Date();
        
        result.matches = {
          mainNumbers: mainMatches,
          bonusNumbers: bonusMatches,
          total: mainMatches + bonusMatches
        };
        
        // Determinar premio
        const prizeInfo = this.calculatePrize(lottery, result.matches, actualResults.prizes);
        result.prize = prizeInfo;
        result.status = prizeInfo.won ? 'won' : 'lost';
        
        checkedResults.push(result);
        
        // Log para tracking
        if (prizeInfo.won) {
          console.log(`🏆 ¡GANADOR! ${lottery}: ${result.matches.total} coincidencias - ${prizeInfo.amount}`);
          
          // Notificar ganancia (para marketing viral)
          this.notifyWin(result);
        }
      }
    }
    
    if (checkedResults.length > 0) {
      this.saveResults();
      this.updateStatistics();
    }
    
    return checkedResults;
  }
  
  /**
   * 📊 OBTENER ESTADÍSTICAS ACTUALES
   */
  getStatistics(): WinStatistics {
    if (!this.statistics) {
      this.updateStatistics();
    }
    return this.statistics!;
  }
  
  /**
   * 🏆 OBTENER TESTIMONIOS DE GANADORES
   */
  getWinnerTestimonials(): PredictionResult[] {
    return Array.from(this.results.values())
      .filter(r => r.status === 'won' && r.isPublic && r.testimonial)
      .sort((a, b) => new Date(b.checkedAt!).getTime() - new Date(a.checkedAt!).getTime())
      .slice(0, 10);
  }
  
  /**
   * 📈 OBTENER TASA DE ÉXITO POR ALGORITMO
   */
  getAlgorithmPerformance(): { [algorithm: string]: { predictions: number; wins: number; winRate: number } } {
    const performance: { [algorithm: string]: { predictions: number; wins: number; winRate: number } } = {};
    
    for (const result of this.results.values()) {
      if (result.status === 'checked' || result.status === 'won' || result.status === 'lost') {
        if (!performance[result.algorithm]) {
          performance[result.algorithm] = { predictions: 0, wins: 0, winRate: 0 };
        }
        
        performance[result.algorithm].predictions++;
        if (result.status === 'won') {
          performance[result.algorithm].wins++;
        }
      }
    }
    
    // Calcular tasas de éxito
    for (const algo in performance) {
      const stats = performance[algo];
      stats.winRate = stats.predictions > 0 ? (stats.wins / stats.predictions) * 100 : 0;
    }
    
    return performance;
  }
  
  /**
   * 💰 REGISTRAR GANANCIA COMPARTIDA
   */
  recordSharedWin(resultId: string, sharedAmount: number, userShare: number): void {
    const result = this.results.get(resultId);
    if (result && result.status === 'won') {
      // Agregar información de ganancia compartida
      (result as any).sharedWin = {
        totalAmount: sharedAmount,
        userShare: userShare,
        anbelShare: sharedAmount - userShare,
        sharedAt: new Date()
      };
      
      this.saveResults();
      console.log(`💰 Ganancia compartida registrada: $${sharedAmount} (Usuario: $${userShare})`);
    }
  }
  
  // ========== MÉTODOS PRIVADOS ==========
  
  private countMatches(predicted: number[], actual: number[]): number {
    return predicted.filter(num => actual.includes(num)).length;
  }
  
  private calculatePrize(lottery: string, matches: any, prizes?: { [tier: string]: string }): {
    won: boolean;
    amount: string;
    tier: string;
  } {
    const { mainNumbers, bonusNumbers } = matches;
    
    // Lógica específica por lotería
    switch (lottery.toLowerCase()) {
      case 'powerball':
        if (mainNumbers === 5 && bonusNumbers === 1) {
          return { won: true, amount: prizes?.jackpot || '$100,000,000+', tier: 'jackpot' };
        } else if (mainNumbers === 5) {
          return { won: true, amount: prizes?.match5 || '$1,000,000', tier: 'match5' };
        } else if (mainNumbers === 4 && bonusNumbers === 1) {
          return { won: true, amount: prizes?.match4plus || '$50,000', tier: 'match4plus' };
        } else if (mainNumbers === 4) {
          return { won: true, amount: prizes?.match4 || '$100', tier: 'match4' };
        } else if (mainNumbers === 3 && bonusNumbers === 1) {
          return { won: true, amount: prizes?.match3plus || '$100', tier: 'match3plus' };
        } else if (mainNumbers === 3) {
          return { won: true, amount: prizes?.match3 || '$7', tier: 'match3' };
        } else if (bonusNumbers === 1) {
          return { won: true, amount: prizes?.powerball || '$4', tier: 'powerball' };
        }
        break;
        
      case 'mega millions':
        if (mainNumbers === 5 && bonusNumbers === 1) {
          return { won: true, amount: prizes?.jackpot || '$50,000,000+', tier: 'jackpot' };
        } else if (mainNumbers === 5) {
          return { won: true, amount: prizes?.match5 || '$1,000,000', tier: 'match5' };
        } else if (mainNumbers === 4 && bonusNumbers === 1) {
          return { won: true, amount: prizes?.match4plus || '$10,000', tier: 'match4plus' };
        } else if (mainNumbers === 4) {
          return { won: true, amount: prizes?.match4 || '$500', tier: 'match4' };
        } else if (mainNumbers === 3 && bonusNumbers === 1) {
          return { won: true, amount: prizes?.match3plus || '$200', tier: 'match3plus' };
        } else if (mainNumbers === 3) {
          return { won: true, amount: prizes?.match3 || '$10', tier: 'match3' };
        } else if (bonusNumbers === 1) {
          return { won: true, amount: prizes?.megaball || '$2', tier: 'megaball' };
        }
        break;
    }
    
    return { won: false, amount: '$0', tier: 'none' };
  }
  
  private getNextDrawDate(lottery: string): string {
    // Calcular próxima fecha de sorteo basada en la lotería
    const now = new Date();
    const drawDays: { [lottery: string]: number[] } = {
      'powerball': [1, 3, 6], // Lunes, Miércoles, Sábado
      'mega millions': [2, 5], // Martes, Viernes
      'cash4life': [1, 4] // Lunes, Jueves
    };
    
    const days = drawDays[lottery.toLowerCase()] || [1, 3, 6];
    const currentDay = now.getDay();
    
    // Encontrar el próximo día de sorteo
    let nextDrawDay = days.find(day => day > currentDay);
    if (!nextDrawDay) {
      nextDrawDay = days[0]; // Próxima semana
    }
    
    const nextDraw = new Date(now);
    nextDraw.setDate(now.getDate() + (nextDrawDay - currentDay + 7) % 7);
    
    return nextDraw.toISOString().split('T')[0];
  }
  
  private updateStatistics(): void {
    const allResults = Array.from(this.results.values());
    const checkedResults = allResults.filter(r => r.status !== 'pending');
    const wins = checkedResults.filter(r => r.status === 'won');
    
    // Calcular estadísticas por lotería
    const lotteryStats: { [lottery: string]: any } = {};
    for (const result of checkedResults) {
      if (!lotteryStats[result.lottery]) {
        lotteryStats[result.lottery] = { predictions: 0, wins: 0, winRate: 0, totalPrizes: 0 };
      }
      lotteryStats[result.lottery].predictions++;
      if (result.status === 'won') {
        lotteryStats[result.lottery].wins++;
        // Convertir amount a número para sumar
        const amount = this.parseAmount(result.prize.amount);
        lotteryStats[result.lottery].totalPrizes += amount;
      }
    }
    
    // Calcular win rates
    for (const lottery in lotteryStats) {
      const stats = lotteryStats[lottery];
      stats.winRate = stats.predictions > 0 ? (stats.wins / stats.predictions) * 100 : 0;
    }
    
    // Estadísticas de últimos 30 días
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentResults = checkedResults.filter(r => new Date(r.checkedAt!) >= thirtyDaysAgo);
    const recentWins = recentResults.filter(r => r.status === 'won');
    
    this.statistics = {
      totalPredictions: checkedResults.length,
      totalWins: wins.length,
      totalPrizeAmount: wins.reduce((sum, w) => sum + this.parseAmount(w.prize.amount), 0),
      winRate: checkedResults.length > 0 ? (wins.length / checkedResults.length) * 100 : 0,
      averageConfidence: checkedResults.length > 0 
        ? checkedResults.reduce((sum, r) => sum + r.confidence, 0) / checkedResults.length 
        : 0,
      
      jackpotWins: wins.filter(w => w.prize.tier === 'jackpot').length,
      majorWins: wins.filter(w => ['match5', 'match4plus', 'match4'].includes(w.prize.tier)).length,
      minorWins: wins.filter(w => ['match3plus', 'match3', 'powerball', 'megaball'].includes(w.prize.tier)).length,
      
      lotteryStats,
      
      last30Days: {
        predictions: recentResults.length,
        wins: recentWins.length,
        winRate: recentResults.length > 0 ? (recentWins.length / recentResults.length) * 100 : 0
      },
      
      publicWins: wins.filter(w => w.isPublic).slice(0, 10),
      recentWins: wins.sort((a, b) => new Date(b.checkedAt!).getTime() - new Date(a.checkedAt!).getTime()).slice(0, 5)
    };
  }
  
  private parseAmount(amountStr: string): number {
    // Convertir strings como "$1,000,000" a números
    const cleaned = amountStr.replace(/[$,+]/g, '');
    const number = parseFloat(cleaned);
    return isNaN(number) ? 0 : number;
  }
  
  private notifyWin(result: PredictionResult): void {
    // Notificación para marketing viral
    const event = new CustomEvent('anbelWin', {
      detail: {
        lottery: result.lottery,
        amount: result.prize.amount,
        matches: result.matches,
        confidence: result.confidence
      }
    });
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
    }
  }
  
  private loadResults(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const data = JSON.parse(stored);
          this.results = new Map(Object.entries(data));
        }
      } catch (error) {
        console.error('Error loading results:', error);
      }
    }
  }
  
  private saveResults(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const data = Object.fromEntries(this.results);
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving results:', error);
      }
    }
  }
}

// Instancia global del tracker
export const resultTracker = new ResultTracker();

/**
 * 🎯 FUNCIONES DE UTILIDAD PARA INTEGRACIÓN
 */

// Para usar en componentes de predicción
export function trackNewPrediction(prediction: any): string {
  return resultTracker.trackPrediction(prediction);
}

// Para usar cuando se obtienen resultados oficiales
export function checkPredictionResults(lottery: string, actualResults: any): Promise<PredictionResult[]> {
  return resultTracker.checkResults(lottery, actualResults);
}

// Para mostrar estadísticas en el dashboard
export function getWinStatistics(): WinStatistics {
  return resultTracker.getStatistics();
}

// Para testimonios y marketing
export function getWinnerStories(): PredictionResult[] {
  return resultTracker.getWinnerTestimonials();
}

// Para optimizar algoritmos
export function getAlgorithmSuccess(): any {
  return resultTracker.getAlgorithmPerformance();
}
