'use client';

import { useState, useEffect } from 'react';

interface JackpotLottery {
  id: string;
  name: string;
  country: string;
  currentJackpot: string;
  previousJackpot: string;
  increase: string;
  nextDraw: string;
  currency: string;
}

interface JackpotHistory {
  date: string;
  amount: string;
  change: string;
  winners: number;
}

export default function JackpotTracker() {
  const [lotteries, setLotteries] = useState<JackpotLottery[]>([
    {
      id: 'baloto',
      name: 'Baloto',
      country: '��🇴 Colombia',
      currentJackpot: '$25.000M COP',
      previousJackpot: '$20.000M COP',
      increase: '+25%',
      nextDraw: '2025-01-21 21:00',
      currency: 'COP'
    },
    {
      id: 'powerball',
      name: 'Powerball',
      country: '🇺🇸 Estados Unidos',
      currentJackpot: '$150M USD',
      previousJackpot: '$120M USD',
      increase: '+25%',
      nextDraw: '2025-01-20 22:59',
      currency: 'USD'
    },
    {
      id: 'mega-millions',
      name: 'Mega Millions',
      country: '🇺🇸 Estados Unidos',
      currentJackpot: '$120M USD',
      previousJackpot: '$100M USD',
      increase: '+20%',
      nextDraw: '2025-01-21 23:00',
      currency: 'USD'
    },
    {
      id: 'euromillions',
      name: 'EuroMillions',
      country: '🇪🇺 Europa',
      currentJackpot: '€85M EUR',
      previousJackpot: '€70M EUR',
      increase: '+21.4%',
      nextDraw: '2025-01-21 20:45',
      currency: 'EUR'
    },
    {
      id: 'uk-national',
      name: 'UK National Lottery',
      country: '🇬🇧 Reino Unido',
      currentJackpot: '£8M GBP',
      previousJackpot: '£6M GBP',
      increase: '+33.3%',
      nextDraw: '2025-01-22 20:30',
      currency: 'GBP'
    }
  ]);

  const [selectedLottery, setSelectedLottery] = useState('all');
  const [historyData, setHistoryData] = useState<JackpotHistory[]>([]);

  useEffect(() => {
    generateHistoryData();
  }, []);

  const generateHistoryData = () => {
    const history: JackpotHistory[] = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const baseAmount = Math.floor(Math.random() * 100) + 20;
      const change = Math.floor(Math.random() * 20) - 10;
      
      history.push({
        date: date.toISOString().split('T')[0],
        amount: `$${baseAmount}M`,
        change: change >= 0 ? `+$${change}M` : `-$${Math.abs(change)}M`,
        winners: Math.floor(Math.random() * 5)
      });
    }
    
    setHistoryData(history);
  };

  const filteredJackpots = selectedLottery === 'all' 
    ? lotteries 
    : lotteries.filter(j => j.name === selectedLottery);

  const totalCurrentJackpot = filteredJackpots.reduce((acc, j) => {
    const amount = parseFloat(j.currentJackpot.replace(/[^\d.]/g, ''));
    return acc + amount;
  }, 0);

  const growingJackpots = filteredJackpots.filter(j => j.increase.includes('+')).length;
  const stableJackpots = filteredJackpots.filter(j => !j.increase.includes('+') && !j.increase.includes('-')).length;
  const decreasingJackpots = filteredJackpots.filter(j => j.increase.includes('-')).length;

  return (
    <div className="space-y-6">
      {/* Panel de Control */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-2">
              💰 Seguimiento de Jackpots
            </h3>
            <p className="text-gray-300">
              Monitoreo en tiempo real de jackpots acumulados y tendencias
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select
              value={selectedLottery}
              onChange={(e) => setSelectedLottery(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-gold focus:outline-none"
            >
              <option value="all">Todas las Loterías</option>
              {lotteries.map((lottery) => (
                <option key={lottery.id} value={lottery.name}>
                  {lottery.name}
                </option>
              ))}
            </select>
            <button className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              🔄 Actualizar
            </button>
          </div>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              ${totalCurrentJackpot.toFixed(1)}M
            </div>
            <div className="text-gray-300 text-sm">Total Jackpots</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {growingJackpots}
            </div>
            <div className="text-gray-300 text-sm">Crecientes</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {stableJackpots}
            </div>
            <div className="text-gray-300 text-sm">Estables</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {decreasingJackpots}
            </div>
            <div className="text-gray-300 text-sm">Decrecientes</div>
          </div>
        </div>
      </div>

      {/* Lista de Jackpots */}
      <div className="space-y-4">
        {filteredJackpots.map((jackpot) => (
          <div key={jackpot.id} className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{jackpot.name}</h4>
                <p className="text-gray-300 text-sm">{jackpot.country}</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold mb-1">
                    {jackpot.currentJackpot}
                  </div>
                  <div className="text-gray-300 text-sm">Jackpot Actual</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold mb-1 ${jackpot.increase.includes('+') ? 'text-green-400' : jackpot.increase.includes('-') ? 'text-red-400' : 'text-yellow-400'}`}>
                    {jackpot.increase}
                  </div>
                  <div className="text-gray-300 text-sm">Cambio</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400 mb-1">
                    {jackpot.nextDraw}
                  </div>
                  <div className="text-gray-300 text-sm">Próximo Sorteo</div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                📊 Ver Historial
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                �� Calcular Ganancias
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                📱 Compartir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Historial de Jackpots */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <h4 className="text-xl font-bold text-gold mb-4">�� Historial de Jackpots (Últimos 10 días)</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Fecha</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Monto</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Cambio</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Ganadores</th>
              </tr>
            </thead>
            <tbody>
              {historyData.slice(-10).map((entry, index) => (
                <tr key={index} className="border-b border-gray-700/30 hover:bg-gray-700/20">
                  <td className="py-3 px-4">
                    <span className="text-white text-sm">{entry.date}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-400 font-medium">{entry.amount}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-medium ${entry.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {entry.change}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-blue-400 font-medium">{entry.winners}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen de Tendencias */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <h4 className="text-xl font-bold text-gold mb-4">📊 Resumen de Tendencias</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-600/20 rounded-lg border border-green-500/30">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {growingJackpots}
            </div>
            <div className="text-gray-300">Jackpots Crecientes</div>
            <div className="text-green-400 text-sm">
              {filteredJackpots.length > 0 ? Math.round((growingJackpots / filteredJackpots.length) * 100) : 0}% del total
            </div>
          </div>
          <div className="text-center p-4 bg-yellow-600/20 rounded-lg border border-yellow-500/30">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {stableJackpots}
            </div>
            <div className="text-gray-300">Jackpots Estables</div>
            <div className="text-yellow-400 text-sm">
              {filteredJackpots.length > 0 ? Math.round((stableJackpots / filteredJackpots.length) * 100) : 0}% del total
            </div>
          </div>
          <div className="text-center p-4 bg-red-600/20 rounded-lg border border-red-500/30">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {decreasingJackpots}
            </div>
            <div className="text-gray-300">Jackpots Decrecientes</div>
            <div className="text-red-400 text-sm">
              {filteredJackpots.length > 0 ? Math.round((decreasingJackpots / filteredJackpots.length) * 100) : 0}% del total
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex space-x-4">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
          💾 Exportar Reporte
        </button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          📊 Gráficos Detallados
        </button>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
          �� Alertas de Jackpot
        </button>
      </div>
    </div>
  );
}