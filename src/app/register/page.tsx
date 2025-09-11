'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createCloudUser, getCloudUser } from '@/lib/firebaseUsers';
import { useI18n } from '@/components/I18nProvider';

function RegisterPage() {
    return (
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+57');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isClient, setIsClient] = useState(false);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showMessage = (msg: string, type: 'success' | 'error' | 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      showMessage(t('register.msg.required'), 'error');
      return;
    }

    if (password.length < 6) {
      showMessage(t('register.msg.minpass'), 'error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const existingAccounts = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
      const usernameExists = Array.isArray(existingAccounts) && existingAccounts.some((acc: any) => acc?.username === username);
      if (usernameExists) {
        showMessage(t('register.msg.exists'), 'error');
        return;
      }

      const fullPhone = `${(countryCode || '').trim()}${(phone || '').trim()}`.replace(/\s+/g, '');
      const account = {
        username,
        password,
        phone: fullPhone,
        isActivated: true,
        status: 'pending',
        plan: null as string | null,
        expiresAt: null as string | null,
        activatedWith: null as string | null,
        createdAt: new Date().toISOString(),
      };

      const updatedAccounts = Array.isArray(existingAccounts) ? [...existingAccounts, account] : [account];
      localStorage.setItem('ganaFacilAccounts', JSON.stringify(updatedAccounts));

      // Guardar también en la nube (si Firestore está configurado)
      try {
        await createCloudUser({
          username: account.username,
          password: account.password,
          phone: account.phone || null,
          status: 'pending',
          plan: null,
          expiresAt: null,
        });
      } catch {}

      showMessage(t('register.msg.created'), 'success');
      setCreated(true);
      setIsLoading(false);
    } catch (error) {
      showMessage(t('register.msg.error'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">{t('register.title')}</h1>
          <p className="text-gray-400">{t('register.subtitle')}</p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg ${
              messageType === 'success'
                ? 'bg-green-900/50 border border-green-500 text-green-200'
                : messageType === 'error'
                ? 'bg-red-900/50 border border-red-500 text-red-200'
                : 'bg-blue-900/50 border border-blue-500 text-blue-200'
            }`}
          >
            {message}
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <form onSubmit={handleCreateAccount} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('register.user')}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder={t('register.placeholder.user')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('register.phone')}</label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gold focus:ring-2 focus:ring-gold/20"
                >
                  <option value="+57">+57 (CO)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+34">+34 (ES)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+55">+55 (BR)</option>
                  <option value="+52">+52 (MX)</option>
                  <option value="+54">+54 (AR)</option>
                  <option value="+33">+33 (FR)</option>
                  <option value="+49">+49 (DE)</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                  placeholder={t('register.placeholder.phone')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('register.pass')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder={t('register.placeholder.pass')}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('register.loading') : t('register.btn')}
            </button>
          </form>
        </div>

        <div className="text-center">
          <a
            href={`https://wa.me/18053080769?text=${encodeURIComponent(
              'Hola, necesito ayuda con Gana Fácil.'
            )}`}
            target="_blank"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            {t('register.whatsapp')}
          </a>
        </div>

        {created && (
          <div className="text-center">
            <button
              onClick={async () => {
                try {
                  const cloud = await getCloudUser(username);
                  if (cloud && cloud.status === 'active') {
                    // Activar sesión local y cuentas
                    const list = JSON.parse(localStorage.getItem('ganaFacilAccounts') || '[]');
                    const idx = Array.isArray(list) ? list.findIndex((a: any) => a?.username === username) : -1;
                    const updatedEntry = {
                      username,
                      password,
                      phone,
                      status: 'active',
                      plan: cloud.plan || 'basic',
                      expiresAt: cloud.expiresAt || null,
                      isActivated: true,
                      activatedWith: null,
                      createdAt: new Date().toISOString(),
                    } as any;
                    let updatedList = Array.isArray(list) ? [...list] : [];
                    if (idx >= 0) updatedList[idx] = { ...updatedList[idx], ...updatedEntry };
                    else updatedList.push(updatedEntry);
                    localStorage.setItem('ganaFacilAccounts', JSON.stringify(updatedList));
                    localStorage.setItem('ganaFacilUser', JSON.stringify({
                      id: `user_${Date.now()}`,
                      username,
                      isAdmin: false,
                      isActivated: true,
                      status: 'active',
                      plan: updatedEntry.plan,
                      expiresAt: updatedEntry.expiresAt,
                      createdAt: new Date(),
                    }));
                    window.location.href = '/dashboard';
                  } else {
                    showMessage('Aún pendiente. Intenta de nuevo en unos minutos.', 'info');
                  }
                } catch {
                  showMessage('No se pudo verificar. Intenta más tarde.', 'error');
                }
              }}
              className="mt-3 inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg"
            >
              {t('register.verify.btn')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(RegisterPage), { ssr: false });


