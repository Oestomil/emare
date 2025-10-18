// src/data/foto.js
// Basit bir sözlük yapısı: slug -> { title, src, aliases?, note? }
export const PICS = {
  benolumeyurudum: {
    slug: "BENOLUMEYURUDUM", // ❗️İÇ DEĞERİ uppercase tutmak zorunda değilsin; router'da ne bekliyorsan ona göre.
    title: "Gazete Küpürü",
    src: "/gazete1.jpg",
    note: "Azize Güner (19) İntihar  Haberi.",
    aliases: ["benolumeyurudum", "ben ölüm yürüdüm", "ben-ölüm-yürüdüm", "ben ölüme yürüdüm" ,"Ben Ölüme Yürüdüm" ],
  },

  kamera1: {
    slug: "PSVFB",
    title: "Gazete Küpürü 2",
    src: "/images/psvfb.jpg",
    aliases: ["psvfb", "psv fb", "psv-fb"],
  },

  GAZETE2: {
    slug: "TRSGZ",
    title: "Gazete Küpürü 3",
    src: "/images/tursu.png",
    aliases: ["trsgz", "trs-gz", "trsg z"],
  },

  msd32: {
    slug: "MSD32",
    title: "Gazete Küpürü 4",
    src: "/images/msd32.jpg",
    aliases: ["msd32", "msd 32"],
  },

  drg21: {
    slug: "DRG21",
    title: "Drug Test Raporu",
    src: "/images/drg21.png",
    aliases: ["drg21", "drg 21"],
  },

  asm15: {
    slug: "15ASM",
    title: "Plamingo Slip",
    src: "/images/15asm.png",
    aliases: ["15asm", "15 asm", "15 asım"],
  },

  GRSANK: {
    slug: "GRSANK",
    title: "Garson İfadesi",
    src: "/images/GRSANK.jpg",
    aliases: ["grsank", "grs ank", "grsanık"],
    note: "Funda Okul Giriş Çıkış.",
  },

  azizeparmak: {
    slug: "AZIZEPARMAK",
    title: "Azize'nin Parmak İzi",
    src: "/azizeparmak.jpg",
    note: "Azize Güner'in Parmak İzi Raporu.",
  },

  kamilparmak: {
    slug: "KAMILPARMAK",
    title: "Kamil'in Parmak İzi",
    src: "/kamilparmak.jpg",
    note: "Kamil Şen'in Parmak İzi Raporu.",
  },

  fundaparmak: {
    slug: "FUNDAPARMAK",
    title: "Funda'nın Parmak İzi",
    src: "/fundaparmak.jpg",
    note: "Funda Plevneli'nin Parmak İzi Raporu.",
  },

  bedirhanparmak: {
    slug: "BEDIRHANPARMAK",
    title: "Bedirhan'ın Parmak İzi",
    src: "/bedirhanparmak.jpg",
    note: "Bedirhan Mert'in Parmak İzi Raporu.",
  },

  ulviparmak: {
    slug: "ULVIPARMAK",
    title: "Ulvi'nin Parmak İzi",
    src: "/ulviparmak.jpg",
    note: "Ulvi Plevneli'nin Parmak İzi Raporu.",
  },
};

// ------------------------------
// Normalize yardımcıları
// ------------------------------
function normalize(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ö", "o")
    .replaceAll("ş", "s")
    .replaceAll("ü", "u")
    .replace(/\s+/g, " ");
}

// ------------------------------
// Hızlı ve güvenli index
//  - slug ve alias'ları normalize edip tek map’e koyuyoruz
//  - sadece tam eşleşme döner
// ------------------------------
const PIC_INDEX = new Map();
for (const [keySlug, entry] of Object.entries(PICS)) {
  // 1) Objede tanımlı 'slug' alanını tercih et; yoksa key'i kullan
  const canonical = entry.slug ? String(entry.slug) : String(keySlug);
  PIC_INDEX.set(normalize(canonical), keySlug);

  // 2) Alias'lar
  const aliases = entry.aliases || [];
  for (const a of aliases) {
    PIC_INDEX.set(normalize(a), keySlug);
  }
}

// ------------------------------
// Aramadan slug çözümleyici
//  - En az 3 karakter kuralı
//  - Sadece tam eşleşme
// ------------------------------
export function resolvePicSlug(q) {
  const n = normalize(q);
  if (!n || n.length < 5) return null;       // ❗️“a”, “ag” gibi girdileri reddet
  const hit = PIC_INDEX.get(n);
  return hit || null;                         // sadece TAM eşleşme
}
