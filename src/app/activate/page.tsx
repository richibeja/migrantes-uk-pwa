'use client';

import { useState, useEffect } from 'react';
import { Check, Key, ArrowRight, AlertCircle, Shield, Users, Crown, Loader2, Link, Mail, Download, Eye } from 'lucide-react';

// Base de datos de códigos válidos (en producción esto estaría en un servidor)
const CODIGOS_VALIDOS = {
  "GANA1234": { estado: "DISPONIBLE", email: "", expiracion: "2024-12-31", plan: "premium" },
  "PREM5678": { estado: "DISPONIBLE", email: "", expiracion: "2024-12-31", plan: "premium" },
  "VIP9012": { estado: "DISPONIBLE", email: "", expiracion: "2024-12-31", plan: "vip" },
  "FACIL3456": { estado: "USADO", email: "juan@email.com", expiracion: "2024-12-31", plan: "basic" },
  "GANAFACIL": { estado: "DISPONIBLE", email: "", expiracion: "2024-12-31", plan: "premium" },
  "PREMIUM123": { estado: "DISPONIBLE", email: "", expiracion: "2024-12-31", plan: "premium" },
  "VIP456": { estado: "DISPONIBLE", email: "", expiracion: "2024-12-31", plan: "vip" },
  "BASIC789": { estado: "DISPONIBLE", email: "", expiracion: "2024-12-31", plan: "basic" }
};

export default function ActivatePage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    plan: ''
  });
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [showCodes, setShowCodes] = useState(false);

  const MAX_INTENTOS = 3;

  const activarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validar email
      if (!email.includes('@') || !email.includes('.')) {
        setError('Por favor ingresa un email válido');
        setIsLoading(false);
        return;
      }

      const codigo = code.toUpperCase().trim();
      console.log('🔍 Validating code:', codigo);
      console.log('🔍 Email:', email);

      // Verificar si el código existe
      if (!CODIGOS_VALIDOS[codigo]) {
        setIntentosFallidos(prev => prev + 1);
        setError('Código inválido');
        setIsLoading(false);
        return;
      }

      const codigoInfo = CODIGOS_VALIDOS[codigo];

      // Verificar si ya fue usado
      if (codigoInfo.estado === 'USADO') {
        setError('Este código ya fue utilizado');
        setIsLoading(false);
        return;
      }

      // Verificar expiración
      if (new Date() > new Date(codigoInfo.expiracion)) {
        setError('Código expirado');
        setIsLoading(false);
        return;
      }

      // Verificar límite de intentos
      if (intentosFallidos >= MAX_INTENTOS) {
        setError('Demasiados intentos fallidos. Intenta más tarde.');
        setIsLoading(false);
        return;
      }

      // ✅ ACTIVACIÓN EXITOSA
      codigoInfo.estado = 'USADO';
      codigoInfo.email = email;
      codigoInfo.fechaActivacion = new Date().toLocaleDateString();

      console.log(`✅ Código ${codigo} activado para ${email}`);

      // Crear usuario activado
      const userData = {
        id: `user_${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        plan: codigoInfo.plan,
        activated: true,
        activatedAt: new Date().toISOString(),
        method: 'single_use_code',
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

      // Limpiar formulario
      setEmail('');
      setCode('');

      // Redirigir al dashboard después de 3 segundos
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);

    } catch (error) {
      console.error('Error activating code:', error);
      setError('Error al activar el código. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const descargarReporte = () => {
    let codigosUsados = [];

    for (const [codigo, info] of Object.entries(CODIGOS_VALIDOS)) {
      if (info.estado === 'USADO') {
        codigosUsados.push({
          codigo: codigo,
          email: info.email,
          fecha: info.fechaActivacion,
          plan: info.plan
        });
      }
    }

    if (codigosUsados.length === 0) {
      alert('No hay códigos usados');
      return;
    }

    // Crear CSV
    let csv = 'Código,Email,Fecha Activación,Plan\n';
    codigosUsados.forEach(item => {
      csv += `${item.codigo},${item.email},${item.fecha},${item.plan}\n`;
    });

    // Descargar
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codigos_usados_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getCodigosDisponibles = () => {
    return Object.entries(CODIGOS_VALIDOS)
      .filter(([_, info]) => info.estado === 'DISPONIBLE')
      .map(([codigo, info]) => ({ codigo, plan: info.plan }));
  };

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
          <p className="text-gray-400 text-sm mb-6">
            Redirigiendo al dashboard en unos segundos...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
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
          🎯 Activar Código Premium
        </h1>
        <p className="text-gray-300 mb-8">
          Ingresa tu email y código de activación
        </p>

        <form onSubmit={activarCodigo} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              onChange={(e) => setCode(e.target.value)}
              placeholder="GANA1234"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Códigos de prueba */}
          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
            <h3 className="text-yellow-400 font-bold mb-2">💡 Códigos de Prueba</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {getCodigosDisponibles().slice(0, 4).map(({ codigo, plan }) => (
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
              <div className="mt-2 text-xs text-gray-300">
                {getCodigosDisponibles().map(({ codigo, plan }) => (
                  <div key={codigo} className="flex justify-between">
                    <span>{codigo}</span>
                    <span className="text-purple-400">{plan}</span>
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

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-red-200 text-sm">{error}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || intentosFallidos >= MAX_INTENTOS}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Activando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5 mr-2" />
                Activar Código
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Botón de reporte para admin */}
        <div className="mt-6 pt-4 border-t border-gray-600">
          <button
            onClick={descargarReporte}
            className="text-gray-400 hover:text-white text-sm flex items-center mx-auto"
          >
            <Download className="w-4 h-4 mr-1" />
            📊 Descargar Códigos Usados
          </button>
        </div>

        <div className="mt-6 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <a href="/activate-simple" className="text-green-400 hover:text-green-300 text-sm">
              📊 Sistema Simple (Excel)
            </a>
            <a href="/admin-simple" className="text-blue-400 hover:text-blue-300 text-sm">
              🔧 Admin Simple
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            ¿Necesitas ayuda? Contacta soporte
          </p>
        </div>
      </div>
    </div>
  );
}