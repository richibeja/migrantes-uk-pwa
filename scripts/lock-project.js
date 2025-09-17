#!/usr/bin/env node

/**
 * 🔒 SISTEMA DE PROTECCIÓN COMPLETO - "CANDADO"
 * Protege el proyecto contra cambios accidentales y errores
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.magenta}${colors.bold}`);
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║                    🔒 ACTIVANDO CANDADO                     ║');
console.log('║                Sistema de Protección Completo                ║');
console.log('╚══════════════════════════════════════════════════════════════╝');
console.log(`${colors.reset}`);

// Archivos críticos que deben protegerse
const criticalFiles = [
  'src/components/AnbelChat.tsx',
  'src/lib/anbel-ai.ts',
  'src/lib/gemini-ai.ts',
  'src/config/gemini.ts',
  'src/lib/lotteryConfig.ts',
  'src/lib/us-lottery-apis.ts',
  'src/lib/lottery-apis-real.ts',
  'src/app/dashboard/page.tsx',
  'src/app/page.tsx',
  'vercel.json',
  'package.json',
  'next.config.js'
];

// Crear directorio de respaldos
const backupDir = path.join(__dirname, '..', 'backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  console.log(`${colors.green}✅ Directorio de respaldos creado${colors.reset}`);
}

// Función para crear hash de archivo
function createFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('sha256').update(content).digest('hex');
  } catch (error) {
    return null;
  }
}

// Función para crear respaldo
function createBackup(filePath) {
  try {
    const fileName = path.basename(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(backupDir, `${fileName}.${timestamp}.backup`);
    
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
  } catch (error) {
    console.log(`${colors.red}❌ Error creando respaldo de ${filePath}: ${error.message}${colors.reset}`);
    return null;
  }
}

// Función para verificar integridad
function verifyIntegrity(filePath, expectedHash) {
  const currentHash = createFileHash(filePath);
  return currentHash === expectedHash;
}

// Función principal de protección
async function lockProject() {
  console.log(`\n${colors.cyan}${colors.bold}🔒 INICIANDO PROTECCIÓN DEL PROYECTO${colors.reset}`);
  
  const protectionData = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    files: {},
    checksums: {},
    backups: {}
  };
  
  let successCount = 0;
  
  // Procesar cada archivo crítico
  for (const filePath of criticalFiles) {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (fs.existsSync(fullPath)) {
      console.log(`\n${colors.white}🔍 Protegiendo ${filePath}...${colors.reset}`);
      
      // Crear hash del archivo
      const fileHash = createFileHash(fullPath);
      if (fileHash) {
        protectionData.checksums[filePath] = fileHash;
        console.log(`${colors.green}✅ Hash creado: ${fileHash.substring(0, 16)}...${colors.reset}`);
      }
      
      // Crear respaldo
      const backupPath = createBackup(fullPath);
      if (backupPath) {
        protectionData.backups[filePath] = backupPath;
        console.log(`${colors.green}✅ Respaldo creado: ${path.basename(backupPath)}${colors.reset}`);
      }
      
      // Marcar como protegido
      protectionData.files[filePath] = {
        protected: true,
        hash: fileHash,
        backup: backupPath,
        timestamp: new Date().toISOString()
      };
      
      successCount++;
    } else {
      console.log(`${colors.yellow}⚠️  Archivo no encontrado: ${filePath}${colors.reset}`);
    }
  }
  
  // Guardar datos de protección
  const protectionFile = path.join(backupDir, 'protection-data.json');
  fs.writeFileSync(protectionFile, JSON.stringify(protectionData, null, 2));
  
  console.log(`\n${colors.cyan}${colors.bold}📊 RESUMEN DE PROTECCIÓN:${colors.reset}`);
  console.log(`${colors.green}✅ Archivos protegidos: ${successCount}/${criticalFiles.length}${colors.reset}`);
  console.log(`${colors.blue}📁 Respaldos creados en: ${backupDir}${colors.reset}`);
  console.log(`${colors.blue}🔐 Datos de protección: ${protectionFile}${colors.reset}`);
  
  return protectionData;
}

// Función para verificar estado del proyecto
async function verifyProject() {
  console.log(`\n${colors.cyan}${colors.bold}🔍 VERIFICANDO ESTADO DEL PROYECTO${colors.reset}`);
  
  const protectionFile = path.join(backupDir, 'protection-data.json');
  
  if (!fs.existsSync(protectionFile)) {
    console.log(`${colors.red}❌ No se encontraron datos de protección${colors.reset}`);
    return false;
  }
  
  const protectionData = JSON.parse(fs.readFileSync(protectionFile, 'utf8'));
  let integrityIssues = 0;
  
  for (const [filePath, fileData] of Object.entries(protectionData.files)) {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (fs.existsSync(fullPath)) {
      const currentHash = createFileHash(fullPath);
      const expectedHash = fileData.hash;
      
      if (currentHash === expectedHash) {
        console.log(`${colors.green}✅ ${filePath} - Integridad verificada${colors.reset}`);
      } else {
        console.log(`${colors.red}❌ ${filePath} - INTEGRIDAD COMPROMETIDA${colors.reset}`);
        integrityIssues++;
      }
    } else {
      console.log(`${colors.yellow}⚠️  ${filePath} - Archivo no encontrado${colors.reset}`);
      integrityIssues++;
    }
  }
  
  if (integrityIssues === 0) {
    console.log(`\n${colors.green}🎉 ¡PROYECTO COMPLETAMENTE PROTEGIDO!${colors.reset}`);
    return true;
  } else {
    console.log(`\n${colors.red}⚠️  Se encontraron ${integrityIssues} problemas de integridad${colors.reset}`);
    return false;
  }
}

// Función para restaurar desde respaldo
async function restoreFromBackup(filePath) {
  console.log(`\n${colors.cyan}${colors.bold}🔄 RESTAURANDO DESDE RESPALDO${colors.reset}`);
  
  const protectionFile = path.join(backupDir, 'protection-data.json');
  
  if (!fs.existsSync(protectionFile)) {
    console.log(`${colors.red}❌ No se encontraron datos de protección${colors.reset}`);
    return false;
  }
  
  const protectionData = JSON.parse(fs.readFileSync(protectionFile, 'utf8'));
  const fileData = protectionData.files[filePath];
  
  if (!fileData || !fileData.backup) {
    console.log(`${colors.red}❌ No se encontró respaldo para ${filePath}${colors.reset}`);
    return false;
  }
  
  if (fs.existsSync(fileData.backup)) {
    const fullPath = path.join(__dirname, '..', filePath);
    fs.copyFileSync(fileData.backup, fullPath);
    console.log(`${colors.green}✅ ${filePath} restaurado desde respaldo${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}❌ Respaldo no encontrado: ${fileData.backup}${colors.reset}`);
    return false;
  }
}

// Función para crear script de verificación automática
function createVerificationScript() {
  const scriptContent = `#!/usr/bin/env node

/**
 * 🔍 SCRIPT DE VERIFICACIÓN AUTOMÁTICA
 * Verifica la integridad del proyecto automáticamente
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const backupDir = path.join(__dirname, '..', 'backups');
const protectionFile = path.join(backupDir, 'protection-data.json');

if (!fs.existsSync(protectionFile)) {
  console.log('❌ No se encontraron datos de protección');
  process.exit(1);
}

const protectionData = JSON.parse(fs.readFileSync(protectionFile, 'utf8'));
let issues = 0;

for (const [filePath, fileData] of Object.entries(protectionData.files)) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (fs.existsSync(fullPath)) {
    const currentHash = crypto.createHash('sha256').update(fs.readFileSync(fullPath, 'utf8')).digest('hex');
    if (currentHash !== fileData.hash) {
      console.log(\`❌ \${filePath} - INTEGRIDAD COMPROMETIDA\`);
      issues++;
    }
  } else {
    console.log(\`⚠️  \${filePath} - Archivo no encontrado\`);
    issues++;
  }
}

if (issues === 0) {
  console.log('✅ Proyecto protegido correctamente');
  process.exit(0);
} else {
  console.log(\`❌ Se encontraron \${issues} problemas\`);
  process.exit(1);
}
`;

  const scriptPath = path.join(__dirname, 'verify-integrity.js');
  fs.writeFileSync(scriptPath, scriptContent);
  console.log(`${colors.green}✅ Script de verificación creado: ${scriptPath}${colors.reset}`);
}

// Función para crear archivo de configuración de protección
function createProtectionConfig() {
  const config = {
    project: 'GanaFácil - Anbel IA',
    version: '1.0.0',
    protection: {
      enabled: true,
      autoBackup: true,
      integrityCheck: true,
      restoreOnError: true
    },
    files: {
      critical: criticalFiles,
      backupDir: backupDir,
      protectionFile: path.join(backupDir, 'protection-data.json')
    },
    commands: {
      verify: 'node scripts/verify-integrity.js',
      restore: 'node scripts/restore-project.js',
      lock: 'node scripts/lock-project.js'
    }
  };
  
  const configPath = path.join(__dirname, '..', 'protection-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`${colors.green}✅ Configuración de protección creada: ${configPath}${colors.reset}`);
}

// Función para crear script de restauración
function createRestoreScript() {
  const scriptContent = `#!/usr/bin/env node

/**
 * 🔄 SCRIPT DE RESTAURACIÓN
 * Restaura el proyecto desde respaldos
 */

const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '..', 'backups');
const protectionFile = path.join(backupDir, 'protection-data.json');

if (!fs.existsSync(protectionFile)) {
  console.log('❌ No se encontraron datos de protección');
  process.exit(1);
}

const protectionData = JSON.parse(fs.readFileSync(protectionFile, 'utf8'));

console.log('🔄 Restaurando proyecto desde respaldos...');

let restored = 0;
for (const [filePath, fileData] of Object.entries(protectionData.files)) {
  if (fileData.backup && fs.existsSync(fileData.backup)) {
    const fullPath = path.join(__dirname, '..', filePath);
    fs.copyFileSync(fileData.backup, fullPath);
    console.log(\`✅ \${filePath} restaurado\`);
    restored++;
  }
}

console.log(\`🎉 \${restored} archivos restaurados\`);
`;

  const scriptPath = path.join(__dirname, 'restore-project.js');
  fs.writeFileSync(scriptPath, scriptContent);
  console.log(`${colors.green}✅ Script de restauración creado: ${scriptPath}${colors.reset}`);
}

// Ejecutar protección
async function main() {
  try {
    // Crear respaldos y protección
    const protectionData = await lockProject();
    
    // Crear scripts auxiliares
    createVerificationScript();
    createRestoreScript();
    createProtectionConfig();
    
    // Verificar estado
    await verifyProject();
    
    console.log(`\n${colors.magenta}${colors.bold}╔══════════════════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.magenta}${colors.bold}║                    🔒 CANDADO ACTIVADO                      ║${colors.reset}`);
    console.log(`${colors.magenta}${colors.bold}║                Proyecto completamente protegido                ║${colors.reset}`);
    console.log(`${colors.magenta}${colors.bold}╚══════════════════════════════════════════════════════════════╝${colors.reset}`);
    
    console.log(`\n${colors.cyan}${colors.bold}📋 COMANDOS DISPONIBLES:${colors.reset}`);
    console.log(`${colors.white}• Verificar integridad: node scripts/verify-integrity.js${colors.reset}`);
    console.log(`${colors.white}• Restaurar proyecto: node scripts/restore-project.js${colors.reset}`);
    console.log(`${colors.white}• Activar candado: node scripts/lock-project.js${colors.reset}`);
    
    console.log(`\n${colors.green}🎉 ¡PROYECTO CERRADO CON CANDADO!${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}❌ Error activando candado: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { lockProject, verifyProject, restoreFromBackup };
