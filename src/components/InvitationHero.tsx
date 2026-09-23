import React, { useState, useEffect, useRef } from 'react';
import { mediaUrls } from '../data/invitation';
import { HeroTextOverlay } from './HeroTextOverlay';

export const InvitationHero: React.FC = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [animateText, setAnimateText] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setAnimateText(true);
    }

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setAnimateText(true);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Video hazır olub oynamağa başladıqda çağırılır
  const handleVideoPlaying = () => {
    setIsVideoPlaying(true);
    // Mətn animasiyası hero videosunun onPlaying hadisəsi işə düşdükdən sonra başlayır
    setAnimateText(true);
  };

  const handleVideoError = () => {
    setIsVideoPlaying(false);
    setAnimateText(true);
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('invitation-message');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#F7F1E7]"
    >
      {/* 1. ARXADA AMBIENT FON (Mobil performans üçün hero-poster əsaslı ambient blur qatı) */}
      <img
        src={mediaUrls.heroPoster}
        alt=""
        aria-hidden="true"
        className="absolute -inset-5 w-[calc(100%+40px)] h-[calc(100%+40px)] object-cover blur-[22px] scale-[1.08] opacity-[0.32] pointer-events-none select-none z-0"
      />

      {/* 2. ƏSAS HERO ARTBOARD (941x1672 Aspect Ratio ilə dəqiq proporsional koordinatlar) */}
      <div id="hero-artboard-container" className="hero-artboard z-1">
        {/* Statik Yaxınlaşdırma Qatı (Poster, Video, Gradient və Bütün SVG Mətnləri eyni nisbətdə böyüyür) */}
        <div className="hero-artwork-scale">
          {/* Layer A: Poster (Video hazır olana qədər görünür, sonra 500 ms ərzində fade-out olur) */}
          <img
            src={mediaUrls.heroPoster}
            alt="Toy Dəvətnaməsi Hero Poster"
            className={`hero-media-layer z-1 pointer-events-none select-none transition-opacity duration-500 ease-in-out ${
              isVideoPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Layer B: Əsas hero-motion.webm videosu (contain ilə kəpənəklər tam görünür) */}
          {!prefersReducedMotion && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onPlaying={handleVideoPlaying}
              onError={handleVideoError}
              className="hero-media-layer z-1 opacity-100 filter-none pointer-events-none select-none"
            >
              <source src={mediaUrls.heroVideoWebm} type="video/webm" />
            </video>
          )}

          {/* Layer C: Çox zəif oxunaqlılıq gradienti */}
          <div
            className="absolute inset-0 z-2 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(247, 241, 231, 0.08), rgba(247, 241, 231, 0.03) 55%, rgba(247, 241, 231, 0.12))',
            }}
          />

          {/* Layer D: Bütün mətnlər posterin real ölçüsü (941x1672) ilə eyni SVG overlay daxilində */}
          <HeroTextOverlay
            animate={animateText}
            prefersReducedMotion={prefersReducedMotion}
            onScrollDown={scrollToNext}
          />
        </div>
      </div>
    </section>
  );
};
