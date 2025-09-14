const CACHE_NAME = 'ganafacil-pwa-v3.0.0';
const STATIC_CACHE = 'ganafacil-static-v3.0.0';
const DYNAMIC_CACHE = 'ganafacil-dynamic-v3.0.0';

// Archivos críticos para cache
const CRITICAL_FILES = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/offline.html'
];

// Archivos estáticos
const STATIC_FILES = [
  '/icons/icon-16x16.png',
  '/icons/icon-32x32.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker v3: Installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📦 Caching static files...');
        return cache.addAll(STATIC_FILES);
      }),
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('📦 Caching critical files...');
        return cache.addAll(CRITICAL_FILES);
      })
    ]).then(() => {
      console.log('✅ Service Worker v3: Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker v3: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Tomar control de todas las páginas
      self.clients.claim()
    ]).then(() => {
      console.log('✅ Service Worker v3: Activation complete');
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo procesar requests HTTP/HTTPS
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Estrategia basada en el tipo de request
  if (isStaticFile(request)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (isImageRequest(request)) {
    event.respondWith(imageStrategy(request));
  } else {
    event.respondWith(networkFirstStrategy(request));
  }
});

// Verificar si es un archivo estático
function isStaticFile(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/icons/') || 
         url.pathname.startsWith('/_next/static/') ||
         url.pathname === '/manifest.json';
}

// Verificar si es un request de imagen
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
}

// Estrategia Cache First para archivos estáticos
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      // Clonar la respuesta ANTES de usarla
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('❌ Cache and network failed for:', request.url);
    throw error;
  }
}

// Estrategia para imágenes
async function imageStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      // Clonar la respuesta ANTES de usarla
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    // Devolver imagen placeholder
    return new Response(
      '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" fill="#999">Image not available</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Estrategia Network First para páginas dinámicas
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      // Clonar la respuesta ANTES de usarla
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🌐 Network failed, trying cache...');
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Devolver página offline si es un documento
    if (request.destination === 'document') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('🤖 Service Worker v3: Script loaded');
