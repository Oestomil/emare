// src/data/evidence.js

// --------------------
// 1) Delil veri tabanı
// --------------------

export const EVIDENCE = {
  DFGR2: {
    brand: "Emare",
    code: "DFGR2",
    subtitle: "Görüntüler Ulvi Plevneli’nin iPhone 13 cihazından alınmıştır.",
    footnote: "Bu site Emniyet Genel Müdürlüğü tarafından yaptırılmıştır.*",
    cornerNumber: "1",
    images: [
      "/evidence/Azize-Ulvi_ikincitelefon_-01.jpg",
      "/evidence/Azize-Ulvi_ikincitelefon_-02.jpg ",
      "/evidence/Azize-Ulvi_ikincitelefon_-03.jpg",
      "/evidence/Azize-Ulvi_ikincitelefon_-04.jpg",
      "/evidence/Azize-Ulvi_ikincitelefon_-05.jpg",
      "/evidence/Azize-Ulvi_ikincitelefon_-06.jpg",

    ],
  },

  ABCD1: {
    brand: "Emare",
    code: "ABCD1",
    subtitle: "Kaynak: Arşiv • Cihaz: iPhone 12 Pro",
    footnote: "Gizli – yalnızca iç kullanım için.",
    cornerNumber: "2",
    images: [
      "/bedirhan.jpg",
      "/azize.jpg",
    ],
  },

  XYZ99: {
    brand: "Emare",
    code: "XYZ99",
    subtitle: "Kaynak: Kamera görüntüsü • Samsung Galaxy S22",
    footnote: "Tüm hakları saklıdır.",
    cornerNumber: "7",
    images: [
      "/evidence/xyz99-1.jpg",
    ],
  },
};

// ----------------------------------------------------
// 2) Kod çözümleyici (arama çubuğu için normalize eder)
// ----------------------------------------------------

export const EVIDENCE_CODES = Object.keys(EVIDENCE);

/**
 * Arama kutusuna yazılanı normalize edip
 * geçerli bir delil koduna çevirir.
 * Örnek:
 *   "dfgr2"      -> "DFGR2"
 *   "./DFGR2"    -> "DFGR2"
 *   "xyz-99 "    -> "XYZ99"
 */
export function resolveEvidenceCode(raw) {
  if (!raw) return null;
  const k = String(raw)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, ""); // sadece A-Z,0-9 bırak
  return EVIDENCE[k] ? k : null;
}
