// Force unregister all service workers WITHOUT reloading
(async function() {
  console.log('🔄 Cleaning old service workers...');
  
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (let registration of registrations) {
        await registration.unregister();
        console.log('✅ Old service worker removed');
      }
      
      // Clear old caches silently
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (let cacheName of cacheNames) {
          if (cacheName.includes('workbox') || cacheName.includes('old')) {
            await caches.delete(cacheName);
          }
        }
      }
      
      console.log('✅ Cleanup complete');
      
    } catch (error) {
      console.log('⚠️ Cleanup skipped');
    }
  }
})();

