'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ActivatePage() {
  const [step, setStep] = useState<'code' | 'create' | 'success'>('code');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter();

  const VALID_CODES = ['GANAFACIL', 'LOTERIA', 'SUERTE', 'FORTUNA'];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showMessage = (msg: string, type: 'success' | 'error' | 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleActivateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      showMessage("Por favor, ingresa un código de activación", "error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const normalizedCode = code.trim().toUpperCase();
      console.log('Verificando código:', normalizedCode);
      
      if (VALID_CODES.includes(normalizedCode)) {
        console.log('CÓDIGO VÁLIDO');
        showMessage("¡Código válido! Ahora crea tu cuenta", "success");
        setStep('create');
      } else {
        showMessage("Código no válido", "error");
      }
    } catch (error) {
      console.error('Error al verificar código:', error);
      showMessage("Error al procesar el código", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      showMessage("Por favor, completa todos los campos", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("La contraseña debe tener al menos 6 caracteres", "error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      localStorage.setItem('ganaFacilUser', JSON.stringify({
        id: `user_${Date.now()}`,
        username: username,
        isActivated: true,
        activatedWith: code,
        createdAt: new Date()
      }));
      
      console.log('CUENTA CREADA EXITOSAMENTE');
      showMessage("¡Cuenta creada exitosamente! Redirigiendo al dashboard...", "success");
      setStep('success');
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      showMessage("Error al crear la cuenta", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (step === 'create') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
            <p className="text-gray-400">Código validado: {code}</p>
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${
              messageType === 'success' ? 'bg-green-900/50 border border-green-500 text-green-200' :
              messageType === 'error' ? 'bg-red-900/50 border border-red-500 text-red-200' :
              'bg-blue-900/50 border border-blue-500 text-blue-200'
            }`}>
              {message}
            </div>
          )}

          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <form onSubmit={handleCreateAccount} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="Crea tu usuario"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder="Crea tu contraseña (mínimo 6 caracteres)"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creando..." : "Crear Cuenta"}
              </button>

              <button
                type="button"
                onClick={() => setStep('code')}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-500 transition-colors"
              >
                ← Volver al código
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-green-800/50 p-8 rounded-xl border border-green-500">
            <h1 className="text-3xl font-bold text-green-200 mb-4">¡Cuenta Creada!</h1>
            <p className="text-green-100 mb-6">Tu cuenta ha sido activada exitosamente</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-gold text-black py-3 px-6 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              Ir al Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">GanaFácil</h1>
          <p className="text-gray-400">Activa tu cuenta con código</p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${
            messageType === 'success' ? 'bg-green-900/50 border border-green-500 text-green-200' :
            messageType === 'error' ? 'bg-red-900/50 border border-red-500 text-red-200' :
            'bg-blue-900/50 border border-blue-500 text-blue-200'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <form onSubmit={handleActivateCode} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Código de Activación
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="Ingresa tu código"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verificando..." : "Verificar Código"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p><strong>Códigos válidos:</strong></p>
            <p>GANAFACIL, LOTERIA, SUERTE, FORTUNA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
