'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, ArrowLeft, Key, Shield, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ActivateUserEnPage() {
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'not-found'>('idle');

  const checkActivation = async () => {
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsChecking(true);
    
    // Simulate checking activation in Firebase
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user exists and is activated
    // In production, this would check Firebase
    setStatus('not-found'); // For now, always show not-found to push to payment
    setIsChecking(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkActivation();
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Account Already Active!</h1>
          <p className="text-gray-600 mb-6">
            Your account is already activated and ready to use.
          </p>
          <div className="space-y-3">
            <Link 
              href="/auth/login-en" 
              className="block w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-all"
            >
              Log In to Dashboard
            </Link>
            <Link 
              href="/" 
              className="block w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <Key className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Check Activation Status</h1>
          <p className="text-blue-200">
            Enter your email to check if your account is activated
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="your@email.com"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
            />
          </div>

          {status === 'not-found' && (
            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-200 mb-1">Account Not Found or Not Activated</h4>
                  <p className="text-yellow-100 text-sm">
                    We couldn't find an activated account with this email. Please purchase a plan to get instant access.
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={checkActivation}
            disabled={isChecking}
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition-all disabled:opacity-50"
          >
            {isChecking ? 'Checking...' : 'Check Activation'}
          </button>

          <div className="border-t border-white/20 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Don't have an account?</h3>
            
            <div className="space-y-3">
              <a 
                href="/payment" 
                className="block w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-all text-center"
              >
                Buy Now - From £39
              </a>
              
              <a 
                href="/demo-ia" 
                className="block w-full border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-900 transition-all text-center"
              >
                Try Free Demo
              </a>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-200 mb-1">How It Works</h4>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>1. Purchase plan via Hotmart</li>
                  <li>2. Receive email with login credentials</li>
                  <li>3. Login and start getting predictions</li>
                  <li>4. Get AI predictions for 7 real lotteries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

