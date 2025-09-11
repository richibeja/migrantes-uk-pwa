'use client';

import { useState, useEffect } from 'react';
import { getAllSimpleCodes, getSimpleStats } from '@/lib/simple-codes';
import { Key, Users, Check, X } from 'lucide-react';
import { ADMIN_SECURITY_CONFIG, isAdminSessionValid } from '@/config/admin-security';
import { useRouter } from 'next/navigation';

export default function AdminCodesPage() {
  const [codes, setCodes] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, available: 0 });
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isAdminSessionValid()) {
      router.push('/admin');
    } else {
      loadCodes();
    }
  }, [router]);

  const loadCodes = () => {
    const allCodes = getAllSimpleCodes();
    setCodes(allCodes);
    const statistics = getSimpleStats();
    setStats(statistics);
    setMessage(`Total: ${statistics.total} | Disponibles: ${statistics.available}`);
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setMessage(`Código ${code} copiado al portapapeles`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al copiar al portapapeles');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                🔑 Códigos de Activación
              </h1>
              <p className="text-gray-300">
                Códigos predefinidos que funcionan en producción
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={loadCodes}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Key className="w-4 h-4 mr-2" />
                Actualizar
              </button>
              <a
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ← Volver al Admin
              </a>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center">
                <Key className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Total Códigos</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center">
                <Check className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Disponibles</p>
                  <p className="text-2xl font-bold text-white">{stats.available}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Siempre Funcionan</p>
                  <p className="text-2xl font-bold text-white">100%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          {message && (
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-green-200">{message}</span>
              </div>
            </div>
          )}

          {/* Lista de códigos */}
          <div className="bg-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Códigos Predefinidos</h2>
            <div className="grid gap-4">
              {codes.map((code, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-600/50 p-4 rounded-lg border border-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <Key className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-mono text-lg">{code.code}</div>
                      <div className="text-gray-300 text-sm">{code.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      code.plan === 'premium' ? 'bg-purple-900/30 text-purple-300' :
                      code.plan === 'vip' ? 'bg-yellow-900/30 text-yellow-300' :
                      'bg-blue-900/30 text-blue-300'
                    }`}>
                      {code.plan.toUpperCase()}
                    </span>
                    <button
                      onClick={() => copyToClipboard(code.code)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center"
                    >
                      <Key className="w-3 h-3 mr-1" />
                      Copiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-blue-400 font-bold mb-3">ℹ️ Información Importante</h3>
            <ul className="text-blue-200 text-sm space-y-2">
              <li>• Estos códigos funcionan en cualquier navegador y dispositivo</li>
              <li>• No dependen de localStorage compartido</li>
              <li>• Siempre están disponibles en producción</li>
              <li>• Para agregar nuevos códigos, edita el archivo <code className="bg-gray-700 px-1 rounded">src/lib/simple-codes.ts</code></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
