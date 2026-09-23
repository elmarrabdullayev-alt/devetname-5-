import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { playSharedAudio } from '../utils/audioManager';
import '../styles/envelope-video-intro.css';

// Tələb olunan media URL-ləri və zaman intervalları
const introPoster = "/invitation/envelope-closed.webp";
const introVideo = "/invitation/envelope-opening.webm";
const heroPoster = "/invitation/hero-poster.webp";
const heroVideo = "/invitation/hero-motion.webm";
const musicUrl = "/invitation/music.mp3";

const INTRO_DURATION_MS = 6000;
const HERO_CROSSFADE_MS = 500;

export type IntroState = 'idle' | 'starting' | 'playing' | 'transitioning' | 'completed';

interface EnvelopeVideoIntroProps {
  onComplete: () => void;
}

export const EnvelopeVideoIntro: React.FC<EnvelopeVideoIntroProps> = ({ onComplete }) => {
  const [state, setState] = useState<IntroState>('idle');
  const [showHint, setShowHint] = useState<boolean>(true);
  const [videoActive, setVideoActive] = useState<boolean>(false);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [playId] = useState<number>(() => Date.now());

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasTriggeredRef = useRef<boolean>(false);
  const isTransitioningRef = useRef<boolean>(false);
  const isCompletedRef = useRef<boolean>(false);

  // Timer referansları
  const transitionStartTimerRef = useRef<number | null>(null);
  const completeTimerRef = useRef<number | null>(null);
  const hintFadeTimerRef = useRef<number | null>(null);

  // Scroll overflow referansları
  const prevBodyOverflowRef = useRef<string>('');
  const prevHtmlOverflowRef = useRef<string>('');

  // 1. Mount & Preload hero-poster.webp & Reduced motion check
  useEffect(() => {
    // hero-poster.webp intro başlamazdan əvvəl preload edilsin
    const preloadedImg = new Image();
    preloadedImg.src = heroPoster;

    // hero-motion.webm üçün də preload bağlantısı
    const preloadVideoLink = document.createElement('link');
    preloadVideoLink.rel = 'preload';
    preloadVideoLink.as = 'video';
    preloadVideoLink.href = heroVideo;
    preloadVideoLink.type = 'video/webm';
    document.head.appendChild(preloadVideoLink);

    // prefers-reduced-motion yoxlanışı
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionHandler);

    return () => {
      motionQuery.removeEventListener('change', motionHandler);
      if (document.head.contains(preloadVideoLink)) {
        document.head.removeChild(preloadVideoLink);
      }
    };
  }, []);

  // 2. Bütün aktiv timer-lərin təmizlənməsi
  const clearAllTimers = useCallback(() => {
    if (transitionStartTimerRef.current !== null) {
      window.clearTimeout(transitionStartTimerRef.current);
      transitionStartTimerRef.current = null;
    }
    if (completeTimerRef.current !== null) {
      window.clearTimeout(completeTimerRef.current);
      completeTimerRef.current = null;
    }
    if (hintFadeTimerRef.current !== null) {
      window.clearTimeout(hintFadeTimerRef.current);
      hintFadeTimerRef.current = null;
    }
  }, []);

  // 3. Scroll kilidinin tənzimlənməsi və cleanup
  const lockScroll = useCallback(() => {
    prevBodyOverflowRef.current = document.body.style.overflow;
    prevHtmlOverflowRef.current = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const restoreScroll = useCallback(() => {
    document.body.style.overflow = prevBodyOverflowRef.current || '';
    document.documentElement.style.overflow = prevHtmlOverflowRef.current || '';
  }, []);

  // 4. Hero bölməsinə keçid və tamamlanma (state: transitioning -> completed)
  const finishIntro = useCallback(() => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;

    clearAllTimers();
    restoreScroll();
    window.scrollTo({ top: 0, behavior: 'auto' });
    setState('completed');
    onComplete();
  }, [clearAllTimers, restoreScroll, onComplete]);

  const startHeroTransition = useCallback((immediate: boolean = false) => {
    if (isTransitioningRef.current || isCompletedRef.current) return;
    isTransitioningRef.current = true;

    setState('transitioning');

    if (immediate) {
      finishIntro();
      return;
    }

    // 500 ms crossfade davam etsin, sonra completed
    completeTimerRef.current = window.setTimeout(() => {
      finishIntro();
    }, HERO_CROSSFADE_MS);
  }, [finishIntro]);

  // 5. İstifadəçi qapağa toxunduqda (Gesture start)
  const handleEnvelopeClick = () => {
    // Təkrar toxunmaların qarşısını al
    if (hasTriggeredRef.current || state !== 'idle') return;
    hasTriggeredRef.current = true;

    // Body və html scroll-unu kilidlə
    lockScroll();

    // Göstəriş mətnini 250 ms ərzində fade-out et
    setShowHint(false);

    // Dəvətnamə musiqisini həmin istifadəçi jesti daxilində başlatmağa çalış
    playSharedAudio().catch(() => {});

    // prefers-reduced-motion aktivdirsə
    if (prefersReducedMotion) {
      setState('starting');
      hintFadeTimerRef.current = window.setTimeout(() => {
        setState('transitioning');
        completeTimerRef.current = window.setTimeout(() => {
          finishIntro();
        }, HERO_CROSSFADE_MS);
      }, 250);
      return;
    }

    // Video üçün hazırlıq
    setState('starting');
    setVideoActive(true);

    // INTRO_DURATION_MS (6000 ms) bitməsinə 500 ms qalmış (yəni 5500 ms-də) transitioning olsun
    const transitionDelay = Math.max(0, INTRO_DURATION_MS - HERO_CROSSFADE_MS);
    transitionStartTimerRef.current = window.setTimeout(() => {
      startHeroTransition(false);
    }, transitionDelay);
  };

  // 6. Video Hadisələri
  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay bloklanarsa dərhal keç
        startHeroTransition(true);
      });
    }
  };

  const handleVideoPlaying = () => {
    setVideoPlaying(true);
    setState('playing');
  };

  const handleVideoEnded = () => {
    // Video INTRO_DURATION_MS timer-indən tez bitərsə təhlükəsiz keçid
    startHeroTransition(false);
  };

  const handleVideoError = () => {
    console.error("Açılış videosu yüklənmədi:", introVideo);
    // İstifadəçiyə xəta göstərilmir, hero-poster üzərindən əsas dəvətnaməyə keçilir
    startHeroTransition(true);
  };

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      clearAllTimers();
      restoreScroll();
    };
  }, [clearAllTimers, restoreScroll]);

  // Əgər tamamlanıbsa, DOM-dan çıxar
  if (state === 'completed') {
    return null;
  }

  return (
    <div
      id="envelope-intro-overlay"
      className="envelope-intro-root"
      aria-label="Toy dəvətnaməsi giriş qapağı"
    >
      {/* Ambient backdrop lighting for desktop view (matches main layout) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 hidden md:block overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#741F3A]/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#C7A56A]/20 blur-[130px]" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#741F3A]/25 blur-[120px]" />
      </div>

      {/* Stage Container: 100dvh, max-width 480px, centered */}
      <div
        id="envelope-intro-stage"
        onClick={handleEnvelopeClick}
        className="envelope-intro-stage border-x border-[#C7A56A]/25"
      >
        {/* Layer 1: Bağlı Qapaq Şəkli (envelope-closed.webp) */}
        <img
          id="envelope-closed-poster"
          src={introPoster}
          alt="Bağlı Dəvətnamə Qapağı"
          className={`envelope-media-layer z-10 select-none pointer-events-none transition-opacity duration-150 ease-in-out ${
            videoPlaying ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Layer 2: Açılış Videosu (envelope-opening.webm) - Yalnız istifadəçi toxunduqdan sonra DOM-a daxil edilir */}
        {videoActive && !prefersReducedMotion && (
          <video
            id="envelope-opening-video"
            key={`opening-${playId}`}
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            loop={false}
            onCanPlay={handleVideoCanPlay}
            onPlaying={handleVideoPlaying}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            className={`envelope-media-layer z-20 pointer-events-none transition-opacity duration-500 ease-in-out ${
              videoPlaying && state !== 'transitioning' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={introVideo} type="video/webm" />
          </video>
        )}

        {/* Layer 3: Hero Poster Pre-crossfade Layer (transitioning mərhələsində 500 ms ilə fade-in edir) */}
        <div
          id="envelope-hero-crossfade-layer"
          className={`envelope-media-layer z-30 pointer-events-none transition-opacity duration-500 ease-in-out ${
            state === 'transitioning' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={heroPoster}
            alt="Hero Preload"
            className="w-full h-full object-cover object-center"
          />
          {/* Zərif krem örtük (Hero ilə eyni rəng çalarları) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F0]/85 via-[#FFF9F0]/75 to-[#FFF9F0]/92 backdrop-blur-[1px]" />
        </div>

        {/* Layer 4: Göstəriş mətni və kiçik yuxarı ox (Yalnız aşağı hissədə, 250 ms fade-out ilə) */}
        <div
          id="envelope-tap-instruction"
          className={`absolute bottom-10 inset-x-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none fade-hint-250 ${
            showHint && state === 'idle'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="w-8 h-8 rounded-full border border-[#C7A56A]/60 bg-[#FFF9F0]/85 backdrop-blur-sm flex items-center justify-center mb-2 shadow-sm animate-bounce">
            <ChevronUp className="w-4 h-4 text-[#741F3A]" />
          </div>
          <p className="font-serif-heading text-sm sm:text-base tracking-[0.16em] text-[#741F3A] font-medium drop-shadow-xs bg-[#FFF9F0]/85 px-4 py-1.5 rounded-full border border-[#C7A56A]/40 backdrop-blur-sm">
            Açmaq üçün ekrana toxunun
          </p>
        </div>
      </div>
    </div>
  );
};
