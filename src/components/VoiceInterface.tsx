'use client';

import React, { useState, useEffect } from 'react';
import { useAnbelAI } from '@/hooks/useAnbelAI';

interface VoiceInterfaceProps {
  onMessage: (message: string) => void;
  language: 'es' | 'en';
}

export default function VoiceInterface({ onMessage, language }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { anbelAI } = useAnbelAI();

  const startListening = async () => {
    try {
      setError(null);
      setIsListening(true);
      setTranscript('');
      
      if (anbelAI) {
        const userMessage = await anbelAI.listenToUser();
        setTranscript(userMessage);
        onMessage(userMessage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en reconocimiento de voz');
    } finally {
      setIsListening(false);
    }
  };

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true);
      if (anbelAI) {
        await anbelAI.speakText(text, language);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en síntesis de voz');
    } finally {
      setIsSpeaking(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.stop();
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg mb-4">
      <h3 className="text-white font-bold mb-3 flex items-center">
        🎤 {language === 'es' ? 'Interfaz de Voz' : 'Voice Interface'}
      </h3>
      
      <div className="flex flex-col space-y-3">
        {/* Botones de control */}
        <div className="flex space-x-2">
          <button
            onClick={startListening}
            disabled={isListening || isSpeaking}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-green-500 hover:bg-green-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isListening ? '🎤 Escuchando...' : '🎤 Hablar'}
          </button>
          
          <button
            onClick={stopListening}
            disabled={!isListening}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⏹️ Parar
          </button>
          
          <button
            onClick={() => speakText(transcript)}
            disabled={!transcript || isSpeaking}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isSpeaking
                ? 'bg-blue-500 text-white animate-pulse'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSpeaking ? '🔊 Reproduciendo...' : '🔊 Repetir'}
          </button>
        </div>

        {/* Transcripción */}
        {transcript && (
          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-white text-sm">
              <strong>{language === 'es' ? 'Dijiste:' : 'You said:'}</strong> {transcript}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 p-3 rounded-lg">
            <p className="text-red-200 text-sm">
              <strong>❌ Error:</strong> {error}
            </p>
          </div>
        )}

        {/* Estado */}
        <div className="text-white/80 text-xs">
          {isListening && '🎤 Escuchando... Di algo para que Anbel te responda'}
          {isSpeaking && '🔊 Anbel está hablando...'}
          {!isListening && !isSpeaking && !transcript && 'Presiona "Hablar" para comenzar'}
        </div>
      </div>
    </div>
  );
}
