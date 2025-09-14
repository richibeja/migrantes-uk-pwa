/**
 * 🧠 TIPOS DE DATOS CORE DE ANBEL IA
 * Definiciones de tipos para el sistema de superinteligencia
 */

export interface LotteryDraw {
  id: string;
  lotteryType: LotteryType;
  drawDate: Date;
  numbers: number[];
  specialNumbers?: number[];
  jackpot: number;
  winners?: number;
  metadata?: {
    source: string;
    verified: boolean;
    lastUpdated: Date;
  };
}

export interface Prediction {
  id: string;
  lotteryType: LotteryType;
  predictedNumbers: number[];
  specialNumbers?: number[];
  confidence: number;
  algorithm: AlgorithmType;
  generatedAt: Date;
  drawDate: Date;
  metadata: {
    algorithmVersion: string;
    processingTime: number;
    dataPointsUsed: number;
    patternMatches: PatternMatch[];
    statisticalSignificance: number;
    riskAssessment: RiskLevel;
  };
}

export interface AlgorithmResult {
  algorithm: AlgorithmType;
  numbers: number[];
  specialNumbers?: number[];
  confidence: number;
  executionTime: number;
  patternAnalysis: PatternAnalysis;
  statisticalSignificance: number;
  metadata: {
    modelVersion: string;
    hyperparameters: Record<string, any>;
    trainingDataSize: number;
    lastTrained: Date;
  };
}

export interface PatternAnalysis {
  patterns: Pattern[];
  complexity: 'Low' | 'Medium' | 'High';
  confidence: number;
  frequency: number;
  recency: number;
  seasonality: boolean;
  trends: Trend[];
}

export interface Pattern {
  id: string;
  type: PatternType;
  description: string;
  confidence: number;
  impact: number;
  frequency: number;
  lastSeen: Date;
  examples: number[][];
}

export interface PatternMatch {
  patternId: string;
  matchScore: number;
  confidence: number;
  description: string;
}

export interface Trend {
  type: 'increasing' | 'decreasing' | 'stable' | 'cyclical';
  strength: number;
  duration: number;
  confidence: number;
}

export interface PerformanceMetric {
  id: string;
  algorithm: AlgorithmType;
  lotteryType: LotteryType;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  executionTime: number;
  timestamp: Date;
  metadata: {
    dataSize: number;
    modelVersion: string;
    hyperparameters: Record<string, any>;
  };
}

export interface UserContext {
  userId: string;
  preferences: UserPreferences;
  history: UserHistory[];
  emotionalState: EmotionalState;
  learningProfile: LearningProfile;
  lastInteraction: Date;
}

export interface UserPreferences {
  favoriteLotteries: LotteryType[];
  riskTolerance: 'Low' | 'Medium' | 'High';
  notificationSettings: NotificationSettings;
  language: 'en' | 'es';
  timezone: string;
}

export interface UserHistory {
  id: string;
  action: string;
  timestamp: Date;
  result?: any;
  metadata: Record<string, any>;
}

export interface EmotionalState {
  mood: 'positive' | 'neutral' | 'negative';
  confidence: number;
  stress: number;
  excitement: number;
  lastUpdated: Date;
}

export interface LearningProfile {
  learningStyle: 'visual' | 'auditory' | 'kinesthetic';
  complexityPreference: 'simple' | 'detailed' | 'expert';
  interactionFrequency: 'low' | 'medium' | 'high';
  feedbackResponsiveness: number;
}

export interface NotificationSettings {
  predictions: boolean;
  results: boolean;
  updates: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
  channels: ('email' | 'push' | 'sms')[];
}

export interface RealTimeData {
  lotteryType: LotteryType;
  lastDraw: LotteryDraw;
  nextDraw: {
    date: Date;
    estimatedJackpot: number;
    timeRemaining: number;
  };
  liveStats: {
    totalTickets: number;
    averageTicketValue: number;
    hotNumbers: number[];
    coldNumbers: number[];
  };
  lastUpdated: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'anbel';
  timestamp: Date;
  type: 'text' | 'prediction' | 'analysis' | 'error' | 'suggestion';
  data?: any;
  metadata?: {
    processingTime: number;
    algorithm: AlgorithmType;
    confidence: number;
  };
}

export interface IntelligentResponse {
  response: string;
  emotionalState: EmotionalState;
  suggestedActions: SuggestedAction[];
  followUpQuestions: string[];
  predictions?: Prediction[];
  analysis?: PatternAnalysis;
}

export interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  confidence: number;
  expectedValue: number;
  riskLevel: RiskLevel;
  actionType: 'prediction' | 'analysis' | 'strategy' | 'information';
}

export interface GameSystem {
  userLevel: UserLevel;
  achievements: Achievement[];
  points: number;
  ranking: number;
  badges: Badge[];
  statistics: GameStatistics;
}

export interface UserLevel {
  level: number;
  experience: number;
  experienceToNext: number;
  title: string;
  benefits: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: string;
}

export interface GameStatistics {
  totalPredictions: number;
  successfulPredictions: number;
  accuracyRate: number;
  totalPoints: number;
  daysActive: number;
  favoriteAlgorithm: AlgorithmType;
  bestStreak: number;
  currentStreak: number;
}

export interface SystemStatus {
  isOnline: boolean;
  algorithms: AlgorithmStatus[];
  realTimeConnections: ConnectionStatus[];
  performance: PerformanceStatus;
  lastUpdate: Date;
}

export interface AlgorithmStatus {
  algorithm: AlgorithmType;
  status: 'online' | 'offline' | 'training' | 'error';
  lastExecution: Date;
  successRate: number;
  averageExecutionTime: number;
}

export interface ConnectionStatus {
  lotteryType: LotteryType;
  status: 'connected' | 'disconnected' | 'error';
  lastDataReceived: Date;
  latency: number;
  errorCount: number;
}

export interface PerformanceStatus {
  cpuUsage: number;
  memoryUsage: number;
  predictionQueue: number;
  averageResponseTime: number;
  errorRate: number;
}

export type LotteryType = 
  | 'POWERBALL'
  | 'MEGA_MILLIONS'
  | 'EURO_MILLIONS'
  | 'BALOTO'
  | 'LOTTO_6_49'
  | 'MEGA_SENA'
  | 'UK_NATIONAL'
  | 'EL_GORDO'
  | 'LOTERIA_NACIONAL_MX'
  | 'LOTTO_AMERICA'
  | 'CASH4LIFE'
  | 'LUCKY_FOR_LIFE'
  | 'PICK_6';

export type AlgorithmType =
  | 'ENSEMBLE_ML'
  | 'DEEP_LSTM'
  | 'MONTE_CARLO'
  | 'BAYESIAN_OPT'
  | 'PATTERN_RECOGNITION'
  | 'TEMPORAL_ANALYSIS';

export type PatternType =
  | 'SEQUENTIAL'
  | 'FREQUENCY'
  | 'SUM'
  | 'ODD_EVEN'
  | 'HIGH_LOW'
  | 'CONSECUTIVE'
  | 'GAPS'
  | 'CYCLICAL'
  | 'SEASONAL'
  | 'RANDOM';

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Very High';

export type EmotionalMood = 'positive' | 'neutral' | 'negative';

export type LearningStyle = 'visual' | 'auditory' | 'kinesthetic';

export type NotificationChannel = 'email' | 'push' | 'sms';

export type MessageType = 'text' | 'prediction' | 'analysis' | 'error' | 'suggestion';

export type ActionType = 'prediction' | 'analysis' | 'strategy' | 'information';

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export type AlgorithmStatusType = 'online' | 'offline' | 'training' | 'error';

export type ConnectionStatusType = 'connected' | 'disconnected' | 'error';

export type ComplexityLevel = 'Low' | 'Medium' | 'High';

export type TrendType = 'increasing' | 'decreasing' | 'stable' | 'cyclical';

export type RiskTolerance = 'Low' | 'Medium' | 'High';

export type InteractionFrequency = 'low' | 'medium' | 'high';

export type NotificationFrequency = 'immediate' | 'daily' | 'weekly';

export type BadgeCategory = 'prediction' | 'accuracy' | 'streak' | 'exploration' | 'social';

export type GameLevel = {
  level: number;
  experience: number;
  experienceToNext: number;
  title: string;
  benefits: string[];
};

export type GameAchievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: AchievementRarity;
  points: number;
};

export type GameBadge = {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
  category: BadgeCategory;
};

export type GameStatistics = {
  totalPredictions: number;
  successfulPredictions: number;
  accuracyRate: number;
  totalPoints: number;
  daysActive: number;
  favoriteAlgorithm: AlgorithmType;
  bestStreak: number;
  currentStreak: number;
};

export type SystemStatus = {
  isOnline: boolean;
  algorithms: AlgorithmStatus[];
  realTimeConnections: ConnectionStatus[];
  performance: PerformanceStatus;
  lastUpdate: Date;
};

export type AlgorithmStatus = {
  algorithm: AlgorithmType;
  status: AlgorithmStatusType;
  lastExecution: Date;
  successRate: number;
  averageExecutionTime: number;
};

export type ConnectionStatus = {
  lotteryType: LotteryType;
  status: ConnectionStatusType;
  lastDataReceived: Date;
  latency: number;
  errorCount: number;
};

export type PerformanceStatus = {
  cpuUsage: number;
  memoryUsage: number;
  predictionQueue: number;
  averageResponseTime: number;
  errorRate: number;
};

export default {
  LotteryDraw,
  Prediction,
  AlgorithmResult,
  PatternAnalysis,
  Pattern,
  PatternMatch,
  Trend,
  PerformanceMetric,
  UserContext,
  UserPreferences,
  UserHistory,
  EmotionalState,
  LearningProfile,
  NotificationSettings,
  RealTimeData,
  ChatMessage,
  IntelligentResponse,
  SuggestedAction,
  GameSystem,
  UserLevel,
  Achievement,
  Badge,
  GameStatistics,
  SystemStatus,
  AlgorithmStatus,
  ConnectionStatus,
  PerformanceStatus
};
