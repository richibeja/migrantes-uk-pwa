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

export default function RegisterPageUS() {
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
    
    // Clear error when user starts typing
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

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter your first name';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Please enter your last name';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!validateUSPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid US phone number (XXX) XXX-XXXX';
    }

    // Validate ZIP code
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Please enter your ZIP code';
    } else if (!validateZIPCode(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code (XXXXX or XXXXX-XXXX)';
    }

    // Validate state
    if (!formData.state) {
      newErrors.state = 'Please select your state';
    } else {
      const selectedState = US_STATES.find(state => state.code === formData.state);
      if (selectedState?.restricted) {
        newErrors.state = 'Service not available in your state due to local regulations';
      }
    }

    // Validate birth date and age
    if (!formData.birthDate) {
      newErrors.birthDate = 'Please enter your birth date';
    } else if (!validateUSAge(formData.birthDate)) {
      newErrors.birthDate = 'You must be at least 18 years old to register';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Please create a password';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    // Validate password confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate agreements
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }
    if (!formData.agreeToAge) {
      newErrors.agreeToAge = 'You must confirm you are at least 18 years old';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here would go the real registration logic
      console.log('US Registration data:', formData);
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Error creating account. Please try again.' });
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your account has been created successfully. We have sent you a confirmation email.
          </p>
          <div className="space-y-3">
            <Link 
              href="/activate-whatsapp-en" 
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all block text-center"
            >
              Activate via WhatsApp
            </Link>
            <Link 
              href="/page-en" 
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all block text-center"
            >
              Back to Home
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
          <Link href="/page-en" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold">GanaFácil</span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">US Market</span>
          </div>
          <h1 className="text-xl font-bold mb-2">Create Account - US Market</h1>
          <p className="text-blue-100">Join and access intelligent predictions (US Residents Only)</p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
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
                    placeholder="John"
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
                  Last Name *
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
                    placeholder="Doe"
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
                Email Address *
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
                  placeholder="john.doe@email.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <XCircle className="h-4 w-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Phone and ZIP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (US) *
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
                  ZIP Code *
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

            {/* State and Birth Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                  State *
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
                  <option value="">Select your state</option>
                  {US_STATES.map(state => (
                    <option 
                      key={state.code} 
                      value={state.code}
                      disabled={state.restricted}
                    >
                      {state.name} {state.restricted ? '(Restricted)' : ''}
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
                  Birth Date *
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

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
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
                    placeholder="Create a secure password"
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
                  Confirm Password *
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
                    placeholder="Repeat your password"
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

            {/* Legal Agreements */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                US Legal Requirements
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
                    I confirm that I am at least 18 years old (21 in some states) and legally eligible to use this service.
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
                    I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link> and understand that predictions are for entertainment purposes only.
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
                    I agree to the <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link> and consent to data processing in accordance with US privacy laws.
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
                <strong>Restricted States:</strong> Alabama, Alaska, Hawaii, Nevada, Utah - Service not available due to local regulations.
              </div>
            </div>

            {/* General error */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <XCircle className="h-4 w-4" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account (US Market)'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login-en" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
