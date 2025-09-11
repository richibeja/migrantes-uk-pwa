"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import { useAnalytics } from "@/lib/analytics";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import TestimonialsSection from "@/components/TestimonialsSection";
import LastDrawResultsEn from "@/components/LastDrawResultsEn";
import AnbelAIAssistantEn from "@/components/ai/AnbelAIAssistantEn";
import AIBannerEn from "@/components/ai/AIBannerEn";
import { Wifi, Clock, Brain, Target } from "lucide-react";
import AnbelAIChat from "@/components/AnbelAIChat";

interface Prediction {
  id: string;
  numbers: number[];
  confidence: number;
  specialBall: number | null;
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

export default function DashboardClient() {
  const analytics = useAnalytics();
  const [activeTab, setActiveTab] = useState('loterias');
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isLive, setIsLive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const BYPASS_PAYWALL = process.env.NEXT_PUBLIC_BYPASS_PAYWALL === 'true';
  const [forceActive, setForceActive] = useState(false);
  const [selectedLottery, setSelectedLottery] = useState<Lottery | null>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isAIMinimized, setIsAIMinimized] = useState(false);
  const [isAIBannerVisible, setIsAIBannerVisible] = useState(true);

  const { isAuthenticated, user, logout, clearAll } = useAuthAdmin();
  const router = useRouter();

  // Magic link: /dashboard?pass=ok → creates active local session (basic 30 days)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const pass = urlParams.get('pass');
      
      if (pass === 'ok') {
        // Create a basic active session for 30 days
        const basicUser = {
          id: 'demo-user',
          name: 'Demo User',
          email: 'demo@ganafacil.com',
          activated: true,
          planId: 'gratis',
          status: 'active',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        localStorage.setItem('ganaFacilUser', JSON.stringify(basicUser));
        localStorage.setItem('ganafacil_activated', 'true');
        
        // Clean URL
        window.history.replaceState({}, document.title, '/dashboard-en');
        
        // Reload to apply changes
        window.location.reload();
      }
    } catch (error) {
      console.error('Error processing magic link:', error);
    }
  }, []);

  // Check authentication and activation status
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('ganaFacilUser');
        const isActivated = localStorage.getItem('ganafacil_activated') === 'true';
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          // Allow access to dashboard
          return;
        }
        
        if (!savedUser && !isActivated) {
          router.push('/activate');
          return;
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.push('/activate');
      }
    };

    checkAuth();
  }, []); // Empty dependency array to run only once

  // Check if user is activated
  useEffect(() => {
    const checkActivation = () => {
      try {
        const savedUser = localStorage.getItem('ganaFacilUser');
        const isActivated = localStorage.getItem('ganafacil_activated') === 'true';
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          if (userData.status === 'active' || userData.activated || isActivated || BYPASS_PAYWALL || forceActive) {
            // User is active, allow access
            return;
          }
        }
        
        // If not activated, redirect to activation
        if (!isActivated && !BYPASS_PAYWALL && !forceActive) {
          router.push('/activate');
        }
      } catch (error) {
        console.error('Error checking activation:', error);
        router.push('/activate');
      }
    };

    checkActivation();
  }, [router, BYPASS_PAYWALL, forceActive]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate live status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(Math.random() > 0.1); // 90% chance of being live
      setLastUpdate(new Date().toISOString());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock lottery data with complete functionality
  useEffect(() => {
    const now = new Date();
    const mockLotteries: Lottery[] = [
      {
        id: 'powerball',
        name: 'Powerball',
        country: '🇺🇸 United States',
        countryCode: 'US',
        drawDays: ['Monday', 'Wednesday', 'Saturday'],
        jackpot: '$20M - $2.000M USD',
        nextDraw: '2025-01-15T22:59:00Z',
        predictions: [
          {
            id: 'powerball-1',
            numbers: [3, 11, 19, 27, 35],
            confidence: 96.2,
            specialBall: 8,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'powerball-2',
            numbers: [5, 13, 21, 29, 37],
            confidence: 93.8,
            specialBall: 22,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
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
        totalNumbers: 69,
        specialBallNumbers: 1,
        drawTime: '22:59',
        timezone: 'America/New_York'
      },
      {
        id: 'mega-millions',
        name: 'Mega Millions',
        country: '🇺🇸 United States',
        countryCode: 'US',
        drawDays: ['Tuesday', 'Friday'],
        jackpot: '$20M - $1.600M USD',
        nextDraw: '2025-01-17T23:00:00Z',
        predictions: [
          {
            id: 'mega-1',
            numbers: [7, 15, 23, 31, 42],
            confidence: 94.5,
            specialBall: 12,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'mega-2',
            numbers: [2, 9, 16, 24, 33],
            confidence: 91.3,
            specialBall: 5,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 94.5,
        lastWin: '2025-01-07',
        winAmount: '$1.2M USD',
        logo: '/logos/megamillions.png',
        specialBallName: 'Mega Ball',
        specialBallRange: 25,
        totalNumbers: 70,
        specialBallNumbers: 1,
        drawTime: '23:00',
        timezone: 'America/New_York'
      },
      {
        id: 'lotto-america',
        name: 'Lotto America',
        country: '🇺🇸 United States',
        countryCode: 'US',
        drawDays: ['Wednesday', 'Saturday'],
        jackpot: '$2M - $20M USD',
        nextDraw: '2025-01-15T22:00:00Z',
        predictions: [
          {
            id: 'lotto-america-1',
            numbers: [4, 12, 20, 28, 36],
            confidence: 92.5,
            specialBall: 7,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'lotto-america-2',
            numbers: [8, 16, 24, 32, 40],
            confidence: 89.3,
            specialBall: 3,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
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
        totalNumbers: 52,
        specialBallNumbers: 1,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'euromillions',
        name: 'EuroMillions',
        country: '🇪🇺 Europe',
        countryCode: 'EU',
        drawDays: ['Tuesday', 'Friday'],
        jackpot: '€20M - €250M EUR',
        nextDraw: '2025-01-16T20:45:00Z',
        predictions: [
          {
            id: 'euro-1',
            numbers: [1, 8, 14, 22, 30],
            confidence: 92.7,
            specialBall: 6,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'euro-2',
            numbers: [4, 12, 18, 26, 34],
            confidence: 89.1,
            specialBall: 9,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 92.7,
        lastWin: '2025-01-09',
        winAmount: '€2.1M EUR',
        logo: '/logos/euromillions.png',
        specialBallName: 'Lucky Stars',
        specialBallRange: 12,
        totalNumbers: 50,
        specialBallNumbers: 2,
        drawTime: '20:45',
        timezone: 'Europe/Paris'
      },
      {
        id: 'cash4life',
        name: 'Cash4Life',
        country: '🇺🇸 United States',
        countryCode: 'US',
        drawDays: ['Monday', 'Wednesday', 'Friday'],
        nextDraw: '2025-01-15T21:00:00Z',
        jackpot: '$1,000 daily for life',
        predictions: [
          {
            id: 'cash4life-1',
            numbers: [7, 15, 23, 31, 39],
            confidence: 91.7,
            specialBall: 2,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'cash4life-2',
            numbers: [3, 11, 19, 27, 35],
            confidence: 88.4,
            specialBall: 1,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 91.7,
        lastWin: '2025-01-08',
        winAmount: '$1,000 daily',
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
        country: '🇺🇸 United States',
        countryCode: 'US',
        drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        nextDraw: '2025-01-15T22:00:00Z',
        jackpot: '$500 USD',
        predictions: [
          {
            id: 'pick3-1',
            numbers: [3, 7, 9],
            confidence: 94.2,
            specialBall: null,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'pick3-2',
            numbers: [1, 5, 8],
            confidence: 89.6,
            specialBall: null,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 94.2,
        lastWin: '2025-01-20',
        winAmount: '$500 USD',
        logo: '/logos/pick3.png',
        specialBallName: null,
        specialBallRange: 0,
        totalNumbers: 3,
        specialBallNumbers: 0,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'pick4',
        name: 'Pick 4',
        country: '🇺🇸 United States',
        countryCode: 'US',
        drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        nextDraw: '2025-01-15T22:00:00Z',
        jackpot: '$5,000 USD',
        predictions: [
          {
            id: 'pick4-1',
            numbers: [2, 4, 6, 8],
            confidence: 92.8,
            specialBall: null,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'pick4-2',
            numbers: [1, 3, 7, 9],
            confidence: 87.3,
            specialBall: null,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 92.8,
        lastWin: '2025-01-20',
        winAmount: '$5,000 USD',
        logo: '/logos/pick4.png',
        specialBallName: null,
        specialBallRange: 0,
        totalNumbers: 4,
        specialBallNumbers: 0,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'pick5',
        name: 'Pick 5',
        country: '🇺🇸 United States',
        countryCode: 'US',
        drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        nextDraw: '2025-01-15T22:00:00Z',
        jackpot: '$50,000 USD',
        predictions: [
          {
            id: 'pick5-1',
            numbers: [1, 3, 5, 7, 9],
            confidence: 90.5,
            specialBall: null,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'pick5-2',
            numbers: [2, 4, 6, 8, 0],
            confidence: 85.7,
            specialBall: null,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 90.5,
        lastWin: '2025-01-20',
        winAmount: '$50,000 USD',
        logo: '/logos/pick5.png',
        specialBallName: null,
        specialBallRange: 0,
        totalNumbers: 5,
        specialBallNumbers: 0,
        drawTime: '22:00',
        timezone: 'America/New_York'
      },
      {
        id: 'pick6',
        name: 'Pick 6',
        country: '🇺🇸 United States',
        countryCode: 'US',
        drawDays: ['Monday', 'Wednesday', 'Friday'],
        nextDraw: '2025-01-15T22:00:00Z',
        jackpot: '$1M - $10M USD',
        predictions: [
          {
            id: 'pick6-1',
            numbers: [5, 12, 18, 25, 31, 42],
            confidence: 93.1,
            specialBall: null,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          },
          {
            id: 'pick6-2',
            numbers: [3, 9, 15, 22, 28, 35],
            confidence: 88.9,
            specialBall: null,
            analysisStatus: 'completed',
            createdAt: now.toISOString(),
            analysisMethods: ['Anbel', 'Fibonacci', 'Statistical'],
            lastUpdated: now.toISOString(),
            nextUpdate: new Date(now.getTime() + 3600000).toISOString()
          }
        ],
        confidence: 93.1,
        lastWin: '2025-01-17',
        winAmount: '$1.2M USD',
        logo: '/logos/pick6.png',
        specialBallName: null,
        specialBallRange: 0,
        totalNumbers: 6,
        specialBallNumbers: 0,
        drawTime: '22:00',
        timezone: 'America/New_York'
      }
    ];

    setLotteries(mockLotteries);
    setIsLoading(false);
  }, []);

  // Check if user needs to pay
  const needsPayment = () => {
    try {
      const savedUser = localStorage.getItem('ganaFacilUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        return userData.status !== 'active' && !userData.activated;
      }
      return true;
    } catch (error) {
      return true;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // Show paywall if user needs to pay
  if (needsPayment() && !BYPASS_PAYWALL && !forceActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-gray-800/70 border border-gray-700 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gold mb-3">Access Pending</h1>
          <p className="text-gray-300 mb-6">Your account is not yet active. Complete payment to access the dashboard.</p>
          <a href="https://wa.me/19295909116?text=Quiero%20activar%20mi%20acceso%20a%20GanaF%C3%A1cil" target="_blank" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg mb-3">💬 Pay via WhatsApp</a>
          <div className="text-sm text-gray-400">If you already paid, wait for confirmation or try again in a few minutes.</div>
        </div>
      </div>
    );
  }

  const openAnalysisModal = (lottery: Lottery) => {
    setSelectedLottery(lottery);
    setShowAnalysisModal(true);
  };

  const closeAnalysisModal = () => {
    setSelectedLottery(null);
    setShowAnalysisModal(false);
  };

  // Función para actualizar datos en tiempo real
  const updateRealTimeData = async () => {
    try {
      setIsLive(true);
      
      // Mostrar indicador de carga
      setLastUpdate('Updating...');
      
      // Simular delay de actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar fechas de próximos sorteos en tiempo real
      setLotteries(prev => prev.map(lottery => ({
        ...lottery,
        nextDraw: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        // Generar nuevos números de predicción
        predictions: lottery.predictions.map(pred => ({
          ...pred,
          numbers: generateRandomNumbers(lottery.totalNumbers, 5),
          specialBall: lottery.specialBallNumbers === 2 ? 
            [Math.floor(Math.random() * lottery.specialBallRange) + 1, Math.floor(Math.random() * lottery.specialBallRange) + 1] :
            Math.floor(Math.random() * lottery.specialBallRange) + 1,
          confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
          lastUpdated: new Date().toISOString()
        }))
      })));

      setLastUpdate(new Date().toISOString());
      console.log('🔄 Data updated in real-time:', new Date().toLocaleTimeString());
      
      // Mostrar notificación de éxito
      alert('✅ Data updated successfully');
    } catch (error: any) {
      console.error('❌ Error updating real-time data:', error);
      setIsLive(false);
      setLastUpdate('Update error');
      alert('❌ Error updating data');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* AI Banner */}
      <AIBannerEn 
        onOpenAI={() => setIsAIAssistantOpen(true)}
        isVisible={isAIBannerVisible}
        onClose={() => setIsAIBannerVisible(false)}
      />
      
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and status */}
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gold">🎯 Easy Win Dashboard</h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-400 hidden sm:block">
                  {isLive ? 'ONLINE' : 'OFFLINE'}
                </span>
              </div>
              <div className="text-xs text-gray-400 hidden sm:block">
                <span className="block">Last update:</span>
                <span className="text-gold">
                  {lastUpdate ? new Date(lastUpdate).toLocaleTimeString('en-US') : 'Loading...'}
                </span>
              </div>
            </div>
            
            {/* Second row: User and main buttons PROTECTED */}
            <div className="flex flex-row items-center justify-between space-x-2">
              {/* User information PROTECTED */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300 bg-gray-700 px-2 py-1 rounded-lg blur-sm select-none">
                  👤 User
                </span>
              </div>
              
              {/* Main tabs */}
              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                {/* Anbel AI Agent Button - The Brain */}
                <a
                  href="/anbel-ai-en"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg border-2 border-purple-400"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">🧠 ANBEL AI AGENT</span>
                  <span className="sm:hidden">🧠</span>
                </a>
                
                {/* Predictions Button */}
                <a
                  href="/predictions-en"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:from-yellow-400 hover:to-gold transition-all duration-300 flex items-center space-x-2 shadow-lg border-2 border-yellow-300"
                >
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">🎯 PREDICTIONS</span>
                  <span className="sm:hidden">🎯</span>
                </a>
                <button
                  onClick={() => setActiveTab('loterias')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'loterias'
                      ? 'bg-gold text-black'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  🎯 Lotteries
                </button>
                <button
                  onClick={() => setActiveTab('last-draw')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'last-draw'
                      ? 'bg-gold text-black'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  🏆 Last Draw
                </button>
                
                {/* Featured Predictions Button */}
                <a
                  href="/predictions-en"
                  className="bg-gradient-to-r from-gold to-yellow-400 text-black px-3 py-2 rounded-lg font-bold hover:from-yellow-400 hover:to-gold transition-all duration-300 flex items-center space-x-2 shadow-lg border-2 border-yellow-300 text-sm"
                >
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">🎯 PREDICTIONS</span>
                  <span className="sm:hidden">🎯</span>
                </a>
                
                {/* Real Time Button */}
                <a
                  href="/dashboard-en/real-time"
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg text-sm"
                >
                  <Wifi className="w-4 h-4" />
                  <span className="hidden sm:inline">Real Time</span>
                  <span className="sm:hidden">Live</span>
                </a>
                
                <a
                  href="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors text-sm px-2 py-1 rounded"
                >
                  🇪🇸 Spanish
                </a>
                <a
                  href="/sales-en"
                  className="bg-green-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                  title="View Sales Page"
                >
                  💰 Sales
                </a>
                <button
                  onClick={() => {
                    try {
                      logout();
                    } catch (error) {
                      console.error('Logout error:', error);
                    }
                  }}
                  className="bg-red-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-xs font-medium"
                  title="Close Session"
                >
                  🚪 Close
                </button>
                
                <button
                  onClick={() => setIsAIAssistantOpen(true)}
                  className="bg-purple-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium mr-2"
                  title="Open ANBEL AI Assistant"
                >
                  🤖 ANBEL AI
                </button>
                <button
                  onClick={() => {
                    try {
                      updateRealTimeData();
                    } catch (error) {
                      console.error('Update error:', error);
                    }
                  }}
                  className="bg-green-600 text-white px-2 sm:px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                  title="Update Real-time Data"
                >
                  ⚡ Update
                </button>
                
                {/* Simplified buttons - only important ones */}
                <a
                  href="/admin"
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  title="Admin Panel"
                >
                  👑 Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 mb-8 border border-purple-500/30">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gold mb-4">🎯 Easy Win Dashboard</h1>
            <p className="text-gray-300 text-lg mb-6">
              Advanced lottery prediction system with real-time analysis
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">🎯 Predictions</span>
                <span className="text-gray-300 ml-2">Real-time analysis</span>
              </div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">📊 Results</span>
                <span className="text-gray-300 ml-2">Historical data</span>
              </div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">📈 Historical</span>
                <span className="text-gray-300 ml-2">Pattern analysis</span>
              </div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">⚙️ Engine</span>
                <span className="text-gray-300 ml-2">AI algorithms</span>
              </div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">🔔 Notifications</span>
                <span className="text-gray-300 ml-2">Real-time alerts</span>
              </div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">💳 Plans</span>
                <span className="text-gray-300 ml-2">Subscription options</span>
              </div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-gold font-semibold">🏆 Testimonials</span>
                <span className="text-gray-300 ml-2">Success stories</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'loterias' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gold mb-4">🎯 Lottery Predictions</h2>
              <p className="text-gray-300 text-lg">
                Real-time analysis of the world's major lotteries
              </p>
            </div>

            {/* Lottery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Powerball</h3>
                      <p className="text-gray-400 text-sm">United States</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$22M</div>
                    <div className="text-gray-400 text-sm">Jackpot</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Next Draw</span>
                    <span className="text-white font-medium">Jan 15, 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-green-400 font-medium">94.2%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Numbers</h4>
                  <div className="flex flex-wrap gap-2">
                    {[7, 15, 23, 31, 42, 12].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal(lotteries[0])}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  View Complete Analysis
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
                      <p className="text-gray-400 text-sm">United States</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$18M</div>
                    <div className="text-gray-400 text-sm">Jackpot</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Next Draw</span>
                    <span className="text-white font-medium">Jan 17, 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-green-400 font-medium">91.8%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Numbers</h4>
                  <div className="flex flex-wrap gap-2">
                    {[3, 11, 19, 27, 35, 8].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal(lotteries[2])}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  View Complete Analysis
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
                      <p className="text-gray-400 text-sm">Europe</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">€45M</div>
                    <div className="text-gray-400 text-sm">Jackpot</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Next Draw</span>
                    <span className="text-white font-medium">Jan 16, 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-green-400 font-medium">89.5%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Numbers</h4>
                  <div className="flex flex-wrap gap-2">
                    {[2, 9, 16, 24, 33, 5].map((number, index) => (
                      <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                        {number}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => openAnalysisModal(lotteries[1])}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  View Complete Analysis
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
                      <p className="text-gray-400 text-sm">United States</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$1K/day</div>
                    <div className="text-gray-400 text-sm">For Life</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Next Draw</span>
                    <span className="text-white font-medium">Jan 15, 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-green-400 font-medium">91.7%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Numbers</h4>
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
                    country: '🇺🇸 United States',
                    countryCode: 'US',
                    drawDays: ['Monday', 'Wednesday', 'Friday'],
                    jackpot: '$1,000 daily for life',
                    nextDraw: '2025-01-15T21:00:00Z',
                    predictions: [],
                    confidence: 91.7,
                    lastWin: '2025-01-08',
                    winAmount: '$1,000 daily',
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
                  View Complete Analysis
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
                      <p className="text-gray-400 text-sm">United States</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$500</div>
                    <div className="text-gray-400 text-sm">Daily</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Next Draw</span>
                    <span className="text-white font-medium">Today 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-green-400 font-medium">94.2%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Numbers</h4>
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
                    country: '🇺🇸 United States',
                    countryCode: 'US',
                    drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    jackpot: '$500 USD',
                    nextDraw: '2025-01-15T22:00:00Z',
                    predictions: [],
                    confidence: 94.2,
                    lastWin: '2025-01-20',
                    winAmount: '$500 USD',
                    logo: '/logos/pick3.png',
                    specialBallName: null,
                    specialBallRange: 0,
                    totalNumbers: 3,
                    specialBallNumbers: 0,
                    drawTime: '22:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  View Complete Analysis
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
                      <p className="text-gray-400 text-sm">United States</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$5K</div>
                    <div className="text-gray-400 text-sm">Daily</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Next Draw</span>
                    <span className="text-white font-medium">Today 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-green-400 font-medium">92.8%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Numbers</h4>
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
                    country: '🇺🇸 United States',
                    countryCode: 'US',
                    drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    jackpot: '$5,000 USD',
                    nextDraw: '2025-01-15T22:00:00Z',
                    predictions: [],
                    confidence: 92.8,
                    lastWin: '2025-01-20',
                    winAmount: '$5,000 USD',
                    logo: '/logos/pick4.png',
                    specialBallName: null,
                    specialBallRange: 0,
                    totalNumbers: 4,
                    specialBallNumbers: 0,
                    drawTime: '22:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  View Complete Analysis
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
                      <p className="text-gray-400 text-sm">United States</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$50K</div>
                    <div className="text-gray-400 text-sm">Daily</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Next Draw</span>
                    <span className="text-white font-medium">Today 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-green-400 font-medium">90.5%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Numbers</h4>
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
                    country: '🇺🇸 United States',
                    countryCode: 'US',
                    drawDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    jackpot: '$50,000 USD',
                    nextDraw: '2025-01-15T22:00:00Z',
                    predictions: [],
                    confidence: 90.5,
                    lastWin: '2025-01-20',
                    winAmount: '$50,000 USD',
                    logo: '/logos/pick5.png',
                    specialBallName: null,
                    specialBallRange: 0,
                    totalNumbers: 5,
                    specialBallNumbers: 0,
                    drawTime: '22:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  View Complete Analysis
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
                      <p className="text-gray-400 text-sm">United States</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold">$1.2M</div>
                    <div className="text-gray-400 text-sm">3x Week</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Next Draw</span>
                    <span className="text-white font-medium">Jan 15, 2025</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Confidence</span>
                    <span className="text-green-400 font-medium">93.1%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Numbers</h4>
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
                    country: '🇺🇸 United States',
                    countryCode: 'US',
                    drawDays: ['Monday', 'Wednesday', 'Friday'],
                    jackpot: '$1M - $10M USD',
                    nextDraw: '2025-01-15T22:00:00Z',
                    predictions: [],
                    confidence: 93.1,
                    lastWin: '2025-01-17',
                    winAmount: '$1.2M USD',
                    logo: '/logos/pick6.png',
                    specialBallName: null,
                    specialBallRange: 0,
                    totalNumbers: 6,
                    specialBallNumbers: 0,
                    drawTime: '22:00',
                    timezone: 'America/New_York'
                  })}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  View Complete Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Last Draw Tab */}
        {activeTab === 'last-draw' && (
          <div>
            <LastDrawResultsEn />
          </div>
        )}

      </main>

      {/* Analysis Modal */}
      {showAnalysisModal && selectedLottery && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {selectedLottery.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedLottery.name}</h2>
                    <p className="text-gray-400">{selectedLottery.country}</p>
                  </div>
                </div>
                <button
                  onClick={closeAnalysisModal}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Lottery Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gold mb-3">Lottery Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Country:</span>
                      <span className="text-white">{selectedLottery.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Draw Days:</span>
                      <span className="text-white">{selectedLottery.drawDays.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Draw Time:</span>
                      <span className="text-white">{selectedLottery.drawTime} ({selectedLottery.timezone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Number Range:</span>
                      <span className="text-white">1-{selectedLottery.totalNumbers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Special Ball:</span>
                      <span className="text-white">{selectedLottery.specialBallName} (1-{selectedLottery.specialBallRange})</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gold mb-3">Next Draw</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white">
                        {new Date(selectedLottery.nextDraw).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white">
                        {new Date(selectedLottery.nextDraw).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Jackpot:</span>
                      <span className="text-gold font-bold text-lg">{selectedLottery.jackpot}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prediction Analysis */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gold mb-3">Prediction Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold mb-1">{selectedLottery.confidence}%</div>
                    <div className="text-gray-400 text-sm">Overall Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">Anbel</div>
                    <div className="text-gray-400 text-sm">Primary Method</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-1">Fibonacci</div>
                    <div className="text-gray-400 text-sm">Secondary Method</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Analysis Methods Used:</div>
                  <div className="flex flex-wrap gap-2">
                    {['Anbel', 'Fibonacci', 'Statistical'].map((method, index) => (
                      <span key={index} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Numbers */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gold mb-3">Recommended Numbers</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Main Combination</div>
                    <div className="flex flex-wrap gap-2">
                      {[7, 15, 23, 31, 42].map((number, index) => (
                        <div key={index} className="w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {number}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Alternative Combination</div>
                    <div className="flex flex-wrap gap-2">
                      {[2, 9, 16, 24, 33].map((number, index) => (
                        <div key={index} className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {number}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">{selectedLottery.specialBallName}</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedLottery.specialBallNumbers === 2 ? (
                        <>
                          <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                            4
                          </div>
                          <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                            9
                          </div>
                        </>
                      ) : (
                        <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          12
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Draw Results */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gold mb-3">🏆 Last Draw</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Winning Numbers</div>
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
                      Draw from {new Date().toLocaleDateString('en-US')}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-600/50 rounded-lg p-3">
                      <div className="text-gold font-bold text-lg">0</div>
                      <div className="text-gray-400 text-sm">5 Numbers</div>
                      <div className="text-gold text-xs">$25M</div>
                    </div>
                    <div className="bg-gray-600/50 rounded-lg p-3">
                      <div className="text-blue-400 font-bold text-lg">12</div>
                      <div className="text-gray-400 text-sm">4 Numbers</div>
                      <div className="text-blue-400 text-xs">$50K</div>
                    </div>
                    <div className="bg-gray-600/50 rounded-lg p-3">
                      <div className="text-green-400 font-bold text-lg">847</div>
                      <div className="text-gray-400 text-sm">3 Numbers</div>
                      <div className="text-green-400 text-xs">$100</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison with Our Predictions */}
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gold mb-3">🎯 Comparison with Our Predictions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-3">
                    <div>
                      <div className="text-white font-semibold">Numbers Matched</div>
                      <div className="text-gray-400 text-sm">3 of 5 main numbers</div>
                    </div>
                    <div className="text-gold font-bold text-lg">3/5</div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-3">
                    <div>
                      <div className="text-white font-semibold">Special Ball</div>
                      <div className="text-gray-400 text-sm">Prediction: 12, Result: 15</div>
                    </div>
                    <div className="text-yellow-400 font-bold text-lg">Close</div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-3">
                    <div>
                      <div className="text-white font-semibold">Overall Accuracy</div>
                      <div className="text-gray-400 text-sm">Based on last draw</div>
                    </div>
                    <div className="text-green-400 font-bold text-lg">85%</div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-600/50 rounded-lg p-3">
                    <div>
                      <div className="text-white font-semibold">Estimated Prize</div>
                      <div className="text-gray-400 text-sm">With our numbers</div>
                    </div>
                    <div className="text-gold font-bold text-lg">$500</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gold mb-3">Recommendations</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>Use the main combination for maximum winning potential</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>Consider the alternative combination for better coverage</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>Play consistently to increase your chances over time</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-gold">•</span>
                    <span>Join ANBEL clubs for team-based predictions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANBEL AI Assistant */}
      <AnbelAIAssistantEn
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
      
      {/* Anbel AI Agent Chat - The Brain */}
      <AnbelAIChat
        userId="dashboard-user-en"
        language="en"
        onPredictionGenerated={(prediction) => {
          console.log('Prediction generated from dashboard:', prediction);
        }}
        onAnalysisGenerated={(analysis) => {
          console.log('Analysis generated from dashboard:', analysis);
        }}
      />
    </div>
  );
}