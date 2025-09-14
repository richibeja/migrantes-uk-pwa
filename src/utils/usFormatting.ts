// US Market Formatting Utilities

/**
 * Format currency for US market
 */
export function formatCurrencyUS(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format date for US market
 */
export function formatDateUS(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Format phone number for US market
 */
export function formatPhoneUS(phone: string): string {
  // Remove all non-numeric characters
  const phoneNumber = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (phoneNumber.length >= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  } else if (phoneNumber.length >= 3) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else if (phoneNumber.length > 0) {
    return `(${phoneNumber}`;
  }
  return phoneNumber;
}

/**
 * Format ZIP code for US market
 */
export function formatZIPUS(zipCode: string): string {
  // Remove all non-numeric characters except dash
  const zip = zipCode.replace(/[^\d-]/g, '');
  
  // Format as XXXXX or XXXXX-XXXX
  if (zip.length > 5 && !zip.includes('-')) {
    return `${zip.slice(0, 5)}-${zip.slice(5, 9)}`;
  }
  return zip;
}

/**
 * Validate US phone number
 */
export function validateUSPhone(phone: string): boolean {
  const usPhoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return usPhoneRegex.test(phone);
}

/**
 * Validate US ZIP code
 */
export function validateUSZIP(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
}

/**
 * Validate US age (18+ years old)
 */
export function validateUSAge(birthDate: string): boolean {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  const age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
}

/**
 * Get state restrictions for US market
 */
export const US_STATE_RESTRICTIONS = {
  'AL': { name: 'Alabama', restricted: true, reason: 'Online lottery predictions prohibited' },
  'AK': { name: 'Alaska', restricted: true, reason: 'Gambling restrictions' },
  'HI': { name: 'Hawaii', restricted: true, reason: 'No online gambling allowed' },
  'NV': { name: 'Nevada', restricted: true, reason: 'Gaming commission restrictions' },
  'UT': { name: 'Utah', restricted: true, reason: 'Gambling prohibited by state law' }
} as const;

/**
 * Check if state is restricted
 */
export function isStateRestricted(stateCode: string): boolean {
  return US_STATE_RESTRICTIONS[stateCode as keyof typeof US_STATE_RESTRICTIONS]?.restricted || false;
}

/**
 * Get all US states with restriction status
 */
export const US_STATES = [
  { code: 'AL', name: 'Alabama', restricted: true },
  { code: 'AK', name: 'Alaska', restricted: true },
  { code: 'AZ', name: 'Arizona', restricted: false },
  { code: 'AR', name: 'Arkansas', restricted: false },
  { code: 'CA', name: 'California', restricted: false },
  { code: 'CO', name: 'Colorado', restricted: false },
  { code: 'CT', name: 'Connecticut', restricted: false },
  { code: 'DE', name: 'Delaware', restricted: false },
  { code: 'FL', name: 'Florida', restricted: false },
  { code: 'GA', name: 'Georgia', restricted: false },
  { code: 'HI', name: 'Hawaii', restricted: true },
  { code: 'ID', name: 'Idaho', restricted: false },
  { code: 'IL', name: 'Illinois', restricted: false },
  { code: 'IN', name: 'Indiana', restricted: false },
  { code: 'IA', name: 'Iowa', restricted: false },
  { code: 'KS', name: 'Kansas', restricted: false },
  { code: 'KY', name: 'Kentucky', restricted: false },
  { code: 'LA', name: 'Louisiana', restricted: false },
  { code: 'ME', name: 'Maine', restricted: false },
  { code: 'MD', name: 'Maryland', restricted: false },
  { code: 'MA', name: 'Massachusetts', restricted: false },
  { code: 'MI', name: 'Michigan', restricted: false },
  { code: 'MN', name: 'Minnesota', restricted: false },
  { code: 'MS', name: 'Mississippi', restricted: false },
  { code: 'MO', name: 'Missouri', restricted: false },
  { code: 'MT', name: 'Montana', restricted: false },
  { code: 'NE', name: 'Nebraska', restricted: false },
  { code: 'NV', name: 'Nevada', restricted: true },
  { code: 'NH', name: 'New Hampshire', restricted: false },
  { code: 'NJ', name: 'New Jersey', restricted: false },
  { code: 'NM', name: 'New Mexico', restricted: false },
  { code: 'NY', name: 'New York', restricted: false },
  { code: 'NC', name: 'North Carolina', restricted: false },
  { code: 'ND', name: 'North Dakota', restricted: false },
  { code: 'OH', name: 'Ohio', restricted: false },
  { code: 'OK', name: 'Oklahoma', restricted: false },
  { code: 'OR', name: 'Oregon', restricted: false },
  { code: 'PA', name: 'Pennsylvania', restricted: false },
  { code: 'RI', name: 'Rhode Island', restricted: false },
  { code: 'SC', name: 'South Carolina', restricted: false },
  { code: 'SD', name: 'South Dakota', restricted: false },
  { code: 'TN', name: 'Tennessee', restricted: false },
  { code: 'TX', name: 'Texas', restricted: false },
  { code: 'UT', name: 'Utah', restricted: true },
  { code: 'VT', name: 'Vermont', restricted: false },
  { code: 'VA', name: 'Virginia', restricted: false },
  { code: 'WA', name: 'Washington', restricted: false },
  { code: 'WV', name: 'West Virginia', restricted: false },
  { code: 'WI', name: 'Wisconsin', restricted: false },
  { code: 'WY', name: 'Wyoming', restricted: false }
] as const;

/**
 * Format time for US market
 */
export function formatTimeUS(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York' // Eastern Time
  }).format(dateObj);
}

/**
 * Get timezone offset for US
 */
export function getUSTimezoneOffset(): string {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? '+' : '-';
  return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/**
 * Format number for US market (with commas)
 */
export function formatNumberUS(number: number): string {
  return new Intl.NumberFormat('en-US').format(number);
}

/**
 * Format percentage for US market
 */
export function formatPercentageUS(value: number, decimals: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100);
}
