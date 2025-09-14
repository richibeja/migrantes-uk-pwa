/**
 * ⏰ TEMPORAL ANALYSIS ADVANCED - Algoritmo 6
 * Implementación de análisis temporal avanzado
 */

import { LotteryDraw, AlgorithmResult, LotteryType } from '../types/core';

export class TemporalAnalysis {
  private isTrained: boolean = false;
  private modelVersion: string = '2.1.0';
  private timeWindows: string[] = ['daily', 'weekly', 'monthly'];

  async initialize(): Promise<void> {
    console.log('⏰ Inicializando Temporal Analysis Advanced...');
    this.isTrained = true;
    console.log('✅ Temporal Analysis Advanced inicializado');
  }

  async predict(lotteryType: LotteryType, historicalData: LotteryDraw[]): Promise<AlgorithmResult> {
    const startTime = Date.now();
    
    try {
      // ANÁLISIS TEMPORAL MULTI-VENTANA
      const temporalAnalysis = this.performTemporalAnalysis(historicalData);
      
      // DETECCIÓN DE TENDENCIAS
      const trends = this.detectTrends(historicalData);
      
      // ANÁLISIS DE ESTACIONALIDAD
      const seasonality = this.analyzeSeasonality(historicalData);
      
      // GENERAR PREDICCIÓN TEMPORAL
      const numbers = this.generateTemporalPrediction(temporalAnalysis, trends, seasonality);
      
      // CALCULAR CONFIANZA
      const confidence = this.calculateConfidence(temporalAnalysis, trends, seasonality);

      return {
        algorithm: 'TEMPORAL_ANALYSIS',
        numbers,
        confidence,
        executionTime: Date.now() - startTime,
        patternAnalysis: this.createTemporalPatternAnalysis(temporalAnalysis, trends, seasonality, numbers),
        statisticalSignificance: this.calculateStatisticalSignificance(temporalAnalysis),
        metadata: {
          modelVersion: this.modelVersion,
          hyperparameters: this.getHyperparameters(),
          trainingDataSize: historicalData.length,
          lastTrained: new Date()
        }
      };

    } catch (error) {
      console.error('Error in TemporalAnalysis prediction:', error);
      throw new Error(`TemporalAnalysis prediction failed: ${error.message}`);
    }
  }

  private performTemporalAnalysis(historicalData: LotteryDraw[]): any {
    console.log('⏰ Realizando análisis temporal multi-ventana...');
    
    const analysis = {
      daily: this.analyzeTimeWindow(historicalData, 'daily'),
      weekly: this.analyzeTimeWindow(historicalData, 'weekly'),
      monthly: this.analyzeTimeWindow(historicalData, 'monthly'),
      overall: this.analyzeOverallTemporalPatterns(historicalData)
    };
    
    return analysis;
  }

  private analyzeTimeWindow(historicalData: LotteryDraw[], window: string): any {
    const windowData = this.filterByTimeWindow(historicalData, window);
    
    if (windowData.length === 0) {
      return { confidence: 0, patterns: [], frequency: 0 };
    }
    
    const frequency = this.calculateFrequencyByWindow(windowData);
    const patterns = this.identifyTemporalPatterns(windowData, window);
    const confidence = this.calculateWindowConfidence(windowData, patterns);
    
    return {
      confidence,
      patterns,
      frequency,
      dataSize: windowData.length,
      window
    };
  }

  private filterByTimeWindow(historicalData: LotteryDraw[], window: string): LotteryDraw[] {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (window) {
      case 'daily':
        cutoffDate.setDate(now.getDate() - 1);
        break;
      case 'weekly':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      default:
        return historicalData;
    }
    
    return historicalData.filter(draw => new Date(draw.drawDate) >= cutoffDate);
  }

  private calculateFrequencyByWindow(data: LotteryDraw[]): Map<number, number> {
    const frequency = new Map<number, number>();
    
    for (const draw of data) {
      for (const number of draw.numbers) {
        frequency.set(number, (frequency.get(number) || 0) + 1);
      }
    }
    
    return frequency;
  }

  private identifyTemporalPatterns(data: LotteryDraw[], window: string): any[] {
    const patterns: any[] = [];
    
    // Patrón de frecuencia temporal
    const freqPattern = this.identifyTemporalFrequencyPattern(data, window);
    if (freqPattern) patterns.push(freqPattern);
    
    // Patrón de tendencia temporal
    const trendPattern = this.identifyTemporalTrendPattern(data, window);
    if (trendPattern) patterns.push(trendPattern);
    
    // Patrón de ciclicidad
    const cyclePattern = this.identifyTemporalCyclePattern(data, window);
    if (cyclePattern) patterns.push(cyclePattern);
    
    return patterns;
  }

  private identifyTemporalFrequencyPattern(data: LotteryDraw[], window: string): any | null {
    const frequency = this.calculateFrequencyByWindow(data);
    const sortedFreq = Array.from(frequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    if (sortedFreq.length < 3) return null;
    
    const confidence = sortedFreq[0][1] / data.length;
    if (confidence < 0.3) return null;
    
    return {
      type: 'TEMPORAL_FREQUENCY',
      numbers: sortedFreq.map(([num]) => num),
      confidence,
      window,
      description: `Frecuencia temporal en ventana ${window}`
    };
  }

  private identifyTemporalTrendPattern(data: LotteryDraw[], window: string): any | null {
    if (data.length < 5) return null;
    
    const numbers = data.flatMap(draw => draw.numbers);
    const trend = this.calculateTrend(numbers);
    
    if (Math.abs(trend) < 0.1) return null;
    
    return {
      type: 'TEMPORAL_TREND',
      trend: trend > 0 ? 'increasing' : 'decreasing',
      confidence: Math.abs(trend),
      window,
      description: `Tendencia ${trend > 0 ? 'creciente' : 'decreciente'} en ${window}`
    };
  }

  private identifyTemporalCyclePattern(data: LotteryDraw[], window: string): any | null {
    if (data.length < 10) return null;
    
    const cycleLength = this.detectCycleLength(data);
    if (cycleLength < 3) return null;
    
    return {
      type: 'TEMPORAL_CYCLE',
      cycleLength,
      confidence: 0.7,
      window,
      description: `Ciclo de ${cycleLength} sorteos en ${window}`
    };
  }

  private calculateTrend(numbers: number[]): number {
    // Calcular tendencia usando regresión lineal simple
    const n = numbers.length;
    const x = Array.from({ length: n }, (_, i) => i);
    const y = numbers;
    
    const sumX = x.reduce((sum, val) => sum + val, 0);
    const sumY = y.reduce((sum, val) => sum + val, 0);
    const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
    const sumXX = x.reduce((sum, val) => sum + val * val, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
  }

  private detectCycleLength(data: LotteryDraw[]): number {
    // Detectar longitud de ciclo usando autocorrelación
    const numbers = data.map(draw => draw.numbers.reduce((sum, num) => sum + num, 0));
    
    let maxCorrelation = 0;
    let bestCycleLength = 0;
    
    for (let cycle = 3; cycle < Math.min(20, data.length / 2); cycle++) {
      const correlation = this.calculateAutocorrelation(numbers, cycle);
      if (correlation > maxCorrelation) {
        maxCorrelation = correlation;
        bestCycleLength = cycle;
      }
    }
    
    return maxCorrelation > 0.5 ? bestCycleLength : 0;
  }

  private calculateAutocorrelation(numbers: number[], lag: number): number {
    if (numbers.length < lag * 2) return 0;
    
    const n = numbers.length - lag;
    const mean = numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
    
    let numerator = 0;
    let denominator = 0;
    
    for (let i = 0; i < n; i++) {
      const diff1 = numbers[i] - mean;
      const diff2 = numbers[i + lag] - mean;
      numerator += diff1 * diff2;
      denominator += diff1 * diff1;
    }
    
    return denominator === 0 ? 0 : numerator / denominator;
  }

  private calculateWindowConfidence(data: LotteryDraw[], patterns: any[]): number {
    const dataQuality = Math.min(1, data.length / 50);
    const patternConfidence = patterns.length > 0 ? 
      patterns.reduce((sum, p) => sum + p.confidence, 0) / patterns.length : 0;
    
    return dataQuality * patternConfidence;
  }

  private analyzeOverallTemporalPatterns(historicalData: LotteryDraw[]): any {
    const allNumbers = historicalData.flatMap(draw => draw.numbers);
    const overallFrequency = this.calculateFrequencyByWindow(historicalData);
    const overallTrend = this.calculateTrend(allNumbers);
    const seasonality = this.detectOverallSeasonality(historicalData);
    
    return {
      frequency: overallFrequency,
      trend: overallTrend,
      seasonality,
      dataSize: historicalData.length,
      confidence: 0.8
    };
  }

  private detectOverallSeasonality(historicalData: LotteryDraw[]): boolean {
    // Detectar estacionalidad general
    const monthlyData = this.groupByMonth(historicalData);
    const monthlyFreq = Array.from(monthlyData.values()).map(data => 
      data.flatMap(draw => draw.numbers).length
    );
    
    const variance = this.calculateVariance(monthlyFreq);
    const mean = monthlyFreq.reduce((sum, val) => sum + val, 0) / monthlyFreq.length;
    
    return variance / mean > 0.2; // Si la varianza es > 20% de la media
  }

  private groupByMonth(historicalData: LotteryDraw[]): Map<string, LotteryDraw[]> {
    const grouped = new Map<string, LotteryDraw[]>();
    
    for (const draw of historicalData) {
      const month = new Date(draw.drawDate).toISOString().substring(0, 7);
      if (!grouped.has(month)) {
        grouped.set(month, []);
      }
      grouped.get(month)!.push(draw);
    }
    
    return grouped;
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return variance;
  }

  private detectTrends(historicalData: LotteryDraw[]): any[] {
    const trends: any[] = [];
    
    // Tendencia general
    const overallTrend = this.analyzeOverallTemporalPatterns(historicalData);
    if (Math.abs(overallTrend.trend) > 0.1) {
      trends.push({
        type: 'OVERALL_TREND',
        direction: overallTrend.trend > 0 ? 'increasing' : 'decreasing',
        strength: Math.abs(overallTrend.trend),
        confidence: 0.8
      });
    }
    
    // Tendencia estacional
    if (overallTrend.seasonality) {
      trends.push({
        type: 'SEASONAL_TREND',
        direction: 'cyclical',
        strength: 0.7,
        confidence: 0.6
      });
    }
    
    return trends;
  }

  private analyzeSeasonality(historicalData: LotteryDraw[]): any {
    const seasonality = {
      detected: this.detectOverallSeasonality(historicalData),
      patterns: this.identifySeasonalPatterns(historicalData),
      confidence: 0.7
    };
    
    return seasonality;
  }

  private identifySeasonalPatterns(historicalData: LotteryDraw[]): any[] {
    const patterns: any[] = [];
    
    // Patrón mensual
    const monthlyPattern = this.analyzeMonthlyPattern(historicalData);
    if (monthlyPattern) patterns.push(monthlyPattern);
    
    // Patrón semanal
    const weeklyPattern = this.analyzeWeeklyPattern(historicalData);
    if (weeklyPattern) patterns.push(weeklyPattern);
    
    return patterns;
  }

  private analyzeMonthlyPattern(historicalData: LotteryDraw[]): any | null {
    const monthlyData = this.groupByMonth(historicalData);
    if (monthlyData.size < 3) return null;
    
    const monthlyFreq = Array.from(monthlyData.entries()).map(([month, data]) => ({
      month,
      frequency: data.length
    }));
    
    const variance = this.calculateVariance(monthlyFreq.map(m => m.frequency));
    const mean = monthlyFreq.reduce((sum, m) => sum + m.frequency, 0) / monthlyFreq.length;
    
    if (variance / mean < 0.2) return null;
    
    return {
      type: 'MONTHLY_PATTERN',
      confidence: Math.min(1, variance / mean),
      description: 'Patrón mensual detectado'
    };
  }

  private analyzeWeeklyPattern(historicalData: LotteryDraw[]): any | null {
    const weeklyData = this.groupByDayOfWeek(historicalData);
    if (weeklyData.size < 3) return null;
    
    const weeklyFreq = Array.from(weeklyData.entries()).map(([day, data]) => ({
      day,
      frequency: data.length
    }));
    
    const variance = this.calculateVariance(weeklyFreq.map(w => w.frequency));
    const mean = weeklyFreq.reduce((sum, w) => sum + w.frequency, 0) / weeklyFreq.length;
    
    if (variance / mean < 0.3) return null;
    
    return {
      type: 'WEEKLY_PATTERN',
      confidence: Math.min(1, variance / mean),
      description: 'Patrón semanal detectado'
    };
  }

  private groupByDayOfWeek(historicalData: LotteryDraw[]): Map<number, LotteryDraw[]> {
    const grouped = new Map<number, LotteryDraw[]>();
    
    for (const draw of historicalData) {
      const dayOfWeek = new Date(draw.drawDate).getDay();
      if (!grouped.has(dayOfWeek)) {
        grouped.set(dayOfWeek, []);
      }
      grouped.get(dayOfWeek)!.push(draw);
    }
    
    return grouped;
  }

  private generateTemporalPrediction(temporalAnalysis: any, trends: any[], seasonality: any): number[] {
    const numbers: number[] = [];
    
    // Usar patrones de frecuencia temporal
    const dailyPattern = temporalAnalysis.daily.patterns.find((p: any) => p.type === 'TEMPORAL_FREQUENCY');
    if (dailyPattern && dailyPattern.numbers) {
      numbers.push(...dailyPattern.numbers.slice(0, 3));
    }
    
    const weeklyPattern = temporalAnalysis.weekly.patterns.find((p: any) => p.type === 'TEMPORAL_FREQUENCY');
    if (weeklyPattern && weeklyPattern.numbers) {
      numbers.push(...weeklyPattern.numbers.slice(0, 2));
    }
    
    // Completar con números aleatorios
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 69) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    
    return numbers.slice(0, 5).sort((a, b) => a - b);
  }

  private calculateConfidence(temporalAnalysis: any, trends: any[], seasonality: any): number {
    const dailyConfidence = temporalAnalysis.daily.confidence;
    const weeklyConfidence = temporalAnalysis.weekly.confidence;
    const monthlyConfidence = temporalAnalysis.monthly.confidence;
    const trendConfidence = trends.length > 0 ? 
      trends.reduce((sum, t) => sum + t.confidence, 0) / trends.length : 0;
    const seasonalityConfidence = seasonality.confidence;
    
    const avgConfidence = (dailyConfidence + weeklyConfidence + monthlyConfidence + 
                          trendConfidence + seasonalityConfidence) / 5;
    
    return Math.min(0.99, avgConfidence);
  }

  private createTemporalPatternAnalysis(temporalAnalysis: any, trends: any[], seasonality: any, numbers: number[]): any {
    const patterns = [
      ...temporalAnalysis.daily.patterns,
      ...temporalAnalysis.weekly.patterns,
      ...temporalAnalysis.monthly.patterns
    ].map((p: any) => ({
      type: p.type,
      description: p.description,
      confidence: p.confidence,
      impact: p.confidence * 0.8,
      frequency: p.frequency || 0.5,
      lastSeen: new Date(),
      examples: p.numbers ? [p.numbers] : [numbers]
    }));
    
    return {
      patterns,
      complexity: 'High' as const,
      confidence: this.calculateConfidence(temporalAnalysis, trends, seasonality),
      frequency: temporalAnalysis.overall.frequency,
      recency: 0.9,
      seasonality: seasonality.detected,
      trends: trends.map(t => ({
        type: t.direction as any,
        strength: t.strength,
        duration: 30,
        confidence: t.confidence
      }))
    };
  }

  private calculateStatisticalSignificance(temporalAnalysis: any): number {
    const dataSize = temporalAnalysis.overall.dataSize;
    const confidence = temporalAnalysis.overall.confidence;
    
    return Math.min(0.99, confidence * (dataSize / 1000));
  }

  private getHyperparameters(): Record<string, any> {
    return {
      timeWindows: this.timeWindows,
      seasonality: true,
      trendAnalysis: true,
      cycleDetection: true,
      autocorrelationThreshold: 0.5,
      seasonalityThreshold: 0.2
    };
  }
}

export default TemporalAnalysis;
