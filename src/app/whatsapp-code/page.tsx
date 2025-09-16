'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, MessageCircle, Clock, ArrowLeft, RefreshCw, Phone } from 'lucide-react';
import Link from 'next/link';

export default function WhatsAppCodePage() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendCode = () => {
    setCodeSent(true);
    // Simular envío del código
    setTimeout(() => {
      alert('¡Código enviado! Revisa tu WhatsApp.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="flex items-center gap-3 text-sm mb-6">
        <Link href="/#pricing" className="inline-flex items-center gap-1 text-gold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Volver a Precios
        </Link>
      </div>

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gold mb-4">
            ¡Pago Procesado Exitosamente!
          </h1>
          
          <p className="text-gray-300 mb-6">
            Tu código de activación será enviado por WhatsApp en los próximos minutos.
          </p>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-3">
              <Phone className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-400 font-semibold">WhatsApp</span>
            </div>
            <p className="text-sm text-gray-300 mb-2">
              Revisa tu WhatsApp para recibir tu código de activación
            </p>
            <p className="text-xs text-gray-500">
              Número: +1 (929) 590-9116
            </p>
          </div>

          {!codeSent ? (
            <button
              onClick={handleSendCode}
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar Código por WhatsApp
            </button>
          ) : (
            <div className="bg-green-900/20 border border-green-500 rounded-lg p-4 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 text-sm">¡Código enviado! Revisa tu WhatsApp.</p>
            </div>
          )}

          <div className="text-center mb-6">
            <p className="text-sm text-gray-400 mb-2">Tiempo restante para recibir el código:</p>
            <div className="text-2xl font-bold text-gold">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="space-y-3">
            <Link 
              href="/activate" 
              className="w-full bg-gold text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Ya tengo mi código - Activar
            </Link>
            
            <button
              onClick={handleSendCode}
              className="w-full bg-gray-700 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reenviar Código
            </button>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            <p>¿No recibiste el código?</p>
            <p>Contacta soporte: soporte@ganafacil.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
