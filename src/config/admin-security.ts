// Configuración de seguridad para administrador
export const ADMIN_SECURITY_CONFIG = {
  // Contraseña de administrador (en producción debería estar en variables de entorno)
  ADMIN_PASSWORD: 'GANAFACIL_ADMIN_2025_ANBEL_IA',
  
  // Claves de sesión
  SESSION_KEY: 'ganafacil_admin_session',
  EXPIRY_KEY: 'ganafacil_admin_expiry',
  
  // Duración de sesión (24 horas)
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
  
  // Configuración de seguridad
  SECURITY: {
    // Máximo número de intentos de contraseña
    MAX_ATTEMPTS: 5,
    
    // Tiempo de bloqueo después de intentos fallidos (en minutos)
    LOCKOUT_DURATION: 15,
    
    // Requerir contraseña fuerte
    REQUIRE_STRONG_PASSWORD: true,
    
    // Log de intentos de acceso
    LOG_ACCESS_ATTEMPTS: true,
  },
  
  // Mensajes de seguridad
  MESSAGES: {
    INCORRECT_PASSWORD: 'Contraseña incorrecta. Intenta de nuevo.',
    TOO_MANY_ATTEMPTS: 'Demasiados intentos fallidos. Intenta de nuevo en 15 minutos.',
    SESSION_EXPIRED: 'Sesión expirada. Ingresa la contraseña nuevamente.',
    ACCESS_DENIED: 'Acceso denegado. No tienes permisos de administrador.',
    LOGIN_SUCCESS: 'Acceso autorizado. Bienvenido al panel de administración.',
  }
};

// Función para verificar contraseña
export const verifyAdminPassword = (password: string): boolean => {
  return password === ADMIN_SECURITY_CONFIG.ADMIN_PASSWORD;
};

// Función para crear sesión de admin
export const createAdminSession = (): void => {
  const now = new Date().getTime();
  const expiry = now + ADMIN_SECURITY_CONFIG.SESSION_DURATION;
  
  localStorage.setItem(ADMIN_SECURITY_CONFIG.SESSION_KEY, 'true');
  localStorage.setItem(ADMIN_SECURITY_CONFIG.EXPIRY_KEY, expiry.toString());
};

// Función para verificar sesión válida
export const isAdminSessionValid = (): boolean => {
  const adminSession = localStorage.getItem(ADMIN_SECURITY_CONFIG.SESSION_KEY);
  const sessionExpiry = localStorage.getItem(ADMIN_SECURITY_CONFIG.EXPIRY_KEY);
  
  if (adminSession === 'true' && sessionExpiry) {
    const now = new Date().getTime();
    const expiry = parseInt(sessionExpiry);
    return now < expiry;
  }
  
  return false;
};

// Función para cerrar sesión de admin
export const clearAdminSession = (): void => {
  localStorage.removeItem(ADMIN_SECURITY_CONFIG.SESSION_KEY);
  localStorage.removeItem(ADMIN_SECURITY_CONFIG.EXPIRY_KEY);
};

// Función para obtener tiempo restante de sesión
export const getSessionTimeRemaining = (): number => {
  const sessionExpiry = localStorage.getItem(ADMIN_SECURITY_CONFIG.EXPIRY_KEY);
  
  if (sessionExpiry) {
    const now = new Date().getTime();
    const expiry = parseInt(sessionExpiry);
    return Math.max(0, expiry - now);
  }
  
  return 0;
};

// Función para formatear tiempo restante
export const formatSessionTimeRemaining = (): string => {
  const timeRemaining = getSessionTimeRemaining();
  
  if (timeRemaining === 0) {
    return 'Sesión expirada';
  }
  
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m restantes`;
  } else {
    return `${minutes}m restantes`;
  }
};
