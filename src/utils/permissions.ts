import { UserSubscription, SUBSCRIPTION_PLANS, SUBSCRIPTION_FEATURES } from '@/types/subscriptions';

export interface User {
  id: string;
  email: string;
  subscription?: UserSubscription;
  planId: string;
  isAdmin?: boolean;
}

// Verificar si usuario tiene acceso a una feature
export const tieneAcceso = (user: User, feature: string): boolean => {
  if (user.isAdmin) return true;
  
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === user.planId);
  if (!plan) return false;
  
  const featureData = SUBSCRIPTION_FEATURES.find(f => f.id === feature);
  if (!featureData) return false;
  
  return featureData.planes.includes(plan.id);
};

// Verificar límites de clubs
export const puedeCrearClub = (user: User, clubsActuales: number): boolean => {
  if (user.isAdmin) return true;
  
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === user.planId);
  if (!plan) return false;
  
  if (plan.limiteClubs === -1) return true; // Ilimitado
  return clubsActuales < plan.limiteClubs;
};

// Verificar límites de miembros en club
export const puedeAgregarMiembro = (user: User, miembrosActuales: number): boolean => {
  if (user.isAdmin) return true;
  
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === user.planId);
  if (!plan) return false;
  
  if (plan.limiteMiembros === -1) return true; // Ilimitado
  return miembrosActuales < plan.limiteMiembros;
};

// Obtener features disponibles para el plan
export const getFeaturesDisponibles = (planId: string): string[] => {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (!plan) return [];
  
  return SUBSCRIPTION_FEATURES
    .filter(feature => feature.planes.includes(planId))
    .map(feature => feature.id);
};

// Verificar si suscripción está activa
export const isSubscriptionActive = (subscription?: UserSubscription): boolean => {
  if (!subscription) return false;
  
  const now = new Date();
  return subscription.estado === 'activa' && subscription.fechaFin > now;
};

// Obtener días restantes de suscripción
export const getDiasRestantes = (subscription?: UserSubscription): number => {
  if (!subscription || !isSubscriptionActive(subscription)) return 0;
  
  const now = new Date();
  const diffTime = subscription.fechaFin.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Verificar si está en trial
export const isInTrial = (subscription?: UserSubscription): boolean => {
  return subscription?.estado === 'trial';
};

// Obtener plan actual del usuario
export const getCurrentPlan = (user: User) => {
  return SUBSCRIPTION_PLANS.find(p => p.id === user.planId);
};

// Verificar si puede acceder a función premium
export const isPremiumFeature = (feature: string): boolean => {
  const featureData = SUBSCRIPTION_FEATURES.find(f => f.id === feature);
  if (!featureData) return false;
  
  return !featureData.planes.includes('gratis');
};

// Obtener mensaje de upgrade para feature
export const getUpgradeMessage = (feature: string): string => {
  const featureData = SUBSCRIPTION_FEATURES.find(f => f.id === feature);
  if (!featureData) return 'Esta función no está disponible';
  
  const minPlan = SUBSCRIPTION_PLANS.find(p => featureData.planes.includes(p.id));
  if (!minPlan) return 'Esta función no está disponible';
  
  return `Esta función está disponible en el ${minPlan.nombre} ($${minPlan.precio}/mes)`;
};
