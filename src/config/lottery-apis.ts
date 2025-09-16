// CONFIGURACIÓN DE APIs DE LOTERÍAS - PRODUCCIÓN
export const LOTTERY_APIS = {
  "POWERBALL": {
    "name": "Powerball",
    "country": "USA",
    "apiUrl": "https://data.powerball.com/api",
    "wsUrl": "wss://data.powerball.com/ws",
    "historicalUrl": "https://data.powerball.com/api/historical",
    "drawDays": [
      "Wednesday",
      "Saturday"
    ],
    "drawTime": "22:59 EST",
    "numbersRange": {
      "min": 1,
      "max": 69
    },
    "specialNumbersRange": {
      "min": 1,
      "max": 26
    },
    "specialNumberName": "Powerball",
    "jackpotStart": 20000000,
    "currency": "USD"
  },
  "MEGA_MILLIONS": {
    "name": "Mega Millions",
    "country": "USA",
    "apiUrl": "https://data.megamillions.com/api",
    "wsUrl": "wss://data.megamillions.com/ws",
    "historicalUrl": "https://data.megamillions.com/api/historical",
    "drawDays": [
      "Tuesday",
      "Friday"
    ],
    "drawTime": "23:00 EST",
    "numbersRange": {
      "min": 1,
      "max": 70
    },
    "specialNumbersRange": {
      "min": 1,
      "max": 25
    },
    "specialNumberName": "Mega Ball",
    "jackpotStart": 20000000,
    "currency": "USD"
  },
  "EURO_MILLIONS": {
    "name": "EuroMillions",
    "country": "Europe",
    "apiUrl": "https://data.euromillions.com/api",
    "wsUrl": "wss://data.euromillions.com/ws",
    "historicalUrl": "https://data.euromillions.com/api/historical",
    "drawDays": [
      "Tuesday",
      "Friday"
    ],
    "drawTime": "21:00 CET",
    "numbersRange": {
      "min": 1,
      "max": 50
    },
    "specialNumbersRange": {
      "min": 1,
      "max": 12
    },
    "specialNumberName": "Lucky Stars",
    "jackpotStart": 17000000,
    "currency": "EUR"
  },
  "BALOTO": {
    "name": "Baloto",
    "country": "Colombia",
    "apiUrl": "https://data.baloto.com/api",
    "wsUrl": "wss://data.baloto.com/ws",
    "historicalUrl": "https://data.baloto.com/api/historical",
    "drawDays": [
      "Wednesday",
      "Saturday"
    ],
    "drawTime": "21:00 COT",
    "numbersRange": {
      "min": 1,
      "max": 43
    },
    "specialNumbersRange": {
      "min": 1,
      "max": 16
    },
    "specialNumberName": "Super Balota",
    "jackpotStart": 2000000000,
    "currency": "COP"
  },
  "LOTTO_6_49": {
    "name": "Lotto 6/49",
    "country": "Canada",
    "apiUrl": "https://data.lotto649.com/api",
    "wsUrl": "wss://data.lotto649.com/ws",
    "historicalUrl": "https://data.lotto649.com/api/historical",
    "drawDays": [
      "Wednesday",
      "Saturday"
    ],
    "drawTime": "22:30 EST",
    "numbersRange": {
      "min": 1,
      "max": 49
    },
    "specialNumbersRange": {
      "min": 1,
      "max": 49
    },
    "specialNumberName": "Bonus Number",
    "jackpotStart": 5000000,
    "currency": "CAD"
  }
};

export const API_ENDPOINTS = {
  // Endpoints principales
  PREDICTIONS: '/api/predictions',
  HISTORICAL: '/api/historical',
  REAL_TIME: '/api/real-time',
  HEALTH: '/api/health',
  
  // Endpoints de loterías específicas
  POWERBALL: {
    LATEST: '/api/powerball/latest',
    HISTORICAL: '/api/powerball/historical',
    PREDICT: '/api/powerball/predict'
  },
  MEGA_MILLIONS: {
    LATEST: '/api/megamillions/latest',
    HISTORICAL: '/api/megamillions/historical',
    PREDICT: '/api/megamillions/predict'
  },
  EURO_MILLIONS: {
    LATEST: '/api/euromillions/latest',
    HISTORICAL: '/api/euromillions/historical',
    PREDICT: '/api/euromillions/predict'
  },
  BALOTO: {
    LATEST: '/api/baloto/latest',
    HISTORICAL: '/api/baloto/historical',
    PREDICT: '/api/baloto/predict'
  },
  LOTTO_6_49: {
    LATEST: '/api/lotto649/latest',
    HISTORICAL: '/api/lotto649/historical',
    PREDICT: '/api/lotto649/predict'
  }
};

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CACHE_TTL: 300000, // 5 minutos
  RATE_LIMIT: {
    WINDOW_MS: 60000, // 1 minuto
    MAX_REQUESTS: 100
  }
};
