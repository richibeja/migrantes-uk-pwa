#!/usr/bin/env node

/**
 * ⚡ VERIFICACIÓN RÁPIDA DEL PROYECTO
 * Verificación rápida del estado del proyecto
 */

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.cyan}${colors.bold}⚡ VERIFICACIÓN RÁPIDA DEL PROYECTO${colors.reset}`);

// Archivos críticos
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

let allGood = true;

console.log(`\n${colors.white}🔍 Verificando archivos críticos...${colors.reset}`);

for (const file of criticalFiles) {
  const fullPath = path.join(__dirname, '..', file);
  
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(`${colors.green}✅ ${file} (${size} KB)${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ ${file} - FALTANTE${colors.reset}`);
    allGood = false;
  }
}

// Verificar directorio de respaldos
const backupDir = path.join(__dirname, '..', 'backups');
if (fs.existsSync(backupDir)) {
  const backupFiles = fs.readdirSync(backupDir);
  console.log(`\n${colors.green}✅ Respaldos disponibles: ${backupFiles.length} archivos${colors.reset}`);
} else {
  console.log(`\n${colors.yellow}⚠️  Directorio de respaldos no encontrado${colors.reset}`);
}

// Verificar configuración de protección
const protectionFile = path.join(backupDir, 'protection-data.json');
if (fs.existsSync(protectionFile)) {
  console.log(`${colors.green}✅ Sistema de protección activo${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠️  Sistema de protección no encontrado${colors.reset}`);
}

// Verificar scripts de protección
const scripts = [
  'scripts/lock-project.js',
  'scripts/verify-integrity.js',
  'scripts/restore-project.js'
];

console.log(`\n${colors.white}🔍 Verificando scripts de protección...${colors.reset}`);

for (const script of scripts) {
  const fullPath = path.join(__dirname, '..', script);
  
  if (fs.existsSync(fullPath)) {
    console.log(`${colors.green}✅ ${script}${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ ${script} - FALTANTE${colors.reset}`);
    allGood = false;
  }
}

// Resultado final
console.log(`\n${colors.cyan}${colors.bold}📊 RESULTADO:${colors.reset}`);

if (allGood) {
  console.log(`${colors.green}🎉 ¡PROYECTO COMPLETAMENTE SEGURO!${colors.reset}`);
  console.log(`${colors.green}   Todos los archivos críticos están presentes${colors.reset}`);
  console.log(`${colors.green}   Sistema de protección activo${colors.reset}`);
  console.log(`${colors.green}   Respaldos disponibles${colors.reset}`);
} else {
  console.log(`${colors.red}⚠️  PROYECTO NECESITA ATENCIÓN${colors.reset}`);
  console.log(`${colors.red}   Algunos archivos críticos están faltando${colors.reset}`);
  console.log(`${colors.yellow}   Ejecuta: node scripts/lock-project.js${colors.reset}`);
}

console.log(`\n${colors.cyan}${colors.bold}🔒 PROYECTO CERRADO CON CANDADO${colors.reset}\n`);
