import React, { useState, useMemo } from 'react';
import { Invitation5SectionShell } from './Invitation5SectionShell';

export interface Invitation5LocationProps {
  venueName: string;
  venueSubName?: string;
  venueAddress: string;
  googleMapsUrl?: string;
  eventDate?: string;
  startTime?: string;
}

export const Invitation5Location: React.FC<Invitation5LocationProps> = ({
  venueName,
  venueSubName,
  venueAddress,
  googleMapsUrl,
  eventDate,
  startTime,
}) => {
  const [mapError, setMapError] = useState<boolean>(false);

  const embedMapUrl = useMemo(() => {
    if (!googleMapsUrl && !venueAddress && !venueName) return '';

    if (googleMapsUrl) {
      const clean = googleMapsUrl.trim();
      if (clean.includes('/embed') || clean.includes('output=embed')) {
        return clean;
      }
    }

    const searchQuery = encodeURIComponent(
      `${venueName}${venueAddress ? ', ' + venueAddress : ''}`
    );
    return `https://maps.google.com/maps?q=${searchQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }, [googleMapsUrl, venueName, venueAddress]);

  const directNavigationUrl = useMemo(() => {
    if (googleMapsUrl && !googleMapsUrl.includes('output=embed')) {
      return googleMapsUrl;
    }
    const query = encodeURIComponent(`${venueName}, ${venueAddress}`.trim());
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }, [googleMapsUrl, venueName, venueAddress]);

  return (
    <Invitation5SectionShell
      scriptHeader="Təntənəli Məkan"
      mainTitle={venueName}
      subtitle={venueSubName}
    >
      <div className="text-center my-2">
        <p className="inv5-font-serif text-[15px] text-[#64513c] leading-relaxed px-2">
          {venueAddress}
        </p>
        {(eventDate || startTime) && (
          <p className="inv5-font-serif italic text-sm text-[#8a7963] mt-1.5">
            {eventDate} {startTime && `• Saat ${startTime}`}
          </p>
        )}

        {/* Xəritə: İncə saray tağı formasında haşiyə */}
        {embedMapUrl && !mapError && (
          <div
            className="my-5 overflow-hidden rounded-t-[50px] rounded-b-md border border-[#c4aa78]/45 relative w-full aspect-[16/10] max-w-[380px] mx-auto"
            style={{
              boxShadow: '0 4px 16px rgba(100, 81, 60, 0.06)',
              background: '#F1E8D8',
            }}
          >
            <iframe
              src={embedMapUrl}
              title={`Xəritə: ${venueName}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen={false}
              referrerPolicy="no-referrer-when-downgrade"
              onError={() => setMapError(true)}
              className="w-full h-full block"
            />
          </div>
        )}

        {/* “Xəritədə bax” düyməsi: Zərif qızılı oval möhür */}
        <div className="mt-4">
          <a
            href={directNavigationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="invitation5-action-button"
            aria-label="Google Maps xəritəsində bax"
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="inv5-font-serif">Xəritədə bax</span>
          </a>
        </div>
      </div>
    </Invitation5SectionShell>
  );
};
