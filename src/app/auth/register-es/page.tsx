'use client';

import { useState } from 'react';
import { Brain, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPageEs() {
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
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'El teléfono debe tener al menos 10 dígitos';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
      // Crear usuario pendiente de activación
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

      // Guardar en localStorage
      localStorage.setItem('pendingUser', JSON.stringify(pendingUser));
      
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsRegistered(true);
    } catch (error) {
      console.error('Error de registro:', error);
      setErrors({ general: 'Error al registrarse. Intenta de nuevo.' });
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
          <h1 className="text-2xl font-bold text-gold mb-4">¡Registro Exitoso!</h1>
          <p className="text-gray-300 mb-6">
            Tu cuenta ha sido creada. Ahora necesitas activarla con un código.
          </p>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">🔑 Siguiente Paso</h3>
            <p className="text-gray-400 text-sm">
              Ve a la página de activación y usa uno de nuestros códigos predefinidos.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="/activate"
              className="inline-block w-full bg-gold text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              🔑 Activar Cuenta
            </a>
            <a
              href="/auth/login-es"
              className="inline-block w-full border border-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Iniciar Sesión
            </a>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Usa el código: <span className="text-gold font-mono">GANAFACIL</span>
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
          Volver al Inicio
        </Link>
      </div>
      
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="text-center mb-6">
            <Brain className="w-12 h-12 text-gold mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gold">Crear Cuenta</h1>
            <p className="text-gray-400 text-sm">Regístrate en Gana Fácil</p>
          </div>

          {errors.general && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              <User className="w-4 h-4 inline mr-1" />
              Nombre de Usuario *
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`w-full bg-gray-800 border rounded px-3 py-2 ${
                errors.username ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="Tu nombre de usuario"
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
              placeholder="tu@email.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              <Phone className="w-4 h-4 inline mr-1" />
              Teléfono *
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
              Contraseña *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full bg-gray-800 border rounded px-3 py-2 pr-10 ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Tu contraseña"
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
              Confirmar Contraseña *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full bg-gray-800 border rounded px-3 py-2 pr-10 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="Confirma tu contraseña"
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
            {isLoading ? 'Creando cuenta…' : 'Crear Cuenta'}
          </button>

          <div className="text-sm text-gray-400 text-center">
            ¿Ya tienes cuenta? <Link href="/auth/login-es" className="text-gold underline">Iniciar Sesión</Link>
          </div>

          <div className="text-xs text-gray-500 text-center">
            <p>Después del registro, activa tu cuenta con un código</p>
          </div>
        </form>
      </div>
    </div>
  );
}
