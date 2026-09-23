import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Invitation5IntroProps {
  isFadingOut: boolean;
  onVideoEnded: () => void;
}

export const Invitation5Intro: React.FC<Invitation5IntroProps> = ({
  isFadingOut,
  onVideoEnded,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleStart = useCallback(() => {
    if (isPlaying || isFadingOut) return;

    if (prefersReducedMotion) {
      onVideoEnded();
      return;
    }

    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false; // User gesture permits unmuted audio
      videoRef.current.play().catch(() => {
        // Fallback to muted playback if audio autoplay is restricted
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {
            onVideoEnded();
          });
        }
      });
    }
  }, [isPlaying, isFadingOut, prefersReducedMotion, onVideoEnded]);

  const handleEnded = useCallback(() => {
    // Keep last frame frozen during the fade
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onVideoEnded();
  }, [onVideoEnded]);

  return (
    <div
      className={`invitation5-intro-layer ${
        isFadingOut ? 'invitation5-fade-out' : ''
      }`}
    >
      {/* 1. Underlying Intro Poster */}
      <img
        src="/templates/invitation5/intro-poster.webp"
        alt="Dəvətnamə qapağı"
        className={`invitation5-media absolute inset-0 z-0 transition-opacity duration-300 ${
          isPlaying && !prefersReducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* 2. Opening Video Layer */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src="/templates/invitation5/intro-opening.webm"
          poster="/templates/invitation5/intro-poster.webp"
          playsInline
          preload="auto"
          onEnded={handleEnded}
          onError={handleEnded}
          className={`invitation5-media absolute inset-0 z-10 ${
            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}

      {/* 3. Elegant "Açmaq üçün toxunun" Button (shown before user taps) */}
      {!isPlaying && (
        <button
          type="button"
          onClick={handleStart}
          aria-label="Dəvətnaməni açmaq üçün toxunun"
          className="invitation5-tap-button"
        >
          <span className="invitation5-tap-dot" aria-hidden="true" />
          <span>Açmaq üçün toxunun</span>
        </button>
      )}
    </div>
  );
};
