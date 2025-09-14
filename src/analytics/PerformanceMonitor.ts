/**
 * 📊 PERFORMANCE MONITOR - Sistema de Monitoreo de Rendimiento
 * Monitorea y analiza el rendimiento de todos los algoritmos
 */

import { PerformanceMetric, AlgorithmType, LotteryType } from '../types/core';

export interface PerformanceReport {
  id: string;
  timestamp: Date;
  overallPerformance: number;
  algorithmPerformance: Map<AlgorithmType, number>;
  lotteryPerformance: Map<LotteryType, number>;
  recommendations: string[];
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  algorithm?: AlgorithmType;
  lotteryType?: LotteryType;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private monitoringInterval: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private alerts: Alert[] = [];

  start(): void {
    if (this.isRunning) return;

    console.log('📊 Iniciando monitoreo de performance...');
    
    this.isRunning = true;
    
    // MONITOREO CADA 1 MINUTO
    this.monitoringInterval = setInterval(() => {
      this.performMonitoringCycle();
    }, 60000); // 1 minuto

    // EJECUTAR PRIMER CICLO INMEDIATAMENTE
    this.performMonitoringCycle();
  }

  stop(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isRunning = false;
    console.log('🛑 Monitoreo de performance detenido');
  }

  private performMonitoringCycle(): void {
    try {
      console.log('📊 Ejecutando ciclo de monitoreo...');
      
      // ANALIZAR MÉTRICAS RECIENTES
      const recentMetrics = this.getRecentMetrics();
      
      // CALCULAR RENDIMIENTO GENERAL
      const overallPerformance = this.calculateOverallPerformance(recentMetrics);
      
      // ANALIZAR RENDIMIENTO POR ALGORITMO
      const algorithmPerformance = this.analyzeAlgorithmPerformance(recentMetrics);
      
      // ANALIZAR RENDIMIENTO POR LOTERÍA
      const lotteryPerformance = this.analyzeLotteryPerformance(recentMetrics);
      
      // GENERAR RECOMENDACIONES
      const recommendations = this.generateRecommendations(overallPerformance, algorithmPerformance, lotteryPerformance);
      
      // VERIFICAR ALERTAS
      this.checkAlerts(overallPerformance, algorithmPerformance, lotteryPerformance);
      
      // GENERAR REPORTE
      const report = this.generatePerformanceReport(
        overallPerformance,
        algorithmPerformance,
        lotteryPerformance,
        recommendations
      );
      
      console.log(`✅ Ciclo de monitoreo completado. Rendimiento general: ${(overallPerformance * 100).toFixed(2)}%`);
      
    } catch (error) {
      console.error('❌ Error en ciclo de monitoreo:', error);
    }
  }

  private getRecentMetrics(): PerformanceMetric[] {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return this.metrics.filter(metric => metric.timestamp >= oneHourAgo);
  }

  private calculateOverallPerformance(metrics: PerformanceMetric[]): number {
    if (metrics.length === 0) return 0;
    
    const avgAccuracy = metrics.reduce((sum, m) => sum + m.accuracy, 0) / metrics.length;
    const avgPrecision = metrics.reduce((sum, m) => sum + m.precision, 0) / metrics.length;
    const avgRecall = metrics.reduce((sum, m) => sum + m.recall, 0) / metrics.length;
    const avgF1Score = metrics.reduce((sum, m) => sum + m.f1Score, 0) / metrics.length;
    
    return (avgAccuracy + avgPrecision + avgRecall + avgF1Score) / 4;
  }

  private analyzeAlgorithmPerformance(metrics: PerformanceMetric[]): Map<AlgorithmType, number> {
    const performance = new Map<AlgorithmType, number>();
    const algorithms = [...new Set(metrics.map(m => m.algorithm))];
    
    for (const algorithm of algorithms) {
      const algorithmMetrics = metrics.filter(m => m.algorithm === algorithm);
      if (algorithmMetrics.length > 0) {
        const avgPerformance = this.calculateOverallPerformance(algorithmMetrics);
        performance.set(algorithm, avgPerformance);
      }
    }
    
    return performance;
  }

  private analyzeLotteryPerformance(metrics: PerformanceMetric[]): Map<LotteryType, number> {
    const performance = new Map<LotteryType, number>();
    const lotteries = [...new Set(metrics.map(m => m.lotteryType))];
    
    for (const lottery of lotteries) {
      const lotteryMetrics = metrics.filter(m => m.lotteryType === lottery);
      if (lotteryMetrics.length > 0) {
        const avgPerformance = this.calculateOverallPerformance(lotteryMetrics);
        performance.set(lottery, avgPerformance);
      }
    }
    
    return performance;
  }

  private generateRecommendations(
    overallPerformance: number,
    algorithmPerformance: Map<AlgorithmType, number>,
    lotteryPerformance: Map<LotteryType, number>
  ): string[] {
    const recommendations: string[] = [];
    
    // Recomendaciones basadas en rendimiento general
    if (overallPerformance < 0.7) {
      recommendations.push('Rendimiento general bajo. Considerar re-entrenamiento de modelos.');
    }
    
    if (overallPerformance < 0.5) {
      recommendations.push('Rendimiento crítico. Revisar configuración de algoritmos.');
    }
    
    // Recomendaciones por algoritmo
    for (const [algorithm, performance] of algorithmPerformance) {
      if (performance < 0.6) {
        recommendations.push(`Algoritmo ${algorithm} con rendimiento bajo (${(performance * 100).toFixed(1)}%). Considerar optimización.`);
      }
    }
    
    // Recomendaciones por lotería
    for (const [lottery, performance] of lotteryPerformance) {
      if (performance < 0.6) {
        recommendations.push(`Lotería ${lottery} con rendimiento bajo (${(performance * 100).toFixed(1)}%). Revisar datos históricos.`);
      }
    }
    
    // Recomendaciones de optimización
    if (overallPerformance > 0.8) {
      recommendations.push('Rendimiento excelente. Considerar aumentar frecuencia de predicciones.');
    }
    
    return recommendations;
  }

  private checkAlerts(
    overallPerformance: number,
    algorithmPerformance: Map<AlgorithmType, number>,
    lotteryPerformance: Map<LotteryType, number>
  ): void {
    // Alerta de rendimiento crítico
    if (overallPerformance < 0.3) {
      this.addAlert({
        type: 'error',
        message: `Rendimiento crítico: ${(overallPerformance * 100).toFixed(1)}%`,
        algorithm: undefined,
        lotteryType: undefined
      });
    }
    
    // Alerta de rendimiento bajo
    if (overallPerformance < 0.5) {
      this.addAlert({
        type: 'warning',
        message: `Rendimiento bajo: ${(overallPerformance * 100).toFixed(1)}%`,
        algorithm: undefined,
        lotteryType: undefined
      });
    }
    
    // Alertas por algoritmo
    for (const [algorithm, performance] of algorithmPerformance) {
      if (performance < 0.4) {
        this.addAlert({
          type: 'error',
          message: `Algoritmo ${algorithm} con rendimiento crítico: ${(performance * 100).toFixed(1)}%`,
          algorithm,
          lotteryType: undefined
        });
      } else if (performance < 0.6) {
        this.addAlert({
          type: 'warning',
          message: `Algoritmo ${algorithm} con rendimiento bajo: ${(performance * 100).toFixed(1)}%`,
          algorithm,
          lotteryType: undefined
        });
      }
    }
    
    // Alertas por lotería
    for (const [lottery, performance] of lotteryPerformance) {
      if (performance < 0.4) {
        this.addAlert({
          type: 'error',
          message: `Lotería ${lottery} con rendimiento crítico: ${(performance * 100).toFixed(1)}%`,
          algorithm: undefined,
          lotteryType: lottery
        });
      } else if (performance < 0.6) {
        this.addAlert({
          type: 'warning',
          message: `Lotería ${lottery} con rendimiento bajo: ${(performance * 100).toFixed(1)}%`,
          algorithm: undefined,
          lotteryType: lottery
        });
      }
    }
  }

  private addAlert(alert: Omit<Alert, 'id' | 'timestamp'>): void {
    const newAlert: Alert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...alert
    };
    
    this.alerts.push(newAlert);
    
    // Mantener solo los últimos 1000 alertas
    if (this.alerts.length > 1000) {
      this.alerts = this.alerts.slice(-1000);
    }
    
    console.log(`🚨 Alerta ${alert.type}: ${alert.message}`);
  }

  private generatePerformanceReport(
    overallPerformance: number,
    algorithmPerformance: Map<AlgorithmType, number>,
    lotteryPerformance: Map<LotteryType, number>,
    recommendations: string[]
  ): PerformanceReport {
    return {
      id: `report_${Date.now()}`,
      timestamp: new Date(),
      overallPerformance,
      algorithmPerformance,
      lotteryPerformance,
      recommendations,
      alerts: this.getRecentAlerts()
    };
  }

  private getRecentAlerts(): Alert[] {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return this.alerts.filter(alert => alert.timestamp >= oneHourAgo);
  }

  // MÉTODOS PÚBLICOS
  public addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);
    
    // Mantener solo los últimos 10000 registros
    if (this.metrics.length > 10000) {
      this.metrics = this.metrics.slice(-10000);
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return this.metrics;
  }

  public getRecentMetrics(hours: number = 1): PerformanceMetric[] {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.metrics.filter(metric => metric.timestamp >= cutoffTime);
  }

  public getAlerts(): Alert[] {
    return this.alerts;
  }

  public getRecentAlerts(hours: number = 1): Alert[] {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.alerts.filter(alert => alert.timestamp >= cutoffTime);
  }

  public getPerformanceSummary(): any {
    const recentMetrics = this.getRecentMetrics(1);
    const overallPerformance = this.calculateOverallPerformance(recentMetrics);
    const algorithmPerformance = this.analyzeAlgorithmPerformance(recentMetrics);
    const lotteryPerformance = this.analyzeLotteryPerformance(recentMetrics);
    
    return {
      overallPerformance,
      algorithmPerformance: Object.fromEntries(algorithmPerformance),
      lotteryPerformance: Object.fromEntries(lotteryPerformance),
      totalMetrics: this.metrics.length,
      recentAlerts: this.getRecentAlerts(1).length,
      isRunning: this.isRunning
    };
  }

  public clearOldData(days: number = 7): void {
    const cutoffTime = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const oldMetricsCount = this.metrics.length;
    const oldAlertsCount = this.alerts.length;
    
    this.metrics = this.metrics.filter(metric => metric.timestamp >= cutoffTime);
    this.alerts = this.alerts.filter(alert => alert.timestamp >= cutoffTime);
    
    console.log(`🧹 Datos antiguos eliminados: ${oldMetricsCount - this.metrics.length} métricas, ${oldAlertsCount - this.alerts.length} alertas`);
  }

  public isSystemRunning(): boolean {
    return this.isRunning;
  }

  public getSystemStatus(): any {
    return {
      isRunning: this.isRunning,
      totalMetrics: this.metrics.length,
      totalAlerts: this.alerts.length,
      recentMetrics: this.getRecentMetrics(1).length,
      recentAlerts: this.getRecentAlerts(1).length,
      lastUpdate: new Date()
    };
  }
}

export default PerformanceMonitor;
