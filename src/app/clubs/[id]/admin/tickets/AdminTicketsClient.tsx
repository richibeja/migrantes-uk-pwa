'use client';

import { useState, useEffect } from 'react';
import { Check, XCircle, Clock, Eye, User, Calendar, DollarSign, MapPin, AlertCircle } from 'lucide-react';
import { ClubTicket } from '@/types/clubs';

interface AdminTicketsClientProps {
  clubId: string;
}

export default function AdminTicketsClient({ clubId }: AdminTicketsClientProps) {
  const [tickets, setTickets] = useState<ClubTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'todos' | 'pendientes' | 'verificados' | 'rechazados'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<ClubTicket | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data for development
  useEffect(() => {
    const mockTickets: ClubTicket[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Carlos Rodriguez',
        clubId: clubId,
        fotoTicket: '/api/placeholder/300/200',
        numeros: [7, 15, 23, 31, 42],
        fechaCompra: new Date('2025-01-15'),
        fechaSubida: new Date('2025-01-15'),
        estado: 'verificado',
        datosVerificacion: {
          fechaSorteo: new Date('2025-01-16'),
          loteria: 'Powerball',
          montoPagado: 25,
          localCompra: '7-Eleven',
          horaCompra: '14:30'
        },
        verificacion: {
          verificadoPor: 'admin1',
          fechaVerificacion: new Date('2025-01-15'),
          comentarios: 'Ticket verificado correctamente'
        }
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Maria Garcia',
        clubId: clubId,
        fotoTicket: '/api/placeholder/300/200',
        numeros: [3, 11, 19, 27, 35],
        fechaCompra: new Date('2025-01-14'),
        fechaSubida: new Date('2025-01-14'),
        estado: 'pendiente',
        datosVerificacion: {
          fechaSorteo: new Date('2025-01-17'),
          loteria: 'Mega Millions',
          montoPagado: 20,
          localCompra: 'CVS Pharmacy',
          horaCompra: '09:15'
        }
      },
      {
        id: '3',
        userId: 'user3',
        userName: 'Ana Martinez',
        clubId: clubId,
        fotoTicket: '/api/placeholder/300/200',
        numeros: [2, 9, 16, 24, 33],
        fechaCompra: new Date('2025-01-13'),
        fechaSubida: new Date('2025-01-13'),
        estado: 'rechazado',
        datosVerificacion: {
          fechaSorteo: new Date('2025-01-15'),
          loteria: 'EuroMillions',
          montoPagado: 15,
          localCompra: 'Walmart',
          horaCompra: '16:45'
        },
        verificacion: {
          verificadoPor: 'admin1',
          fechaVerificacion: new Date('2025-01-13'),
          comentarios: 'Foto no se ve claramente',
          motivoRechazo: 'Imagen borrosa'
        }
      }
    ];

    setTimeout(() => {
      setTickets(mockTickets);
      setIsLoading(false);
    }, 1000);
  }, [clubId]);

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'verificado':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'rechazado':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'pendiente':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'verificado':
        return 'bg-green-600 text-white';
      case 'rechazado':
        return 'bg-red-600 text-white';
      case 'pendiente':
        return 'bg-yellow-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const handleApprove = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            estado: 'verificado' as const,
            verificacion: {
              verificadoPor: 'admin1',
              fechaVerificacion: new Date(),
              comentarios: 'Aprobado por administrador'
            }
          }
        : ticket
    ));
  };

  const handleReject = (ticketId: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            estado: 'rechazado' as const,
            verificacion: {
              verificadoPor: 'admin1',
              fechaVerificacion: new Date(),
              comentarios: 'Rechazado por administrador',
              motivoRechazo: 'No cumple con los requisitos'
            }
          }
        : ticket
    ));
  };

  const ticketsPendientes = tickets.filter(t => t.estado === 'pendiente').length;
  const ticketsFiltrados = tickets.filter(ticket => {
    const matchesFilter = filter === 'todos' || ticket.estado === filter;
    const matchesSearch = searchTerm === '' || 
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.datosVerificacion.loteria.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gold text-xl">Cargando tickets...</p>
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
              <h1 className="text-2xl font-bold text-gold">Verificación de Tickets</h1>
              {ticketsPendientes > 0 && (
                <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {ticketsPendientes} pendientes
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <a
                href={`/clubs-en/${clubId}/admin/tickets`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                🇺🇸 English
              </a>
              <div className="text-sm text-gray-400">
                Club {clubId} - Panel de Administración
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-2">
              <Check className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-xl font-bold text-white">
                  {tickets.filter(t => t.estado === 'verificado').length}
                </div>
                <div className="text-gray-400 text-sm">Verificados</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-yellow-400" />
              <div>
                <div className="text-xl font-bold text-white">
                  {tickets.filter(t => t.estado === 'pendiente').length}
                </div>
                <div className="text-gray-400 text-sm">Pendientes</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-2">
              <XCircle className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-xl font-bold text-white">
                  {tickets.filter(t => t.estado === 'rechazado').length}
                </div>
                <div className="text-gray-400 text-sm">Rechazados</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/90 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-purple-400" />
              <div>
                <div className="text-xl font-bold text-white">{tickets.length}</div>
                <div className="text-gray-400 text-sm">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'pendientes', label: 'Pendientes', count: tickets.filter(t => t.estado === 'pendiente').length },
            { id: 'todos', label: 'Todos', count: tickets.length },
            { id: 'verificados', label: 'Verificados', count: tickets.filter(t => t.estado === 'verificado').length },
            { id: 'rechazados', label: 'Rechazados', count: tickets.filter(t => t.estado === 'rechazado').length }
          ].map((filtro) => (
            <button
              key={filtro.id}
              onClick={() => setFilter(filtro.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === filtro.id
                  ? 'bg-gold text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filtro.label} ({filtro.count})
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Tickets */}
      <div className="container mx-auto px-4 pb-8">
        {ticketsFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No hay tickets</h3>
            <p className="text-gray-400">
              {filter === 'todos' 
                ? 'No se han enviado tickets aún'
                : `No hay tickets ${filter}`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {ticketsFiltrados.map((ticket) => (
              <div key={ticket.id} className="bg-gray-800/90 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  {/* Foto del ticket */}
                  <div className="flex-shrink-0">
                    <img 
                      src={ticket.fotoTicket} 
                      alt="Ticket" 
                      className="w-24 h-32 object-cover rounded-lg border border-gray-600"
                    />
                  </div>

                  {/* Información del ticket */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getEstadoIcon(ticket.estado)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(ticket.estado)}`}>
                          {ticket.estado}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(ticket.fechaSubida).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Usuario</div>
                        <div className="text-white font-semibold">{ticket.userName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Lotería</div>
                        <div className="text-white font-semibold">{ticket.datosVerificacion.loteria}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Monto</div>
                        <div className="text-white font-semibold">${ticket.datosVerificacion.montoPagado}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">Local</div>
                        <div className="text-white font-semibold">{ticket.datosVerificacion.localCompra}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-1">Números</div>
                      <div className="flex flex-wrap gap-1">
                        {ticket.numeros.map((numero, index) => (
                          <div key={index} className="w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold text-sm">
                            {numero}
                          </div>
                        ))}
                      </div>
                    </div>

                    {ticket.verificacion && (
                      <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                        <div className="text-sm text-gray-400 mb-1">Detalles de Verificación</div>
                        <div className="text-white text-sm mb-1">
                          {ticket.verificacion.comentarios}
                        </div>
                        {ticket.verificacion.motivoRechazo && (
                          <div className="text-red-400 text-sm">
                            Motivo: {ticket.verificacion.motivoRechazo}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Botones de acción */}
                    {ticket.estado === 'pendiente' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(ticket.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <Check className="w-4 h-4" />
                          <span>Aprobar</span>
                        </button>
                        <button
                          onClick={() => handleReject(ticket.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Rechazar</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}