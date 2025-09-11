'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCounters() {
) => observer.disconnect();
    return () => observer.disconnect();
  const [counters, setCounters] = useState({
    users: 0,
    predictions: 0,
    accuracy: 0,
    prizes: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('animated-counters');
    if (element) {
      observer.observe(element);
    }

  }, []);

  const animateCounters = () => {
    const targetValues = {
      users: 15420,
      predictions: 89234,
      accuracy: 87,
      prizes: 2500000
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        users: Math.floor(targetValues.users * progress),
        predictions: Math.floor(targetValues.predictions * progress),
        accuracy: Math.floor(targetValues.accuracy * progress),
        prizes: Math.floor(targetValues.prizes * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters(targetValues);
      }
    }, interval);
  };

  const counterData = [
    {
      label: 'Usuarios Activos',
      value: counters.users,
      suffix: '+',
      icon: '👥',
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Predicciones Generadas',
      value: counters.predictions,
      suffix: '',
      icon: '🎯',
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Precisión Promedio',
      value: counters.accuracy,
      suffix: '%',
      icon: '📊',
      color: 'from-gold-500 to-yellow-600'
    },
    {
      label: 'Premios Acumulados',
      value: counters.prizes,
      suffix: ' USD',
      icon: '💰',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  if (!isVisible) {
    return (
      <section id="animated-counters" className="py-16 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gold mb-4">
              Estadísticas en Tiempo Real
            </h2>
            <p className="text-xl text-gray-300">Indicadores clave del proyecto</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {counterData.map((counter, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <div className="text-4xl mb-2">{counter.icon}</div>
                  <div className="text-2xl font-bold text-gold mb-2">
                    {counter.value.toLocaleString()}{counter.suffix}
                  </div>
                  <div className="text-gray-300">{counter.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="animated-counters" className="py-16 bg-gray-800/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gold mb-4">
            Estadísticas en Tiempo Real
          </h2>
          <p className="text-xl text-gray-300">Indicadores clave del proyecto</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {counterData.map((counter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`bg-gradient-to-br ${counter.color} rounded-lg p-6 text-white shadow-lg`}>
                <div className="text-4xl mb-2">{counter.icon}</div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-2xl font-bold mb-2"
                >
                  {counter.value.toLocaleString()}{counter.suffix}
                </motion.div>
                <div className="text-white/90">{counter.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
