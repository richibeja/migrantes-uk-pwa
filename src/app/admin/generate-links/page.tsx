'use client';

import { useState, useEffect } from 'react';
import { uniqueLinkSystem } from '@/lib/unique-links';
import { Plus, Copy, Check, X, Link, Mail, Users, Clock } from 'lucide-react';
import { ADMIN_SECURITY_CONFIG, isAdminSessionValid } from '@/config/admin-security';
import { useRouter } from 'next/navigation';

interface GeneratedLink {
  token: string;
  userId: string;
  userEmail: string;
  plan: string;
  isUsed: boolean;
  usedAt?: string;
  createdAt: string;
  expiresAt: string;
  fullLink: string;
}

export default function AdminGenerateLinksPage() {

  const [userEmail, setUserEmail] = useState('');
  const [plan, setPlan] = useState('premium');
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAdminSessionValid()) {
      router.push('/admin');
    } else {
      loadGeneratedLinks();
    }
  }, [router]);

  const loadGeneratedLinks = () => {
    uniqueLinkSystem.loadFromStorage();
    const stats = uniqueLinkSystem.getStats();
    setMessage(`Total: ${stats.total} | Usados: ${stats.used} | Disponibles: ${stats.unused}`);
  };

  const generateUniqueLink = () => {
    if (!userEmail.trim()) {
      setError('Ingresa un email válido');
      return;
    }

    try {
      const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const fullLink = uniqueLinkSystem.generateUniqueLink(userId, userEmail, plan);
      
      const newLink: GeneratedLink = {
        token: fullLink.split('token=')[1],
        userId,
        userEmail,
        plan,
        isUsed: false,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        fullLink
      };

      setGeneratedLinks(prev => [newLink, ...prev]);
      setUserEmail('');
      setMessage('Enlace único generado exitosamente');
      setError('');
      
    } catch (error) {
      setError('Error al generar el enlace');
    }
  };

  const copyToClipboard = async (text: string, token: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (error) {
      setError('Error al copiar al portapapeles');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (isUsed: boolean, expiresAt: string) => {
    if (isUsed) return 'text-green-400 bg-green-900/30';
    if (new Date() > new Date(expiresAt)) return 'text-red-400 bg-red-900/30';
    return 'text-blue-400 bg-blue-900/30';
  };

  const getStatusText = (isUsed: boolean, expiresAt: string) => {
    if (isUsed) return 'Usado';
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
                🔗 Generar Enlaces Únicos
              </h1>
              <p className="text-gray-300">
                Genera enlaces únicos para activar cuentas de usuarios
              </p>
            </div>
            <a
              href="/admin"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Volver al Admin
            </a>
          </div>

          {/* Formulario para generar enlaces */}
          <div className="bg-gray-700/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Generar Nuevo Enlace</h2>
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
                  onClick={generateUniqueLink}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Generar Enlace
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

          {/* Lista de enlaces generados */}
          <div className="bg-gray-700/50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Enlaces Generados</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 text-gray-300">Email</th>
                    <th className="text-left py-3 px-4 text-gray-300">Plan</th>
                    <th className="text-left py-3 px-4 text-gray-300">Estado</th>
                    <th className="text-left py-3 px-4 text-gray-300">Creado</th>
                    <th className="text-left py-3 px-4 text-gray-300">Expira</th>
                    <th className="text-left py-3 px-4 text-gray-300">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedLinks.map((link, index) => (
                    <tr key={index} className="border-b border-gray-600/50">
                      <td className="py-3 px-4 text-white">{link.userEmail}</td>
                      <td className="py-3 px-4 text-gray-300 capitalize">{link.plan}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(link.isUsed, link.expiresAt)}`}>
                          {getStatusText(link.isUsed, link.expiresAt)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{formatDate(link.createdAt)}</td>
                      <td className="py-3 px-4 text-gray-300">{formatDate(link.expiresAt)}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => copyToClipboard(link.fullLink, link.token)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center"
                        >
                          {copiedToken === link.token ? (
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
