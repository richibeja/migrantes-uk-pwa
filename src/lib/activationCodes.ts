export interface ActivationCode {
  code: string;
  type: 'basic' | 'premium' | 'admin' | 'vip';
  description: string;
  features: string[];
  expiresAt?: Date;
}

export const activationCodes: ActivationCode[] = [
  // Códigos locales visibles en la pantalla de activación
  { code: 'GANAFACIL', type: 'basic', description: 'Código local', features: ['Activación rápida'] },
  { code: 'LOTERIA', type: 'basic', description: 'Código local', features: ['Activación rápida'] },
  { code: 'SUERTE', type: 'basic', description: 'Código local', features: ['Activación rápida'] },
  { code: 'FORTUNA', type: 'basic', description: 'Código local', features: ['Activación rápida'] },
  {
    code: 'GANAFACIL2024',
    type: 'basic',
    description: 'Usuario Básico - Acceso Completo',
    features: [
      'Dashboard completo',
      '9 loterías activas',
      'Predicciones en tiempo real',
      'Análisis histórico',
      'Motor IA',
      'Analytics',
      'Seguimiento de resultados',
      'Countdown de sorteos',
      'Seguimiento de jackpots'
    ]
  },
  {
    code: 'PREMIUM2024',
    type: 'premium',
    description: 'Usuario Premium - Funciones Avanzadas',
    features: [
      'Todo lo del usuario básico',
      'Predicciones avanzadas',
      'Alertas personalizadas',
      'Exportación de datos',
      'Análisis detallado',
      'Soporte prioritario'
    ]
  },
  {
    code: 'ADMIN2024',
    type: 'admin',
    description: 'Administrador - Control Total',
    features: [
      'Todo lo del usuario premium',
      'Panel de administración',
      'Gestión de usuarios',
      'Configuración del sistema',
      'Logs y auditoría',
      'Acceso completo'
    ]
  },
  {
    code: 'VIP2024',
    type: 'vip',
    description: 'Usuario VIP - Experiencia Exclusiva',
    features: [
      'Todo lo del usuario premium',
      'Predicciones exclusivas',
      'Análisis personalizado',
      'Consultoría especializada',
      'Acceso anticipado a nuevas funciones'
    ]
  },
  {
    code: 'TEST2024',
    type: 'basic',
    description: 'Usuario de Prueba',
    features: [
      'Acceso completo al dashboard',
      'Todas las funcionalidades',
      'Para pruebas y demostración'
    ]
  },
  {
    code: 'DEMO2024',
    type: 'basic',
    description: 'Usuario Demo',
    features: [
      'Dashboard completo',
      'Funcionalidades básicas',
      'Ideal para demostraciones'
    ]
  },
  {
    code: 'LOTERIA2024',
    type: 'premium',
    description: 'Especialista en Loterías',
    features: [
      'Acceso premium completo',
      'Análisis especializado',
      'Predicciones avanzadas',
      'Herramientas profesionales'
    ]
  },
  {
    code: 'FORTUNA2024',
    type: 'vip',
    description: 'Usuario Fortuna',
    features: [
      'Acceso VIP completo',
      'Predicciones exclusivas',
      'Análisis personalizado',
      'Soporte premium'
    ]
  }
];

// Función para validar códigos
export const validateActivationCode = (code: string): ActivationCode | null => {
  const foundCode = activationCodes.find(ac => ac.code === code.toUpperCase());
  return foundCode || null;
};

// Función para obtener códigos por tipo
export const getCodesByType = (type: ActivationCode['type']): ActivationCode[] => {
  return activationCodes.filter(ac => ac.type === type);
};

// Función para obtener códigos disponibles
export const getAvailableCodes = (): ActivationCode[] => {
  const now = new Date();
  return activationCodes.filter(ac => !ac.expiresAt || ac.expiresAt > now);
};
