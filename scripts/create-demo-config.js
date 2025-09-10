#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Creando configuración de demostración...\n');

// Configuración de demostración (NO para producción real)
const demoConfig = `# Configuración de DEMOSTRACIÓN - NO USAR EN PRODUCCIÓN
# Estas son credenciales de ejemplo para probar la aplicación localmente

NEXT_PUBLIC_FIREBASE_API_KEY=demo-api-key-12345
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=demo-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=demo-project-12345
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=demo-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:demo123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-DEMO123456

# Configuración de la aplicación
NEXT_PUBLIC_APP_NAME=Gana Fácil
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_ENVIRONMENT=demo

# URLs de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SALES_URL=http://localhost:3000/sales
NEXT_PUBLIC_SALES_EN_URL=http://localhost:3000/sales-en

# Configuración de notificaciones
NEXT_PUBLIC_VAPID_KEY=demo-vapid-key

# Configuración de PayPal (opcional)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=demo-paypal-client-id

# Configuración de Google Apps Script (para activación)
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/DEMO_SCRIPT_ID/exec
`;

try {
  fs.writeFileSync('.env.local', demoConfig);
  console.log('✅ Configuración de demostración creada');
  console.log('\n⚠️  IMPORTANTE: Esta es una configuración de DEMO');
  console.log('   - La aplicación funcionará localmente');
  console.log('   - NO conectará a Firebase real');
  console.log('   - Para producción real, necesitas credenciales reales');
  console.log('\n🚀 Ahora puedes probar la aplicación:');
  console.log('   npm run start');
} catch (error) {
  console.error('❌ Error:', error.message);
}
