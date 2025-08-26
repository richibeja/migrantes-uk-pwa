// CONEXIÓN CON GOOGLE SHEETS VÍA APPS SCRIPT
// URL REAL DE TU NUEVO APPS SCRIPT

const PROXY_URL = '/api/activate';

// Función para activar código (SOLO verifica, NO borra)
export async function activarCodigoEnSheets(codigo: string): Promise<boolean> {
  try {
    console.log('🚀 Activando código en Google Sheets:', codigo);
    
    const response = await fetch(`${PROXY_URL}?action=activar&code=${encodeURIComponent(codigo)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const result = await response.json();
    console.log(' Resultado de activación:', result);
    
    // SOLO verificar que existe, NO borrar
    return result.success && result.found;
    
  } catch (error) {
    console.error('❌ Error activando código:', error);
    return false;
  }
}

// Función para verificar código en Google Sheets (mantener compatibilidad)
export async function verificarCodigoEnSheets(codigo: string): Promise<boolean> {
  try {
    console.log(' Verificando código en Google Sheets:', codigo);
    
    const response = await fetch(`${PROXY_URL}?action=verificar&code=${encodeURIComponent(codigo)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const result = await response.json();
    console.log('📋 Resultado de verificación:', result);
    
    return result.success && result.found;
    
  } catch (error) {
    console.error('❌ Error verificando código:', error);
    return false;
  }
}

// Función para borrar código de Google Sheets (mantener compatibilidad)
export async function borrarCodigoDeSheets(codigo: string): Promise<boolean> {
  try {
    console.log('🗑️ Borrando código de Google Sheets:', codigo);
    
    const response = await fetch(`${PROXY_URL}?action=borrar&code=${encodeURIComponent(codigo)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const result = await response.json();
    console.log('📋 Resultado de borrado:', result);
    
    return result.success;
    
  } catch (error) {
    console.error('❌ Error borrando código:', error);
    return false;
  }
}
