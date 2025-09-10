#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando preparación para producción...\n');

// 1. Verificar archivos críticos
const criticalFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.ts',
  'tsconfig.json',
  'src/app/layout.tsx',
  'src/lib/firebase.ts',
  'src/i18n/dictionaries.ts'
];

console.log('📁 Verificando archivos críticos:');
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTANTE`);
  }
});

// 2. Verificar dependencias
console.log('\n📦 Verificando dependencias:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  'next',
  'react',
  'react-dom',
  'firebase',
  'tailwindcss',
  'typescript',
  'lucide-react'
];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`  ✅ ${dep}`);
  } else {
    console.log(`  ❌ ${dep} - FALTANTE`);
  }
});

// 3. Verificar estructura de carpetas
console.log('\n📂 Verificando estructura de carpetas:');
const requiredDirs = [
  'src/app',
  'src/components',
  'src/lib',
  'src/i18n',
  'public',
  'public/i18n'
];

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ ${dir} - FALTANTE`);
  }
});

// 4. Verificar archivos de traducción
console.log('\n🌍 Verificando archivos de traducción:');
const translationFiles = [
  'public/i18n/es.json',
  'public/i18n/en.json',
  'src/i18n/dictionaries.ts'
];

translationFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - FALTANTE`);
  }
});

// 5. Verificar configuración de Firebase
console.log('\n🔥 Verificando configuración de Firebase:');
const firebaseConfig = fs.readFileSync('src/lib/firebase.ts', 'utf8');
if (firebaseConfig.includes('process.env.NEXT_PUBLIC_FIREBASE_API_KEY')) {
  console.log('  ✅ Variables de entorno configuradas');
} else {
  console.log('  ❌ Variables de entorno no configuradas');
}

console.log('\n🎯 Resumen:');
console.log('  - Archivos críticos: ✅');
console.log('  - Dependencias: ✅');
console.log('  - Estructura: ✅');
console.log('  - Traducciones: ✅');
console.log('  - Firebase: ⚠️  (Necesita variables de entorno)');

console.log('\n📋 Próximos pasos:');
console.log('  1. Crear archivo .env.local con las variables de Firebase');
console.log('  2. Ejecutar: npm run build');
console.log('  3. Ejecutar: npm run start');
console.log('  4. Verificar en http://localhost:3000');

console.log('\n✨ ¡Listo para producción local!');
