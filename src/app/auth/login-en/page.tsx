'use client';

import { useState } from 'react';
import { Brain, Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginPageEn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Validate against localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const pendingUser = JSON.parse(localStorage.getItem('pendingUser') || '{}');
      
      // Check if user exists and is activated
      if (user.email === formData.email && user.isActivated) {
        // Activated user - redirect to dashboard
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.location.href = '/dashboard';
      } else if (pendingUser.email === formData.email && !pendingUser.isActivated) {
        // Pending activation user
        setErrors({ general: 'Your account is not activated. Check your activation code.' });
      } else {
        // User not found
        setErrors({ general: 'Email or password incorrect.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Error signing in. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="flex items-center gap-3 text-sm mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-gold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="text-center mb-6">
            <Brain className="w-12 h-12 text-gold mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gold">Sign In</h1>
            <p className="text-gray-400 text-sm">Access your Gana Fácil account</p>
          </div>

          {errors.general && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              <Mail className="w-4 h-4 inline mr-1" />
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full bg-gray-800 border rounded px-3 py-2 ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              <Lock className="w-4 h-4 inline mr-1" />
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full bg-gray-800 border rounded px-3 py-2 pr-10 ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-black font-semibold py-2 rounded disabled:opacity-60"
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="text-sm text-gray-400">
            Don't have an account? <Link href="/auth/register-en" className="text-gold underline">Sign up</Link>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>Demo: Use any email and password to test</p>
          </div>
        </form>
      </div>
    </div>
  );
}