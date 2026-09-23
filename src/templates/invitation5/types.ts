export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  description?: string;
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  alt?: string;
}

export type RsvpMode = 'admin' | 'whatsapp' | 'both' | 'hidden';

export interface RsvpFormData {
  name: string;
  attending: 'yes' | 'no';
  guestCount: number;
  note: string;
}

export interface Invitation5Data {
  // Giriş və şəxslər
  groomName: string;
  brideName: string;
  initials?: string;
  invitationText: string;
  familyNames?: string;
  pageTwoTitle?: string;
  pageTwoQuote?: string;

  // Tarix və saat
  eventDate: string; // "YYYY-MM-DD" və ya "20.09.2027"
  startTime: string; // "18:00"
  formattedDateText?: string; // "20 Sentyabr 2027, Bazar ertəsi"

  // Məkan
  venueName: string;
  venueSubName?: string;
  venueAddress: string;
  googleMapsUrl?: string;

  // Proqram
  program?: ProgramItem[];

  // Geyim tərzi və hədiyyə
  dressCode?: string;
  dressCodeColors?: DressCodeColor[];
  giftNote?: string;

  // Fotoqalereya
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryClosingText?: string;
  gallery?: GalleryItem[];

  // RSVP
  invitationId?: string;
  rsvpMode?: RsvpMode;
  whatsappNumber?: string;
  isPreview?: boolean;
  onSubmitRsvp?: (data: RsvpFormData) => Promise<boolean> | boolean | void;

  // Audio / Musiqi
  musicUrl?: string;
}
