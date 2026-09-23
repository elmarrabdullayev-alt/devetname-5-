import React from 'react';
import { OrnateSection } from './OrnateSection';
import { dressCodeColors } from '../data/invitation';

export const DressCode: React.FC = () => {
  return (
    <OrnateSection
      id="dresscode-section"
      eyebrow="Geyim Üslubu"
      title="Dress-Code"
      cornerVariant="minimal-butterflies"
    >
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        <p className="font-serif-heading text-lg sm:text-xl text-[#741F3A] font-medium mb-2">
          “Zərif və klassik geyim seçimi”
        </p>

        <p className="font-serif-heading text-sm text-[#741F3A]/80 max-w-xs mx-auto mb-6 leading-relaxed">
          Toy məclisimizin ahənginə uyğun olaraq aşağıdakı rəng tonlarına üstünlük verməyiniz bizi sevindirər:
        </p>

        {/* Kompakt və Nazik Qızılı Konturlu Rəng Dairələri */}
        <div className="flex items-center justify-center gap-3 sm:gap-4.5">
          {dressCodeColors.map((color, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#C7A56A]/75 shadow-xs transition-transform duration-300 hover:scale-105"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              <span className="mt-1.5 font-sans-clean text-[10px] sm:text-[11px] font-medium text-[#741F3A]/80 tracking-wider text-center">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </OrnateSection>
  );
};
