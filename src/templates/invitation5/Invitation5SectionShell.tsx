import React from 'react';
import { RoyalDivider, RoyalCrownFiligree } from './Invitation5Ornament';

export interface Invitation5SectionShellProps {
  id?: string;
  scriptHeader?: string;
  mainTitle?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Invitation5SectionShell: React.FC<Invitation5SectionShellProps> = ({
  id,
  scriptHeader,
  mainTitle,
  subtitle,
  children,
  className = '',
}) => {
  return (
    <section id={id} className={`invitation5-subpage invitation5-fade-up ${className}`}>
      {/* Soft Champagne/Ivory Gradient Blend from previous section */}
      <div className="invitation5-seam-blend" aria-hidden="true" />

      {/* Full-width continuous content (no page-sized card, no outer border, no corner filigrees) */}
      <div className="invitation5-section-content">
        {/* Section Header */}
        {(scriptHeader || mainTitle) && (
          <header className="text-center pt-1 pb-1 px-4 select-none">
            <RoyalCrownFiligree className="mb-1 opacity-75" />

            {scriptHeader && (
              <p className="inv5-font-script text-2xl sm:text-[28px] text-[#a98a54] leading-tight drop-shadow-xs">
                {scriptHeader}
              </p>
            )}

            {mainTitle && (
              <h3 className="inv5-font-serif text-xl sm:text-2xl text-[#64513c] tracking-wider font-normal mt-0.5">
                {mainTitle}
              </h3>
            )}

            {subtitle && (
              <p className="inv5-font-serif italic text-sm text-[#8a7963] mt-1">
                {subtitle}
              </p>
            )}

            <RoyalDivider className="my-3.5 opacity-60" />
          </header>
        )}

        {/* Section Body */}
        <div className="invitation5-section-body">
          {children}
        </div>
      </div>
    </section>
  );
};
