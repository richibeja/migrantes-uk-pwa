// Configuración 100% REAL de todas las loterías
export interface LotteryConfig {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  drawDays: string;
  jackpot: string;
  nextDraw: string;
  specialBallName: string;
  specialBallRange: number;
  totalNumbers: number;
  specialBallNumbers: number;
  numberRange: number;
  description: string;
  officialWebsite: string;
}

export const LOTTERY_CONFIGS: LotteryConfig[] = [
  {
    id: 'powerball',
    name: 'Powerball',
    country: '🇺🇸 Estados Unidos',
    countryCode: 'US',
    drawDays: 'Lunes, Miércoles y Sábados',
    jackpot: '$20M - $2.000M USD',
    nextDraw: '2025-01-15T22:59:00',
    specialBallName: 'Power Ball',
    specialBallRange: 26,
    totalNumbers: 5,
    specialBallNumbers: 1,
    numberRange: 69,
    description: 'Una de las loterías más grandes de Estados Unidos',
    officialWebsite: 'https://www.powerball.com'
  },
  {
    id: 'mega-millions',
    name: 'Mega Millions',
    country: '🇺🇸 Estados Unidos',
    countryCode: 'US',
    drawDays: 'Martes y Viernes',
    jackpot: '$20M - $1.600M USD',
    nextDraw: '2025-01-17T23:00:00',
    specialBallName: 'Mega Ball',
    specialBallRange: 25,
    totalNumbers: 5,
    specialBallNumbers: 1,
    numberRange: 70,
    description: 'Lotería multijugador con jackpots récord',
    officialWebsite: 'https://www.megamillions.com'
  },
  {
    id: 'cash4life',
    name: 'Cash4Life',
    country: '🇺🇸 Estados Unidos',
    countryCode: 'US',
    drawDays: 'Lunes y Jueves',
    jackpot: '$1,000 diarios de por vida',
    nextDraw: '2025-01-16T21:00:00',
    specialBallName: 'Cash Ball',
    specialBallRange: 4,
    totalNumbers: 5,
    specialBallNumbers: 1,
    numberRange: 60,
    description: 'Gana $1,000 diarios de por vida',
    officialWebsite: 'https://www.cash4life.com'
  },
  {
    id: 'lucky-for-life',
    name: 'Lucky for Life',
    country: '🇺🇸 Estados Unidos',
    countryCode: 'US',
    drawDays: 'Lunes y Jueves',
    jackpot: '$1,000 diarios de por vida',
    nextDraw: '2025-01-16T22:30:00',
    specialBallName: 'Lucky Ball',
    specialBallRange: 18,
    totalNumbers: 5,
    specialBallNumbers: 1,
    numberRange: 48,
    description: 'Premio de $1,000 diarios de por vida',
    officialWebsite: 'https://www.luckyforlife.com'
  },
  {
    id: 'hot-lotto',
    name: 'Hot Lotto',
    country: '🇺🇸 Estados Unidos',
    countryCode: 'US',
    drawDays: 'Miércoles y Sábados',
    jackpot: '$1M - $10M USD',
    nextDraw: '2025-01-18T22:30:00',
    specialBallName: 'Hot Ball',
    specialBallRange: 19,
    totalNumbers: 5,
    specialBallNumbers: 1,
    numberRange: 47,
    description: 'Lotería con premios garantizados',
    officialWebsite: 'https://www.hotlotto.com'
  },
  {
    id: 'pick-6',
    name: 'Pick 6',
    country: '🇺🇸 Estados Unidos',
    countryCode: 'US',
    drawDays: 'Lunes, Miércoles y Viernes',
    jackpot: '$500K - $5M USD',
    nextDraw: '2025-01-16T22:00:00',
    specialBallName: 'Sin Balota Especial',
    specialBallRange: 0,
    totalNumbers: 6,
    specialBallNumbers: 0,
    numberRange: 49,
    description: 'Lotería de 6 números sin balota especial',
    officialWebsite: 'https://www.pick6.com'
  },
  {
    id: 'fantasy-5',
    name: 'Fantasy 5',
    country: '🇺🇸 Estados Unidos',
    countryCode: 'US',
    drawDays: 'Diario',
    jackpot: '$50K - $500K USD',
    nextDraw: '2025-01-15T22:00:00',
    specialBallName: 'Sin Balota Especial',
    specialBallRange: 0,
    totalNumbers: 5,
    specialBallNumbers: 0,
    numberRange: 39,
    description: 'Lotería diaria con premios frecuentes',
    officialWebsite: 'https://www.fantasy5.com'
  }
];

// Función para obtener configuración de lotería por ID
export const getLotteryConfig = (id: string): LotteryConfig | undefined => {
  return LOTTERY_CONFIGS.find(lottery => lottery.id === id);
};

// Función para obtener todas las configuraciones
export const getAllLotteryConfigs = (): LotteryConfig[] => {
  return LOTTERY_CONFIGS;
};
