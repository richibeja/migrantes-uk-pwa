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
];

// Función para obtener configuración de lotería por ID
export const getLotteryConfig = (id: string): LotteryConfig | undefined => {
  return LOTTERY_CONFIGS.find(lottery => lottery.id === id);
};

// Función para obtener todas las configuraciones
export const getAllLotteryConfigs = (): LotteryConfig[] => {
  return LOTTERY_CONFIGS;
};
