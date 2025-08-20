'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showMessage = (msg: string, type: 'success' | 'error' | 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      showMessage("Por favor, ingresa usuario y contraseña", "error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Credenciales fijas
      if (username === 'admin' && password === 'ganafacil2025') {
        console.log('✅ LOGIN EXITOSO');
        
        // Guardar en localStorage
        localStorage.setItem('ganaFacilUser', JSON.stringify({
          id: 'admin_user',
          username: username,
          isAdmin: true,
          createdAt: new Date()
        }));
        
        showMessage("¡Login exitoso! Redirigiendo al dashboard...", "success");
        
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        showMessage("Usuario o contraseña incorrectos", "error");
      }
    } catch (error) {
      console.error('Error en login:', error);
      showMessage("Error al procesar el login", "error");
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

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">🔐 GanaFácil</h1>
          <p className="text-gray-400">Accede a tus pronósticos</p>
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
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="Ingresa tu usuario"
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
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p><strong>Usuario:</strong> admin</p>
            <p><strong>Contraseña:</strong> ganafacil2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
