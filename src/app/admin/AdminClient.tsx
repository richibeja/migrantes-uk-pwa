'use client';

import { useState, useEffect } from 'react';
import { listCloudUsers, getCloudUser, updateCloudUserActivation, createCloudUser } from '@/lib/firebaseUsers';
import { createCloudCode, listCloudCodes } from '@/lib/firebaseCodes';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/I18nProvider';
import { Brain, Crown, Target, Users, Settings, BarChart3, Shield, Zap, MessageCircle, Bot } from 'lucide-react';
import AnbelAIChat from '@/components/AnbelAIChat';
import { ADMIN_SECURITY_CONFIG, verifyAdminPassword, createAdminSession, isAdminSessionValid, clearAdminSession, formatSessionTimeRemaining } from '@/config/admin-security';

export default function AdminClient() {
  const router = useRouter();
  const { t } = useI18n();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Verificar sesión de admin existente
    if (isAdminSessionValid()) {
      // Sesión válida
      setIsAuthorized(true);
      setIsChecking(false);
      return;
    }
    
    // Mostrar modal de contraseña
    setIsChecking(false);
    setShowPasswordModal(true);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verifyAdminPassword(adminPassword)) {
      // Contraseña correcta
      createAdminSession();
      
      setIsAuthorized(true);
      setShowPasswordModal(false);
      setPasswordError('');
      setAdminPassword('');
    } else {
      // Contraseña incorrecta
      setPasswordError(ADMIN_SECURITY_CONFIG.MESSAGES.INCORRECT_PASSWORD);
      setAdminPassword('');
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthorized(false);
    setShowPasswordModal(true);
  };

  // Mostrar estado de verificación
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <p className="text-gold text-xl">Verificando…</p>
      </div>
    );
  }

  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [usernameToActivate, setUsernameToActivate] = useState('');
  const [plan, setPlan] = useState<'basic'|'premium'|'vip'|'lifetime'>('basic');
  const [durationDays, setDurationDays] = useState<number>(30);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [cloudCodes, setCloudCodes] = useState<any[]>([]);

  const showMessage = (msg: string, type: 'success' | 'error' | 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const loadAccounts = () => {
    try {
      const list = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
      setAccounts(Array.isArray(list) ? list : []);
    } catch {
      setAccounts([]);
    }
  };

  useEffect(() => {
    loadAccounts();
    refreshCloudCodes();
  }, []);

  const refreshCloudCodes = async () => {
    try {
      const codes = await listCloudCodes();
      setCloudCodes(Array.isArray(codes) ? codes : []);
    } catch {
      setCloudCodes([]);
    }
  };

  const generateCode = async () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newCode = `ADMIN${timestamp.toString().slice(-4)}${random}`;

    setGeneratedCodes(prev => [...prev, newCode]);
    try {
      await createCloudCode(newCode);
      try { await navigator.clipboard.writeText(newCode); } catch {}
      showMessage(`Código guardado: ${newCode}`, 'success');
      await refreshCloudCodes();
    } catch {
      showMessage('Error guardando código', 'error');
    }
  };

  const clearCodes = () => {
    setGeneratedCodes([]);
    showMessage('Códigos limpiados', 'info');
  };

  const addManualUser = () => {
    if (!newUserName.trim() || !newUserPassword.trim()) {
      showMessage('Usuario y clave requeridos', 'error');
      return;
    }
    try {
      const list = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
      if (Array.isArray(list) && list.find((a: any) => a?.username === newUserName)) {
        showMessage('Usuario ya existe', 'error');
        return;
      }
      const expiresAt = new Date(Date.now() + 365*24*60*60*1000).toISOString();
      const entry = { username: newUserName, password: newUserPassword, phone: (newUserPhone||'').trim(), status: 'active', plan: 'vip', expiresAt };
      const updated = Array.isArray(list) ? [...list, entry] : [entry];
      localStorage.setItem('ganaFacilAccounts', JSON.stringify(updated));
      try { createCloudUser({ username: entry.username, password: entry.password, phone: entry.phone, status: 'active', plan: 'vip', expiresAt }); } catch {}
      setNewUserName(''); setNewUserPassword(''); setNewUserPhone('');
      loadAccounts();
      showMessage('Usuario agregado', 'success');
    } catch {
      showMessage('Error agregando usuario', 'error');
    }
  };

  const activateUser = () => {
    try {
      const accounts = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
      const idx = accounts.findIndex((a: any) => a?.username === usernameToActivate);
      if (idx === -1) { showMessage('Usuario no encontrado', 'error'); return; }
      const now = new Date();
      const expiresAt = plan === 'lifetime' ? null : new Date(now.getTime() + durationDays * 24*60*60*1000).toISOString();
      accounts[idx] = { ...accounts[idx], status: 'active', plan, expiresAt };
      localStorage.setItem('ganaFacilAccounts', JSON.stringify(accounts));
      try { updateCloudUserActivation(String(usernameToActivate), 'active', plan, expiresAt); } catch {}
      const currentUser = localStorage.getItem('ganaFacilUser');
      if (currentUser) {
        const u = JSON.parse(currentUser);
        if (u?.username === usernameToActivate) {
          localStorage.setItem('ganaFacilUser', JSON.stringify({ ...u, status: 'active', plan, expiresAt }));
        }
      }
      showMessage('Usuario activado', 'success');
    } catch {
      showMessage('Error activando', 'error');
    }
  };

  const deactivateUser = () => {
    try {
      const accounts = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
      const idx = accounts.findIndex((a: any) => a?.username === usernameToActivate);
      if (idx === -1) { showMessage('Usuario no encontrado', 'error'); return; }
      accounts[idx] = { ...accounts[idx], status: 'pending', plan: null, expiresAt: null };
      localStorage.setItem('ganaFacilAccounts', JSON.stringify(accounts));
      try { updateCloudUserActivation(String(usernameToActivate), 'pending', null, null); } catch {}
      const currentUser = localStorage.getItem('ganaFacilUser');
      if (currentUser) {
        const u = JSON.parse(currentUser);
        if (u?.username === usernameToActivate) {
          localStorage.setItem('ganaFacilUser', JSON.stringify({ ...u, status: 'pending', plan: null, expiresAt: null }));
        }
      }
      showMessage('Usuario en pendiente', 'info');
    } catch {
      showMessage('Error cambiando estado', 'error');
    }
  };

  
  // Modal de contraseña
  if (showPasswordModal) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Brain className="w-16 h-16 text-purple-400" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full animate-pulse flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              🔐 ACCESO ADMINISTRADOR
            </h1>
            <p className="text-purple-200 mb-6">
              Ingresa la contraseña de administrador para acceder
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña de Administrador
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ingresa la contraseña..."
                required
                autoFocus
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-400">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              🚀 ACCEDER AL ADMIN
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header con Agente Anbel IA */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="w-16 h-16 text-purple-400" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            🧠 ADMIN - AGENTE ANBEL IA
          </h1>
          <p className="text-xl text-purple-200 mb-2">
            Panel de administración con inteligencia artificial avanzada
          </p>
          <p className="text-sm text-green-400 mb-6">
            🔐 Sesión activa - {formatSessionTimeRemaining()}
          </p>
          
          {/* Botones de navegación */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="/anbel-ai"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
            >
              <Bot className="w-5 h-5" />
              <span>AGENTE ANBEL IA</span>
            </a>
            <a
              href="/dashboard"
              className="bg-gradient-to-r from-gold to-yellow-400 text-black font-bold px-6 py-3 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
            >
              <Target className="w-5 h-5" />
              <span>DASHBOARD</span>
            </a>
            <a
              href="/predictions"
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
            >
              <BarChart3 className="w-5 h-5" />
              <span>PREDICCIONES</span>
            </a>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              <span>CERRAR SESIÓN</span>
            </button>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${messageType === 'success' ? 'bg-green-900/50 border border-green-500 text-green-200' : messageType === 'error' ? 'bg-red-900/50 border border-red-500 text-red-200' : 'bg-blue-900/50 border border-blue-500 text-blue-200'}`}>
            {message}
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">🧑‍💼 Activar Usuario</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" value={usernameToActivate} onChange={(e) => setUsernameToActivate(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Usuario (exacto)" />
              <select value={plan} onChange={(e) => { const p = e.target.value as 'basic'|'premium'|'vip'|'lifetime'; setPlan(p); setDurationDays(p === 'basic' ? 30 : p === 'premium' ? 90 : p === 'vip' ? 365 : 0); }} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option value="basic">Básico (30 días)</option>
                <option value="premium">Premium (90 días)</option>
                <option value="vip">VIP (365 días)</option>
                <option value="lifetime">Lifetime</option>
              </select>
              {plan !== 'lifetime' && (<input type="number" min={1} value={durationDays} onChange={(e) => setDurationDays(parseInt(e.target.value || '1'))} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Duración (días)" />)}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={activateUser} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">✅ Activar</button>
              <button onClick={deactivateUser} className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">⏸️ Pendiente</button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <h3 className="text-xl font-semibold text-white">👥 Usuarios (localStorage)</h3>
              <div className="flex gap-2 flex-wrap">
                <button onClick={loadAccounts} className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700">🔄 Refrescar</button>
                <button onClick={() => setShowPasswords(v=>!v)} className="bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700">{showPasswords ? '🙈 Ocultar' : '👁️ Mostrar'} claves</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-300">
                    <th className="text-left py-2">Usuario</th>
                    <th className="text-left py-2">Clave</th>
                    <th className="text-left py-2">Teléfono</th>
                    <th className="text-left py-2">Estado</th>
                    <th className="text-left py-2">Plan</th>
                    <th className="text-left py-2">Expira</th>
                    <th className="text-left py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a, idx) => (
                    <tr key={idx} className="border-b border-gray-800">
                      <td className="py-2 text-white font-medium">{a.username}</td>
                      <td className="py-2 text-gray-300">{showPasswords ? (a.password || '') : '•••••••'}</td>
                      <td className="py-2 text-gray-300">{a.phone || '-'}</td>
                      <td className="py-2 text-gray-300">{a.status || 'pending'}</td>
                      <td className="py-2 text-gray-300">{a.plan || '-'}</td>
                      <td className="py-2 text-gray-300">{a.expiresAt ? new Date(a.expiresAt).toLocaleDateString() : '-'}</td>
                      <td className="py-2">
                        <div className="flex gap-2 flex-wrap">
                          <button onClick={() => { navigator.clipboard.writeText(String(a.username)); showMessage('Usuario copiado', 'success'); }} className="bg-gray-600 text-white px-2 py-1 rounded">📋 Usuario</button>
                          <button onClick={() => { navigator.clipboard.writeText(String(a.password || '')); showMessage('Clave copiada', 'success'); }} className="bg-gray-600 text-white px-2 py-1 rounded">📋 Clave</button>
                          <a href={`https://wa.me/19295909116?text=Usuario:%20${encodeURIComponent(a.username)}%0AClave:%20${encodeURIComponent(a.password || '')}%0ATeléfono:%20${encodeURIComponent(a.phone || '-')}`} target="_blank" className="bg-green-600 text-white px-2 py-1 rounded">💬 WhatsApp</a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {accounts.length === 0 && (
                    <tr>
                      <td className="py-3 text-gray-400" colSpan={6}>No hay usuarios locales registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <input value={newUserName} onChange={(e)=>setNewUserName(e.target.value)} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Usuario nuevo" />
              <input value={newUserPassword} onChange={(e)=>setNewUserPassword(e.target.value)} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Clave nueva" />
              <input value={newUserPhone} onChange={(e)=>setNewUserPhone(e.target.value)} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Teléfono (opcional)" />
              <button onClick={addManualUser} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">➕ Agregar usuario</button>
            </div>
          </div>

          <div className="flex gap-4 mb-6 flex-wrap">
            <a href="/admin/codes" className="bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105">🔑 Ver Códigos de Activación</a>
            <a href="/admin-simple" className="bg-gradient-to-r from-green-600 to-green-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105">📊 Admin Simple (Excel)</a>
            <button onClick={clearCodes} className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-300">🗑️ Limpiar Códigos</button>
            <button onClick={refreshCloudCodes} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300">🔄 Actualizar Códigos (Cloud)</button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Códigos (Cloud):</h3>
            <div className="grid gap-3">
              {cloudCodes.map((c, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <span className="text-gold font-mono text-lg">{c.code}</span>
                  <span className={`text-sm ${c.used ? 'text-red-300' : 'text-green-300'}`}>{c.used ? 'Usado' : 'Disponible'}</span>
                </div>
              ))}
              {cloudCodes.length === 0 && (<div className="text-gray-400">No hay códigos en la nube</div>)}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => window.history.back()} className="text-gray-400 hover:text-white transition-colors text-sm">← Volver</button>
          </div>
        </div>

        {/* Estadísticas del Sistema */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            📊 ESTADÍSTICAS DEL SISTEMA
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">Usuarios Activos</h4>
              <p className="text-3xl font-bold text-gold">{accounts.filter(a => a.status === 'active').length}</p>
              <p className="text-sm text-gray-300">Total: {accounts.length}</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">Códigos Generados</h4>
              <p className="text-3xl font-bold text-gold">{cloudCodes.length}</p>
              <p className="text-sm text-gray-300">Disponibles: {cloudCodes.filter(c => !c.used).length}</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6 text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">Sistema Online</h4>
              <p className="text-3xl font-bold text-green-400">100%</p>
              <p className="text-sm text-gray-300">Operativo</p>
            </div>
          </div>
        </div>

        {/* Chat del Agente Anbel IA */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            🤖 CHAT CON AGENTE ANBEL IA
          </h3>
          <p className="text-center text-purple-200 mb-6">
            Asistencia inteligente para administración del sistema
          </p>
          
          <AnbelAIChat
            userId="admin-user"
            language="es"
            onPredictionGenerated={(prediction: any) => {
              console.log('Predicción generada desde admin:', prediction);
            }}
            onAnalysisGenerated={(analysis: any) => {
              console.log('Análisis generado desde admin:', analysis);
            }}
          />
        </div>
      </div>
    </div>
  );
}


