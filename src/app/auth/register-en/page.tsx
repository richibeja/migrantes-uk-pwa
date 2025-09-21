'use client';

import { useState } from 'react';
import { Brain, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/components/MetaPixel';

export default function RegisterPageEn() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone must be at least 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      // Create pending user
      const pendingUser = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        status: 'pending',
        plan: null,
        expiresAt: null,
        createdAt: new Date().toISOString(),
        activationCode: `USER${Date.now().toString().slice(-6)}`
      };

      // Save to localStorage
      localStorage.setItem('pendingUser', JSON.stringify(pendingUser));
      
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Track successful registration
      trackEvent('CompleteRegistration', {
        content_name: 'Free Account Registration',
        value: 0,
        currency: 'USD'
      });
      
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Error registering. Please try again.' });
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

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gold mb-4">Registration Successful!</h1>
          <p className="text-gray-300 mb-6">
            Your account has been created. Now you need to activate it with a code.
          </p>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">🔑 Next Step</h3>
            <p className="text-gray-400 text-sm">
              Go to the activation page and use one of our predefined codes.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/activate-user-en"
              className="inline-block w-full bg-gold text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              🔑 Activate Account
            </a>
            <a
              href="/auth/login-en"
              className="inline-block w-full border border-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Sign In
            </a>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Use code: <span className="text-gold font-mono">GANAFACIL</span>
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
      
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="text-center mb-6">
            <Brain className="w-12 h-12 text-gold mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gold">Create Account</h1>
            <p className="text-gray-400 text-sm">Sign up for Gana Fácil</p>
          </div>

          {errors.general && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              <User className="w-4 h-4 inline mr-1" />
              Username *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`w-full bg-gray-800 border rounded px-3 py-2 ${
                errors.username ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="Your username"
            />
            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
          </div>

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
              <Phone className="w-4 h-4 inline mr-1" />
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full bg-gray-800 border rounded px-3 py-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="+1 234 567 8900"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
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

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              <Lock className="w-4 h-4 inline mr-1" />
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full bg-gray-800 border rounded px-3 py-2 pr-10 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-black font-semibold py-2 rounded disabled:opacity-60"
          >
            {isLoading ? 'Creating account…' : 'Create Account'}
          </button>

          <div className="text-sm text-gray-400 text-center">
            Already have an account? <Link href="/auth/login-en" className="text-gold underline">Sign In</Link>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>After registration, activate your account with a code</p>
          </div>
        </form>
      </div>
    </div>
  );
}
