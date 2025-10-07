// Tek yerden yönetilecek kayıt defteri
import { FRIDGE } from "./photo_fridge.js";
import { KULLUK } from "./photo_kulluk.js";
import { MASA } from "./photo_masa.js";
import { ANTRE } from "./photo_antre.js";
import { COP } from "./photo_cop.js";
import { PC } from "./photo_pc.js";
// ileride PHOTO2, PHOTO3... eklenir

// slug -> record
export const PHOTO_EVIDENCES = {
  fridge: FRIDGE,
  kulluk: KULLUK,
  masa: MASA,
  antre: ANTRE,
  cop: COP,
  pc: PC,
  // "living-room": PHOTO1,
  // "living-room": PHOTO2,
};
export const PHOTO_EVIDENCES_LIST = Object.values(PHOTO_EVIDENCES);

// alias -> slug (çoklu isim desteği)
const ALIASES = {
  "CHEL54": "fridge",
  "chel54": "fridge",
};

export function normalizeSlug(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")    // boşluk -> tire
    .replace(/[^a-z0-9-]/g, ""); // basic normalize
}

// Arama kutusundan gelen metni foto delil slug’ına çevir
export function resolvePhotoEvidenceSlug(input) {
  const norm = normalizeSlug(input);
  if (!norm) return null;

  // 1) birebir slug
  if (PHOTO_EVIDENCES[norm]) return norm;

  // 2) alias tablosu
  const mapped = ALIASES[norm];
  if (mapped && PHOTO_EVIDENCES[mapped]) return mapped;

  return null;
}

// Router için kayıt getiren yardımcı (PhotoPanel kullanıyor)
export function getPhotoEvidence(id) {
  return PHOTO_EVIDENCES[id] || null;
}
