'use client';

import { useState, useEffect } from 'react';
import { 
  getAllExcelCodes, 
  getExcelStats, 
  addExcelCode, 
  resetExcelCode, 
  exportToExcel, 
  exportUsedCodesToExcel,
  generateRandomExcelCode,
  ExcelCode 
} from '@/lib/excel-codes';
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
      case 'premium': return <Crown className="w-4 h-4 text-purple-400" />;
  const [codes, setCodes] = useState<ExcelCode[]>([]);
  const [stats, setStats] = useState<any>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newType, setNewType] = useState<'premium' | 'vip' | 'basic'>('premium');
  const [newExpiration, setNewExpiration] = useState('2024-12-31');
  const [message, setMessage] = useState('');
  const [showUsedOnly, setShowUsedOnly] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const allCodes = getAllExcelCodes();
    setCodes(allCodes);
    setStats(getExcelStats());
  };

  const handleAddCode = () => {
    if (!newCode.trim()) {
      setMessage('❌ Ingresa un código válido');
      return;
    }

    const success = addExcelCode(newCode, newType, newExpiration);
    if (success) {
      setMessage(`✅ Código ${newCode} agregado exitosamente`);
      setNewCode('');
      loadData();
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('❌ El código ya existe');
    }
  };

  const handleGenerateRandom = () => {
    const randomCode = generateRandomExcelCode(newType);
    setNewCode(randomCode);
  };

  const handleResetCode = (code: string) => {
    const success = resetExcelCode(code);
    if (success) {
      setMessage(`✅ Código ${code} reseteado exitosamente`);
      loadData();
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('❌ Error al resetear el código');
    }
  };

  const handleExportAll = () => {
    const csvData = exportToExcel();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todos_los_codigos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    setMessage('📊 Todos los códigos exportados');
  };

  const handleExportUsed = () => {
    const csvData = exportUsedCodesToExcel();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codigos_usados_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    setMessage('📊 Códigos usados exportados');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vip': return <Star className="w-4 h-4 text-yellow-400" />;
      case 'basic': return <Zap className="w-4 h-4 text-blue-400" />;
      default: return <Key className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'vip': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'basic': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCodes = showUsedOnly ? codes.filter(c => c.used) : codes;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">📊 Admin Simple - Excel</h1>
              <p className="text-gray-300">Sistema simple sin base de datos para gestión de códigos</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </button>
              <a
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ← Admin Principal
              </a>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center">
                <Key className="w-8 h-8 text-blue-400 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Total Códigos</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Disponibles</p>
                  <p className="text-2xl font-bold text-white">{stats.available}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-400 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Usados</p>
                  <p className="text-2xl font-bold text-white">{stats.used}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-400 mr-3" />
                <div>
                  <p className="text-gray-300 text-sm">Porcentaje</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.total > 0 ? Math.round((stats.used / stats.total) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-900/30 text-green-200 border border-green-500/50' : 
            message.includes('📊') ? 'bg-blue-900/30 text-blue-200 border border-blue-500/50' : 
            'bg-red-900/30 text-red-200 border border-red-500/50'
          }`}>
            {message}
          </div>
        )}

        {/* Controles */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Código
              </button>
              
              <button
                onClick={() => setShowUsedOnly(!showUsedOnly)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  showUsedOnly 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                {showUsedOnly ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showUsedOnly ? 'Ver Todos' : 'Solo Usados'}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExportAll}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Todos
              </button>
              
              <button
                onClick={handleExportUsed}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Usados
              </button>
            </div>
          </div>

          {/* Formulario de agregar código */}
          {showAddForm && (
            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-4">Agregar Nuevo Código</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Código</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                      placeholder="GANA1234"
                      className="flex-1 px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleGenerateRandom}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded transition-colors"
                      title="Generar aleatorio"
                    >
                      🎲
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Tipo</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                    <option value="basic">Básico</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Expiración</label>
                  <input
                    type="date"
                    value={newExpiration}
                    onChange={(e) => setNewExpiration(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={handleAddCode}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de códigos */}
        <div className="bg-gray-800/70 border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Lista de Códigos {showUsedOnly ? '(Solo Usados)' : '(Todos)'}
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4 text-gray-300">Código</th>
                  <th className="text-left py-3 px-4 text-gray-300">Tipo</th>
                  <th className="text-left py-3 px-4 text-gray-300">Estado</th>
                  <th className="text-left py-3 px-4 text-gray-300">Email Usuario</th>
                  <th className="text-left py-3 px-4 text-gray-300">Fecha Activación</th>
                  <th className="text-left py-3 px-4 text-gray-300">Expiración</th>
                  <th className="text-left py-3 px-4 text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCodes.map((code, index) => (
                  <tr key={index} className="border-b border-gray-600/50">
                    <td className="py-3 px-4 text-white font-mono">{code.code}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(code.type)}`}>
                        {getTypeIcon(code.type)}
                        <span className="ml-1 capitalize">{code.type}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {code.used ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3 mr-1" />
                          Usado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Disponible
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-300">{code.usedBy || '-'}</td>
                    <td className="py-3 px-4 text-gray-300">{code.usedAt || '-'}</td>
                    <td className="py-3 px-4 text-gray-300">{code.expiration}</td>
                    <td className="py-3 px-4">
                      {code.used && (
                        <button
                          onClick={() => handleResetCode(code.code)}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded text-xs transition-colors"
                          title="Resetear código"
                        >
                          <RefreshCw className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCodes.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              {showUsedOnly ? 'No hay códigos usados' : 'No hay códigos disponibles'}
            </div>
          )}
        </div>

        {/* Enlaces útiles */}
        <div className="mt-6 text-center">
          <div className="flex justify-center gap-4">
            <a href="/activate-simple" className="text-blue-400 hover:text-blue-300 text-sm">
              🔗 Página de Activación Simple
            </a>
            <a href="/activate" className="text-purple-400 hover:text-purple-300 text-sm">
              🔗 Página de Activación Principal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
