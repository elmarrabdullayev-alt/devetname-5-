import React from 'react';
import { Gift } from 'lucide-react';
import { OrnateSection } from './OrnateSection';

export const GiftNote: React.FC = () => {
  return (
    <OrnateSection
      id="gift-note-section"
      eyebrow="Xoş Arzular"
      title="Hədiyyə Qeydi"
      cornerVariant="arabesque-center"
    >
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        {/* Ortada Zərif Arabesk Çərçivə */}
        <div className="p-4 sm:p-5 rounded-[28px] border border-[#C7A56A]/45 bg-[#FFF9F0]/80 shadow-xs relative w-full">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#C7A56A]/50 bg-[#F7F1E7] mb-2.5">
            <Gift className="w-4 h-4 text-[#741F3A]" />
          </div>

          <p className="font-serif-heading text-sm sm:text-base text-[#741F3A]/90 italic leading-relaxed">
            “Bizim üçün ən dəyərli hədiyyə sizin sevincimizə şərik olmağınız və xoş arzularınızdır.”
          </p>
        </div>
      </div>
    </OrnateSection>
  );
};
