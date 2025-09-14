'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Download, Wifi, WifiOff } from 'lucide-react';

interface DiagnosticItem {
  name: string;
  status: 'success' | 'error' | 'warning';
  details: string;
  score: number;
}

export default function PWADiagnostic() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const runDiagnostics = async () => {
    setIsRunning(true);
    const results: DiagnosticItem[] = [];
    let score = 0;

    // 1. Check HTTPS
    if (location.protocol === 'https:' || location.hostname === 'localhost') {
      results.push({
        name: 'HTTPS/SSL',
        status: 'success',
        details: 'Secure connection detected',
        score: 10
      });
      score += 10;
    } else {
      results.push({
        name: 'HTTPS/SSL',
        status: 'error',
        details: 'PWA requires HTTPS in production',
        score: 0
      });
    }

    // 2. Check Manifest
    try {
      const manifestResponse = await fetch('/manifest.json');
      if (manifestResponse.ok) {
        const manifest = await manifestResponse.json();
        if (manifest.name && manifest.short_name && manifest.start_url) {
          results.push({
            name: 'Manifest.json',
            status: 'success',
            details: `App: ${manifest.name}`,
            score: 10
          });
          score += 10;
        } else {
          results.push({
            name: 'Manifest.json',
            status: 'warning',
            details: 'Manifest exists but missing required fields',
            score: 5
          });
          score += 5;
        }
      } else {
        results.push({
          name: 'Manifest.json',
          status: 'error',
          details: 'Manifest not found or not accessible',
          score: 0
        });
      }
    } catch (error) {
      results.push({
        name: 'Manifest.json',
        status: 'error',
        details: 'Error loading manifest',
        score: 0
      });
    }

    // 3. Check Service Worker
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          results.push({
            name: 'Service Worker',
            status: 'success',
            details: 'Service Worker is registered and active',
            score: 10
          });
          score += 10;
        } else {
          results.push({
            name: 'Service Worker',
            status: 'error',
            details: 'Service Worker not registered',
            score: 0
          });
        }
      } catch (error) {
        results.push({
          name: 'Service Worker',
          status: 'error',
          details: 'Error checking Service Worker',
          score: 0
        });
      }
    } else {
      results.push({
        name: 'Service Worker',
        status: 'error',
        details: 'Service Worker not supported in this browser',
        score: 0
      });
    }

    // 4. Check Icons
    const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
    let iconsFound = 0;
    for (const size of iconSizes) {
      try {
        const iconResponse = await fetch(`/icons/icon-${size}x${size}.png`);
        if (iconResponse.ok) iconsFound++;
      } catch (error) {
        // Icon not found
      }
    }
    
    if (iconsFound === iconSizes.length) {
      results.push({
        name: 'PWA Icons',
        status: 'success',
        details: `All ${iconSizes.length} icon sizes available`,
        score: 10
      });
      score += 10;
    } else if (iconsFound > 0) {
      results.push({
        name: 'PWA Icons',
        status: 'warning',
        details: `${iconsFound}/${iconSizes.length} icon sizes available`,
        score: 5
      });
      score += 5;
    } else {
      results.push({
        name: 'PWA Icons',
        status: 'error',
        details: 'No PWA icons found',
        score: 0
      });
    }

    // 5. Check Display Mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      results.push({
        name: 'Display Mode',
        status: 'success',
        details: 'App is running in standalone mode',
        score: 10
      });
      score += 10;
    } else {
      results.push({
        name: 'Display Mode',
        status: 'warning',
        details: 'App not in standalone mode (normal browser)',
        score: 5
      });
      score += 5;
    }

    // 6. Check Installability
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      results.push({
        name: 'Installation',
        status: 'success',
        details: 'App appears to be installed',
        score: 10
      });
      score += 10;
    } else {
      results.push({
        name: 'Installation',
        status: 'warning',
        details: 'App not installed (can be installed)',
        score: 5
      });
      score += 5;
    }

    // 7. Check Responsive Design
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      results.push({
        name: 'Responsive Design',
        status: 'success',
        details: 'Viewport meta tag present',
        score: 10
      });
      score += 10;
    } else {
      results.push({
        name: 'Responsive Design',
        status: 'error',
        details: 'Viewport meta tag missing',
        score: 0
      });
    }

    // 8. Check Offline Capability
    if ('caches' in window) {
      results.push({
        name: 'Offline Support',
        status: 'success',
        details: 'Cache API available',
        score: 10
      });
      score += 10;
    } else {
      results.push({
        name: 'Offline Support',
        status: 'error',
        details: 'Cache API not supported',
        score: 0
      });
    }

    // 9. Check Network Status
    if (navigator.onLine) {
      results.push({
        name: 'Network Status',
        status: 'success',
        details: 'Online',
        score: 10
      });
      score += 10;
    } else {
      results.push({
        name: 'Network Status',
        status: 'warning',
        details: 'Offline',
        score: 5
      });
      score += 5;
    }

    setDiagnostics(results);
    setTotalScore(score);
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-500 bg-green-50';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="PWA Diagnostic"
      >
        🔍
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">🔍 PWA Diagnostic</h2>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">
              {totalScore}/100
            </div>
            <div className="text-sm opacity-90">
              PWA Score: {Math.round((totalScore / 100) * 100)}%
            </div>
          </div>
        </div>
        
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {diagnostics.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border-l-4 ${getStatusColor(item.status)}`}
              >
                {getStatusIcon(item.status)}
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.details}</div>
                </div>
                <div className="text-sm font-bold text-gray-700">
                  {item.score}/10
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={runDiagnostics}
              disabled={isRunning}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
              {isRunning ? 'Running...' : 'Run Again'}
            </button>
            <button
              onClick={() => window.open('/pwa-check.html', '_blank')}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
