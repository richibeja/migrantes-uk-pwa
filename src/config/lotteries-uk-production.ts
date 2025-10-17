// ============================================
// CONFIGURACIÓN DE LOTERÍAS - PRODUCCIÓN UK
// Solo loterías reales para mercado Reino Unido
// ============================================

export interface LotteryConfig {
  id: string;
  name: string;
  nameEs: string;
  country: string;
  region: 'UK' | 'Europe' | 'USA' | 'LATAM';
  currency: 'GBP' | 'EUR' | 'USD' | 'COP';
  enabled: boolean;
  numbersCount: number;
  minNumber: number;
  maxNumber: number;
  bonusNumbersCount: number;
  minBonusNumber: number;
  maxBonusNumber: number;
  drawDays: string[];
  drawTime: string;
  timezone: string;
  apiUrl: string | null;
  jackpotMin: number;
  jackpotMax: number;
  description: string;
  descriptionEs: string;
  officialWebsite: string;
}

// ============================================
// LOTERÍAS ACTIVAS PARA REINO UNIDO
// ============================================

export const UK_PRODUCTION_LOTTERIES: LotteryConfig[] = [
  // ============================================
  // REINO UNIDO
  // ============================================
  {
    id: 'uk-lotto',
    name: 'UK National Lottery',
    nameEs: 'Lotería Nacional UK',
    country: 'United Kingdom',
    region: 'UK',
    currency: 'GBP',
    enabled: true,
    numbersCount: 6,
    minNumber: 1,
    maxNumber: 59,
    bonusNumbersCount: 1,
    minBonusNumber: 1,
    maxBonusNumber: 59,
    drawDays: ['Wednesday', 'Saturday'],
    drawTime: '20:30',
    timezone: 'Europe/London',
    apiUrl: 'https://www.national-lottery.co.uk/results/api',
    jackpotMin: 2_000_000,
    jackpotMax: 50_000_000,
    description: 'The UK\'s official national lottery with life-changing jackpots twice a week',
    descriptionEs: 'La lotería nacional oficial del Reino Unido con premios que cambian vidas dos veces por semana',
    officialWebsite: 'https://www.national-lottery.co.uk',
  },
  {
    id: 'thunderball',
    name: 'Thunderball',
    nameEs: 'Thunderball',
    country: 'United Kingdom',
    region: 'UK',
    currency: 'GBP',
    enabled: true,
    numbersCount: 5,
    minNumber: 1,
    maxNumber: 39,
    bonusNumbersCount: 1,
    minBonusNumber: 1,
    maxBonusNumber: 14,
    drawDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    drawTime: '20:00',
    timezone: 'Europe/London',
    apiUrl: 'https://www.national-lottery.co.uk/results/thunderball/api',
    jackpotMin: 500_000,
    jackpotMax: 500_000,
    description: 'Win £500,000 top prize four times a week with Thunderball',
    descriptionEs: 'Gana £500,000 de premio mayor cuatro veces por semana con Thunderball',
    officialWebsite: 'https://www.national-lottery.co.uk/games/thunderball',
  },
  {
    id: 'set-for-life',
    name: 'Set For Life',
    nameEs: 'Set For Life',
    country: 'United Kingdom',
    region: 'UK',
    currency: 'GBP',
    enabled: true,
    numbersCount: 5,
    minNumber: 1,
    maxNumber: 47,
    bonusNumbersCount: 1,
    minBonusNumber: 1,
    maxBonusNumber: 10,
    drawDays: ['Monday', 'Thursday'],
    drawTime: '20:00',
    timezone: 'Europe/London',
    apiUrl: 'https://www.national-lottery.co.uk/results/set-for-life/api',
    jackpotMin: 3_600_000,
    jackpotMax: 3_600_000,
    description: '£10,000 every month for 30 years - be set for life!',
    descriptionEs: '£10,000 cada mes durante 30 años - ¡asegura tu vida!',
    officialWebsite: 'https://www.national-lottery.co.uk/games/set-for-life',
  },

  // ============================================
  // EUROPA (Incluye Reino Unido)
  // ============================================
  {
    id: 'euromillions',
    name: 'EuroMillions',
    nameEs: 'EuroMillones',
    country: 'Europe',
    region: 'Europe',
    currency: 'GBP',
    enabled: true,
    numbersCount: 5,
    minNumber: 1,
    maxNumber: 50,
    bonusNumbersCount: 2,
    minBonusNumber: 1,
    maxBonusNumber: 12,
    drawDays: ['Tuesday', 'Friday'],
    drawTime: '20:45',
    timezone: 'Europe/Paris',
    apiUrl: 'https://www.euro-millions.com/api/results',
    jackpotMin: 17_000_000,
    jackpotMax: 230_000_000,
    description: 'Europe\'s biggest lottery with jackpots up to £230 million',
    descriptionEs: 'La lotería más grande de Europa con premios de hasta £230 millones',
    officialWebsite: 'https://www.euro-millions.com',
  },
  {
    id: 'euromillions-hotpicks',
    name: 'EuroMillions HotPicks',
    nameEs: 'EuroMillions HotPicks',
    country: 'United Kingdom',
    region: 'Europe',
    currency: 'GBP',
    enabled: true,
    numbersCount: 5,
    minNumber: 1,
    maxNumber: 50,
    bonusNumbersCount: 0,
    minBonusNumber: 0,
    maxBonusNumber: 0,
    drawDays: ['Tuesday', 'Friday'],
    drawTime: '20:45',
    timezone: 'Europe/London',
    apiUrl: null,
    jackpotMin: 1_000_000,
    jackpotMax: 1_000_000,
    description: 'Pick and match numbers to win up to £1 million',
    descriptionEs: 'Elige y coincide números para ganar hasta £1 millón',
    officialWebsite: 'https://www.national-lottery.co.uk/games/euromillions-hotpicks',
  },

  // ============================================
  // ESTADOS UNIDOS (Disponibles para UK)
  // ============================================
  {
    id: 'powerball',
    name: 'Powerball',
    nameEs: 'Powerball',
    country: 'United States',
    region: 'USA',
    currency: 'USD',
    enabled: true,
    numbersCount: 5,
    minNumber: 1,
    maxNumber: 69,
    bonusNumbersCount: 1,
    minBonusNumber: 1,
    maxBonusNumber: 26,
    drawDays: ['Monday', 'Wednesday', 'Saturday'],
    drawTime: '22:59',
    timezone: 'America/New_York',
    apiUrl: 'https://data.ny.gov/resource/5xaw-6ayf.json',
    jackpotMin: 20_000_000,
    jackpotMax: 2_000_000_000,
    description: 'America\'s biggest lottery with record jackpots over $2 billion',
    descriptionEs: 'La lotería más grande de América con premios récord de más de $2 mil millones',
    officialWebsite: 'https://www.powerball.com',
  },
  {
    id: 'mega-millions',
    name: 'Mega Millions',
    nameEs: 'Mega Millions',
    country: 'United States',
    region: 'USA',
    currency: 'USD',
    enabled: true,
    numbersCount: 5,
    minNumber: 1,
    maxNumber: 70,
    bonusNumbersCount: 1,
    minBonusNumber: 1,
    maxBonusNumber: 25,
    drawDays: ['Tuesday', 'Friday'],
    drawTime: '23:00',
    timezone: 'America/New_York',
    apiUrl: 'https://data.ny.gov/resource/5xaw-6ayf.json',
    jackpotMin: 20_000_000,
    jackpotMax: 1_600_000_000,
    description: 'Mega jackpots twice a week with prizes reaching $1.6 billion',
    descriptionEs: 'Mega premios dos veces por semana con premios que alcanzan $1.6 mil millones',
    officialWebsite: 'https://www.megamillions.com',
  },

  // ============================================
  // LATINOAMÉRICA
  // ============================================
  {
    id: 'baloto',
    name: 'Baloto',
    nameEs: 'Baloto',
    country: 'Colombia',
    region: 'LATAM',
    currency: 'COP',
    enabled: true,
    numbersCount: 5,
    minNumber: 1,
    maxNumber: 43,
    bonusNumbersCount: 1,
    minBonusNumber: 1,
    maxBonusNumber: 16,
    drawDays: ['Wednesday', 'Saturday'],
    drawTime: '23:00',
    timezone: 'America/Bogota',
    apiUrl: 'https://www.baloto.com/api/resultados',
    jackpotMin: 4_000_000_000,
    jackpotMax: 50_000_000_000,
    description: 'Colombia\'s most popular lottery with prizes up to 50 billion COP',
    descriptionEs: 'La lotería más popular de Colombia con premios de hasta 50 mil millones de pesos',
    officialWebsite: 'https://www.baloto.com',
  },
];

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Obtiene todas las loterías habilitadas
 */
export function getEnabledLotteries(): LotteryConfig[] {
  return UK_PRODUCTION_LOTTERIES.filter(lottery => lottery.enabled);
}

/**
 * Obtiene loterías por región
 */
export function getLotteriesByRegion(region: 'UK' | 'Europe' | 'USA' | 'LATAM'): LotteryConfig[] {
  return UK_PRODUCTION_LOTTERIES.filter(
    lottery => lottery.enabled && lottery.region === region
  );
}

/**
 * Obtiene una lotería específica por ID
 */
export function getLotteryById(id: string): LotteryConfig | undefined {
  return UK_PRODUCTION_LOTTERIES.find(lottery => lottery.id === id);
}

/**
 * Obtiene loterías del Reino Unido
 */
export function getUKLotteries(): LotteryConfig[] {
  return getLotteriesByRegion('UK');
}

/**
 * Obtiene loterías de Europa
 */
export function getEuropeLotteries(): LotteryConfig[] {
  return getLotteriesByRegion('Europe');
}

/**
 * Obtiene loterías de USA
 */
export function getUSALotteries(): LotteryConfig[] {
  return getLotteriesByRegion('USA');
}

/**
 * Obtiene loterías de Latinoamérica
 */
export function getLATAMLotteries(): LotteryConfig[] {
  return getLotteriesByRegion('LATAM');
}

/**
 * Verifica si una lotería está disponible
 */
export function isLotteryAvailable(id: string): boolean {
  const lottery = getLotteryById(id);
  return lottery !== undefined && lottery.enabled;
}

/**
 * Obtiene el próximo sorteo de una lotería
 */
export function getNextDrawDate(lottery: LotteryConfig): Date {
  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = now.getDay();
  
  const drawDayNumbers = lottery.drawDays.map(day => dayNames.indexOf(day));
  const nextDrawDay = drawDayNumbers.find(day => day > today) ?? (drawDayNumbers[0] + 7);
  
  const nextDraw = new Date(now);
  nextDraw.setDate(now.getDate() + (nextDrawDay > today ? nextDrawDay - today : 7 + nextDrawDay - today));
  
  const [hours, minutes] = lottery.drawTime.split(':').map(Number);
  nextDraw.setHours(hours, minutes, 0, 0);
  
  return nextDraw;
}

/**
 * Formatea el jackpot según la moneda
 */
export function formatJackpot(amount: number, currency: 'GBP' | 'EUR' | 'USD' | 'COP'): string {
  const symbols: Record<string, string> = {
    GBP: '£',
    EUR: '€',
    USD: '$',
    COP: '$',
  };
  
  const formatted = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  
  return `${symbols[currency]}${formatted}${currency === 'COP' ? ' COP' : ''}`;
}

// ============================================
// EXPORTACIONES
// ============================================

export default UK_PRODUCTION_LOTTERIES;

// Tipos útiles
export type LotteryRegion = 'UK' | 'Europe' | 'USA' | 'LATAM';
export type LotteryCurrency = 'GBP' | 'EUR' | 'USD' | 'COP';
export type LotteryId = typeof UK_PRODUCTION_LOTTERIES[number]['id'];



