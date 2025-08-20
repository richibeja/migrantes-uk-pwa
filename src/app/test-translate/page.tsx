'use client';

import GoogleTranslate from '@/components/GoogleTranslate';

export default function TestTranslatePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gold mb-8 text-center">
          🌐 Prueba del Traductor
        </h1>
        
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30 mb-8">
          <h2 className="text-2xl font-bold text-gold mb-4">Traductor Google</h2>
          <p className="text-gray-300 mb-4">
            Este es el componente de Google Translate. Deberías ver un selector de idioma arriba.
          </p>
          <GoogleTranslate />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-xl font-bold text-gold mb-4">Texto en Español</h3>
            <p className="text-gray-300">
              Este es un texto de ejemplo en español para probar la funcionalidad del traductor.
              El traductor de Google debería poder traducir este texto a otros idiomas.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-xl font-bold text-gold mb-4">Text in English</h3>
            <p className="text-gray-300">
              This is sample text in English to test the translator functionality.
              The Google translator should be able to translate this text to other languages.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="bg-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
          >
            ← Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
