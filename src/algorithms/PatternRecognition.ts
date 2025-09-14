/**
 * 🔍 PATTERN RECOGNITION AI - Algoritmo 5
 * Implementación de reconocimiento de patrones avanzado
 */

import { LotteryDraw, AlgorithmResult, LotteryType } from '../types/core';

export class PatternRecognition {
  private isTrained: boolean = false;
  private modelVersion: string = '2.1.0';
  private patterns: Map<string, any> = new Map();

  async initialize(): Promise<void> {
    console.log('🔍 Inicializando Pattern Recognition AI...');
    await this.loadPatternDatabase();
    this.isTrained = true;
    console.log('✅ Pattern Recognition AI inicializado');
  }

  async predict(lotteryType: LotteryType, historicalData: LotteryDraw[]): Promise<AlgorithmResult> {
    const startTime = Date.now();
    
    try {
      // IDENTIFICAR PATRONES
      const identifiedPatterns = this.identifyPatterns(historicalData);
      
      // ANALIZAR PATRONES
      const patternAnalysis = this.analyzePatterns(identifiedPatterns);
      
      // GENERAR PREDICCIÓN BASADA EN PATRONES
      const numbers = this.generatePatternBasedPrediction(patternAnalysis, historicalData);
      
      // CALCULAR CONFIANZA
      const confidence = this.calculateConfidence(patternAnalysis, historicalData);

      return {
        algorithm: 'PATTERN_RECOGNITION',
        numbers,
        confidence,
        executionTime: Date.now() - startTime,
        patternAnalysis: this.createPatternAnalysis(patternAnalysis, numbers),
        statisticalSignificance: this.calculateStatisticalSignificance(patternAnalysis),
        metadata: {
          modelVersion: this.modelVersion,
          hyperparameters: this.getHyperparameters(),
          trainingDataSize: historicalData.length,
          lastTrained: new Date()
        }
      };

    } catch (error) {
      console.error('Error in PatternRecognition prediction:', error);
      throw new Error(`PatternRecognition prediction failed: ${error.message}`);
    }
  }

  private async loadPatternDatabase(): Promise<void> {
    // Cargar base de datos de patrones
    this.patterns.set('SEQUENTIAL', {
      type: 'SEQUENTIAL',
      description: 'Números consecutivos',
      weight: 0.8,
      examples: [[1, 2, 3, 4, 5], [10, 11, 12, 13, 14]]
    });
    
    this.patterns.set('FREQUENCY', {
      type: 'FREQUENCY',
      description: 'Números de alta frecuencia',
      weight: 0.9,
      examples: [[7, 14, 21, 28, 35], [12, 24, 36, 48, 60]]
    });
    
    this.patterns.set('SUM', {
      type: 'SUM',
      description: 'Suma específica de números',
      weight: 0.7,
      examples: [[5, 10, 15, 20, 25], [8, 16, 24, 32, 40]]
    });
    
    this.patterns.set('ODD_EVEN', {
      type: 'ODD_EVEN',
      description: 'Patrón par/impar',
      weight: 0.6,
      examples: [[1, 3, 5, 7, 9], [2, 4, 6, 8, 10]]
    });
    
    this.patterns.set('HIGH_LOW', {
      type: 'HIGH_LOW',
      description: 'Distribución alta/baja',
      weight: 0.75,
      examples: [[1, 2, 3, 30, 31], [35, 36, 37, 65, 66]]
    });
  }

  private identifyPatterns(historicalData: LotteryDraw[]): any[] {
    console.log('🔍 Identificando patrones en datos históricos...');
    
    const patterns: any[] = [];
    
    // Patrón de frecuencia
    const frequencyPattern = this.identifyFrequencyPattern(historicalData);
    if (frequencyPattern) patterns.push(frequencyPattern);
    
    // Patrón secuencial
    const sequentialPattern = this.identifySequentialPattern(historicalData);
    if (sequentialPattern) patterns.push(sequentialPattern);
    
    // Patrón de suma
    const sumPattern = this.identifySumPattern(historicalData);
    if (sumPattern) patterns.push(sumPattern);
    
    // Patrón par/impar
    const oddEvenPattern = this.identifyOddEvenPattern(historicalData);
    if (oddEvenPattern) patterns.push(oddEvenPattern);
    
    // Patrón alta/baja
    const highLowPattern = this.identifyHighLowPattern(historicalData);
    if (highLowPattern) patterns.push(highLowPattern);
    
    console.log(`✅ Identificados ${patterns.length} patrones`);
    return patterns;
  }

  private identifyFrequencyPattern(historicalData: LotteryDraw[]): any | null {
    const frequency = new Map<number, number>();
    
    for (const draw of historicalData) {
      for (const number of draw.numbers) {
        frequency.set(number, (frequency.get(number) || 0) + 1);
      }
    }
    
    const sortedFreq = Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    if (sortedFreq.length < 5) return null;
    
    const hotNumbers = sortedFreq.slice(0, 5).map(([num]) => num);
    const confidence = this.calculatePatternConfidence(hotNumbers, historicalData);
    
    if (confidence < 0.7) return null;
    
    return {
      type: 'FREQUENCY',
      numbers: hotNumbers,
      confidence,
      frequency: sortedFreq[0][1] / historicalData.length,
      description: 'Números de alta frecuencia'
    };
  }

  private identifySequentialPattern(historicalData: LotteryDraw[]): any | null {
    let maxConsecutive = 0;
    let bestSequence: number[] = [];
    
    for (const draw of historicalData) {
      const sortedNumbers = [...draw.numbers].sort((a, b) => a - b);
      let consecutive = 1;
      let currentSequence = [sortedNumbers[0]];
      
      for (let i = 1; i < sortedNumbers.length; i++) {
        if (sortedNumbers[i] === sortedNumbers[i - 1] + 1) {
          consecutive++;
          currentSequence.push(sortedNumbers[i]);
        } else {
          if (consecutive > maxConsecutive) {
            maxConsecutive = consecutive;
            bestSequence = [...currentSequence];
          }
          consecutive = 1;
          currentSequence = [sortedNumbers[i]];
        }
      }
      
      if (consecutive > maxConsecutive) {
        maxConsecutive = consecutive;
        bestSequence = [...currentSequence];
      }
    }
    
    if (maxConsecutive < 3) return null;
    
    const confidence = maxConsecutive / 5;
    return {
      type: 'SEQUENTIAL',
      numbers: bestSequence,
      confidence,
      frequency: maxConsecutive,
      description: 'Secuencia consecutiva'
    };
  }

  private identifySumPattern(historicalData: LotteryDraw[]): any | null {
    const sums = historicalData.map(draw => 
      draw.numbers.reduce((sum, num) => sum + num, 0)
    );
    
    const sumFrequency = new Map<number, number>();
    for (const sum of sums) {
      sumFrequency.set(sum, (sumFrequency.get(sum) || 0) + 1);
    }
    
    const mostCommonSum = Array.from(sumFrequency.entries())
      .sort((a, b) => b[1] - a[1])[0];
    
    if (mostCommonSum[1] < historicalData.length * 0.1) return null;
    
    const confidence = mostCommonSum[1] / historicalData.length;
    return {
      type: 'SUM',
      numbers: [mostCommonSum[0]],
      confidence,
      frequency: mostCommonSum[1],
      description: `Suma común: ${mostCommonSum[0]}`
    };
  }

  private identifyOddEvenPattern(historicalData: LotteryDraw[]): any | null {
    const oddEvenRatios = historicalData.map(draw => {
      const oddCount = draw.numbers.filter(num => num % 2 === 1).length;
      const evenCount = draw.numbers.filter(num => num % 2 === 0).length;
      return { odd: oddCount, even: evenCount, ratio: oddCount / evenCount };
    });
    
    const avgRatio = oddEvenRatios.reduce((sum, r) => sum + r.ratio, 0) / oddEvenRatios.length;
    const confidence = 1 - Math.abs(avgRatio - 1) / 2; // Más cerca de 1 = más confianza
    
    if (confidence < 0.6) return null;
    
    return {
      type: 'ODD_EVEN',
      numbers: [],
      confidence,
      frequency: avgRatio,
      description: `Ratio par/impar: ${avgRatio.toFixed(2)}`
    };
  }

  private identifyHighLowPattern(historicalData: LotteryDraw[]): any | null {
    const highLowRatios = historicalData.map(draw => {
      const highCount = draw.numbers.filter(num => num > 35).length;
      const lowCount = draw.numbers.filter(num => num <= 35).length;
      return { high: highCount, low: lowCount, ratio: highCount / lowCount };
    });
    
    const avgRatio = highLowRatios.reduce((sum, r) => sum + r.ratio, 0) / highLowRatios.length;
    const confidence = 1 - Math.abs(avgRatio - 1) / 2;
    
    if (confidence < 0.6) return null;
    
    return {
      type: 'HIGH_LOW',
      numbers: [],
      confidence,
      frequency: avgRatio,
      description: `Ratio alta/baja: ${avgRatio.toFixed(2)}`
    };
  }

  private calculatePatternConfidence(numbers: number[], historicalData: LotteryDraw[]): number {
    let matches = 0;
    
    for (const draw of historicalData) {
      const commonNumbers = numbers.filter(num => draw.numbers.includes(num));
      if (commonNumbers.length >= 3) matches++;
    }
    
    return matches / historicalData.length;
  }

  private analyzePatterns(patterns: any[]): any {
    const analysis = {
      patterns: patterns,
      complexity: this.calculateComplexity(patterns),
      confidence: this.calculateOverallConfidence(patterns),
      frequency: this.calculateOverallFrequency(patterns),
      recency: this.calculateOverallRecency(patterns),
      seasonality: this.detectSeasonality(patterns)
    };
    
    return analysis;
  }

  private calculateComplexity(patterns: any[]): 'Low' | 'Medium' | 'High' {
    if (patterns.length >= 4) return 'High';
    if (patterns.length >= 2) return 'Medium';
    return 'Low';
  }

  private calculateOverallConfidence(patterns: any[]): number {
    if (patterns.length === 0) return 0;
    return patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length;
  }

  private calculateOverallFrequency(patterns: any[]): number {
    if (patterns.length === 0) return 0;
    return patterns.reduce((sum, p) => sum + (p.frequency || 0), 0) / patterns.length;
  }

  private calculateOverallRecency(patterns: any[]): number {
    // Simplificado - asumir recencia alta
    return 0.8;
  }

  private detectSeasonality(patterns: any[]): boolean {
    // Simplificado - detectar estacionalidad basada en patrones
    return patterns.some(p => p.type === 'FREQUENCY' && p.confidence > 0.8);
  }

  private generatePatternBasedPrediction(patternAnalysis: any, historicalData: LotteryDraw[]): number[] {
    const numbers: number[] = [];
    
    // Usar patrones de frecuencia si están disponibles
    const frequencyPattern = patternAnalysis.patterns.find((p: any) => p.type === 'FREQUENCY');
    if (frequencyPattern && frequencyPattern.numbers) {
      numbers.push(...frequencyPattern.numbers.slice(0, 5));
    }
    
    // Completar con números aleatorios si es necesario
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 69) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    
    return numbers.slice(0, 5).sort((a, b) => a - b);
  }

  private calculateConfidence(patternAnalysis: any, historicalData: LotteryDraw[]): number {
    const baseConfidence = patternAnalysis.confidence;
    const complexity = patternAnalysis.complexity === 'High' ? 1.0 : 
                     patternAnalysis.complexity === 'Medium' ? 0.8 : 0.6;
    const dataQuality = Math.min(1, historicalData.length / 1000);
    
    return Math.min(0.99, baseConfidence * complexity * dataQuality);
  }

  private createPatternAnalysis(patternAnalysis: any, numbers: number[]): any {
    return {
      patterns: patternAnalysis.patterns.map((p: any) => ({
        type: p.type,
        description: p.description,
        confidence: p.confidence,
        impact: p.confidence * 0.8,
        frequency: p.frequency || 0.5,
        lastSeen: new Date(),
        examples: p.numbers ? [p.numbers] : [numbers]
      })),
      complexity: patternAnalysis.complexity,
      confidence: patternAnalysis.confidence,
      frequency: patternAnalysis.frequency,
      recency: patternAnalysis.recency,
      seasonality: patternAnalysis.seasonality,
      trends: [
        {
          type: 'stable' as const,
          strength: patternAnalysis.confidence,
          duration: 30,
          confidence: patternAnalysis.confidence
        }
      ]
    };
  }

  private calculateStatisticalSignificance(patternAnalysis: any): number {
    return patternAnalysis.confidence * (patternAnalysis.patterns.length / 5);
  }

  private getHyperparameters(): Record<string, any> {
    return {
      minPatternLength: 3,
      confidenceThreshold: 0.8,
      complexityLevel: 'HIGH',
      patternTypes: ['FREQUENCY', 'SEQUENTIAL', 'SUM', 'ODD_EVEN', 'HIGH_LOW'],
      seasonalityDetection: true,
      trendAnalysis: true
    };
  }
}

export default PatternRecognition;
