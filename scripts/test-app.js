#!/usr/bin/env node

const http = require('http');

console.log('🧪 Probando aplicación...\n');

const testUrl = 'http://localhost:3000';
const timeout = 5000;

const testApp = () => {
  return new Promise((resolve, reject) => {
    const req = http.get(testUrl, { timeout }, (res) => {
      console.log(`✅ Aplicación funcionando - Status: ${res.statusCode}`);
      console.log(`📱 Abre tu navegador en: ${testUrl}`);
      console.log('\n🎯 Páginas disponibles:');
      console.log('   - Dashboard: http://localhost:3000/dashboard');
      console.log('   - Ventas (ES): http://localhost:3000/sales');
      console.log('   - Ventas (EN): http://localhost:3000/sales-en');
      console.log('   - Activación: http://localhost:3000/activate');
      console.log('   - Legal: http://localhost:3000/legal');
      resolve(true);
    });

    req.on('error', (err) => {
      if (err.code === 'ECONNREFUSED') {
        console.log('⏳ Aplicación iniciándose... Espera unos segundos más.');
        console.log('💡 Si no inicia, ejecuta: npm run start');
      } else {
        console.log('❌ Error:', err.message);
      }
      reject(err);
    });

    req.on('timeout', () => {
      console.log('⏰ Timeout - La aplicación puede estar iniciándose...');
      reject(new Error('Timeout'));
    });
  });
};

// Esperar un poco y probar
setTimeout(() => {
  testApp().catch(() => {
    console.log('\n🔄 Intenta de nuevo en unos segundos...');
    console.log('   npm run start');
  });
}, 2000);
