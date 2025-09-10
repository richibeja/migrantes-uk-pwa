'use client';

import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Plus, 
  Check, 
  XCircle, 
  Calendar,
  DollarSign,
  Star,
  Trash2,
  Download,
  Share2,
  Eye
} from 'lucide-react';

interface DigitalTicket {
  id: string;
  lotteryId: string;
  lotteryName: string;
  numbers: number[];
  specialNumbers?: number[];
  drawDate: string;
  drawTime: string;
  confidence: number;
  status: 'pending' | 'won' | 'lost' | 'expired';
  winnings?: number;
  createdAt: string;
  predictionId: string;
}

export default function DigitalTickets() {
  const [tickets, setTickets] = useState<DigitalTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<DigitalTicket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'won' | 'lost'>('all');

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setIsLoading(true);
    
    // Simular carga de boletos
    setTimeout(() => {
      const mockTickets: DigitalTicket[] = [
        {
          id: '1',
          lotteryId: 'powerball',
          lotteryName: 'Powerball',
          numbers: [7, 14, 21, 28, 35],
          specialNumbers: [12],
          drawDate: '2024-01-15',
          drawTime: '22:59',
          confidence: 94,
          status: 'won',
          winnings: 1500,
          createdAt: '2024-01-14T10:30:00Z',
          predictionId: 'pred-1'
        },
        {
          id: '2',
          lotteryId: 'mega-millions',
          lotteryName: 'Mega Millions',
          numbers: [3, 11, 19, 27, 42],
          specialNumbers: [8],
          drawDate: '2024-01-16',
          drawTime: '23:00',
          confidence: 87,
          status: 'pending',
          createdAt: '2024-01-15T14:20:00Z',
          predictionId: 'pred-2'
        },
        {
          id: '3',
          lotteryId: 'euromillions',
          lotteryName: 'EuroMillions',
          numbers: [5, 12, 18, 25, 33],
          specialNumbers: [2, 9],
          drawDate: '2024-01-12',
          drawTime: '21:00',
          confidence: 91,
          status: 'lost',
          createdAt: '2024-01-11T16:45:00Z',
          predictionId: 'pred-3'
        },
        {
          id: '4',
          lotteryId: 'baloto',
          lotteryName: 'Baloto',
          numbers: [1, 8, 15, 22, 29, 36],
          specialNumbers: [7],
          drawDate: '2024-01-10',
          drawTime: '21:00',
          confidence: 89,
          status: 'won',
          winnings: 2500,
          createdAt: '2024-01-09T12:15:00Z',
          predictionId: 'pred-4'
        },
        {
          id: '5',
          lotteryId: 'lotto-uk',
          lotteryName: 'Lotto UK',
          numbers: [4, 13, 21, 30, 38, 47],
          specialNumbers: [15],
          drawDate: '2024-01-18',
          drawTime: '20:30',
          confidence: 85,
          status: 'pending',
          createdAt: '2024-01-17T09:30:00Z',
          predictionId: 'pred-5'
        }
      ];
      
      setTickets(mockTickets);
      setIsLoading(false);
    }, 1000);
  };

  const createTicketFromPrediction = (predictionId: string) => {
    // Simular creación de boleto desde predicción
    const newTicket: DigitalTicket = {
      id: Date.now().toString(),
      lotteryId: 'powerball',
      lotteryName: 'Powerball',
      numbers: [2, 9, 16, 23, 31],
      specialNumbers: [5],
      drawDate: '2024-01-20',
      drawTime: '22:59',
      confidence: 92,
      status: 'pending',
      createdAt: new Date().toISOString(),
      predictionId
    };
    
    setTickets(prev => [newTicket, ...prev]);
  };

  const deleteTicket = (ticketId: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'won': return <Check className="w-5 h-5 text-green-500" />;
      case 'lost': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'expired': return <XCircle className="w-5 h-5 text-gray-500" />;
      default: return <Calendar className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'won': return 'Ganador';
      case 'lost': return 'No ganador';
      case 'expired': return 'Expirado';
      default: return 'Pendiente';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const totalWinnings = tickets
    .filter(ticket => ticket.status === 'won')
    .reduce((sum, ticket) => sum + (ticket.winnings || 0), 0);

  const pendingTickets = tickets.filter(ticket => ticket.status === 'pending').length;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Ticket className="w-8 h-8 text-yellow-500" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Boletos Digitales</h2>
            <p className="text-gray-600">Gestiona tus jugadas registradas</p>
          </div>
        </div>
        
        <button
          onClick={() => createTicketFromPrediction('new')}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Boleto</span>
        </button>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Boletos</p>
              <p className="text-3xl font-bold">{tickets.length}</p>
            </div>
            <Ticket className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pendientes</p>
              <p className="text-3xl font-bold">{pendingTickets}</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Ganancias</p>
              <p className="text-3xl font-bold">${totalWinnings.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Tasa de Éxito</p>
              <p className="text-3xl font-bold">
                {Math.round((tickets.filter(t => t.status === 'won').length / tickets.length) * 100)}%
              </p>
            </div>
            <Star className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex space-x-2">
        {(['all', 'pending', 'won', 'lost'] as const).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterType
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterType === 'all' ? 'Todos' : 
             filterType === 'pending' ? 'Pendientes' :
             filterType === 'won' ? 'Ganadores' : 'No Ganadores'}
          </button>
        ))}
      </div>

      {/* Lista de Boletos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedTicket(ticket)}
          >
            {/* Header del Boleto */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(ticket.status)}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {getStatusText(ticket.status)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTicket(ticket);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTicket(ticket.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Información de la Lotería */}
            <div className="mb-4">
              <h3 className="font-bold text-gray-900">{ticket.lotteryName}</h3>
              <p className="text-sm text-gray-600">
                {new Date(ticket.drawDate).toLocaleDateString('es-ES')} a las {ticket.drawTime}
              </p>
            </div>

            {/* Números */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {ticket.numbers.map((number, index) => (
                  <span
                    key={index}
                    className="w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    {number}
                  </span>
                ))}
              </div>
              {ticket.specialNumbers && (
                <div className="flex gap-2">
                  {ticket.specialNumbers.map((number, index) => (
                    <span
                      key={index}
                      className="w-8 h-8 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-bold"
                    >
                      {number}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Confianza y Ganancias */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">
                  {ticket.confidence}% confianza
                </span>
              </div>
              {ticket.winnings && (
                <div className="text-green-600 font-bold">
                  +${ticket.winnings.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalle del Boleto */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Detalle del Boleto</h3>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Información General */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Información General</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lotería:</span>
                    <span className="font-medium">{selectedTicket.lotteryName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha del Sorteo:</span>
                    <span className="font-medium">
                      {new Date(selectedTicket.drawDate).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hora:</span>
                    <span className="font-medium">{selectedTicket.drawTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                      {getStatusText(selectedTicket.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Números del Boleto */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Números del Boleto</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Números Principales:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.numbers.map((number, index) => (
                        <span
                          key={index}
                          className="w-10 h-10 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center text-sm font-bold"
                        >
                          {number}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedTicket.specialNumbers && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Números Especiales:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTicket.specialNumbers.map((number, index) => (
                          <span
                            key={index}
                            className="w-10 h-10 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-sm font-bold"
                          >
                            {number}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Estadísticas */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Estadísticas</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confianza de la Predicción:</span>
                    <span className="font-medium text-yellow-600">{selectedTicket.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Creado:</span>
                    <span className="font-medium">
                      {new Date(selectedTicket.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  {selectedTicket.winnings && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ganancias:</span>
                      <span className="font-medium text-green-600">
                        +${selectedTicket.winnings.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Descargar</span>
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
