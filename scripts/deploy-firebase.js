const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando despliegue a Firebase...');

try {
  // 1. Limpiar directorios anteriores
  console.log('🧹 Limpiando directorios anteriores...');
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }

  // 2. Instalar dependencias
  console.log('📦 Instalando dependencias...');
  execSync('npm install', { stdio: 'inherit' });

  // 3. Construir la aplicación
  console.log('🔨 Construyendo la aplicación...');
  execSync('npm run build', { stdio: 'inherit' });

  // 4. Verificar que se creó el directorio out
  if (!fs.existsSync('out')) {
    throw new Error('❌ El directorio "out" no se creó. Verifica la configuración de Next.js.');
  }

  // 5. Desplegar a Firebase
  console.log('🔥 Desplegando a Firebase...');
  execSync('firebase deploy --only hosting', { stdio: 'inherit' });

  console.log('✅ ¡Despliegue completado exitosamente!');
  console.log('🌐 Tu aplicación está disponible en: https://gana-facil-rifa-d5609.web.app');

} catch (error) {
  console.error('❌ Error durante el despliegue:', error.message);
  process.exit(1);
}
