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
    id: 'baloto',
    name: 'Baloto',
    country: '🇨🇴 Colombia',
    countryCode: 'CO',
    drawDays: 'Lunes, Miércoles y Sábados',
    jackpot: '$2.000M - $50.000M COP',
    nextDraw: '2025-01-15T20:00:00',
    specialBallName: 'Super Balota',
    specialBallRange: 16,
    totalNumbers: 5,
    specialBallNumbers: 1,
    numberRange: 43,
    description: 'Lotería oficial de Colombia con jackpots multimillonarios',
    officialWebsite: 'https://www.baloto.com'
  },
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
    id: 'euromillions',
    name: 'EuroMillions',
    country: '🇪🇺 Europa',
    countryCode: 'EU',
    drawDays: 'Martes y Viernes',
    jackpot: '€17M - €240M EUR',
    nextDraw: '2025-01-17T20:45:00',
    specialBallName: 'Lucky Stars',
    specialBallRange: 12,
    totalNumbers: 5,
    specialBallNumbers: 2,
    numberRange: 50,
    description: 'Lotería paneuropea con jackpots multimillonarios',
    officialWebsite: 'https://www.euromillions.com'
  },
  {
    id: 'uk-national',
    name: 'UK National Lottery',
    country: '🇬🇧 Reino Unido',
    countryCode: 'GB',
    drawDays: 'Miércoles y Sábados',
    jackpot: '£2M - £20M GBP',
    nextDraw: '2025-01-18T20:30:00',
    specialBallName: 'Bonus Ball',
    specialBallRange: 59,
    totalNumbers: 6,
    specialBallNumbers: 1,
    numberRange: 59,
    description: 'Lotería nacional del Reino Unido',
    officialWebsite: 'https://www.national-lottery.co.uk'
  },
  {
    id: 'el-gordo',
    name: 'El Gordo de la Primitiva',
    country: '🇪🇸 España',
    countryCode: 'ES',
    drawDays: 'Jueves y Sábados',
    jackpot: '€5M - €50M EUR',
    nextDraw: '2025-01-16T21:30:00',
    specialBallName: 'Complementario',
    specialBallRange: 49,
    totalNumbers: 6,
    specialBallNumbers: 1,
    numberRange: 49,
    description: 'Lotería tradicional española',
    officialWebsite: 'https://www.loteriasyapuestas.es'
  },
  {
    id: 'lotto-6-49',
    name: 'Lotto 6/49',
    country: '🇨🇦 Canadá',
    countryCode: 'CA',
    drawDays: 'Miércoles y Sábados',
    jackpot: '$5M - $64M CAD',
    nextDraw: '2025-01-18T22:00:00',
    specialBallName: 'Bonus Number',
    specialBallRange: 49,
    totalNumbers: 6,
    specialBallNumbers: 1,
    numberRange: 49,
    description: 'Lotería nacional de Canadá',
    officialWebsite: 'https://www.lotto649.ca'
  },
  {
    id: 'mega-sena',
    name: 'Mega-Sena',
    country: '🇧🇷 Brasil',
    countryCode: 'BR',
    drawDays: 'Lunes, Miércoles y Sábados',
    jackpot: 'R$5M - R$300M BRL',
    nextDraw: '2025-01-15T20:00:00',
    specialBallName: 'Sin Balota Especial',
    specialBallRange: 0,
    totalNumbers: 6,
    specialBallNumbers: 0,
    numberRange: 60,
    description: 'Lotería más popular de Brasil',
    officialWebsite: 'https://www.loteriasonline.caixa.gov.br'
  },
  {
    id: 'loteria-nacional',
    name: 'Lotería Nacional',
    country: '🇦🇷 Argentina',
    countryCode: 'AR',
    drawDays: 'Lunes, Miércoles y Viernes',
    jackpot: '$50M - $500M ARS',
    nextDraw: '2025-01-16T21:00:00',
    specialBallName: 'Número Extra',
    specialBallRange: 99,
    totalNumbers: 6,
    specialBallNumbers: 1,
    numberRange: 99,
    description: 'Lotería oficial de Argentina',
    officialWebsite: 'https://www.loterianacional.gob.ar'
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
