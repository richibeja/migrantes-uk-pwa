'use client';

import { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Calendar, Star, Plus, Settings, Bell, Camera, Share2, Check, Clock } from 'lucide-react';
import InviteMembers from '@/components/clubs/InviteMembers';

interface Club {
  id: string;
  nombre: string;
  descripcion: string;
  miembros: number;
  saldoColectivo: number;
  jugadasExitosas: number;
  fechaCreacion: string;
  estado: 'activo' | 'inactivo';
  administrador: string;
  configuracion: {
    aporteMinimo: number;
    aporteMaximo: number;
    autoaprobacion: boolean;
  };
}

interface Miembro {
  id: string;
  nombre: string;
  email: string;
  rol: 'administrador' | 'miembro';
  saldoPersonal: number;
  aportesTotales: number;
  premiosRecibidos: number;
  fechaIngreso: string;
}

interface Jugada {
  id: string;
  numeros: number[];
  loteria: string;
  inversionTotal: number;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'completada';
  fechaCreacion: string;
  creador: string;
  aprobaciones: number;
  rechazos: number;
}

interface ClubDashboardClientProps {
  clubId: string;
}

export default function ClubDashboardClient({ clubId }: ClubDashboardClientProps) {

  const [club, setClub] = useState<Club | null>(null);
    return (
  const [miembros, setMiembros] = useState<Miembro[]>([]);
  const [jugadas, setJugadas] = useState<Jugada[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'plays' | 'settings'>('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Mock data for development
  useEffect(() => {
    const mockClub: Club = {
      id: clubId,
      nombre: 'VIP Winners Club',
      descripcion: 'Exclusive club for experienced players',
      miembros: 12,
      saldoColectivo: 2500,
      jugadasExitosas: 8,
      fechaCreacion: '2025-01-10',
      estado: 'activo',
      administrador: 'admin1',
      configuracion: {
        aporteMinimo: 50,
        aporteMaximo: 500,
        autoaprobacion: false
      }
    };

    const mockMiembros: Miembro[] = [
      {
        id: '1',
        nombre: 'Carlos Rodriguez',
        email: 'carlos@email.com',
        rol: 'administrador',
        saldoPersonal: 150,
        aportesTotales: 500,
        premiosRecibidos: 1200,
        fechaIngreso: '2025-01-10'
      },
      {
        id: '2',
        nombre: 'Maria Garcia',
        email: 'maria@email.com',
        rol: 'miembro',
        saldoPersonal: 75,
        aportesTotales: 300,
        premiosRecibidos: 800,
        fechaIngreso: '2025-01-12'
      },
      {
        id: '3',
        nombre: 'Ana Martinez',
        email: 'ana@email.com',
        rol: 'miembro',
        saldoPersonal: 100,
        aportesTotales: 400,
        premiosRecibidos: 600,
        fechaIngreso: '2025-01-15'
      }
    ];

    const mockJugadas: Jugada[] = [
      {
        id: '1',
        numeros: [7, 15, 23, 31, 42],
        loteria: 'Powerball',
        inversionTotal: 250,
        estado: 'aprobada',
        fechaCreacion: '2025-01-20',
        creador: 'Carlos Rodriguez',
        aprobaciones: 8,
        rechazos: 0
      },
      {
        id: '2',
        numeros: [3, 11, 19, 27, 35],
        loteria: 'Mega Millions',
        inversionTotal: 200,
        estado: 'pendiente',
        fechaCreacion: '2025-01-21',
        creador: 'Maria Garcia',
        aprobaciones: 5,
        rechazos: 1
      }
    ];

    setTimeout(() => {
      setClub(mockClub);
      setMiembros(mockMiembros);
      setJugadas(mockJugadas);
      setIsLoading(false);
    }, 1000);
  }, [clubId]);

  const handleInviteMembers = () => {
    setShowInviteModal(true);
  };

  if (isLoading) {
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Loading Club...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Club Not Found</h1>
          <p className="text-gray-400">The requested club could not be found.</p>
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
              <h1 className="text-2xl font-bold text-gold">{club.nombre}</h1>
              <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">EN</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                club.estado === 'activo' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}>
                {club.estado}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={`/clubs/${clubId}`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🇪🇸 Spanish
              </a>
              <button
                onClick={handleInviteMembers}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Invite Members</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'members', label: 'Members', icon: Users },
              { id: 'plays', label: 'Plays', icon: Star },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Club Info */}
            <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Club Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300">{club.descripcion}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Configuration</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min Contribution:</span>
                      <span className="text-white">${club.configuracion.aporteMinimo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Contribution:</span>
                      <span className="text-white">${club.configuracion.aporteMaximo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Auto-approval:</span>
                      <span className="text-white">{club.configuracion.autoaprobacion ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{club.miembros}</div>
                    <div className="text-gray-400 text-sm">Members</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">${club.saldoColectivo.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Collective Balance</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{club.jugadasExitosas}</div>
                    <div className="text-gray-400 text-sm">Successful Plays</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {new Date(club.fechaCreacion).toLocaleDateString()}
                    </div>
                    <div className="text-gray-400 text-sm">Created</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {jugadas.slice(0, 3).map((jugada) => (
                  <div key={jugada.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gold text-black rounded-full flex items-center justify-center font-bold">
                        {jugada.numeros[0]}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{jugada.loteria}</div>
                        <div className="text-gray-400 text-sm">
                          Numbers: {jugada.numeros.join(', ')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">${jugada.inversionTotal}</div>
                      <div className={`text-sm ${
                        jugada.estado === 'aprobada' ? 'text-green-400' :
                        jugada.estado === 'pendiente' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {jugada.estado}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href={`/clubs-en/${clubId}/my-tickets`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-3"
              >
                <Camera className="w-8 h-8" />
                <div>
                  <div className="font-bold text-lg">My Tickets</div>
                  <div className="text-blue-200 text-sm">Manage your lottery tickets</div>
                </div>
              </a>
              
              <a
                href={`/clubs-en/${clubId}/admin/tickets`}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center space-x-3"
              >
                <Settings className="w-8 h-8" />
                <div>
                  <div className="font-bold text-lg">Admin Tickets</div>
                  <div className="text-green-200 text-sm">Review and approve tickets</div>
                </div>
              </a>
              
              <button
                onClick={handleInviteMembers}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-3"
              >
                <Share2 className="w-8 h-8" />
                <div>
                  <div className="font-bold text-lg">Invite Members</div>
                  <div className="text-purple-200 text-sm">Share club invitation</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Members</h2>
              <button
                onClick={handleInviteMembers}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Invite Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {miembros.map((miembro) => (
                <div key={miembro.id} className="bg-gray-800/90 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center font-bold text-lg">
                      {miembro.nombre.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{miembro.nombre}</div>
                      <div className="text-gray-400 text-sm">{miembro.email}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Role:</span>
                      <span className={`font-semibold ${
                        miembro.rol === 'administrador' ? 'text-gold' : 'text-white'
                      }`}>
                        {miembro.rol}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Personal Balance:</span>
                      <span className="text-white">${miembro.saldoPersonal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Contributions:</span>
                      <span className="text-white">${miembro.aportesTotales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prizes Received:</span>
                      <span className="text-green-400">${miembro.premiosRecibidos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Join Date:</span>
                      <span className="text-white">
                        {new Date(miembro.fechaIngreso).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'plays' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Recent Plays</h2>
            
            <div className="space-y-4">
              {jugadas.map((jugada) => (
                <div key={jugada.id} className="bg-gray-800/90 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-white font-semibold text-lg">{jugada.loteria}</div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        jugada.estado === 'aprobada' ? 'bg-green-600 text-white' :
                        jugada.estado === 'pendiente' ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {jugada.estado}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">${jugada.inversionTotal}</div>
                      <div className="text-gray-400 text-sm">
                        {new Date(jugada.fechaCreacion).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    {jugada.numeros.map((numero, index) => (
                      <div key={index} className="w-10 h-10 bg-gold text-black rounded-full flex items-center justify-center font-bold">
                        {numero}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-400">
                      Created by: <span className="text-white">{jugada.creador}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">{jugada.aprobaciones}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400">{jugada.rechazos}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Club Settings</h2>
            
            <div className="bg-gray-800/90 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Minimum Contribution</div>
                    <div className="text-gray-400 text-sm">Minimum amount members can contribute</div>
                  </div>
                  <div className="text-white font-semibold">${club.configuracion.aporteMinimo}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Maximum Contribution</div>
                    <div className="text-gray-400 text-sm">Maximum amount members can contribute</div>
                  </div>
                  <div className="text-white font-semibold">${club.configuracion.aporteMaximo}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Auto-approval</div>
                    <div className="text-gray-400 text-sm">Automatically approve new plays</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    club.configuracion.autoaprobacion ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {club.configuracion.autoaprobacion ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite Modal */}
      <InviteMembers
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        clubId={clubId}
        clubName={club.nombre}
      />
    </div>
  );
}
