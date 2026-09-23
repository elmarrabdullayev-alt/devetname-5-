import React, { useState } from 'react';
import { Send, CheckCircle2, XCircle, Users, MessageSquare } from 'lucide-react';
import { OrnateSection } from './OrnateSection';
import { invitationData } from '../data/invitation';

export const RsvpSection: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [note, setNote] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setErrorMsg('Zəhmət olmasa, ad və soyadınızı qeyd edin.');
      return;
    }

    setErrorMsg('');

    const attendanceText =
      attendance === 'yes'
        ? '✅ Böyük məmnuniyyətlə iştirak edəcəyəm.'
        : '❌ Təəssüf ki, iştirak edə bilməyəcəyəm.';

    const countText = attendance === 'yes' ? `\n👥 Qonaq sayı: ${guestCount} nəfər` : '';
    const noteText = note.trim() ? `\n📝 Qeyd / Təbrik: ${note.trim()}` : '';

    const message = `Salam! Mən ${invitationData.bride} və ${invitationData.groom}-nin toy dəvətnaməsi üçün cavabımı bildirirəm:

👤 Ad və Soyad: ${fullName.trim()}
💌 Status: ${attendanceText}${countText}${noteText}

Təşəkkür edirəm!`;

    const cleanNumber = invitationData.whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <OrnateSection
      id="rsvp-section"
      eyebrow="L.C.X. / RSVP"
      title="Mərasimdə İştirak"
      cornerVariant="final-flowers-tl-br"
    >
      <div className="max-w-sm mx-auto text-left">
        <p className="font-serif-heading text-xs sm:text-sm text-[#741F3A]/80 italic text-center mb-5">
          Zəhmət olmasa, iştirak edib-etməyəcəyinizi öncədən bildirərək təşkilat işlərimizə dəstək olasınız.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ad və Soyad (Şəffaf isti fil sümüyü fon, incə qızılı border, bordo fokus) */}
          <div>
            <label
              htmlFor="rsvp-fullname"
              className="block font-sans-clean text-[11px] font-semibold uppercase tracking-wider text-[#741F3A] mb-1"
            >
              Ad və Soyadınız *
            </label>
            <input
              id="rsvp-fullname"
              type="text"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Məsələn: Rəşad Məmmədov"
              className="w-full h-11 px-4 rounded-xl border border-[#C7A56A]/45 bg-[#FFF9F0]/80 text-[#741F3A] placeholder-[#741F3A]/40 font-serif-heading text-sm sm:text-base focus:outline-none focus:border-[#741F3A] focus:ring-1 focus:ring-[#741F3A]/30 transition-all box-border"
            />
          </div>

          {/* İştirak seçimi */}
          <div>
            <span className="block font-sans-clean text-[11px] font-semibold uppercase tracking-wider text-[#741F3A] mb-1.5">
              İştirak Statusu
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAttendance('yes')}
                aria-label="İştirak edəcəyəm seçimini et"
                className={`flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl border font-sans-clean text-xs font-semibold tracking-wide transition-all cursor-pointer box-border ${
                  attendance === 'yes'
                    ? 'border-[#741F3A] bg-[#741F3A] text-[#FFF9F0] shadow-xs'
                    : 'border-[#C7A56A]/50 bg-[#FFF9F0]/70 text-[#741F3A] hover:bg-[#F7F1E7]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#C7A56A]" />
                <span className="whitespace-nowrap">İştirak edəcəyəm</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('no')}
                aria-label="İştirak etməyəcəyəm seçimini et"
                className={`flex items-center justify-center gap-1.5 h-11 px-3 rounded-xl border font-sans-clean text-xs font-semibold tracking-wide transition-all cursor-pointer box-border ${
                  attendance === 'no'
                    ? 'border-[#741F3A] bg-[#741F3A] text-[#FFF9F0] shadow-xs'
                    : 'border-[#C7A56A]/50 bg-[#FFF9F0]/70 text-[#741F3A] hover:bg-[#F7F1E7]'
                }`}
              >
                <XCircle className="w-4 h-4 text-[#C7A56A]" />
                <span className="whitespace-nowrap">Gələ bilməyəcəyəm</span>
              </button>
            </div>
          </div>

          {/* Qonaq Sayı (Yalnız bəli seçildikdə) */}
          {attendance === 'yes' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="rsvp-guests"
                  className="flex items-center gap-1.5 font-sans-clean text-[11px] font-semibold uppercase tracking-wider text-[#741F3A]"
                >
                  <Users className="w-3.5 h-3.5 text-[#C7A56A]" />
                  <span>Qonaq Sayı</span>
                </label>
                <span className="font-serif-heading text-xs text-[#741F3A] font-semibold">
                  {guestCount} nəfər
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuestCount(num)}
                    aria-label={`${num} nəfər qonaq`}
                    className={`flex-1 h-9 rounded-lg font-serif-heading text-sm font-semibold transition-all cursor-pointer box-border ${
                      guestCount === num
                        ? 'bg-[#741F3A] text-[#FFF9F0] shadow-xs'
                        : 'bg-[#FFF9F0]/80 text-[#741F3A] border border-[#C7A56A]/45 hover:bg-[#F7F1E7]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qeyd / Təbrik sahəsi */}
          <div>
            <label
              htmlFor="rsvp-note"
              className="flex items-center gap-1.5 font-sans-clean text-[11px] font-semibold uppercase tracking-wider text-[#741F3A] mb-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C7A56A]" />
              <span>Qeyd və ya Təbrikiniz (İstəyə bağlı)</span>
            </label>
            <textarea
              id="rsvp-note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Xoş arzularınız və ya xüsusi qeydiniz..."
              className="w-full px-4 py-2 rounded-xl border border-[#C7A56A]/45 bg-[#FFF9F0]/80 text-[#741F3A] placeholder-[#741F3A]/40 font-serif-heading text-sm focus:outline-none focus:border-[#741F3A] focus:ring-1 focus:ring-[#741F3A]/30 transition-all resize-none box-border"
            />
          </div>

          {errorMsg && (
            <p className="font-sans-clean text-xs text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg">
              {errorMsg}
            </p>
          )}

          {/* Mərkəzləşdirilmiş Tünd Bordo, Şampan Konturlu WhatsApp Düyməsi */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              aria-label="Cavabı WhatsApp ilə göndər"
              className="w-full py-3 px-6 rounded-full bg-[#741F3A] hover:bg-[#511427] text-[#FFF9F0] border border-[#C7A56A]/60 font-sans-clean text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xs hover:shadow-sm transition-all active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#C7A56A]" />
              <span>Cavabı WhatsApp ilə Göndər</span>
            </button>
          </div>

          {submitted && (
            <div className="text-center pt-1">
              <p className="font-serif-heading text-xs text-emerald-800 font-medium italic">
                Təşəkkür edirik! Cavabınız WhatsApp tətbiqinə yönləndirildi.
              </p>
            </div>
          )}
        </form>
      </div>
    </OrnateSection>
  );
};
