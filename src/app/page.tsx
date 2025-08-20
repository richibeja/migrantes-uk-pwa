'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import LanguageIndicator from '@/components/LanguageIndicator';
import ActivationCounter from '@/components/ActivationCounter';
import LotteryCard from '@/components/LotteryCard';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Datos de las loterías - Versión simplificada y segura
  const lotteries = [
    {
      id: 'baloto',
      name: 'Baloto',
      country: '🇨🇴 Colombia',
      drawDays: 'Lunes, Miércoles y Sábados',
      jackpot: '$2.000M - $50.000M COP',
      description: 'La lotería más popular de Colombia'
    },
    {
      id: 'powerball',
      name: 'Powerball',
      country: '🇺🇸 Estados Unidos',
      drawDays: 'Lunes, Miércoles y Sábados',
      jackpot: '$20M - $2.000M USD',
      description: 'Lotería estadounidense popular'
    },
    {
      id: 'mega-millions',
      name: 'Mega Millions',
      country: '🇺🇸 Estados Unidos',
      drawDays: 'Martes y Viernes',
      jackpot: '$20M - $1.600M USD',
      description: 'Lotería estadounidense con jackpots increíbles'
    },
    {
      id: 'euromillions',
      name: 'EuroMillions',
      country: '🇪🇺 Europa',
      drawDays: 'Martes y Viernes',
      jackpot: '€17M - €240M EUR',
      description: 'La lotería más grande de Europa'
    },
    {
      id: 'uk-national',
      name: 'UK National Lottery',
      country: '🇬🇧 Reino Unido',
      drawDays: 'Miércoles y Sábados',
      jackpot: '£2M - £20M GBP',
      description: 'Lotería nacional del Reino Unido'
    },
    {
      id: 'el-gordo',
      name: 'El Gordo de la Primitiva',
      country: '🇪🇸 España',
      drawDays: 'Jueves y Sábados',
      jackpot: '€5M - €50M EUR',
      description: 'Una de las loterías más antiguas de España'
    },
    {
      id: 'lotto-6-49',
      name: 'Lotto 6/49',
      country: '🇨🇦 Canadá',
      drawDays: 'Miércoles y Sábados',
      jackpot: '$5M - $64M CAD',
      description: 'Lotería canadiense con formato clásico'
    },
    {
      id: 'mega-sena',
      name: 'Mega-Sena',
      country: '🇧🇷 Brasil',
      drawDays: 'Lunes, Miércoles y Sábados',
      jackpot: 'R$5M - R$300M BRL',
      description: 'La lotería más grande de Brasil'
    },
    {
      id: 'loteria-nacional',
      name: 'Lotería Nacional',
      country: '🇦🇷 Argentina',
      drawDays: 'Lunes, Miércoles y Viernes',
      jackpot: '$50M - $500M ARS',
      description: 'Lotería nacional argentina'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-bold text-gold hover:text-yellow-400 transition-colors">
            GanaFácil
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="#features" className="hover:text-gold transition-colors text-sm lg:text-base">Características</Link>
            <Link href="#lotteries" className="hover:text-gold transition-colors text-sm lg:text-base">Loterías</Link>
            <Link href="#testimonials" className="hover:text-gold transition-colors text-sm lg:text-base">Testimonios</Link>
            <Link href="#guarantee" className="hover:text-gold transition-colors text-sm lg:text-base">Garantía</Link>
            <span className="text-gray-400 text-sm">🌍 ES/EN</span>
            <LanguageIndicator />
          </nav>

          {/* Mobile Menu Button */}
            <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gold hover:text-yellow-400 transition-colors p-2"
            aria-label="Menú"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-gold/20">
            <nav className="px-4 py-4 space-y-3">
              <Link href="#features" className="block hover:text-gold transition-colors py-2">Características</Link>
              <Link href="#lotteries" className="block hover:text-gold transition-colors py-2">Loterías</Link>
              <Link href="#testimonials" className="block hover:text-gold transition-colors py-2">Testimonios</Link>
              <Link href="#guarantee" className="block hover:text-gold transition-colors py-2">Garantía</Link>
              <div className="pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-2">🌍 Disponible en Español e Inglés</div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 bg-gradient-to-b from-black via-gray-900/20 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gold mb-6 md:mb-8 animate-pulse">
            🎯 GanaFácil
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed px-2">
            El sistema más avanzado de análisis de loterías que ha ayudado a miles de personas a ganar millones en premios
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16 px-4">
            <Link
              href="#cta"
              className="bg-gold text-black px-6 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto"
            >
              Comprar tu activación
            </Link>
            <Link
              href="#features"
              className="border-2 border-gold text-gold px-6 md:px-10 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl hover:bg-gold hover:text-black transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              📊 Ver Características
            </Link>
          </div>
        </div>
      </section>

      {/* Activation Counter */}
      <ActivationCounter className="mb-20" />

      {/* Registration/Activation Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-gold/10 via-yellow-500/10 to-gold/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gold">
            🚀 ¿Listo para Empezar a Ganar?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Activa tu cuenta ahora y accede a predicciones ganadoras de las 9 loterías más importantes del mundo
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-bold text-gold mb-4">🔑 Código de Activación</h3>
              <p className="text-gray-300 mb-4">
                Si ya tienes un código de activación, activa tu cuenta ahora
              </p>
              <Link
                href="/activate"
                className="bg-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-105 w-full block"
              >
                🔓 Activar Cuenta
              </Link>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-bold text-gold mb-4">💳 Comprar Código</h3>
              <p className="text-gray-300 mb-4">
                Obtén tu código de activación y accede inmediatamente
              </p>
              <Link
                href="#cta"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-all duration-300 hover:scale-105 w-full block"
              >
                💎 Comprar Ahora
              </Link>
            </div>
          </div>

          {/* Botones de Pago en Euros */}
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-8 max-w-4xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-gold mb-6">
              💶 Pagos en Euros - Acceso Inmediato
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="text-3xl mb-3">💳</div>
                <h4 className="text-lg font-bold text-gold mb-3">Tarjeta de Crédito/Débito</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Pago seguro con Visa, Mastercard, American Express
                </p>
                <div className="text-2xl font-bold text-green-400 mb-3">€97</div>
                <Link
                  href="#cta"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-all duration-300 hover:scale-105 w-full block text-sm"
                >
                  💳 Pagar con Tarjeta
                </Link>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="text-3xl mb-3">🏦</div>
                <h4 className="text-lg font-bold text-gold mb-3">Transferencia SEPA</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Transferencia bancaria directa en euros
                </p>
                <div className="text-2xl font-bold text-blue-400 mb-3">€97</div>
                <Link
                  href="#cta"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 hover:scale-105 w-full block text-sm"
                >
                  🏦 Transferencia SEPA
                </Link>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="text-lg font-bold text-gold mb-3">WhatsApp</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Contacta para otros métodos de pago
                </p>
                <div className="text-2xl font-bold text-yellow-400 mb-3">€97</div>
                <a
                  href="https://wa.me/34612345678?text=Hola! Quiero comprar GanaFácil por €97. ¿Puedes ayudarme con el proceso de pago?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-all duration-300 hover:scale-105 w-full block text-sm"
                >
                  📱 Contactar WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-blue-400 mb-3">
              ⚡ Acceso Inmediato
            </h3>
            <p className="text-gray-300 text-sm">
              Una vez que actives tu cuenta, tendrás acceso instantáneo a todas las predicciones y análisis de loterías
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-gradient-to-b from-gray-900/30 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-20 text-gold px-2">
            ¿Por Qué GanaFácil es Único?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-600/30 text-center hover:scale-105 transition-all duration-300 hover:border-gold/50">
              <div className="text-5xl md:text-6xl mb-4 md:mb-6">🎯</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gold">Análisis Inteligente</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Utilizamos algoritmos de IA para analizar patrones históricos y predecir números ganadores
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-600/30 text-center hover:scale-105 transition-all duration-300 hover:border-gold/50">
              <div className="text-5xl md:text-6xl mb-4 md:mb-6">🌍</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gold">9 Loterías Mundiales</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Cubrimos las loterías más importantes de Europa, América y Asia
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-600/30 text-center hover:scale-105 transition-all duration-300 hover:border-gold/50">
              <div className="text-5xl md:text-6xl mb-4 md:mb-6">⚡</div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gold">Resultados en Tiempo Real</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                Actualizaciones automáticas y notificaciones instantáneas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loterías Section con Tarjetas */}
      <section id="lotteries" className="py-16 md:py-20 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 md:mb-20 text-gold px-2">
            🎰 Las 9 Loterías que Analizamos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12">
            {lotteries.map((lottery) => (
              <LotteryCard
                key={lottery.id}
                lottery={lottery}
              />
            ))}
          </div>
          
          {/* Call to Action for Loterías */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 rounded-2xl p-8 border border-gold/30 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gold mb-4">
                🎯 Accede a Todas las Predicciones
              </h3>
              <p className="text-gray-300 mb-6 text-lg">
                Activa tu cuenta premium y obtén números ganadores para las 9 loterías más importantes del mundo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/activate"
                  className="bg-gold text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
                >
                  🔓 Activar Cuenta
                </Link>
                <Link
                  href="#cta"
                  className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300 hover:scale-105"
                >
                  💎 Comprar Código
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gold">
            💎 Beneficios Específicos de GanaFácil
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-gold text-xl">✅</span>
                <p className="text-gray-300">Análisis de patrones históricos de los últimos 10 años</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gold text-xl">✅</span>
                <p className="text-gray-300">Algoritmos de IA entrenados con millones de resultados</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gold text-xl">✅</span>
                <p className="text-gray-300">Predicciones actualizadas en tiempo real</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gold text-xl">✅</span>
                <p className="text-gray-300">Sistema de alertas personalizadas</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-gold text-xl">✅</span>
                <p className="text-gray-300">Soporte técnico 24/7 en español</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gold text-xl">✅</span>
                <p className="text-gray-300">Acceso desde cualquier dispositivo</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gold text-xl">✅</span>
                <p className="text-gray-300">Tutoriales paso a paso incluidos</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gold text-xl">✅</span>
                <p className="text-gray-300">Comunidad de usuarios activa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited Time Offer Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gold">
            ⏰ Oferta por Tiempo Limitado
          </h2>
          
          {/* Precios en Euros */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Precio Normal</h3>
              <div className="text-4xl font-bold text-gray-300 line-through mb-2">€297</div>
              <p className="text-gray-400">Acceso por 1 año</p>
            </div>
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Oferta Especial</h3>
              <div className="text-4xl font-bold text-gold mb-2">€97</div>
              <p className="text-green-400 font-bold">¡67% de descuento!</p>
            </div>
          </div>

          {/* Precios en Dólares */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Precio Normal USD</h3>
              <div className="text-4xl font-bold text-gray-300 line-through mb-2">$325</div>
              <p className="text-gray-400">Acceso por 1 año</p>
            </div>
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Oferta Especial USD</h3>
              <div className="text-4xl font-bold text-gold mb-2">$107</div>
              <p className="text-green-400 font-bold">¡67% de descuento!</p>
            </div>
          </div>

          {/* Botones de Pago */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <a
              href="https://wa.me/34612345678?text=Hola! Quiero comprar GanaFácil en Euros (€97). ¿Puedes ayudarme con el proceso de pago?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-2xl inline-flex items-center justify-center"
            >
              💳 Pagar en Euros (€97)
            </a>
            <a
              href="https://wa.me/34612345678?text=Hola! Quiero comprar GanaFácil en Dólares ($107). ¿Puedes ayudarme con el proceso de pago?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-2xl inline-flex items-center justify-center"
            >
              💵 Pagar en Dólares ($107)
            </a>
          </div>

          <div className="mt-8 bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-yellow-400 font-bold text-lg">
              ⚠️ Esta oferta expira el 31 de Diciembre de 2025
            </p>
            <p className="text-gray-300 mt-2">
              Después de esta fecha, el precio volverá a €297 / $325
            </p>
          </div>
        </div>
      </section>

      {/* Real Success Cases Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gold">
            🏆 Casos de Éxito Reales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🇪🇸</span>
                <div>
                  <h4 className="font-bold text-gold">María G.</h4>
                  <p className="text-gray-400 text-sm">Madrid, España</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Gané €2.3M en EuroMillions usando GanaFácil. Los números que me dio fueron exactos."
              </p>
              <div className="text-gold font-bold">€2,300,000</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🇺🇸</span>
                <div>
                  <h4 className="font-bold text-gold">John D.</h4>
                  <p className="text-gray-400 text-sm">New York, USA</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "Powerball jackpot de $1.2M. GanaFácil me ayudó a identificar el patrón correcto."
              </p>
              <div className="text-gold font-bold">$1,200,000</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🇬🇧</span>
                <div>
                  <h4 className="font-bold text-gold">Sarah L.</h4>
                  <p className="text-gray-400 text-sm">London, UK</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "£850K en UK National Lottery. El sistema es increíblemente preciso."
              </p>
              <div className="text-gold font-bold">£850,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* 30-Day Guarantee Section */}
      <section id="guarantee" className="py-16 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gold">
            🛡️ Garantía de 30 Días - Sin Riesgo
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-600/30">
              <div className="text-6xl mb-6">💰</div>
              <h3 className="text-2xl font-bold text-gold mb-6">
                Reembolso Completo del 100%
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                Si en 30 días no estás completamente satisfecho con GanaFácil, 
                te devolvemos tu dinero sin hacer preguntas.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-gold font-bold">Sin Preguntas</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-gold font-bold">30 Días</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-gold font-bold">100% Garantizado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-gold/10 to-yellow-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gold">
            🚀 ¿Listo para Cambiar tu Vida?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Únete a miles de ganadores que ya han transformado su futuro financiero 
            con GanaFácil. No esperes más para empezar a ganar.
          </p>
          
          {/* Mini Urgency Counter */}
          <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6 mb-8 max-w-md mx-auto">
            <p className="text-red-400 font-bold text-lg mb-2">
              ⏰ Últimas 24 horas de la oferta especial
            </p>
            <div className="text-2xl font-bold text-gold">
              31/12/2025
            </div>
          </div>

          {/* Payment Methods Info */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-bold text-gold mb-4">💳 Tarjeta de Crédito/Débito</h3>
              <p className="text-gray-300 mb-4">
                Pago seguro con Visa, Mastercard, American Express
              </p>
              <p className="text-green-400 font-semibold">
                ✅ Transacción encriptada y segura
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-bold text-gold mb-4">🏦 Transferencia Bancaria</h3>
              <p className="text-gray-300 mb-4">
                Transferencia directa a nuestra cuenta bancaria
              </p>
              <p className="text-blue-400 font-semibold">
                💰 Sin comisiones adicionales
              </p>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="mb-8">
            <a
              href="https://wa.me/34612345678?text=Hola! Quiero activar mi cuenta de GanaFácil. ¿Puedes ayudarme con el proceso de pago?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition-colors inline-flex items-center"
            >
              📱 Contactar por WhatsApp
              <span className="ml-2">→</span>
            </a>
          </div>

          <p className="text-gray-400 text-sm">
            * Precio especial por tiempo limitado. Garantía de 30 días.
          </p>
        </div>
      </section>

      {/* WhatsApp Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gold">
            📱 ¿Necesitas Ayuda? Contáctanos por WhatsApp
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-bold text-gold mb-4">💳 Métodos de Pago</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Tarjeta de crédito/débito</li>
                <li>• Transferencia bancaria</li>
                <li>• PayPal (próximamente)</li>
                <li>• Criptomonedas (próximamente)</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-bold text-gold mb-4">🔑 Activación de Cuenta</h3>
              <ul className="text-gray-300 space-y-2 text-left">
                <li>• Código de activación</li>
                <li>• Configuración inicial</li>
                <li>• Tutorial paso a paso</li>
                <li>• Soporte técnico 24/7</li>
              </ul>
            </div>
            </div>
            
          <div className="mt-8">
            <a
              href="https://wa.me/34612345678?text=Hola! Necesito ayuda con GanaFácil."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition-colors inline-flex items-center"
            >
              💬 Iniciar Chat en WhatsApp
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Translation Info */}
      <section className="py-8 bg-gray-800/30">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-gold mb-4">
            🌍 Información de Traducción
          </h3>
          <p className="text-gray-300">
            Esta página está disponible en múltiples idiomas. 
            Usa el traductor de Google en la parte superior derecha para cambiar el idioma.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gold/20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <Link href="/" className="text-2xl font-bold text-gold hover:text-yellow-400 transition-colors">
              GanaFácil
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="text-gold font-bold mb-3">Enlaces Rápidos</h4>
              <div className="space-y-2">
                <Link href="#features" className="block text-gray-300 hover:text-gold transition-colors">Características</Link>
                <Link href="#lotteries" className="block text-gray-300 hover:text-gold transition-colors">Loterías</Link>
                <Link href="#testimonials" className="block text-gray-300 hover:text-gold transition-colors">Testimonios</Link>
                <Link href="#guarantee" className="block text-gray-300 hover:text-gold transition-colors">Garantía</Link>
              </div>
            </div>
            <div>
              <h4 className="text-gold font-bold mb-3">Soporte</h4>
              <div className="space-y-2">
                <Link href="/admin" className="block text-gray-300 hover:text-gold transition-colors">Panel Admin</Link>
                <a href="https://wa.me/34612345678" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-gold transition-colors">WhatsApp</a>
                <span className="block text-gray-300">Email: info@ganafacil.com</span>
              </div>
            </div>
            <div>
              <h4 className="text-gold font-bold mb-3">Legal</h4>
              <div className="space-y-2">
                <span className="block text-gray-300">Términos y Condiciones</span>
                <span className="block text-gray-300">Política de Privacidad</span>
                <span className="block text-gray-300">Política de Cookies</span>
                        </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm mb-2">
              © 2025 GanaFácil. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs">
              ⚠️ Aviso Legal: Este servicio es únicamente para entretenimiento. 
              No garantizamos ganancias en loterías. Juega responsablemente.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}