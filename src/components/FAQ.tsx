"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Función simple de traducción para evitar errores
  const t = (key: string): string => key;

  const faqData: FAQItem[] = [
    {
      question: "¿Cómo funciona la app?",
      answer: "La PWA incluye Q&A, generación de PDF, subida a Storage, OCR/MRZ en dispositivo, directorio y asistente.",
      category: "app",
      icon: "🧭"
    },
    {
      question: "¿Qué módulos están disponibles?",
      answer: "Q&A, carta/PDF, Upload/OCR, Directorio, Asistente, Perfil.",
      category: "modulos",
      icon: "🧩"
    },
    {
      question: "¿Es segura la app?",
      answer: "OCR/MRZ en dispositivo, datos locales en IndexedDB y envío a Firestore solo cuando lo confirmas.",
      category: "seguridad",
      icon: "🔒"
    },
    {
      question: "¿La app reemplaza asesoría legal?",
      answer: "No. Es informativa. Para asesoría legal acude a profesionales regulados y fuentes oficiales.",
      category: "legal",
      icon: "⚖️"
    },
    {
      question: "¿Puedo usar la app desde mi móvil?",
      answer: "Sí. Es una PWA instalable con soporte offline básico y notificaciones.",
      category: "tecnologia",
      icon: "📱"
    },
    {
      question: "¿Qué límites tiene la app?",
      answer: "No sustituye asesoría legal y algunas funciones requieren conexión (ej. envío a Firestore).",
      category: "limites",
      icon: "ℹ️"
    },
    {
      question: "¿Qué idiomas soporta?",
      answer: "Español e inglés. Próximamente selector manual y detección automática.",
      category: "idiomas",
      icon: "🌍"
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', icon: '📋' },
    { id: 'algoritmos', name: 'Algoritmos', icon: '🔮' },
    { id: 'loterias', name: 'Loterías', icon: '🎰' },
    { id: 'seguridad', name: 'Seguridad', icon: '🔒' },
    { id: 'garantias', name: 'Garantías', icon: '✅' },
    { id: 'tecnologia', name: 'Tecnología', icon: '📱' },
    { id: 'activacion', name: 'Activación', icon: '🔑' },
    { id: 'sistema', name: 'Sistema', icon: '⚙️' },
    { id: 'suscripcion', name: 'Suscripción', icon: '🔄' }
  ];

  const filteredFAQs = faqData;

  const toggleItem = (index: number) => {
    setOpenIndex(prev => 
      prev === index 
        ? null
        : index
    );
  };

  return (
    <div className="py-16 px-4 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-6">
            ❓ Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Resolvemos dudas frecuentes sobre la app y sus módulos principales</p>
        </motion.div>

        {/* Filtros de categorías */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {}} // No action for now
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  'all' === category.id
                    ? 'bg-gold text-black shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lista de FAQs */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl overflow-hidden glass-effect"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {item.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gold text-xl"
                >
                  ▼
                </motion.div>
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-300 border-t border-gray-700">
                    <p className="pt-4 leading-relaxed">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              🤔 ¿Tienes más preguntas?
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/18053080769"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 inline-block"
              >
                💬 WhatsApp
              </a>
              <a
                href="/activate"
                className="bg-gold text-black font-bold text-xl px-8 py-4 rounded-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 inline-block"
              >
                🚀 Activar Ahora
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};




































