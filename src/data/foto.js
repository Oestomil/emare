// src/data/foto.js
// Basit bir sözlük yapısı: slug -> { title, src, aliases?, note? }
export const PICS = {
  olayyeri: {
    slug: "Ben Ölüme Yürüdüm",
    title: "Gazete Küpürü",
    src: "/evidence/korkulanolmadi.jpeg", // senin verdiğin yol
    aliases: ["ben ölüme yürüdüm", "benölümeyürüdüm", "ben olume yurudum", "benolumeyurudum"],
    note: "Merkez kare (720p görünümünde gösterilir).",
  },

  // örnek ikinci kayıt – istediğin gibi çoğalt
  kamera1: {
    slug: "kamera1",
    title: "Giriş Kapısı Kamera",
    src: "/evidence/cam_entrance_01.jpg",
    aliases: ["giriş kamera", "kapı kamera", "camera entrance", "giris kamera"],
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
