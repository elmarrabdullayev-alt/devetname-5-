import React from 'react';
import { OrnateSection } from './OrnateSection';
import { eventTimeline } from '../data/invitation';

export const EventProgram: React.FC = () => {
  return (
    <OrnateSection
      id="event-program"
      eyebrow="Günün Axışı"
      title="Tədbir Proqramı"
      cornerVariant="butterfly-tl-branch-br"
    >
      {/* Şaquli Qızılı Timeline (Solda saat, ortada bordo dairə, sağda məzmun) */}
      <div className="relative w-full max-w-sm mx-auto pt-2 pb-1 text-left">
        {/* Dairələri birləşdirən incə şampan xətti */}
        <div
          aria-hidden="true"
          className="absolute left-[78px] sm:left-[88px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-[#C7A56A]/20 via-[#C7A56A]/70 to-[#C7A56A]/20"
        />

        <div className="space-y-6">
          {eventTimeline.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-4 sm:gap-5">
              {/* 1. Solda Saat */}
              <div className="w-[66px] sm:w-[74px] text-right flex-shrink-0 pt-0.5">
                <span className="font-serif-heading text-sm sm:text-base font-semibold text-[#741F3A] tracking-wider">
                  {item.time}
                </span>
              </div>

              {/* 2. Ortada Kiçik Bordo Dairə və Qızılı Həlqə */}
              <div className="relative flex items-center justify-center flex-shrink-0 mt-1 z-1">
                <div className="w-3 h-3 rounded-full bg-[#741F3A] border-2 border-[#C7A56A] shadow-xs" />
              </div>

              {/* 3. Sağda Tədbirin Adı və İzahı */}
              <div className="flex-1 pb-1">
                <h3 className="font-serif-heading text-base sm:text-lg font-semibold text-[#741F3A] leading-tight">
                  {item.title}
                </h3>
                {item.desc && (
                  <p className="font-serif-heading text-xs sm:text-sm text-[#741F3A]/75 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </OrnateSection>
  );
};
