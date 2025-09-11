const CACHE_VERSION = 'v2.0.0';
const STATIC_CACHE = 'ganafacil-static-' + CACHE_VERSION;
const DYNAMIC_CACHE = 'ganafacil-dynamic-' + CACHE_VERSION;

// Archivos estáticos para caché offline
const STATIC_FILES = [
  '/offline.html',
  '/manifest.json',
  '/icons/favicon.svg',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
  '/icons/apple-touch-icon.svg',
  // Rutas principales de la app que queremos tener navegables en cache si ya se visitaron
  '/login',
  '/activate',
  '/dashboard',
  '/admin',
  '/sales',
  '/profile',
  '/predictions',
  '/statistics'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        // Caching static files
        return Promise.allSettled(STATIC_FILES.map((url) => cache.add(url)));
      })
      .then((results) => {
        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;
        // Cache done
        return self.skipWaiting();
      })
      .catch((error) => {
        // Install error (ignored)
        // Continuar con la instalación incluso si hay errores
        return self.skipWaiting();
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminar todo lo que no sea la versión actual
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              // Deleting old cache
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Activation complete
        return self.clients.claim();
      })
      .catch((error) => {
        // Activate error (ignored)
        // Continuar con la activación
        return self.clients.claim();
      })
  );
});

// Interceptación de peticiones
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones GET
  if (request.method !== 'GET') {
    return;
  }

  // En desarrollo de Next.js, evita interceptar assets del runtime para prevenir errores tipo "Unexpected token '<'"
  if (url.pathname.startsWith('/_next/') || url.pathname.includes('/webpack') || url.pathname.includes('__next')) {
    return; // dejar que la red maneje estos requests
  }

  // Estrategia: Cache First para archivos estáticos
  // Fallback de navegación a offline.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          // 1) Si ya está cacheado el HTML, úsalo
          const cached = await caches.match(request);
          if (cached) return cached;
          // 2) Fallback a offline.html
          const offline = await caches.match('/offline.html');
          if (offline) return offline;
          return new Response('Offline', { status: 503 });
        })
    );
    return;
  }

  if (isStaticFile(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response; // Retorna desde cache
          }
          
          // Si no está en cache, lo busca en red y lo cachea
          return fetch(request)
            .then((networkResponse) => {
              if (networkResponse.status === 200) {
                const responseClone = networkResponse.clone();
                caches.open(DYNAMIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  })
                  .catch(err => console.log('Error cacheando:', err));
              }
              return networkResponse;
            })
            .catch(() => new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } }));
        })
        .catch(() => new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } }))
    );
  } else {
    // Para rutas dinámicas, usar Network First
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              })
              .catch(() => {});
          }
          return response;
        })
        .catch(() => {
          // Intentar servir desde cache si está disponible
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // No devolver offline.html para peticiones de recursos; usar 503 plano
              return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
            })
            .catch(() => new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } }));
        })
    );
  }
});

// Función para identificar archivos estáticos
function isStaticFile(pathname) {
  // Archivos con extensión o rutas principales que precacheamos
  if (pathname.includes('.')) return true;
  // Nota: /predictions/[id] no puede precachearse genéricamente; se cacheará en tiempo de ejecución tras visitarlo.
  return [
    '/',
    '/login',
    '/activate',
    '/dashboard',
    '/admin',
    '/sales',
    '/profile',
    '/predictions',
    '/statistics',
    '/manifest.json'
  ].includes(pathname);
}

// Función de sincronización en segundo plano
async function doBackgroundSync() {
  try {
    console.log('SW: Background sync…');
    // Implementar lógica de sincronización aquí
  } catch (error) {
    console.error('SW: Sync error:', error);
  }
}

// Manejo de notificaciones push
self.addEventListener('push', (event) => {
  
  if (event.data) {
    try {
      const data = event.data.json();
      const options = {
        body: data.body || 'Nueva predicción disponible en Gana Fácil',
        icon: '/icons/icon-192x192.svg',
        badge: '/icons/icon-192x192.svg',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
          url: data.url || '/dashboard'
        },
        actions: [
          {
            action: 'explore',
            title: 'Open',
            icon: '/icons/icon-192x192.svg'
          },
          {
            action: 'close',
            title: 'Close',
            icon: '/icons/icon-192x192.svg'
          }
        ]
      };

      event.waitUntil(
        self.registration.showNotification('Gana Fácil', options)
      );
    } catch (error) {
      // Push handling error (ignored)
    }
  }
});

// Manejo de clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  } else if (event.action === 'close') {
    // Solo cerrar la notificación
  } else {
    // Click en el cuerpo de la notificación
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

// Manejo de errores
// Optional: silent error handlers removed for cleaner console

// SW loaded






























