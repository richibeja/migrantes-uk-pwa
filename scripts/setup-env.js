#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Configurando archivo .env.local...\n');

const envContent = `# Firebase Configuration
# Obtén estas credenciales desde Firebase Console > Configuración del proyecto

NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123def456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABC123DEF4

# Configuración de la aplicación
NEXT_PUBLIC_APP_NAME=Gana Fácil
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_ENVIRONMENT=production

# URLs de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SALES_URL=http://localhost:3000/sales
NEXT_PUBLIC_SALES_EN_URL=http://localhost:3000/sales-en

# Configuración de notificaciones
NEXT_PUBLIC_VAPID_KEY=your_vapid_key_here

# Configuración de PayPal (opcional)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id_here

# Configuración de Google Apps Script (para activación)
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
`;

try {
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Archivo .env.local creado exitosamente');
  console.log('\n📋 Próximos pasos:');
  console.log('1. Ve a Firebase Console: https://console.firebase.google.com/');
  console.log('2. Selecciona tu proyecto');
  console.log('3. Ve a Configuración > Configuración del proyecto');
  console.log('4. En la pestaña General, copia las credenciales');
  console.log('5. Reemplaza los valores en .env.local');
  console.log('6. Ejecuta: npm run start');
  console.log('\n🔑 Variables que necesitas actualizar:');
  console.log('   - NEXT_PUBLIC_FIREBASE_API_KEY');
  console.log('   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
  console.log('   - NEXT_PUBLIC_FIREBASE_PROJECT_ID');
  console.log('   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
  console.log('   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
  console.log('   - NEXT_PUBLIC_FIREBASE_APP_ID');
} catch (error) {
  console.error('❌ Error creando .env.local:', error.message);
  console.log('\n💡 Crea manualmente el archivo .env.local con el siguiente contenido:');
  console.log(envContent);
}
