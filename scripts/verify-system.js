/**
 * 🔍 SCRIPT DE VERIFICACIÓN COMPLETA DEL SISTEMA
 * Verifica que todas las conexiones estén funcionando
 */

const axios = require('axios');

// Configuración de APIs a verificar
const APIs_TO_TEST = {
  // APIs de loterías de USA
  powerball: 'https://data.ny.gov/resource/5xaw-6ayf.json',
  megaMillions: 'https://data.ny.gov/resource/5xaw-6ayf.json',
  cash4Life: 'https://data.ny.gov/resource/5xaw-6ayf.json',
  
  // APIs de respaldo
  powerballBackup: 'https://www.powerball.com/api/v1/numbers/latest',
  megaMillionsBackup: 'https://www.megamillions.com/api/v1/numbers/latest',
  
  // APIs internacionales
  euromillions: 'https://api.euromillions.com/api/v1/results/latest',
  baloto: 'https://api.baloto.com/api/v1/results/latest',
  
  // Gemini AI
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
};

// Colores para la consola
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Función para probar una API
async function testAPI(name, url, options = {}) {
  try {
    console.log(`${colors.blue}🔍 Probando ${name}...${colors.reset}`);
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'GanaFacil/1.0',
        'Accept': 'application/json'
      },
      ...options
    });
    
    if (response.status === 200) {
      console.log(`${colors.green}✅ ${name}: CONECTADO (${response.status})${colors.reset}`);
      return { success: true, status: response.status, data: response.data };
    } else {
      console.log(`${colors.yellow}⚠️  ${name}: Respuesta inesperada (${response.status})${colors.reset}`);
      return { success: false, status: response.status, error: 'Unexpected status' };
    }
  } catch (error) {
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.log(`${colors.red}❌ ${name}: NO CONECTADO (${error.code})${colors.reset}`);
    } else if (error.response) {
      console.log(`${colors.yellow}⚠️  ${name}: Error ${error.response.status} - ${error.response.statusText}${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ ${name}: ERROR - ${error.message}${colors.reset}`);
    }
    return { success: false, error: error.message };
  }
}

// Función para probar Gemini AI
async function testGemini() {
  try {
    console.log(`${colors.blue}🔍 Probando Gemini AI...${colors.reset}`);
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'demo-key';
    
    if (apiKey === 'demo-key') {
      console.log(`${colors.yellow}⚠️  Gemini AI: API KEY DEMO (no real)${colors.reset}`);
      return { success: false, error: 'Demo key' };
    }
    
    const response = await axios.post(
      `${APIs_TO_TEST.gemini}?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: 'Hola, ¿estás funcionando?'
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );
    
    if (response.status === 200 && response.data.candidates) {
      console.log(`${colors.green}✅ Gemini AI: CONECTADO${colors.reset}`);
      return { success: true, data: response.data };
    } else {
      console.log(`${colors.yellow}⚠️  Gemini AI: Respuesta inesperada${colors.reset}`);
      return { success: false, error: 'Unexpected response' };
    }
  } catch (error) {
    console.log(`${colors.red}❌ Gemini AI: ERROR - ${error.message}${colors.reset}`);
    return { success: false, error: error.message };
  }
}

// Función principal de verificación
async function verifySystem() {
  console.log(`${colors.bold}${colors.blue}🔍 VERIFICACIÓN COMPLETA DEL SISTEMA GANAFACIL${colors.reset}\n`);
  
  const results = {
    apis: {},
    gemini: null,
    summary: { total: 0, connected: 0, failed: 0 }
  };
  
  // Probar APIs de loterías
  console.log(`${colors.bold}📡 VERIFICANDO APIs DE LOTERÍAS:${colors.reset}`);
  for (const [name, url] of Object.entries(APIs_TO_TEST)) {
    if (name === 'gemini') continue; // Gemini se prueba por separado
    
    const result = await testAPI(name, url);
    results.apis[name] = result;
    results.summary.total++;
    
    if (result.success) {
      results.summary.connected++;
    } else {
      results.summary.failed++;
    }
    
    // Pequeña pausa entre requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n${colors.bold}🤖 VERIFICANDO GEMINI AI:${colors.reset}`);
  results.gemini = await testGemini();
  results.summary.total++;
  
  if (results.gemini.success) {
    results.summary.connected++;
  } else {
    results.summary.failed++;
  }
  
  // Resumen final
  console.log(`\n${colors.bold}📊 RESUMEN DE VERIFICACIÓN:${colors.reset}`);
  console.log(`${colors.blue}Total de conexiones probadas: ${results.summary.total}${colors.reset}`);
  console.log(`${colors.green}Conectadas exitosamente: ${results.summary.connected}${colors.reset}`);
  console.log(`${colors.red}Fallaron: ${results.summary.failed}${colors.reset}`);
  
  const successRate = (results.summary.connected / results.summary.total) * 100;
  console.log(`${colors.bold}Porcentaje de éxito: ${successRate.toFixed(1)}%${colors.reset}`);
  
  if (successRate >= 80) {
    console.log(`\n${colors.green}${colors.bold}🎉 SISTEMA FUNCIONANDO CORRECTAMENTE${colors.reset}`);
  } else if (successRate >= 50) {
    console.log(`\n${colors.yellow}${colors.bold}⚠️  SISTEMA PARCIALMENTE FUNCIONAL${colors.reset}`);
  } else {
    console.log(`\n${colors.red}${colors.bold}❌ SISTEMA CON PROBLEMAS${colors.reset}`);
  }
  
  // Recomendaciones
  console.log(`\n${colors.bold}💡 RECOMENDACIONES:${colors.reset}`);
  
  if (!results.gemini.success) {
    console.log(`${colors.yellow}• Configurar API key real de Gemini AI${colors.reset}`);
  }
  
  const failedAPIs = Object.entries(results.apis).filter(([_, result]) => !result.success);
  if (failedAPIs.length > 0) {
    console.log(`${colors.yellow}• Revisar conexiones de APIs fallidas:${colors.reset}`);
    failedAPIs.forEach(([name, _]) => {
      console.log(`  - ${name}`);
    });
  }
  
  if (results.summary.connected === results.summary.total) {
    console.log(`${colors.green}• ¡Todas las conexiones están funcionando perfectamente!${colors.reset}`);
  }
  
  return results;
}

// Ejecutar verificación
if (require.main === module) {
  verifySystem().catch(console.error);
}

module.exports = { verifySystem, testAPI, testGemini };
