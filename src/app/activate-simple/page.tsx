'use client';

import { useState } from 'react';
import { Check, Key, ArrowRight, AlertCircle, Shield, Crown, Loader2, Download, Eye, Mail } from 'lucide-react';

// Códigos predefinidos que SIEMPRE funcionan (sin Firebase)
const CODIGOS_VALIDOS = {
  "GANAFACIL2024": { estado: "DISPONIBLE", email: "", expiracion: "2025-12-31", plan: "premium" },
  "PREMIUM123": { estado: "DISPONIBLE", email: "", expiracion: "2025-12-31", plan: "premium" },
  "VIP456": { estado: "DISPONIBLE", email: "", expiracion: "2025-12-31", plan: "vip" },
  "BASIC789": { estado: "DISPONIBLE", email: "", expiracion: "2025-12-31", plan: "basic" },
  "GANAFACIL": { estado: "DISPONIBLE", email: "", expiracion: "2025-12-31", plan: "premium" },
  "EXCEL001": { estado: "DISPONIBLE", email: "", expiracion: "2025-12-31", plan: "premium" },
  "EXCEL002": { estado: "DISPONIBLE", email: "", expiracion: "2025-12-31", plan: "vip" }
};

export default function ExcelActivatePage() {

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    plan: ''
  });
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [showCodes, setShowCodes] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const MAX_INTENTOS = 3;

  const getStats = () => {
    const total = Object.keys(CODIGOS_VALIDOS).length;
    const used = Object.values(CODIGOS_VALIDOS).filter(c => c.estado === 'USADO').length;
    const available = total - used;
    return { total, used, available };
  };

  const getAvailableCodes = () => {
    return Object.entries(CODIGOS_VALIDOS)
      .filter(([_, info]) => info.estado === 'DISPONIBLE')
      .map(([codigo, info]) => ({ codigo, plan: info.plan }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validaciones básicas
    if (!email.includes('@') || !email.includes('.')) {
      setMessage('❌ Por favor ingresa un email válido');
      setIsLoading(false);
      return;
    }

    if (code.length < 6) {
      setMessage('❌ El código debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    // Verificar límite de intentos
    if (intentosFallidos >= MAX_INTENTOS) {
      setMessage('❌ Demasiados intentos fallidos. Intenta más tarde.');
      setIsLoading(false);
      return;
    }

    const codigo = code.toUpperCase().trim();
    console.log('🔍 Validating code:', codigo);

    // Verificar si el código existe
    if (!CODIGOS_VALIDOS[codigo as keyof typeof CODIGOS_VALIDOS]) {
      setIntentosFallidos(prev => prev + 1);
      setMessage('❌ Código no encontrado');
      setIsLoading(false);
      return;
    }

    const codigoInfo = CODIGOS_VALIDOS[codigo as keyof typeof CODIGOS_VALIDOS];

    // Verificar si ya fue usado
    if (codigoInfo.estado === 'USADO') {
      setMessage('❌ Este código ya fue utilizado');
      setIsLoading(false);
      return;
    }

    // Verificar expiración
    if (new Date() > new Date(codigoInfo.expiracion)) {
      setMessage('❌ Código expirado');
      setIsLoading(false);
      return;
    }

    // ✅ ACTIVACIÓN EXITOSA
    codigoInfo.estado = 'USADO';
    codigoInfo.email = email;

    console.log(`✅ Código ${codigo} activado para ${email}`);

    // Crear usuario activado
    const userData = {
      id: `user_${Date.now()}`,
      email: email,
      name: email.split('@')[0],
      plan: codigoInfo.plan,
      activated: true,
      activatedAt: new Date().toISOString(),
      method: 'excel_code',
      code: codigo
    };

    // Guardar en localStorage
    localStorage.setItem('ganaFacilUser', JSON.stringify(userData));
    localStorage.setItem('ganafacil_activated', 'true');

    setIsActivated(true);
    setUserInfo({
      name: userData.name,
      email: userData.email,
      plan: userData.plan
    });

    setEmail('');
    setCode('');
    setIntentosFallidos(0); // Reset intentos en éxito
    setIsLoading(false);

    // Iniciar countdown y redirección
    setCountdown(3);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          window.location.replace('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleExport = () => {
    let csv = 'Código,Tipo,Estado,Email Usuario,Fecha Activación,Expiración\n';
    
    Object.entries(CODIGOS_VALIDOS).forEach(([codigo, info]) => {
      csv += `${codigo},${info.plan},${info.estado === 'USADO' ? 'USADO' : 'DISPONIBLE'},${info.email || ''},N/A,${info.expiracion}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codigos_usados_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    setMessage('📊 Datos exportados para Excel');
  };

  const stats = getStats();
  const availableCodes = getAvailableCodes();

  if (isActivated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-gray-800/70 border border-gray-700 rounded-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Check className="w-16 h-16 text-green-400" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            🎉 ¡CUENTA ACTIVADA!
          </h1>
          <p className="text-gray-300 mb-2">
            Bienvenido a GANA FÁCIL, {userInfo.name}
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Plan: <span className="text-purple-400 font-bold">{userInfo.plan.toUpperCase()}</span>
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Redirigiendo al dashboard en <span className="text-green-400 font-bold text-lg">{countdown}</span> segundos...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-6"></div>
          <div className="space-y-3">
            <a 
              href="/dashboard" 
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
            >
              🚀 Ir al Dashboard Ahora
            </a>
            <a 
              href="/" 
              className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-center"
            >
              🏠 Ir al Inicio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-gray-800/70 border border-gray-700 rounded-2xl p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Shield className="w-16 h-16 text-purple-400" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-pulse flex items-center justify-center">
              <Key className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          📊 Activación Simple
        </h1>
        <p className="text-gray-300 mb-8">
          Sistema simple sin base de datos
        </p>

        {/* Estadísticas */}
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
          <h3 className="text-blue-400 font-bold mb-3">📈 Estadísticas:</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-lg font-bold text-white">{stats.total}</div>
              <div className="text-xs text-gray-300">Total</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-lg font-bold text-green-400">{stats.available}</div>
              <div className="text-xs text-gray-300">Disponibles</div>
            </div>
            <div className="bg-gray-700/50 p-2 rounded">
              <div className="text-lg font-bold text-red-400">{stats.used}</div>
              <div className="text-xs text-gray-300">Usados</div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <Key className="w-4 h-4 inline mr-2" />
              Código de Activación:
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="GANAFACIL"
              required
            />
          </div>

          {/* Códigos de prueba */}
          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
            <h3 className="text-yellow-400 font-bold mb-2">💡 Códigos de Prueba</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {availableCodes.slice(0, 4).map(({ codigo, plan }) => (
                <span key={codigo} className="bg-gray-700 px-2 py-1 rounded text-yellow-200">
                  {codigo}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowCodes(!showCodes)}
              className="mt-2 text-yellow-300 text-xs hover:text-yellow-200 flex items-center mx-auto"
            >
              <Eye className="w-3 h-3 mr-1" />
              {showCodes ? 'Ocultar' : 'Ver todos'}
            </button>
            {showCodes && (
              <div className="mt-2 text-xs text-gray-300 space-y-1">
                {availableCodes.map(({ codigo, plan }) => (
                  <div key={codigo} className="flex justify-between">
                    <span className="font-mono">{codigo}</span>
                    <span className="text-purple-400 capitalize">{plan}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información de intentos */}
          {intentosFallidos > 0 && (
            <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3">
              <p className="text-orange-200 text-sm">
                Intentos fallidos: {intentosFallidos}/{MAX_INTENTOS}
              </p>
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-lg text-center ${
              message.includes('✅') ? 'bg-green-900/30 text-green-200 border border-green-500/50' : 
              message.includes('📊') ? 'bg-blue-900/30 text-blue-200 border border-blue-500/50' : 
              'bg-red-900/30 text-red-200 border border-red-500/50'
            }`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="submit"
              disabled={isLoading || intentosFallidos >= MAX_INTENTOS}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Activando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Activar
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleExport}
              className="bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </button>
          </div>
        </form>

        {/* Instrucciones */}
        <div className="mt-6 p-4 bg-gray-700/50 rounded-lg text-xs text-gray-300">
          <h4 className="font-medium mb-2 text-white">📋 Para usar con Excel:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Activa los códigos en esta página</li>
            <li>Haz clic en "Exportar Excel"</li>
            <li>Abre el archivo .csv en Excel</li>
            <li>Actualiza tu archivo maestro de códigos</li>
          </ol>
        </div>

        <div className="mt-4 text-center">
          <a href="/activate" className="text-gray-400 hover:text-white text-sm">
            ← Volver al sistema principal
          </a>
        </div>
      </div>
    </div>
  );
}