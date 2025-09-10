import { Timestamp } from 'firebase/firestore';

// Interfaces para casos de soporte
export interface SupportCase {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'pagado';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  assignedTo?: string;
  // Propiedades adicionales para compatibilidad
  title?: string;
  caseCode?: string;
  amount?: number;
}

// Interfaces para usuarios
export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLogin?: Timestamp;
  // Propiedades adicionales para compatibilidad
  uid?: string;
  name?: string;
}

// Interfaces para pagos
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'paypal' | 'stripe' | 'bank_transfer';
  transactionId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Interfaces para formularios
export interface FormData {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  documentType: string;
  documentNumber?: string;
  phone: string;
  email: string;
  address: string;
  claimSummary: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Interfaces para directorio
export interface DirectoryLink {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  isOfficial: boolean;
  language: 'es' | 'en';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Interfaces para FAQ
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  language: 'es' | 'en';
  order: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Interfaces para notificaciones
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  createdAt: Timestamp;
  readAt?: Timestamp;
}

// Interface para configuración de notificaciones
export interface NotificationConfig {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

// Interfaces para códigos de activación
export interface ActivationCode {
  id: string;
  code: string;
  isUsed: boolean;
  usedBy?: string;
  usedAt?: Timestamp;
  createdAt: Timestamp;
  expiresAt?: Timestamp;
}

// Interfaces para analytics
export interface AnalyticsEvent {
  id: string;
  userId?: string;
  eventType: string;
  eventData: Record<string, any>;
  timestamp: Timestamp;
  sessionId?: string;
}

// Interfaces para suscripciones
export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'inactive' | 'cancelled' | 'trial';
  startDate: Timestamp;
  endDate: Timestamp;
  paymentGateway?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Interfaces para predicciones de lotería
export interface LotteryPrediction {
  id: string;
  lotteryId: string;
  numbers: number[];
  specialNumbers?: number[];
  confidence: number;
  method: string;
  createdAt: Timestamp;
  expiresAt: Timestamp;
}

// Interfaces para resultados de lotería
export interface LotteryResult {
  id: string;
  lotteryId: string;
  drawDate: string;
  numbers: number[];
  specialNumbers?: number[];
  jackpot: string;
  winners: number;
  isVerified: boolean;
  createdAt: Timestamp;
}

// Interfaces para boletos digitales
export interface DigitalTicket {
  id: string;
  userId: string;
  lotteryName: string;
  numbers: number[];
  specialNumbers?: number[];
  drawDate: string;
  status: 'pending' | 'won' | 'lost' | 'expired';
  winnings?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
