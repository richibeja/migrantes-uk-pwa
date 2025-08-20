import { PREDICTION_METHODS, LOTTERIES_BY_COUNTRY } from './constants';

export interface Prediction {
  numbers: number[];
  bonusNumbers?: number[];
  confidence: number;
  method: string;
  lotteryId: string;
  nextDraw?: string;
  isActive?: boolean;
  isHot?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PredictionMethod {
  name: string;
  description: string;
  weight: number;
  minConfidence: number;
  maxConfidence: number;
}

export interface Lottery {
  id: string;
  name: string;
  drawDays: string[];
  drawTime: string;
  numbersCount: number;
  maxNumber: number;
  bonusNumbers?: number;
  maxBonusNumber?: number;
}

export interface LotteryResult {
  numbers: number[];
  bonusNumbers?: number[];
  drawDate: string;
}

export interface MethodResult {
  numbers: number[];
  bonusNumbers?: number[];
  confidence: number;
  method: string;
}

export interface FrequencyAnalysis {
  number: number;
  frequency: number;
  lastSeen: string;
  isHot: boolean;
  isCold: boolean;
  lastAppearance: string;
}

export class PredictionEngine {
  private methods: PredictionMethod[];

  constructor() {
    this.methods = PREDICTION_METHODS;
  }

  /**
   * Genera predicciones para una lotería específica
   */
  generatePredictions(lotteryId: string, count: number = 3): Prediction[] {
    const lottery = this.getLotteryConfig(lotteryId);
    if (!lottery) {
      throw new Error(`Lotería no encontrada: ${lotteryId}`);
    }

    const predictions: Prediction[] = [];
    
    for (let i = 0; i < count; i++) {
      const prediction = this.generateSinglePrediction(lotteryId, lottery);
      predictions.push(prediction);
    }

    return predictions;
  }

  /**
   * Genera una predicción individual usando múltiples métodos
   */
  private generateSinglePrediction(lotteryId: string, lottery: any): Prediction {
    const methodResults: { [key: string]: number[] } = {};
    const methodConfidences: { [key: string]: number } = {};

    // Generar predicciones con cada método
    this.methods.forEach(method => {
      const numbers = this.generateByMethod(method.name, lottery);
      methodResults[method.name] = numbers;
      methodConfidences[method.name] = this.calculateMethodConfidence(method, lottery);
    });

    // Combinar métodos usando ponderación
    const combinedNumbers = this.combineMethods(methodResults, methodConfidences, lottery);
    const finalConfidence = this.calculateFinalConfidence(methodConfidences);
    const selectedMethod = this.selectBestMethod(methodConfidences);

    return {
      numbers: combinedNumbers,
      bonusNumbers: this.generateBonusNumbers(lottery),
      confidence: Math.round(finalConfidence),
      method: selectedMethod,
      lotteryId,
    };
  }

  /**
   * Genera números usando un método específico
   */
  private generateByMethod(methodName: string, lottery: any): number[] {
    switch (methodName) {
      case 'Método Anbel':
        return this.anbelMethod(lottery);
      case 'Método Probabilístico':
        return this.probabilisticMethod(lottery);
      case 'Método Histórico':
        return this.historicalMethod(lottery);
      case 'Método Filtrado Cruzado':
        return this.crossFilterMethod(lottery);
      default:
        return this.randomMethod(lottery);
    }
  }

  /**
   * Método Anbel - Algoritmo basado en patrones matemáticos
   */
  private anbelMethod(lottery: any): number[] {
    const numbers: number[] = [];
    const maxNumber = lottery.maxNumber || 49;
    const count = lottery.numbersCount || 6;

    // Secuencia de Fibonacci
    const fibonacci = this.generateFibonacci(maxNumber);
    
    // Números primos
    const primes = this.generatePrimes(maxNumber);
    
    // Patrones geométricos
    const geometric = this.generateGeometricPattern(maxNumber);

    while (numbers.length < count) {
      let candidate: number;
      
      if (Math.random() < 0.4 && fibonacci.length > 0) {
        candidate = fibonacci[Math.floor(Math.random() * fibonacci.length)];
      } else if (Math.random() < 0.3 && primes.length > 0) {
        candidate = primes[Math.floor(Math.random() * primes.length)];
      } else if (Math.random() < 0.3 && geometric.length > 0) {
        candidate = geometric[Math.floor(Math.random() * geometric.length)];
      } else {
        candidate = Math.floor(Math.random() * maxNumber) + 1;
      }

      if (!numbers.includes(candidate)) {
        numbers.push(candidate);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  /**
   * Método Probabilístico - Análisis estadístico
   */
  private probabilisticMethod(lottery: any): number[] {
    const numbers: number[] = [];
    const maxNumber = lottery.maxNumber || 49;
    const count = lottery.numbersCount || 6;

    // Simular análisis de frecuencias
    const hotNumbers = this.generateHotNumbers(maxNumber);
    const coldNumbers = this.generateColdNumbers(maxNumber);

    while (numbers.length < count) {
      let candidate: number;
      
      if (Math.random() < 0.6 && hotNumbers.length > 0) {
        candidate = hotNumbers[Math.floor(Math.random() * hotNumbers.length)];
      } else if (Math.random() < 0.3 && coldNumbers.length > 0) {
        candidate = coldNumbers[Math.floor(Math.random() * coldNumbers.length)];
      } else {
        candidate = Math.floor(Math.random() * maxNumber) + 1;
      }

      if (!numbers.includes(candidate)) {
        numbers.push(candidate);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  /**
   * Método Histórico - Análisis de patrones del pasado
   */
  private historicalMethod(lottery: any): number[] {
    const numbers: number[] = [];
    const maxNumber = lottery.maxNumber || 49;
    const count = lottery.numbersCount || 6;

    // Simular análisis histórico
    const historicalPatterns = this.generateHistoricalPatterns(maxNumber);
    const consecutiveNumbers = this.generateConsecutiveNumbers(maxNumber);

    while (numbers.length < count) {
      let candidate: number;
      
      if (Math.random() < 0.5 && historicalPatterns.length > 0) {
        candidate = historicalPatterns[Math.floor(Math.random() * historicalPatterns.length)];
      } else if (Math.random() < 0.3 && consecutiveNumbers.length > 0) {
        candidate = consecutiveNumbers[Math.floor(Math.random() * consecutiveNumbers.length)];
      } else {
        candidate = Math.floor(Math.random() * maxNumber) + 1;
      }

      if (!numbers.includes(candidate)) {
        numbers.push(candidate);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  /**
   * Método Filtrado Cruzado - Combinación inteligente
   */
  private crossFilterMethod(lottery: any): number[] {
    const numbers: number[] = [];
    const maxNumber = lottery.maxNumber || 49;
    const count = lottery.numbersCount || 6;

    // Combinar múltiples enfoques
    const balancedNumbers = this.generateBalancedNumbers(maxNumber);
    const edgeNumbers = this.generateEdgeNumbers(maxNumber);

    while (numbers.length < count) {
      let candidate: number;
      
      if (Math.random() < 0.7 && balancedNumbers.length > 0) {
        candidate = balancedNumbers[Math.floor(Math.random() * balancedNumbers.length)];
      } else if (Math.random() < 0.3 && edgeNumbers.length > 0) {
        candidate = edgeNumbers[Math.floor(Math.random() * edgeNumbers.length)];
      } else {
        candidate = Math.floor(Math.random() * maxNumber) + 1;
      }

      if (!numbers.includes(candidate)) {
        numbers.push(candidate);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  /**
   * Método aleatorio como fallback
   */
  private randomMethod(lottery: any): number[] {
    const numbers: number[] = [];
    const maxNumber = lottery.maxNumber || 49;
    const count = lottery.numbersCount || 6;

    while (numbers.length < count) {
      const candidate = Math.floor(Math.random() * maxNumber) + 1;
      if (!numbers.includes(candidate)) {
        numbers.push(candidate);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  /**
   * Genera números bonus
   */
  private generateBonusNumbers(lottery: any): number[] {
    const bonusCount = lottery.bonusNumbers || 1;
    const maxBonusNumber = lottery.maxBonusNumber || lottery.maxNumber || 49;
    const numbers: number[] = [];

    while (numbers.length < bonusCount) {
      const candidate = Math.floor(Math.random() * maxBonusNumber) + 1;
      if (!numbers.includes(candidate)) {
        numbers.push(candidate);
      }
    }

    return numbers.sort((a, b) => a - b);
  }

  /**
   * Combina resultados de múltiples métodos
   */
  private combineMethods(
    methodResults: { [key: string]: number[] },
    methodConfidences: { [key: string]: number },
    lottery: any
  ): number[] {
    const maxNumber = lottery.maxNumber || 49;
    const count = lottery.numbersCount || 6;
    const numberScores: { [key: number]: number } = {};

    // Calcular puntuación para cada número
    Object.keys(methodResults).forEach(method => {
      const confidence = methodConfidences[method];
      const numbers = methodResults[method];
      
      numbers.forEach(num => {
        numberScores[num] = (numberScores[num] || 0) + confidence;
      });
    });

    // Seleccionar números con mayor puntuación
    const sortedNumbers = Object.entries(numberScores)
      .sort(([, a], [, b]) => b - a)
      .map(([num]) => parseInt(num));

    return sortedNumbers.slice(0, count).sort((a, b) => a - b);
  }

  /**
   * Calcula confianza final combinada
   */
  private calculateFinalConfidence(methodConfidences: { [key: string]: number }): number {
    const totalWeight = this.methods.reduce((sum, method) => sum + method.weight, 0);
    let weightedConfidence = 0;

    this.methods.forEach(method => {
      const confidence = methodConfidences[method.name] || 0;
      weightedConfidence += (confidence * method.weight) / totalWeight;
    });

    return Math.min(98, Math.max(65, weightedConfidence));
  }

  /**
   * Selecciona el mejor método basado en confianza
   */
  private selectBestMethod(methodConfidences: { [key: string]: number }): string {
    let bestMethod = this.methods[0].name;
    let bestConfidence = 0;

    Object.entries(methodConfidences).forEach(([method, confidence]) => {
      if (confidence > bestConfidence) {
        bestConfidence = confidence;
        bestMethod = method;
      }
    });

    return bestMethod;
  }

  /**
   * Calcula confianza para un método específico
   */
  private calculateMethodConfidence(method: PredictionMethod, lottery: any): number {
    const baseConfidence = method.minConfidence + 
      (Math.random() * (method.maxConfidence - method.minConfidence));
    
    // Ajustar basado en características de la lotería
    const lotteryFactor = this.calculateLotteryFactor(lottery);
    
    return Math.min(98, Math.max(65, baseConfidence * lotteryFactor));
  }

  /**
   * Calcula factor de ajuste para la lotería
   */
  private calculateLotteryFactor(lottery: any): number {
    let factor = 1.0;
    
    // Ajustar por tipo de lotería
    if (lottery.type === 'national') factor *= 1.1;
    if (lottery.type === 'international') factor *= 0.95;
    
    // Ajustar por frecuencia de sorteos
    const drawFrequency = lottery.drawDays?.length || 1;
    if (drawFrequency >= 6) factor *= 1.05;
    if (drawFrequency <= 2) factor *= 0.95;
    
    return factor;
  }

  /**
   * Obtiene configuración de lotería
   */
  private getLotteryConfig(lotteryId: string): any {
    for (const country of Object.values(LOTTERIES_BY_COUNTRY)) {
      const lottery = (country as any).lotteries?.find((l: any) => l.id === lotteryId);
      if (lottery) return lottery;
    }
    return null;
  }

  /**
   * Obtiene fecha del próximo sorteo
   */
  getNextDrawDate(lotteryId: string): string {
    const lottery = this.getLotteryConfig(lotteryId);
    if (!lottery) return "No disponible";

    // Simular cálculo de próxima fecha
    const now = new Date();
    const nextDraw = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +1 día
    
    return nextDraw.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Verifica si la predicción está bloqueada
   */
  isPredictionLocked(lotteryId: string): boolean {
    // Simular lógica de bloqueo basada en tiempo
    const now = new Date();
    const hour = now.getHours();
    
    // Bloquear predicciones cerca del sorteo
    return hour >= 20 && hour <= 22;
  }

  // Métodos auxiliares para generar patrones
  private generateFibonacci(max: number): number[] {
    const fib = [1, 1];
    while (fib[fib.length - 1] + fib[fib.length - 2] <= max) {
      fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }
    return fib.filter(n => n <= max);
  }

  private generatePrimes(max: number): number[] {
    const primes = [];
    for (let i = 2; i <= max; i++) {
      if (this.isPrime(i)) primes.push(i);
    }
    return primes;
  }

  private isPrime(num: number): boolean {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  }

  private generateGeometricPattern(max: number): number[] {
    const pattern = [];
    for (let i = 1; i <= max; i++) {
      if (i % 3 === 0 || i % 7 === 0) pattern.push(i);
    }
    return pattern;
  }

  private generateHotNumbers(max: number): number[] {
    return Array.from({ length: Math.floor(max * 0.3) }, (_, i) => i + 1);
  }

  private generateColdNumbers(max: number): number[] {
    return Array.from({ length: Math.floor(max * 0.2) }, (_, i) => max - i);
  }

  private generateHistoricalPatterns(max: number): number[] {
    return Array.from({ length: Math.floor(max * 0.4) }, (_, i) => i + 1);
  }

  private generateConsecutiveNumbers(max: number): number[] {
    const consecutive = [];
    for (let i = 1; i <= max - 2; i++) {
      consecutive.push(i, i + 1, i + 2);
    }
    return consecutive.filter(n => n <= max);
  }

  private generateBalancedNumbers(max: number): number[] {
    const mid = Math.floor(max / 2);
    return Array.from({ length: Math.floor(max * 0.5) }, (_, i) => mid - Math.floor(max * 0.25) + i);
  }

  private generateEdgeNumbers(max: number): number[] {
    return [1, 2, 3, max - 2, max - 1, max];
  }
}

/**
 * Método Anbel - Algoritmo matemático avanzado basado en secuencias de Fibonacci
 */
export class AnbelMethod {
  static generatePrediction(lottery: Lottery, historicalResults: LotteryResult[]): MethodResult {
    const { numbersCount, maxNumber, bonusNumbers } = lottery;
    
    // Generar números usando secuencia de Fibonacci
    const fibonacci = this.generateFibonacci(maxNumber);
    const numbers: number[] = [];
    
    // Seleccionar números de Fibonacci
    for (let i = 0; i < Math.min(numbersCount, fibonacci.length); i++) {
      numbers.push(fibonacci[i]);
    }
    
    // Completar con números aleatorios si es necesario
    while (numbers.length < numbersCount) {
      const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    // Generar números bonus
    let bonus: number[] = [];
    if (bonusNumbers && bonusNumbers > 0) {
      while (bonus.length < bonusNumbers) {
        const randomBonus = Math.floor(Math.random() * (lottery.maxBonusNumber || maxNumber)) + 1;
        if (!bonus.includes(randomBonus) && !numbers.includes(randomBonus)) {
          bonus.push(randomBonus);
        }
      }
    }

    const confidence = this.calculateAnbelConfidence(numbers, fibonacci);

    return {
      numbers: numbers.sort((a, b) => a - b),
      bonusNumbers: bonus.sort((a, b) => a - b),
      confidence,
      method: 'anbel'
    };
  }

  private static generateFibonacci(max: number): number[] {
    const fib = [1, 1];
    while (fib[fib.length - 1] + fib[fib.length - 2] <= max) {
      fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }
    return fib.filter(n => n <= max);
  }

  private static calculateAnbelConfidence(numbers: number[], fibonacci: number[]): number {
    let confidence = 75; // Base confidence
    
    // Bonus por números de Fibonacci
    const fibCount = numbers.filter(n => fibonacci.includes(n)).length;
    if (fibCount > 0) confidence += 10;
    if (fibCount > numbers.length * 0.5) confidence += 5;
    
    // Verificar distribución
    const lowNumbers = numbers.filter(n => n <= 25).length;
    const highNumbers = numbers.filter(n => n > 25).length;
    
    if (Math.abs(lowNumbers - highNumbers) <= 1) confidence += 5;
    
    return Math.min(confidence, 90);
  }
}

/**
 * Método Probabilístico - Análisis estadístico de frecuencias y probabilidades
 */
export class ProbabilisticMethod {
  static generatePrediction(lottery: Lottery, historicalResults: LotteryResult[]): MethodResult {
    const { numbersCount, maxNumber, bonusNumbers } = lottery;
    const frequencyAnalysis = this.analyzeFrequency(historicalResults, maxNumber);
    
    // Seleccionar números basados en frecuencia
    const hotNumbers = frequencyAnalysis.filter(f => f.isHot).map(f => f.number);
    const coldNumbers = frequencyAnalysis.filter(f => f.isCold).map(f => f.number);
    
    const numbers: number[] = [];
    
    // 60% números calientes, 40% números fríos
    const hotCount = Math.ceil(numbersCount * 0.6);
    const coldCount = numbersCount - hotCount;
    
    // Agregar números calientes
    for (let i = 0; i < hotCount && i < hotNumbers.length; i++) {
      numbers.push(hotNumbers[i]);
    }
    
    // Agregar números fríos
    for (let i = 0; i < coldCount && i < coldNumbers.length; i++) {
      numbers.push(coldNumbers[i]);
    }
    
    // Completar con números aleatorios si es necesario
    while (numbers.length < numbersCount) {
      const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }

    // Generar números bonus
    let bonus: number[] = [];
    if (bonusNumbers && bonusNumbers > 0) {
      while (bonus.length < bonusNumbers) {
        const randomBonus = Math.floor(Math.random() * (lottery.maxBonusNumber || maxNumber)) + 1;
        if (!bonus.includes(randomBonus) && !numbers.includes(randomBonus)) {
          bonus.push(randomBonus);
        }
      }
    }

    const confidence = this.calculateProbabilisticConfidence(numbers, frequencyAnalysis);

    return {
      numbers: numbers.sort((a, b) => a - b),
      bonusNumbers: bonus.sort((a, b) => a - b),
      confidence,
      method: 'probabilistic'
    };
  }

  private static analyzeFrequency(historicalResults: LotteryResult[], maxNumber: number): FrequencyAnalysis[] {
    const frequencyMap = new Map<number, number>();
    const lastAppearanceMap = new Map<number, string>();
    const gapsMap = new Map<number, number[]>();
    
    // Inicializar contadores
    for (let i = 1; i <= maxNumber; i++) {
      frequencyMap.set(i, 0);
      gapsMap.set(i, []);
    }
    
    // Analizar resultados históricos
    historicalResults.forEach((result, index) => {
      result.numbers.forEach(number => {
        frequencyMap.set(number, (frequencyMap.get(number) || 0) + 1);
        lastAppearanceMap.set(number, result.drawDate);
        
        // Calcular gaps
        if (index > 0) {
          const gap = index;
          gapsMap.get(number)?.push(gap);
        }
      });
    });
    
    // Calcular análisis de frecuencia
    const analysis: FrequencyAnalysis[] = [];
    const totalDraws = historicalResults.length;
    
    for (let i = 1; i <= maxNumber; i++) {
      const frequency = frequencyMap.get(i) || 0;
      const lastAppearance = lastAppearanceMap.get(i) || 'Nunca';
      const gaps = gapsMap.get(i) || [];
      const averageGap = gaps.length > 0 ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 0;
      
      // Determinar si es número caliente o frío
      const expectedFrequency = totalDraws / maxNumber;
      const isHot = frequency > expectedFrequency * 1.2;
      const isCold = frequency < expectedFrequency * 0.8;
      
      analysis.push({
        number: i,
        frequency,
        lastSeen: lastAppearance,
        lastAppearance: lastAppearance,
        isHot,
        isCold
      });
    }
    
    return analysis.sort((a, b) => b.frequency - a.frequency);
  }

  private static calculateProbabilisticConfidence(numbers: number[], frequencyAnalysis: FrequencyAnalysis[]): number {
    let confidence = 70; // Base confidence
    
    // Calcular confianza basada en la distribución de números
    const hotCount = numbers.filter(n => {
      const analysis = frequencyAnalysis.find(f => f.number === n);
      return analysis?.isHot;
    }).length;
    
    const coldCount = numbers.filter(n => {
      const analysis = frequencyAnalysis.find(f => f.number === n);
      return analysis?.isCold;
    }).length;
    
    // Balance entre números calientes y fríos
    if (hotCount > 0 && coldCount > 0) confidence += 15;
    else if (hotCount > 0 || coldCount > 0) confidence += 10;
    
    // Verificar distribución uniforme
    const lowNumbers = numbers.filter(n => n <= 25).length;
    const highNumbers = numbers.filter(n => n > 25).length;
    
    if (Math.abs(lowNumbers - highNumbers) <= 1) confidence += 5;
    
    return Math.min(confidence, 90);
  }
}

/**
 * Método Histórico - Análisis de patrones históricos y tendencias
 */
export class HistoricalMethod {
  static generatePrediction(lottery: Lottery, historicalResults: LotteryResult[]): MethodResult {
    const { numbersCount, maxNumber, bonusNumbers } = lottery;
    
    // Analizar patrones de los últimos resultados
    const recentResults = historicalResults.slice(-10);
    const patternNumbers = this.extractPatterns(recentResults, maxNumber);
    
    const numbers: number[] = [];
    
    // Agregar números de patrones históricos
    for (let i = 0; i < Math.min(numbersCount, patternNumbers.length); i++) {
      numbers.push(patternNumbers[i]);
    }
    
    // Completar con números basados en tendencias
    while (numbers.length < numbersCount) {
      const trendNumber = this.generateTrendNumber(numbers, recentResults, maxNumber);
      if (!numbers.includes(trendNumber)) {
        numbers.push(trendNumber);
      }
    }

    // Generar números bonus
    let bonus: number[] = [];
    if (bonusNumbers && bonusNumbers > 0) {
      while (bonus.length < bonusNumbers) {
        const randomBonus = Math.floor(Math.random() * (lottery.maxBonusNumber || maxNumber)) + 1;
        if (!bonus.includes(randomBonus) && !numbers.includes(randomBonus)) {
          bonus.push(randomBonus);
        }
      }
    }

    const confidence = this.calculateHistoricalConfidence(numbers, recentResults);

    return {
      numbers: numbers.sort((a, b) => a - b),
      bonusNumbers: bonus.sort((a, b) => a - b),
      confidence,
      method: 'historical'
    };
  }

  private static extractPatterns(results: LotteryResult[], maxNumber: number): number[] {
    const numberFrequency = new Map<number, number>();
    
    // Contar frecuencia de cada número
    results.forEach(result => {
      result.numbers.forEach(number => {
        numberFrequency.set(number, (numberFrequency.get(number) || 0) + 1);
      });
    });
    
    // Ordenar por frecuencia y devolver los más frecuentes
    return Array.from(numberFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([number]) => number)
      .slice(0, Math.ceil(maxNumber * 0.3)); // Top 30%
  }

  private static generateTrendNumber(existingNumbers: number[], recentResults: LotteryResult[], maxNumber: number): number {
    // Analizar tendencias de números consecutivos
    const consecutivePatterns = this.findConsecutivePatterns(recentResults);
    
    // Buscar números que sigan patrones consecutivos
    for (const pattern of consecutivePatterns) {
      for (const number of pattern) {
        if (!existingNumbers.includes(number) && number <= maxNumber) {
          return number;
        }
      }
    }
    
    // Si no hay patrones, generar número aleatorio
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    } while (existingNumbers.includes(randomNumber));
    
    return randomNumber;
  }

  private static findConsecutivePatterns(results: LotteryResult[]): number[][] {
    const patterns: number[][] = [];
    
    results.forEach(result => {
      const sortedNumbers = [...result.numbers].sort((a, b) => a - b);
      
      for (let i = 0; i < sortedNumbers.length - 1; i++) {
        if (sortedNumbers[i + 1] - sortedNumbers[i] === 1) {
          patterns.push([sortedNumbers[i], sortedNumbers[i + 1]]);
        }
      }
    });
    
    return patterns;
  }

  private static calculateHistoricalConfidence(numbers: number[], recentResults: LotteryResult[]): number {
    let confidence = 65; // Base confidence
    
    // Verificar si los números aparecen en resultados recientes
    const recentNumbers = recentResults.flatMap(r => r.numbers);
    const matchingNumbers = numbers.filter(n => recentNumbers.includes(n)).length;
    
    // Confianza basada en coincidencias con resultados recientes
    if (matchingNumbers > 0) confidence += 10;
    if (matchingNumbers > numbers.length * 0.3) confidence += 5;
    
    // Verificar distribución temporal
    const lowNumbers = numbers.filter(n => n <= 25).length;
    const highNumbers = numbers.filter(n => n > 25).length;
    
    if (Math.abs(lowNumbers - highNumbers) <= 2) confidence += 5;
    
    return Math.min(confidence, 85);
  }
}

/**
 * Método Filtrado Cruzado - Combinación inteligente de múltiples algoritmos
 */
export class CrossFilterMethod {
  static generatePrediction(lottery: Lottery, historicalResults: LotteryResult[]): MethodResult {
    const { numbersCount, maxNumber, bonusNumbers } = lottery;
    
    // Generar predicciones con todos los métodos
    const anbelResult = AnbelMethod.generatePrediction(lottery, historicalResults);
    const probabilisticResult = ProbabilisticMethod.generatePrediction(lottery, historicalResults);
    const historicalResult = HistoricalMethod.generatePrediction(lottery, historicalResults);
    
    // Combinar resultados usando pesos
    const combinedNumbers = this.combineNumbers(
      [anbelResult, probabilisticResult, historicalResult],
      numbersCount,
      maxNumber
    );
    
    // Generar números bonus
    let bonus: number[] = [];
    if (bonusNumbers && bonusNumbers > 0) {
      while (bonus.length < bonusNumbers) {
        const randomBonus = Math.floor(Math.random() * (lottery.maxBonusNumber || maxNumber)) + 1;
        if (!bonus.includes(randomBonus) && !combinedNumbers.includes(randomBonus)) {
          bonus.push(randomBonus);
        }
      }
    }
    
    // Calcular confianza combinada
    const confidence = this.calculateCombinedConfidence(
      anbelResult.confidence,
      probabilisticResult.confidence,
      historicalResult.confidence
    );
    
    return {
      numbers: combinedNumbers.sort((a, b) => a - b),
      bonusNumbers: bonus.sort((a, b) => a - b),
      confidence,
      method: 'crossfilter'
    };
  }

  private static combineNumbers(results: MethodResult[], targetCount: number, maxNumber: number): number[] {
    const numberScores = new Map<number, number>();
    
    // Calcular puntuación para cada número
    results.forEach((result, index) => {
      const weight = PREDICTION_METHODS[index]?.weight || 0.25;
      
      result.numbers.forEach(number => {
        const currentScore = numberScores.get(number) || 0;
        numberScores.set(number, currentScore + (result.confidence * weight));
      });
    });
    
    // Seleccionar números con mayor puntuación
    const sortedNumbers = Array.from(numberScores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([number]) => number)
      .slice(0, targetCount);
    
    // Completar si es necesario
    while (sortedNumbers.length < targetCount) {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      } while (sortedNumbers.includes(randomNumber));
      sortedNumbers.push(randomNumber);
    }
    
    return sortedNumbers;
  }

  private static calculateCombinedConfidence(anbelConf: number, probConf: number, histConf: number): number {
    const weights = [0.35, 0.25, 0.20]; // Pesos de los métodos
    const confidences = [anbelConf, probConf, histConf];
    
    let combinedConfidence = 0;
    weights.forEach((weight, index) => {
      combinedConfidence += confidences[index] * weight;
    });
    
    // Bonus por combinación exitosa
    if (anbelConf > 80 && probConf > 75 && histConf > 70) {
      combinedConfidence += 5;
    }
    
    return Math.min(Math.round(combinedConfidence), 98);
  }
  /**
   * Calcular tiempo restante hasta el próximo sorteo
   */
  static getTimeUntilNextDraw(prediction: Prediction): string {
    if (!prediction.nextDraw) return 'Fecha no disponible';
    
    const now = new Date();
    const nextDraw = new Date(prediction.nextDraw);
    const diff = nextDraw.getTime() - now.getTime();
    
    if (diff <= 0) return 'Sorteo en curso';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }
}
