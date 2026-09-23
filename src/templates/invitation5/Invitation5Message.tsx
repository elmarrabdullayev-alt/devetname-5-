import React from 'react';
import { RoyalCrownFiligree, RoyalDivider } from './Invitation5Ornament';

export interface Invitation5MessageProps {
  groomName: string;
  brideName: string;
  invitationText: string;
  eventDate: string;
  startTime: string;
  familyNames?: string;
}

export const Invitation5Message: React.FC<Invitation5MessageProps> = ({
  groomName,
  brideName,
  invitationText,
  eventDate,
  startTime,
  familyNames,
}) => {
  return (
    <section className="invitation5-subpage invitation5-fade-up">
      {/* 100-140px Soft Champagne/Ivory Gradient Transition from previous section */}
      <div className="invitation5-seam-blend" aria-hidden="true" />

      <div className="invitation5-content-card">
        {/* Ornamental Top Header */}
        <RoyalCrownFiligree />

        <p className="text-[11px] uppercase tracking-[0.28em] text-[#B89A62] font-semibold text-center mb-4">
          Həyatımızın Ən Xoşbəxt Gününə Dəvətlisiniz
        </p>

        {/* Couple Names */}
        <div className="text-center my-4">
          <h2 className="font-serif text-3xl md:text-4xl text-[#554838] tracking-wider font-normal">
            {brideName}
          </h2>
          <div className="flex items-center justify-center my-2 gap-3">
            <span className="h-[1px] w-12 bg-[#B89A62]/40" />
            <span className="font-serif italic text-xl text-[#B89A62]">&</span>
            <span className="h-[1px] w-12 bg-[#B89A62]/40" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#554838] tracking-wider font-normal">
            {groomName}
          </h2>
        </div>

        <RoyalDivider className="my-5" />

        {/* Invitation Message Text */}
        <p className="text-center font-serif text-[15px] md:text-base leading-[1.8] text-[#554838] px-2 whitespace-pre-line">
          {invitationText}
        </p>

        {/* Optional Family Names */}
        {familyNames && familyNames.trim().length > 0 && (
          <div className="mt-6 pt-5 border-t border-[#B89A62]/20 text-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#817462] mb-1">
              Hörmətlə
            </p>
            <p className="font-serif italic text-[15px] text-[#554838]">
              {familyNames}
            </p>
          </div>
        )}

        {/* Date and Time Highlight */}
        <div className="mt-8 pt-5 border-t border-[#B89A62]/25 flex items-center justify-center gap-6 text-[#554838]">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#817462] mb-0.5">Tarix</p>
            <p className="font-serif text-base font-medium text-[#554838]">{eventDate}</p>
          </div>
          <span className="h-6 w-[1px] bg-[#B89A62]/30" />
          <div className="text-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#817462] mb-0.5">Saat</p>
            <p className="font-serif text-base font-medium text-[#554838]">{startTime}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
