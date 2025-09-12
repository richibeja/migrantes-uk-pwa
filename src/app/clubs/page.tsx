'use client';

import { useState, useEffect } from 'react';
import { Plus, Users, DollarSign, TrendingUp, Calendar, Star, Crown, Zap, Gift } from 'lucide-react';
import Link from 'next/link';
import { getCurrentPlan, puedeCrearClub } from '@/utils/permissions';

interface Club {
  id: string;
  nombre: string;
  descripcion: string;
  miembros: number;
  saldoColectivo: number;
  jugadasExitosas: number;
  fechaCreacion: string;
  estado: 'activo' | 'inactivo';
}

export default function ClubsPage() {

  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Simular usuario actual (en producción vendría del contexto de auth)
  const currentUser = {
    id: 'user1',
    planId: 'basico' // Plan actual del usuario
  };
  
  const currentPlan = getCurrentPlan(currentUser);
  const canCreateClub = puedeCrearClub(currentUser, clubs.length);

  // Datos de ejemplo para desarrollo
  useEffect(() => {
    const mockClubs: Club[] = [
      {
        id: '1',
        nombre: 'Club Ganadores VIP',
        descripcion: 'Club exclusivo para jugadores experimentados',
        miembros: 12,
        saldoColectivo: 2500,
        jugadasExitosas: 8,
        fechaCreacion: '2025-01-10',
        estado: 'activo'
      },
      {
        id: '2',
        nombre: 'Lucky Numbers Team',
        descripcion: 'Equipo enfocado en análisis estadístico',
        miembros: 8,
        saldoColectivo: 1800,
        jugadasExitosas: 5,
        fechaCreacion: '2025-01-08',
        estado: 'activo'
      },
      {
        id: '3',
        nombre: 'Mega Winners',
        descripcion: 'Club especializado en Mega Millions',
        miembros: 15,
        saldoColectivo: 3200,
        jugadasExitosas: 12,
        fechaCreacion: '2025-01-05',
        estado: 'activo'
      }
    ];
    
    setTimeout(() => {
      setClubs(mockClubs);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Cargando Clubs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gold">🎯 Clubs ANBEL</h1>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">BETA</span>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              disabled={!canCreateClub}
              className={`font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                canCreateClub
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>
                {canCreateClub ? 'Crear Club' : 'Límite Alcanzado'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Explicación del Sistema */}
      <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">¿Cómo Funcionan los Clubs ANBEL?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Únete a equipos de jugadores expertos y aumenta tus posibilidades de ganar con estrategias colectivas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-3">Unirse por Invitación</h3>
              <p className="text-gray-300 mb-4">Recibe un enlace único de un miembro del club y únete instantáneamente</p>
              <a
                href="/join"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Unirse Ahora</span>
              </a>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-3">Saldo Colectivo</h3>
              <p className="text-gray-300 mb-4">Todos los miembros contribuyen para comprar más boletos y aumentar las posibilidades</p>
              <div className="text-2xl font-bold text-yellow-400">
                ${clubs.reduce((sum, club) => sum + club.saldoColectivo, 0).toLocaleString()}
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Estrategias Grupales</h3>
              <p className="text-gray-300 mb-4">Análisis conjunto de números y predicciones más precisas</p>
              <div className="text-2xl font-bold text-purple-400">
                {clubs.reduce((sum, club) => sum + club.jugadasExitosas, 0)} Jugadas Exitosas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">{clubs.length}</div>
                <div className="text-gray-400 text-sm">Clubs Activos</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {clubs.reduce((sum, club) => sum + club.miembros, 0)}
                </div>
                <div className="text-gray-400 text-sm">Miembros Totales</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">
                  ${clubs.reduce((sum, club) => sum + club.saldoColectivo, 0).toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm">Saldo Colectivo</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {clubs.reduce((sum, club) => sum + club.jugadasExitosas, 0)}
                </div>
                <div className="text-gray-400 text-sm">Jugadas Exitosas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div key={club.id} className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{club.nombre}</h3>
                  <p className="text-gray-400 text-sm">{club.descripcion}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  club.estado === 'activo' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {club.estado}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">Miembros</span>
                  </div>
                  <span className="text-white font-semibold">{club.miembros}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300 text-sm">Saldo</span>
                  </div>
                  <span className="text-white font-semibold">${club.saldoColectivo.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300 text-sm">Exitosas</span>
                  </div>
                  <span className="text-white font-semibold">{club.jugadasExitosas}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link
                  href={`/clubs/${club.id}`}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-center"
                >
                  Ver Club
                </Link>
                <button className="bg-gray-700 text-white py-2 px-3 rounded-lg hover:bg-gray-600 transition-colors">
                  ⚙️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {clubs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No hay clubs disponibles</h3>
            <p className="text-gray-400 mb-6">Crea tu primer club o únete a uno existente</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Crear Mi Primer Club
            </button>
          </div>
        )}
      </div>

      {/* Create Club Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Crear Nuevo Club</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre del Club
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ej: Lucky Winners Team"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe el propósito de tu club..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Aporte Mínimo ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Aporte Máximo ($)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoaprobacion"
                  className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="autoaprobacion" className="text-sm text-gray-300">
                  Auto-aprobación de jugadas
                </label>
              </div>
            </form>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Crear Club
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
