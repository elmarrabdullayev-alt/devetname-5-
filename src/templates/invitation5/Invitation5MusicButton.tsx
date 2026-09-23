import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface Invitation5MusicButtonProps {
  musicUrl?: string;
  autoPlayOnInteraction?: boolean;
}

export const Invitation5MusicButton: React.FC<Invitation5MusicButtonProps> = ({
  musicUrl = '/invitation/music.mp3',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
      {/* Hidden background audio element */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Musiqini dayandır' : 'Musiqini oxut'}
        className="w-12 h-12 rounded-full bg-[#FBF8F3]/95 backdrop-blur-md border border-[#B89A62]/70 shadow-lg text-[#554838] flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-[#B89A62] cursor-pointer"
      >
        {isPlaying ? (
          // Playing animation: rotating vinyl disc / sound waves
          <div className="relative flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B89A62"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin text-[#B89A62]"
              style={{ animationDuration: '4s' }}
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="absolute w-2 h-2 rounded-full bg-[#B89A62]" />
          </div>
        ) : (
          // Paused icon: muted note / play
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#817462]"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="1" y1="1" x2="23" y2="23" stroke="#B89A62" strokeWidth="1.5" />
          </svg>
        )}
      </button>
    </div>
  );
};
