import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { OrnateSection } from './OrnateSection';
import { invitationData } from '../data/invitation';

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  src?: string;
  alt: string;
}

export const Gallery: React.FC = () => {
  const [photos] = useState<GalleryItem[]>([
    {
      id: 1,
      title: 'İlk Görüş',
      subtitle: 'Xatirə anları',
      src: '',
      alt: 'Nigar və Ali üçün xatirə fotoşəkli',
    },
    {
      id: 2,
      title: 'Birlikdə Addımlar',
      subtitle: 'Sevgi hekayəsi',
      src: '',
      alt: 'Nigar və Ali romantik foto anı',
    },
    {
      id: 3,
      title: 'Zərif Baxışlar',
      subtitle: 'Unudulmaz təbəssüm',
      src: '',
      alt: 'Toy öncəsi unudulmaz xatirə',
    },
    {
      id: 4,
      title: 'Yeni Həyat',
      subtitle: 'Əbədi səadət',
      src: '',
      alt: 'Nigar və Ali xoşbəxtlik anı',
    },
  ]);

  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <OrnateSection
      id="gallery-section"
      eyebrow="Xatirələr"
      title="Fotoqalereya"
      cornerVariant="subtle-gallery"
    >
      {/* 2-sütunlu Tağ Formalı Foto Qrid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5 max-w-sm mx-auto">
        {photos.map((item) => {
          const hasValidImage = item.src && item.src.trim() !== '' && !failedImages[item.id];

          return (
            <div
              key={item.id}
              style={{ borderRadius: '36px 36px 14px 14px' }}
              className="group relative aspect-[3/4] overflow-hidden border border-[#C7A56A]/45 bg-gradient-to-b from-[#FFF9F0] via-[#F7F1E7] to-[#EFE3CE] shadow-xs flex flex-col items-center justify-center p-3 transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Daxili incə tağ xətti */}
              <div
                style={{ borderRadius: '32px 32px 10px 10px' }}
                className="absolute inset-1 border border-[#C7A56A]/25 pointer-events-none z-1"
              />

              {hasValidImage ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  onError={() => handleImageError(item.id)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                /* Zərif və Qırıq İkon Yaratmayan Təhlükəsiz Placeholder */
                <div className="w-full h-full flex flex-col items-center justify-between py-4 px-2 select-none relative z-2">
                  {/* Yuxarı monoqram */}
                  <div className="w-6 h-6 rounded-full border border-[#C7A56A]/50 flex items-center justify-center bg-[#FFF9F0]/80">
                    <span className="font-serif-heading text-[9px] text-[#741F3A] font-semibold">
                      {invitationData.initials}
                    </span>
                  </div>

                  {/* Mərkəz ürək ikonu */}
                  <div className="flex flex-col items-center my-auto">
                    <div className="w-8 h-8 rounded-full bg-[#741F3A]/6 flex items-center justify-center mb-1.5">
                      <Heart className="w-4 h-4 text-[#C7A56A] fill-[#C7A56A]/20" />
                    </div>
                    <h4 className="font-serif-heading text-xs sm:text-sm font-semibold text-[#741F3A] leading-tight">
                      {item.title}
                    </h4>
                    <p className="font-serif-heading text-[11px] text-[#741F3A]/70 italic mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </OrnateSection>
  );
};
