'use client';

export default function SimpleTranslator() {
  const translateToEnglish = () => {
    try {
      const currentUrl = window.location.href;
      const translateUrl = `https://translate.google.com/translate?u=${encodeURIComponent(currentUrl)}&sl=es&tl=en`;
      window.open(translateUrl, '_blank');
    } catch (error) {
      console.log('Traducción abierta en nueva pestaña');
    }
  };

  return (
    <div className="simple-translator">
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-xs">🌐</span>
        
        {/* Solo Español e Inglés */}
        <span className="text-gray-300 text-xs">🇪🇸 ES</span>
        <button
          onClick={translateToEnglish}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
        >
          🇺🇸 EN
        </button>
      </div>
    </div>
  );
}
