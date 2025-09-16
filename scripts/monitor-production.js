#!/usr/bin/env node

// SCRIPT DE MONITOREO DE PRODUCCIÓN - GANA FÁCIL ANBEL IA
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('📊 INICIANDO MONITOREO DE PRODUCCIÓN - GANA FÁCIL ANBEL IA');
console.log('⏰ Timestamp:', new Date().toISOString());

// Configuración de monitoreo
const MONITORING_CONFIG = {
  productionUrl: process.env.PRODUCTION_URL || 'https://ganafaci-anbel-pwa.vercel.app',
  checkInterval: 30000, // 30 segundos
  alertThresholds: {
    responseTime: 2000, // 2 segundos
    errorRate: 5, // 5%
    availability: 99 // 99%
  },
  endpoints: [
    '/',
    '/dashboard',
    '/activate-simple',
    '/admin-simple',
    '/api/health',
    '/manifest.json'
  ]
};

// Métricas de monitoreo
let metrics = {
  totalChecks: 0,
  successfulChecks: 0,
  failedChecks: 0,
  averageResponseTime: 0,
  uptime: 0,
  lastCheck: null,
  errors: []
};

// Función para hacer check HTTP/HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const requestOptions = {
      timeout: 10000,
      ...options
    };
    
    const req = client.request(url, requestOptions, (res) => {
      const responseTime = Date.now() - startTime;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          responseTime,
          data: data.substring(0, 1000), // Primeros 1000 caracteres
          headers: res.headers
        });
      });
    });
    
    req.on('error', (error) => {
      reject({
        error: error.message,
        responseTime: Date.now() - startTime
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject({
        error: 'Request timeout',
        responseTime: Date.now() - startTime
      });
    });
    
    req.end();
  });
}

// Función para verificar endpoint
async function checkEndpoint(endpoint) {
  const url = `${MONITORING_CONFIG.productionUrl}${endpoint}`;
  
  try {
    const result = await makeRequest(url);
    
    return {
      endpoint,
      status: 'success',
      statusCode: result.statusCode,
      responseTime: result.responseTime,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    return {
      endpoint,
      status: 'error',
      error: error.error || 'Unknown error',
      responseTime: error.responseTime || 0,
      timestamp: new Date().toISOString()
    };
  }
}

// Función para verificar todos los endpoints
async function checkAllEndpoints() {
  console.log('\n🔍 Verificando endpoints de producción...');
  
  const checks = MONITORING_CONFIG.endpoints.map(endpoint => checkEndpoint(endpoint));
  const results = await Promise.all(checks);
  
  let successful = 0;
  let totalResponseTime = 0;
  
  results.forEach(result => {
    if (result.status === 'success') {
      successful++;
      totalResponseTime += result.responseTime;
      console.log(`✅ ${result.endpoint} - ${result.statusCode} (${result.responseTime}ms)`);
    } else {
      console.log(`❌ ${result.endpoint} - ${result.error} (${result.responseTime}ms)`);
      metrics.errors.push(result);
    }
  });
  
  // Actualizar métricas
  metrics.totalChecks += results.length;
  metrics.successfulChecks += successful;
  metrics.failedChecks += results.length - successful;
  metrics.averageResponseTime = totalResponseTime / results.length;
  metrics.lastCheck = new Date().toISOString();
  
  return results;
}

// Función para verificar PWA
async function checkPWA() {
  console.log('\n📱 Verificando PWA...');
  
  try {
    // Verificar manifest.json
    const manifestResult = await checkEndpoint('/manifest.json');
    if (manifestResult.status === 'success') {
      console.log('✅ Manifest.json accesible');
    } else {
      console.log('❌ Manifest.json no accesible');
    }
    
    // Verificar service worker
    const swResult = await checkEndpoint('/sw.js');
    if (swResult.status === 'success') {
      console.log('✅ Service Worker accesible');
    } else {
      console.log('❌ Service Worker no accesible');
    }
    
    // Verificar iconos PWA
    const iconResult = await checkEndpoint('/icon-192x192.png');
    if (iconResult.status === 'success') {
      console.log('✅ Iconos PWA accesibles');
    } else {
      console.log('❌ Iconos PWA no accesibles');
    }
    
  } catch (error) {
    console.log('❌ Error verificando PWA:', error.message);
  }
}

// Función para verificar APIs de loterías
async function checkLotteryAPIs() {
  console.log('\n🎰 Verificando APIs de loterías...');
  
  const lotteryAPIs = [
    'https://data.powerball.com/api/latest',
    'https://data.megamillions.com/api/latest',
    'https://data.euromillions.com/api/latest'
  ];
  
  for (const apiUrl of lotteryAPIs) {
    try {
      const result = await makeRequest(apiUrl);
      console.log(`✅ ${apiUrl} - ${result.statusCode} (${result.responseTime}ms)`);
    } catch (error) {
      console.log(`❌ ${apiUrl} - ${error.error} (${error.responseTime}ms)`);
    }
  }
}

// Función para generar reporte de salud
function generateHealthReport() {
  const uptime = ((metrics.successfulChecks / metrics.totalChecks) * 100).toFixed(2);
  const errorRate = ((metrics.failedChecks / metrics.totalChecks) * 100).toFixed(2);
  
  const report = {
    timestamp: new Date().toISOString(),
    productionUrl: MONITORING_CONFIG.productionUrl,
    uptime: `${uptime}%`,
    errorRate: `${errorRate}%`,
    averageResponseTime: `${metrics.averageResponseTime.toFixed(0)}ms`,
    totalChecks: metrics.totalChecks,
    successfulChecks: metrics.successfulChecks,
    failedChecks: metrics.failedChecks,
    status: uptime >= MONITORING_CONFIG.alertThresholds.availability ? 'healthy' : 'unhealthy',
    alerts: []
  };
  
  // Generar alertas
  if (uptime < MONITORING_CONFIG.alertThresholds.availability) {
    report.alerts.push({
      type: 'availability',
      message: `Uptime ${uptime}% below threshold ${MONITORING_CONFIG.alertThresholds.availability}%`
    });
  }
  
  if (metrics.averageResponseTime > MONITORING_CONFIG.alertThresholds.responseTime) {
    report.alerts.push({
      type: 'performance',
      message: `Average response time ${metrics.averageResponseTime.toFixed(0)}ms above threshold ${MONITORING_CONFIG.alertThresholds.responseTime}ms`
    });
  }
  
  if (errorRate > MONITORING_CONFIG.alertThresholds.errorRate) {
    report.alerts.push({
      type: 'error_rate',
      message: `Error rate ${errorRate}% above threshold ${MONITORING_CONFIG.alertThresholds.errorRate}%`
    });
  }
  
  return report;
}

// Función para enviar alertas
function sendAlert(alert) {
  console.log(`🚨 ALERTA: ${alert.type} - ${alert.message}`);
  
  // Aquí se podría integrar con Slack, Discord, Email, etc.
  const webhookUrl = process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  
  if (webhookUrl) {
    const payload = {
      text: `🚨 GANA FÁCIL ANBEL IA - ${alert.type.toUpperCase()}`,
      attachments: [{
        color: 'danger',
        fields: [{
          title: 'Mensaje',
          value: alert.message,
          short: false
        }, {
          title: 'Timestamp',
          value: new Date().toISOString(),
          short: true
        }]
      }]
    };
    
    // Enviar webhook (implementación básica)
    console.log('📤 Enviando alerta via webhook...');
  }
}

// Función para guardar métricas
function saveMetrics() {
  const metricsFile = 'production-metrics.json';
  const existingMetrics = fs.existsSync(metricsFile) ? JSON.parse(fs.readFileSync(metricsFile, 'utf8')) : [];
  
  existingMetrics.push({
    timestamp: new Date().toISOString(),
    ...metrics
  });
  
  // Mantener solo las últimas 1000 entradas
  if (existingMetrics.length > 1000) {
    existingMetrics.splice(0, existingMetrics.length - 1000);
  }
  
  fs.writeFileSync(metricsFile, JSON.stringify(existingMetrics, null, 2));
}

// Función principal de monitoreo
async function startMonitoring() {
  console.log('🚀 Iniciando monitoreo continuo...');
  console.log(`🌐 URL de producción: ${MONITORING_CONFIG.productionUrl}`);
  console.log(`⏱️ Intervalo de verificación: ${MONITORING_CONFIG.checkInterval / 1000} segundos`);
  
  // Verificación inicial
  await checkAllEndpoints();
  await checkPWA();
  await checkLotteryAPIs();
  
  // Monitoreo continuo
  setInterval(async () => {
    console.log(`\n⏰ Verificación ${new Date().toLocaleTimeString()}`);
    
    const results = await checkAllEndpoints();
    const report = generateHealthReport();
    
    // Mostrar resumen
    console.log(`📊 Uptime: ${report.uptime} | Error Rate: ${report.errorRate} | Response Time: ${report.averageResponseTime}`);
    
    // Enviar alertas si es necesario
    if (report.alerts.length > 0) {
      report.alerts.forEach(alert => sendAlert(alert));
    }
    
    // Guardar métricas
    saveMetrics();
    
    // Guardar reporte de salud
    fs.writeFileSync('health-report.json', JSON.stringify(report, null, 2));
    
  }, MONITORING_CONFIG.checkInterval);
}

// Función para verificación única
async function singleCheck() {
  console.log('🔍 Ejecutando verificación única...');
  
  await checkAllEndpoints();
  await checkPWA();
  await checkLotteryAPIs();
  
  const report = generateHealthReport();
  console.log('\n📋 REPORTE DE SALUD:');
  console.log(`Uptime: ${report.uptime}`);
  console.log(`Error Rate: ${report.errorRate}`);
  console.log(`Response Time: ${report.averageResponseTime}`);
  console.log(`Status: ${report.status}`);
  
  if (report.alerts.length > 0) {
    console.log('\n🚨 ALERTAS:');
    report.alerts.forEach(alert => {
      console.log(`- ${alert.type}: ${alert.message}`);
    });
  }
  
  // Guardar reporte
  fs.writeFileSync('health-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Reporte guardado en health-report.json');
}

// Manejo de argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.includes('--single')) {
  singleCheck().then(() => process.exit(0));
} else if (args.includes('--continuous')) {
  startMonitoring();
} else {
  console.log('Uso: node scripts/monitor-production.js [--single|--continuous]');
  console.log('--single: Ejecutar verificación única');
  console.log('--continuous: Iniciar monitoreo continuo');
  process.exit(1);
}
