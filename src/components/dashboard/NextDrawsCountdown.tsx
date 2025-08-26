'use client';

import { useState, useEffect } from 'react';

interface NextDraw {
  id: string;
  lotteryName: string;
  country: string;
  jackpot: string;
  nextDraw: string;
  currency: string;
  numbers: number;
  specialBall: boolean;
}

export default function NextDrawsCountdown() {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const [nextDraws] = useState<NextDraw[]>([
    {
      id: 'baloto',
      lotteryName: 'Baloto',
      country: '🇴 Colombia',
      jackpot: '$25.000M COP',
      nextDraw: '2025-01-21 21:00',
      currency: 'COP',
      numbers: 5,
      specialBall: true
    },
    {
      id: 'powerball',
      lotteryName: 'Powerball',
      country: '🇺🇸 Estados Unidos',
      jackpot: '$150M USD',
      nextDraw: '2025-01-20 22:59',
      currency: 'USD',
      numbers: 5,
      specialBall: true
    },
    {
      id: 'mega-millions',
      lotteryName: 'Mega Millions',
      country: '🇺🇸 Estados Unidos',
      jackpot: '$120M USD',
      nextDraw: '2025-01-21 23:00',
      currency: 'USD',
      numbers: 5,
      specialBall: true
    },
    {
      id: 'euromillions',
      lotteryName: 'EuroMillions',
      country: '🇪🇺 Europa',
      jackpot: '€85M EUR',
      nextDraw: '2025-01-21 20:45',
      currency: 'EUR',
      numbers: 5,
      specialBall: true
    },
    {
      id: 'uk-national',
      lotteryName: 'UK National Lottery',
      country: '🇬🇧 Reino Unido',
      jackpot: '£8M GBP',
      nextDraw: '2025-01-22 20:30',
      currency: 'GBP',
      numbers: 6,
      specialBall: false
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: string]: string } = {};
      
      nextDraws.forEach(draw => {
        const now = new Date().getTime();
        const drawTime = new Date(draw.nextDraw).getTime();
        const difference = drawTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          if (days > 0) {
            newTimeLeft[draw.id] = `${days}d ${hours}h ${minutes}m`;
          } else if (hours > 0) {
            newTimeLeft[draw.id] = `${hours}h ${minutes}m ${seconds}s`;
          } else if (minutes > 0) {
            newTimeLeft[draw.id] = `${minutes}m ${seconds}s`;
          } else {
            newTimeLeft[draw.id] = `${seconds}s`;
          }
        } else {
          newTimeLeft[draw.id] = '¡SORTEO EN CURSO!';
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [nextDraws]);

  const getUrgencyColor = (timeString: string): string => {
    if (timeString.includes('¡SORTEO EN CURSO!')) return 'text-red-500';
    if (timeString.includes('h') || timeString.includes('m')) return 'text-yellow-400';
    if (timeString.includes('d')) return 'text-green-400';
    return 'text-red-500';
  };

  const getUrgencyBg = (timeString: string): string => {
    if (timeString.includes('¡SORTEO EN CURSO!')) return 'bg-red-500/20 border-red-500/50';
    if (timeString.includes('h') || timeString.includes('m')) return 'bg-yellow-500/20 border-yellow-500/50';
    if (timeString.includes('d')) return 'bg-green-500/20 border-green-500/50';
    return 'bg-red-500/20 border-red-500/50';
  };

  const visibleDraws = isExpanded ? nextDraws : nextDraws.slice(0, 3);

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h3 className="text-2xl font-bold text-gold mb-2">
            ⏰ Próximos Sorteos
          </h3>
          <p className="text-gray-300">
            Cuenta regresiva para los próximos sorteos de loterías
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors w-full sm:w-auto"
        >
          {isExpanded ? '��️ Ver Menos' : '👁️ Ver Todas'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleDraws.map((draw) => (
          <div
            key={draw.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${getUrgencyBg(timeLeft[draw.id] || '')}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">
                  {draw.lotteryName}
                </h4>
                <p className="text-gray-300 text-sm">{draw.country}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Jackpot</div>
                <div className="text-lg font-bold text-gold">{draw.jackpot}</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-400 mb-1">Próximo Sorteo:</div>
              <div className="text-sm text-white">{draw.nextDraw}</div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-400 mb-1">Formato:</div>
              <div className="text-sm text-white">
                {draw.numbers} números
                {draw.specialBall && ' + Balota Especial'}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Tiempo Restante:</div>
              <div className={`text-2xl font-bold ${getUrgencyColor(timeLeft[draw.id] || '')}`}>
                {timeLeft[draw.id] || 'Calculando...'}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors w-full sm:w-auto">
                📊 Ver Predicciones
              </button>
              <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors w-full sm:w-auto">
                🔔 Recordatorio
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && nextDraws.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Ver {nextDraws.length - 3} sorteos más
          </button>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
        <h4 className="text-lg font-bold text-gold mb-3">📈 Estadísticas de Sorteos</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {nextDraws.filter(d => timeLeft[d.id] && !timeLeft[d.id].includes('¡SORTEO EN CURSO!')).length}
            </div>
            <div className="text-gray-300 text-sm">Próximos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {nextDraws.filter(d => timeLeft[d.id] && timeLeft[d.id].includes('¡SORTEO EN CURSO!')).length}
            </div>
            <div className="text-gray-300 text-sm">En Curso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {nextDraws.filter(d => d.specialBall).length}
            </div>
            <div className="text-gray-300 text-sm">Con Balota</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {nextDraws.filter(d => d.currency === 'USD').length}
            </div>
            <div className="text-gray-300 text-sm">Dólares</div>
          </div>
        </div>
      </div>
    </div>
  );
}