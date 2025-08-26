// Firebase Messaging Service Worker (fallback)
// This worker handles background push notifications when FCM targets the default path
// It mirrors the logic in /sw.js to display notifications if a payload is received.

self.addEventListener('push', (event) => {
  try {
    let data = {};
    try {
      data = event?.data?.json?.() || {};
    } catch {
      const text = event?.data?.text?.();
      data = text ? { body: String(text) } : {};
    }

    const title = data.title || 'Migrantes UK';
    const body = data.body || 'Tienes una nueva notificación.';
    const url = data.url || '/assistant';

    const options = {
      body,
      icon: '/icons/icon-192x192.svg',
      badge: '/icons/icon-192x192.svg',
      vibrate: [100, 50, 100],
      data: { url },
      actions: [
        { action: 'open', title: 'Abrir', icon: '/icons/icon-192x192.svg' },
        { action: 'dismiss', title: 'Cerrar', icon: '/icons/icon-192x192.svg' },
      ],
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('firebase-messaging-sw push error:', e);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event?.notification?.data?.url || '/';
  if (event.action === 'dismiss') {
    return;
  }
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        try {
          const url = new URL(client.url);
          if (url.pathname === '/' || url.pathname === targetUrl) {
            return client.focus();
          }
        } catch {}
      }
      return clients.openWindow(targetUrl);
    })
  );
});

// Harden fetch handling to always return a Response
self.addEventListener('fetch', (event) => {
  event.respondWith((async () => {
    try {
      return await fetch(event.request);
    } catch {
      return new Response('Offline', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  })());
});


