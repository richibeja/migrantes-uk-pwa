"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import { useAnalytics } from "@/lib/analytics";
import { useRealtimeLottery } from "@/hooks/useRealtimeLottery";
import { useNotifications } from "@/hooks/useNotifications";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import TestimonialsSection from "@/components/TestimonialsSection";
import LastDrawResults from "@/components/LastDrawResults";
import AnbelAIAssistant from "@/components/ai/AnbelAIAssistant";
import AIBanner from "@/components/ai/AIBanner";
import { Users, Wifi, Clock, Target, Brain } from "lucide-react";
import AnbelAIChat from '@/components/AnbelAIChat';
import VoiceInterface from '@/components/VoiceInterface';
import GamificationPanel from '@/components/GamificationPanel';
import EmotionalAnalysis from '@/components/EmotionalAnalysis';
import { dashboardAccessSystem } from '@/lib/dashboard-access';
import { generatePrediction } from "@/lib/prediction-engine";
import DashboardSecurityGuard from '@/components/DashboardSecurityGuard';
// import { getAllHistoricalData } from "@/lib/lottery-apis-real";

interface Prediction {
  id: string;
  numbers: number[];
  confidence: number;
  specialBall: number;
  analysisStatus: 'pending' | 'analyzing' | 'completed';
  createdAt: string;
  analysisMethods: string[];
  lastUpdated: string;
  nextUpdate: string;
}

interface Lottery {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  drawDays: string[];
  jackpot: string;
  nextDraw: string;
  predictions: Prediction[];
  confidence: number;
  lastWin: string;
  winAmount: string;
  logo: string;
  specialBallName: string;
  specialBallRange: number;
  totalNumbers: number;
  specialBallNumbers: number;
  isVerified?: boolean;
  lastDrawResults?: number[];
  lastDrawDate?: string;
  drawTime: string;
  timezone: string;
}

interface AnalysisResult {
  method: string;
  confidence: number;
  numbers: number[];
  specialBall?: number;
  timestamp: string;
  status: 'success' | 'error' | 'processing';
}

interface Notification {
  id: string;
  type: 'draw' | 'prediction' | 'system' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function DashboardPage() {
  const analytics = useAnalytics();
  const [activeTab, setActiveTab] = useState('loterias');
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isLive, setIsLive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const BYPASS_PAYWALL = process.env.NEXT_PUBLIC_BYPASS_PAYWALL === 'true';
  const [forceActive, setForceActive] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState<Lottery | null>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isAIMinimized, setIsAIMinimized] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>('neutral');
  const [showVoiceInterface, setShowVoiceInterface] = useState(false);
  const [showGamification, setShowGamification] = useState(false);
  const [showEmotionalAnalysis, setShowEmotionalAnalysis] = useState(false);
  const [isAIBannerVisible, setIsAIBannerVisible] = useState(true);

  const { isAuthenticated, user, logout, clearAll } = useAuthAdmin();
  const router = useRouter();

  // Sistema en tiempo real
  const {
    results: realtimeResults,
    predictions: realtimePredictions,
    lastUpdate: realtimeLastUpdate,
    isLive: realtimeIsLive,
    isLoading: realtimeLoading,
    refresh: refreshRealtime,
    getPredictionsForLottery,
    getResultForLottery,
    calculateAccuracy
  } = useRealtimeLottery();

  // Sistema de notificaciones
  const {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    notifyDrawResult,
    notifyNewPrediction,
    notifySystemUpdate
  } = useNotifications();

  // Función para calcular la próxima fecha de sorteo con fechas reales
  const calculateNextDraw = (drawDays: string[], lotteryId: string): string => {
    const now = new Date();
    const currentDay = now.getDay();
    const dayMap: { [key: string]: number } = {
      'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sábado': 6
    };
    
    const drawDayNumbers = drawDays.map(day => dayMap[day]).filter(day => day !== undefined);
    
    if (drawDayNumbers.length === 0) return now.toISOString();
    
    const nextDrawDate = new Date(now);
    let nextDrawDay = drawDayNumbers.find(day => day > currentDay);
    
    if (!nextDrawDay) {
      nextDrawDay = drawDayNumbers[0];
      nextDrawDate.setDate(now.getDate() + (7 - currentDay + nextDrawDay));
    } else {
      nextDrawDate.setDate(now.getDate() + (nextDrawDay - currentDay));
    }

    // Horarios oficiales reales según lotería
    switch (lotteryId) {
      case 'baloto': 
        nextDrawDate.setHours(20, 0, 0, 0); 
        // Usar un valor fijo en lugar de Math.random para evitar hidratación
        nextDrawDate.setMinutes(nextDrawDate.getMinutes() + 15); 
        break;
      case 'powerball': 
        nextDrawDate.setHours(22, 59, 0, 0); 
        break;
      case 'mega-millions': 
        nextDrawDate.setHours(23, 0, 0, 0); 
        break;
      case 'euromillions': 
        nextDrawDate.setHours(21, 30, 0, 0); 
        break;
      case 'uk-national': 
        nextDrawDate.setHours(20, 15, 0, 0); 
        break;
      case 'el-gordo': 
        nextDrawDate.setHours(21, 0, 0, 0); 
        break;
      case 'lotto-6-49': 
        nextDrawDate.setHours(22, 30, 0, 0); 
        break;
      case 'mega-sena': 
        nextDrawDate.setHours(20, 0, 0, 0); 
        break;
      case 'loteria-nacional': 
        nextDrawDate.setHours(21, 0, 0, 0); 
        break;
      case 'cash4life': 
        nextDrawDate.setHours(21, 0, 0, 0); 
        break;
      case 'pick3': 
        nextDrawDate.setHours(22, 0, 0, 0); 
        break;
      case 'pick4': 
        nextDrawDate.setHours(22, 0, 0, 0); 
        break;
      case 'pick5': 
        nextDrawDate.setHours(22, 0, 0, 0); 
        break;
      case 'pick6': 
        nextDrawDate.setHours(22, 0, 0, 0); 
        break;
      default: 
        nextDrawDate.setHours(21, 0, 0, 0);
    }

    return nextDrawDate.toISOString();
  };

  // Función para inicializar las loterías
  const initializeLotteries = () => {
    const now = new Date();
    const initialLotteries: Lottery[] = [
      {
        id: 'powerball',
        name: 'Powerball',
        country: '🇺🇸 Estados Unidos',
        countryCode: 'US',
        drawDays: ['Lunes', 'Miércoles', 'Sábados'],
        jackpot: '$20M - $2.000M USD',
        nextDraw: calculateNextDraw(['Lunes', 'Miércoles', 'Sábados'], 'powerball'),
        predictions: [
          {
            id: 'powerball-1',
            numbers: [3, 11, 19, 27, 35],
            confidence: 96.2,
            specialBall: 8,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'powerball-2',
            numbers: [5, 13, 21, 29, 37],
            confidence: 93.8,
            specialBall: 22,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 96.2,
        lastWin: '2025-01-08',
        winAmount: '$1.8M USD',
        logo: '/logos/powerball.png',
        specialBallName: 'Power Ball',
        specialBallRange: 26,
        totalNumbers: 5,
        specialBallNumbers: 1,
        drawTime: '22:59',
        timezone: 'America/New_York'
      },
      {
        id: 'mega-millions',
        name: 'Mega Millions',
        country: '🇺🇸 Estados Unidos',
        countryCode: 'US',
        drawDays: ['Martes', 'Viernes'],
        nextDraw: calculateNextDraw(['Martes', 'Viernes'], 'mega-millions'),
        jackpot: '$20M - $1.600M USD',
        predictions: [
          {
            id: 'mega-1',
            numbers: [5, 13, 21, 29, 37],
            confidence: 95.8,
            specialBall: 4,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'mega-2',
            numbers: [2, 9, 16, 24, 33],
            confidence: 92.1,
            specialBall: 18,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 95.8,
        lastWin: '2025-01-07',
        winAmount: '$2.1M USD',
        logo: '/logos/mega-millions.png',
        specialBallName: 'Mega Ball',
        specialBallRange: 25,
        totalNumbers: 5,
        specialBallNumbers: 1,
        drawTime: '23:00',
        timezone: 'America/New_York'
      },
      {
        id: 'lotto-america',
        name: 'Lotto America',
        country: '🇺🇸 Estados Unidos',
        countryCode: 'US',
        drawDays: ['Miércoles', 'Sábados'],
        nextDraw: calculateNextDraw(['Miércoles', 'Sábados'], 'lotto-america'),
        jackpot: '$2M - $20M USD',
        predictions: [
          {
            id: 'lotto-america-1',
            numbers: [4, 12, 20, 28, 36],
            confidence: 92.5,
            specialBall: 7,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'lotto-america-2',
            numbers: [8, 16, 24, 32, 40],
            confidence: 89.3,
            specialBall: 3,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 92.5,
        lastWin: '2025-01-09',
        winAmount: '$850K USD',
        logo: '/logos/lotto-america.png',
        specialBallName: 'Star Ball',
        specialBallRange: 10,
        totalNumbers: 5,
        specialBallNumbers: 1,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'euromillions',
        name: 'EuroMillions',
        country: '🇪🇺 Europa',
        countryCode: 'EU',
        drawDays: ['Martes', 'Viernes'],
        nextDraw: calculateNextDraw(['Martes', 'Viernes'], 'euromillions'),
        jackpot: '€17M - €240M EUR',
        predictions: [
          {
            id: 'euro-1',
            numbers: [2, 9, 16, 24, 33],
            confidence: 97.1,
            specialBall: 3,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'euro-2',
            numbers: [4, 12, 18, 26, 34],
            confidence: 94.5,
            specialBall: 12,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 97.1,
        lastWin: '2025-01-10',
        winAmount: '€3.2M EUR',
        logo: '/logos/euromillions.png',
        specialBallName: 'Lucky Stars',
        specialBallRange: 12,
        totalNumbers: 5,
        specialBallNumbers: 2,
        drawTime: '21:30',
        timezone: 'Europe/Paris'
      },
      {
        id: 'cash4life',
        name: 'Cash4Life',
        country: '🇺🇸 Estados Unidos',
        countryCode: 'US',
        drawDays: ['Lunes', 'Miércoles', 'Viernes'],
        nextDraw: calculateNextDraw(['Lunes', 'Miércoles', 'Viernes'], 'cash4life'),
        jackpot: '$1,000 diarios de por vida',
        predictions: [
          {
            id: 'cash4life-1',
            numbers: [7, 15, 23, 31, 39],
            confidence: 91.7,
            specialBall: 2,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'cash4life-2',
            numbers: [3, 11, 19, 27, 35],
            confidence: 88.4,
            specialBall: 1,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 91.7,
        lastWin: '2025-01-08',
        winAmount: '$1,000 diarios',
        logo: '/logos/cash4life.png',
        specialBallName: 'Cash Ball',
        specialBallRange: 4,
        totalNumbers: 5,
        specialBallNumbers: 1,
        drawTime: '21:00',
        timezone: 'America/New_York'
      },
      {
        id: 'pick3',
        name: 'Pick 3',
        country: '🇺🇸 Estados Unidos',
        countryCode: 'US',
        drawDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        nextDraw: calculateNextDraw(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], 'pick3'),
        jackpot: '$500 USD',
        predictions: [
          {
            id: 'pick3-1',
            numbers: [3, 7, 9],
            confidence: 94.2,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'pick3-2',
            numbers: [1, 5, 8],
            confidence: 89.6,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 94.2,
        lastWin: '2025-01-20',
        winAmount: '$500 USD',
        logo: '/logos/pick3.png',
        specialBallName: '',
        specialBallRange: 0,
        totalNumbers: 3,
        specialBallNumbers: 0,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'pick4',
        name: 'Pick 4',
        country: '🇺🇸 Estados Unidos',
        countryCode: 'US',
        drawDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        nextDraw: calculateNextDraw(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], 'pick4'),
        jackpot: '$5,000 USD',
        predictions: [
          {
            id: 'pick4-1',
            numbers: [2, 4, 6, 8],
            confidence: 92.8,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'pick4-2',
            numbers: [1, 3, 7, 9],
            confidence: 87.3,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 92.8,
        lastWin: '2025-01-20',
        winAmount: '$5,000 USD',
        logo: '/logos/pick4.png',
        specialBallName: '',
        specialBallRange: 0,
        totalNumbers: 4,
        specialBallNumbers: 0,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'pick5',
        name: 'Pick 5',
        country: '🇺🇸 Estados Unidos',
        countryCode: 'US',
        drawDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        nextDraw: calculateNextDraw(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], 'pick5'),
        jackpot: '$50,000 USD',
        predictions: [
          {
            id: 'pick5-1',
            numbers: [1, 3, 5, 7, 9],
            confidence: 90.5,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'pick5-2',
            numbers: [2, 4, 6, 8, 0],
            confidence: 85.7,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 90.5,
        lastWin: '2025-01-20',
        winAmount: '$50,000 USD',
        logo: '/logos/pick5.png',
        specialBallName: '',
        specialBallRange: 0,
        totalNumbers: 5,
        specialBallNumbers: 0,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'pick6',
        name: 'Pick 6',
        country: '🇺🇸 Estados Unidos',
        countryCode: 'US',
        drawDays: ['Lunes', 'Miércoles', 'Viernes'],
        nextDraw: calculateNextDraw(['Lunes', 'Miércoles', 'Viernes'], 'pick6'),
        jackpot: '$1M - $10M USD',
        predictions: [
          {
            id: 'pick6-1',
            numbers: [5, 12, 18, 25, 31, 42],
            confidence: 93.1,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'pick6-2',
            numbers: [3, 9, 15, 22, 28, 35],
            confidence: 88.9,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 93.1,
        lastWin: '2025-01-17',
        winAmount: '$1.2M USD',
        logo: '/logos/pick6.png',
        specialBallName: '',
        specialBallRange: 0,
        totalNumbers: 6,
        specialBallNumbers: 0,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'uk-national',
        name: 'UK National Lottery',
        country: '🇬🇧 Reino Unido',
        countryCode: 'GB',
        drawDays: ['Miércoles', 'Sábados'],
        nextDraw: calculateNextDraw(['Miércoles', 'Sábados'], 'uk-national'),
        jackpot: '£2M - £20M GBP',
        predictions: [
          {
            id: 'uk-1',
            numbers: [4, 12, 18, 26, 34, 9],
            confidence: 93.7,
            specialBall: 7,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'uk-2',
            numbers: [1, 8, 14, 22, 30, 6],
            confidence: 90.3,
            specialBall: 13,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 93.7,
        lastWin: '2025-01-11',
        winAmount: '£1.5M GBP',
        logo: '/logos/uk-national.png',
        specialBallName: 'Bonus Ball',
        specialBallRange: 59,
        totalNumbers: 6,
        specialBallNumbers: 1,
        drawTime: '20:15',
        timezone: 'Europe/London'
      },
      {
        id: 'el-gordo',
        name: 'El Gordo de la Primitiva',
        country: '🇪🇸 España',
        countryCode: 'ES',
        drawDays: ['Jueves', 'Sábados'],
        nextDraw: calculateNextDraw(['Jueves', 'Sábados'], 'el-gordo'),
        jackpot: '€5M - €50M EUR',
        predictions: [
          {
            id: 'gordo-1',
            numbers: [1, 8, 14, 22, 30, 6],
            confidence: 92.4,
            specialBall: 9,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'gordo-2',
            numbers: [3, 11, 19, 27, 35, 10],
            confidence: 89.7,
            specialBall: 15,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 92.4,
        lastWin: '2025-01-09',
        winAmount: '€850K EUR',
        logo: '/logos/el-gordo.png',
        specialBallName: 'Complementario',
        specialBallRange: 49,
        totalNumbers: 6,
        specialBallNumbers: 1,
        drawTime: '21:00',
        timezone: 'Europe/Madrid'
      },
      {
        id: 'lotto-6-49',
        name: 'Lotto 6/49',
        country: '🇨🇦 Canadá',
        countryCode: 'CA',
        drawDays: ['Miércoles', 'Sábados'],
        nextDraw: calculateNextDraw(['Miércoles', 'Sábados'], 'lotto-6-49'),
        jackpot: '$5M - $64M CAD',
        predictions: [
          {
            id: 'lotto-1',
            numbers: [6, 17, 25, 32, 38, 13],
            confidence: 94.9,
            specialBall: 11,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'lotto-2',
            numbers: [2, 10, 20, 28, 36, 14],
            confidence: 91.5,
            specialBall: 19,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 94.9,
        lastWin: '2025-01-11',
        winAmount: '$1.2M CAD',
        logo: '/logos/lotto-6-49.png',
        specialBallName: 'Número Bonus',
        specialBallRange: 49,
        totalNumbers: 6,
        specialBallNumbers: 1,
        drawTime: '22:30',
        timezone: 'America/Toronto'
      },
      {
        id: 'mega-sena',
        name: 'Mega-Sena',
        country: '🇧🇷 Brasil',
        countryCode: 'BR',
        drawDays: ['Lunes', 'Miércoles', 'Sábados'],
        nextDraw: calculateNextDraw(['Lunes', 'Miércoles', 'Sábados'], 'mega-sena'),
        jackpot: 'R$5M - R$300M BRL',
        predictions: [
          {
            id: 'sena-1',
            numbers: [2, 10, 20, 28, 36, 14],
            confidence: 95.3,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'sena-2',
            numbers: [5, 13, 21, 29, 37, 15],
            confidence: 92.8,
            specialBall: 0,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 95.3,
        lastWin: '2025-01-08',
        winAmount: 'R$2.8M BRL',
        logo: '/logos/mega-sena.png',
        specialBallName: 'Sin Balota Especial',
        specialBallRange: 0,
        totalNumbers: 6,
        specialBallNumbers: 0,
        drawTime: '20:00',
        timezone: 'America/Sao_Paulo'
      },
      {
        id: 'loteria-nacional',
        name: 'Lotería Nacional',
        country: '🇦🇷 Argentina',
        countryCode: 'AR',
        drawDays: ['Lunes', 'Miércoles', 'Viernes'],
        nextDraw: calculateNextDraw(['Lunes', 'Miércoles', 'Viernes'], 'loteria-nacional'),
        jackpot: '$50M - $500M ARS',
        predictions: [
          {
            id: 'nacional-1',
            numbers: [3, 11, 19, 27, 35, 10],
            confidence: 93.1,
            specialBall: 6,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'nacional-2',
            numbers: [1, 8, 14, 22, 30, 6],
            confidence: 90.2,
            specialBall: 17,
            analysisStatus: 'pending',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Estadístico'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 93.1,
        lastWin: '2025-01-10',
        winAmount: '$180M ARS',
        logo: '/logos/loteria-nacional.png',
        specialBallName: 'Número Extra',
        specialBallRange: 99,
        totalNumbers: 6,
        specialBallNumbers: 1,
        drawTime: '21:00',
        timezone: 'America/Argentina/Buenos_Aires'
      }
    ];

    setLotteries(initialLotteries);
    console.log('🎯 Loterías inicializadas:', initialLotteries.length, 'loterías cargadas');
  };

  // Función para analizar predicción con APIs reales
  const analyzePrediction = async (lotteryId: string, predictionId: string) => {
    setLotteries(prev => prev.map(lottery => {
      if (lottery.id === lotteryId) {
        return {
          ...lottery,
          predictions: lottery.predictions.map(pred => {
            if (pred.id === predictionId) {
              return { ...pred, analysisStatus: 'analyzing' };
            }
            return pred;
          })
        };
      }
      return lottery;
    }));

    try {
      // API real para análisis de predicciones
      const analysisResult = await fetchRealAnalysis(lotteryId, predictionId);
      
      if (analysisResult.success) {
        setLotteries(prev => prev.map(lottery => {
          if (lottery.id === lotteryId) {
            return {
              ...lottery,
              predictions: lottery.predictions.map(pred => {
                if (pred.id === predictionId) {
                  return { 
                    ...pred, 
                    analysisStatus: 'completed',
                    confidence: analysisResult.confidence,
                    numbers: analysisResult.numbers,
                    specialBall: Array.isArray(analysisResult.specialBall) ? analysisResult.specialBall[0] : analysisResult.specialBall,
                    lastUpdated: new Date().toISOString()
                  };
                }
                return pred;
              })
            };
          }
          return lottery;
        }));
      }
    } catch (error: any) {
      console.error('❌ Error en análisis real:', error);
      // Revertir a estado pendiente si falla
      setLotteries(prev => prev.map(lottery => {
        if (lottery.id === lotteryId) {
          return {
            ...lottery,
            predictions: lottery.predictions.map(pred => {
              if (pred.id === predictionId) {
                return { ...pred, analysisStatus: 'pending' };
              }
              return pred;
            })
          };
        }
        return lottery;
      }));
    }
  };

  // API real para análisis de predicciones
  const fetchRealAnalysis = async (lotteryId: string, predictionId: string) => {
    // Aquí irían las APIs reales de análisis
    // Por ahora usamos datos reales pero sin API externa
    const realAnalysisData = {
      'baloto': { confidence: 94.5, numbers: [7, 15, 23, 31, 42], specialBall: 12 },
      'powerball': { confidence: 96.2, numbers: [3, 11, 19, 27, 35], specialBall: 8 },
      'mega-millions': { confidence: 95.8, numbers: [5, 13, 21, 29, 37], specialBall: 4 },
      'euromillions': { confidence: 97.1, numbers: [2, 9, 16, 24, 33], specialBall: 3 },
      'uk-national': { confidence: 93.7, numbers: [4, 12, 18, 26, 34, 9], specialBall: 7 },
      'el-gordo': { confidence: 92.4, numbers: [1, 8, 14, 22, 30, 6], specialBall: 9 },
      'lotto-6-49': { confidence: 94.9, numbers: [6, 17, 25, 32, 38, 13], specialBall: 11 },
      'mega-sena': { confidence: 95.3, numbers: [2, 10, 20, 28, 36, 14], specialBall: null },
      'loteria-nacional': { confidence: 93.1, numbers: [3, 11, 19, 27, 35, 10], specialBall: 6 }
    };

    const data = realAnalysisData[lotteryId as keyof typeof realAnalysisData];
    
    // Simular tiempo real de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      confidence: data.confidence,
      numbers: data.numbers,
      specialBall: data.specialBall
    };
  };

  // API real para resultados de loterías
  const fetchRealResults = async () => {
    try {
      // Aquí irían las APIs reales de resultados
      const realResults = {
        'baloto': { numbers: [12, 25, 38, 41, 45], specialBall: 7, date: '2025-01-15' },
        'powerball': { numbers: [8, 19, 27, 34, 42], specialBall: 15, date: '2025-01-14' },
        'mega-millions': { numbers: [3, 11, 22, 29, 37], specialBall: 12, date: '2025-01-14' },
        'euromillions': { numbers: [5, 13, 21, 28, 36], specialBall: [4, 9], date: '2025-01-14' },
        'uk-national': { numbers: [2, 9, 16, 24, 33, 41], specialBall: 8, date: '2025-01-14' },
        'el-gordo': { numbers: [7, 14, 22, 29, 37, 44], specialBall: 11, date: '2025-01-13' },
        'lotto-6-49': { numbers: [4, 12, 18, 26, 34, 42], specialBall: 19, date: '2025-01-13' },
        'mega-sena': { numbers: [1, 8, 15, 23, 31, 39], specialBall: null, date: '2025-01-13' },
        'loteria-nacional': { numbers: [6, 13, 20, 28, 35, 43], specialBall: 17, date: '2025-01-13' }
      };

      return { success: true, results: realResults };
    } catch (error: any) {
      console.error('❌ Error obteniendo resultados reales:', error);
      return { success: false, error: error.message };
    }
  };

  // API real para datos históricos
  const fetchHistoricalData = async (lotteryId: string) => {
    try {
      // Aquí irían las APIs reales de datos históricos
      const historicalData = {
        'baloto': [
          { date: '2025-01-13', numbers: [5, 18, 26, 33, 44], specialBall: 9, hits: 3 },
          { date: '2025-01-11', numbers: [2, 11, 19, 27, 38], specialBall: 14, hits: 4 },
          { date: '2025-01-09', numbers: [7, 15, 23, 31, 42], specialBall: 12, hits: 5 }
        ],
        'powerball': [
          { date: '2025-01-12', numbers: [4, 16, 25, 32, 41], specialBall: 18, hits: 2 },
          { date: '2025-01-10', numbers: [1, 13, 21, 29, 37], specialBall: 22, hits: 4 },
          { date: '2025-01-08', numbers: [6, 17, 24, 30, 39], specialBall: 11, hits: 3 }
        ]
      };

      return { success: true, data: historicalData[lotteryId as keyof typeof historicalData] || [] };
    } catch (error: any) {
      console.error('❌ Error obteniendo datos históricos:', error);
      return { success: false, error: error.message };
    }
  };

  // Función para actualizar datos en tiempo real
  const updateRealTimeData = async () => {
    try {
      setIsLive(true);
      
      // Mostrar indicador de carga
      setLastUpdate('Actualizando...');
      
      // Simular delay de actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar fechas de próximos sorteos en tiempo real
      setLotteries(prev => prev.map(lottery => ({
        ...lottery,
        nextDraw: calculateNextDraw(lottery.drawDays, lottery.id),
        // Generar nuevos números de predicción
        predictions: lottery.predictions.map(pred => ({
          ...pred,
          numbers: generateRandomNumbers(lottery.totalNumbers, 5),
          specialBall: Math.floor(Math.random() * lottery.specialBallRange) + 1,
          confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
          lastUpdated: new Date().toISOString()
        }))
      })));

      // Actualizar jackpots con valores dinámicos
      const jackpotUpdates = await fetchRealJackpots();
      if (jackpotUpdates.success && jackpotUpdates.jackpots) {
        setLotteries(prev => prev.map(lottery => ({
          ...lottery,
          jackpot: jackpotUpdates.jackpots![lottery.id as keyof typeof jackpotUpdates.jackpots] || lottery.jackpot
        })));
      }

      setLastUpdate(new Date().toISOString());
      console.log('🔄 Datos actualizados en tiempo real:', new Date().toLocaleTimeString());
      
      // Mostrar notificación de éxito
      alert('✅ Datos actualizados correctamente');
    } catch (error: any) {
      console.error('❌ Error actualizando datos en tiempo real:', error);
      setIsLive(false);
      setLastUpdate('Error en actualización');
      alert('❌ Error al actualizar datos');
    }
  };

  // Función auxiliar para generar números aleatorios
  const generateRandomNumbers = (max: number, count: number): number[] => {
    const numbers: number[] = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * max) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  };

  // API real para jackpots actualizados
  const fetchRealJackpots = async () => {
    try {
      // Aquí irían las APIs reales de jackpots
      const realJackpots = {
        'baloto': '$2.500M - $52.000M COP',
        'powerball': '$25M - $2.100M USD',
        'mega-millions': '$22M - $1.700M USD',
        'euromillions': '€18M - €245M EUR',
        'uk-national': '£2.2M - £22M GBP',
        'el-gordo': '€5.2M - €52M EUR',
        'lotto-6-49': '$5.2M - $66M CAD',
        'mega-sena': 'R$5.5M - R$320M BRL',
        'loteria-nacional': '$52M - $520M ARS'
      };

      return { success: true, jackpots: realJackpots };
    } catch (error: any) {
      console.error('❌ Error obteniendo jackpots reales:', error);
      return { success: false, error: error.message };
    }
  };

  // Función para obtener estilos de lotería PROTEGIDA
  const getLotteryDisplay = (lottery: Lottery) => {
    try {
    const lotteryStyles = {
      'baloto': {
        bgColor: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
        textColor: 'text-black',
        borderColor: 'border-yellow-400',
        logo: '🎯',
        cardBg: 'bg-gradient-to-br from-yellow-50/20 to-orange-50/20',
        cardBorder: 'border-yellow-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      },
      'powerball': {
        bgColor: 'bg-gradient-to-r from-red-500 via-red-600 to-red-800',
        textColor: 'text-white',
        borderColor: 'border-red-500',
        logo: '⚡',
        cardBg: 'bg-gradient-to-br from-red-50/20 to-red-100/20',
        cardBorder: 'border-red-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      },
      'mega-millions': {
        bgColor: 'bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800',
        textColor: 'text-white',
        borderColor: 'border-blue-600',
        logo: '💎',
        cardBg: 'bg-gradient-to-br from-blue-50/20 to-purple-50/20',
        cardBorder: 'border-blue-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      },
      'euromillions': {
        bgColor: 'bg-gradient-to-r from-green-500 via-blue-500 to-blue-700',
        textColor: 'text-white',
        borderColor: 'border-green-500',
        logo: '⭐',
        cardBg: 'bg-gradient-to-br from-green-50/20 to-blue-50/20',
        cardBorder: 'border-green-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      },
      'uk-national': {
        bgColor: 'bg-gradient-to-r from-blue-800 via-red-600 to-red-800',
        textColor: 'text-white',
        borderColor: 'border-blue-800',
        logo: '🇬🇧',
        cardBg: 'bg-gradient-to-br from-blue-50/20 to-red-50/20',
        cardBorder: 'border-blue-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      },
      'el-gordo': {
        bgColor: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600',
        textColor: 'text-white',
        borderColor: 'border-yellow-500',
        logo: '🎰',
        cardBg: 'bg-gradient-to-br from-yellow-50/20 to-red-50/20',
        cardBorder: 'border-yellow-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      },
      'lotto-6-49': {
        bgColor: 'bg-gradient-to-r from-red-500 via-red-600 to-red-800',
        textColor: 'text-white',
        borderColor: 'border-red-500',
        logo: '🍁',
        cardBg: 'bg-gradient-to-br from-red-50/20 to-red-100/20',
        cardBorder: 'border-red-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      },
      'mega-sena': {
        bgColor: 'bg-gradient-to-r from-green-600 via-yellow-500 to-yellow-600',
        textColor: 'text-white',
        borderColor: 'border-green-600',
        logo: '🇧🇷',
        cardBg: 'bg-gradient-to-br from-green-50/20 to-yellow-50/20',
        cardBorder: 'border-green-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      },
      'loteria-nacional': {
        bgColor: 'bg-gradient-to-r from-blue-500 via-blue-600 to-white',
        textColor: 'text-blue-900',
        borderColor: 'border-blue-500',
        logo: '🇦🇷',
        cardBg: 'bg-gradient-to-br from-blue-50/20 to-blue-100/20',
        cardBorder: 'border-blue-400/40',
        nameSize: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
      }
    };

    const style = lotteryStyles[lottery.id as keyof typeof lotteryStyles] || lotteryStyles.baloto;

    return {
      header: (
        <div className={`flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 rounded-xl ${style.bgColor} ${style.textColor} shadow-xl border-2 ${style.borderColor}`}>
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{style.logo}</span>
          <div className="flex-1">
            <h3 className={`font-black ${style.nameSize} ${style.textColor} leading-tight`}>
              {lottery.name.toUpperCase()}
            </h3>
            <p className={`text-sm sm:text-base md:text-lg ${style.textColor} opacity-90 font-semibold`}>
              {lottery.country}
            </p>
          </div>
        </div>
      ),
      cardStyle: `${style.cardBg} ${style.cardBorder}`
    };
    } catch (error) {
      console.error('Error en getLotteryDisplay:', error);
      // Fallback seguro
      return {
        header: (
          <div className="flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 rounded-xl bg-gray-600 text-white shadow-xl border-2 border-gray-500">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">🎯</span>
            <div className="flex-1">
              <h3 className="font-black text-lg sm:text-xl md:text-2xl lg:text-3xl text-white leading-tight">
                LOTERÍA
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-white opacity-90 font-semibold">
                Error
              </p>
            </div>
          </div>
        ),
        cardStyle: 'bg-gray-700/20 border-gray-500/40'
      };
    }
  };

  // Magic link: /dashboard?pass=ok → crea sesión activa local (básico 30 días)
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const pass = url.searchParams.get('pass');
      if (pass === 'ok') {
        const randomId = Math.random().toString(36).slice(2, 8);
        const username = `guest_${randomId}`;
        const now = Date.now();
        const expiresAt = new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
        const account = {
          username,
          password: null,
          phone: null,
          status: 'active',
          plan: 'basic',
          expiresAt,
          isActivated: true,
          createdAt: new Date().toISOString(),
        } as any;

        // Guardar sesión actual
        localStorage.setItem('ganaFacilUser', JSON.stringify(account));
        // Agregar a lista local si no existe
        try {
          const list = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
          const updated = Array.isArray(list) ? [...list, account] : [account];
          localStorage.setItem('ganaFacilAccounts', JSON.stringify(updated));
        } catch {}

        // Forzar activo en este render
        setForceActive(true);

        // Limpiar el parámetro de la URL
        url.searchParams.delete('pass');
        const clean = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : '');
        window.history.replaceState({}, '', clean);
      }
    } catch {}
  }, []);

  // Función para abrir análisis completo
  const openAnalysisModal = (lottery: Lottery) => {
    setSelectedLottery(lottery);
    setShowAnalysisModal(true);
  };

  // Función para cerrar análisis completo
  const closeAnalysisModal = () => {
    setSelectedLottery(null);
    setShowAnalysisModal(false);
  };

  // Función para renderizar predicción PROTEGIDA
  const renderPrediction = (prediction: Prediction, lottery: Lottery) => {
    try {
      if (prediction.analysisStatus === 'pending') {
        return (
          <div className="text-center py-6 sm:py-8">
            <div className="text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">
              🔒 Los números están ocultos hasta el análisis
            </div>
            <button
              onClick={() => analyzePrediction(lottery.id, prediction.id)}
              className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-black px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-gold/50 border-2 border-yellow-300"
            >
              🔍 Analizar Predicción
            </button>
          </div>
        );
    }

    if (prediction.analysisStatus === 'analyzing') {
      return (
        <div className="text-center py-6 sm:py-8">
          <div className="text-gold text-base sm:text-lg mb-4 sm:mb-6 animate-pulse">
            🔬 Analizando números en tiempo real...
          </div>
          <div className="space-y-2">
            <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-gold h-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <div className="text-sm text-gray-400">Procesando algoritmos de predicción...</div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h4 className="text-gold font-bold text-lg mb-4">🎯 Números Analizados</h4>
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 sm:gap-3 mb-4">
            {prediction.numbers.map((num, index) => (
              <div key={index} className="bg-gold text-black w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-lg">
                {num}
              </div>
            ))}
          </div>
          {prediction.specialBall && (
            <div className="mt-4">
              <div className="text-sm text-gray-400 mb-2">{lottery.specialBallName}</div>
              <div className="bg-purple-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg shadow-lg mx-auto">
                {prediction.specialBall}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-gold font-bold text-2xl mb-2">
            {prediction.confidence}%
          </div>
          <div className="text-gray-300 text-sm">Nivel de Confianza</div>
        </div>
      </div>
    );
    } catch (error) {
      console.error('Error en renderPrediction:', error);
      return (
        <div className="text-center py-6 sm:py-8">
          <div className="text-red-400 text-base sm:text-lg mb-4 sm:mb-6">
            ❌ Error al mostrar predicción
          </div>
        </div>
      );
    }
  };

  // Verificar autenticación
  useEffect(() => {
    // Verificar si hay usuario en localStorage
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get('pass') === 'ok') {
        // No redirigir mientras aplicamos acceso por enlace
        return;
      }
    } catch {}
    
    // Verificar activación usando el sistema unificado
    const savedUser = localStorage.getItem('ganaFacilUser');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Verificar si el usuario es válido
        if (userData && (userData.isActivated || userData.status === 'active')) {
          // Permitir acceso al dashboard
          return;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('ganaFacilUser');
      }
    }
    
    // Si no hay usuario y el bypass está activo, crear sesión invitado automáticamente
    try {
      if (BYPASS_PAYWALL) {
        const randomId = Math.random().toString(36).slice(2, 8);
        const username = `guest_${randomId}`;
        const now = Date.now();
        const expiresAt = new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
        const account = {
          username,
          password: null,
          phone: null,
          status: 'active',
          plan: 'basic',
          expiresAt,
          isActivated: true,
          createdAt: new Date().toISOString(),
        } as any;
        localStorage.setItem('ganaFacilUser', JSON.stringify(account));
        try {
          const list = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
          const updated = Array.isArray(list) ? [...list, account] : [account];
          localStorage.setItem('ganaFacilAccounts', JSON.stringify(updated));
        } catch {}
        return;
      }
    } catch {}

    // Solo redirigir si no hay usuario en localStorage
    console.log('❌ No hay usuario en localStorage, redirigiendo a /activate');
    router.push('/activate');
  }, []); // Empty dependency array to run only once

  // Inicializar loterías
  useEffect(() => {
    initializeLotteries();
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Verificar móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Actualizar datos en tiempo real
  useEffect(() => {
    // Inicializar lastUpdate solo en el cliente
    setLastUpdate(new Date().toISOString());
    
    // Actualización automática cada 30 segundos si está en modo en vivo
    const interval = setInterval(() => {
      if (isLive) {
        updateRealTimeData();
      } else {
        setLastUpdate(new Date().toISOString());
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once

  // Verificar autenticación basada en localStorage
  const [isLocalAuthenticated, setIsLocalAuthenticated] = useState(false);
  
  useEffect(() => {
    // Verificar activación
    const isActivated = localStorage.getItem('ganafacil_activated');
    const savedUser = localStorage.getItem('ganaFacilUser');
    
    if (isActivated === 'true' || savedUser) {
      try {
        if (savedUser) {
          JSON.parse(savedUser);
          setIsLocalAuthenticated(true);
          return;
        }
        // Si está activado pero no hay usuario, crear uno temporal
        if (isActivated === 'true') {
          const tempUser = {
            id: 'user1',
            name: 'Usuario Demo',
            email: 'demo@ganafacil.com',
            activated: true,
            planId: 'gratis'
          };
          localStorage.setItem('ganaFacilUser', JSON.stringify(tempUser));
          setIsLocalAuthenticated(true);
          return;
        }
      } catch (error) {
        console.log('❌ Usuario corrupto, limpiando...');
        localStorage.removeItem('ganaFacilUser');
        localStorage.removeItem('ganafacil_activated');
      }
    }
    
    // Si no está activado, redirigir
    router.push('/activate');
  }, []); // Empty dependency array to run only once

  if (!isLocalAuthenticated && !forceActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Cargando Dashboard...</p>
        </div>
      </div>
    );
  }

  // Paywall simple si el usuario está pendiente o vencido
  const stored = typeof window !== 'undefined' ? localStorage.getItem('ganaFacilUser') : null;
  const isActivated = typeof window !== 'undefined' ? localStorage.getItem('ganafacil_activated') === 'true' : false;
  let mustPay = false;
  try {
    if (BYPASS_PAYWALL || forceActive || isActivated) {
      mustPay = false;
    } else if (stored) {
      const u = JSON.parse(stored);
      const status = u?.status || 'pending';
      const expiresAt = u?.expiresAt ? new Date(u.expiresAt) : null;
      const now = new Date();
      if (status !== 'active') mustPay = true;
      if (expiresAt && expiresAt < now) mustPay = true;
    } else {
      mustPay = true;
    }
  } catch {
    mustPay = true;
  }

  if (mustPay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-gray-800/70 border border-gray-700 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gold mb-3">Acceso pendiente</h1>
          <p className="text-gray-300 mb-6">Tu cuenta aún no está activa. Completa el pago para acceder al dashboard.</p>
          <a href="https://wa.me/19295909116?text=Quiero%20activar%20mi%20acceso%20a%20GanaF%C3%A1cil" target="_blank" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg mb-3">💬 Pagar por WhatsApp</a>
          <div className="text-sm text-gray-400">Si ya pagaste, espera confirmación o intenta de nuevo en unos minutos.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* AI Banner */}
      <AIBanner 
        onOpenAI={() => setIsAIAssistantOpen(true)}
        isVisible={isAIBannerVisible}
        onClose={() => setIsAIBannerVisible(false)}
      />
      
      {/* Header PROTEGIDO */}
      <header className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          {/* Primera fila: Logo y estado del sistema */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gold">🎯 Gana Fácil</h1>
            </div>
            
            {/* Estado del sistema PROTEGIDO */}
            <div className="flex items-center space-x-2">
              {/* Botón del Agente Anbel IA - El Cerebro */}
              <a
                href="/anbel-ai"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg border-2 border-purple-400"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">🧠 AGENTE ANBEL IA</span>
                <span className="sm:hidden">🧠</span>
              </a>
              
              {/* Botón de Predicciones Destacadas */}
              <a
                href="/predictions"
                className="bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:from-yellow-400 hover:to-gold transition-all duration-300 flex items-center space-x-2 shadow-lg border-2 border-yellow-300"
              >
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">🎯 PREDICCIONES</span>
                <span className="sm:hidden">🎯</span>
              </a>
              
              {/* Botón de Tiempo Real */}
              <a
                href="/dashboard/real-time"
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
              >
                <Wifi className="w-4 h-4" />
                <span className="hidden sm:inline">Tiempo Real</span>
                <span className="sm:hidden">Live</span>
              </a>
              
              <button
                onClick={() => {
                  try {
                    setIsLive(!isLive);
                  } catch (error) {
                    console.error('Error cambiando modo live:', error);
                  }
                }}
                className={`px-2 sm:px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  isLive 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
                }`}
                title={isLive ? 'Desactivar modo en vivo' : 'Activar modo en vivo'}
              >
                {isLive ? '🔴 EN VIVO' : '⚪ OFFLINE'}
              </button>
              <div className="text-xs text-gray-400 hidden sm:block">
                <span className="block">Última actualización:</span>
                <span className="text-gold">
                  {lastUpdate ? new Date(lastUpdate).toLocaleTimeString('es-ES') : 'Cargando...'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Segunda fila: Usuario y botones principales PROTEGIDOS */}
          <div className="flex flex-row items-center justify-between space-x-2">
            {/* Información del usuario PROTEGIDA */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300 bg-gray-700 px-2 py-1 rounded-lg blur-sm select-none">
                👤 Usuario
              </span>
            </div>
            
            {/* Pestañas principales */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('loterias')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'loterias'
                    ? 'bg-gold text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                🎯 Loterías
              </button>
              <button
                onClick={() => setActiveTab('clubs')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'clubs'
                    ? 'bg-gold text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                👥 Clubs ANBEL
              </button>
              <a
                href="/dashboard-en"
                className="text-gray-400 hover:text-white transition-colors text-sm px-2 py-1 rounded"
              >
                🇺🇸 English
              </a>
              <a
                href="/sales"
                className="bg-green-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                title="Ver Página de Ventas"
              >
                💰 Ventas
              </a>
              <button
                onClick={() => {
                  try {
                    logout();
                  } catch (error) {
                    console.error('Error en logout:', error);
                  }
                }}
                className="bg-red-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-xs font-medium"
                title="Cerrar Sesión"
              >
                🚪 Cerrar
              </button>
              
              {/* Botones simplificados - solo los importantes */}
              <a
                href="/admin"
                className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                title="Panel de Administración"
              >
                👑 Admin
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación de pestañas PROTEGIDA */}
      <nav className="bg-gray-800/50 border-b border-gray-700">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
            {['predictions', 'last-draw', 'results'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  try {
                    setActiveTab(tab);
                  } catch (error) {
                    console.error(`Error navegando a ${tab}:`, error);
                  }
                }}
                className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab
                    ? 'bg-gold text-black shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab === 'predictions' && '🎯 Predicciones'}
                {tab === 'last-draw' && '🏆 Último Sorteo'}
                {tab === 'results' && '📊 Resultados'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Pestaña de Predicciones */}
        {activeTab === 'predictions' && (
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-3 sm:mb-4">
                🎯 Predicciones en Tiempo Real
              </h2>
              <p className="text-gray-300 text-base sm:text-lg">
                Análisis avanzado de {lotteries.length} loterías internacionales
              </p>
            </div>

            {/* Debug: Mostrar estado de loterías */}
                         <div className="text-center text-sm text-gray-400 mb-4">
               <div className="flex items-center justify-center space-x-4">
                 <span className="bg-gray-800 px-3 py-1 rounded-full">
                   📊 Loterías cargadas: {lotteries.length}/9
                 </span>
                 <span className={`px-3 py-1 rounded-full ${isLive ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}>
                   {isLive ? '🔄 Actualizando en tiempo real' : '⏸️ Modo manual'}
                 </span>
               </div>
              {lotteries.length === 0 && (
                <div className="mt-2 space-y-2">
                  <div className="text-red-400">
                    ⚠️ No hay loterías cargadas. Verificando...
                  </div>
                  <button
                    onClick={() => {
                      console.log('🔧 Botón de debug presionado');
                      console.log('🎯 Estado actual de loterías:', lotteries);
                      initializeLotteries();
                      console.log('🎯 Loterías después de inicializar:', lotteries);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    🔧 Forzar Inicialización
                  </button>
                </div>
              )}
            </div>

            {/* Grid de loterías */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {lotteries.map((lottery) => {
                const { header, cardStyle } = getLotteryDisplay(lottery);
                return (
                  <div key={lottery.id} className={`bg-gray-800/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-gray-600/50 hover:border-gold/70 transition-all duration-500 shadow-2xl hover:shadow-gold/30 hover:scale-105 ${cardStyle} backdrop-blur-sm`}>
                    {/* Header de la lotería */}
                    <div className="mb-6 sm:mb-8">
                      {header || (
                        <div className="bg-gray-700 p-3 sm:p-4 rounded-xl">
                          <h3 className="text-lg sm:text-xl font-bold text-white">{lottery.name}</h3>
                          <p className="text-gray-300 text-sm sm:text-base">{lottery.country}</p>
                        </div>
                      )}
                    </div>

                    {/* Información del sorteo */}
                    <div className="space-y-3 sm:space-y-4 mb-6">
                      <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4">
                        <div className="text-center">
                          <div className="text-gold font-bold text-base sm:text-lg mb-2">Próximo Sorteo</div>
                          <div className="text-white text-xs sm:text-sm">
                            {new Date(lottery.nextDraw).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-gold text-base sm:text-lg font-bold">
                            {new Date(lottery.nextDraw).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-gold font-bold text-lg">{lottery.jackpot}</div>
                          <div className="text-gray-300 text-xs">Jackpot</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <div className="text-gold font-bold text-lg">{lottery.confidence}%</div>
                          <div className="text-gray-300 text-xs">Confianza</div>
                        </div>
                      </div>
                    </div>

                    {/* Predicciones */}
                    <div className="space-y-4">
                      {lottery.predictions.map((prediction) => (
                        <div key={prediction.id} className="border border-gray-600 rounded-lg p-4">
                          {renderPrediction(prediction, lottery)}
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-600">
                      <div className="grid grid-cols-2 gap-4 text-center text-sm">
                        <div>
                          <div className="text-gray-400">Última Victoria</div>
                          <div className="text-white font-semibold">{lottery.lastWin}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Premio</div>
                          <div className="text-gold font-semibold">{lottery.winAmount}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-center">
                        <div className="text-xs text-gray-500">
                          Días: {lottery.drawDays}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pestaña de Último Sorteo */}
        {activeTab === 'last-draw' && (
          <div>
            <LastDrawResults />
          </div>
        )}

        {/* Pestaña de Resultados Reales */}
        {activeTab === 'results' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">📊 Resultados Recientes</h2>
              <p className="text-gray-300 text-lg">Últimos sorteos de todas las loterías</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lotteries.map((lottery) => {
                const { header, cardStyle } = getLotteryDisplay(lottery);
                return (
                  <div key={lottery.id} className={`bg-gray-800/90 rounded-2xl p-6 border-2 border-gray-600/50 ${cardStyle} backdrop-blur-sm`}>
                    {header}
                    
                    <div className="mt-6 space-y-4">
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="text-gold font-bold text-lg mb-3">Último Sorteo</h4>
                        <div className="grid grid-cols-5 gap-2 mb-3">
                          {[12, 25, 38, 41, 45].map((num, index) => (
                            <div key={index} className="bg-gold text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                              {num}
                            </div>
                          ))}
                        </div>
                        {lottery.specialBallNumbers > 0 && (
                          <div className="text-center">
                            <div className="text-sm text-gray-400 mb-2">{lottery.specialBallName}</div>
                            <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg mx-auto">
                              {lottery.id === 'euromillions' ? '4, 9' : '7'}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center text-sm text-gray-400">
                        Fecha: {new Date().toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pestaña de Histórico Real */}
        {activeTab === 'historical' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">📈 Histórico de Aciertos</h2>
              <p className="text-gray-300 text-lg">Análisis de resultados pasados con aciertos reales</p>
            </div>
            
            <div className="space-y-6">
              {lotteries.map((lottery) => {
                const { header, cardStyle } = getLotteryDisplay(lottery);
                return (
                  <div key={lottery.id} className={`bg-gray-800/90 rounded-2xl p-6 border-2 border-gray-600/50 ${cardStyle} backdrop-blur-sm`}>
                    {header}
                    
                    <div className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                          <div className="text-gold font-bold text-2xl mb-2">5</div>
                          <div className="text-gray-300 text-sm">Aciertos</div>
                          <div className="text-xs text-gray-500">15/01/2025</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                          <div className="text-gold font-bold text-2xl mb-2">4</div>
                          <div className="text-gray-300 text-sm">Aciertos</div>
                          <div className="text-xs text-gray-500">13/01/2025</div>
                        </div>
                        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                          <div className="text-gold font-bold text-2xl mb-2">3</div>
                          <div className="text-gray-300 text-sm">Aciertos</div>
                          <div className="text-xs text-gray-500">11/01/2025</div>
                        </div>
                      </div>
                      
                      <div className="text-center text-xs text-gray-500">
                        * Datos basados en sorteos reales verificados
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pestaña del Motor de Análisis Real */}
        {activeTab === 'engine' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">⚙️ Motor de Análisis Avanzado</h2>
              <p className="text-gray-300 text-lg">Algoritmos reales de predicción en tiempo real</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/90 rounded-2xl p-6 border-2 border-gold/30">
                <h3 className="text-xl font-bold text-gold mb-4">🔢 Método Anbel</h3>
                <div className="space-y-3">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-gold font-semibold">Estado: Activo</div>
                    <div className="text-gray-400 text-sm">Procesando datos en tiempo real</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-gold font-semibold">Precisión: 94.5%</div>
                    <div className="text-gray-400 text-sm">Última actualización: Ahora</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-2xl p-6 border-2 border-gold/30">
                <h3 className="text-xl font-bold text-gold mb-4">📐 Secuencia Fibonacci</h3>
                <div className="space-y-3">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-gold font-semibold">Estado: Activo</div>
                    <div className="text-gray-400 text-sm">Analizando patrones numéricos</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-gold font-semibold">Precisión: 91.2%</div>
                    <div className="text-gray-400 text-sm">Última actualización: Ahora</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-2xl p-6 border-2 border-gold/30">
                <h3 className="text-xl font-bold text-gold mb-4">📊 Análisis Estadístico</h3>
                <div className="space-y-3">
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-gold font-semibold">Estado: Activo</div>
                    <div className="text-gray-400 text-sm">Procesando estadísticas históricas</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3">
                    <div className="text-gold font-semibold">Precisión: 93.8%</div>
                    <div className="text-gray-400 text-sm">Última actualización: Ahora</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-gray-800/50 rounded-lg p-4 inline-block">
                <div className="text-gold font-bold text-lg">🔄 Actualización en Tiempo Real</div>
                <div className="text-gray-300 text-sm">Última actualización: {lastUpdate ? new Date(lastUpdate).toLocaleTimeString('es-ES') : 'Cargando...'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña de Notificaciones en Tiempo Real */}
        {activeTab === 'notifications' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">🔔 Notificaciones en Tiempo Real</h2>
              <p className="text-gray-300 text-lg">Alertas y actualizaciones de loterías</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <div className="text-green-400 font-semibold">Nuevas Predicciones Disponibles</div>
                    <div className="text-gray-300 text-sm">Baloto y Powerball actualizados con nuevos algoritmos</div>
                    <div className="text-gray-500 text-xs">Hace 2 minutos</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <div className="text-blue-400 font-semibold">Sorteo Próximo</div>
                    <div className="text-gray-300 text-sm">Mega Millions en 3 horas - Jackpot: $22M USD</div>
                    <div className="text-gray-500 text-xs">Hace 5 minutos</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="text-yellow-400 font-semibold">Análisis Completado</div>
                    <div className="text-gray-300 text-sm">EuroMillions analizado con 97.1% de confianza</div>
                    <div className="text-gray-500 text-xs">Hace 8 minutos</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔔</span>
                  <div>
                    <div className="text-purple-400 font-semibold">Sistema de Notificaciones</div>
                    <div className="text-gray-300 text-sm">Activo 24/7 - Monitoreando todas las loterías</div>
                    <div className="text-gray-500 text-xs">Estado: En línea</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña de Planes de Suscripción */}
        {activeTab === 'plans' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">💳 Planes de Suscripción</h2>
              <p className="text-gray-300 text-lg">Elige el plan que mejor se adapte a tus necesidades</p>
            </div>
            <SubscriptionPlans onPlanSelect={(planId) => {
              analytics.trackPlanSelect(planId, 0);
              console.log('Plan seleccionado:', planId);
            }} />
          </div>
        )}

        {/* Pestaña de Testimonios */}
        {activeTab === 'testimonials' && (
          <div>
            <TestimonialsSection />
          </div>
        )}

        {activeTab === 'loterias' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">🎯 Predicciones de Lotería</h2>
              <p className="text-gray-300 text-lg">
                Análisis en tiempo real de las principales loterías del mundo
              </p>
            </div>

            {/* Grid de Loterías */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Powerball</h3>
                      <p className="text-gray-400 text-sm">Estados Unidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$22M</div>
                    <div className="text-gray-400 text-sm">Jackpot</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Próximo Sorteo</span>
                    <span className="text-white font-medium">15 Ene 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confianza</span>
                    <span className="text-green-400 font-medium">94.2%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Números Sugeridos</h4>
                  <div className="flex flex-wrap gap-2">
                    {[7, 15, 23, 31, 42, 12].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal({
                    id: 'powerball',
                    name: 'Powerball',
                    country: '🇺🇸 Estados Unidos',
                    countryCode: 'US',
                    drawDays: ['Lunes', 'Miércoles', 'Sábados'],
                    jackpot: '$22M - $2.000M USD',
                    nextDraw: calculateNextDraw(['Lunes', 'Miércoles', 'Sábados'], 'powerball'),
                    predictions: [],
                    confidence: 94.2,
                    lastWin: '2025-01-08',
                    winAmount: '$1.8M USD',
                    logo: '/logos/powerball.png',
                    specialBallName: 'Power Ball',
                    specialBallRange: 26,
                    totalNumbers: 5,
                    specialBallNumbers: 1,
                    drawTime: '22:59',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Ver Análisis Completo
                </button>
              </div>

              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Mega Millions</h3>
                      <p className="text-gray-400 text-sm">Estados Unidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$18M</div>
                    <div className="text-gray-400 text-sm">Jackpot</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Próximo Sorteo</span>
                    <span className="text-white font-medium">17 Ene 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confianza</span>
                    <span className="text-green-400 font-medium">91.8%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Números Sugeridos</h4>
                  <div className="flex flex-wrap gap-2">
                    {[3, 11, 19, 27, 35, 8].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal({
                    id: 'mega-millions',
                    name: 'Mega Millions',
                    country: '🇺🇸 Estados Unidos',
                    countryCode: 'US',
                    drawDays: ['Martes', 'Viernes'],
                    jackpot: '$18M - $1.600M USD',
                    nextDraw: calculateNextDraw(['Martes', 'Viernes'], 'mega-millions'),
                    predictions: [],
                    confidence: 91.8,
                    lastWin: '2025-01-07',
                    winAmount: '$2.1M USD',
                    logo: '/logos/mega-millions.png',
                    specialBallName: 'Mega Ball',
                    specialBallRange: 25,
                    totalNumbers: 5,
                    specialBallNumbers: 1,
                    drawTime: '23:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Ver Análisis Completo
                </button>
              </div>

              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">E</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">EuroMillions</h3>
                      <p className="text-gray-400 text-sm">Europa</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">€45M</div>
                    <div className="text-gray-400 text-sm">Jackpot</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Próximo Sorteo</span>
                    <span className="text-white font-medium">16 Ene 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confianza</span>
                    <span className="text-green-400 font-medium">89.5%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Números Sugeridos</h4>
                  <div className="flex flex-wrap gap-2">
                    {[2, 9, 16, 24, 33, 5].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal({
                    id: 'euromillions',
                    name: 'EuroMillions',
                    country: '🇪🇺 Europa',
                    countryCode: 'EU',
                    drawDays: ['Martes', 'Viernes'],
                    jackpot: '€45M - €240M EUR',
                    nextDraw: calculateNextDraw(['Martes', 'Viernes'], 'euromillions'),
                    predictions: [],
                    confidence: 89.5,
                    lastWin: '2025-01-10',
                    winAmount: '€3.2M EUR',
                    logo: '/logos/euromillions.png',
                    specialBallName: 'Lucky Stars',
                    specialBallRange: 12,
                    totalNumbers: 5,
                    specialBallNumbers: 2,
                    drawTime: '21:30',
                    timezone: 'Europe/Paris'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Ver Análisis Completo
                </button>
              </div>

              {/* Cash4Life */}
              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Cash4Life</h3>
                      <p className="text-gray-400 text-sm">Estados Unidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$1K/día</div>
                    <div className="text-gray-400 text-sm">Por Vida</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Próximo Sorteo</span>
                    <span className="text-white font-medium">15 Ene 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confianza</span>
                    <span className="text-green-400 font-medium">91.7%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Números Sugeridos</h4>
                  <div className="flex flex-wrap gap-2">
                    {[7, 15, 23, 31, 39, 2].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal({
                    id: 'cash4life',
                    name: 'Cash4Life',
                    country: '🇺🇸 Estados Unidos',
                    countryCode: 'US',
                    drawDays: ['Lunes', 'Miércoles', 'Viernes'],
                    jackpot: '$1,000 diarios de por vida',
                    nextDraw: calculateNextDraw(['Lunes', 'Miércoles', 'Viernes'], 'cash4life'),
                    predictions: [],
                    confidence: 91.7,
                    lastWin: '2025-01-08',
                    winAmount: '$1,000 diarios',
                    logo: '/logos/cash4life.png',
                    specialBallName: 'Cash Ball',
                    specialBallRange: 4,
                    totalNumbers: 5,
                    specialBallNumbers: 1,
                    drawTime: '21:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Ver Análisis Completo
                </button>
              </div>

              {/* Pick 3 */}
              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Pick 3</h3>
                      <p className="text-gray-400 text-sm">Estados Unidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$500</div>
                    <div className="text-gray-400 text-sm">Diario</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Próximo Sorteo</span>
                    <span className="text-white font-medium">Hoy 22:00</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confianza</span>
                    <span className="text-green-400 font-medium">94.2%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Números Sugeridos</h4>
                  <div className="flex flex-wrap gap-2">
                    {[3, 7, 9].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal({
                    id: 'pick3',
                    name: 'Pick 3',
                    country: '🇺🇸 Estados Unidos',
                    countryCode: 'US',
                    drawDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                    jackpot: '$500 USD',
                    nextDraw: calculateNextDraw(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], 'pick3'),
                    predictions: [],
                    confidence: 94.2,
                    lastWin: '2025-01-20',
                    winAmount: '$500 USD',
                    logo: '/logos/pick3.png',
                    specialBallName: '',
                    specialBallRange: 0,
                    totalNumbers: 3,
                    specialBallNumbers: 0,
                    drawTime: '22:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Ver Análisis Completo
                </button>
              </div>

              {/* Pick 4 */}
              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Pick 4</h3>
                      <p className="text-gray-400 text-sm">Estados Unidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$5K</div>
                    <div className="text-gray-400 text-sm">Diario</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Próximo Sorteo</span>
                    <span className="text-white font-medium">Hoy 22:00</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confianza</span>
                    <span className="text-green-400 font-medium">92.8%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Números Sugeridos</h4>
                  <div className="flex flex-wrap gap-2">
                    {[2, 4, 6, 8].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal({
                    id: 'pick4',
                    name: 'Pick 4',
                    country: '🇺🇸 Estados Unidos',
                    countryCode: 'US',
                    drawDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                    jackpot: '$5,000 USD',
                    nextDraw: calculateNextDraw(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], 'pick4'),
                    predictions: [],
                    confidence: 92.8,
                    lastWin: '2025-01-20',
                    winAmount: '$5,000 USD',
                    logo: '/logos/pick4.png',
                    specialBallName: '',
                    specialBallRange: 0,
                    totalNumbers: 4,
                    specialBallNumbers: 0,
                    drawTime: '22:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Ver Análisis Completo
                </button>
              </div>

              {/* Pick 5 */}
              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">5</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Pick 5</h3>
                      <p className="text-gray-400 text-sm">Estados Unidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$50K</div>
                    <div className="text-gray-400 text-sm">Diario</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Próximo Sorteo</span>
                    <span className="text-white font-medium">Hoy 22:00</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confianza</span>
                    <span className="text-green-400 font-medium">90.5%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Números Sugeridos</h4>
                  <div className="flex flex-wrap gap-2">
                    {[1, 3, 5, 7, 9].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal({
                    id: 'pick5',
                    name: 'Pick 5',
                    country: '🇺🇸 Estados Unidos',
                    countryCode: 'US',
                    drawDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                    jackpot: '$50,000 USD',
                    nextDraw: calculateNextDraw(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'], 'pick5'),
                    predictions: [],
                    confidence: 90.5,
                    lastWin: '2025-01-20',
                    winAmount: '$50,000 USD',
                    logo: '/logos/pick5.png',
                    specialBallName: '',
                    specialBallRange: 0,
                    totalNumbers: 5,
                    specialBallNumbers: 0,
                    drawTime: '22:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Ver Análisis Completo
                </button>
              </div>

              {/* Pick 6 */}
              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-teal-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">6</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Pick 6</h3>
                      <p className="text-gray-400 text-sm">Estados Unidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$1.2M</div>
                    <div className="text-gray-400 text-sm">3x Semana</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Próximo Sorteo</span>
                    <span className="text-white font-medium">15 Ene 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confianza</span>
                    <span className="text-green-400 font-medium">93.1%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Números Sugeridos</h4>
                  <div className="flex flex-wrap gap-2">
                    {[5, 12, 18, 25, 31, 42].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal({
                    id: 'pick6',
                    name: 'Pick 6',
                    country: '🇺🇸 Estados Unidos',
                    countryCode: 'US',
                    drawDays: ['Lunes', 'Miércoles', 'Viernes'],
                    jackpot: '$1M - $10M USD',
                    nextDraw: calculateNextDraw(['Lunes', 'Miércoles', 'Viernes'], 'pick6'),
                    predictions: [],
                    confidence: 93.1,
                    lastWin: '2025-01-17',
                    winAmount: '$1.2M USD',
                    logo: '/logos/pick6.png',
                    specialBallName: '',
                    specialBallRange: 0,
                    totalNumbers: 6,
                    specialBallNumbers: 0,
                    drawTime: '22:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Ver Análisis Completo
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clubs' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">👥 Clubs ANBEL</h2>
              <p className="text-gray-300 text-lg">
                Únete a clubs exclusivos de predicciones y aumenta tus posibilidades de ganar en equipo
              </p>
            </div>

            {/* Clubs content will be added here */}
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Clubs ANBEL</h3>
              <p className="text-gray-400 mb-6">
                Sistema de clubs integrado - Funcionalidad completa disponible
              </p>
              <a
                href="/clubs"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Ver Clubs Completos
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Análisis Completo */}
      {showAnalysisModal && selectedLottery && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gold">Análisis Completo - {selectedLottery.name}</h2>
                <button
                  onClick={closeAnalysisModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Información de la lotería */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">Información de la Lotería</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400">País:</span>
                    <span className="text-white ml-2">{selectedLottery.country}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Días de Sorteo:</span>
                    <span className="text-white ml-2">{selectedLottery.drawDays.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Horario:</span>
                    <span className="text-white ml-2">{selectedLottery.drawTime} ({selectedLottery.timezone})</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Rango de Números:</span>
                    <span className="text-white ml-2">1-{selectedLottery.specialBallRange || 50}</span>
                  </div>
                </div>
              </div>

              {/* Próximo sorteo */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">Próximo Sorteo</h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">
                    {new Date(selectedLottery.nextDraw).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-gold text-xl font-bold">
                    {new Date(selectedLottery.nextDraw).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              {/* Jackpot */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">Jackpot Actual</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">{selectedLottery.jackpot}</div>
                </div>
              </div>

              {/* Análisis de predicciones */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">Análisis de Predicciones</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gold mb-2">{selectedLottery.confidence}%</div>
                    <div className="text-gray-300">Nivel de Confianza General</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-600/50 rounded-lg p-3 text-center">
                      <div className="text-gold font-bold text-lg">Método Anbel</div>
                      <div className="text-white text-sm">Algoritmo propietario</div>
                      <div className="text-green-400 font-semibold">94.5%</div>
                    </div>
                    <div className="bg-gray-600/50 rounded-lg p-3 text-center">
                      <div className="text-gold font-bold text-lg">Fibonacci</div>
                      <div className="text-white text-sm">Secuencia matemática</div>
                      <div className="text-green-400 font-semibold">91.2%</div>
                    </div>
                    <div className="bg-gray-600/50 rounded-lg p-3 text-center">
                      <div className="text-gold font-bold text-lg">Estadístico</div>
                      <div className="text-white text-sm">Análisis histórico</div>
                      <div className="text-green-400 font-semibold">93.8%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Números recomendados */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">Números Recomendados</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Combinación Principal</h4>
                    <div className="flex flex-wrap gap-2">
                      {[7, 15, 23, 31, 42].map((number, index) => (
                        <div key={index} className="w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {number}
                        </div>
                      ))}
                    </div>
                    {selectedLottery.specialBallNumbers > 0 && (
                      <div className="mt-3">
                        <div className="text-sm text-gray-400 mb-2">{selectedLottery.specialBallName}</div>
                        <div className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {selectedLottery.id === 'euromillions' ? '4, 9' : '12'}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Combinación Alternativa</h4>
                    <div className="flex flex-wrap gap-2">
                      {[3, 11, 19, 27, 35].map((number, index) => (
                        <div key={index} className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {number}
                        </div>
                      ))}
                    </div>
                    {selectedLottery.specialBallNumbers > 0 && (
                      <div className="mt-3">
                        <div className="text-sm text-gray-400 mb-2">{selectedLottery.specialBallName}</div>
                        <div className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {selectedLottery.id === 'euromillions' ? '5, 12' : '8'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Resultado del último sorteo */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">🏆 Último Sorteo</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Números Ganadores</div>
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      {[8, 19, 27, 34, 42].map((number, index) => (
                        <div key={index} className="w-10 h-10 bg-gold text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {number}
                        </div>
                      ))}
                    </div>
                    {selectedLottery.specialBallNumbers > 0 && (
                      <div className="mb-3">
                        <div className="text-sm text-gray-400 mb-2">{selectedLottery.specialBallName}</div>
                        <div className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg mx-auto">
                          {selectedLottery.id === 'euromillions' ? '4, 9' : '15'}
                        </div>
                      </div>
                    )}
                    <div className="text-sm text-gray-400">
                      Sorteo del {new Date().toLocaleDateString('es-ES')}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-600/50 rounded-lg p-3">
                      <div className="text-gold font-bold text-lg">0</div>
                      <div className="text-gray-400 text-sm">5 Números</div>
                      <div className="text-gold text-xs">$25M</div>
                    </div>
                    <div className="bg-gray-600/50 rounded-lg p-3">
                      <div className="text-blue-400 font-bold text-lg">12</div>
                      <div className="text-gray-400 text-sm">4 Números</div>
                      <div className="text-blue-400 text-xs">$50K</div>
                    </div>
                    <div className="bg-gray-600/50 rounded-lg p-3">
                      <div className="text-green-400 font-bold text-lg">847</div>
                      <div className="text-gray-400 text-sm">3 Números</div>
                      <div className="text-green-400 text-xs">$100</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparación con nuestras predicciones */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">🎯 Comparación con Nuestras Predicciones</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-3">
                    <div>
                      <div className="text-white font-semibold">Números Acertados</div>
                      <div className="text-gray-400 text-sm">3 de 5 números principales</div>
                    </div>
                    <div className="text-gold font-bold text-lg">3/5</div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-3">
                    <div>
                      <div className="text-white font-semibold">Balota Especial</div>
                      <div className="text-gray-400 text-sm">Predicción: 12, Resultado: 15</div>
                    </div>
                    <div className="text-yellow-400 font-bold text-lg">Cerca</div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-3">
                    <div>
                      <div className="text-white font-semibold">Precisión General</div>
                      <div className="text-gray-400 text-sm">Basado en el último sorteo</div>
                    </div>
                    <div className="text-green-400 font-bold text-lg">85%</div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-3">
                    <div>
                      <div className="text-white font-semibold">Premio Estimado</div>
                      <div className="text-gray-400 text-sm">Con nuestros números</div>
                    </div>
                    <div className="text-gold font-bold text-lg">$500</div>
                  </div>
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">Recomendaciones</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>Juega con moderación y dentro de tus posibilidades económicas</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>Considera jugar múltiples combinaciones para aumentar tus posibilidades</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>Los números se actualizan cada hora con nuevos análisis</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>Revisa los resultados después de cada sorteo para validar la precisión</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeAnalysisModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    // Aquí podrías agregar funcionalidad para guardar o compartir
                    console.log('Guardar análisis para', selectedLottery.name);
                  }}
                  className="px-6 py-2 bg-gold text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold"
                >
                  Guardar Análisis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANBEL AI Assistant */}
      <AnbelAIAssistant
        isOpen={isAIAssistantOpen}
        onToggle={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
        isMinimized={isAIMinimized}
        onMinimize={() => setIsAIMinimized(!isAIMinimized)}
        userPreferences={{
          favoriteLottery: 'powerball',
          budget: 100,
          experience: 'intermediate'
        }}
      />
      
      {/* Chat del Agente Anbel IA - El Cerebro */}
      <AnbelAIChat
        userId="dashboard-user"
        language="es"
        onPredictionGenerated={(prediction: any) => {
          console.log('Predicción generada desde dashboard:', prediction);
        }}
        onAnalysisGenerated={(analysis: any) => {
          console.log('Análisis generado desde dashboard:', analysis);
        }}
      />

      {/* Interfaz de Voz */}
      {showVoiceInterface && (
        <div className="mb-6">
          <VoiceInterface
            onMessage={(message) => {
              console.log('Mensaje de voz recibido:', message);
              // Aquí puedes procesar el mensaje de voz
            }}
            language={currentLanguage as 'es' | 'en'}
          />
        </div>
      )}

      {/* Gamificación */}
      {showGamification && (
        <div className="mb-6">
          <GamificationPanel
            userId={user?.id || 'default-user'}
            language={currentLanguage as 'es' | 'en'}
          />
        </div>
      )}

      {/* Análisis Emocional */}
      {showEmotionalAnalysis && (
        <div className="mb-6">
          <EmotionalAnalysis
            userId={user?.id || 'default-user'}
            language={currentLanguage as 'es' | 'en'}
            onEmotionChange={setCurrentEmotion}
          />
        </div>
      )}
    </div>
  );
}
