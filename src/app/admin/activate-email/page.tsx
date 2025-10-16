'use client';

import { useState } from 'react';
import { CheckCircle, Mail, Crown, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminActivateEmailPage() {
  const [email, setEmail] = useState('richardbejarano52@gmail.com');
  const [plan, setPlan] = useState('premium');
  const [isActivating, setIsActivating] = useState(false);
  const [success, setSuccess] = useState(false);

  const activateEmail = async () => {
    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    setIsActivating(true);

    // Simulate activation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create activated user in localStorage
    const activatedUser = {
      email: email,
      plan: plan,
      isActivated: true,
      activatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
      username: email.split('@')[0],
    };

    // Store in localStorage
    localStorage.setItem(`user_${email}`, JSON.stringify(activatedUser));
    localStorage.setItem('last_activated_email', email);

    setSuccess(true);
    setIsActivating(false);

    // Auto copy activation script
    const script = `
// Copy this to browser console on login page:
localStorage.setItem('user', '${JSON.stringify(activatedUser)}');
localStorage.setItem('ganafacil_activated', 'true');
window.location.href = '/dashboard';
`;

    console.log('ACTIVATION SCRIPT:', script);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Email Activated Successfully!</h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-blue-900 mb-3">✅ Account Details:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li><strong>Email:</strong> {email}</li>
              <li><strong>Plan:</strong> {plan.charAt(0).toUpperCase() + plan.slice(1)}</li>
              <li><strong>Status:</strong> ACTIVE</li>
              <li><strong>Valid:</strong> 90 days (3 months)</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">📋 Activation Instructions:</h3>
            <p className="text-sm text-yellow-800 mb-3">
              To activate this account, the user needs to run this in browser console on the login page:
            </p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>{`localStorage.setItem('user', '${JSON.stringify({
                email: email,
                plan: plan,
                isActivated: true,
                activatedAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
                username: email.split('@')[0]
              })}');
localStorage.setItem('ganafacil_activated', 'true');
window.location.href = '/dashboard';`}</pre>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-green-900 mb-2">🚀 Quick Activation (Easier Method):</h3>
            <ol className="text-sm text-green-800 space-y-2">
              <li>1. Go to: <a href="/auth/login-en" className="text-blue-600 underline">/auth/login-en</a></li>
              <li>2. Press F12 (open browser console)</li>
              <li>3. Copy the code above and paste in console</li>
              <li>4. Press Enter</li>
              <li>5. User will be redirected to dashboard automatically</li>
            </ol>
          </div>

          <div className="space-y-3">
            <Link
              href="/auth/login-en"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
            >
              Go to Login Page
            </Link>
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Activate Another Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Admin: Activate Email</h1>
          <p className="text-blue-200">
            Manually activate an email for dashboard access
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Email to Activate
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Plan Type
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/50"
            >
              <option value="basic" className="bg-gray-900">Basic (£39)</option>
              <option value="premium" className="bg-gray-900">Premium (£79)</option>
              <option value="pro" className="bg-gray-900">Pro (£149)</option>
            </select>
          </div>

          <button
            onClick={activateEmail}
            disabled={isActivating}
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
          >
            {isActivating ? 'Activating...' : 'Activate Email'}
          </button>

          <Link
            href="/admin"
            className="block w-full text-center border-2 border-white text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-blue-900 transition-all"
          >
            Back to Admin
          </Link>
        </div>
      </div>
    </div>
  );
}



