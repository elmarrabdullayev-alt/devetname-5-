import React from 'react';
import { ProgramItem } from './types';
import { Invitation5SectionShell } from './Invitation5SectionShell';

export interface Invitation5ProgramProps {
  program?: ProgramItem[];
}

export const Invitation5Program: React.FC<Invitation5ProgramProps> = ({ program }) => {
  if (!program || program.length === 0) {
    return null;
  }

  return (
    <Invitation5SectionShell
      scriptHeader="Axşamın Axışı"
      mainTitle="Tədbir Proqramı"
    >
      {/* Timeline: birbaşa kağız üzərində, ortadan incə şampan-qızılı xətlə */}
      <div className="relative max-w-[360px] mx-auto my-4 px-2">
        {/* Şaquli qızılı xətt */}
        <div
          className="absolute left-[21px] top-3 bottom-3 w-[1px] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(196, 170, 120, 0.45) 15%, rgba(196, 170, 120, 0.45) 85%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="space-y-5">
          {program.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4">
              {/* Mirvari / ornamental qızılı nöqtə */}
              <div className="relative z-10 shrink-0 w-11 flex flex-col items-center pt-1">
                <div
                  className="w-4 h-4 rounded-full border border-[#a98a54] flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle, #FDFBF7 40%, #EFE5D3 100%)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a98a54]" />
                </div>
                <span className="inv5-font-serif text-[13px] font-semibold text-[#a98a54] mt-1 tracking-wider">
                  {item.time}
                </span>
              </div>

              {/* Məzmun: Başlıq klassik serif, açıqlama italic serif */}
              <div className="flex-1 pt-0.5 pb-2 border-b border-[#c4aa78]/20">
                <h4 className="inv5-font-serif text-[15.5px] sm:text-base text-[#64513c] font-medium leading-snug">
                  {item.title}
                </h4>
                {item.description && item.description.trim().length > 0 && (
                  <p className="inv5-font-serif italic text-xs sm:text-[13px] text-[#8a7963] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Invitation5SectionShell>
  );
};
