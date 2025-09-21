'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/components/I18nProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

function LoginPage() {
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

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
      showMessage(t('login.msg.required'), "error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const redirectParam = searchParams?.get('redirect') || '';
      // 1) Credenciales admin fijas
      if (username === 'admin' && password === 'ganafacil2025') {
        console.log('✅ LOGIN EXITOSO');
        
        // Guardar en localStorage
        localStorage.setItem('ganaFacilUser', JSON.stringify({
          id: 'admin_user',
          username: username,
          isAdmin: true,
          createdAt: new Date()
        }));
        
        showMessage(t('login.msg.success'), "success");
        
        setTimeout(() => {
          // Redirigir al admin por defecto o respetar redirect
          const target = redirectParam && redirectParam.startsWith('/') ? redirectParam : '/admin';
          router.push(target);
        }, 2000);
        return;
      }

      // 2) Autenticación para clientes de Hotmart (por email)
      if (username.includes('@') && password === 'hotmart2025') {
        console.log('✅ CLIENTE HOTMART LOGIN');
        
        // Guardar en localStorage
        localStorage.setItem('ganaFacilUser', JSON.stringify({
          id: `hotmart_${Date.now()}`,
          username: username,
          email: username,
          isHotmartCustomer: true,
          isAdmin: false,
          createdAt: new Date()
        }));
        
        // CRITICAL: Set activation flag for Hotmart customers
        localStorage.setItem('ganafacil_activated', 'true');
        
        showMessage('Welcome to ANBEL AI! Access granted.', "success");
        
        setTimeout(() => {
          // Redirigir al dashboard para clientes
          const target = redirectParam && redirectParam.startsWith('/') ? redirectParam : '/dashboard';
          router.push(target);
        }, 2000);
        return;
      }

      // 2) Cuentas activadas guardadas desde /activate
      const savedAccounts = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
      if (Array.isArray(savedAccounts)) {
        const found = savedAccounts.find((acc: any) => acc?.username === username && acc?.password === password && acc?.isActivated);
        if (found) {
          localStorage.setItem('ganaFacilUser', JSON.stringify({
            id: `user_${Date.now()}`,
            username: found.username,
            isAdmin: false,
            isActivated: true,
            status: found.status || 'active',
            plan: found.plan ?? null,
            expiresAt: found.expiresAt ?? null,
            activatedWith: found.activatedWith,
            createdAt: new Date()
          }));

          showMessage("¡Login exitoso! Redirigiendo al dashboard...", "success");
          setTimeout(() => {
            const target = redirectParam && redirectParam.startsWith('/') ? redirectParam : '/dashboard';
            router.push(target);
          }, 1200);
          return;
        }
      }

      showMessage(t('login.msg.invalid'), "error");
    } catch (error) {
      console.error('Error en login:', error);
      showMessage(t('login.msg.error'), "error");
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
          <h1 className="text-3xl font-bold text-white mb-2">{t('login.title')}</h1>
          <p className="text-gray-400">{t('login.subtitle')}</p>
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
              <label htmlFor="login-user" className="block text-sm font-medium text-gray-300 mb-2">
                {t('login.user')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder={t('login.placeholder.user')}
                id="login-user"
                required
              />
            </div>

            <div>
              <label htmlFor="login-pass" className="block text-sm font-medium text-gray-300 mb-2">
                {t('login.pass')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder={t('login.placeholder.pass')}
                id="login-pass"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('login.loading') : t('login.btn')}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false });
