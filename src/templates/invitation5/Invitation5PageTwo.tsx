import React, { useRef, useEffect, useState } from 'react';

export interface Invitation5PageTwoProps {
  pageTwoTitle?: string;
  pageTwoQuote?: string;
  groomName: string;
  brideName: string;
  eventDate?: string;
  venueName?: string;
}

export const Invitation5PageTwo: React.FC<Invitation5PageTwoProps> = ({
  pageTwoTitle = 'Sevgi ilə başlayan hekayəmiz',
  pageTwoQuote = 'Bir ömür boyu əl-ələ, eyni arzu və sonsuz sevgiylə...',
  groomName,
  brideName,
  eventDate,
  venueName,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasScrolledIn, setHasScrolledIn] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

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

  // IntersectionObserver: video ekrana yaxınlaşanda oynasın, ekrandan çıxanda dayansın
  useEffect(() => {
    if (prefersReducedMotion) return;

    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasScrolledIn(true);
            if (videoRef.current) {
              if (videoRef.current.preload !== 'auto') {
                videoRef.current.preload = 'auto';
              }
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '120px 0px',
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="invitation5-section invitation5-page-2 relative overflow-hidden select-none"
    >
      {/* 1. Underlying Poster: always ready in DOM */}
      <img
        src="/templates/invitation5/page-2-poster.webp"
        alt="Dəvətnamə 2-ci səhifə"
        className="invitation5-media absolute inset-0 z-0"
      />

      {/* 2. Motion Video: full visual background without card or border */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src="/templates/invitation5/page-2-motion.webm"
          poster="/templates/invitation5/page-2-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="invitation5-media absolute inset-0 z-10"
        />
      )}

      {/* 3. Soft 100-140px Visual Transition Gradient Layer at the top seam */}
      <div className="invitation5-seam-gradient" aria-hidden="true" />

      {/* 
        4. Frame Interior Content:
        Çərçivənin daxilində dəqiq yerləşmə:
        - 15% Yuxarı: “Sevgi ilə başlayan hekayəmiz” (üst çiçəklərə toxunmadan)
        - 36% Mərkəz: Bəy və gəlin adları
        - 53% Poetik mətn
        - 14% Aşağıdan: Tarix və məkan (alt ornamentdən 8-10% yuxarıda)
      */}

      {/* 1. “Sevgi ilə başlayan hekayəmiz” — Yuxarı qaldırılmış mövqe (~15%) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[84%] text-center pointer-events-none"
        style={{ top: '15%' }}
      >
        <p
          className="inv5-font-script text-[#725c3d] leading-none"
          style={{
            fontSize: 'clamp(32px, 7.5vw, 48px)',
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.75)',
          }}
        >
          {pageTwoTitle}
        </p>
      </div>

      {/* 2. Bəy və gəlin adları — Çərçivənin yuxarı-mərkəz hissəsində (~36%) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[82%] max-w-[390px] text-center pointer-events-none"
        style={{ top: '36%' }}
      >
        <h2
          className="inv5-font-script text-[#5c472d] flex flex-wrap items-center justify-center gap-x-2 font-normal"
          style={{
            fontSize: 'clamp(48px, 11vw, 70px)',
            lineHeight: 1,
            textShadow: '0 2px 12px rgba(255, 255, 255, 0.88), 0 1px 3px rgba(255, 255, 255, 0.95)',
          }}
        >
          <span className="inline-block">{brideName}</span>
          <span
            className="inv5-font-serif italic text-[#a98a54] opacity-85"
            style={{ fontSize: '0.65em', margin: '0 4px' }}
          >
            &
          </span>
          <span className="inline-block">{groomName}</span>
        </h2>
      </div>

      {/* 3. Poetik mətn — Adların altında rahat boşluqla (~53%) */}
      {pageTwoQuote && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 w-[70%] max-w-[320px] text-center pointer-events-none"
          style={{ top: '53%' }}
        >
          <p
            className="inv5-font-serif italic text-[#55432f] leading-relaxed"
            style={{
              fontSize: 'clamp(18px, 4.2vw, 25px)',
              lineHeight: 1.45,
              textShadow: '0 2px 10px rgba(255, 255, 255, 0.92)',
            }}
          >
            “{pageTwoQuote}”
          </p>
        </div>
      )}

      {/* 4. Tarix və məkan — Alt ornamentdən yuxarıda (~bottom: 14%) */}
      {(eventDate || venueName) && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 w-[80%] text-center pointer-events-none flex flex-col items-center gap-1"
          style={{ bottom: '14%' }}
        >
          {eventDate && (
            <span
              className="invitation5-page-two-date inv5-font-serif block font-semibold text-[#55432f]"
              style={{
                fontSize: 'clamp(18px, 4.2vw, 24px)',
                letterSpacing: '0.08em',
                textShadow: '0 2px 8px rgba(255, 255, 255, 0.88)',
              }}
            >
              {eventDate}
            </span>
          )}
          {venueName && venueName.trim().length > 0 && (
            <span
              className="invitation5-page-two-venue inv5-font-serif italic block text-[#725c3d]"
              style={{
                fontSize: 'clamp(17px, 4vw, 23px)',
                textShadow: '0 2px 8px rgba(255, 255, 255, 0.88)',
              }}
            >
              {venueName}
            </span>
          )}
        </div>
      )}

      {/* 5. Soft bottom blend transitioning to countdown */}
      <div className="invitation5-page-2-bottom-blend" aria-hidden="true" />
    </section>
  );
};
