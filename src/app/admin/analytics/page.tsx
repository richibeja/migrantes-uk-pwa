"use client";

import { useState, useEffect } from 'react';
import { analytics, type ConversionFunnel } from '@/lib/analytics';

export default function AnalyticsPage() {
  const [funnel, setFunnel] = useState<ConversionFunnel[]>([]);
  const [engagement, setEngagement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    setLoading(true);
    
    // Simular carga de datos
    setTimeout(() => {
      setFunnel(analytics.getConversionFunnel());
      setEngagement(analytics.getEngagementMetrics());
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Cargando Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📊 Analytics Dashboard</h1>
          <p className="text-gray-300">Métricas de conversión y engagement para Hotmart</p>
        </div>

        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-gold mb-2">
              {engagement?.totalEvents || 0}
            </div>
            <div className="text-gray-300">Eventos Totales</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-gold mb-2">
              {Math.round(engagement?.sessionDuration / 1000 / 60) || 0}m
            </div>
            <div className="text-gray-300">Duración Promedio</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-gold mb-2">
              {engagement?.conversionRate?.toFixed(2) || 0}%
            </div>
            <div className="text-gray-300">Tasa de Conversión</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-gold mb-2">
              {funnel[funnel.length - 1]?.count || 0}
            </div>
            <div className="text-gray-300">Ventas Completadas</div>
          </div>
        </div>

        {/* Funnel de Conversión */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 Funnel de Conversión</h2>
          
          <div className="space-y-4">
            {funnel.map((step, index) => (
              <div key={step.step} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black font-bold text-sm">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{step.step}</span>
                    <span className="text-gold font-bold">{step.count}</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-gold to-yellow-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${step.percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-sm text-gray-400 mt-1">
                    {step.percentage.toFixed(1)}% de conversión
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Páginas Más Visitadas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">📄 Páginas Más Visitadas</h3>
            <div className="space-y-3">
              {engagement?.topPages?.map((page: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{page.page}</span>
                  <span className="text-gold font-bold">{page.count}</span>
                </div>
              )) || (
                <div className="text-gray-400">No hay datos disponibles</div>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">🔘 Botones Más Clickeados</h3>
            <div className="space-y-3">
              {engagement?.topButtons?.map((button: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{button.button}</span>
                  <span className="text-gold font-bold">{button.count}</span>
                </div>
              )) || (
                <div className="text-gray-400">No hay datos disponibles</div>
              )}
            </div>
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">💡 Recomendaciones</h3>
          <div className="space-y-3 text-gray-300">
            {funnel[1]?.percentage < 50 && (
              <div className="flex items-start space-x-3">
                <span className="text-yellow-500">⚠️</span>
                <p>La tasa de visualización de planes es baja ({funnel[1]?.percentage.toFixed(1)}%). Considera mejorar la visibilidad de los precios.</p>
              </div>
            )}
            
            {funnel[3]?.percentage < 30 && (
              <div className="flex items-start space-x-3">
                <span className="text-red-500">🚨</span>
                <p>La tasa de inicio de pago es baja ({funnel[3]?.percentage.toFixed(1)}%). Revisa el proceso de checkout.</p>
              </div>
            )}
            
            {funnel[4]?.percentage < 80 && (
              <div className="flex items-start space-x-3">
                <span className="text-orange-500">⚡</span>
                <p>La tasa de finalización de pago es {funnel[4]?.percentage.toFixed(1)}%. Optimiza el proceso de pago.</p>
              </div>
            )}
            
            {engagement?.conversionRate > 5 && (
              <div className="flex items-start space-x-3">
                <span className="text-green-500">✅</span>
                <p>¡Excelente tasa de conversión! ({engagement.conversionRate.toFixed(2)}%)</p>
              </div>
            )}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="mt-8 flex space-x-4">
          <button
            onClick={loadAnalytics}
            className="bg-gold text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            🔄 Actualizar Datos
          </button>
          
          <button
            onClick={() => {
              const data = {
                funnel,
                engagement,
                timestamp: new Date().toISOString()
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            📥 Exportar Datos
          </button>
        </div>
      </div>
    </div>
  );
}
