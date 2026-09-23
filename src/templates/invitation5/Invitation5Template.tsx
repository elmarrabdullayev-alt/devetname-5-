import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Invitation5Data } from './types';
import { Invitation5Intro } from './Invitation5Intro';
import { Invitation5PageOne } from './Invitation5PageOne';
import { Invitation5Countdown } from './Invitation5Countdown';
import { Invitation5Program } from './Invitation5Program';
import { Invitation5Location } from './Invitation5Location';
import { Invitation5Preferences } from './Invitation5Preferences';
import { Invitation5Gallery } from './Invitation5Gallery';
import { Invitation5RSVP } from './Invitation5RSVP';
import { Invitation5Ending } from './Invitation5Ending';
import { Invitation5MusicButton } from './Invitation5MusicButton';
import './invitation5.css';

type Phase = 'intro' | 'transitioning' | 'content';

// Standart və nümunəvi dəyərlər
const defaultInvitationData: Invitation5Data = {
  groomName: 'Əli',
  brideName: 'Nigar',
  initials: 'N & Ə',
  invitationText:
    'Bu unudulmaz günümüzdə sevincimizi bizimlə bölüşmək, xoşbəxtliyimizə şahidlik etmək üçün sizi aramızda görməkdən sonsuz şərəf duyarıq.',
  familyNames: 'Məmmədov və Quliyev ailələri',
  eventDate: '20.09.2027',
  startTime: '18:00',
  formattedDateText: '20 Sentyabr 2027, Bazar ertəsi • Saat 18:00',
  venueName: 'Böyük Saray',
  venueSubName: 'Zümrüd Zalı',
  venueAddress: 'Bakı şəhəri, Heydər Əliyev prospekti 125',
  googleMapsUrl: 'https://maps.google.com/?q=Baku+Boyuk+Saray',
  program: [
    {
      id: '1',
      time: '18:00',
      title: 'Qonaqların qarşılanması',
      description: 'Zərif musiqi və xoşgəldin kokteyli ilə qonaqların qəbulu',
    },
    {
      id: '2',
      time: '19:00',
      title: 'Təntənəli giriş mərasimi',
      description: 'Bəy və gəlinin zala daxil olması və təbriklər',
    },
    {
      id: '3',
      time: '20:00',
      title: 'Şam yeməyi',
      description: 'Nəfis təamlar və unudulmaz musiqi sədaları',
    },
    {
      id: '4',
      time: '21:30',
      title: 'Tort kəsilməsi və atəşfəşanlıq',
      description: 'Romantik anlar və bayram şənliyi',
    },
    {
      id: '5',
      time: '22:00',
      title: 'Musiqi və rəqs gecəsi',
      description: 'Canlı ifalar və rəqs',
    },
  ],
  dressCode:
    'Klassik ziyafət geyimi (Black Tie / Formal). Xanımlardan pastel və zərif tonlarda, bəylərdən isə klassik kostyumda iştirak etmələri xahiş olunur.',
  dressCodeColors: [
    { name: 'Şampan', hex: '#E8DDC8' },
    { name: 'İsti Ivory', hex: '#F7F4EE' },
    { name: 'Qızılı Zərif', hex: '#B89A62' },
    { name: 'Şokolad Tünd', hex: '#554838' },
  ],
  giftNote:
    'Ən böyük hədiyyəniz bu özəl gündə bizimlə olmağınızdır. Əgər bizi sevindirmək istəsəniz, zərf şəklində hədiyyə ən gözəl seçim olar.',
  galleryTitle: 'Foto Qalereya',
  gallerySubtitle: 'Birlikdə Yazılan Hekayəmiz',
  galleryClosingText: 'Hər anı sevgi və məhəbbətlə xatırlayacağımız bir ömür arzulayırıq.',
  gallery: [
    { id: '1', url: '/templates/invitation5/intro-poster.webp', alt: 'Xatirə şəkli 1' },
    { id: '2', url: '/templates/invitation5/page-1-poster.webp', alt: 'Xatirə şəkli 2' },
  ],
  rsvpMode: 'both',
  whatsappNumber: '994501234567',
  isPreview: true,
};

export interface Invitation5TemplateProps {
  data?: Partial<Invitation5Data>;
}

export const Invitation5Template: React.FC<Invitation5TemplateProps> = ({ data }) => {
  // Merge incoming dynamic props with default values
  const config = { ...defaultInvitationData, ...data };

  const [phase, setPhase] = useState<Phase>('intro');
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleVideoEnded = useCallback(() => {
    // 1. Enter transitioning state: intro begins fading out (800ms)
    setPhase('transitioning');

    // 2. After transition completes, switch to full content state and unmount intro
    transitionTimerRef.current = setTimeout(() => {
      setPhase('content');
    }, 820);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="invitation5-wrapper">
      <div
        className={`invitation5-container ${
          phase !== 'content' ? 'overflow-hidden max-h-[100dvh]' : ''
        }`}
      >
        {/* 1. Giriş animasiyası — intro-opening.webm */}
        {phase !== 'content' && (
          <Invitation5Intro
            isFadingOut={phase === 'transitioning'}
            onVideoEnded={handleVideoEnded}
          />
        )}

        {/* Fasiləsiz Şaquli Dəvətnamə Axını */}
        <main className="flex flex-col w-full m-0 p-0">
          {/* 2. 1-ci səhifə — page-1-motion.webm animasiyası və ilk mətnlər */}
          <Invitation5PageOne
            groomName={config.groomName}
            brideName={config.brideName}
            eventDate={config.eventDate}
            startTime={config.startTime}
            invitationText={config.invitationText}
            familyNames={config.familyNames}
          />

          {/* 3. Geri sayım və tarix (Birinci səhifədən sonra birbaşa açılır) */}
          <Invitation5Countdown
            eventDate={config.eventDate}
            startTime={config.startTime}
            formattedDateText={config.formattedDateText}
            groomName={config.groomName}
            brideName={config.brideName}
            venueName={config.venueName}
            venueAddress={config.venueAddress}
          />

          {/* 4. Tədbir proqramı */}
          <Invitation5Program program={config.program} />

          {/* 5. Məkan və xəritə */}
          <Invitation5Location
            venueName={config.venueName}
            venueSubName={config.venueSubName}
            venueAddress={config.venueAddress}
            googleMapsUrl={config.googleMapsUrl}
            eventDate={config.eventDate}
            startTime={config.startTime}
          />

          {/* 6. Geyim tərzi və hədiyyə qeydi */}
          <Invitation5Preferences
            dressCode={config.dressCode}
            dressCodeColors={config.dressCodeColors}
            giftNote={config.giftNote}
          />

          {/* 7. Fotoqalereya */}
          <Invitation5Gallery
            galleryTitle={config.galleryTitle}
            gallerySubtitle={config.gallerySubtitle}
            galleryClosingText={config.galleryClosingText}
            gallery={config.gallery}
          />

          {/* 8. RSVP */}
          <Invitation5RSVP
            invitationId={config.invitationId}
            rsvpMode={config.rsvpMode}
            whatsappNumber={config.whatsappNumber}
            isPreview={config.isPreview}
            onSubmitRsvp={config.onSubmitRsvp}
            coupleNames={`${config.brideName} & ${config.groomName}`}
            eventDate={config.eventDate}
          />

          {/* 9. Zərif Monogram və Təşəkkür Sonluğu */}
          <Invitation5Ending
            brideName={config.brideName}
            groomName={config.groomName}
            initials={config.initials}
            eventDate={config.eventDate}
            venueName={config.venueName}
          />
        </main>

        {/* 10. Musiqi İdarəetmə Düyməsi */}
        <Invitation5MusicButton />
      </div>
    </div>
  );
};

export default Invitation5Template;
