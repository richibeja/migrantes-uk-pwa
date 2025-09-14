// Funciones de permisos y suscripciones para GANAFACIL ANBEL IA

export interface UserPlan {
  id: string;
  name: string;
  type: 'basic' | 'premium' | 'vip';
  maxPredictions: number;
  maxClubs: number;
  features: string[];
  price: number;
  duration: number; // días
}

export interface UserSubscription {
  planId: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isTrial: boolean;
  daysRemaining: number;
}

// Planes disponibles
export const PLANS: UserPlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    type: 'basic',
    maxPredictions: 10,
    maxClubs: 1,
    features: ['Predicciones básicas', '1 Club'],
    price: 9.99,
    duration: 30
  },
  {
    id: 'premium',
    name: 'Premium',
    type: 'premium',
    maxPredictions: 50,
    maxClubs: 3,
    features: ['Predicciones avanzadas', '3 Clubs', 'Análisis detallado'],
    price: 19.99,
    duration: 30
  },
  {
    id: 'vip',
    name: 'VIP',
    type: 'vip',
    maxPredictions: 100,
    maxClubs: 10,
    features: ['Predicciones ilimitadas', 'Clubs ilimitados', 'IA avanzada', 'Soporte prioritario'],
    price: 39.99,
    duration: 30
  }
];

// Función para obtener el plan actual del usuario
export function getCurrentPlan(userId: string): UserPlan | null {
  // En una implementación real, esto vendría de la base de datos
  // Por ahora, retornamos un plan básico por defecto
  return PLANS.find(plan => plan.id === 'basic') || null;
}

// Función para verificar si la suscripción está activa
export function isSubscriptionActive(userId: string): boolean {
  // En una implementación real, esto verificaría la base de datos
  // Por ahora, retornamos true para permitir el acceso
  return true;
}

// Función para verificar si está en período de prueba
export function isInTrial(userId: string): boolean {
  // En una implementación real, esto verificaría la base de datos
  // Por ahora, retornamos false
  return false;
}

// Función para obtener días restantes de suscripción
export function getDiasRestantes(userId: string): number {
  // En una implementación real, esto calcularía desde la base de datos
  // Por ahora, retornamos 30 días
  return 30;
}

// Función para verificar si puede crear un club
export function puedeCrearClub(userId: string, currentClubs: number): boolean {
  const plan = getCurrentPlan(userId);
  if (!plan) return false;
  
  return currentClubs < plan.maxClubs;
}

// Función para verificar si puede hacer predicciones
export function puedeHacerPrediccion(userId: string, currentPredictions: number): boolean {
  const plan = getCurrentPlan(userId);
  if (!plan) return false;
  
  return currentPredictions < plan.maxPredictions;
}

// Función para obtener estadísticas del usuario
export function getUserStats(userId: string) {
  return {
    plan: getCurrentPlan(userId),
    isActive: isSubscriptionActive(userId),
    isTrial: isInTrial(userId),
    daysRemaining: getDiasRestantes(userId)
  };
}