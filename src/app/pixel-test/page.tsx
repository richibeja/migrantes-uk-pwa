'use client';

import { useEffect, useState } from 'react';
import { trackEvent, trackCustomEvent, isPixelLoaded, getPixelStats } from '@/components/MetaPixel';

interface EventLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export default function PixelTestPage() {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [pixelStatus, setPixelStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [eventCount, setEventCount] = useState(0);
  const [systemInfo, setSystemInfo] = useState<any>(null);

  const addLog = (message: string, type: EventLog['type'] = 'info') => {
    const newLog: EventLog = {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type
    };
    setEventLogs(prev => [...prev, newLog]);
    setEventCount(prev => prev + 1);
    console.log(`🔍 Pixel Test: ${message}`);
  };

  useEffect(() => {
    addLog('🚀 Página de diagnóstico cargada', 'info');
    
    // Verificar estado del pixel cada segundo
    const checkPixel = () => {
      const loaded = isPixelLoaded();
      const stats = getPixelStats();
      
      setPixelStatus(loaded ? 'loaded' : 'loading');
      setSystemInfo(stats);
      
      if (loaded && pixelStatus !== 'loaded') {
        addLog('✅ Meta Pixel cargado correctamente', 'success');
      }
    };

    checkPixel();
    const interval = setInterval(checkPixel, 1000);

    // Información del sistema
    const userInfo = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer || 'Directo',
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack || 'No configurado',
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timestamp: new Date().toISOString()
    };
    
    addLog(`Información del navegador capturada: ${navigator.userAgent}`, 'info');

    return () => clearInterval(interval);
  }, []);

  const testPageView = () => {
    try {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
        addLog('🔥 PageView disparado manualmente', 'success');
      } else {
        addLog('❌ fbq no disponible para PageView', 'error');
      }
    } catch (error) {
      addLog(`❌ Error en PageView: ${error}`, 'error');
    }
  };

  const testInitiateCheckout = () => {
    try {
      trackEvent('InitiateCheckout', {
        content_name: 'ANBEL AI Purchase Test',
        value: 97,
        currency: 'USD',
        test_mode: true
      });
      addLog('🔥 InitiateCheckout disparado con datos de prueba', 'success');
    } catch (error) {
      addLog(`❌ Error en InitiateCheckout: ${error}`, 'error');
    }
  };

  const testLead = () => {
    try {
      trackEvent('Lead', {
        content_name: 'Test Lead Generation',
        value: 97,
        currency: 'USD',
        test_mode: true
      });
      addLog('🔥 Lead disparado con datos de prueba', 'success');
    } catch (error) {
      addLog(`❌ Error en Lead: ${error}`, 'error');
    }
  };

  const testCustomEvent = () => {
    try {
      trackCustomEvent('PixelDiagnosticTest', {
        test_parameter: 'diagnostic_value',
        timestamp: new Date().toISOString(),
        page: 'pixel-test'
      });
      addLog('🔥 Evento personalizado disparado', 'success');
    } catch (error) {
      addLog(`❌ Error en evento personalizado: ${error}`, 'error');
    }
  };

  const testViewContent = () => {
    try {
      trackEvent('ViewContent', {
        content_name: 'ANBEL AI Product Page',
        content_category: 'AI Lottery Predictions',
        content_ids: ['anbel-ai-main'],
        value: 97,
        currency: 'USD'
      });
      addLog('🔥 ViewContent disparado', 'success');
    } catch (error) {
      addLog(`❌ Error en ViewContent: ${error}`, 'error');
    }
  };

  const clearLog = () => {
    setEventLogs([]);
    setEventCount(0);
    addLog('Log limpiado', 'info');
  };

  const getStatusColor = (type: EventLog['type']) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🔍 Diagnóstico del Pixel de Facebook
          </h1>
          <p className="text-gray-600 mb-6">
            <strong>Pixel ID:</strong> 633087431240994
          </p>

          {/* Estado del Pixel */}
          <div className="mb-8">
            <div className={`p-4 rounded-lg border ${
              pixelStatus === 'loaded' 
                ? 'bg-green-50 border-green-200 text-green-800'
                : pixelStatus === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-yellow-50 border-yellow-200 text-yellow-800'
            }`}>
              {pixelStatus === 'loaded' && '✅ Pixel cargado correctamente'}
              {pixelStatus === 'loading' && '⏳ Cargando pixel...'}
              {pixelStatus === 'error' && '❌ Error cargando pixel'}
            </div>
          </div>

          {/* Botones de Prueba */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🧪 Pruebas de Eventos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <button
                onClick={testPageView}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                PageView
              </button>
              <button
                onClick={testInitiateCheckout}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                InitiateCheckout
              </button>
              <button
                onClick={testLead}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Lead
              </button>
              <button
                onClick={testViewContent}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ViewContent
              </button>
              <button
                onClick={testCustomEvent}
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Custom Event
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={clearLog}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Limpiar Log
              </button>
            </div>
          </div>

          {/* Log de Eventos */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              📊 Log de Eventos ({eventCount})
            </h2>
            <div className="bg-gray-50 border rounded-lg p-4 max-h-96 overflow-y-auto">
              {eventLogs.length === 0 ? (
                <p className="text-gray-500">Esperando eventos...</p>
              ) : (
                <div className="space-y-2">
                  {eventLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded border text-sm ${getStatusColor(log.type)}`}
                    >
                      <span className="font-mono text-xs text-gray-500">
                        [{log.timestamp}]
                      </span>{' '}
                      {log.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">🔧 Información del Sistema</h2>
            <div className="bg-gray-50 border rounded-lg p-4">
              {systemInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Pixel Cargado:</strong> {systemInfo.loaded ? 'Sí' : 'No'}
                  </div>
                  <div>
                    <strong>fbq Disponible:</strong> {systemInfo.fbqAvailable ? 'Sí' : 'No'}
                  </div>
                  <div className="md:col-span-2">
                    <strong>URL:</strong> {systemInfo.url}
                  </div>
                  <div className="md:col-span-2">
                    <strong>User Agent:</strong> {systemInfo.userAgent}
                  </div>
                  <div>
                    <strong>Idioma:</strong> {navigator.language}
                  </div>
                  <div>
                    <strong>Plataforma:</strong> {navigator.platform}
                  </div>
                  <div>
                    <strong>Cookies:</strong> {navigator.cookieEnabled ? 'Habilitadas' : 'Deshabilitadas'}
                  </div>
                  <div>
                    <strong>Do Not Track:</strong> {navigator.doNotTrack || 'No configurado'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">📋 Instrucciones</h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Instala la extensión <strong>Facebook Pixel Helper</strong> en Chrome</li>
              <li>Abre las herramientas de desarrollador (F12) y ve a "Console"</li>
              <li>Ejecuta las pruebas de eventos usando los botones de arriba</li>
              <li>Verifica en Facebook Events Manager si los eventos llegan</li>
              <li>Comprueba que el estado del pixel sea "✅ Pixel cargado correctamente"</li>
            </ol>
            <div className="mt-4 p-4 bg-blue-100 rounded">
              <p className="text-sm text-blue-900">
                <strong>💡 Tip:</strong> Si ves eventos en el log pero no llegan a Facebook, 
                verifica tu conexión a internet y que no tengas bloqueadores de anuncios activos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
