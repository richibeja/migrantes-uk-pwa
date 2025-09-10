'use client';

import { useState, useEffect } from 'react';

interface LotteryResult {
  id: string;
  name: string;
  lastDrawDate: string;
  numbers: number[];
  specialBall?: number | number[];
  jackpot: string;
  nextDrawDate: string;
  winners: {
    match5: number;
    match4: number;
    match3: number;
  };
  prizes: {
    match5: string;
    match4: string;
    match3: string;
  };
}

interface UseRealLotteryResultsReturn {
  results: LotteryResult[];
  isLoading: boolean;
  lastUpdate: string;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useRealLotteryResults(): UseRealLotteryResultsReturn {
  const [results, setResults] = useState<LotteryResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Simular datos reales de loterías (en producción esto vendría de APIs reales)
  const fetchRealResults = async (): Promise<LotteryResult[]> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1500));

    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return [
      {
        id: 'powerball',
        name: 'Powerball',
        lastDrawDate: yesterday.toISOString(),
        numbers: [8, 19, 27, 34, 42],
        specialBall: 15,
        jackpot: '$25M',
        nextDrawDate: tomorrow.toISOString(),
        winners: {
          match5: 0,
          match4: 12,
          match3: 847
        },
        prizes: {
          match5: '$25,000,000',
          match4: '$50,000',
          match3: '$100'
        }
      },
      {
        id: 'mega-millions',
        name: 'Mega Millions',
        lastDrawDate: yesterday.toISOString(),
        numbers: [3, 11, 22, 29, 37],
        specialBall: 12,
        jackpot: '$22M',
        nextDrawDate: tomorrow.toISOString(),
        winners: {
          match5: 0,
          match4: 8,
          match3: 623
        },
        prizes: {
          match5: '$22,000,000',
          match4: '$10,000',
          match3: '$10'
        }
      },
      {
        id: 'euromillions',
        name: 'EuroMillions',
        lastDrawDate: yesterday.toISOString(),
        numbers: [5, 13, 21, 28, 36],
        specialBall: [4, 9],
        jackpot: '€18M',
        nextDrawDate: tomorrow.toISOString(),
        winners: {
          match5: 0,
          match4: 15,
          match3: 1205
        },
        prizes: {
          match5: '€18,000,000',
          match4: '€2,000',
          match3: '€15'
        }
      },
      {
        id: 'lotto-america',
        name: 'Lotto America',
        lastDrawDate: yesterday.toISOString(),
        numbers: [4, 12, 20, 28, 36],
        specialBall: 7,
        jackpot: '$2.2M',
        nextDrawDate: tomorrow.toISOString(),
        winners: {
          match5: 0,
          match4: 3,
          match3: 156
        },
        prizes: {
          match5: '$2,200,000',
          match4: '$1,000',
          match3: '$5'
        }
      },
      {
        id: 'cash4life',
        name: 'Cash4Life',
        lastDrawDate: yesterday.toISOString(),
        numbers: [7, 15, 23, 31, 39],
        specialBall: 2,
        jackpot: '$1,000 daily for life',
        nextDrawDate: tomorrow.toISOString(),
        winners: {
          match5: 0,
          match4: 3,
          match3: 28
        },
        prizes: {
          match5: '$1,000 daily',
          match4: '$2,500',
          match3: '$20'
        }
      },
      {
        id: 'pick3',
        name: 'Pick 3',
        lastDrawDate: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
        numbers: [3, 7, 9],
        specialBall: null,
        jackpot: '$500',
        nextDrawDate: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
        winners: {
          match5: 0,
          match4: 0,
          match3: 12
        },
        prizes: {
          match5: '$500',
          match4: '$250',
          match3: '$500'
        }
      },
      {
        id: 'pick4',
        name: 'Pick 4',
        lastDrawDate: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
        numbers: [2, 4, 6, 8],
        specialBall: null,
        jackpot: '$5,000',
        nextDrawDate: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
        winners: {
          match5: 0,
          match4: 0,
          match3: 8
        },
        prizes: {
          match5: '$5,000',
          match4: '$2,500',
          match3: '$5,000'
        }
      },
      {
        id: 'pick5',
        name: 'Pick 5',
        lastDrawDate: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
        numbers: [1, 3, 5, 7, 9],
        specialBall: null,
        jackpot: '$50,000',
        nextDrawDate: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
        winners: {
          match5: 0,
          match4: 0,
          match3: 4
        },
        prizes: {
          match5: '$50,000',
          match4: '$25,000',
          match3: '$50,000'
        }
      },
      {
        id: 'pick6',
        name: 'Pick 6',
        lastDrawDate: yesterday.toISOString(),
        numbers: [5, 12, 18, 25, 31, 42],
        specialBall: null,
        jackpot: '$1.2M',
        nextDrawDate: tomorrow.toISOString(),
        winners: {
          match5: 0,
          match4: 2,
          match3: 18
        },
        prizes: {
          match5: '$1,200,000',
          match4: '$100,000',
          match3: '$1,000'
        }
      }
    ];
  };

  const refresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const realResults = await fetchRealResults();
      setResults(realResults);
      setLastUpdate(new Date().toISOString());
    } catch (err) {
      setError('Error obteniendo resultados');
      console.error('Error fetching real results:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    
    // Actualizar cada 5 minutos
    const interval = setInterval(refresh, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    results,
    isLoading,
    lastUpdate,
    error,
    refresh
  };
}
