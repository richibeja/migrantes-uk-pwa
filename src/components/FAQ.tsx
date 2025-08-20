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
  const t = (key: string): string => {
    const translations: { [key: string]: string } = {
      'Preguntas Frecuentes': 'Preguntas Frecuentes',
      '¿Cómo funciona GanaFácil?': '¿Cómo funciona GanaFácil?',
      '¿Es seguro usar GanaFácil?': '¿Es seguro usar GanaFácil?',
      '¿Qué loterías soporta?': '¿Qué loterías soporta?',
      '¿Cuánto cuesta?': '¿Cuánto cuesta?'
    };
    return translations[key] || key;
  };

  const faqData: FAQItem[] = [
    {
      question: "¿Cómo funcionan los algoritmos de predicción de GanaFácil?",
      answer: "GanaFácil utiliza 4 métodos avanzados: 1) Algoritmo Anbel con patrones matemáticos complejos, 2) Análisis probabilístico basado en estadísticas históricas, 3) Método histórico de tendencias, y 4) Filtrado cruzado que combina todos los métodos para máxima precisión.",
      category: "algoritmos",
      icon: "🔮"
    },
    {
      question: "¿Qué loterías están disponibles en GanaFácil?",
      answer: "Actualmente soportamos 9 loterías principales: Baloto (Colombia), Lotto UK, EuroMillions UK, EuroMillions (Europa), La Primitiva (España), Bonoloto (España), Powerball (USA), Mega Millions (USA) y Florida Lotto (USA). Cada una con predicciones actualizadas en tiempo real.",
      category: "loterias",
      icon: "🎰"
    },
    {
      question: "¿Con qué frecuencia se actualizan las predicciones?",
      answer: "Las predicciones se actualizan automáticamente cada hora. Los números se bloquean hasta el próximo sorteo para mantener la integridad del sistema. Puedes ver la próxima actualización en tu dashboard.",
      category: "sistema",
      icon: "⏰"
    },
    {
      question: "¿Es seguro usar GanaFácil?",
      answer: "Absolutamente. Utilizamos encriptación de nivel bancario, no almacenamos información personal sensible, y todas las transacciones son seguras. Tu privacidad y seguridad son nuestra máxima prioridad.",
      category: "seguridad",
      icon: "🔒"
    },
    {
      question: "¿Qué pasa si no gano con las predicciones?",
      answer: "GanaFácil aumenta significativamente tus probabilidades, pero la lotería siempre tiene un elemento de azar. Sin embargo, nuestros algoritmos están diseñados para maximizar las posibilidades de éxito basándose en análisis matemático avanzado.",
      category: "garantias",
      icon: "✅"
    },
    {
      question: "¿Puedo usar GanaFácil desde mi móvil?",
      answer: "¡Sí! GanaFácil es una Progressive Web App (PWA) que funciona perfectamente en todos los dispositivos. Puedes instalarla en tu móvil y recibir notificaciones push de nuevas predicciones.",
      category: "tecnologia",
      icon: "📱"
    },
    {
      question: "¿Cómo obtengo mi código de activación?",
      answer: "Puedes obtener tu código de activación de dos formas: 1) Contactando directamente por WhatsApp al +19295909116, o 2) Pagando de forma segura con PayPal. Ambos métodos te dan acceso inmediato.",
      category: "activacion",
      icon: "🔑"
    },
    {
      question: "¿Las predicciones son 100% garantizadas?",
      answer: "Ningún sistema de predicción puede garantizar el 100% de éxito en la lotería. Sin embargo, GanaFácil utiliza algoritmos matemáticos avanzados que han demostrado aumentar significativamente las probabilidades de ganar.",
      category: "garantias",
      icon: "📊"
    },
    {
      question: "¿Puedo cancelar mi suscripción en cualquier momento?",
      answer: "Sí, puedes cancelar tu acceso en cualquier momento. No hay contratos a largo plazo ni cargos ocultos. Tu código de activación te da acceso completo sin compromisos.",
      category: "suscripcion",
      icon: "🔄"
    },
    {
      question: "¿Qué idiomas soporta GanaFácil?",
      answer: "GanaFácil está disponible en español e inglés, con detección automática del idioma según tu ubicación. Puedes cambiar el idioma manualmente en cualquier momento desde el selector de idioma.",
      category: "tecnologia",
      icon: "🌍"
    },
    {
      question: "¿Cómo se calculan las probabilidades de éxito?",
      answer: "Nuestras probabilidades se basan en análisis de millones de sorteos históricos, patrones matemáticos complejos, y algoritmos de machine learning. Cada predicción incluye un nivel de confianza basado en estos análisis.",
      category: "algoritmos",
      icon: "🧮"
    },
    {
      question: "¿Puedo compartir mi código de activación?",
      answer: "No, cada código de activación es único y personal. Compartirlo puede resultar en la suspensión de tu cuenta. Para mayor seguridad, mantén tu código privado.",
      category: "seguridad",
      icon: "🚫"
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Resolvemos todas tus dudas sobre GanaFácil y cómo funciona nuestro sistema de predicciones
          </p>
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
                href="https://wa.me/19295909116"
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




































