"use client";

import { useState } from 'react';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function HotmartSalesPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [showPlans, setShowPlans] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPlans(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <span className="bg-gold text-black px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
              🎯 #1 EN PREDICCIONES DE LOTERÍA
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              GANA FÁCIL
              <span className="block text-gold">PREDICCIONES DE LOTERÍA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Algoritmos patentados que han ayudado a ganar <strong className="text-gold">más de $500,000 USD</strong> en premios reales
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="bg-gray-800 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <div className="text-xl text-gray-300">Video Demostrativo</div>
                <div className="text-sm text-gray-500">Mostrando la app en funcionamiento</div>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg">
              ▶️ Ver Video Completo
            </button>
          </div>

          {/* CTA Principal */}
          <div className="space-y-4">
            <button
              onClick={() => setShowPlans(true)}
              className="bg-gradient-to-r from-gold to-yellow-500 text-black font-bold text-xl px-12 py-6 rounded-2xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              🚀 COMENZAR AHORA - DESDE $9.97
            </button>
            <p className="text-gray-400 text-sm">
              ✅ Garantía de 30 días • ✅ Acceso inmediato • ✅ Sin compromisos
            </p>
          </div>
        </div>
      </section>

      {/* Problema y Solución */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                ¿Cansado de perder dinero en la lotería?
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <p>Gastas dinero en números aleatorios sin estrategia</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <p>No tienes acceso a análisis profesionales</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <p>Pierdes oportunidades por falta de información</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <p>No sabes cuándo es el mejor momento para jugar</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gold mb-6">
                ¡Gana Fácil es la solución!
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✅</span>
                  <p>Algoritmos patentados que analizan patrones históricos</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✅</span>
                  <p>Predicciones en tiempo real actualizadas cada 10 segundos</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✅</span>
                  <p>Análisis de 9 loterías internacionales principales</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-gold text-xl">✅</span>
                  <p>Notificaciones push para no perder oportunidades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características Principales */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            🎯 ¿Por qué Gana Fácil es diferente?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-gold mb-3">Algoritmos Patentados</h3>
              <p className="text-gray-300">4 métodos únicos: Anbel, Fibonacci, Estadístico y Filtrado Cruzado</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gold mb-3">Tiempo Real</h3>
              <p className="text-gray-300">Actualizaciones cada 10 segundos con datos frescos</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gold mb-3">9 Loterías</h3>
              <p className="text-gray-300">Powerball, Mega Millions, EuroMillions, Baloto y más</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gold mb-3">Análisis Avanzado</h3>
              <p className="text-gray-300">Estadísticas históricas y patrones de frecuencia</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-gold mb-3">Notificaciones</h3>
              <p className="text-gray-300">Alertas personalizadas para no perder oportunidades</p>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gold mb-3">Multiplataforma</h3>
              <p className="text-gray-300">Funciona en móvil, tablet y computadora</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <TestimonialsSection />

      {/* Planes de Suscripción */}
      {showPlans && (
        <section className="py-20 bg-gray-800">
          <SubscriptionPlans onPlanSelect={handlePlanSelect} currentPlan={selectedPlan} />
        </section>
      )}

      {/* Garantía */}
      <section className="py-20 bg-gradient-to-r from-gold/20 to-yellow-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            🛡️ Garantía de 30 Días
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Si no estás 100% satisfecho con Gana Fácil, te devolvemos tu dinero sin preguntas.
            <br />
            <strong className="text-gold">Sin riesgos, sin compromisos.</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Devolución Completa</h3>
              <p className="text-gray-300">100% de tu dinero de vuelta</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Proceso Rápido</h3>
              <p className="text-gray-300">Devolución en 24-48 horas</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Sin Preguntas</h3>
              <p className="text-gray-300">No necesitas justificar tu decisión</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para cambiar tu suerte?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de ganadores que ya confían en Gana Fácil
          </p>
          <button
            onClick={() => setShowPlans(true)}
            className="bg-gradient-to-r from-gold to-yellow-500 text-black font-bold text-2xl px-16 py-6 rounded-2xl hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            🚀 COMENZAR AHORA
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Acceso inmediato • Garantía de 30 días • Soporte 24/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-gray-400 text-sm space-y-2">
            <p>© 2025 Gana Fácil - Predicciones de Lotería</p>
            <p>Contacto: richardbejarano52@gmail.com</p>
            <p className="text-xs">
              * Gana Fácil es una herramienta de entretenimiento. No garantizamos ganancias.
              <br />
              Juega responsablemente. Los resultados pueden variar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
