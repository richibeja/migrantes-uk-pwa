// Script para limpiar Service Workers existentes y forzar actualización
console.log('🧹 Limpiando Service Workers existentes...');

if ('serviceWorker' in navigator) {
  // Desregistrar todos los Service Workers existentes
  navigator.serviceWorker.getRegistrations().then(registrations => {
    console.log(`📊 Encontrados ${registrations.length} Service Workers`);
    
    registrations.forEach((registration, index) => {
      console.log(`🗑️ Desregistrando Service Worker ${index + 1}:`, registration.scope);
      registration.unregister().then(success => {
        console.log(success ? '✅ Desregistrado exitosamente' : '❌ Error al desregistrar');
      });
    });
    
    // Limpiar caché
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        console.log(`🗂️ Limpiando ${cacheNames.length} cachés...`);
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log(`🗑️ Eliminando caché: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('✅ Todos los cachés han sido limpiados');
        console.log('🔄 Recarga la página para registrar un nuevo Service Worker');
      });
    }
  });
} else {
  console.log('❌ Service Workers no soportados en este navegador');
}

// Función para forzar recarga después de limpiar
function forceReload() {
  console.log('🔄 Forzando recarga de la página...');
  window.location.reload(true);
}

// Auto-ejecutar después de 2 segundos
setTimeout(forceReload, 2000);
