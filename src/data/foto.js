// src/data/foto.js
// Basit bir sözlük yapısı: slug -> { title, src, aliases?, note? }
export const PICS = {
  benolumeyurudum: {
    slug: "Ben Ölüme Yürüdüm",
    title: "Gazete Küpürü",
    src: "/gazete1.jpg", // senin verdiğin yol
    note: "Azize Güner (19) İntihar  Haberi.",
    aliases: ["benolumeyurudum", "ben ölüm yürüdüm", "ben-ölüm-yürüdüm", "ben ölüme yürüdüm" ,"Ben Ölüme Yürüdüm" ],
  },

  // örnek ikinci kayıt – istediğin gibi çoğalt
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


// Türkçe karakter ve boşluk normalize
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

// Aramadan slug çözümleyici
export function resolvePicSlug(q) {
  const n = normalize(q);
  if (!n) return null;

  // 1) Doğrudan slug eşleşmesi
  if (PICS[n]) return n;

  // 2) alias eşleşmesi
  for (const [slug, entry] of Object.entries(PICS)) {
    const aliases = entry.aliases || [];
    if (aliases.map(normalize).includes(n)) return slug;
  }

  // 3) "içerir" tipi zayıf eşleşme (opsiyonel, istersen kaldır)
  for (const [slug, entry] of Object.entries(PICS)) {
    if (normalize(entry.title).includes(n)) return slug;
    const aliases = entry.aliases || [];
    if (aliases.some(a => normalize(a).includes(n))) return slug;
  }

  return null;
}
