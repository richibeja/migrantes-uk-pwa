#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando deploy a Vercel...');

try {
  // Verificar que estamos en el directorio correcto
  if (!fs.existsSync('package.json')) {
    throw new Error('No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto.');
  }

  // Verificar que Vercel CLI está instalado
  try {
    execSync('vercel --version', { stdio: 'pipe' });
  } catch (error) {
    console.log('📦 Instalando Vercel CLI...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
  }

  // Verificar que el proyecto está listo para producción
  console.log('🔍 Verificando configuración...');
  
  // Verificar que next.config.js existe
  if (!fs.existsSync('next.config.js')) {
    throw new Error('No se encontró next.config.js');
  }

  // Verificar que vercel.json existe
  if (!fs.existsSync('vercel.json')) {
    console.log('⚠️  No se encontró vercel.json, creando uno básico...');
    const basicVercelConfig = {
      "version": 2,
      "builds": [
        {
          "src": "package.json",
          "use": "@vercel/next"
        }
      ]
    };
    fs.writeFileSync('vercel.json', JSON.stringify(basicVercelConfig, null, 2));
  }

  // Hacer build del proyecto
  console.log('🏗️  Construyendo proyecto...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verificar que el build fue exitoso
  if (!fs.existsSync('.next')) {
    throw new Error('El build falló. No se generó la carpeta .next');
  }

  console.log('✅ Build exitoso');

  // Deploy a Vercel
  console.log('🚀 Desplegando a Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });

  console.log('🎉 ¡Deploy exitoso!');
  console.log('📱 Tu aplicación está disponible en producción');
  console.log('🔗 Revisa tu dashboard de Vercel para obtener la URL');

} catch (error) {
  console.error('❌ Error durante el deploy:', error.message);
  process.exit(1);
}
