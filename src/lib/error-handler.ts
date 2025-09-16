/**
 * 🛠️ MANEJADOR DE ERRORES GLOBAL
 * Suprime errores no críticos y maneja errores de WebSocket
 */

// Solo ejecutar en el cliente
if (typeof window !== 'undefined') {
  // Suprimir errores de WebSocket de servicios externos
  const originalConsoleError = console.error;

  console.error = (...args: any[]) => {
    const message = args.join(' ');
    
    // Suprimir errores de WebSocket de servicios externos
    if (message.includes('WebSocket connection to') && 
        (message.includes('knock.app') || 
         message.includes('api.knock.app'))) {
      return; // No mostrar estos errores
    }
    
    // Suprimir errores de conexión de servicios externos
    if (message.includes('Failed to load resource') && 
        message.includes('knock.app')) {
      return; // No mostrar estos errores
    }
    
    // Mostrar otros errores normalmente
    originalConsoleError.apply(console, args);
  };

  // Manejar errores no capturados
  window.addEventListener('error', (event) => {
    const message = event.message || '';
    
    // Suprimir errores de WebSocket de servicios externos
    if (message.includes('WebSocket connection to') && 
        (message.includes('knock.app') || 
         message.includes('api.knock.app'))) {
      event.preventDefault();
      return false;
    }
  });

  // Manejar promesas rechazadas
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || event.reason || '';
    
    // Suprimir errores de WebSocket de servicios externos
    if (message.includes('WebSocket connection to') && 
        (message.includes('knock.app') || 
         message.includes('api.knock.app'))) {
      event.preventDefault();
      return false;
    }
  });
}

export const suppressExternalErrors = () => {
  // Función para suprimir errores externos si es necesario
  if (typeof window !== 'undefined') {
    console.log('🛠️ Error handler initialized - suppressing external service errors');
  }
};
