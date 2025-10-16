'use client';

import { useEffect } from 'react';

interface HotmartButtonProps {
  variant?: 'default' | 'large' | 'small' | 'floating';
  className?: string;
  text?: string;
  language?: 'es' | 'en';
}

export default function HotmartButton({ 
  variant = 'default', 
  className = '',
  text,
  language = 'es'
}: HotmartButtonProps) {
  
  useEffect(() => {
    // Cargar script de Hotmart si no está cargado
    if (!document.querySelector('script[src*="hotmart.com/checkout/widget.min.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.hotmart.com/checkout/widget.min.js';
      document.head.appendChild(script);
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css';
      document.head.appendChild(link);
    }
  }, []);

  const defaultTexts = {
    es: {
      default: '🚀 Comprar Gana Fácil - $97',
      large: '💎 ¡COMPRAR AHORA POR $97!',
      small: 'Comprar $97',
      floating: 'Comprar'
    },
    en: {
      default: '🚀 Buy Win Easy - $97',
      large: '💎 BUY NOW FOR $97!',
      small: 'Buy $97',
      floating: 'Buy Now'
    }
  };

  const buttonText = text || defaultTexts[language][variant];

  const handleClick = () => {
    // Abrir página de pago de Hotmart
    window.open('https://pay.hotmart.com/K101811871T?checkoutMode=2', '_blank');
  };

  if (variant === 'floating') {
    return (
      <button
        onClick={handleClick}
        className={`fixed bottom-6 left-6 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 ${className}`}
        title="Comprar Gana Fácil"
      >
        {buttonText}
      </button>
    );
  }

  if (variant === 'large') {
    return (
      <button
        onClick={handleClick}
        className={`bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-2xl font-bold px-16 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl ${className}`}
      >
        {buttonText}
      </button>
    );
  }

  if (variant === 'small') {
    return (
      <button
        onClick={handleClick}
        className={`bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${className}`}
      >
        {buttonText}
      </button>
    );
  }

  // Variant default
  return (
    <button
      onClick={handleClick}
      className={`bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl ${className}`}
    >
      {buttonText}
    </button>
  );
}

// También exportar el enlace directo para usar en otros lugares
export const HOTMART_PURCHASE_URL = 'https://pay.hotmart.com/K101811871T?checkoutMode=2';

// Función para abrir Hotmart
export const openHotmart = () => {
  window.open(HOTMART_PURCHASE_URL, '_blank');
};



