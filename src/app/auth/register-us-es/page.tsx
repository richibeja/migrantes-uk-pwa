'use client';

import { useState } from 'react';
import { Brain, Eye, EyeOff, ArrowLeft, CheckCircle, XCircle, Mail, Phone, User, Lock, MapPin, Calendar, Shield } from 'lucide-react';
import Link from 'next/link';

// Estados de EE.UU. con restricciones
const US_STATES = [
  { code: 'AL', name: 'Alabama', restricted: true },
  { code: 'AK', name: 'Alaska', restricted: true },
  { code: 'AZ', name: 'Arizona', restricted: false },
  { code: 'AR', name: 'Arkansas', restricted: false },
  { code: 'CA', name: 'California', restricted: false },
  { code: 'CO', name: 'Colorado', restricted: false },
  { code: 'CT', name: 'Connecticut', restricted: false },
  { code: 'DE', name: 'Delaware', restricted: false },
  { code: 'FL', name: 'Florida', restricted: false },
  { code: 'GA', name: 'Georgia', restricted: false },
  { code: 'HI', name: 'Hawaii', restricted: true },
  { code: 'ID', name: 'Idaho', restricted: false },
  { code: 'IL', name: 'Illinois', restricted: false },
  { code: 'IN', name: 'Indiana', restricted: false },
  { code: 'IA', name: 'Iowa', restricted: false },
  { code: 'KS', name: 'Kansas', restricted: false },
  { code: 'KY', name: 'Kentucky', restricted: false },
  { code: 'LA', name: 'Louisiana', restricted: false },
  { code: 'ME', name: 'Maine', restricted: false },
  { code: 'MD', name: 'Maryland', restricted: false },
  { code: 'MA', name: 'Massachusetts', restricted: false },
  { code: 'MI', name: 'Michigan', restricted: false },
  { code: 'MN', name: 'Minnesota', restricted: false },
  { code: 'MS', name: 'Mississippi', restricted: false },
  { code: 'MO', name: 'Missouri', restricted: false },
  { code: 'MT', name: 'Montana', restricted: false },
  { code: 'NE', name: 'Nebraska', restricted: false },
  { code: 'NV', name: 'Nevada', restricted: true },
  { code: 'NH', name: 'New Hampshire', restricted: false },
  { code: 'NJ', name: 'New Jersey', restricted: false },
  { code: 'NM', name: 'New Mexico', restricted: false },
  { code: 'NY', name: 'New York', restricted: false },
  { code: 'NC', name: 'North Carolina', restricted: false },
  { code: 'ND', name: 'North Dakota', restricted: false },
  { code: 'OH', name: 'Ohio', restricted: false },
  { code: 'OK', name: 'Oklahoma', restricted: false },
  { code: 'OR', name: 'Oregon', restricted: false },
  { code: 'PA', name: 'Pennsylvania', restricted: false },
  { code: 'RI', name: 'Rhode Island', restricted: false },
  { code: 'SC', name: 'South Carolina', restricted: false },
  { code: 'SD', name: 'South Dakota', restricted: false },
  { code: 'TN', name: 'Tennessee', restricted: false },
  { code: 'TX', name: 'Texas', restricted: false },
  { code: 'UT', name: 'Utah', restricted: true },
  { code: 'VT', name: 'Vermont', restricted: false },
  { code: 'VA', name: 'Virginia', restricted: false },
  { code: 'WA', name: 'Washington', restricted: false },
  { code: 'WV', name: 'West Virginia', restricted: false },
  { code: 'WI', name: 'Wisconsin', restricted: false },
  { code: 'WY', name: 'Wyoming', restricted: false }
];

export default function RegisterPageUSEs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    state: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToAge: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length >= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 3) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length > 0) {
      return `(${phoneNumber}`;
    }
    return phoneNumber;
  };

  const formatZIPCode = (value: string) => {
    // Remove all non-numeric characters except dash
    const zipCode = value.replace(/[^\d-]/g, '');
    
    // Format as XXXXX or XXXXX-XXXX
    if (zipCode.length > 5 && !zipCode.includes('-')) {
      return `${zipCode.slice(0, 5)}-${zipCode.slice(5, 9)}`;
    }
    return zipCode;
  };

  const validateUSPhone = (phone: string) => {
    const usPhoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return usPhoneRegex.test(phone);
  };

  const validateZIPCode = (zipcode: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipcode);
  };

  const validateUSAge = (birthDate: string) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validar nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Por favor ingresa tu nombre';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Por favor ingresa tu apellido';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electrónico';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    // Validar teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = 'Por favor ingresa tu número de teléfono';
    } else if (!validateUSPhone(formData.phone)) {
      newErrors.phone = 'Por favor ingresa un número de teléfono válido (XXX) XXX-XXXX';
    }

    // Validar código postal
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Por favor ingresa tu código postal';
    } else if (!validateZIPCode(formData.zipCode)) {
      newErrors.zipCode = 'Por favor ingresa un código postal válido (XXXXX o XXXXX-XXXX)';
    }

    // Validar estado
    if (!formData.state) {
      newErrors.state = 'Por favor selecciona tu estado';
    } else {
      const selectedState = US_STATES.find(state => state.code === formData.state);
      if (selectedState?.restricted) {
        newErrors.state = 'El servicio no está disponible en tu estado debido a regulaciones locales';
      }
    }

    // Validar fecha de nacimiento y edad
    if (!formData.birthDate) {
      newErrors.birthDate = 'Por favor ingresa tu fecha de nacimiento';
    } else if (!validateUSAge(formData.birthDate)) {
      newErrors.birthDate = 'Debes tener al menos 18 años para registrarte';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'Por favor crea una contraseña';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener mayúscula, minúscula, número y carácter especial';
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Por favor confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar acuerdos
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Debes aceptar los Términos de Servicio';
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'Debes aceptar la Política de Privacidad';
    }
    if (!formData.agreeToAge) {
      newErrors.agreeToAge = 'Debes confirmar que tienes al menos 18 años';
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
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la lógica real de registro
      console.log('Datos de registro US (ES):', formData);
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrors({ general: 'Error al crear la cuenta. Por favor intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">¡Registro Exitoso!</h1>
          <p className="text-gray-600 mb-6">
            Tu cuenta ha sido creada correctamente. Te hemos enviado un email de confirmación.
          </p>
          <div className="space-y-3">
            <Link 
              href="/activate-whatsapp" 
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all block text-center"
            >
              Activar por WhatsApp
            </Link>
            <Link 
              href="/" 
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all block text-center"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al Inicio
          </Link>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold">GanaFácil</span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Mercado US</span>
          </div>
          <h1 className="text-xl font-bold mb-2">Crear Cuenta - Mercado Estadounidense</h1>
          <p className="text-blue-100">Únete y accede a predicciones inteligentes (Solo residentes de EE.UU.)</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos de Nombre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.firstName 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="Juan"
                  />
                </div>
                {errors.firstName && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.firstName}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.lastName 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="Pérez"
                  />
                </div>
                {errors.lastName && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.lastName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                  placeholder="juan.perez@email.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <XCircle className="h-4 w-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Teléfono y Código Postal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Teléfono (EE.UU.) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      setFormData(prev => ({ ...prev, phone: formatted }));
                    }}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.phone 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="(555) 123-4567"
                    maxLength={14}
                  />
                </div>
                {errors.phone && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Código Postal *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => {
                      const formatted = formatZIPCode(e.target.value);
                      setFormData(prev => ({ ...prev, zipCode: formatted }));
                    }}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.zipCode 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="90210"
                    maxLength={10}
                  />
                </div>
                {errors.zipCode && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.zipCode}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Estado y Fecha de Nacimiento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.state 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                  }`}
                >
                  <option value="">Selecciona tu estado</option>
                  {US_STATES.map(state => (
                    <option 
                      key={state.code} 
                      value={state.code}
                      disabled={state.restricted}
                    >
                      {state.name} {state.restricted ? '(Restringido)' : ''}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.state}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Nacimiento *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.birthDate 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.birthDate && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.birthDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Campos de Contraseña */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="Crea una contraseña segura"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="Repite tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Acuerdos Legales */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Requisitos Legales de EE.UU.
              </h4>
              
              <div className="space-y-2">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToAge"
                    checked={formData.agreeToAge}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Confirmo que tengo al menos 18 años (21 en algunos estados) y soy elegible legalmente para usar este servicio.
                  </span>
                </label>
                {errors.agreeToAge && (
                  <div className="flex items-center gap-1 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.agreeToAge}</span>
                  </div>
                )}

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Acepto los <Link href="#" className="text-blue-600 hover:underline">Términos de Servicio</Link> y entiendo que las predicciones son solo para entretenimiento.
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <div className="flex items-center gap-1 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.agreeToTerms}</span>
                  </div>
                )}

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToPrivacy"
                    checked={formData.agreeToPrivacy}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Acepto la <Link href="#" className="text-blue-600 hover:underline">Política de Privacidad</Link> y consiento el procesamiento de datos de acuerdo con las leyes de privacidad de EE.UU.
                  </span>
                </label>
                {errors.agreeToPrivacy && (
                  <div className="flex items-center gap-1 text-red-600 text-sm">
                    <XCircle className="h-4 w-4" />
                    <span>{errors.agreeToPrivacy}</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <strong>Estados Restringidos:</strong> Alabama, Alaska, Hawaii, Nevada, Utah - Servicio no disponible debido a regulaciones locales.
              </div>
            </div>

            {/* Error general */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <XCircle className="h-4 w-4" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creando Cuenta...
                </div>
              ) : (
                'Crear Cuenta (Mercado US)'
              )}
            </button>
          </form>

          {/* Enlaces */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
