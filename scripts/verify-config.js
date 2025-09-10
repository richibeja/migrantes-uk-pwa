#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Firebase...\n');

// Leer archivo .env.local
let envContent = '';
try {
  envContent = fs.readFileSync('.env.local', 'utf8');
} catch (error) {
  console.error('❌ No se encontró el archivo .env.local');
  console.log('💡 Ejecuta: node scripts/setup-env.js');
  process.exit(1);
}

// Verificar variables requeridas
const requiredVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

let allConfigured = true;
const missingVars = [];
const placeholderVars = [];

requiredVars.forEach(varName => {
  const regex = new RegExp(`^${varName}=(.+)$`, 'm');
  const match = envContent.match(regex);
  
  if (!match) {
    missingVars.push(varName);
    allConfigured = false;
  } else {
    const value = match[1].trim();
    if (value.includes('your_') || value.includes('YOUR_') || value === '1234567890' || value === 'abc123def456') {
      placeholderVars.push(varName);
      allConfigured = false;
    }
  }
});

console.log('📊 Estado de configuración:');
console.log(`  - Variables encontradas: ${requiredVars.length - missingVars.length}/${requiredVars.length}`);
console.log(`  - Variables con valores reales: ${requiredVars.length - missingVars.length - placeholderVars.length}/${requiredVars.length}`);

if (missingVars.length > 0) {
  console.log('\n❌ Variables faltantes:');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
}

if (placeholderVars.length > 0) {
  console.log('\n⚠️  Variables con valores de ejemplo:');
  placeholderVars.forEach(varName => console.log(`   - ${varName}`));
}

if (allConfigured) {
  console.log('\n✅ ¡Configuración completa! La aplicación está lista para producción.');
  console.log('\n🚀 Próximos pasos:');
  console.log('   1. Ejecutar: npm run start');
  console.log('   2. Abrir: http://localhost:3000');
  console.log('   3. Probar funcionalidades de lotería');
} else {
  console.log('\n🔧 Acciones requeridas:');
  console.log('   1. Ve a Firebase Console: https://console.firebase.google.com/');
  console.log('   2. Selecciona tu proyecto');
  console.log('   3. Ve a Configuración > Configuración del proyecto');
  console.log('   4. Copia las credenciales reales');
  console.log('   5. Actualiza .env.local con los valores reales');
  console.log('   6. Ejecuta: node scripts/verify-config.js');
}

console.log('\n📋 Comandos útiles:');
console.log('   - Verificar configuración: node scripts/verify-config.js');
console.log('   - Iniciar en desarrollo: npm run dev');
console.log('   - Iniciar en producción: npm run start');
console.log('   - Verificar tipos: npm run check-types');
console.log('   - Build de producción: npm run build');
