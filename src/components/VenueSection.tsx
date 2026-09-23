import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Check } from 'lucide-react';
import { OrnateSection } from './OrnateSection';
import { invitationData } from '../data/invitation';

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const isCustomUrlValid =
    invitationData.mapUrl &&
    invitationData.mapUrl.trim() !== '' &&
    invitationData.mapUrl !== 'BURAYA_XERITE_LINKI';

  const safeMapLink = isCustomUrlValid
    ? invitationData.mapUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${invitationData.venue}, ${invitationData.address}`
      )}`;

  const handleOpenMap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!safeMapLink) {
      e.preventDefault();
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${invitationData.venue}, ${invitationData.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <OrnateSection
      id="venue-section"
      eyebrow="Mərasim Yeri"
      title="Məkan və Ünvan"
      cornerVariant="flower-tr-leaves-bl"
    >
      <div className="flex flex-col items-center max-w-sm mx-auto text-center">
        {/* Zərif Qızılı Haşiyəli Məkan İkonu */}
        <div className="w-11 h-11 rounded-full bg-[#741F3A]/8 border border-[#C7A56A]/50 flex items-center justify-center mb-3">
          <MapPin className="w-5 h-5 text-[#741F3A]" />
        </div>

        {/* Məkan Adı */}
        <h3 className="font-serif-heading text-2xl sm:text-3xl font-semibold text-[#741F3A] mb-1.5">
          {invitationData.venue}
        </h3>

        {/* Ünvan */}
        <p className="font-serif-heading text-base sm:text-lg text-[#741F3A]/85 mb-2 leading-relaxed">
          {invitationData.address}
        </p>

        {/* Qonaq qeydi */}
        <p className="font-sans-clean text-xs text-[#741F3A]/65 max-w-xs mx-auto mb-6">
          Mərasim saat {invitationData.time}-da başlayır. Qonaqlarımızın vaxtında təşrif buyurması xahiş olunur.
        </p>

        {/* Mərkəzləşdirilmiş Zərif Düymələr (Panel enini tam doldurmur, yumru formalı) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full sm:w-auto">
          {/* Xəritədə Aç (Tünd bordo fonda, şampan konturlu, yumru) */}
          <a
            href={safeMapLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenMap}
            aria-label="Məkanı xəritədə açın və naviqasiya əldə edin"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#741F3A] hover:bg-[#511427] text-[#FFF9F0] border border-[#C7A56A]/60 font-sans-clean text-xs font-semibold tracking-wider uppercase shadow-xs transition-all active:scale-[0.98]"
          >
            <Navigation className="w-3.5 h-3.5 text-[#C7A56A]" />
            <span>Xəritədə Aç</span>
            <ExternalLink className="w-3 h-3 text-[#FFF9F0]/60 ml-0.5" />
          </a>

          {/* Ünvanı Kopyala */}
          <button
            onClick={handleCopyAddress}
            type="button"
            aria-label="Ünvanı kopyalayın"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#C7A56A]/50 bg-[#FFF9F0] text-[#741F3A] hover:bg-[#F7F1E7] font-sans-clean text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Kopyalandı</span>
              </>
            ) : (
              <span>Ünvanı Kopyala</span>
            )}
          </button>
        </div>
      </div>
    </OrnateSection>
  );
};
