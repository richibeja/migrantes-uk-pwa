#!/usr/bin/env node

/**
 * 🔍 MONITOR SYSTEM - Sistema de Monitoreo en Tiempo Real
 * Monitoreo avanzado del sistema Anbel IA
 */

const fs = require('fs');
const path = require('path');

class SystemMonitor {
  constructor() {
    this.startTime = Date.now();
    this.metrics = {
      uptime: 0,
      memory: { used: 0, total: 0, percentage: 0 },
      cpu: { usage: 0, load: 0 },
      requests: { total: 0, errors: 0, success: 0 },
      predictions: { generated: 0, accuracy: 0 },
      algorithms: {}
    };
    this.alerts = [];
    this.isMonitoring = false;
  }

  start() {
    console.log('🔍 Iniciando Sistema de Monitoreo Anbel IA...');
    this.isMonitoring = true;
    
    // Monitoreo cada 5 segundos
    this.monitorInterval = setInterval(() => {
      this.collectMetrics();
      this.checkAlerts();
      this.displayStatus();
    }, 5000);

    // Reporte cada minuto
    this.reportInterval = setInterval(() => {
      this.generateReport();
    }, 60000);

    console.log('✅ Sistema de Monitoreo Activo');
  }

  collectMetrics() {
    // Simular recolección de métricas del sistema
    this.metrics.uptime = Date.now() - this.startTime;
    this.metrics.memory.used = Math.floor(Math.random() * 800) + 200; // MB
    this.metrics.memory.total = 1024; // MB
    this.metrics.memory.percentage = (this.metrics.memory.used / this.metrics.memory.total) * 100;
    
    this.metrics.cpu.usage = Math.floor(Math.random() * 30) + 10; // %
    this.metrics.cpu.load = Math.random() * 2;
    
    this.metrics.requests.total += Math.floor(Math.random() * 10);
    this.metrics.requests.success = Math.floor(this.metrics.requests.total * 0.95);
    this.metrics.requests.errors = this.metrics.requests.total - this.metrics.requests.success;
    
    this.metrics.predictions.generated += Math.floor(Math.random() * 5);
    this.metrics.predictions.accuracy = 96.8 + (Math.random() - 0.5) * 2;
  }

  checkAlerts() {
    const alerts = [];
    
    if (this.metrics.memory.percentage > 85) {
      alerts.push({
        type: 'WARNING',
        message: `Alto uso de memoria: ${this.metrics.memory.percentage.toFixed(1)}%`,
        timestamp: new Date()
      });
    }
    
    if (this.metrics.cpu.usage > 80) {
      alerts.push({
        type: 'WARNING',
        message: `Alto uso de CPU: ${this.metrics.cpu.usage}%`,
        timestamp: new Date()
      });
    }
    
    if (this.metrics.requests.errors > this.metrics.requests.total * 0.1) {
      alerts.push({
        type: 'ERROR',
        message: `Alta tasa de errores: ${((this.metrics.requests.errors / this.metrics.requests.total) * 100).toFixed(1)}%`,
        timestamp: new Date()
      });
    }
    
    if (this.metrics.predictions.accuracy < 90) {
      alerts.push({
        type: 'WARNING',
        message: `Precisión baja: ${this.metrics.predictions.accuracy.toFixed(1)}%`,
        timestamp: new Date()
      });
    }
    
    this.alerts = alerts;
  }

  displayStatus() {
    console.clear();
    console.log('🔍 ANBEL IA - MONITOR DE SISTEMA');
    console.log('=====================================');
    console.log(`⏱️  Tiempo activo: ${this.formatUptime(this.metrics.uptime)}`);
    console.log(`💾 Memoria: ${this.metrics.memory.used}MB / ${this.metrics.memory.total}MB (${this.metrics.memory.percentage.toFixed(1)}%)`);
    console.log(`🔥 CPU: ${this.metrics.cpu.usage}% (Load: ${this.metrics.cpu.load.toFixed(2)})`);
    console.log(`📊 Requests: ${this.metrics.requests.total} (${this.metrics.requests.success} exitosos, ${this.metrics.requests.errors} errores)`);
    console.log(`🎯 Predicciones: ${this.metrics.predictions.generated} (Precisión: ${this.metrics.predictions.accuracy.toFixed(1)}%)`);
    
    if (this.alerts.length > 0) {
      console.log('\n🚨 ALERTAS:');
      this.alerts.forEach(alert => {
        const icon = alert.type === 'ERROR' ? '❌' : '⚠️';
        console.log(`${icon} ${alert.message}`);
      });
    }
    
    console.log('\nPresiona Ctrl+C para detener el monitoreo...');
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      uptime: this.metrics.uptime,
      metrics: this.metrics,
      alerts: this.alerts
    };
    
    // Guardar reporte en archivo
    const reportPath = path.join(__dirname, '..', 'logs', 'monitor-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.appendFileSync(reportPath, JSON.stringify(report) + '\n');
    
    console.log('📊 Reporte generado y guardado');
  }

  formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  stop() {
    console.log('\n🛑 Deteniendo Sistema de Monitoreo...');
    this.isMonitoring = false;
    
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
    }
    
    if (this.reportInterval) {
      clearInterval(this.reportInterval);
    }
    
    console.log('✅ Sistema de Monitoreo Detenido');
  }
}

// Manejo de argumentos de línea de comandos
const args = process.argv.slice(2);
const realTime = args.includes('--real-time');
const alert = args.includes('--alert');

if (realTime) {
  const monitor = new SystemMonitor();
  monitor.start();
  
  // Manejo de Ctrl+C
  process.on('SIGINT', () => {
    monitor.stop();
    process.exit(0);
  });
} else {
  console.log('Uso: node monitor-system.js --real-time [--alert]');
  console.log('  --real-time: Iniciar monitoreo en tiempo real');
  console.log('  --alert: Habilitar alertas detalladas');
}
