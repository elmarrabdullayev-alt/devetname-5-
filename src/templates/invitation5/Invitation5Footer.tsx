import React from 'react';
import { RoyalDivider, RoyalCrownFiligree } from './Invitation5Ornament';

export interface Invitation5FooterProps {
  brideName: string;
  groomName: string;
  initials?: string;
  eventDate: string;
  venueName: string;
}

export const Invitation5Footer: React.FC<Invitation5FooterProps> = ({
  brideName,
  groomName,
  initials,
  eventDate,
  venueName,
}) => {
  const displayInitials = initials || `${brideName.charAt(0)} & ${groomName.charAt(0)}`;

  return (
    <footer className="invitation5-subpage invitation5-fade-up pb-16">
      <div className="invitation5-seam-blend" aria-hidden="true" />

      <div className="invitation5-content-card text-center py-8">
        <RoyalCrownFiligree className="mb-2" />

        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full border-2 border-[#B89A62]/60 mx-auto flex items-center justify-center bg-[#FBF8F3] my-4 shadow-xs">
          <div className="w-14 h-14 rounded-full border border-[#B89A62]/30 flex items-center justify-center">
            <span className="font-serif text-base font-semibold text-[#554838] tracking-widest">
              {displayInitials}
            </span>
          </div>
        </div>

        <h4 className="font-serif text-2xl text-[#554838] tracking-wider font-normal mt-2">
          {brideName} & {groomName}
        </h4>

        <p className="font-serif italic text-sm text-[#817462] mt-1.5">
          {eventDate} • {venueName}
        </p>

        <RoyalDivider className="my-5" />

        <p className="font-serif italic text-xs text-[#817462] tracking-wider uppercase">
          Bu özəl günümüzdə bizimlə olduğunuz üçün təşəkkür edirik
        </p>
      </div>
    </footer>
  );
};
