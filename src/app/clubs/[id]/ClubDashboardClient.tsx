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
  const [miembros, setMiembros] = useState<Miembro[]>([]);
  const [jugadas, setJugadas] = useState<Jugada[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Datos de ejemplo para desarrollo
  useEffect(() => {
    const mockClub: Club = {
      id: clubId,
      nombre: 'Club Ganadores VIP',
      descripcion: 'Club exclusivo para jugadores experimentados con enfoque en análisis avanzado',
      miembros: 12,
      saldoColectivo: 2500,
      jugadasExitosas: 8,
      fechaCreacion: '2025-01-10',
      estado: 'activo',
      administrador: 'user1',
      configuracion: {
        aporteMinimo: 25,
        aporteMaximo: 100,
        autoaprobacion: false
      }
    };

    const mockMiembros: Miembro[] = [
      {
        id: 'user1',
        nombre: 'Carlos Rodriguez',
        email: 'carlos@email.com',
        rol: 'administrador',
        saldoPersonal: 150,
        aportesTotales: 500,
        premiosRecibidos: 1200,
        fechaIngreso: '2025-01-10'
      },
      {
        id: 'user2',
        nombre: 'Maria Gonzalez',
        email: 'maria@email.com',
        rol: 'miembro',
        saldoPersonal: 75,
        aportesTotales: 300,
        premiosRecibidos: 800,
        fechaIngreso: '2025-01-11'
      },
      {
        id: 'user3',
        nombre: 'Juan Perez',
        email: 'juan@email.com',
        rol: 'miembro',
        saldoPersonal: 200,
        aportesTotales: 400,
        premiosRecibidos: 600,
        fechaIngreso: '2025-01-12'
      }
    ];

    const mockJugadas: Jugada[] = [
      {
        id: '1',
        numeros: [7, 15, 23, 31, 42],
        loteria: 'Powerball',
        inversionTotal: 120,
        estado: 'aprobada',
        fechaCreacion: '2025-01-15',
        creador: 'user1',
        aprobaciones: 8,
        rechazos: 1
      },
      {
        id: '2',
        numeros: [3, 11, 19, 27, 35],
        loteria: 'Mega Millions',
        inversionTotal: 80,
        estado: 'pendiente',
        fechaCreacion: '2025-01-14',
        creador: 'user2',
        aprobaciones: 5,
        rechazos: 0
      }
    ];

    setTimeout(() => {
      setClub(mockClub);
      setMiembros(mockMiembros);
      setJugadas(mockJugadas);
      setIsLoading(false);
    }, 1000);
  }, [clubId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Cargando Club...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Club no encontrado</h1>
          <p className="text-gray-400">El club que buscas no existe o no tienes acceso</p>
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
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                club.estado === 'activo' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {club.estado}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={`/clubs-en/${clubId}`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🇺🇸 English
              </a>
              <button className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Resumen', icon: TrendingUp },
              { id: 'jugadas', label: 'Jugadas', icon: Calendar },
              { id: 'miembros', label: 'Miembros', icon: Users },
              { id: 'tickets', label: 'Tickets', icon: Camera },
              { id: 'finanzas', label: 'Finanzas', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gold text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
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
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{club.miembros}</div>
                    <div className="text-gray-400 text-sm">Miembros</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">${club.saldoColectivo.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">Saldo Colectivo</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Star className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{club.jugadasExitosas}</div>
                    <div className="text-gray-400 text-sm">Jugadas Exitosas</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">85%</div>
                    <div className="text-gray-400 text-sm">Tasa de Éxito</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Nueva Jugada</span>
                </button>
                <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Invitar Miembros</span>
                </button>
                <button className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Gestionar Finanzas</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Nueva jugada aprobada: Powerball</span>
                  </div>
                  <span className="text-gray-400 text-sm">Hace 2 horas</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Miembro agregado: Maria Gonzalez</span>
                  </div>
                  <span className="text-gray-400 text-sm">Hace 1 día</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Premio distribuido: $1,200</span>
                  </div>
                  <span className="text-gray-400 text-sm">Hace 3 días</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jugadas Tab */}
        {activeTab === 'jugadas' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Jugadas del Club</h3>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nueva Jugada</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {jugadas.map((jugada) => (
                <div key={jugada.id} className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{jugada.loteria}</h4>
                      <p className="text-gray-400 text-sm">Creada por {jugada.creador}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      jugada.estado === 'aprobada' ? 'bg-green-600 text-white' :
                      jugada.estado === 'pendiente' ? 'bg-yellow-600 text-white' :
                      jugada.estado === 'rechazada' ? 'bg-red-600 text-white' :
                      'bg-gray-600 text-gray-300'
                    }`}>
                      {jugada.estado}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400">Números</div>
                      <div className="flex space-x-1">
                        {jugada.numeros.map((num, index) => (
                          <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Inversión Total</div>
                      <div className="text-white font-semibold">${jugada.inversionTotal}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Aprobaciones</div>
                      <div className="text-white font-semibold">{jugada.aprobaciones}/{club.miembros}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Fecha</div>
                      <div className="text-white font-semibold">{new Date(jugada.fechaCreacion).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700 transition-colors">
                      Aprobar
                    </button>
                    <button className="bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700 transition-colors">
                      Rechazar
                    </button>
                    <button className="bg-gray-600 text-white py-1 px-3 rounded text-sm hover:bg-gray-700 transition-colors">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Miembros Tab */}
        {activeTab === 'miembros' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Miembros del Club</h3>
              <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Invitar Miembros</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {miembros.map((miembro) => (
                <div key={miembro.id} className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {miembro.nombre.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{miembro.nombre}</h4>
                        <p className="text-gray-400 text-sm">{miembro.email}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      miembro.rol === 'administrador' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {miembro.rol}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Saldo Personal</div>
                      <div className="text-white font-semibold">${miembro.saldoPersonal}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Aportes Totales</div>
                      <div className="text-white font-semibold">${miembro.aportesTotales}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Premios Recibidos</div>
                      <div className="text-white font-semibold">${miembro.premiosRecibidos}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Miembro desde</div>
                      <div className="text-white font-semibold">{new Date(miembro.fechaIngreso).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Tickets del Club</h3>
              <div className="flex space-x-2">
                <a
                  href={`/clubs/${clubId}/mis-tickets`}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Mis Tickets</span>
                </a>
                <a
                  href={`/clubs/${clubId}/admin/tickets`}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Verificar</span>
                </a>
              </div>
            </div>

            {/* Invite Members Component */}
            <InviteMembers 
              clubId={clubId}
              clubName={club?.nombre || 'Club'}
              currentUserId="user1"
              referralCount={3}
            />

            {/* Stats de tickets */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Check className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">24</div>
                    <div className="text-gray-400 text-sm">Verificados</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-gray-400 text-sm">Pendientes</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">$1,250</div>
                    <div className="text-gray-400 text-sm">Invertido</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">8</div>
                    <div className="text-gray-400 text-sm">Miembros Activos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tickets recientes */}
            <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
              <h4 className="text-lg font-semibold text-white mb-4">Tickets Recientes</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Carlos Rodriguez - Powerball verificado</span>
                  </div>
                  <span className="text-gray-400 text-sm">Hace 2 horas</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300">Maria Gonzalez - Mega Millions pendiente</span>
                  </div>
                  <span className="text-gray-400 text-sm">Hace 4 horas</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">Juan Perez - EuroMillions rechazado</span>
                  </div>
                  <span className="text-gray-400 text-sm">Hace 1 día</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Finanzas Tab */}
        {activeTab === 'finanzas' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Gestión Financiera</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Resumen Financiero</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Saldo Colectivo</span>
                    <span className="text-white font-semibold">${club.saldoColectivo.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aportes Totales</span>
                    <span className="text-white font-semibold">$5,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Premios Distribuidos</span>
                    <span className="text-green-400 font-semibold">$2,600</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-3">
                    <span className="text-gray-400">ROI del Club</span>
                    <span className="text-green-400 font-semibold">+50%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Configuración</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aporte Mínimo</span>
                    <span className="text-white font-semibold">${club.configuracion.aporteMinimo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aporte Máximo</span>
                    <span className="text-white font-semibold">${club.configuracion.aporteMaximo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Auto-aprobación</span>
                    <span className={`font-semibold ${club.configuracion.autoaprobacion ? 'text-green-400' : 'text-red-400'}`}>
                      {club.configuracion.autoaprobacion ? 'Activada' : 'Desactivada'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
