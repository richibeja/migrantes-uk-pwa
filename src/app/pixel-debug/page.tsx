'use client';

import { useEffect, useState } from 'react';
import { trackEvent, isPixelLoaded, getPixelStats } from '@/components/MetaPixel';

export default function PixelDebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [networkErrors, setNetworkErrors] = useState<string[]>([]);

  useEffect(() => {
    // Capturar errores de red
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok && args[0]?.toString().includes('facebook')) {
          setNetworkErrors(prev => [...prev, `Fetch error: ${args[0]} - ${response.status}`]);
        }
        return response;
      } catch (error) {
        if (args[0]?.toString().includes('facebook')) {
          setNetworkErrors(prev => [...prev, `Network error: ${error}`]);
        }
        throw error;
      }
    };

    // Capturar errores de scripts
    const handleError = (event: ErrorEvent) => {
      if (event.filename?.includes('facebook') || event.message?.includes('fbq')) {
        setNetworkErrors(prev => [...prev, `Script error: ${event.message}`]);
      }
    };

    window.addEventListener('error', handleError);

    // Información de debugging
    const updateDebugInfo = () => {
      const stats = getPixelStats();
      const info = {
        ...stats,
        windowFbq: typeof window.fbq,
        fbqQueue: window.fbq?.q?.length || 0,
        fbqLoaded: window.fbq?.loaded || false,
        cookiesEnabled: navigator.cookieEnabled,
        localStorage: typeof Storage !== 'undefined',
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        currentUrl: window.location.href,
        timestamp: new Date().toISOString()
      };
      setDebugInfo(info);
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 2000);

    return () => {
      window.fetch = originalFetch;
      window.removeEventListener('error', handleError);
      clearInterval(interval);
    };
  }, []);

  const testPixelConnection = async () => {
    try {
      // Test de conectividad a Facebook
      const testUrl = 'https://connect.facebook.net/en_US/fbevents.js';
      const response = await fetch(testUrl, { method: 'HEAD' });
      
      if (response.ok) {
        setNetworkErrors(prev => [...prev, '✅ Conectividad a Facebook OK']);
      } else {
        setNetworkErrors(prev => [...prev, `❌ Error conectividad Facebook: ${response.status}`]);
      }
    } catch (error) {
      setNetworkErrors(prev => [...prev, `❌ No se puede conectar a Facebook: ${error}`]);
    }
  };

  const clearErrors = () => {
    setNetworkErrors([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🐛 Debug del Pixel de Facebook</h1>
        
        {/* Estado del Pixel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📊 Estado del Pixel</h2>
          {debugInfo && (
            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
              <div>Pixel Cargado: <span className={debugInfo.loaded ? 'text-green-400' : 'text-red-400'}>{debugInfo.loaded ? 'SÍ' : 'NO'}</span></div>
              <div>fbq Disponible: <span className={debugInfo.fbqAvailable ? 'text-green-400' : 'text-red-400'}>{debugInfo.fbqAvailable ? 'SÍ' : 'NO'}</span></div>
              <div>Tipo fbq: <span className="text-blue-400">{debugInfo.windowFbq}</span></div>
              <div>Cola fbq: <span className="text-yellow-400">{debugInfo.fbqQueue}</span></div>
              <div>fbq.loaded: <span className={debugInfo.fbqLoaded ? 'text-green-400' : 'text-red-400'}>{debugInfo.fbqLoaded ? 'true' : 'false'}</span></div>
              <div>Cookies: <span className={debugInfo.cookiesEnabled ? 'text-green-400' : 'text-red-400'}>{debugInfo.cookiesEnabled ? 'ON' : 'OFF'}</span></div>
            </div>
          )}
        </div>

        {/* Información del Navegador */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🌐 Información del Navegador</h2>
          {debugInfo && (
            <div className="text-sm font-mono space-y-2">
              <div><strong>URL:</strong> {debugInfo.currentUrl}</div>
              <div><strong>Referrer:</strong> {debugInfo.referrer || 'Ninguno'}</div>
              <div><strong>User Agent:</strong> {debugInfo.userAgent}</div>
              <div><strong>Idioma:</strong> {navigator.language}</div>
              <div><strong>Plataforma:</strong> {navigator.platform}</div>
            </div>
          )}
        </div>

        {/* Errores de Red */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🚨 Errores de Red</h2>
            <div className="space-x-2">
              <button
                onClick={testPixelConnection}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                Test Conectividad
              </button>
              <button
                onClick={clearErrors}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
              >
                Limpiar
              </button>
            </div>
          </div>
          <div className="bg-black rounded p-4 max-h-64 overflow-y-auto">
            {networkErrors.length === 0 ? (
              <p className="text-gray-400">No hay errores registrados</p>
            ) : (
              networkErrors.map((error, index) => (
                <div key={index} className="text-red-400 text-sm font-mono mb-1">
                  [{new Date().toLocaleTimeString()}] {error}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pruebas Rápidas */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">⚡ Pruebas Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => trackEvent('PageView')}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              PageView
            </button>
            <button
              onClick={() => trackEvent('Lead', { value: 97, currency: 'USD' })}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Lead
            </button>
            <button
              onClick={() => trackEvent('InitiateCheckout', { value: 97, currency: 'USD' })}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
            >
              Checkout
            </button>
            <button
              onClick={() => window.location.href = '/pixel-test'}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Ir a Test Completo
            </button>
          </div>
        </div>

        {/* Información Técnica */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔧 Info Técnica</h2>
          <div className="text-sm font-mono text-gray-300">
            <p><strong>Posibles causas del error 403/vsbet74.com:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Extensiones del navegador que bloquean tracking</li>
              <li>Ad blockers activos</li>
              <li>DNS o proxy que redirige tráfico</li>
              <li>Configuración de red corporativa</li>
              <li>Malware o software no deseado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
