// Tek yerden yönetilecek kayıt defteri
import { FRIDGE } from "./photo_fridge.js";
// ileride PHOTO2, PHOTO3... eklenir

// slug -> record
export const PHOTO_EVIDENCES = {
  fridge: FRIDGE,
  // "living-room": PHOTO2,
};

// alias -> slug (çoklu isim desteği)
const ALIASES = {
  "CHEL54": "fridge",
};

export function normalizeSlug(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")    // boşluk -> tire
    .replace(/[^a-z0-9\-]/g, ""); // basic normalize
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
