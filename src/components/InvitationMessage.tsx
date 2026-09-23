import React from 'react';
import { OrnateSection } from './OrnateSection';
import { invitationData } from '../data/invitation';

export const InvitationMessage: React.FC = () => {
  return (
    <OrnateSection
      id="invitation-message"
      eyebrow="Sevgi Dolu Bir Başlanğıc"
      title="Əziz Qonağımız"
      cornerVariant="flowers-tl-br"
    >
      <div className="flex flex-col items-center max-w-sm mx-auto">
        {/* Romantik dəvət mətni */}
        <p className="font-serif-heading text-lg sm:text-xl text-[#741F3A]/90 leading-relaxed italic">
          “Bir-birimizə verdiyimiz əbədi sevgi və sədaqət sözünü, həyatımızın ən gözəl günündə sizinlə paylaşmaq arzusundayıq.
          Təntənəmizdə iştirakınızla şadlığımıza şadlıq qatmağınızı rica edirik.”
        </p>

        {/* Cütlüyün xəttatlıq imzası */}
        <div className="mt-8 flex items-center justify-center gap-3 w-full">
          <span className="w-8 h-px bg-[#C7A56A]/50" />
          <span className="font-calligraphy text-2xl sm:text-3xl text-[#741F3A]">
            {invitationData.bride} və {invitationData.groom}
          </span>
          <span className="w-8 h-px bg-[#C7A56A]/50" />
        </div>
      </div>
    </OrnateSection>
  );
};
