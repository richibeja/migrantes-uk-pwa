#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICACIÓN COMPLETA DE GANAFÁCIL');
console.log('=====================================\n');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Verificar estructura del proyecto
log('📁 VERIFICANDO ESTRUCTURA DEL PROYECTO', 'bright');

const requiredDirs = [
  'src',
  'src/app',
  'src/components',
  'src/hooks',
  'src/lib',
  'src/i18n',
  'public',
  'public/icons',
  'scripts'
];

const requiredFiles = [
  'package.json',
  'next.config.ts',
  'tailwind.config.ts',
  'postcss.config.cjs',
  'tsconfig.json',
  'vercel.json',
  'public/manifest.json',
  'public/sw.js',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css',
  'src/components/ServiceWorkerRegistration.tsx',
  'src/components/WhatsAppButton.tsx',
  'src/components/PayPalButton.tsx',
  'src/components/LanguageSelector.tsx',
  'src/components/PrizeTracker.tsx',
  'src/components/AnimatedCounters.tsx',
  'src/components/FAQ.tsx',
  'src/hooks/useLanguage.ts',
  'src/lib/lotteryAPI.ts',
  'src/lib/predictions.ts',
  'src/i18n/translations.ts'
];

let dirsChecked = 0;
let filesChecked = 0;
let totalChecks = requiredDirs.length + requiredFiles.length;

// Verificar directorios
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    logSuccess(`Directorio ${dir} existe`);
    dirsChecked++;
  } else {
    logError(`Directorio ${dir} NO existe`);
  }
});

// Verificar archivos
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    logSuccess(`Archivo ${file} existe`);
    filesChecked++;
  } else {
    logError(`Archivo ${file} NO existe`);
  }
});

log('\n📊 ESTADÍSTICAS DE ESTRUCTURA', 'bright');
log(`Directorios: ${dirsChecked}/${requiredDirs.length}`, dirsChecked === requiredDirs.length ? 'green' : 'yellow');
log(`Archivos: ${filesChecked}/${requiredFiles.length}`, filesChecked === requiredFiles.length ? 'green' : 'yellow');

// Verificar configuración de PostCSS
log('\n⚙️  VERIFICANDO CONFIGURACIÓN POSTCSS', 'bright');
try {
  const postcssConfig = fs.readFileSync('postcss.config.cjs', 'utf8');
  if (postcssConfig.includes('tailwindcss') && postcssConfig.includes('autoprefixer')) {
    logSuccess('PostCSS configurado correctamente con Tailwind CSS');
  } else {
    logWarning('PostCSS puede no estar configurado correctamente');
  }
} catch (error) {
  logError('Error leyendo postcss.config.cjs');
}

// Verificar configuración de Tailwind
log('\n🎨 VERIFICANDO CONFIGURACIÓN TAILWIND', 'bright');
try {
  const tailwindConfig = fs.readFileSync('tailwind.config.ts', 'utf8');
  if (tailwindConfig.includes('content') && tailwindConfig.includes('darkMode')) {
    logSuccess('Tailwind CSS configurado correctamente');
  } else {
    logWarning('Configuración de Tailwind puede estar incompleta');
  }
} catch (error) {
  logError('Error leyendo tailwind.config.ts');
}

// Verificar Service Worker
log('\n🔧 VERIFICANDO SERVICE WORKER', 'bright');
try {
  const swFile = fs.readFileSync('public/sw.js', 'utf8');
  if (swFile.includes('CACHE_NAME') && swFile.includes('install') && swFile.includes('fetch')) {
    logSuccess('Service Worker implementado correctamente');
  } else {
    logWarning('Service Worker puede estar incompleto');
  }
} catch (error) {
  logError('Error leyendo public/sw.js');
}

// Verificar manifest.json
log('\n📱 VERIFICANDO MANIFEST PWA', 'bright');
try {
  const manifest = fs.readFileSync('public/manifest.json', 'utf8');
  const manifestData = JSON.parse(manifest);
  if (manifestData.name && manifestData.short_name && manifestData.icons) {
    logSuccess('Manifest.json configurado correctamente');
  } else {
    logWarning('Manifest.json puede estar incompleto');
  }
} catch (error) {
  logError('Error leyendo manifest.json');
}

// Verificar traducciones
log('\n🌍 VERIFICANDO SISTEMA DE TRADUCCIONES', 'bright');
try {
  const translations = fs.readFileSync('src/i18n/translations.ts', 'utf8');
  if (translations.includes('es:') && translations.includes('en:') && translations.includes('getTranslation')) {
    logSuccess('Sistema de traducciones implementado');
  } else {
    logWarning('Sistema de traducciones puede estar incompleto');
  }
} catch (error) {
  logError('Error leyendo translations.ts');
}

// Verificar componentes principales
log('\n🧩 VERIFICANDO COMPONENTES PRINCIPALES', 'bright');
const components = [
  'ServiceWorkerRegistration',
  'WhatsAppButton', 
  'PayPalButton',
  'LanguageSelector',
  'PrizeTracker',
  'AnimatedCounters',
  'FAQ'
];

components.forEach(component => {
  try {
    const componentFile = fs.readFileSync(`src/components/${component}.tsx`, 'utf8');
    if (componentFile.includes('export default') || componentFile.includes('export {')) {
      logSuccess(`Componente ${component} implementado`);
    } else {
      logWarning(`Componente ${component} puede estar incompleto`);
    }
  } catch (error) {
    logError(`Error leyendo componente ${component}`);
  }
});

// Verificar hooks
log('\n🎣 VERIFICANDO HOOKS PERSONALIZADOS', 'bright');
try {
  const useLanguage = fs.readFileSync('src/hooks/useLanguage.ts', 'utf8');
  if (useLanguage.includes('useLanguage') && useLanguage.includes('useState')) {
    logSuccess('Hook useLanguage implementado');
  } else {
    logWarning('Hook useLanguage puede estar incompleto');
  }
} catch (error) {
  logError('Error leyendo useLanguage.ts');
}

// Verificar librerías
log('\n📚 VERIFICANDO LIBRERÍAS', 'bright');
try {
  const lotteryAPI = fs.readFileSync('src/lib/lotteryAPI.ts', 'utf8');
  if (lotteryAPI.includes('class LotteryAPI') && lotteryAPI.includes('getLatestResults')) {
    logSuccess('Librería lotteryAPI implementada');
  } else {
    logWarning('Librería lotteryAPI puede estar incompleta');
  }
} catch (error) {
  logError('Error leyendo lotteryAPI.ts');
}

try {
  const predictions = fs.readFileSync('src/lib/predictions.ts', 'utf8');
  if (predictions.includes('class PredictionEngine') && predictions.includes('AnbelMethod')) {
    logSuccess('Librería predictions implementada');
  } else {
    logWarning('Librería predictions puede estar incompleta');
  }
} catch (error) {
  logError('Error leyendo predictions.ts');
}

// Verificar configuración de Vercel
log('\n🚀 VERIFICANDO CONFIGURACIÓN VERCEL', 'bright');
try {
  const vercelConfig = fs.readFileSync('vercel.json', 'utf8');
  if (vercelConfig.includes('builds') && vercelConfig.includes('routes')) {
    logSuccess('Configuración de Vercel implementada');
  } else {
    logWarning('Configuración de Vercel puede estar incompleta');
  }
} catch (error) {
  logError('Error leyendo vercel.json');
}

// Verificar package.json
log('\n📦 VERIFICANDO DEPENDENCIAS', 'bright');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['next', 'react', 'react-dom', 'typescript', 'tailwindcss'];
  const requiredDevDeps = ['@types/node', '@types/react', '@types/react-dom'];
  
  let depsOk = 0;
  let devDepsOk = 0;
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      depsOk++;
    }
  });
  
  requiredDevDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      devDepsOk++;
    }
  });
  
  if (depsOk === requiredDeps.length) {
    logSuccess(`Dependencias principales: ${depsOk}/${requiredDeps.length}`);
  } else {
    logWarning(`Dependencias principales: ${depsOk}/${requiredDeps.length}`);
  }
  
  if (devDepsOk === requiredDevDeps.length) {
    logSuccess(`Dependencias de desarrollo: ${devDepsOk}/${requiredDevDeps.length}`);
  } else {
    logWarning(`Dependencias de desarrollo: ${devDepsOk}/${requiredDevDeps.length}`);
  }
  
} catch (error) {
  logError('Error leyendo package.json');
}

// Resumen final
log('\n🎯 RESUMEN FINAL', 'bright');
const totalSuccessful = dirsChecked + filesChecked;
const completionPercentage = Math.round((totalSuccessful / totalChecks) * 100);

if (completionPercentage >= 90) {
  log(`🎉 PROYECTO COMPLETADO AL ${completionPercentage}%`, 'green');
  log('✅ GanaFácil está listo para producción', 'green');
} else if (completionPercentage >= 75) {
  log(`⚠️  PROYECTO COMPLETADO AL ${completionPercentage}%`, 'yellow');
  log('🔄 Algunas funcionalidades pueden necesitar ajustes', 'yellow');
} else {
  log(`❌ PROYECTO COMPLETADO AL ${completionPercentage}%`, 'red');
  log('🚨 Se requieren correcciones importantes', 'red');
}

log('\n📋 PRÓXIMOS PASOS RECOMENDADOS:', 'bright');
log('1. Ejecutar: npm run dev', 'cyan');
log('2. Verificar que no hay errores en la consola del navegador', 'cyan');
log('3. Probar todas las funcionalidades principales', 'cyan');
log('4. Verificar PWA y Service Worker', 'cyan');
log('5. Ejecutar: npm run build (para producción)', 'cyan');

log('\n🚀 ¡GANAFÁCIL ESTÁ CASI LISTO!', 'green');
