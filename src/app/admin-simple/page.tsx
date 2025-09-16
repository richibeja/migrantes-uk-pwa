'use client';

import { useState, useEffect } from 'react';
import { 
  getActivationCodes, 
  getStats, 
  addNewCode, 
  resetAllCodes, 
  exportToExcel,
  generateRandomCode,
  ActivationCode 
} from '@/lib/excel-codes';
import { toast, Toaster } from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Key, 
  Users, 
  RefreshCw, 
  Plus, 
  Download, 
  Trash2, 
  Eye, 
  EyeOff,
  CheckCircle,
  XCircle,
  Clock,
  Crown,
  Star,
  Zap
} from 'lucide-react';

export default function AdminSimplePage() {
  const [codes, setCodes] = useState<ActivationCode[]>([]);
  const [filter, setFilter] = useState<'all' | 'used' | 'unused'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newCodeType, setNewCodeType] = useState<'premium' | 'vip' | 'basic'>('basic');

  useEffect(() => {
    setCodes(getActivationCodes());
  }, []);

  const stats = getStats();

  const filteredCodes = codes.filter(code => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'used' && code.used) || 
                         (filter === 'unused' && !code.used);
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (code.usedBy && code.usedBy.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const chartData = [
    { name: 'Premium', cantidad: stats.byType.premium },
    { name: 'VIP', cantidad: stats.byType.vip },
    { name: 'Básico', cantidad: stats.byType.basic },
  ];

  const handleAddCode = () => {
    if (!newCode.trim()) {
      toast.error('Por favor, ingresa un código');
      return;
    }

    if (addNewCode(newCode, newCodeType)) {
      setCodes(getActivationCodes());
      setNewCode('');
      toast.success('Código agregado correctamente');
    } else {
      toast.error('El código ya existe');
    }
  };

  const handleGenerateRandomCode = () => {
    const randomCode = generateRandomCode();
    setNewCode(randomCode);
  };

  const handleResetAll = () => {
    if (confirm('¿Estás seguro de que quieres resetear todos los códigos?')) {
      resetAllCodes();
      setCodes(getActivationCodes());
      toast.success('Todos los códigos han sido reseteados');
    }
  };

  const handleExport = () => {
    if (exportToExcel(codes, `codigos-ganafacil`)) {
      toast.success('Exportación completada');
    } else {
      toast.error('Error en la exportación');
    }
  };

  const handleExportUsed = () => {
    const usedCodes = codes.filter(code => code.used);
    if (exportToExcel(usedCodes, `codigos-usados-ganafacil`)) {
      toast.success('Exportación completada');
    } else {
      toast.error('Error en la exportación');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">Panel de Administración - Sistema Simple</h1>
          <p className="mt-2 opacity-90">Gestiona los códigos de activación con exportación a Excel</p>
        </div>

        {/* Estadísticas */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-indigo-50">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Códigos</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">{stats.unused}</div>
            <div className="text-sm text-gray-600">Disponibles</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.used}</div>
            <div className="text-sm text-gray-600">Utilizados</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-sm text-gray-600">Exportar</div>
            <button 
              onClick={handleExport}
              className="mt-1 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              Excel
            </button>
          </div>
        </div>

        {/* Gráfico */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Distribución por Tipo</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Añadir nuevo código */}
        <div className="p-6 border-b bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Añadir Nuevo Código</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                placeholder="Nuevo código"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1">
              <select
                value={newCodeType}
                onChange={(e) => setNewCodeType(e.target.value as 'premium' | 'vip' | 'basic')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="basic">Básico</option>
                <option value="vip">VIP</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGenerateRandomCode}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Generar
              </button>
              <button
                onClick={handleAddCode}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="p-6 border-b flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por estado</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">Todos</option>
              <option value="used">Usados</option>
              <option value="unused">Disponibles</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar código o email</label>
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Lista de Códigos */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Códigos de Activación ({filteredCodes.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Activación</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCodes.map((code) => (
                  <tr key={code.code} className={code.used ? 'bg-green-50' : ''}>
                    <td className="px-4 py-3 whitespace-nowrap font-mono">{code.code}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        code.type === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                        code.type === 'vip' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {code.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        code.used ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {code.used ? 'Usado' : 'Disponible'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{code.usedBy || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {code.usedAt ? new Date(code.usedAt).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Acciones */}
        <div className="p-6 bg-gray-50 flex flex-wrap gap-4">
          <button
            onClick={handleResetAll}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Resetear Todos los Códigos
          </button>
          
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Exportar a Excel
          </button>
          
          <button
            onClick={handleExportUsed}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Exportar Solo Usados
          </button>
        </div>
      </div>
    </div>
  );
}
