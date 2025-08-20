'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  lotteryId: string;
  lotteryName: string;
  totalDraws: number;
  averageJackpot: string;
  hitRate: number;
  averageAccuracy: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
}

interface TrendData {
  date: string;
  accuracy: number;
  jackpot: string;
  participants: number;
}

export default function LotteryAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [selectedLottery, setSelectedLottery] = useState('all');
  const [timeRange, setTimeRange] = useState('month');
  const [trendData, setTrendData] = useState<TrendData[]>([]);

  const lotteries = [
    { id: 'all', name: 'Todas las Loterías' },
    { id: 'euromillions', name: 'EuroMillions' },
    { id: 'powerball', name: 'Powerball' },
    { id: 'megamillions', name: 'Mega Millions' },
    { id: 'uk-national', name: 'UK National Lottery' },
    { id: 'primitiva', name: 'El Gordo de la Primitiva' },
    { id: 'lotto-6-49', name: 'Lotto 6/49' },
    { id: 'takarakuji', name: 'Takarakuji' },
    { id: 'lotto-6-45', name: 'Lotto 6/45' },
    { id: 'china-welfare', name: 'China Welfare Lottery' }
  ];

  // Generar datos de analytics simulados
  useEffect(() => {
    generateAnalyticsData();
    generateTrendData();
  }, [timeRange]);

  const generateAnalyticsData = () => {
    const mockAnalytics: AnalyticsData[] = [
      {
        lotteryId: 'euromillions',
        lotteryName: 'EuroMillions',
        totalDraws: 156,
        averageJackpot: '€45M',
        hitRate: 87,
        averageAccuracy: 92.3,
        trend: 'up',
        lastUpdate: '2025-01-20 15:30'
      },
      {
        lotteryId: 'powerball',
        lotteryName: 'Powerball',
        totalDraws: 143,
        averageJackpot: '$120M',
        hitRate: 84,
        averageAccuracy: 89.7,
        trend: 'stable',
        lastUpdate: '2025-01-20 15:30'
      },
      {
        lotteryId: 'megamillions',
        lotteryName: 'Mega Millions',
        totalDraws: 138,
        averageJackpot: '$95M',
        hitRate: 82,
        averageAccuracy: 88.1,
        trend: 'up',
        lastUpdate: '2025-01-20 15:30'
      },
      {
        lotteryId: 'uk-national',
        lotteryName: 'UK National Lottery',
        totalDraws: 167,
        averageJackpot: '£8M',
        hitRate: 89,
        averageAccuracy: 91.5,
        trend: 'stable',
        lastUpdate: '2025-01-20 15:30'
      },
      {
        lotteryId: 'primitiva',
        lotteryName: 'El Gordo de la Primitiva',
        totalDraws: 124,
        averageJackpot: '€12M',
        hitRate: 85,
        averageAccuracy: 87.8,
        trend: 'down',
        lastUpdate: '2025-01-20 15:30'
      },
      {
        lotteryId: 'lotto-6-49',
        lotteryName: 'Lotto 6/49',
        totalDraws: 145,
        averageJackpot: '$25M',
        hitRate: 86,
        averageAccuracy: 89.2,
        trend: 'up',
        lastUpdate: '2025-01-20 15:30'
      },
      {
        lotteryId: 'takarakuji',
        lotteryName: 'Takarakuji',
        totalDraws: 89,
        averageJackpot: '¥800M',
        hitRate: 78,
        averageAccuracy: 83.4,
        trend: 'stable',
        lastUpdate: '2025-01-20 15:30'
      },
      {
        lotteryId: 'lotto-6-45',
        lotteryName: 'Lotto 6/45',
        totalDraws: 112,
        averageJackpot: '₩8B',
        hitRate: 81,
        averageAccuracy: 86.7,
        trend: 'up',
        lastUpdate: '2025-01-20 15:30'
      },
      {
        lotteryId: 'china-welfare',
        lotteryName: 'China Welfare Lottery',
        totalDraws: 298,
        averageJackpot: '¥15M',
        hitRate: 76,
        averageAccuracy: 82.1,
        trend: 'down',
        lastUpdate: '2025-01-20 15:30'
      }
    ];

    setAnalytics(mockAnalytics);
  };

  const generateTrendData = () => {
    const trends: TrendData[] = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      trends.push({
        date: date.toISOString().split('T')[0],
        accuracy: Math.floor(Math.random() * 20) + 80, // 80-99%
        jackpot: `$${Math.floor(Math.random() * 100) + 20}M`,
        participants: Math.floor(Math.random() * 10000) + 5000
      });
    }
    
    setTrendData(trends);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-400';
    if (accuracy >= 80) return 'text-yellow-400';
    if (accuracy >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const filteredAnalytics = selectedLottery === 'all' 
    ? analytics 
    : analytics.filter(a => a.lotteryId === selectedLottery);

  const overallStats = {
    totalDraws: filteredAnalytics.reduce((acc, a) => acc + a.totalDraws, 0),
    averageHitRate: Math.round(filteredAnalytics.reduce((acc, a) => acc + a.hitRate, 0) / filteredAnalytics.length),
    averageAccuracy: Math.round(filteredAnalytics.reduce((acc, a) => acc + a.averageAccuracy, 0) / filteredAnalytics.length * 10) / 10,
    upTrends: filteredAnalytics.filter(a => a.trend === 'up').length,
    downTrends: filteredAnalytics.filter(a => a.trend === 'down').length,
    stableTrends: filteredAnalytics.filter(a => a.trend === 'stable').length
  };

  return (
    <div className="space-y-6">
      {/* Panel de Control */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-2">
              📈 Analytics y Estadísticas
            </h3>
            <p className="text-gray-300">
              Análisis profundo del rendimiento y tendencias de todas las loterías
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <select
              value={selectedLottery}
              onChange={(e) => setSelectedLottery(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-gold focus:outline-none"
            >
              {lotteries.map((lottery) => (
                <option key={lottery.id} value={lottery.id}>
                  {lottery.name}
                </option>
              ))}
            </select>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-gold focus:outline-none"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mes</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Año</option>
            </select>
            <button className="bg-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              🔄 Actualizar
            </button>
          </div>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {overallStats.totalDraws.toLocaleString()}
            </div>
            <div className="text-gray-300 text-sm">Total Sorteos</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {overallStats.averageHitRate}%
            </div>
            <div className="text-gray-300 text-sm">Tasa de Acierto</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {overallStats.averageAccuracy}%
            </div>
            <div className="text-gray-300 text-sm">Precisión Promedio</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {overallStats.upTrends}
            </div>
            <div className="text-gray-300 text-sm">Tendencias ↑</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {overallStats.downTrends}
            </div>
            <div className="text-gray-300 text-sm">Tendencias ↓</div>
          </div>
        </div>
      </div>

      {/* Tabla de Analytics */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <h4 className="text-xl font-bold text-gold mb-4">📊 Rendimiento por Lotería</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Lotería</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Sorteos</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Jackpot Prom.</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Tasa Acierto</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Precisión</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Tendencia</th>
                <th className="text-center py-3 px-4 text-gray-300 font-medium">Última Actualización</th>
              </tr>
            </thead>
            <tbody>
              {filteredAnalytics.map((lottery) => (
                <tr key={lottery.lotteryId} className="border-b border-gray-700/30 hover:bg-gray-700/20">
                  <td className="py-4 px-4">
                    <div className="font-medium text-white">{lottery.lotteryName}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-300">{lottery.totalDraws.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-green-400 font-medium">{lottery.averageJackpot}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-blue-400 font-medium">{lottery.hitRate}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-medium ${getAccuracyColor(lottery.averageAccuracy)}`}>
                      {lottery.averageAccuracy}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <span className={getTrendColor(lottery.trend)}>
                        {getTrendIcon(lottery.trend)}
                      </span>
                      <span className={`text-sm font-medium ${getTrendColor(lottery.trend)}`}>
                        {lottery.trend === 'up' ? 'Subiendo' : lottery.trend === 'down' ? 'Bajando' : 'Estable'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-400 text-sm">{lottery.lastUpdate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráficos de Tendencias */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
          <h4 className="text-xl font-bold text-gold mb-4">📈 Tendencias de Precisión</h4>
          <div className="space-y-3">
            {trendData.slice(-7).map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">{trend.date}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getAccuracyColor(trend.accuracy)}`}
                      style={{ width: `${trend.accuracy}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${getAccuracyColor(trend.accuracy)}`}>
                    {trend.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
          <h4 className="text-xl font-bold text-gold mb-4">💰 Análisis de Jackpots</h4>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${Math.floor(Math.random() * 200) + 100}M
              </div>
              <div className="text-gray-300">Jackpot Promedio</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400 mb-1">
                  {Math.floor(Math.random() * 50) + 20}M
                </div>
                <div className="text-gray-400 text-sm">Mínimo</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400 mb-1">
                  ${Math.floor(Math.random() * 500) + 200}M
                </div>
                <div className="text-gray-400 text-sm">Máximo</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de Rendimiento */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
        <h4 className="text-xl font-bold text-gold mb-4">🎯 Resumen de Rendimiento</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {filteredAnalytics.filter(a => a.averageAccuracy >= 90).length}
            </div>
            <div className="text-gray-300">Loterías de Alta Precisión</div>
            <div className="text-green-400 text-sm">≥90% precisión</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {filteredAnalytics.filter(a => a.averageAccuracy >= 80 && a.averageAccuracy < 90).length}
            </div>
            <div className="text-gray-300">Loterías de Precisión Media</div>
            <div className="text-yellow-400 text-sm">80-89% precisión</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {filteredAnalytics.filter(a => a.averageAccuracy < 80).length}
            </div>
            <div className="text-gray-300">Loterías de Baja Precisión</div>
            <div className="text-red-400 text-sm">&lt;80% precisión</div>
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
          📱 Compartir Analytics
        </button>
      </div>
    </div>
  );
}
