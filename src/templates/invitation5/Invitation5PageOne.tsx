import React, { useRef, useEffect, useState } from 'react';
import { RoyalDivider } from './Invitation5Ornament';

export interface Invitation5PageOneProps {
  groomName: string;
  brideName: string;
  eventDate?: string;
  startTime?: string;
  invitationText: string;
  familyNames?: string;
}

export const Invitation5PageOne: React.FC<Invitation5PageOneProps> = ({
  groomName,
  brideName,
  eventDate,
  startTime,
  invitationText,
  familyNames,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
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

  // Cleanup on unmount: pause video and reset currentTime
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <section className="invitation5-section invitation5-page-1 invitation5-page-one relative overflow-hidden select-none">
      {/* 1. Underlying Poster: Always present and pre-rendered in DOM */}
      <img
        src="/templates/invitation5/page-1-poster.webp"
        alt="Dəvətnamə 1-ci səhifə"
        className="invitation5-media absolute inset-0 z-0"
      />

      {/* 2. Motion Video: Preloaded and layered directly above poster */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          src="/templates/invitation5/page-1-motion.webm"
          poster="/templates/invitation5/page-1-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="invitation5-media absolute inset-0 z-10"
        />
      )}

      {/* 
        3. Text Layers: Positioned independently from video via absolute coordinates.
        Lüstra 0% - 44% intervalındadır və tam görünür; heç bir mətn onun üzərini örtmür.
        1. Toy dəvətnaməsi başlığı
        2. Bəy və gəlin adları
        3. Toy tarixi və başlama saatı
        4. Ornamental ayırıcı
        5. Fərdi dəvət mətni
        6. Ailə adları (yalnız daxil edilibsə)
      */}

      {/* 1. Kiçik başlıq: lüstranın dərhal altında, adların üzərində (~44%) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[90%] text-center pointer-events-none"
        style={{ top: '44%' }}
      >
        <p
          className="inv5-font-ui uppercase tracking-[0.3em] text-[#a98a54] font-medium"
          style={{ fontSize: 'clamp(9.5px, 2.3vw, 12px)' }}
        >
          Toy Dəvətnaməsi
        </p>
      </div>

      {/* 2. Bəy və gəlin adları: lüstranın altında (~47.5%) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-[440px] text-center pointer-events-none"
        style={{ top: '47.5%' }}
      >
        <div
          className="inv5-font-script text-[#5c472d] flex flex-wrap items-center justify-center gap-x-2.5 font-normal"
          style={{
            fontSize: 'clamp(52px, 12.5vw, 80px)',
            lineHeight: 0.95,
            textShadow: '0 2px 14px rgba(255, 255, 255, 0.88), 0 1px 3px rgba(255, 255, 255, 0.95)',
          }}
        >
          <span className="inline-block">{brideName}</span>
          <span
            className="inv5-font-serif italic text-[#a98a54] opacity-85"
            style={{ fontSize: '0.6em', margin: '0 4px' }}
          >
            &
          </span>
          <span className="inline-block">{groomName}</span>
        </div>
      </div>

      {/* 3. Toy tarixi və Başlama saatı (~58%) */}
      {(eventDate || startTime) && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 w-[88%] max-w-[340px] text-center pointer-events-none"
          style={{ top: '58%' }}
        >
          <p
            className="inv5-font-serif text-[#64513c] tracking-[0.14em] font-medium uppercase"
            style={{
              fontSize: 'clamp(13px, 3.2vw, 17px)',
              textShadow: '0 2px 8px rgba(255, 255, 255, 0.92)',
            }}
          >
            {eventDate}
            {startTime && <span className="text-[#a98a54] mx-1.5">•</span>}
            {startTime && `Saat ${startTime}`}
          </p>
        </div>
      )}

      {/* 4. Ornamental ayırıcı: adların və tarixin altında (~61.5%) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[50%] max-w-[200px] pointer-events-none"
        style={{ top: '61.5%' }}
      >
        <RoyalDivider className="my-0 opacity-70" />
      </div>

      {/* 5. Dəvət mətni və 6. Ailə adları (~65.5%) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[80%] max-w-[360px] text-center pointer-events-none"
        style={{ top: '65.5%' }}
      >
        <p
          className="inv5-font-serif italic text-[#55432f] font-normal"
          style={{
            fontSize: 'clamp(16.5px, 4vw, 23px)',
            lineHeight: 1.45,
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.92), 0 1px 2px rgba(255, 255, 255, 0.95)',
          }}
        >
          {invitationText}
        </p>

        {familyNames && familyNames.trim().length > 0 && (
          <p
            className="invitation5-family-names"
            style={{
              fontFamily: '"Dancing Script", "Caveat", cursive',
              textShadow: '0 2px 8px rgba(255, 255, 255, 0.92)',
            }}
          >
            Hörmətlə: <span className="text-[#55432f]">{familyNames}</span>
          </p>
        )}
      </div>

      {/* Səhifələrarası Keçid Ornamenti: Birinci səhifə ilə Geri sayım arasında yeganə ortaq keçid detalı */}
      <div
        className="invitation5-seam-ornament absolute left-1/2 -translate-x-1/2 z-20 w-[50%] max-w-[210px] pointer-events-none"
        style={{ bottom: 'clamp(12px, 3vw, 18px)' }}
      >
        <RoyalDivider className="my-0 opacity-75" />
      </div>

      {/* Yumşaq 100-140px Keçid Qatı (Geri sayım bölməsinə axıcı keçid üçün) */}
      <div className="invitation5-page-1-bottom-blend" aria-hidden="true" />
    </section>
  );
};
