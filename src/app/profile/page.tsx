'use client';

import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Bell, 
  Shield,
  CreditCard,
  History,
  Star,
  Award,
  Edit,
  Save,
  X
} from 'lucide-react';

export default function ProfilePage() {

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'Usuario Demo',
    email: 'usuario@demo.com',
    phone: '+1 234 567 8900',
    country: 'Estados Unidos',
    plan: 'Premium',
    joinDate: '2024-01-01',
    totalPredictions: 1250,
    accuracy: 87.5,
    level: 'Experto',
    points: 12500
  });

  const [editData, setEditData] = useState(user);

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">👤</div>
              <div>
                <h1 className="text-3xl font-bold text-gold">PERFIL</h1>
                <p className="text-gray-300">Gestiona tu cuenta y preferencias</p>
              </div>
            </div>
            
            <a
              href="/dashboard"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Volver al Dashboard
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Información Personal</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Guardar</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                    />
                  ) : (
                    <div className="text-white">{user.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                    />
                  ) : (
                    <div className="text-white">{user.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                    />
                  ) : (
                    <div className="text-white">{user.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">País</label>
                  {isEditing ? (
                    <select
                      value={editData.country}
                      onChange={(e) => setEditData({...editData, country: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gold focus:outline-none"
                    >
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="México">México</option>
                      <option value="España">España</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Argentina">Argentina</option>
                    </select>
                  ) : (
                    <div className="text-white">{user.country}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
              <h2 className="text-xl font-bold text-white mb-6">Estadísticas de Cuenta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">{user.totalPredictions}</div>
                  <div className="text-gray-400">Predicciones Totales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{user.accuracy}%</div>
                  <div className="text-gray-400">Precisión Promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{user.level}</div>
                  <div className="text-gray-400">Nivel Actual</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{user.points}</div>
                  <div className="text-gray-400">Puntos Acumulados</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plan Info */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
              <h3 className="text-lg font-bold text-white mb-4">Plan Actual</h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold mb-2">{user.plan}</div>
                <div className="text-gray-400 text-sm mb-4">Miembro desde {user.joinDate}</div>
                <button className="w-full bg-gold text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-semibold">
                  Actualizar Plan
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
              <h3 className="text-lg font-bold text-white mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Configuración</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Notificaciones</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Seguridad</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Pagos</span>
                </button>
                <button className="w-full flex items-center space-x-3 text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                  <History className="w-5 h-5 text-gray-400" />
                  <span className="text-white">Historial</span>
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
              <h3 className="text-lg font-bold text-white mb-4">Logros</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gold" />
                  <span className="text-white text-sm">Primera Predicción</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gold" />
                  <span className="text-white text-sm">Precisión 80%+</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gold" />
                  <span className="text-white text-sm">100 Predicciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong>GANA FÁCIL</strong> - Perfil de Usuario
            </p>
            <p className="text-xs mt-1">
              Gestiona tu cuenta y personaliza tu experiencia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
