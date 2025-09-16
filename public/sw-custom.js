// Service Worker personalizado para GANA FÁCIL PWA
const CACHE_NAME = 'ganafacil-pwa-v2.0.0';
const urlsToCache = [
  '/',
  '/activate-simple',
  '/admin-simple',
  '/manifest.json',
  '/offline.html'
];

// Instalación
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Almacenando en cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando cache viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia: Cache First para recursos estáticos
self.addEventListener('fetch', (event) => {
  // Solo manejar solicitudes GET
  if (event.request.method !== 'GET') return;

  // Ignorar archivos problemáticos que causan errores 404
  if (event.request.url.includes('app-build-manifest.json') || 
      event.request.url.includes('dynamic-css-manifest.json')) {
    return;
  }

  // Manejo especial para manifest.json
  if (event.request.url.includes('/manifest.json')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .then((fetchResponse) => {
              if (fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseClone);
                  });
              }
              return fetchResponse;
            })
            .catch(() => {
              // Retornar un manifest básico si falla
              return new Response(JSON.stringify({
                name: "GanaFácil - Anbel IA",
                short_name: "GanaFácil",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#2196F3"
              }), {
                headers: { 'Content-Type': 'application/manifest+json' }
              });
            });
        })
    );
    return;
  }

  // Para rutas de API y admin, usar Network First
  if (event.request.url.includes('/api/') || event.request.url.includes('/admin')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Solo cachear respuestas exitosas
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // Para recursos estáticos, usar Cache First
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(event.request)
            .then((fetchResponse) => {
              // Solo cachear respuestas exitosas
              if (fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseClone);
                  });
              }
              return fetchResponse;
            })
            .catch((error) => {
              console.log('[Service Worker] Error fetching:', event.request.url, error);
              // Retornar una respuesta de fallback si es necesario
              return new Response('Resource not available', { status: 404 });
            });
        })
    );
  }
});
