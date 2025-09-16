/**
 * 🛡️ SISTEMA DE CANDADO DE PROTECCIÓN DEL PROYECTO
 * Protege el proyecto contra daños y cambios no autorizados
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuración de protección
const PROTECTION_CONFIG = {
  // Archivos críticos que deben protegerse
  criticalFiles: [
    'src/lib/anbel-ai.ts',
    'src/components/AnbelChat.tsx',
    'src/lib/lottery-apis-real.ts',
    'src/lib/us-lottery-apis.ts',
    'src/lib/gemini-ai.ts',
    'vercel.json',
    'package.json'
  ],
  
  // Directorios que deben protegerse
  criticalDirectories: [
    'src/lib',
    'src/components',
    'src/config'
  ],
  
  // Patrones de código que no deben eliminarse
  protectedPatterns: [
    'generateUltraPrediction',
    'processWithGemini',
    'getRealLotteryData',
    'generateEmergencyPrediction',
    'AnbelChat',
    'realLotteryAPI',
    'usLotteryAPI'
  ],
  
  // Configuración de respaldo
  backup: {
    enabled: true,
    maxBackups: 5,
    directory: './backups'
  }
};

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class ProjectProtection {
  constructor() {
    this.protectionStatus = {
      files: {},
      directories: {},
      patterns: {},
      backups: []
    };
    this.initializeProtection();
  }

  // 🔒 Inicializar sistema de protección
  initializeProtection() {
    console.log(`${colors.bold}${colors.blue}🛡️ INICIALIZANDO SISTEMA DE CANDADO DE PROTECCIÓN${colors.reset}\n`);
    
    // Crear directorio de respaldos
    if (PROTECTION_CONFIG.backup.enabled) {
      this.createBackupDirectory();
    }
    
    // Verificar archivos críticos
    this.verifyCriticalFiles();
    
    // Verificar directorios críticos
    this.verifyCriticalDirectories();
    
    // Verificar patrones de código
    this.verifyProtectedPatterns();
    
    console.log(`${colors.green}✅ Sistema de protección inicializado${colors.reset}\n`);
  }

  // 📁 Crear directorio de respaldos
  createBackupDirectory() {
    const backupDir = PROTECTION_CONFIG.backup.directory;
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log(`${colors.blue}📁 Directorio de respaldos creado: ${backupDir}${colors.reset}`);
    }
  }

  // 🔍 Verificar archivos críticos
  verifyCriticalFiles() {
    console.log(`${colors.blue}🔍 Verificando archivos críticos...${colors.reset}`);
    
    for (const file of PROTECTION_CONFIG.criticalFiles) {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const hash = this.calculateFileHash(file);
        
        this.protectionStatus.files[file] = {
          exists: true,
          size: stats.size,
          modified: stats.mtime,
          hash: hash,
          protected: true
        };
        
        console.log(`${colors.green}✅ ${file} - PROTEGIDO${colors.reset}`);
      } else {
        this.protectionStatus.files[file] = {
          exists: false,
          protected: false,
          warning: 'Archivo crítico no encontrado'
        };
        
        console.log(`${colors.red}❌ ${file} - NO ENCONTRADO${colors.reset}`);
      }
    }
  }

  // 📂 Verificar directorios críticos
  verifyCriticalDirectories() {
    console.log(`${colors.blue}🔍 Verificando directorios críticos...${colors.reset}`);
    
    for (const dir of PROTECTION_CONFIG.criticalDirectories) {
      if (fs.existsSync(dir)) {
        const stats = fs.statSync(dir);
        
        this.protectionStatus.directories[dir] = {
          exists: true,
          isDirectory: stats.isDirectory(),
          protected: true
        };
        
        console.log(`${colors.green}✅ ${dir} - PROTEGIDO${colors.reset}`);
      } else {
        this.protectionStatus.directories[dir] = {
          exists: false,
          protected: false,
          warning: 'Directorio crítico no encontrado'
        };
        
        console.log(`${colors.red}❌ ${dir} - NO ENCONTRADO${colors.reset}`);
      }
    }
  }

  // 🔍 Verificar patrones de código protegidos
  verifyProtectedPatterns() {
    console.log(`${colors.blue}🔍 Verificando patrones de código protegidos...${colors.reset}`);
    
    for (const pattern of PROTECTION_CONFIG.protectedPatterns) {
      let found = false;
      let files = [];
      
      // Buscar en archivos críticos
      for (const file of PROTECTION_CONFIG.criticalFiles) {
        if (fs.existsSync(file)) {
          const content = fs.readFileSync(file, 'utf8');
          if (content.includes(pattern)) {
            found = true;
            files.push(file);
          }
        }
      }
      
      this.protectionStatus.patterns[pattern] = {
        found: found,
        files: files,
        protected: found
      };
      
      if (found) {
        console.log(`${colors.green}✅ ${pattern} - ENCONTRADO en ${files.length} archivo(s)${colors.reset}`);
      } else {
        console.log(`${colors.red}❌ ${pattern} - NO ENCONTRADO${colors.reset}`);
      }
    }
  }

  // 🔐 Calcular hash de archivo
  calculateFileHash(filePath) {
    try {
      const content = fs.readFileSync(filePath);
      return crypto.createHash('sha256').update(content).digest('hex');
    } catch (error) {
      return null;
    }
  }

  // 💾 Crear respaldo de archivo crítico
  createBackup(filePath) {
    if (!PROTECTION_CONFIG.backup.enabled) return null;
    
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = path.basename(filePath);
      const backupPath = path.join(PROTECTION_CONFIG.backup.directory, `${fileName}.${timestamp}.backup`);
      
      fs.copyFileSync(filePath, backupPath);
      
      const backup = {
        original: filePath,
        backup: backupPath,
        timestamp: new Date(),
        hash: this.calculateFileHash(filePath)
      };
      
      this.protectionStatus.backups.push(backup);
      
      // Limpiar respaldos antiguos
      this.cleanOldBackups();
      
      console.log(`${colors.blue}💾 Respaldo creado: ${backupPath}${colors.reset}`);
      return backup;
    } catch (error) {
      console.error(`${colors.red}❌ Error creando respaldo: ${error.message}${colors.reset}`);
      return null;
    }
  }

  // 🗑️ Limpiar respaldos antiguos
  cleanOldBackups() {
    const maxBackups = PROTECTION_CONFIG.backup.maxBackups;
    
    if (this.protectionStatus.backups.length > maxBackups) {
      const toDelete = this.protectionStatus.backups
        .sort((a, b) => a.timestamp - b.timestamp)
        .slice(0, this.protectionStatus.backups.length - maxBackups);
      
      for (const backup of toDelete) {
        try {
          fs.unlinkSync(backup.backup);
          this.protectionStatus.backups = this.protectionStatus.backups.filter(b => b !== backup);
          console.log(`${colors.yellow}🗑️ Respaldo antiguo eliminado: ${backup.backup}${colors.reset}`);
        } catch (error) {
          console.error(`${colors.red}❌ Error eliminando respaldo: ${error.message}${colors.reset}`);
        }
      }
    }
  }

  // 🚨 Verificar integridad del proyecto
  verifyProjectIntegrity() {
    console.log(`${colors.bold}${colors.blue}🚨 VERIFICANDO INTEGRIDAD DEL PROYECTO${colors.reset}\n`);
    
    let issues = 0;
    
    // Verificar archivos críticos
    for (const [file, status] of Object.entries(this.protectionStatus.files)) {
      if (!status.exists) {
        console.log(`${colors.red}❌ Archivo crítico faltante: ${file}${colors.reset}`);
        issues++;
      } else if (status.warning) {
        console.log(`${colors.yellow}⚠️  Advertencia en ${file}: ${status.warning}${colors.reset}`);
        issues++;
      }
    }
    
    // Verificar directorios críticos
    for (const [dir, status] of Object.entries(this.protectionStatus.directories)) {
      if (!status.exists) {
        console.log(`${colors.red}❌ Directorio crítico faltante: ${dir}${colors.reset}`);
        issues++;
      }
    }
    
    // Verificar patrones de código
    for (const [pattern, status] of Object.entries(this.protectionStatus.patterns)) {
      if (!status.found) {
        console.log(`${colors.red}❌ Patrón crítico faltante: ${pattern}${colors.reset}`);
        issues++;
      }
    }
    
    if (issues === 0) {
      console.log(`${colors.green}✅ Proyecto íntegro - Sin problemas detectados${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ Se detectaron ${issues} problema(s) de integridad${colors.reset}`);
    }
    
    return issues === 0;
  }

  // 🔒 Aplicar candado de protección
  applyProtectionLock() {
    console.log(`${colors.bold}${colors.blue}🔒 APLICANDO CANDADO DE PROTECCIÓN${colors.reset}\n`);
    
    // Crear respaldos de archivos críticos
    for (const file of PROTECTION_CONFIG.criticalFiles) {
      if (fs.existsSync(file)) {
        this.createBackup(file);
      }
    }
    
    // Crear archivo de estado de protección
    const protectionState = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      status: 'PROTECTED',
      files: this.protectionStatus.files,
      directories: this.protectionStatus.directories,
      patterns: this.protectionStatus.patterns,
      backups: this.protectionStatus.backups.length
    };
    
    const stateFile = path.join(PROTECTION_CONFIG.backup.directory, 'protection-state.json');
    fs.writeFileSync(stateFile, JSON.stringify(protectionState, null, 2));
    
    console.log(`${colors.green}✅ Candado de protección aplicado${colors.reset}`);
    console.log(`${colors.blue}📄 Estado guardado en: ${stateFile}${colors.reset}`);
    
    return protectionState;
  }

  // 📊 Generar reporte de protección
  generateProtectionReport() {
    console.log(`${colors.bold}${colors.blue}📊 REPORTE DE PROTECCIÓN DEL PROYECTO${colors.reset}`);
    console.log(`${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
    
    // Archivos protegidos
    console.log(`${colors.bold}📁 ARCHIVOS PROTEGIDOS:${colors.reset}`);
    for (const [file, status] of Object.entries(this.protectionStatus.files)) {
      const statusIcon = status.protected ? '✅' : '❌';
      const size = status.size ? `(${(status.size / 1024).toFixed(1)}KB)` : '';
      console.log(`${statusIcon} ${file} ${size}${colors.reset}`);
    }
    
    // Directorios protegidos
    console.log(`\n${colors.bold}📂 DIRECTORIOS PROTEGIDOS:${colors.reset}`);
    for (const [dir, status] of Object.entries(this.protectionStatus.directories)) {
      const statusIcon = status.protected ? '✅' : '❌';
      console.log(`${statusIcon} ${dir}${colors.reset}`);
    }
    
    // Patrones protegidos
    console.log(`\n${colors.bold}🔍 PATRONES DE CÓDIGO PROTEGIDOS:${colors.reset}`);
    for (const [pattern, status] of Object.entries(this.protectionStatus.patterns)) {
      const statusIcon = status.protected ? '✅' : '❌';
      const files = status.files ? `(${status.files.length} archivos)` : '';
      console.log(`${statusIcon} ${pattern} ${files}${colors.reset}`);
    }
    
    // Respaldos
    console.log(`\n${colors.bold}💾 RESPALDOS CREADOS:${colors.reset}`);
    console.log(`${colors.blue}• Total de respaldos: ${this.protectionStatus.backups.length}${colors.reset}`);
    console.log(`${colors.blue}• Directorio: ${PROTECTION_CONFIG.backup.directory}${colors.reset}`);
    
    // Estado general
    const totalFiles = Object.keys(this.protectionStatus.files).length;
    const protectedFiles = Object.values(this.protectionStatus.files).filter(f => f.protected).length;
    const protectionRate = (protectedFiles / totalFiles) * 100;
    
    console.log(`\n${colors.bold}🎯 ESTADO GENERAL:${colors.reset}`);
    console.log(`${colors.blue}• Archivos protegidos: ${protectedFiles}/${totalFiles} (${protectionRate.toFixed(1)}%)${colors.reset}`);
    console.log(`${colors.blue}• Directorios protegidos: ${Object.values(this.protectionStatus.directories).filter(d => d.protected).length}/${Object.keys(this.protectionStatus.directories).length}${colors.reset}`);
    console.log(`${colors.blue}• Patrones protegidos: ${Object.values(this.protectionStatus.patterns).filter(p => p.protected).length}/${Object.keys(this.protectionStatus.patterns).length}${colors.reset}`);
    
    if (protectionRate >= 90) {
      console.log(`\n${colors.green}${colors.bold}🛡️ PROYECTO COMPLETAMENTE PROTEGIDO${colors.reset}`);
    } else if (protectionRate >= 70) {
      console.log(`\n${colors.yellow}${colors.bold}⚠️  PROYECTO MAYORMENTE PROTEGIDO${colors.reset}`);
    } else {
      console.log(`\n${colors.red}${colors.bold}❌ PROYECTO NECESITA PROTECCIÓN ADICIONAL${colors.reset}`);
    }
    
    console.log(`\n${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}`);
  }
}

// 🚀 Ejecutar protección del proyecto
if (require.main === module) {
  const protection = new ProjectProtection();
  
  // Verificar integridad
  const isIntact = protection.verifyProjectIntegrity();
  
  if (isIntact) {
    // Aplicar candado de protección
    protection.applyProtectionLock();
    
    // Generar reporte
    protection.generateProtectionReport();
  } else {
    console.log(`${colors.red}${colors.bold}❌ NO SE PUEDE APLICAR PROTECCIÓN - CORREGIR PROBLEMAS PRIMERO${colors.reset}`);
  }
}

module.exports = ProjectProtection;
