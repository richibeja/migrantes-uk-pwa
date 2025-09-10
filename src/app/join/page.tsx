'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Star, Check, ArrowRight, Copy, Share2 } from 'lucide-react';

export default function JoinPage() {
  const router = useRouter();
  const [invitationCode, setInvitationCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  // Enlaces de ejemplo para probar el sistema
  const exampleInvitations = [
    {
      id: '1',
      name: 'Club Ganadores VIP',
      description: 'Club exclusivo para jugadores experimentados',
      members: 12,
      link: '/join?club=1&ref=maria&token=abc123',
      color: 'from-purple-600 to-blue-600'
    },
    {
      id: '2', 
      name: 'Lucky Numbers Team',
      description: 'Equipo enfocado en análisis estadístico',
      members: 8,
      link: '/join?club=2&ref=carlos&token=def456',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: '3',
      name: 'Golden Tickets',
      description: 'Club premium con estrategias avanzadas',
      members: 15,
      link: '/join?club=3&ref=ana&token=ghi789',
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  const handleJoinByCode = async () => {
    if (!invitationCode.trim()) {
      setError('Por favor ingresa un código de invitación');
      return;
    }

    setIsValidating(true);
    setError('');

    // Simular validación
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirigir a la página de unión
    router.push(`/join?club=${invitationCode}&ref=demo&token=demo123`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${text}`);
    // Mostrar notificación de copiado
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            🎯 Unirse a un Club ANBEL
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Únete a equipos de jugadores expertos y aumenta tus posibilidades de ganar
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Método 1: Código de Invitación */}
          <div className="bg-gray-800/90 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-blue-400" />
              Unirse con Código de Invitación
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Código de Invitación
                </label>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={invitationCode}
                    onChange={(e) => setInvitationCode(e.target.value)}
                    placeholder="Ingresa tu código de invitación"
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleJoinByCode}
                    disabled={isValidating}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isValidating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Validando...</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4" />
                        <span>Unirse</span>
                      </>
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>
            </div>
          </div>

          {/* Método 2: Enlaces de Ejemplo */}
          <div className="bg-gray-800/90 rounded-xl p-8 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3 text-yellow-400" />
              Clubs Disponibles para Probar
            </h2>
            
            <p className="text-gray-300 mb-6">
              Haz clic en cualquiera de estos enlaces para probar el sistema de unión a clubs:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exampleInvitations.map((club) => (
                <div key={club.id} className="bg-gray-700/50 rounded-lg p-6 border border-gray-600 hover:border-gold/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{club.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{club.description}</p>
                      <div className="flex items-center text-sm text-gray-300">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{club.members} miembros</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <a
                      href={club.link}
                      className={`flex-1 bg-gradient-to-r ${club.color} text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 text-center`}
                    >
                      Unirse
                    </a>
                    <button
                      onClick={() => copyToClipboard(club.link)}
                      className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                      title="Copiar enlace"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Información Adicional */}
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-8 border border-green-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Check className="w-6 h-6 mr-3 text-green-400" />
              ¿Cómo Funciona?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">1. Recibe Invitación</h4>
                <p className="text-gray-300">Un miembro del club te envía un enlace único por WhatsApp o email</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">2. Haz Clic en el Enlace</h4>
                <p className="text-gray-300">El enlace te lleva directamente a la página de unión del club</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">3. Únete Instantáneamente</h4>
                <p className="text-gray-300">Confirma tu unión y accede inmediatamente al dashboard del club</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}