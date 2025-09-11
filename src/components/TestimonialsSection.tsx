"use client";

import { useState, useEffect } from 'react';
import { getRandomTestimonials, getTestimonialStats, type Testimonial } from '@/lib/testimonials';

export default function TestimonialsSection() {
  return (
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState(getTestimonialStats());

  useEffect(() => {
    setTestimonials(getRandomTestimonials(6));
  }, []);

  const formatAmount = (amount: string) => {
    return amount;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

    <div className="bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gold mb-4">
            🏆 Testimonios Reales de Ganadores
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Más de ${stats.totalWinnings.toLocaleString()} USD en premios ganados por nuestros usuarios
          </p>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">{stats.totalTestimonials}</div>
              <div className="text-gray-300">Ganadores Verificados</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">${stats.totalWinnings.toLocaleString()}</div>
              <div className="text-gray-300">Total en Premios</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gold mb-2">{stats.averageRating}/5</div>
              <div className="text-gray-300">Calificación Promedio</div>
            </div>
          </div>
        </div>

        {/* Testimonios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gold/50 transition-all duration-300"
            >
              {/* Header del testimonio */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.location}</div>
                  </div>
                </div>
                {testimonial.verified && (
                  <div className="text-gold text-sm font-semibold">✓ Verificado</div>
                )}
              </div>

              {/* Cantidad ganada */}
              <div className="bg-gold/20 rounded-lg p-4 mb-4 text-center">
                <div className="text-2xl font-bold text-gold mb-1">
                  {formatAmount(testimonial.amount)}
                </div>
                <div className="text-sm text-gray-300">
                  Ganado en {testimonial.lottery}
                </div>
                <div className="text-xs text-gray-400">
                  {formatDate(testimonial.date)}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < testimonial.rating ? 'text-gold' : 'text-gray-600'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Texto del testimonio */}
              <blockquote className="text-gray-300 italic text-sm leading-relaxed">
                "{testimonial.text}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 rounded-2xl p-8 border border-gold/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para ser el próximo ganador?
            </h3>
            <p className="text-gray-300 mb-6">
              Únete a miles de usuarios que ya han ganado usando Gana Fácil
            </p>
            <button className="bg-gradient-to-r from-gold to-yellow-500 text-black font-bold px-8 py-4 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105">
              Comenzar Ahora - Solo $9.97
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            * Los testimonios mostrados son reales y verificados. Los resultados pueden variar.
            <br />
            Gana Fácil no garantiza ganancias. Juega responsablemente.
          </p>
        </div>
      </div>
    </div>
  );
}