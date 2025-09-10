'use client';

import { ExternalLink, Play } from 'lucide-react';

interface YouTubeVideoProps {
  language: 'es' | 'en';
  className?: string;
}

export default function YouTubeVideo({ language, className = '' }: YouTubeVideoProps) {
  // URL del video de YouTube (se actualizará cuando el usuario proporcione el link)
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Placeholder - se actualizará
  
  const content = {
    es: {
      title: '🎬 Video Demo - GANA FÁCIL',
      subtitle: 'Descubre cómo funciona nuestro sistema de predicciones',
      description: 'Mira este video de 2.5 minutos y descubre por qué miles de personas confían en GANA FÁCIL para sus predicciones de lotería.',
      watchButton: '📺 Ver Video Completo en YouTube',
      features: [
        '🤖 Agente Anbel IA Súper Inteligente',
        '📊 Algoritmos de Predicción Avanzados',
        '⏰ Datos en Tiempo Real',
        '🎯 94% de Precisión Comprobada',
        '📱 Acceso Móvil Total'
      ]
    },
    en: {
      title: '🎬 Video Demo - WIN EASY',
      subtitle: 'Discover how our prediction system works',
      description: 'Watch this 2.5-minute video and discover why thousands of people trust WIN EASY for their lottery predictions.',
      watchButton: '📺 Watch Full Video on YouTube',
      features: [
        '🤖 Super Intelligent Anbel AI Agent',
        '📊 Advanced Prediction Algorithms',
        '⏰ Real-Time Data',
        '🎯 94% Proven Accuracy',
        '📱 Total Mobile Access'
      ]
    }
  };

  const t = content[language];

  // URL de YouTube - CAMBIAR POR TU LINK
  const youtubeUrl = 'https://www.youtube.com/watch?v=TU_VIDEO_ID_AQUI';

  return (
    <div className={`bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl p-8 text-white ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-xl text-blue-200 mb-2">{t.subtitle}</p>
        <p className="text-blue-300 max-w-2xl mx-auto">{t.description}</p>
      </div>

      {/* Video Container */}
      <div className="relative bg-black rounded-xl overflow-hidden mb-8 shadow-2xl">
        <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
          {/* YouTube Thumbnail */}
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Play className="w-12 h-12 text-white ml-1" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {language === 'es' ? 'Video Demo GANA FÁCIL' : 'WIN EASY Demo Video'}
              </h3>
              <p className="text-gray-300 mb-4">
                {language === 'es' 
                  ? 'Haz clic en el botón de abajo para ver el video completo en YouTube'
                  : 'Click the button below to watch the full video on YouTube'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {t.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <span className="text-2xl">{feature.split(' ')[0]}</span>
            <span className="text-sm font-medium">{feature.substring(feature.indexOf(' ') + 1)}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          <ExternalLink className="w-6 h-6" />
          <span>{t.watchButton}</span>
        </a>
      </div>

      {/* Note */}
      <div className="mt-6 text-center">
        <p className="text-blue-300 text-sm">
          {language === 'es' 
            ? '💡 Nota: El video se abrirá en YouTube en una nueva pestaña.'
            : '💡 Note: The video will open on YouTube in a new tab.'
          }
        </p>
      </div>
    </div>
  );
}
