'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrizeTracker() {
  const [totalPrizes, setTotalPrizes] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animatePrizes();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('prize-tracker');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const animatePrizes = () => {
    const targetPrizes = 2500000; // $2.5M
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setTotalPrizes(Math.floor(targetPrizes * progress));

      if (step >= steps) {
        clearInterval(timer);
        setTotalPrizes(targetPrizes);
      }
    }, interval);
  };

  if (!isVisible) {
    return (
      <section id="prize-tracker" className="py-16 bg-gradient-to-r from-gold/10 to-yellow-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gold mb-4">
            Premios Acumulados
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Mira cuánto dinero han ganado nuestros usuarios
          </p>
          <div className="text-6xl font-bold text-gold">
            $0
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="prize-tracker" className="py-16 bg-gradient-to-r from-gold/10 to-yellow-500/10">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gold mb-4"
        >
          Premios Acumulados
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-300 mb-8"
        >
          Mira cuánto dinero han ganado nuestros usuarios
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl font-bold text-gold mb-6"
        >
          ${totalPrizes.toLocaleString()}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-gray-400 text-lg"
        >
          Ver la próxima actualización en tu dashboard.
        </motion.div>
      </div>
    </section>
  );
}
























