import React from 'react';
import { invitationData } from '../data/invitation';

interface HeroTextOverlayProps {
  animate: boolean;
  prefersReducedMotion: boolean;
  onScrollDown: () => void;
}

export const HeroTextOverlay: React.FC<HeroTextOverlayProps> = ({
  animate,
  prefersReducedMotion,
  onScrollDown,
}) => {
  const getDelayStyle = (delayMs: number): React.CSSProperties => ({
    transitionDelay: prefersReducedMotion ? '0ms' : `${delayMs}ms`,
  });

  const animClass = () => `hero-svg-anim-group ${animate ? 'is-visible' : ''}`;

  return (
    <svg
      viewBox="0 0 941 1672"
      preserveAspectRatio="xMidYMid meet"
      className="hero-text-overlay select-none"
      role="img"
      aria-label={`${invitationData.bride} və ${invitationData.groom}-in toy dəvətnaməsi`}
    >
      {/* 1. TOY GÜNÜ */}
      <g className={animClass()} style={getDelayStyle(150)}>
        <text
          x="535"
          y="110"
          textAnchor="middle"
          className="hero-svg-eyebrow"
        >
          TOY GÜNÜ
        </text>
      </g>

      {/* 2. TARİX */}
      <g className={animClass()} style={getDelayStyle(300)}>
        <text
          x="520"
          y="245"
          textAnchor="middle"
          className="hero-svg-date"
        >
          {invitationData.date}
        </text>
      </g>

      {/* 3. N & A (qızılı ovalın tam mərkəzində) */}
      <g className={animClass()} style={getDelayStyle(500)}>
        <text
          x="470.5"
          y="390"
          textAnchor="middle"
          dominantBaseline="middle"
          className="hero-svg-monogram"
        >
          {invitationData.initials}
        </text>
      </g>

      {/* 4. NİGAR (çələngin daxilində) */}
      <g className={animClass()} style={getDelayStyle(700)}>
        <text
          x="470.5"
          y="635"
          textAnchor="middle"
          dominantBaseline="middle"
          className="hero-svg-name"
        >
          {invitationData.bride}
        </text>
      </g>

      {/* 5. & */}
      <g className={animClass()} style={getDelayStyle(850)}>
        <text
          x="470.5"
          y="715"
          textAnchor="middle"
          dominantBaseline="middle"
          className="hero-svg-ampersand"
        >
          &amp;
        </text>
      </g>

      {/* 6. ALİ (çələngin daxilində) */}
      <g className={animClass()} style={getDelayStyle(1000)}>
        <text
          x="470.5"
          y="795"
          textAnchor="middle"
          dominantBaseline="middle"
          className="hero-svg-name"
        >
          {invitationData.groom}
        </text>
      </g>

      {/* 7. DƏVƏT MƏTNİ (saf SVG text sətirləri) */}
      <g className={animClass()} style={getDelayStyle(1200)}>
        <text
          x="470.5"
          y="1065"
          textAnchor="middle"
          className="hero-svg-message"
        >
          Sizi sevincimizi bizimlə
        </text>
        <text
          x="470.5"
          y="1120"
          textAnchor="middle"
          className="hero-svg-message"
        >
          bölüşməyə dəvət edirik.
        </text>
      </g>

      {/* 8. AŞAĞI BAXIN (bordo düymənin mərkəzində yazı, ox və şəffaf klik rect-i) */}
      <g className={animClass()} style={getDelayStyle(1450)}>
        <text
          x="470.5"
          y="1320"
          textAnchor="middle"
          dominantBaseline="middle"
          className="hero-svg-scroll-label"
        >
          AŞAĞI BAXIN
        </text>

        <path
          className="hero-svg-scroll-arrow"
          d="M455 1340 L470.5 1353 L486 1340"
          fill="none"
          stroke="#f6d98d"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <rect
          x="245"
          y="1235"
          width="451"
          height="125"
          fill="transparent"
          pointerEvents="all"
          className="hero-scroll-hitarea cursor-pointer"
          onClick={onScrollDown}
          role="button"
          tabIndex={0}
          aria-label="Aşağı baxın və dəvətnamənin davamını oxuyun"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onScrollDown();
            }
          }}
        />
      </g>
    </svg>
  );
};
