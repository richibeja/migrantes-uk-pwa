#!/usr/bin/env node

/**
 * Script para generar automáticamente iconos PNG desde SVG
 * Requiere: npm install -g svgexport
 * Uso: node scripts/generate-icons.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../public/icons');
const SVG_FILES = [
  { input: 'favicon.svg', output: 'favicon-32x32.png', size: '32x32' },
  { input: 'icon-192x192.svg', output: 'icon-192x192.png', size: '192x192' },
  { input: 'apple-touch-icon.svg', output: 'apple-touch-icon-180x180.png', size: '180x180' },
  { input: 'icon-512x512.svg', output: 'icon-512x512.png', size: '512x512' }
];

console.log('🎯 Generando iconos PNG para GanaFácil...\n');

// Verificar si svgexport está instalado
try {
  execSync('svgexport --version', { stdio: 'ignore' });
} catch (error) {
  console.log('❌ svgexport no está instalado. Instalando...');
  try {
    execSync('npm install -g svgexport', { stdio: 'inherit' });
    console.log('✅ svgexport instalado correctamente\n');
  } catch (installError) {
    console.log('❌ Error al instalar svgexport. Por favor instala manualmente:');
    console.log('   npm install -g svgexport\n');
    process.exit(1);
  }
}

// Generar cada icono
SVG_FILES.forEach(({ input, output, size }) => {
  const inputPath = path.join(ICONS_DIR, input);
  const outputPath = path.join(ICONS_DIR, output);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Archivo SVG no encontrado: ${input}`);
    return;
  }
  
  try {
    console.log(`🔄 Generando ${output} (${size})...`);
    execSync(`svgexport "${inputPath}" "${outputPath}" ${size}`, {
      cwd: ICONS_DIR,
      stdio: 'pipe'
    });
    console.log(`✅ ${output} generado correctamente`);
  } catch (error) {
    console.log(`❌ Error generando ${output}: ${error.message}`);
  }
});

console.log('\n🎉 ¡Iconos generados exitosamente!');
console.log('\n📁 Archivos creados:');
SVG_FILES.forEach(({ output }) => {
  const outputPath = path.join(ICONS_DIR, output);
  if (fs.existsSync(outputPath)) {
    const stats = fs.statSync(outputPath);
    console.log(`   ${output} (${(stats.size / 1024).toFixed(1)} KB)`);
  }
});

console.log('\n💡 Los iconos SVG también están disponibles para uso web moderno.');
console.log('   Los PNG son para compatibilidad con navegadores antiguos.');
