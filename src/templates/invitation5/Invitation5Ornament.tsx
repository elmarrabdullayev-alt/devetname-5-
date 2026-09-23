import React from 'react';

interface OrnamentProps {
  className?: string;
}

export const RoyalDivider: React.FC<OrnamentProps> = ({ className = 'my-5' }) => {
  return (
    <div className={`flex items-center justify-center w-full px-6 gap-3 select-none pointer-events-none ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c4aa78]/50 to-[#a98a54]/80" />
      <svg
        width="26"
        height="12"
        viewBox="0 0 26 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#a98a54] shrink-0 opacity-80"
      >
        <path
          d="M13 0L16 6L13 12L10 6L13 0Z"
          fill="currentColor"
        />
        <circle cx="4" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="22" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c4aa78]/50 to-[#a98a54]/80" />
    </div>
  );
};

export const RoyalCrownFiligree: React.FC<OrnamentProps> = ({ className = 'my-3' }) => {
  return (
    <div className={`flex justify-center items-center w-full select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        width="48"
        height="20"
        viewBox="0 0 54 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#a98a54] opacity-80"
      >
        <path
          d="M27 2L29.5 8L36 3.5L34 11H20L18 3.5L24.5 8L27 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="27" cy="1" r="1" fill="currentColor" />
        <circle cx="18" cy="2.5" r="1" fill="currentColor" />
        <circle cx="36" cy="2.5" r="1" fill="currentColor" />
        <path
          d="M14 16C21 18 33 18 40 16"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="27" cy="17" r="1.5" fill="currentColor" />
        <path
          d="M6 14C10 13 14 14 17 16M48 14C44 13 40 14 37 16"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const RoyalCornerFiligree: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-2.5 left-2.5';
      case 'top-right':
        return 'top-2.5 right-2.5';
      case 'bottom-left':
        return 'bottom-2.5 left-2.5';
      case 'bottom-right':
        return 'bottom-2.5 right-2.5';
    }
  };

  return (
    <div
      className={`absolute ${getPositionClasses()} pointer-events-none select-none z-10 ${className}`}
      style={{ transform: getTransform() }}
      aria-hidden="true"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#a98a54]/55"
      >
        <path
          d="M2 22V5C2 3.34315 3.34315 2 5 2H22"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M6 17V8C6 6.89543 6.89543 6 8 6H17"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <circle cx="11" cy="11" r="1.5" fill="currentColor" />
        <path
          d="M2 2L6 6"
          stroke="currentColor"
          strokeWidth="0.75"
        />
      </svg>
    </div>
  );
};
