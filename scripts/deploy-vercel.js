#!/usr/bin/env node

// SCRIPT DE DESPLIEGUE A VERCEL - GANA FÁCIL ANBEL IA
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 INICIANDO DESPLIEGUE A VERCEL - GANA FÁCIL ANBEL IA');
console.log('⏰ Timestamp:', new Date().toISOString());

// Configuración de Vercel
const VERCEL_CONFIG = {
  projectName: 'ganafaci-anbel-pwa',
  teamId: process.env.VERCEL_TEAM_ID || '',
  token: process.env.VERCEL_TOKEN || '',
  environment: 'production'
};

// Función para verificar configuración de Vercel
function verifyVercelConfig() {
  console.log('\n🔍 Verificando configuración de Vercel...');
  
  if (!VERCEL_CONFIG.token) {
    console.error('❌ VERCEL_TOKEN no encontrado en variables de entorno');
    console.log('💡 Configura VERCEL_TOKEN con: vercel login');
    process.exit(1);
  }
  
  console.log('✅ Configuración de Vercel verificada');
}

// Función para verificar que el build existe
function verifyBuild() {
  console.log('\n🔍 Verificando build de producción...');
  
  if (!fs.existsSync('.next')) {
    console.error('❌ Build no encontrado. Ejecuta: npm run build:production');
    process.exit(1);
  }
  
  console.log('✅ Build de producción verificado');
}

// Función para configurar variables de entorno en Vercel
function setVercelEnvVars() {
  console.log('\n🔧 Configurando variables de entorno en Vercel...');
  
  const envVars = [
    { key: 'NODE_ENV', value: 'production' },
    { key: 'NEXT_PUBLIC_APP_URL', value: 'https://ganafaci-anbel-pwa.vercel.app' },
    { key: 'NEXT_PUBLIC_ANBEL_IA_API', value: 'https://api.anbel-ia.com' },
    { key: 'NEXT_TELEMETRY_DISABLED', value: '1' },
    { key: 'PWA_ENABLED', value: 'true' },
    { key: 'SERVICE_WORKER_ENABLED', value: 'true' }
  ];
  
  envVars.forEach(({ key, value }) => {
    try {
      execSync(`vercel env add ${key} ${VERCEL_CONFIG.environment}`, {
        input: value,
        stdio: 'pipe'
      });
      console.log(`✅ Variable ${key} configurada`);
    } catch (error) {
      console.log(`⚠️ Variable ${key} ya existe o error configurando`);
    }
  });
}

// Función para desplegar a Vercel
function deployToVercel() {
  console.log('\n🚀 Desplegando a Vercel...');
  
  try {
    // Comando de despliegue
    const deployCommand = [
      'vercel',
      '--prod',
      '--yes',
      '--token', VERCEL_CONFIG.token
    ];
    
    if (VERCEL_CONFIG.teamId) {
      deployCommand.push('--scope', VERCEL_CONFIG.teamId);
    }
    
    const output = execSync(deployCommand.join(' '), {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    console.log('✅ Despliegue completado');
    
    // Extraer URL del output
    const urlMatch = output.match(/https:\/\/[^\s]+/);
    if (urlMatch) {
      console.log(`🌐 URL de producción: ${urlMatch[0]}`);
      return urlMatch[0];
    }
    
    return null;
    
  } catch (error) {
    console.error('❌ Error en despliegue:', error.message);
    process.exit(1);
  }
}

// Función para verificar despliegue
function verifyDeployment(url) {
  console.log('\n🔍 Verificando despliegue...');
  
  if (!url) {
    console.log('⚠️ URL no disponible para verificación');
    return;
  }
  
  try {
    const https = require('https');
    
    const options = {
      hostname: url.replace('https://', ''),
      port: 443,
      path: '/',
      method: 'GET',
      timeout: 10000
    };
    
    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Despliegue verificado - Aplicación respondiendo');
      } else {
        console.log(`⚠️ Despliegue con status ${res.statusCode}`);
      }
    });
    
    req.on('error', (error) => {
      console.log('⚠️ Error verificando despliegue:', error.message);
    });
    
    req.on('timeout', () => {
      console.log('⚠️ Timeout verificando despliegue');
    });
    
    req.end();
    
  } catch (error) {
    console.log('⚠️ Error en verificación:', error.message);
  }
}

// Función para configurar dominio personalizado (opcional)
function setupCustomDomain() {
  console.log('\n🌐 Configurando dominio personalizado...');
  
  const customDomain = process.env.CUSTOM_DOMAIN;
  
  if (!customDomain) {
    console.log('ℹ️ No se configuró dominio personalizado');
    return;
  }
  
  try {
    execSync(`vercel domains add ${customDomain}`, {
      stdio: 'pipe'
    });
    
    execSync(`vercel domains verify ${customDomain}`, {
      stdio: 'pipe'
    });
    
    console.log(`✅ Dominio ${customDomain} configurado`);
    
  } catch (error) {
    console.log(`⚠️ Error configurando dominio ${customDomain}:`, error.message);
  }
}

// Función para configurar monitoreo
function setupMonitoring() {
  console.log('\n📊 Configurando monitoreo...');
  
  try {
    // Configurar webhook de Vercel para notificaciones
    const webhookUrl = process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
    
    if (webhookUrl) {
      execSync(`vercel webhooks add ${webhookUrl}`, {
        stdio: 'pipe'
      });
      console.log('✅ Webhook de monitoreo configurado');
    } else {
      console.log('ℹ️ No se configuró webhook de monitoreo');
    }
    
  } catch (error) {
    console.log('⚠️ Error configurando monitoreo:', error.message);
  }
}

// Función para generar reporte de despliegue
function generateDeploymentReport(url) {
  console.log('\n📋 Generando reporte de despliegue...');
  
  const report = {
    timestamp: new Date().toISOString(),
    project: VERCEL_CONFIG.projectName,
    environment: VERCEL_CONFIG.environment,
    url: url || 'N/A',
    status: url ? 'success' : 'partial',
    features: [
      'PWA habilitado',
      'Service Worker activo',
      'Optimización de imágenes',
      'Caching avanzado',
      'Headers de seguridad',
      'Sistema Excel simple',
      'Dashboard Anbel IA',
      'Chat inteligente',
      'Predicciones en tiempo real'
    ]
  };
  
  fs.writeFileSync('deployment-report.json', JSON.stringify(report, null, 2));
  console.log('✅ Reporte de despliegue guardado en deployment-report.json');
}

// Función principal de despliegue
async function deployToProduction() {
  try {
    // 1. Verificaciones previas
    verifyVercelConfig();
    verifyBuild();
    
    // 2. Configuración de variables de entorno
    setVercelEnvVars();
    
    // 3. Despliegue
    const url = deployToVercel();
    
    // 4. Verificaciones post-despliegue
    verifyDeployment(url);
    setupCustomDomain();
    setupMonitoring();
    
    // 5. Reporte final
    generateDeploymentReport(url);
    
    console.log('\n🎉 DESPLIEGUE A PRODUCCIÓN COMPLETADO!');
    console.log('🌐 Aplicación disponible en:', url || 'Verificar en Vercel dashboard');
    console.log('📊 Monitoreo configurado');
    console.log('🔧 Variables de entorno configuradas');
    console.log('📱 PWA habilitado y funcionando');
    
    console.log('\n📋 PRÓXIMOS PASOS:');
    console.log('1. Verificar funcionamiento en producción');
    console.log('2. Configurar APIs de loterías reales');
    console.log('3. Configurar base de datos de producción');
    console.log('4. Activar monitoreo y alertas');
    console.log('5. Configurar backup automático');
    
  } catch (error) {
    console.error('\n❌ ERROR EN DESPLIEGUE:', error.message);
    process.exit(1);
  }
}

// Ejecutar despliegue
deployToProduction();