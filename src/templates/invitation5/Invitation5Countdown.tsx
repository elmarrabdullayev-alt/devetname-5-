import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RoyalDivider } from './Invitation5Ornament';

export interface Invitation5CountdownProps {
  eventDate: string; // "YYYY-MM-DD" və ya "20.09.2027"
  startTime: string; // "18:00"
  formattedDateText?: string;
  groomName?: string;
  brideName?: string;
  venueName?: string;
  venueAddress?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Invitation5Countdown: React.FC<Invitation5CountdownProps> = ({
  eventDate,
  startTime,
  formattedDateText,
  groomName = 'Bəy',
  brideName = 'Gəlin',
  venueName = 'Məkan',
  venueAddress = '',
}) => {
  // Parse eventDate and startTime to UTC+04:00 timestamp
  const targetTimestamp = useMemo(() => {
    try {
      let isoDate = eventDate.trim();
      if (isoDate.includes('.')) {
        const parts = isoDate.split('.');
        if (parts.length === 3) {
          isoDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
      }

      let timePart = startTime.trim();
      if (timePart.length === 5) {
        timePart = `${timePart}:00`;
      }

      const isoString = `${isoDate}T${timePart}+04:00`;
      const parsed = Date.parse(isoString);
      return isNaN(parsed) ? Date.now() + 86400000 * 30 : parsed;
    } catch {
      return Date.now() + 86400000 * 30;
    }
  }, [eventDate, startTime]);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const diff = Math.max(0, targetTimestamp - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetTimestamp]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  // Google Calendar handler
  const handleAddToCalendar = () => {
    try {
      let isoDate = eventDate.trim();
      if (isoDate.includes('.')) {
        const parts = isoDate.split('.');
        if (parts.length === 3) {
          isoDate = `${parts[2]}${parts[1].padStart(2, '0')}${parts[0].padStart(2, '0')}`;
        }
      } else {
        isoDate = isoDate.replace(/-/g, '');
      }

      const cleanTime = startTime.replace(/:/g, '').slice(0, 4);
      const startDateTime = `${isoDate}T${cleanTime}00`;
      
      const title = encodeURIComponent(`${brideName} & ${groomName} — Toy Dəvətnaməsi`);
      const details = encodeURIComponent(`Sizi toy mərasimimizdə görməkdən məmnun olarıq!`);
      const location = encodeURIComponent(`${venueName}, ${venueAddress}`.trim());

      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime}/${startDateTime}&details=${details}&location=${location}`;
      const link = document.createElement('a');
      link.href = googleCalUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Fallback
    }
  };

  const units = [
    { label: 'GÜN', value: timeLeft.days },
    { label: 'SAAT', value: timeLeft.hours },
    { label: 'DƏQİQƏ', value: timeLeft.minutes },
    { label: 'SANİYƏ', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="invitation5-countdown-section select-none">
      {/* Daxili məzmun: relative z-10 sayəsində gradientin altında qalmır */}
      <div className="relative z-10 w-full max-w-[480px] mx-auto px-4 text-center">
        {/* Başlıq: təkrar tac ikonu silinib, keçid ornamentindən 42-60px məsafədə zərif başlayır */}
        <header className="text-center select-none pt-1 pb-1">
          <p className="inv5-font-script text-2xl sm:text-[28px] text-[#a98a54] leading-tight drop-shadow-xs">
            Böyük günə az qaldı
          </p>
          <h3 className="inv5-font-serif text-xl sm:text-2xl text-[#64513c] tracking-wider font-normal mt-1">
            Geri Sayım
          </h3>
          <RoyalDivider className="my-3 opacity-65" />
        </header>

        {/* Sayğaclar: Zərif ornamental medalyonlar, bir sətirdə və mərkəzdə */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-[340px] mx-auto my-4">
          {units.map((unit, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-full border border-[#c4aa78]/45 relative overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #FBF8F2 0%, #F5EDE0 100%)',
                boxShadow: '0 2px 8px rgba(100, 81, 60, 0.05)',
              }}
            >
              <span
                className="inv5-font-serif text-[#64513c] font-medium leading-none"
                style={{ fontSize: 'clamp(20px, 5.2vw, 26px)' }}
              >
                {String(unit.value).padStart(2, '0')}
              </span>
              <span
                className="inv5-font-ui block text-[8px] sm:text-[8.5px] tracking-[0.16em] text-[#8a7963] font-medium mt-1.5 uppercase"
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tarix */}
        <p className="inv5-font-serif italic text-base text-[#64513c] mt-4 mb-5">
          {formattedDateText || `${eventDate} • Saat ${startTime}`}
        </p>

        {/* “Təqvimə əlavə et” düyməsi */}
        <div>
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="invitation5-action-button"
            aria-label="Təqvimə əlavə et"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a98a54"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="inv5-font-serif">Təqvimə əlavə et</span>
          </button>
        </div>
      </div>
    </section>
  );
};
