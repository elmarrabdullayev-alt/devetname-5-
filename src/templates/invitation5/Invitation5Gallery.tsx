import React, { useState, useEffect, useCallback } from 'react';
import { GalleryItem } from './types';
import { Invitation5SectionShell } from './Invitation5SectionShell';

export interface Invitation5GalleryProps {
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryClosingText?: string;
  gallery?: GalleryItem[];
}

export const Invitation5Gallery: React.FC<Invitation5GalleryProps> = ({
  galleryTitle = 'Foto Qalereya',
  gallerySubtitle = 'Unudulmaz Xatirələr',
  galleryClosingText,
  gallery,
}) => {
  // Əgər şəkil yoxdursa bölmə tam gizlənir
  if (!gallery || gallery.length === 0) {
    return null;
  }

  // Maksimum 2 şəkil göstərilir
  const visibleGallery = gallery.slice(0, 2);
  if (visibleGallery.length === 0) {
    return null;
  }

  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const closeModal = useCallback(() => {
    setActiveImage(null);
  }, []);

  useEffect(() => {
    if (activeImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeImage, closeModal]);

  return (
    <Invitation5SectionShell
      scriptHeader={gallerySubtitle}
      mainTitle={galleryTitle}
    >
      {/* 
        Kompozisiya:
        - 1 şəkil olduqda: mərkəzdə daha böyük
        - 2 şəkil olduqda: premium toy albomu layotu (sol yuxarıda, sağ aşağıda azacıq üst-üstə)
      */}
      {visibleGallery.length === 1 ? (
        <div className="flex justify-center my-6">
          <button
            type="button"
            onClick={() => setActiveImage(visibleGallery[0])}
            className="group relative w-[85%] max-w-[340px] aspect-[3/4] p-2 bg-[#FAF6EE] border border-[#c4aa78]/60 rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-[1.02] text-left block"
            style={{
              boxShadow: '0 8px 24px rgba(100, 81, 60, 0.08)',
            }}
          >
            {/* İkiqat daxili haşiyə */}
            <div className="absolute inset-2 border border-[#c4aa78]/30 rounded-md pointer-events-none z-10" />

            <div className="w-full h-full overflow-hidden rounded-md">
              <img
                src={visibleGallery[0].url}
                alt={visibleGallery[0].alt || 'Toy xatirəsi'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </button>
        </div>
      ) : (
        <div className="relative max-w-[380px] mx-auto my-6 px-1 min-h-[380px] sm:min-h-[440px]">
          {/* 1-ci Şəkil: Solda və bir qədər yuxarıda */}
          <div className="w-[66%] max-w-[240px] aspect-[3/4] relative z-10">
            <button
              type="button"
              onClick={() => setActiveImage(visibleGallery[0])}
              className="group relative w-full h-full p-2 bg-[#FAF6EE] border border-[#c4aa78]/60 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:z-30 hover:scale-[1.02] text-left block"
              style={{
                boxShadow: '0 8px 24px rgba(100, 81, 60, 0.08)',
              }}
            >
              {/* İkiqat daxili haşiyə */}
              <div className="absolute inset-2 border border-[#c4aa78]/30 rounded-md pointer-events-none z-10" />

              <div className="w-full h-full overflow-hidden rounded-md">
                <img
                  src={visibleGallery[0].url}
                  alt={visibleGallery[0].alt || 'Toy xatirəsi 1'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </button>
          </div>

          {/* 2-ci Şəkil: Sağda və bir qədər aşağıda (azacıq üst-üstə düşür) */}
          <div className="w-[66%] max-w-[240px] aspect-[3/4] ml-auto -mt-24 sm:-mt-28 relative z-20">
            <button
              type="button"
              onClick={() => setActiveImage(visibleGallery[1])}
              className="group relative w-full h-full p-2 bg-[#FAF6EE] border border-[#c4aa78]/60 rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:z-30 hover:scale-[1.02] text-left block"
              style={{
                boxShadow: '0 12px 30px rgba(100, 81, 60, 0.12)',
              }}
            >
              {/* İkiqat daxili haşiyə */}
              <div className="absolute inset-2 border border-[#c4aa78]/30 rounded-md pointer-events-none z-10" />

              <div className="w-full h-full overflow-hidden rounded-md">
                <img
                  src={visibleGallery[1].url}
                  alt={visibleGallery[1].alt || 'Toy xatirəsi 2'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </button>
          </div>
        </div>
      )}

      {galleryClosingText && galleryClosingText.trim().length > 0 && (
        <div className="text-center mt-3 pt-3 border-t border-[#c4aa78]/25">
          <p className="inv5-font-serif italic text-sm text-[#64513c] leading-relaxed max-w-[320px] mx-auto">
            {galleryClosingText}
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs transition-opacity duration-300"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-[420px] w-full max-h-[90vh] flex flex-col items-center bg-[#FAF6EE] rounded-t-[70px] rounded-b-lg p-3.5 border border-[#c4aa78] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Şəkli bağla"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF6EE]/90 border border-[#c4aa78]/60 text-[#64513c] flex items-center justify-center transition-all duration-200 hover:bg-[#EFE5D3] cursor-pointer"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="w-full aspect-[3/4] overflow-hidden rounded-t-[60px] rounded-b-md">
              <img
                src={activeImage.url}
                alt={activeImage.alt || 'Böyüdülmüş fotoşəkil'}
                className="w-full h-full object-cover"
              />
            </div>

            {activeImage.alt && (
              <p className="inv5-font-serif italic text-xs text-[#8a7963] mt-2.5 text-center">
                {activeImage.alt}
              </p>
            )}
          </div>
        </div>
      )}
    </Invitation5SectionShell>
  );
};
