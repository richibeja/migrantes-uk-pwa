'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle, Shield, AlertTriangle, Phone, User, ArrowLeft, Clock, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ActivateWhatsAppEn() {
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    // Format as +1 XXX XXX XXXX for US numbers
    if (phoneNumber.length >= 10) {
      return `+1 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 6) {
      return `+1 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
    } else if (phoneNumber.length >= 3) {
      return `+1 ${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length > 0) {
      return `+1 ${phoneNumber}`;
    }
    return phoneNumber;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your WhatsApp number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Number must have at least 10 digits';
    }

    // Validate email (optional but if provided must be valid)
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppLink = () => {
    const phoneNumber = "573213349045"; // Number without the + symbol
    // Generar código de activación
    const activationCode = Math.floor(100000 + Math.random() * 900000);
    const message = `🎉 Hello ${formData.name || 'User'}! 

Your GanaFácil account is ready to be activated.

📱 Activation Code: ${activationCode}
🔗 Activation Page: https://gana-facil-ep1tz724y-ganafacils-projects.vercel.app/activate-code-en

✅ Steps to activate:
1. Go to the activation page
2. Enter your code: ${activationCode}
3. Enjoy your predictions!

My number: ${formData.phone || 'Not provided'}${formData.email ? ` and my email: ${formData.email}` : ''}`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate sending process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate WhatsApp link
      const whatsappLink = generateWhatsAppLink();
      
      // Open WhatsApp
      window.open(whatsappLink, '_blank');
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error sending request:', error);
      setErrors({ general: 'Error processing request. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Request Sent!</h1>
          <p className="text-gray-600 mb-6">
            Your activation request has been sent to WhatsApp. 
            Our team will contact you within the next few minutes with your verification code.
          </p>
          <div className="space-y-3">
            <Link 
              href="/dashboard-en" 
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all block text-center"
            >
              Go to Dashboard
            </Link>
            <Link 
              href="/page-en" 
              className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all block text-center"
            >
              Back to Home
            </Link>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setFormData({ phone: '', name: '', email: '' });
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              New Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center text-white">
          <Link href="/page-en" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-3">
            <MessageCircle className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold">GanaFácil</span>
          </div>
          <h1 className="text-xl font-bold mb-2">WhatsApp Activation</h1>
          <p className="text-green-100">Request your verification code directly via WhatsApp</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* WhatsApp Info */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6 flex items-start gap-4">
            <MessageCircle className="h-8 w-8 text-green-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-800 mb-2">Contact via WhatsApp</h3>
              <p className="text-green-700 text-sm">
                Our team will assist you immediately to send you your activation code
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activation Process</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Complete your information</h4>
                  <p className="text-gray-600 text-sm">Enter your WhatsApp number to receive the code</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Receive code via WhatsApp</h4>
                  <p className="text-gray-600 text-sm">We'll send you a message with your 6-digit verification code</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Activate your account</h4>
                  <p className="text-gray-600 text-sm">Enter the code in the application to complete your registration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number *
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
                      : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                  }`}
                  placeholder="+1 234 567 8900"
                  maxLength={18}
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address (Optional)
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <AlertTriangle className="h-4 w-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* General error */}
            {errors.general && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Request...
                </>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  Contact via WhatsApp
                </>
              )}
            </button>
          </form>

          {/* Security Info */}
          <div className="mt-6 space-y-4">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 mb-1">Security Note</h4>
                  <p className="text-yellow-700 text-sm">
                    The verification code is personal and non-transferable. Do not share it with anyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Lock className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-800 mb-1">Account Protection</h4>
                  <p className="text-red-700 text-sm">
                    WhatsApp will notify you if someone tries to register your number. Never share your verification code.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Having trouble with activation?</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Use a valid phone number</li>
                    <li>• Have a stable Internet connection</li>
                    <li>• Check that you don't have apps blocking calls or SMS</li>
                    <li>• Make sure airplane mode is disabled</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}