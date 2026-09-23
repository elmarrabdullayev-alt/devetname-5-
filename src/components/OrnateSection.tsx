import React, { useEffect, useRef, useState } from 'react';

export type OrnateCornerVariant =
  | 'flowers-tl-br'
  | 'leaves-tr-bl'
  | 'butterfly-tl-branch-br'
  | 'flower-tr-leaves-bl'
  | 'minimal-butterflies'
  | 'subtle-gallery'
  | 'arabesque-center'
  | 'final-flowers-tl-br';

interface OrnateSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  cornerVariant?: OrnateCornerVariant;
  className?: string;
  panelClassName?: string;
  hideHeader?: boolean;
}

/**
 * Zərif və Simmetrik Kəpənək İkonu (Inline SVG)
 */
export const ButterflyIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 28,
  color = '#C7A56A',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`ornate-butterfly-animated ${className}`}
    aria-hidden="true"
  >
    {/* Sol Üst Qanad */}
    <path
      d="M20 19 C17 11, 8 7, 4 13 C1 18, 5 24, 15 22 C10 27, 13 32, 18 27 C19.2 25.5, 20 22, 20 19 Z"
      fill="rgba(199, 165, 106, 0.14)"
      stroke={color}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Sağ Üst Qanad */}
    <path
      d="M20 19 C23 11, 32 7, 36 13 C39 18, 35 24, 25 22 C30 27, 27 32, 22 27 C20.8 25.5, 20 22, 20 19 Z"
      fill="rgba(199, 165, 106, 0.14)"
      stroke={color}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Daxili naxış xətləri */}
    <path
      d="M17 17 C13 14, 8 13, 6 16"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M23 17 C27 14, 32 13, 34 16"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Gövdə & Qızılı Bığcıqlar */}
    <ellipse cx="20" cy="20" rx="1.2" ry="5.5" fill="#741F3A" />
    <path d="M19.5 15 C18 12, 15 10, 13 11" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
    <path d="M20.5 15 C22 12, 25 10, 27 11" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
  </svg>
);

/**
 * Zərif Botanika Künc Bəzəyi (Bordo Çiçəklər, Şampan Budaqlar, Fil Sümüyü Qabartma)
 */
const BotanicalCornerSvg: React.FC<{ variant?: 'flower' | 'leaf' | 'branch'; className?: string }> = ({
  variant = 'flower',
  className = '',
}) => {
  if (variant === 'leaf') {
    return (
      <svg
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none select-none ${className}`}
        aria-hidden="true"
      >
        {/* İncə qızılı yarpaq budağı */}
        <path
          d="M6 6 C28 14, 55 35, 75 75"
          stroke="#C7A56A"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M18 10 C24 6, 32 8, 33 16 C28 18, 20 16, 18 10 Z"
          fill="rgba(199, 165, 106, 0.16)"
          stroke="#C7A56A"
          strokeWidth="0.9"
        />
        <path
          d="M32 20 C40 16, 48 20, 48 27 C41 29, 34 26, 32 20 Z"
          fill="rgba(247, 241, 231, 0.8)"
          stroke="#C7A56A"
          strokeWidth="0.9"
        />
        <path
          d="M48 35 C58 32, 65 37, 63 46 C56 46, 50 42, 48 35 Z"
          fill="rgba(199, 165, 106, 0.2)"
          stroke="#C7A56A"
          strokeWidth="0.9"
        />
        <circle cx="28" cy="14" r="1.5" fill="#741F3A" opacity="0.75" />
        <circle cx="44" cy="24" r="1.5" fill="#741F3A" opacity="0.75" />
      </svg>
    );
  }

  // Standart variant: Bordo çiçək və qızılı budaq
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* İncə qövs budaq */}
      <path
        d="M8 8 C30 18, 60 44, 82 82"
        stroke="#C7A56A"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Qızılı yarpaqlar */}
      <path
        d="M20 12 C28 7, 36 10, 36 18 C30 20, 22 17, 20 12 Z"
        fill="rgba(199, 165, 106, 0.16)"
        stroke="#C7A56A"
        strokeWidth="0.9"
      />
      <path
        d="M38 24 C48 19, 56 24, 55 33 C47 34, 40 31, 38 24 Z"
        fill="rgba(247, 241, 231, 0.85)"
        stroke="#C7A56A"
        strokeWidth="0.9"
      />
      {/* Əsas Bordo Gül Ləçəkləri */}
      <g transform="translate(18, 18)">
        <circle cx="10" cy="10" r="5" fill="#741F3A" opacity="0.9" />
        <circle cx="6" cy="10" r="4.2" fill="#511427" opacity="0.8" />
        <circle cx="14" cy="10" r="4.2" fill="#511427" opacity="0.8" />
        <circle cx="10" cy="6" r="4.2" fill="#741F3A" opacity="0.85" />
        <circle cx="10" cy="14" r="4.2" fill="#511427" opacity="0.85" />
        <circle cx="10" cy="10" r="2.2" fill="#C7A56A" />
      </g>
      {/* Kiçik bordo qönçə */}
      <circle cx="56" cy="48" r="3" fill="#741F3A" opacity="0.75" />
      <circle cx="56" cy="48" r="1.2" fill="#C7A56A" />
    </svg>
  );
};

export const OrnateSection: React.FC<OrnateSectionProps> = ({
  id,
  eyebrow,
  title,
  children,
  cornerVariant = 'flowers-tl-br',
  className = '',
  panelClassName = '',
  hideHeader = false,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`invitation-section ${className}`}
    >
      <div
        className={`ornate-panel ornate-fade-in ${
          isVisible ? 'is-visible' : ''
        } ${panelClassName}`}
      >
        {/* Daxili qabarıq qızılı haşiyə konturu */}
        <div className="ornate-panel-inner-border" />

        {/* NÖVBƏLİ DEKORASİYALAR */}
        {cornerVariant === 'flowers-tl-br' && (
          <>
            <BotanicalCornerSvg
              variant="flower"
              className="absolute top-1 left-1 w-20 h-20 sm:w-24 sm:h-24 opacity-90 z-0"
            />
            <BotanicalCornerSvg
              variant="flower"
              className="absolute bottom-1 right-1 w-20 h-20 sm:w-24 sm:h-24 rotate-180 opacity-90 z-0"
            />
            <div className="absolute top-3 right-5 pointer-events-none z-0 opacity-75">
              <ButterflyIcon size={20} color="#C7A56A" />
            </div>
          </>
        )}

        {cornerVariant === 'leaves-tr-bl' && (
          <>
            <BotanicalCornerSvg
              variant="leaf"
              className="absolute top-1 right-1 w-20 h-20 sm:w-24 sm:h-24 -scale-x-100 opacity-90 z-0"
            />
            <BotanicalCornerSvg
              variant="leaf"
              className="absolute bottom-1 left-1 w-20 h-20 sm:w-24 sm:h-24 scale-y-[-1] opacity-90 z-0"
            />
            <div className="absolute top-4 left-5 pointer-events-none z-0 opacity-70">
              <ButterflyIcon size={18} color="#C7A56A" />
            </div>
          </>
        )}

        {cornerVariant === 'butterfly-tl-branch-br' && (
          <>
            <div className="absolute top-3 left-4 pointer-events-none z-0 flex items-center gap-1 opacity-85">
              <ButterflyIcon size={24} color="#741F3A" />
              <ButterflyIcon size={16} color="#C7A56A" className="-mt-2" />
            </div>
            <BotanicalCornerSvg
              variant="flower"
              className="absolute bottom-1 right-1 w-22 h-22 sm:w-26 sm:h-26 rotate-180 opacity-90 z-0"
            />
          </>
        )}

        {cornerVariant === 'flower-tr-leaves-bl' && (
          <>
            <BotanicalCornerSvg
              variant="flower"
              className="absolute top-1 right-1 w-20 h-20 sm:w-24 sm:h-24 -scale-x-100 opacity-90 z-0"
            />
            <BotanicalCornerSvg
              variant="leaf"
              className="absolute bottom-1 left-1 w-20 h-20 sm:w-24 sm:h-24 scale-y-[-1] opacity-90 z-0"
            />
          </>
        )}

        {cornerVariant === 'minimal-butterflies' && (
          <>
            <div className="absolute top-3 left-5 pointer-events-none z-0 opacity-75">
              <ButterflyIcon size={20} color="#C7A56A" />
            </div>
            <div className="absolute top-4 right-5 pointer-events-none z-0 opacity-75">
              <ButterflyIcon size={18} color="#741F3A" />
            </div>
          </>
        )}

        {cornerVariant === 'subtle-gallery' && (
          <>
            <div className="absolute top-2 left-3 pointer-events-none z-0 opacity-45">
              <ButterflyIcon size={16} color="#C7A56A" />
            </div>
            <div className="absolute bottom-2 right-3 pointer-events-none z-0 opacity-45">
              <ButterflyIcon size={16} color="#C7A56A" />
            </div>
          </>
        )}

        {cornerVariant === 'arabesque-center' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-60">
            <ButterflyIcon size={22} color="#C7A56A" />
          </div>
        )}

        {cornerVariant === 'final-flowers-tl-br' && (
          <>
            <BotanicalCornerSvg
              variant="flower"
              className="absolute top-1 left-1 w-22 h-22 sm:w-26 sm:h-26 opacity-95 z-0"
            />
            <BotanicalCornerSvg
              variant="flower"
              className="absolute bottom-1 right-1 w-22 h-22 sm:w-26 sm:h-26 rotate-180 opacity-95 z-0"
            />
            <div className="absolute top-4 right-5 pointer-events-none z-0 opacity-80">
              <ButterflyIcon size={22} color="#741F3A" />
            </div>
          </>
        )}

        {/* BAŞLIQ VƏ ƏSAS MƏZMUN QATI (z-index: 2, təmiz oxunaqlıq) */}
        <div className="relative z-2 w-full text-center">
          {!hideHeader && (
            <header className="mb-4">
              {/* Başlığın üstündə kiçik şampan-qızılı kəpənək və ya ornament */}
              <div className="flex items-center justify-center mb-1.5">
                <ButterflyIcon size={22} color="#C7A56A" />
              </div>

              {eyebrow && (
                <span className="block font-sans-clean text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-[#C7A56A] uppercase mb-1">
                  {eyebrow}
                </span>
              )}

              {title && (
                <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#741F3A] font-medium leading-tight">
                  {title}
                </h2>
              )}

              {/* Başlığın altında incə dekorativ xətt: ortada romb, hər iki tərəfdə nazik qızılı xətt */}
              <div className="ornate-title-divider" aria-hidden="true">
                <span className="ornate-title-rhombus" />
              </div>
            </header>
          )}

          {/* Səhifənin məzmunu */}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </section>
  );
};
