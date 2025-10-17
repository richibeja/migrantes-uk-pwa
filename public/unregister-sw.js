// Force unregister all service workers
(async function() {
  console.log('🔄 Force unregistering all service workers...');
  
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (let registration of registrations) {
        const success = await registration.unregister();
        console.log('✅ Service worker unregistered:', success);
      }
      
      console.log('✅ All service workers removed');
      
      // Clear all caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (let cacheName of cacheNames) {
          await caches.delete(cacheName);
          console.log('✅ Cache deleted:', cacheName);
        }
      }
      
      console.log('🎉 Cleanup complete! Reloading...');
      
      // Reload page after cleanup
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
      
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
    }
  }
})();

