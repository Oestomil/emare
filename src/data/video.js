// src/data/video.js

export const VIDEOS = [
  {
    slug: "V5WQS",
    title: "112 Acil Çağrı Arama Kaydı",
    src: "/videos/V5WQS.mp4",
    note: "F.P. tarafından yapılan 112 acil çağrı kaydı",
    allias: ["v5wqs", "v5wqs.mp4", "vswqs" ],
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
  },
  { 
    slug: "secenekkamil",
    title: "Haberler - Kamil Şen Seçenek",
    src: "/videos/kamil.mp4",
    note: "Kamil Şen ile ilgili haber kaydı",
  },
  {
    slug: "secenekbedirhan",
    title: "Haberler - Bedirhan Mert Seçenek",
    src: "/videos/bedirhan.mp4",
    note: "Bedirhan Mert ile ilgili haber kaydı",
  },
];

// Tekil getir
export function getVideoBySlug(slug) {
  if (!slug) return null;
  return (
    VIDEOS.find((v) => v.slug.toLowerCase() === String(slug).toLowerCase()) ||
    null
  );
}

// Sadece tam slug eşleşmesi
export function resolveVideoSlug(query) {
  if (!query) return null;
  const q = String(query).trim().toLowerCase();
  const item = VIDEOS.find((v) => v.slug.toLowerCase() === q);
  return item ? item.slug : null;
}
