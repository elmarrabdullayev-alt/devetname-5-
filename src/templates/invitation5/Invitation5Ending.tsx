import React from 'react';
import { Invitation5SectionShell } from './Invitation5SectionShell';
import { RoyalDivider } from './Invitation5Ornament';

export interface Invitation5EndingProps {
  brideName: string;
  groomName: string;
  initials?: string;
  eventDate: string;
  venueName: string;
}

export const Invitation5Ending: React.FC<Invitation5EndingProps> = ({
  brideName,
  groomName,
  initials,
  eventDate,
  venueName,
}) => {
  const displayInitials = initials || `${brideName.charAt(0)} & ${groomName.charAt(0)}`;

  return (
    <Invitation5SectionShell
      scriptHeader="Sevgi və Təşəkkürlə"
      mainTitle={`${brideName} & ${groomName}`}
    >
      <div className="text-center py-4">
        {/* Monogram Seal */}
        <div
          className="w-14 h-14 rounded-full border border-[#c4aa78]/60 mx-auto flex items-center justify-center my-3 shadow-xs"
          style={{ background: 'radial-gradient(circle, #FDFBF8 40%, #EFE5D3 100%)' }}
        >
          <div className="w-12 h-12 rounded-full border border-[#c4aa78]/30 flex items-center justify-center">
            <span className="inv5-font-serif text-sm font-semibold text-[#64513c] tracking-widest">
              {displayInitials}
            </span>
          </div>
        </div>

        <p className="inv5-font-serif italic text-sm text-[#8a7963] mt-2">
          {eventDate} • {venueName}
        </p>

        <RoyalDivider className="my-4" />

        <p className="inv5-font-serif italic text-xs sm:text-[13px] text-[#8a7963] tracking-wider uppercase max-w-[280px] mx-auto leading-relaxed">
          Bu özəl günümüzdə bizimlə olduğunuz üçün təşəkkür edirik
        </p>
      </div>
    </Invitation5SectionShell>
  );
};
