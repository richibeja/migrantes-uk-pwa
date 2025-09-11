'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Gift, 
  Share2, 
  Copy,
  CheckCircle,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  
  const referralCode = 'GANAFACIL2024';
  const referralLink = `https://ganafaci-anbel-pwa.vercel.app/activate?ref=${referralCode}`;
  
  const stats = {
    totalReferrals: 25,
    activeReferrals: 18,
    totalEarnings: 1250,
    pendingEarnings: 150,
    referralRate: 12.5
  };

  const referrals = [
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', status: 'active', earnings: 50, date: '2024-01-15' },
    { id: 2, name: 'María García', email: 'maria@email.com', status: 'pending', earnings: 0, date: '2024-01-14' },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com', status: 'active', earnings: 75, date: '2024-01-13' },
    { id: 4, name: 'Ana Martínez', email: 'ana@email.com', status: 'active', earnings: 100, date: '2024-01-12' },
    { id: 5, name: 'Luis Rodríguez', email: 'luis@email.com', status: 'active', earnings: 25, date: '2024-01-11' }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">👥</div>
              <div>
                <h1 className="text-3xl font-bold text-gold">REFERIDOS</h1>
                <p className="text-gray-300">Invita amigos y gana dinero</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold text-gold">{stats.totalReferrals}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Total Referidos</h3>
            <p className="text-gray-400 text-sm">Personas invitadas</p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-400">{stats.activeReferrals}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Activos</h3>
            <p className="text-gray-400 text-sm">Referidos activos</p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-purple-400">${stats.totalEarnings}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Ganancias Totales</h3>
            <p className="text-gray-400 text-sm">Dinero ganado</p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-400">{stats.referralRate}%</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Tasa de Conversión</h3>
            <p className="text-gray-400 text-sm">Efectividad</p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 rounded-3xl p-8 mb-8 text-black">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Tu Código de Referido</h2>
            <div className="bg-black/20 rounded-lg p-4 mb-6">
              <div className="text-2xl font-bold mb-2">{referralCode}</div>
              <div className="text-sm">Comparte este código con tus amigos</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-white/90 text-black text-sm"
                />
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">¿Cómo Funciona?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">1. Comparte</h4>
              <p className="text-gray-300 text-sm">
                Comparte tu código de referido con amigos y familiares
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">2. Ellos se Registran</h4>
              <p className="text-gray-300 text-sm">
                Tus referidos usan tu código al activar su cuenta
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">3. Ganas Dinero</h4>
              <p className="text-gray-300 text-sm">
                Recibes $50 por cada referido que se active
              </p>
            </div>
          </div>
        </div>

        {/* Referrals List */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600/50">
          <h3 className="text-xl font-bold text-white mb-6">Tus Referidos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300">Nombre</th>
                  <th className="text-left py-3 px-4 text-gray-300">Email</th>
                  <th className="text-left py-3 px-4 text-gray-300">Estado</th>
                  <th className="text-left py-3 px-4 text-gray-300">Ganancias</th>
                  <th className="text-left py-3 px-4 text-gray-300">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-gray-700/50">
                    <td className="py-3 px-4 text-white">{referral.name}</td>
                    <td className="py-3 px-4 text-gray-300">{referral.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {referral.status === 'active' ? 'Activo' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gold font-bold">${referral.earnings}</td>
                    <td className="py-3 px-4 text-gray-400">{referral.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-md border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong>GANA FÁCIL</strong> - Programa de Referidos
            </p>
            <p className="text-xs mt-1">
              Gana $50 por cada amigo que invites y active su cuenta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
