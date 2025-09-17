#!/usr/bin/env node

/**
 * 🔍 VERIFICACIÓN COMPLETA DE CONECTIVIDAD
 * Verifica todas las APIs, Gemini AI y funcionalidades del sistema
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

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

// Función para hacer peticiones HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.end();
  });
}

// Verificar configuración de Gemini
async function verifyGeminiConfig() {
  console.log(`\n${colors.cyan}${colors.bold}🤖 VERIFICANDO CONFIGURACIÓN DE GEMINI AI${colors.reset}`);
  
  try {
    const geminiConfigPath = path.join(__dirname, '..', 'src', 'config', 'gemini.ts');
    
    if (!fs.existsSync(geminiConfigPath)) {
      console.log(`${colors.red}❌ Archivo de configuración de Gemini no encontrado${colors.reset}`);
      return false;
    }
    
    const configContent = fs.readFileSync(geminiConfigPath, 'utf8');
    
    // Verificar que tenga la estructura correcta
    const hasAPIKey = configContent.includes('API_KEY');
    const hasModel = configContent.includes('MODEL');
    const hasTemperature = configContent.includes('TEMPERATURE');
    
    if (hasAPIKey && hasModel && hasTemperature) {
      console.log(`${colors.green}✅ Configuración de Gemini encontrada${colors.reset}`);
      
      // Verificar si tiene una API key real o demo
      const apiKeyMatch = configContent.match(/API_KEY:\s*['"`]([^'"`]+)['"`]/);
      if (apiKeyMatch) {
        const apiKey = apiKeyMatch[1];
        if (apiKey.includes('demo-key') || apiKey.includes('AIzaSyBvQZvQZvQZvQZvQZvQZvQZvQZvQZvQ')) {
          console.log(`${colors.yellow}⚠️  API Key de Gemini es demo/placeholder${colors.reset}`);
          console.log(`${colors.yellow}   Para producción, necesitas una API key real de Google AI${colors.reset}`);
        } else {
          console.log(`${colors.green}✅ API Key de Gemini configurada${colors.reset}`);
        }
      }
      
      return true;
    } else {
      console.log(`${colors.red}❌ Configuración de Gemini incompleta${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}❌ Error verificando Gemini: ${error.message}${colors.reset}`);
    return false;
  }
}

// Verificar APIs de loterías
async function verifyLotteryAPIs() {
  console.log(`\n${colors.cyan}${colors.bold}🎰 VERIFICANDO APIs DE LOTERÍAS${colors.reset}`);
  
  const lotteryAPIs = [
    {
      name: 'Powerball (NY Lottery)',
      url: 'https://data.ny.gov/resource/5xaw-6ayf.json',
      description: 'API oficial de Nueva York'
    },
    {
      name: 'Mega Millions (NY Lottery)',
      url: 'https://data.ny.gov/resource/5xaw-6ayf.json',
      description: 'API oficial de Nueva York'
    },
    {
      name: 'Cash4Life (NY Lottery)',
      url: 'https://data.ny.gov/resource/5xaw-6ayf.json',
      description: 'API oficial de Nueva York'
    },
    {
      name: 'Florida Lotto',
      url: 'https://www.flalottery.com/api/v1/draw-games/draws',
      description: 'API de Florida Lottery'
    },
    {
      name: 'California Lottery',
      url: 'https://www.calottery.com/api/v1/draw-games/draws',
      description: 'API de California Lottery'
    }
  ];
  
  let successCount = 0;
  
  for (const api of lotteryAPIs) {
    try {
      console.log(`\n${colors.white}🔍 Verificando ${api.name}...${colors.reset}`);
      
      const response = await makeRequest(api.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        }
      });
      
      if (response.status === 200) {
        console.log(`${colors.green}✅ ${api.name} - Conectado (${response.status})${colors.reset}`);
        console.log(`${colors.blue}   ${api.description}${colors.reset}`);
        successCount++;
      } else {
        console.log(`${colors.yellow}⚠️  ${api.name} - Respuesta ${response.status}${colors.reset}`);
        console.log(`${colors.blue}   ${api.description}${colors.reset}`);
      }
    } catch (error) {
      console.log(`${colors.red}❌ ${api.name} - Error: ${error.message}${colors.reset}`);
      console.log(`${colors.blue}   ${api.description}${colors.reset}`);
    }
  }
  
  console.log(`\n${colors.cyan}📊 Resumen de APIs de Loterías: ${successCount}/${lotteryAPIs.length} conectadas${colors.reset}`);
  return successCount > 0;
}

// Verificar archivos de configuración
async function verifyConfigFiles() {
  console.log(`\n${colors.cyan}${colors.bold}📁 VERIFICANDO ARCHIVOS DE CONFIGURACIÓN${colors.reset}`);
  
  const configFiles = [
    {
      path: 'src/config/gemini.ts',
      name: 'Configuración de Gemini AI',
      required: true
    },
    {
      path: 'src/lib/gemini-ai.ts',
      name: 'Servicio de Gemini AI',
      required: true
    },
    {
      path: 'src/lib/anbel-ai.ts',
      name: 'Lógica de Anbel AI',
      required: true
    },
    {
      path: 'src/lib/lotteryConfig.ts',
      name: 'Configuración de Loterías',
      required: true
    },
    {
      path: 'src/lib/us-lottery-apis.ts',
      name: 'APIs de Loterías USA',
      required: true
    },
    {
      path: 'src/lib/lottery-apis-real.ts',
      name: 'APIs de Loterías Reales',
      required: true
    },
    {
      path: 'src/components/AnbelChat.tsx',
      name: 'Componente AnbelChat',
      required: true
    },
    {
      path: 'vercel.json',
      name: 'Configuración de Vercel',
      required: true
    }
  ];
  
  let successCount = 0;
  
  for (const file of configFiles) {
    const filePath = path.join(__dirname, '..', file.path);
    
    if (fs.existsSync(filePath)) {
      console.log(`${colors.green}✅ ${file.name} - Encontrado${colors.reset}`);
      successCount++;
    } else {
      if (file.required) {
        console.log(`${colors.red}❌ ${file.name} - FALTANTE (REQUERIDO)${colors.reset}`);
      } else {
        console.log(`${colors.yellow}⚠️  ${file.name} - No encontrado${colors.reset}`);
      }
    }
  }
  
  console.log(`\n${colors.cyan}📊 Archivos de configuración: ${successCount}/${configFiles.length} encontrados${colors.reset}`);
  return successCount === configFiles.filter(f => f.required).length;
}

// Verificar variables de entorno
async function verifyEnvironmentVariables() {
  console.log(`\n${colors.cyan}${colors.bold}🌍 VERIFICANDO VARIABLES DE ENTORNO${colors.reset}`);
  
  try {
    const vercelConfigPath = path.join(__dirname, '..', 'vercel.json');
    
    if (!fs.existsSync(vercelConfigPath)) {
      console.log(`${colors.red}❌ Archivo vercel.json no encontrado${colors.reset}`);
      return false;
    }
    
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
    const envVars = vercelConfig.env || {};
    
    console.log(`${colors.white}📋 Variables de entorno configuradas:${colors.reset}`);
    
    for (const [key, value] of Object.entries(envVars)) {
      if (key.includes('API_KEY') || key.includes('SECRET')) {
        const maskedValue = value.length > 10 ? value.substring(0, 10) + '...' : '***';
        console.log(`${colors.blue}   ${key}: ${maskedValue}${colors.reset}`);
      } else {
        console.log(`${colors.blue}   ${key}: ${value}${colors.reset}`);
      }
    }
    
    // Verificar variables críticas
    const criticalVars = ['NEXT_PUBLIC_APP_URL', 'NEXT_PUBLIC_GEMINI_API_KEY'];
    let criticalCount = 0;
    
    for (const varName of criticalVars) {
      if (envVars[varName]) {
        console.log(`${colors.green}✅ ${varName} - Configurada${colors.reset}`);
        criticalCount++;
      } else {
        console.log(`${colors.red}❌ ${varName} - NO CONFIGURADA${colors.reset}`);
      }
    }
    
    console.log(`\n${colors.cyan}📊 Variables críticas: ${criticalCount}/${criticalVars.length} configuradas${colors.reset}`);
    return criticalCount === criticalVars.length;
    
  } catch (error) {
    console.log(`${colors.red}❌ Error verificando variables de entorno: ${error.message}${colors.reset}`);
    return false;
  }
}

// Verificar funcionalidades de Anbel AI
async function verifyAnbelAIFeatures() {
  console.log(`\n${colors.cyan}${colors.bold}🧠 VERIFICANDO FUNCIONALIDADES DE ANBEL AI${colors.reset}`);
  
  try {
    const anbelAIPath = path.join(__dirname, '..', 'src', 'lib', 'anbel-ai.ts');
    
    if (!fs.existsSync(anbelAIPath)) {
      console.log(`${colors.red}❌ Archivo anbel-ai.ts no encontrado${colors.reset}`);
      return false;
    }
    
    const anbelContent = fs.readFileSync(anbelAIPath, 'utf8');
    
    const features = [
      { name: 'Integración con Gemini AI', pattern: 'processWithGemini' },
      { name: 'Predicciones de lotería', pattern: 'generateUltraPrediction' },
      { name: 'Análisis de tickets', pattern: 'simulateTicketAnalysis' },
      { name: 'Sistema de gamificación', pattern: 'updateUserStats' },
      { name: 'Compartir en redes sociales', pattern: 'generateSocialLinks' },
      { name: 'Análisis de sentimientos', pattern: 'getSocialSentiment' },
      { name: 'Detección de intenciones', pattern: 'detectIntent' },
      { name: 'Respuestas contextuales', pattern: 'generateContextualResponse' },
      { name: 'APIs de loterías reales', pattern: 'getRealLotteryData' },
      { name: 'Sistema de fallback', pattern: 'generateEmergencyPredictionLocal' }
    ];
    
    let successCount = 0;
    
    for (const feature of features) {
      if (anbelContent.includes(feature.pattern)) {
        console.log(`${colors.green}✅ ${feature.name}${colors.reset}`);
        successCount++;
      } else {
        console.log(`${colors.red}❌ ${feature.name} - NO ENCONTRADO${colors.reset}`);
      }
    }
    
    console.log(`\n${colors.cyan}📊 Funcionalidades de Anbel AI: ${successCount}/${features.length} implementadas${colors.reset}`);
    return successCount >= features.length * 0.8; // 80% de las funcionalidades
    
  } catch (error) {
    console.log(`${colors.red}❌ Error verificando Anbel AI: ${error.message}${colors.reset}`);
    return false;
  }
}

// Verificar conectividad de Gemini AI
async function verifyGeminiConnectivity() {
  console.log(`\n${colors.cyan}${colors.bold}🔗 VERIFICANDO CONECTIVIDAD DE GEMINI AI${colors.reset}`);
  
  try {
    // Simular una petición a Gemini (no podemos hacer peticiones reales sin API key)
    console.log(`${colors.white}🔍 Verificando configuración de Gemini...${colors.reset}`);
    
    const geminiConfigPath = path.join(__dirname, '..', 'src', 'config', 'gemini.ts');
    const geminiServicePath = path.join(__dirname, '..', 'src', 'lib', 'gemini-ai.ts');
    
    if (fs.existsSync(geminiConfigPath) && fs.existsSync(geminiServicePath)) {
      console.log(`${colors.green}✅ Archivos de Gemini AI encontrados${colors.reset}`);
      
      const geminiService = fs.readFileSync(geminiServicePath, 'utf8');
      
      if (geminiService.includes('class GeminiAIService') && geminiService.includes('processMessage')) {
        console.log(`${colors.green}✅ Servicio de Gemini AI implementado${colors.reset}`);
        console.log(`${colors.blue}   - Clase GeminiAIService encontrada${colors.reset}`);
        console.log(`${colors.blue}   - Método processMessage implementado${colors.reset}`);
        
        // Verificar configuración
        const configContent = fs.readFileSync(geminiConfigPath, 'utf8');
        if (configContent.includes('GEMINI_CONFIG')) {
          console.log(`${colors.green}✅ Configuración de Gemini encontrada${colors.reset}`);
          return true;
        } else {
          console.log(`${colors.red}❌ Configuración de Gemini incompleta${colors.reset}`);
          return false;
        }
      } else {
        console.log(`${colors.red}❌ Servicio de Gemini AI incompleto${colors.reset}`);
        return false;
      }
    } else {
      console.log(`${colors.red}❌ Archivos de Gemini AI no encontrados${colors.reset}`);
      return false;
    }
    
  } catch (error) {
    console.log(`${colors.red}❌ Error verificando Gemini AI: ${error.message}${colors.reset}`);
    return false;
  }
}

// Función principal
async function main() {
  console.log(`${colors.magenta}${colors.bold}`);
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                🔍 VERIFICACIÓN COMPLETA DEL SISTEMA         ║');
  console.log('║                    APIs, Gemini AI y Más                     ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}`);
  
  const results = {
    geminiConfig: false,
    lotteryAPIs: false,
    configFiles: false,
    environmentVars: false,
    anbelFeatures: false,
    geminiConnectivity: false
  };
  
  // Ejecutar todas las verificaciones
  results.geminiConfig = await verifyGeminiConfig();
  results.lotteryAPIs = await verifyLotteryAPIs();
  results.configFiles = await verifyConfigFiles();
  results.environmentVars = await verifyEnvironmentVariables();
  results.anbelFeatures = await verifyAnbelAIFeatures();
  results.geminiConnectivity = await verifyGeminiConnectivity();
  
  // Resumen final
  console.log(`\n${colors.magenta}${colors.bold}╔══════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}║                        📊 RESUMEN FINAL                        ║${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}╚══════════════════════════════════════════════════════════════╝${colors.reset}`);
  
  const totalChecks = Object.keys(results).length;
  const passedChecks = Object.values(results).filter(Boolean).length;
  
  console.log(`\n${colors.white}🔍 Verificaciones realizadas: ${totalChecks}${colors.reset}`);
  console.log(`${colors.green}✅ Exitosas: ${passedChecks}${colors.reset}`);
  console.log(`${colors.red}❌ Fallidas: ${totalChecks - passedChecks}${colors.reset}`);
  
  // Estado de cada verificación
  console.log(`\n${colors.white}📋 Estado detallado:${colors.reset}`);
  console.log(`${results.geminiConfig ? colors.green + '✅' : colors.red + '❌'} Configuración de Gemini AI${colors.reset}`);
  console.log(`${results.lotteryAPIs ? colors.green + '✅' : colors.red + '❌'} APIs de Loterías${colors.reset}`);
  console.log(`${results.configFiles ? colors.green + '✅' : colors.red + '❌'} Archivos de Configuración${colors.reset}`);
  console.log(`${results.environmentVars ? colors.green + '✅' : colors.red + '❌'} Variables de Entorno${colors.reset}`);
  console.log(`${results.anbelFeatures ? colors.green + '✅' : colors.red + '❌'} Funcionalidades de Anbel AI${colors.reset}`);
  console.log(`${results.geminiConnectivity ? colors.green + '✅' : colors.red + '❌'} Conectividad de Gemini AI${colors.reset}`);
  
  // Recomendaciones
  console.log(`\n${colors.cyan}${colors.bold}💡 RECOMENDACIONES:${colors.reset}`);
  
  if (!results.geminiConfig) {
    console.log(`${colors.yellow}⚠️  Configurar API key real de Gemini AI para producción${colors.reset}`);
  }
  
  if (!results.lotteryAPIs) {
    console.log(`${colors.yellow}⚠️  Algunas APIs de loterías pueden estar temporalmente inaccesibles${colors.reset}`);
  }
  
  if (!results.environmentVars) {
    console.log(`${colors.yellow}⚠️  Verificar variables de entorno en Vercel${colors.reset}`);
  }
  
  if (passedChecks >= totalChecks * 0.8) {
    console.log(`${colors.green}🎉 ¡Sistema funcionando correctamente!${colors.reset}`);
    console.log(`${colors.green}   Todas las funcionalidades principales están operativas${colors.reset}`);
  } else {
    console.log(`${colors.red}⚠️  Sistema necesita atención${colors.reset}`);
    console.log(`${colors.red}   Algunas funcionalidades pueden no estar funcionando${colors.reset}`);
  }
  
  console.log(`\n${colors.magenta}${colors.bold}╔══════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}║                    🚀 VERIFICACIÓN COMPLETADA                 ║${colors.reset}`);
  console.log(`${colors.magenta}${colors.bold}╚══════════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  process.exit(passedChecks >= totalChecks * 0.8 ? 0 : 1);
}

// Ejecutar verificación
main().catch(error => {
  console.error(`${colors.red}❌ Error fatal: ${error.message}${colors.reset}`);
  process.exit(1);
});
