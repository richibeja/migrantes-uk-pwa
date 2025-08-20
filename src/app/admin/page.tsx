'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const showMessage = (msg: string, type: 'success' | 'error' | 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const generateCode = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newCode = `ADMIN${timestamp.toString().slice(-4)}${random}`;
    
    setGeneratedCodes(prev => [...prev, newCode]);
    showMessage(`Código generado: ${newCode}`, 'success');
  };

  const clearCodes = () => {
    setGeneratedCodes([]);
    showMessage('Códigos limpiados', 'info');
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    showMessage(`Código copiado: ${code}`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🔐 Panel de Administración</h1>
          <p className="text-gray-400">Genera códigos de activación para GanaFácil</p>
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${
            messageType === 'success' ? 'bg-green-900/50 border border-green-500 text-green-200' :
            messageType === 'error' ? 'bg-red-900/50 border border-red-500 text-red-200' :
            'bg-blue-900/50 border border-blue-500 text-blue-200'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          <div className="flex gap-4 mb-6">
            <button
              onClick={generateCode}
              className="bg-gradient-to-r from-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-gold transition-all duration-300 transform hover:scale-105"
            >
              🎯 Generar Nuevo Código
            </button>
            
            <button
              onClick={clearCodes}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-lg hover:from-red-500 hover:to-red-600 transition-all duration-300"
            >
              🗑️ Limpiar Códigos
            </button>
          </div>

          {generatedCodes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Códigos Generados:</h3>
              <div className="grid gap-3">
                {generatedCodes.map((code, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <span className="text-gold font-mono text-lg">{code}</span>
                    <button
                      onClick={() => copyToClipboard(code)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      📋 Copiar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => window.history.back()}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
