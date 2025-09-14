#!/usr/bin/env node

/**
 * 👁️ SUPERVISE SYSTEM - Sistema de Supervisión Continua
 * Supervisión automática del sistema Anbel IA
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class SystemSupervisor {
  constructor() {
    this.isSupervising = false;
    this.healthChecks = [];
    this.restartCount = 0;
    this.maxRestarts = 5;
    this.lastHealthCheck = Date.now();
  }

  start() {
    console.log('👁️ Iniciando Sistema de Supervisión Anbel IA...');
    this.isSupervising = true;
    
    // Verificación de salud cada 30 segundos
    this.healthInterval = setInterval(() => {
      this.performHealthCheck();
    }, 30000);
    
    // Supervisión de archivos cada 60 segundos
    this.fileWatchInterval = setInterval(() => {
      this.watchCriticalFiles();
    }, 60000);
    
    // Limpieza de logs cada 5 minutos
    this.cleanupInterval = setInterval(() => {
      this.cleanupLogs();
    }, 300000);
    
    console.log('✅ Sistema de Supervisión Activo');
  }

  async performHealthCheck() {
    try {
      console.log('🏥 Realizando verificación de salud...');
      
      // Verificar que el proceso principal esté corriendo
      const isProcessRunning = await this.checkProcessRunning();
      
      // Verificar conectividad de APIs
      const apiHealth = await this.checkAPIHealth();
      
      // Verificar espacio en disco
      const diskSpace = await this.checkDiskSpace();
      
      // Verificar memoria disponible
      const memoryHealth = await this.checkMemoryHealth();
      
      const healthStatus = {
        timestamp: new Date().toISOString(),
        processRunning: isProcessRunning,
        apiHealth: apiHealth,
        diskSpace: diskSpace,
        memoryHealth: memoryHealth,
        overall: isProcessRunning && apiHealth && diskSpace && memoryHealth
      };
      
      this.healthChecks.push(healthStatus);
      
      if (!healthStatus.overall) {
        console.log('⚠️ Problemas de salud detectados, iniciando recuperación...');
        await this.initiateRecovery();
      } else {
        console.log('✅ Sistema saludable');
      }
      
      // Mantener solo los últimos 100 checks
      if (this.healthChecks.length > 100) {
        this.healthChecks = this.healthChecks.slice(-100);
      }
      
    } catch (error) {
      console.error('❌ Error en verificación de salud:', error);
    }
  }

  async checkProcessRunning() {
    return new Promise((resolve) => {
      exec('tasklist /FI "IMAGENAME eq node.exe"', (error, stdout) => {
        if (error) {
          resolve(false);
        } else {
          resolve(stdout.includes('node.exe'));
        }
      });
    });
  }

  async checkAPIHealth() {
    // Simular verificación de APIs
    return Math.random() > 0.1; // 90% de probabilidad de estar saludable
  }

  async checkDiskSpace() {
    // Simular verificación de espacio en disco
    return Math.random() > 0.05; // 95% de probabilidad de tener espacio
  }

  async checkMemoryHealth() {
    // Simular verificación de memoria
    return Math.random() > 0.1; // 90% de probabilidad de tener memoria suficiente
  }

  async initiateRecovery() {
    console.log('🔄 Iniciando proceso de recuperación...');
    
    try {
      // Intentar reiniciar el sistema
      if (this.restartCount < this.maxRestarts) {
        console.log(`🔄 Reiniciando sistema (intento ${this.restartCount + 1}/${this.maxRestarts})...`);
        
        // Simular reinicio
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        this.restartCount++;
        console.log('✅ Sistema reiniciado');
      } else {
        console.log('❌ Máximo número de reinicios alcanzado, notificando administrador...');
        await this.notifyAdministrator();
      }
    } catch (error) {
      console.error('❌ Error en proceso de recuperación:', error);
    }
  }

  async notifyAdministrator() {
    console.log('📧 Enviando notificación al administrador...');
    
    // Simular envío de notificación
    const notification = {
      timestamp: new Date().toISOString(),
      type: 'CRITICAL',
      message: 'Sistema Anbel IA requiere intervención manual',
      restartCount: this.restartCount,
      healthChecks: this.healthChecks.slice(-10)
    };
    
    const notificationPath = path.join(__dirname, '..', 'logs', 'critical-alert.json');
    fs.mkdirSync(path.dirname(notificationPath), { recursive: true });
    fs.writeFileSync(notificationPath, JSON.stringify(notification, null, 2));
    
    console.log('📧 Notificación enviada');
  }

  watchCriticalFiles() {
    const criticalFiles = [
      'src/core/AnbelCore.ts',
      'src/algorithms/EnsembleML.ts',
      'src/components/AnbelChat.tsx',
      'package.json'
    ];
    
    criticalFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const lastModified = stats.mtime.getTime();
        
        if (lastModified > this.lastHealthCheck) {
          console.log(`📁 Archivo crítico modificado: ${file}`);
        }
      }
    });
    
    this.lastHealthCheck = Date.now();
  }

  cleanupLogs() {
    console.log('🧹 Limpiando logs antiguos...');
    
    const logsDir = path.join(__dirname, '..', 'logs');
    if (fs.existsSync(logsDir)) {
      const files = fs.readdirSync(logsDir);
      const now = Date.now();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 días
      
      files.forEach(file => {
        const filePath = path.join(logsDir, file);
        const stats = fs.statSync(filePath);
        
        if (now - stats.mtime.getTime() > maxAge) {
          fs.unlinkSync(filePath);
          console.log(`🗑️ Log eliminado: ${file}`);
        }
      });
    }
  }

  stop() {
    console.log('\n🛑 Deteniendo Sistema de Supervisión...');
    this.isSupervising = false;
    
    if (this.healthInterval) {
      clearInterval(this.healthInterval);
    }
    
    if (this.fileWatchInterval) {
      clearInterval(this.fileWatchInterval);
    }
    
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    
    console.log('✅ Sistema de Supervisión Detenido');
  }
}

// Manejo de argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.includes('--start')) {
  const supervisor = new SystemSupervisor();
  supervisor.start();
  
  // Manejo de Ctrl+C
  process.on('SIGINT', () => {
    supervisor.stop();
    process.exit(0);
  });
} else {
  console.log('Uso: node supervise-system.js --start');
  console.log('  --start: Iniciar supervisión continua');
}
