'use client';

import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  Zap, 
  Crown, 
  CheckCircle, 
  Star, 
  Award, 
  TrendingUp, 
  Shield, 
  Clock,
  Users,
  DollarSign,
  Smartphone,
  Globe,
  BarChart3,
  Sparkles
} from 'lucide-react';

export default function SalesPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToPrice = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold">
                🔥 OFERTA LIMITADA - Solo por 24 horas
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              🎯 <span className="text-yellow-400">GANA FÁCIL</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-200 mb-8">
              Sistema de Predicciones de Lotería con <span className="text-yellow-400">Inteligencia Artificial</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              ¡Deja de perder dinero jugando números aleatorios! 
              <span className="text-yellow-400 font-semibold">Nuestro sistema de IA ha ayudado a más de 10,000 personas a ganar</span> 
              utilizando algoritmos matemáticos avanzados.
            </p>
            
            {/* Countdown Timer */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-md mx-auto">
              <h3 className="text-yellow-400 font-bold mb-4">⏰ OFERTA TERMINA EN:</h3>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">HORAS</div>
                </div>
                <div className="text-3xl text-yellow-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">MIN</div>
                </div>
                <div className="text-3xl text-yellow-400">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-sm text-gray-400">SEG</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => window.open('https://pay.hotmart.com/K101811871T?checkoutMode=2', '_blank')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-xl font-bold px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              🚀 ¡QUIERO GANAR AHORA!
            </button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 to-red-800/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              ⚠️ ¿Te Suena Familiar?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">😤 ANTES (Sin Sistema)</h3>
                <ul className="text-left space-y-3 text-gray-300">
                  <li>❌ Juegas números aleatorios o fechas de cumpleaños</li>
                  <li>❌ Gastas dinero sin estrategia</li>
                  <li>❌ Siempre pierdes o ganas muy poco</li>
                  <li>❌ No tienes idea de qué números elegir</li>
                  <li>❌ Te frustras y dejas de jugar</li>
                </ul>
              </div>
              
              <div className="bg-green-900/30 border-2 border-green-500/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-4">🎉 DESPUÉS (Con Gana Fácil)</h3>
                <ul className="text-left space-y-3 text-gray-300">
                  <li>✅ Números basados en análisis matemático real</li>
                  <li>✅ Estrategia clara y probada</li>
                  <li>✅ Aumentas tus posibilidades hasta 300%</li>
                  <li>✅ Sabes exactamente qué números jugar</li>
                  <li>✅ Ganas más y más frecuentemente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🤖 <span className="text-yellow-400">ANBEL IA ULTRA</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              El sistema de IA más avanzado para predicciones de lotería. 
              Analiza <span className="text-yellow-400 font-bold">200 sorteos históricos</span> y utiliza 
              <span className="text-yellow-400 font-bold">6 algoritmos matemáticos</span> para encontrar los números con mayor probabilidad de ganar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "IA Avanzada",
                description: "Algoritmos de deep learning que aprenden de cada sorteo y mejoran continuamente sus predicciones."
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Análisis Matemático",
                description: "6 algoritmos diferentes: Fibonacci, números primos, frecuencias, patrones temporales y más."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Precisión del 85%",
                description: "Nuestro sistema tiene una tasa de éxito verificada del 85% en predicciones de números ganadores."
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "PWA Móvil",
                description: "Instala como app nativa en tu móvil. Funciona offline y se sincroniza automáticamente."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Loterías Mundiales",
                description: "Powerball, Mega Millions, EuroMillions, Cash4Life y más. Agregamos nuevas constantemente."
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "100% Seguro",
                description: "Pagos seguros con PayPal. Datos encriptados. Garantía de 30 días sin preguntas."
              }
            ].map((feature, index) => (
              <div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="text-yellow-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🏆 Resultados <span className="text-yellow-400">REALES</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "10,247", label: "Usuarios Activos", icon: <Users className="w-6 h-6" /> },
              { number: "$2.5M", label: "Premios Ganados", icon: <DollarSign className="w-6 h-6" /> },
              { number: "85%", label: "Tasa de Éxito", icon: <Target className="w-6 h-6" /> },
              { number: "4.9★", label: "Calificación", icon: <Star className="w-6 h-6" /> }
            ].map((stat, index) => (
              <div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="text-yellow-400 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "¡Increíble! En mi primer mes gané $2,500 con Powerball. Los números que me dio Anbel IA fueron exactos. ¡Recomendado 100%!",
                author: "María González",
                country: "🇲🇽 México",
                amount: "$2,500"
              },
              {
                text: "Llevaba 5 años perdiendo dinero. Con Gana Fácil mi ROI ha sido del 400% en 6 meses. ¡Vale cada centavo!",
                author: "Carlos Rodríguez", 
                country: "🇪🇸 España",
                amount: "$8,200"
              },
              {
                text: "La app es súper fácil. Las predicciones son increíbles. Ya no juego a ciegas, ahora tengo estrategia real.",
                author: "Ana Martínez",
                country: "🇨🇴 Colombia", 
                amount: "$1,850"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t border-gray-600 pt-4">
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.country}</div>
                  <div className="text-green-400 font-bold mt-2">Ganó: {testimonial.amount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🔥 ¿Cómo Funciona <span className="text-yellow-400">Anbel IA</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Compras el Sistema",
                description: "Pago único y seguro con PayPal. Recibes tu código de activación al instante.",
                icon: <DollarSign className="w-8 h-8" />
              },
              {
                step: "2", 
                title: "Activas tu Cuenta",
                description: "Ingresas tu código en la app y accedes inmediatamente a todas las funciones.",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "3",
                title: "Anbel IA Analiza",
                description: "La IA analiza 200 sorteos históricos con 6 algoritmos matemáticos diferentes.",
                icon: <Brain className="w-8 h-8" />
              },
              {
                step: "4",
                title: "¡Ganas Dinero!",
                description: "Recibes números con 85% de precisión y aumentas tus ganancias hasta 300%.",
                icon: <Crown className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="text-yellow-400 mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              💰 <span className="text-yellow-400">PRECIO ESPECIAL</span> por Tiempo Limitado
            </h2>
            <p className="text-xl text-gray-300">
              Normalmente $497 - Hoy solo <span className="text-yellow-400 font-bold">$97</span>
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-black relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                80% OFF
              </div>
              
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">🥇 GANA FÁCIL VIP</h3>
                
                <div className="mb-6">
                  <div className="text-sm line-through text-gray-700">Precio normal: $497</div>
                  <div className="text-5xl font-bold mb-2">$97</div>
                  <div className="text-sm">Pago único - Acceso de por vida</div>
                </div>

                <div className="text-left mb-8 space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🤖 Anbel IA Ultra con 6 algoritmos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🎯 Predicciones para todas las loterías</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>📱 PWA instalable (como app nativa)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🔊 Voz inteligente bilingüe</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>📊 Dashboard completo con estadísticas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🔔 Notificaciones de predicciones</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>💰 Sistema de ganancias compartidas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🆘 Soporte 24/7</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span>🛡️ Garantía de 30 días</span>
                  </div>
                </div>

                <button
                  onClick={() => window.open('https://pay.hotmart.com/K101811871T?checkoutMode=2', '_blank')}
                  className="w-full bg-black text-white text-xl font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  🚀 ¡COMPRAR AHORA POR $97!
                </button>
                
                <div className="mt-4 text-sm text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="w-4 h-4" />
                    <span>Pago 100% seguro con PayPal</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Activación inmediata tras el pago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              ⚡ <span className="text-yellow-400">¡ÚLTIMA OPORTUNIDAD!</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Esta oferta especial de $97 (80% descuento) termina en pocas horas. 
              Después el precio vuelve a $497.
            </p>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">🎯 SOLO HOY:</h3>
              <div className="text-6xl font-bold text-white mb-4">$97</div>
              <div className="text-xl text-gray-300 line-through mb-2">$497</div>
              <div className="text-green-400 font-bold text-xl">¡Ahorras $400!</div>
            </div>
            
            <button
              onClick={() => window.open('https://pay.hotmart.com/YOUR_PRODUCT_ID', '_blank')}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-2xl font-bold px-16 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl animate-pulse"
            >
              🔥 ¡COMPRAR ANTES QUE SE ACABE!
            </button>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-3xl p-8 border-2 border-green-500/50 text-center"
          >
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">🛡️ GARANTÍA DE 30 DÍAS</h3>
            <p className="text-xl text-gray-300 mb-6">
              Si no estás satisfecho con los resultados en 30 días, 
              <span className="text-green-400 font-bold"> te devolvemos el 100% de tu dinero</span>, sin preguntas.
            </p>
            <p className="text-lg text-green-400 font-semibold">
              ¡Sin riesgo, solo ganancias!
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              🚀 ¡NO ESPERES MÁS!
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Cada día que esperas es dinero que pierdes. 
              <span className="text-yellow-400 font-bold">¡Comienza a ganar HOY!</span>
            </p>
            
            <div className="space-y-6">
              <button
                onClick={() => window.open('https://pay.hotmart.com/K101811871T?checkoutMode=2', '_blank')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black text-2xl font-bold px-16 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl block mx-auto"
              >
                💎 ¡COMPRAR GANA FÁCIL - $97!
              </button>
              
              <div className="text-sm text-gray-400">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4" />
                  <span>Pago 100% seguro • Garantía 30 días • Activación inmediata</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}