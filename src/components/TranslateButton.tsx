'use client';

export default function TranslateButton() {
  const translatePage = () => {
    const currentUrl = window.location.href;
    const translateUrl = `https://translate.google.com/translate?u=${encodeURIComponent(currentUrl)}&sl=es&tl=en`;
    window.open(translateUrl, '_blank');
  };

  return (
    <button
      onClick={translatePage}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center space-x-2"
    >
      <span>🌐</span>
      <span>Traducir</span>
    </button>
  );
}
