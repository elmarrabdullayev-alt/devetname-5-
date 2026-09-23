export interface InvitationData {
  bride: string;
  groom: string;
  initials: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  whatsappNumber: string;
  targetDate: string;
}

export const invitationData: InvitationData = {
  bride: "Nigar",
  groom: "Ali",
  initials: "N & A",
  date: "20.09.2027",
  time: "18:00",
  venue: "Böyük Saray",
  address: "Bakı şəhəri",
  mapUrl: "BURAYA_XERITE_LINKI",
  whatsappNumber: "994XXXXXXXXX",
  targetDate: "2027-09-20T18:00:00"
};

export const mediaUrls = {
  heroPoster: "/invitation/hero-poster.webp",
  heroVideoWebm: "/invitation/hero-motion.webm",
  heroVideoMp4: "/invitation/hero-motion.mp4",
  invitationMusic: "/invitation/music.mp3"
};

export const eventTimeline = [
  { time: "18:00", title: "Qonaqların qarşılanması", desc: "Zərif musiqi və xoşgəldin içkiləri ilə qonaqların qarşılanması" },
  { time: "19:00", title: "Toy mərasimi", desc: "Gəlin və bəyin möhtəşəm girişi və təbriklər" },
  { time: "20:00", title: "Şam yeməyi", desc: "Nəfis təamlar və unudulmaz anlar" },
  { time: "21:00", title: "Musiqi və əyləncə", desc: "Canlı ifalar, rəqs və bayram şənliyi" }
];

export const dressCodeColors = [
  { name: "Tünd Bordo", hex: "#741F3A", border: "border-[#C7A56A]/40" },
  { name: "Şampan Qızılı", hex: "#C7A56A", border: "border-[#C7A56A]/60" },
  { name: "İsti Fil Sümüyü", hex: "#F7F1E7", border: "border-[#C7A56A]/30" },
  { name: "Klassik Qara / Tünd", hex: "#231F20", border: "border-[#C7A56A]/30" }
];
