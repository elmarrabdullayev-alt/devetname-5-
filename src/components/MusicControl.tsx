import React, { useState, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';
import {
  getSharedAudio,
  playSharedAudio,
  pauseSharedAudio,
  isSharedAudioPlaying,
  subscribeAudio
} from '../utils/audioManager';

export const MusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => isSharedAudioPlaying());

  useEffect(() => {
    // Shared audio instansiyasını təmin et
    getSharedAudio();

    const unsubscribe = subscribeAudio(() => {
      setIsPlaying(isSharedAudioPlaying());
    });

    // Başlanğıc statusunu yoxla
    setIsPlaying(isSharedAudioPlaying());

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleMusic = async () => {
    if (isPlaying) {
      pauseSharedAudio();
    } else {
      await playSharedAudio();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        id="wedding-music-control"
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? 'Musiqini dayandır' : 'Musiqini səsləndir'}
        title={isPlaying ? 'Musiqini dayandır' : 'Musiqini səsləndir'}
        className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#C7A56A]/60 bg-[#FFF9F0]/90 backdrop-blur-md shadow-md flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer hover:border-[#741F3A] ${
          isPlaying ? 'ring-2 ring-[#C7A56A]/40' : ''
        }`}
      >
        {/* Subtle spinning music note when active */}
        <div
          className={`transition-transform duration-500 ${
            isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
          }`}
        >
          {isPlaying ? (
            <Music className="w-5 h-5 text-[#741F3A]" />
          ) : (
            <VolumeX className="w-5 h-5 text-[#741F3A]/60" />
          )}
        </div>

        {/* Small subtle badge ring if playing */}
        {isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#C7A56A] rounded-full animate-ping" />
        )}
      </button>
    </div>
  );
};
