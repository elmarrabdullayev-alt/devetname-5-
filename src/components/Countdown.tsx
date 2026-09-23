import React, { useState, useEffect } from 'react';
import { OrnateSection } from './OrnateSection';
import { invitationData } from '../data/invitation';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(invitationData.targetDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'GÜN', value: timeLeft.days },
    { label: 'SAAT', value: timeLeft.hours },
    { label: 'DƏQİQƏ', value: timeLeft.minutes },
    { label: 'SANİYƏ', value: timeLeft.seconds },
  ];

  return (
    <OrnateSection
      id="countdown-section"
      eyebrow="Xoşbəxt Günə Qalan Vaxt"
      title="Geri Sayım"
      cornerVariant="leaves-tr-bl"
    >
      <div className="flex flex-col items-center justify-center w-full">
        {/* Zərif Tək Sətirli Geri Sayım Paneli (Şampan ayırıcılar ilə) */}
        <div className="flex items-center justify-center w-full max-w-sm py-3 px-1 sm:px-2 rounded-2xl bg-[#FFF9F0]/80 border border-[#C7A56A]/40 shadow-xs">
          {timeUnits.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex-1 flex flex-col items-center justify-center px-1">
                <span
                  style={{ fontSize: 'clamp(25px, 8vw, 38px)' }}
                  className="font-serif-heading font-semibold text-[#741F3A] tabular-nums leading-none tracking-tight"
                >
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="mt-2 font-sans-clean text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] text-[#741F3A]/70 uppercase">
                  {item.label}
                </span>
              </div>

              {/* Rəqəmlər arasındakı zərif şampan-qızılı ayırıcı */}
              {idx < timeUnits.length - 1 && (
                <div className="flex flex-col items-center justify-center gap-1 opacity-60 px-0.5">
                  <span className="w-1 h-1 rounded-full bg-[#C7A56A]" />
                  <span className="w-1 h-1 rounded-full bg-[#C7A56A]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Hədəf tarix və saat qeydi */}
        <p className="mt-5 font-serif-heading text-sm text-[#741F3A]/85 italic">
          {invitationData.date} • Saat {invitationData.time}
        </p>
      </div>
    </OrnateSection>
  );
};
