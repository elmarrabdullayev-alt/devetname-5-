import React, { useState } from 'react';
import { RsvpMode, RsvpFormData } from './types';
import { Invitation5SectionShell } from './Invitation5SectionShell';

export interface Invitation5RSVPProps {
  invitationId?: string;
  rsvpMode?: RsvpMode;
  whatsappNumber?: string;
  isPreview?: boolean;
  onSubmitRsvp?: (data: RsvpFormData) => Promise<boolean> | boolean | void;
  coupleNames?: string;
  eventDate?: string;
}

export const Invitation5RSVP: React.FC<Invitation5RSVPProps> = ({
  rsvpMode = 'both',
  whatsappNumber,
  onSubmitRsvp,
  coupleNames = 'Bəy & Gəlin',
  eventDate,
}) => {
  if (rsvpMode === 'hidden') {
    return null;
  }

  const [formData, setFormData] = useState<RsvpFormData>({
    name: '',
    attending: 'yes',
    guestCount: 1,
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Zəhmət olmasa ad və soyadınızı qeyd edin.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (rsvpMode === 'admin' || rsvpMode === 'both') {
        if (onSubmitRsvp) {
          await onSubmitRsvp(formData);
        }
      }

      if (rsvpMode === 'whatsapp' || rsvpMode === 'both') {
        if (whatsappNumber) {
          const cleanPhone = whatsappNumber.replace(/\D/g, '');
          const statusText = formData.attending === 'yes' ? '✅ Sevinclə gələcəyəm' : '❌ Təəssüf ki, gələ bilməyəcəyəm';
          const guestText = formData.attending === 'yes' ? `\n👥 Qonaq sayı: ${formData.guestCount}` : '';
          const noteText = formData.note.trim() ? `\n💬 Qeyd / Arzular: ${formData.note.trim()}` : '';
          const dateText = eventDate ? ` (${eventDate})` : '';

          const message = `Salam! ${coupleNames} toy dəvəti üçün cavabım${dateText}:\n\n👤 Ad: ${formData.name.trim()}\n${statusText}${guestText}${noteText}`;
          const encodedMessage = encodeURIComponent(message);
          const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage('Cavab göndərilərkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Invitation5SectionShell
      scriptHeader="Mərasimimizə Qatılın"
      mainTitle="İştirakın Təsdiqi"
    >
      {isSubmitted ? (
        <div className="text-center py-6 px-3 my-2 animate-fade-in">
          <div className="w-11 h-11 rounded-full border border-[#a98a54] mx-auto flex items-center justify-center text-[#a98a54] mb-2.5" style={{ background: '#F5EDE0' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h4 className="inv5-font-serif text-lg text-[#64513c] font-medium mb-1">
            Təşəkkür Edirik!
          </h4>
          <p className="inv5-font-serif italic text-sm text-[#8a7963]">
            Cavabınız uğurla qeydə alındı.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-[340px] mx-auto text-left my-2">
          {errorMessage && (
            <p className="text-xs text-rose-700 bg-rose-50/70 p-2 rounded-sm border border-rose-200 text-center font-medium">
              {errorMessage}
            </p>
          )}

          {/* Ad və Soyad: zərif alt xəttli incə sahə */}
          <div>
            <label className="inv5-font-ui block text-[10px] uppercase tracking-[0.18em] text-[#8a7963] font-medium mb-0.5">
              Ad və Soyadınız *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Adınızı qeyd edin..."
              className="invitation5-input"
            />
          </div>

          {/* İştirak Seçimi */}
          <div>
            <label className="inv5-font-ui block text-[10px] uppercase tracking-[0.18em] text-[#8a7963] font-medium mb-1.5">
              İştirak Statusunuz *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: 'yes' })}
                className={`py-2 px-3 rounded-full text-xs inv5-font-serif tracking-wide border transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  formData.attending === 'yes'
                    ? 'bg-[#EFE5D3] border-[#a98a54] text-[#64513c] font-semibold shadow-xs'
                    : 'bg-transparent border-[#c4aa78]/40 text-[#8a7963]'
                }`}
              >
                <span>✓ Sevinclə gələcəyəm</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attending: 'no' })}
                className={`py-2 px-3 rounded-full text-xs inv5-font-serif tracking-wide border transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                  formData.attending === 'no'
                    ? 'bg-[#EFE5D3] border-[#a98a54] text-[#64513c] font-semibold shadow-xs'
                    : 'bg-transparent border-[#c4aa78]/40 text-[#8a7963]'
                }`}
              >
                <span>✗ Gələ bilməyəcəyəm</span>
              </button>
            </div>
          </div>

          {/* Qonaq Sayı */}
          {formData.attending === 'yes' && (
            <div>
              <label className="inv5-font-ui block text-[10px] uppercase tracking-[0.18em] text-[#8a7963] font-medium mb-0.5">
                Qonaq Sayı
              </label>
              <select
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                className="invitation5-input cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} nəfər
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Qeyd və Xoş Arzular */}
          <div>
            <label className="inv5-font-ui block text-[10px] uppercase tracking-[0.18em] text-[#8a7963] font-medium mb-0.5">
              Təbrik və ya Qeydiniz
            </label>
            <textarea
              rows={2}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Xoş arzularınızı bizimlə bölüşün..."
              className="invitation5-input resize-none"
            />
          </div>

          {/* Göndər Düyməsi: Şampan-qızılı zərif oval möhür */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="invitation5-submit-button"
            >
              {isSubmitting ? (
                <span>Göndərilir...</span>
              ) : (
                <>
                  <span>Cavabımı Göndər</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Invitation5SectionShell>
  );
};
