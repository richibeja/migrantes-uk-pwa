'use client';

import { useState, useEffect } from 'react';
import { Plus, Copy, Trash2, Eye, EyeOff, RefreshCw, Users, Shield, Crown } from 'lucide-react';
import { invitationSystem } from '@/lib/invitation-system';

export default function InvitationsPage() {

  const [invitations, setInvitations] = useState<any[]>([]);
  return (
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState(false);
  const [newInvitation, setNewInvitation] = useState({
    plan: 'basic' as 'basic' | 'premium' | 'vip' | 'lifetime',
    maxUses: 1
  });

  useEffect(() => {
    loadInvitations();
  }, []);

  const loadInvitations = () => {
    invitationSystem.loadInvitations();
    const allInvitations = invitationSystem.getAllInvitations();
    setInvitations(allInvitations);
    setIsLoading(false);
  };

  const createInvitation = () => {
    const invitation = invitationSystem.createInvitation(
      'admin',
      newInvitation.plan,
      newInvitation.maxUses
    );
    
    setInvitations(prev => [invitation, ...prev]);
    
    // Reset form
    setNewInvitation({
      plan: 'basic',
      maxUses: 1
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteInvitation = (code: string) => {
    if (invitationSystem.deleteInvitation(code)) {
      setInvitations(prev => prev.filter(inv => inv.code !== code));
    }
  };

  const deactivateInvitation = (code: string) => {
    if (invitationSystem.deactivateInvitation(code)) {
      setInvitations(prev => 
        prev.map(inv => 
          inv.code === code ? { ...inv, isActive: false } : inv
        )
      );
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'vip': return 'bg-yellow-100 text-yellow-800';
      case 'lifetime': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'basic': return '🔵';
      case 'premium': return '🟣';
      case 'vip': return '🟡';
      case 'lifetime': return '🟢';
      default: return '⚪';
    }
  };

  if (isLoading) {
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Cargando invitaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Users className="w-16 h-16 text-purple-400" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            🎫 GESTIÓN DE INVITACIONES
          </h1>
          <p className="text-xl text-purple-200 mb-6">
            Genera y administra códigos de invitación para GANA FÁCIL
          </p>
        </div>

        {/* Crear nueva invitación */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Crear Nueva Invitación</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Plan
              </label>
              <select
                value={newInvitation.plan}
                onChange={(e) => setNewInvitation(prev => ({ ...prev, plan: e.target.value as any }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="basic">Básico</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
                <option value="lifetime">Lifetime</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Máximo de Usos
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={newInvitation.maxUses}
                onChange={(e) => setNewInvitation(prev => ({ ...prev, maxUses: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={createInvitation}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Crear Invitación</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lista de invitaciones */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Invitaciones Generadas</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPasswords ? 'Ocultar' : 'Mostrar'} Códigos</span>
              </button>
              <button
                onClick={loadInvitations}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Actualizar</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-300">
                  <th className="text-left py-3">Código</th>
                  <th className="text-left py-3">Plan</th>
                  <th className="text-left py-3">Usos</th>
                  <th className="text-left py-3">Estado</th>
                  <th className="text-left py-3">Creado</th>
                  <th className="text-left py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {invitations.map((invitation) => (
                  <tr key={invitation.id} className="border-b border-gray-800">
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-lg">
                          {showPasswords ? invitation.code : '••••••••'}
                        </span>
                        <button
                          onClick={() => copyToClipboard(invitation.code)}
                          className="bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(invitation.plan)}`}>
                        {getPlanIcon(invitation.plan)} {invitation.plan.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-white">
                      {invitation.currentUses} / {invitation.maxUses}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invitation.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {invitation.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-300">
                      {new Date(invitation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => deactivateInvitation(invitation.code)}
                          className="bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 transition-colors"
                          title="Desactivar"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteInvitation(invitation.code)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {invitations.length === 0 && (
                  <tr>
                    <td className="py-8 text-gray-400 text-center" colSpan={6}>
                      No hay invitaciones generadas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-white">{invitations.length}</div>
            <div className="text-gray-400">Total</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-400">
              {invitations.filter(inv => inv.isActive).length}
            </div>
            <div className="text-gray-400">Activas</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {invitations.reduce((sum, inv) => sum + inv.currentUses, 0)}
            </div>
            <div className="text-gray-400">Usadas</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-400">
              {invitations.filter(inv => inv.isActive && inv.currentUses < inv.maxUses).length}
            </div>
            <div className="text-gray-400">Disponibles</div>
          </div>
        </div>
      </div>
    </div>
  );
}
