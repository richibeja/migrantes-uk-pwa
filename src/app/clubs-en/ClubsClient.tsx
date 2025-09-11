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

export default function ClubsClient() {
    return (
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Simulate current user (in production would come from auth context)
  const currentUser = {
    id: 'user1',
    planId: 'basico' // Current user's plan
  };
  
  const currentPlan = getCurrentPlan(currentUser);
  const canCreateClub = puedeCrearClub(currentUser, clubs.length);

  // Mock data for development
  useEffect(() => {
    const mockClubs: Club[] = [
      {
        id: '1',
        nombre: 'VIP Winners Club',
        descripcion: 'Exclusive club for experienced players',
        miembros: 12,
        saldoColectivo: 2500,
        jugadasExitosas: 8,
        fechaCreacion: '2025-01-10',
        estado: 'activo'
      },
      {
        id: '2',
        nombre: 'Lucky Numbers Team',
        descripcion: 'Team focused on statistical analysis',
        miembros: 8,
        saldoColectivo: 1800,
        jugadasExitosas: 5,
        fechaCreacion: '2025-01-08',
        estado: 'activo'
      },
      {
        id: '3',
        nombre: 'Mega Winners',
        descripcion: 'Club specialized in Mega Millions',
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Loading Clubs...</p>
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
              <h1 className="text-2xl font-bold text-gold">🎯 ANBEL Clubs</h1>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">EN</span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="/clubs"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🇪🇸 Español
              </a>
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
                  {canCreateClub ? 'Create Club' : 'Limit Reached'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Explanation */}
      <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">How Do ANBEL Clubs Work?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join teams of expert players and increase your chances of winning with collective strategies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-white mb-3">Join by Invitation</h3>
              <p className="text-gray-300 mb-4">Receive a unique link from a club member and join instantly</p>
              <a
                href="/join-en"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Join Now</span>
              </a>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-3">Collective Balance</h3>
              <p className="text-gray-300 mb-4">All members contribute to buy more tickets and increase chances</p>
              <div className="text-2xl font-bold text-yellow-400">
                ${clubs.reduce((sum, club) => sum + club.saldoColectivo, 0).toLocaleString()}
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">Group Strategies</h3>
              <p className="text-gray-300 mb-4">Joint analysis of numbers and more accurate predictions</p>
              <div className="text-2xl font-bold text-purple-400">
                {clubs.reduce((sum, club) => sum + club.jugadasExitosas, 0)} Successful Plays
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
                <div className="text-gray-400 text-sm">Active Clubs</div>
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
                <div className="text-gray-400 text-sm">Total Members</div>
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
                <div className="text-gray-400 text-sm">Collective Balance</div>
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
                <div className="text-gray-400 text-sm">Successful Plays</div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Plan Info */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-4 mb-8 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {currentPlan?.id === 'vip' && <Crown className="w-6 h-6 text-gold" />}
              {currentPlan?.id === 'premium' && <Zap className="w-6 h-6 text-purple-400" />}
              {currentPlan?.id === 'basico' && <Zap className="w-6 h-6 text-blue-400" />}
              {currentPlan?.id === 'gratis' && <Gift className="w-6 h-6 text-gray-400" />}
              <div>
                <h3 className="text-lg font-semibold text-white">{currentPlan?.nombre}</h3>
                <p className="text-gray-300 text-sm">
                  {canCreateClub 
                    ? `You can create ${currentPlan?.limiteClubs === -1 ? 'unlimited' : currentPlan?.limiteClubs - clubs.length} more clubs`
                    : 'You have reached your club limit'
                  }
                </p>
              </div>
            </div>
            {!canCreateClub && (
              <a
                href="/account/subscriptions-en"
                className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300"
              >
                Upgrade Plan
              </a>
            )}
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <Link key={club.id} href={`/clubs-en/${club.id}`}>
              <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{club.nombre}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    club.estado === 'activo' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {club.estado}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-4">{club.descripcion}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Members</div>
                    <div className="text-white font-semibold">{club.miembros}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Balance</div>
                    <div className="text-white font-semibold">${club.saldoColectivo.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Wins</div>
                    <div className="text-white font-semibold">{club.jugadasExitosas}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Created</div>
                    <div className="text-white font-semibold">{new Date(club.fechaCreacion).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {clubs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No clubs yet</h3>
            <p className="text-gray-400 mb-6">Create your first club to start playing together</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Create My First Club
            </button>
          </div>
        )}
      </div>

      {/* Create Club Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Club</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Club Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter club name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your club's purpose"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Create Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
