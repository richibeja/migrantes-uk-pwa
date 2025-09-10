export interface SubscriptionPlan {
  id: string;
  nombre: string;
  precio: number; // USD/mes
  precioAnual: number; // USD/año (con descuento)
  beneficios: string[];
  limiteClubs: number;
  limiteMiembros: number;
  color: string;
  popular?: boolean;
}

export interface UserSubscription {
  userId: string;
  planId: string;
  estado: 'activa' | 'cancelada' | 'expirada' | 'trial';
  fechaInicio: Date;
  fechaFin: Date;
  metodoPago: 'hotmart' | 'stripe' | 'paypal';
  transaccionId: string;
  renovacionAutomatica: boolean;
}

export interface SubscriptionFeature {
  id: string;
  nombre: string;
  descripcion: string;
  planes: string[]; // IDs de planes que incluyen esta feature
  icono: string;
}

// Planes de suscripción
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'gratis',
    nombre: 'Plan Gratis',
    precio: 0,
    precioAnual: 0,
    beneficios: [
      'Predicciones básicas',
      '1 club máximo',
      'Análisis simple de patrones',
      'Soporte por email'
    ],
    limiteClubs: 1,
    limiteMiembros: 5,
    color: 'gray'
  },
  {
    id: 'basico',
    nombre: 'Plan Básico',
    precio: 9.99,
    precioAnual: 99.99, // 17% descuento
    beneficios: [
      'Predicciones estándar',
      '3 clubs máximo',
      'Análisis básico de patrones',
      'Sistema de tickets con foto',
      'Notificaciones push',
      'Soporte prioritario'
    ],
    limiteClubs: 3,
    limiteMiembros: 15,
    color: 'blue'
  },
  {
    id: 'premium',
    nombre: 'Plan Premium',
    precio: 19.99,
    precioAnual: 199.99, // 17% descuento
    beneficios: [
      'Predicciones avanzadas con IA',
      'Clubs ilimitados',
      'Análisis de patrones pro',
      'Sistema de tickets completo',
      'Jugadas colectivas',
      'Alertas inteligentes',
      'Analytics avanzados',
      'Soporte prioritario 24/7'
    ],
    limiteClubs: -1, // Ilimitado
    limiteMiembros: 50,
    color: 'purple',
    popular: true
  },
  {
    id: 'vip',
    nombre: 'Plan VIP',
    precio: 29.99,
    precioAnual: 299.99, // 17% descuento
    beneficios: [
      'Todo lo del Premium',
      'Asesoramiento personalizado',
      'Herramientas de análisis exclusivas',
      'Webinars mensuales',
      'Acceso a comunidad VIP',
      'API personalizada',
      'Soporte dedicado',
      'Funciones beta'
    ],
    limiteClubs: -1, // Ilimitado
    limiteMiembros: -1, // Ilimitado
    color: 'gold'
  }
];

// Features disponibles
export const SUBSCRIPTION_FEATURES: SubscriptionFeature[] = [
  {
    id: 'predicciones-basicas',
    nombre: 'Predicciones Básicas',
    descripcion: 'Números sugeridos basados en estadísticas simples',
    planes: ['gratis', 'basico', 'premium', 'vip'],
    icono: '🎯'
  },
  {
    id: 'predicciones-ia',
    nombre: 'Predicciones con IA',
    descripcion: 'Algoritmos avanzados de machine learning',
    planes: ['premium', 'vip'],
    icono: '🤖'
  },
  {
    id: 'sistema-tickets',
    nombre: 'Sistema de Tickets',
    descripcion: 'Subida y verificación de tickets con foto',
    planes: ['basico', 'premium', 'vip'],
    icono: '📸'
  },
  {
    id: 'jugadas-colectivas',
    nombre: 'Jugadas Colectivas',
    descripcion: 'Organizar jugadas grupales con verificación',
    planes: ['premium', 'vip'],
    icono: '👥'
  },
  {
    id: 'analytics-avanzados',
    nombre: 'Analytics Avanzados',
    descripcion: 'Reportes detallados y estadísticas profundas',
    planes: ['premium', 'vip'],
    icono: '📊'
  },
  {
    id: 'consultoria-personal',
    nombre: 'Consultoría Personal',
    descripcion: 'Asesoramiento 1:1 con expertos',
    planes: ['vip'],
    icono: '👨‍💼'
  }
];
