// Tipos de usuario
export interface User {
  id: string;
  code: string;
  isActivated: boolean;
  activatedAt: string;
  lastLogin: string;
  country: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos de lotería
export interface Lottery {
  id: string;
  name: string;
  country: string;
  type: 'national' | 'state' | 'international';
  drawDays: string[];
  drawTime: string;
  numbersCount: number;
  maxNumber: number;
  bonusNumbers?: number;
  maxBonusNumber?: number;
  apiEndpoint?: string;
}

// Tipos de predicción
export interface Prediction {
  id: string;
  lotteryId: string;
  lotteryName: string;
  numbers: number[];
  bonusNumbers?: number[];
  confidence: number;
  method: string;
  nextDraw: string;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipos de código de activación
export interface ActivationCode {
  id: string;
  code: string;
  isUsed: boolean;
  usedBy?: string;
  usedAt?: string;
  expiresAt: string;
  createdAt: string;
  createdBy: string;
}

// Tipos de método de predicción
export interface PredictionMethod {
  name: string;
  description: string;
  weight: number;
  minConfidence: number;
  maxConfidence: number;
}

// Tipos de configuración de país
export interface CountryConfig {
  name: string;
  timezone: string;
  currency: string;
  lotteries: Lottery[];
}

// Tipos de respuesta de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Tipos de información de país
export interface CountryInfo {
  code: string;
  name: string;
  timezone: string;
  currency: string;
  flag: string;
}

// Tipos de notificación
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

// Tipos de estadísticas
export interface Statistics {
  totalUsers: number;
  totalPredictions: number;
  averageConfidence: number;
  totalLotteries: number;
  lastUpdate: string;
}

// Tipos de referido
export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  status: 'pending' | 'completed' | 'expired';
  reward: number;
  createdAt: string;
  completedAt?: string;
}

// Tipos de configuración de la aplicación
export interface AppConfig {
  name: string;
  version: string;
  description: string;
  url: string;
  supportEmail: string;
  maxPredictionsPerUser: number;
  predictionUpdateInterval: number;
  referralReward: number;
  maintenanceMode: boolean;
}

// Tipos de error
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Tipos de hook de retorno
export interface AuthHookReturn {
  user: User | null;
  isLoading: boolean;
  login: (code: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => void;
  updateLastLogin: () => void;
  updateUserCountry: (country: string, timezone: string) => void;
  isAuthenticated: boolean;
}

export interface PredictionsHookReturn {
  predictions: Prediction[];
  isLoading: boolean;
  error: string | null;
  loadPredictions: () => Promise<void>;
  refreshPredictions: () => Promise<void>;
}

export interface CountryHookReturn {
  country: CountryInfo | null;
  isLoading: boolean;
  error: string | null;
  updateCountry: (countryCode: string) => Promise<void>;
}

export interface User {
  id: string;
  code: string;
  isActivated: boolean;
  activatedAt: string;
  lastLogin: string;
  country: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivationCode {
  id: string;
  code: string;
  isUsed: boolean;
  usedBy?: string;
  usedAt?: string;
  createdAt: string;
}

export interface LotteryResult {
  lotteryId: string;
  lotteryName: string;
  drawDate: string;
  numbers: number[];
  bonusNumbers?: number[];
  jackpot?: string;
  source: 'real' | 'simulated';
  lastUpdated: string;
}
