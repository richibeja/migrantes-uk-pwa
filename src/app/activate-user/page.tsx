'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowLeft, Key, Shield, Clock, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ActivateUserPageEn() {
  const [activationCode, setActivationCode] = useState('');
  const [isActivating, setIsActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Get pending user data
    const pendingUser = JSON.parse(localStorage.getItem('pendingUser') || '{}');
    if (pendingUser.email) {
      setUserData(pendingUser);
    }
  }, []);

  const handleActivation = async () => {
    if (!activationCode.trim()) {
      alert('Please enter your activation code');
      return;
    }

    setIsActivating(true);
    
    // Simulate activation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Validate code against predefined codes
    const { validateSimpleCode } = await import('@/lib/simple-codes');
    const codeValidation = validateSimpleCode(activationCode);
    
    if (codeValidation.valid) {
      // Valid code - create activated user
      const activatedUser = {
        username: `user_${Date.now()}`,
        email: userData?.email || 'user@ganafacil.com',
        phone: userData?.phone || '',
        isActivated: true,
        plan: codeValidation.plan || 'premium',
        activatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
        activationCode: activationCode
      };
      
      localStorage.setItem('user', JSON.stringify(activatedUser));
      localStorage.setItem('ganafacil_activated', 'true'); // CRITICAL: Set activation flag
      localStorage.removeItem('pendingUser');
      
      setActivationStatus('success');
      
      // Redirección automática después de 3 segundos como fallback
      setTimeout(() => {
        window.location.href = '/dashboard-en';
      }, 3000);
    } else {
      // Validate code against localStorage as fallback
      const pendingUser = JSON.parse(localStorage.getItem('pendingUser') || '{}');
      const isValidCode = pendingUser.activationCode === activationCode;
      
      if (isValidCode && pendingUser.email) {
        // Mark as activated
        const activatedUser = {
          ...pendingUser,
          isActivated: true,
          activatedAt: new Date().toISOString()
        };
        localStorage.setItem('user', JSON.stringify(activatedUser));
        localStorage.setItem('ganafacil_activated', 'true'); // CRITICAL: Set activation flag
        localStorage.removeItem('pendingUser');
        
        setActivationStatus('success');
        
        // Redirección automática después de 3 segundos como fallback
        setTimeout(() => {
          window.location.href = '/dashboard-en';
        }, 3000);
      } else {
        setActivationStatus('error');
      }
    }
    
    setIsActivating(false);
  };

  const handleWhatsAppSupport = () => {
    const whatsappNumber = '+19295909116';
    const whatsappMessage = encodeURIComponent(
      '🔑 *ACTIVATION SUPPORT*\n\n' +
      'Hello, I need help with my activation code.\n\n' +
      '📋 *Information:*\n' +
      '• Code entered: ' + activationCode + '\n' +
      '• Email: ' + (userData?.email || 'Not available') + '\n' +
      '• Problem: I cannot activate my account\n\n' +
      'Please send me a new code or help me resolve this issue.'
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  if (activationStatus === 'success') {
    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gold mb-4">Activation Successful!</h1>
          <p className="text-gray-300 mb-6">
            Your account has been activated successfully. You can now access all premium features.
          </p>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">🎉 Welcome to Gana Fácil Premium!</h3>
            <p className="text-gray-400 text-sm">
              You now have access to intelligent predictions, advanced analysis and priority support.
            </p>
          </div>

          <button
            onClick={() => {
              // Redirigir al dashboard en inglés
              window.location.href = '/dashboard-en';
            }}
            className="inline-block bg-gold text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors mb-4"
          >
            Go to Dashboard
          </button>
          
          <p className="text-xs text-gray-500">
            Your subscription is active and ready to use
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="flex items-center gap-3 text-sm mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-gold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Key className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gold mb-2">Activate Account</h1>
          <p className="text-gray-300">
            Enter the activation code you received via WhatsApp
          </p>
        </div>

        {userData && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-white mb-2">📋 Your account information:</h3>
            <p className="text-xs text-gray-400">Email: {userData.email}</p>
            <p className="text-xs text-gray-400">Phone: {userData.phone}</p>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-2">
              Activation Code
            </label>
            <input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
              placeholder="Ex: ABC123"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-center text-lg font-mono tracking-widest focus:outline-none focus:border-gold"
              maxLength={10}
            />
          </div>

          {activationStatus === 'error' && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-400 mr-2" />
                <p className="text-red-400 text-sm">
                  Invalid code. Please verify it's correct or request a new one.
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleActivation}
            disabled={isActivating || !activationCode.trim()}
            className="w-full bg-gold text-black font-semibold py-3 rounded-lg disabled:opacity-60 hover:bg-yellow-400 transition-colors mb-4"
          >
            {isActivating ? 'Activating...' : 'Activate Account'}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              Didn't receive your code or having problems?
            </p>
            
            <button
              onClick={handleWhatsAppSupport}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Contact via WhatsApp
            </button>
          </div>
        </div>

        <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
            <Shield className="w-4 h-4 mr-2 text-gold" />
            Important Information
          </h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• The code is sent via WhatsApp after payment</li>
            <li>• Check your spam folder if you don't receive it</li>
            <li>• The code is valid for 24 hours</li>
            <li>• Contact support if you have problems</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
