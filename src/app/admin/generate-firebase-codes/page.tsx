'use client';

import { useState, useEffect } from 'react';
import { Plus, Copy, Check, X, Key, Mail, Users, Clock, Trash2, RefreshCw } from 'lucide-react';
import { ADMIN_SECURITY_CONFIG, isAdminSessionValid } from '@/config/admin-security';
import { useRouter } from 'next/navigation';

interface FirebaseCode {
  id: string;
  code: string;
  email: string;
  plan: string;
  used: boolean;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
  usedBy?: string;
}

export default function AdminGenerateFirebaseCodesPage() {

  const [userEmail, setUserEmail] = useState('');
  const [plan, setPlan] = useState('premium');
  const [codes, setCodes] = useState<FirebaseCode[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, used: 0, available: 0 });
  const router = useRouter();

  useEffect(() => {
    if (!isAdminSessionValid()) {
      router.push('/admin');
    } else {
      loadCodes();
    }
  }, [router]);

  const loadCodes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/generate-code');
      const result = await response.json();
      
      if (result.success) {
        setCodes(result.codes);
        setStats({
          total: result.codes.length,
          used: result.codes.filter((c: FirebaseCode) => c.used).length,
          available: result.codes.filter((c: FirebaseCode) => !c.used).length
        });
      } else {
        setError('Error cargando códigos');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const generateCode = async () => {
    if (!userEmail.trim()) {
      setError('Ingresa un email válido');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: userEmail, 
          plan: plan 
        }),
      });

      const result = await response.json();

      if (result.success) {
        setUserEmail('');
        setMessage(`Código generado: ${result.code}`);
        setError('');
        loadCodes(); // Recargar la lista
      } else {
        setError(result.error || 'Error generando código');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, codigo: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(codigo);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      setError('Error al copiar al portapapeles');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (used: boolean, expiresAt: string) => {
    if (used) return 'text-green-400 bg-green-900/30';
    if (new Date() > new Date(expiresAt)) return 'text-red-400 bg-red-900/30';
    return 'text-blue-400 bg-blue-900/30';
  };

  const getStatusText = (used: boolean, expiresAt: string) => {
    if (used) return 'Usado';
    if (new Date() > new Date(expiresAt)) return 'Expirado';
    return 'Disponible';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                🔥 Códigos Únicos con Firebase
              </h1>
              <p className="text-gray-300">
                Sistema real de códigos únicos que SÍ funciona con Firebase
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={loadCodes}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
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
                  <p className="text-gray-300 text-sm">Usados</p>
                  <p className="text-2xl font-bold text-white">{stats.used}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Disponibles</p>
                  <p className="text-2xl font-bold text-white">{stats.available}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario para generar códigos */}
          <div className="bg-gray-700/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Generar Nuevo Código</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email del Usuario
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Plan
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="basic">Básico</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={generateCode}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {loading ? 'Generando...' : 'Generar Código'}
                </button>
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

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-200">{error}</span>
              </div>
            </div>
          )}

          {/* Lista de códigos generados */}
          <div className="bg-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Códigos Generados</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 text-gray-300">Email</th>
                    <th className="text-left py-3 px-4 text-gray-300">Código</th>
                    <th className="text-left py-3 px-4 text-gray-300">Plan</th>
                    <th className="text-left py-3 px-4 text-gray-300">Estado</th>
                    <th className="text-left py-3 px-4 text-gray-300">Creado</th>
                    <th className="text-left py-3 px-4 text-gray-300">Expira</th>
                    <th className="text-left py-3 px-4 text-gray-300">Usado</th>
                    <th className="text-left py-3 px-4 text-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((codigo, index) => (
                    <tr key={index} className="border-b border-gray-600/50">
                      <td className="py-3 px-4 text-white">{codigo.email}</td>
                      <td className="py-3 px-4 text-gray-300 font-mono">{codigo.code}</td>
                      <td className="py-3 px-4 text-gray-300 capitalize">{codigo.plan}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(codigo.used, codigo.expiresAt)}`}>
                          {getStatusText(codigo.used, codigo.expiresAt)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{formatDate(codigo.createdAt)}</td>
                      <td className="py-3 px-4 text-gray-300">{formatDate(codigo.expiresAt)}</td>
                      <td className="py-3 px-4 text-gray-300">{formatDate(codigo.usedAt || '')}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => copyToClipboard(codigo.code, codigo.code)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center mr-2"
                        >
                          {copiedCode === codigo.code ? (
                            <>
                              <Check className="w-3 h-3 mr-1" />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 mr-1" />
                              Copiar
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
