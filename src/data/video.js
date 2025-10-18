// src/data/video.js

export const VIDEOS = [
  {
    slug: "V5WQS",
    title: "112 Acil Çağrı Arama Kaydı",
    src: "/videos/V5WQS.mp4",
    note: "F.P. tarafından yapılan 112 acil çağrı kaydı",
    aliases: ["v5wqs", "v5wqs.mp4", "vswqs"],
  },
  {
    slug: "MTSH",
    title: "Mahkeme Tutanak Sahnesi",
    src: "/videos/mtsh.mp4",
    note: "Mahkeme kaydı",
  },
  {
    slug: "GATEX",
    title: "Kapı Kamera Kaydı",
    src: "/videos/gatex.mp4",
    note: "Apartman girişi kamera görüntüsü",
    aliases: ["gatex","gate","kapikamera"], // istersen kısa takma adlar
  },
  {
    slug: "ENKHG",
    title: "Kamil Şen Story Kaydı",
    src: "/videos/eniste.mp4",
    note: "Kamil Şen'in sosyal medya story kaydı",
  },
  {
    slug: "LUHS2",
    title: "Poolamingo Kamera Kaydı",
    src: "/videos/poolamingo.mp4",
    note: "Güvenlik kamera kaydı",
  },
  {
    slug: "secenekfunda",
    title: "Haberler - Funda Plevneli Seçenek",
    src: "/videos/funda.mp4",
    note: "Funda Plevneli ile ilgili haber kaydı",
    mektupTitle: "İtiraf Mektubu",
    mektupYazi: "''Cinayet gününden önceki gece Ulvi Plevneli'ye mesaj attım hocam size gelebilir miyim diye...",
    mektupUrl: "/#/pdf/fundatut"
  },
  { 
    slug: "secenekkamil",
    title: "Haberler - Kamil Şen Seçenek",
    src: "/videos/kamil.mp4",
    note: "Kamil Şen ile ilgili haber kaydı",
    mektupTitle: "İtiraf Mektubu",
    mektupYazi: "''Cinayet gününden önceki gece Ulvi Plevneli'ye mesaj attım hocam size gelebilir miyim diye...",
    mektupUrl: "/#/pdf/kamiltut"
  },
  {
    slug: "secenekbedirhan",
    title: "Haberler - Bedirhan Mardinli Seçenek",
    src: "/videos/bedirhan.mp4",
    note: "Bedirhan Mert ile ilgili haber kaydı",
    mektupTitle: "İtiraf Mektubu",
    mektupYazi: "''Cinayet gününden önceki gece Ulvi Plevneli'ye mesaj attım hocam size gelebilir miyim diye...",
    mektupUrl: "/#/pdf/bedirhantut"
  },
];

// Tekil getir (case-insensitive)
export function getVideoBySlug(slug) {
  if (!slug) return null;
  const q = String(slug).toLowerCase();
  return VIDEOS.find(v => v.slug.toLowerCase() === q) || null;
}

// ---- normalize & index ----
function normalize(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replaceAll("ı","i").replaceAll("ç","c").replaceAll("ğ","g")
    .replaceAll("ö","o").replaceAll("ş","s").replaceAll("ü","u")
    .replace(/\s+/g, " ");
}

const VIDEO_INDEX = new Map(); // normalizedKey -> canonicalSlug
for (const v of VIDEOS) {
  const canonical = String(v.slug);
  VIDEO_INDEX.set(normalize(canonical), canonical);
  const aliases = v.aliases || v.allias || [];
  for (const a of aliases) {
    VIDEO_INDEX.set(normalize(a), canonical);
  }
}

// ---- Sadece tam eşleşme + min 3 karakter ----
export function resolveVideoSlug(query) {
  if (!query) return null;
  const n = normalize(query);
  if (!n || n.length < 5) return null; // “a”, “ga” gibi girdileri reddet
  const hit = VIDEO_INDEX.get(n);
  return hit || null;
}
