import React from 'react';
import { DressCodeColor } from './types';
import { Invitation5SectionShell } from './Invitation5SectionShell';
import { RoyalDivider } from './Invitation5Ornament';

export interface Invitation5PreferencesProps {
  dressCode?: string;
  dressCodeColors?: DressCodeColor[];
  giftNote?: string;
}

export const Invitation5Preferences: React.FC<Invitation5PreferencesProps> = ({
  dressCode,
  dressCodeColors,
  giftNote,
}) => {
  const hasDressCode = Boolean(dressCode && dressCode.trim().length > 0) || (dressCodeColors && dressCodeColors.length > 0);
  const hasGiftNote = Boolean(giftNote && giftNote.trim().length > 0);

  if (!hasDressCode && !hasGiftNote) {
    return null;
  }

  return (
    <Invitation5SectionShell
      scriptHeader="Qonaqlarımız Üçün"
      mainTitle="Geyim Tərzi və Təfərrüatlar"
    >
      <div className="text-center my-3">
        {/* 1. Geyim Tərzi */}
        {hasDressCode && (
          <div>
            <h4 className="inv5-font-serif text-lg text-[#64513c] font-medium mb-1.5">
              Geyim Tərzi (Dress Code)
            </h4>

            {dressCode && (
              <p className="inv5-font-serif text-[14.5px] text-[#64513c] leading-relaxed max-w-[320px] mx-auto mb-3.5">
                {dressCode}
              </p>
            )}

            {/* Rəng dairələri: Mirvari və qızılı haşiyəli dairələr */}
            {dressCodeColors && dressCodeColors.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-4 my-3">
                {dressCodeColors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-7 h-7 rounded-full border-2 border-[#c4aa78]/60 shadow-xs transition-transform duration-300 hover:scale-110"
                      style={{
                        backgroundColor: color.hex,
                        boxShadow: '0 2px 8px rgba(100, 81, 60, 0.12), inset 0 0 4px rgba(255,255,255,0.4)',
                      }}
                      title={color.name}
                    />
                    <span className="inv5-font-serif text-[11px] tracking-wider text-[#8a7963]">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Separator if both exist */}
        {hasDressCode && hasGiftNote && (
          <RoyalDivider className="my-5" />
        )}

        {/* 2. Hədiyyə Qeydi */}
        {hasGiftNote && (
          <div>
            <h4 className="inv5-font-serif text-lg text-[#64513c] font-medium mb-1.5">
              Hədiyyə Qeydi
            </h4>
            <p className="inv5-font-serif italic text-[14.5px] text-[#64513c] leading-relaxed max-w-[320px] mx-auto">
              “{giftNote}”
            </p>
          </div>
        )}
      </div>
    </Invitation5SectionShell>
  );
};
