'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VoicePlayerProps {
  audioId: string;
  title: string;
  description?: string;
  autoPlay?: boolean;
  showControls?: boolean;
  language?: 'es' | 'en';
}

export default function VoicePlayer({ 
  audioId, 
  title, 
  description, 
  autoPlay = false, 
  showControls = true,
  language = 'en'
}: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio URLs mapping (will be populated with generated audios)
  const audioUrls: { [key: string]: string } = {
    'welcome_tutorial': '/audio/welcome_tutorial.mp3',
    'module1_explanation': '/audio/module1_explanation.mp3',
    'module2_explanation': '/audio/module2_explanation.mp3', 
    'module3_explanation': '/audio/module3_explanation.mp3',
    'module4_explanation': '/audio/module4_explanation.mp3',
    'completion_congratulations': '/audio/completion_congratulations.mp3',
    'support_message': '/audio/support_message.mp3'
  };

  // Check if audio exists (now we have real files)
  const audioExists = audioUrls[audioId] && audioUrls[audioId] !== '';
  
  if (!audioExists || audioId === 'completion_congratulations') {
    return (
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
            {description && (
              <p className="text-sm text-gray-300">{description}</p>
            )}
            <p className="text-xs text-yellow-400 mt-2">🎵 Audio tutorial ready to generate! Use Google AI Studio with provided scripts</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsLoading(false);
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const texts = {
    en: {
      loading: 'Loading audio...',
      play: 'Play audio explanation',
      pause: 'Pause audio',
      mute: 'Mute',
      unmute: 'Unmute'
    },
    es: {
      loading: 'Cargando audio...',
      play: 'Reproducir explicación de audio',
      pause: 'Pausar audio',
      mute: 'Silenciar',
      unmute: 'Activar sonido'
    }
  };

  const t = texts[language];

  return (
    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
          {description && (
            <p className="text-sm text-gray-300">{description}</p>
          )}
        </div>
        
        {showControls && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors disabled:opacity-50"
              title={isPlaying ? t.pause : t.play}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
            
            <button
              onClick={handleMute}
              className="flex items-center justify-center w-10 h-10 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors"
              title={isMuted ? t.unmute : t.mute}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        )}
      </div>
      
      <audio
        ref={audioRef}
        src={audioUrls[audioId]}
        onEnded={handleEnded}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        autoPlay={autoPlay}
        muted={isMuted}
        preload="metadata"
      />
      
      {isLoading && (
        <div className="mt-2 text-sm text-blue-300 flex items-center">
          <div className="w-4 h-4 border-2 border-blue-300 border-t-transparent rounded-full animate-spin mr-2" />
          {t.loading}
        </div>
      )}
    </div>
  );
}
