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

  HLKLR: {
    brand: "Emare",
    code: "HLKLR",
    subtitle: "Kaynak: Arşiv • Cihaz: iPhone 13",
    cornerNumber: "4",
    images: [
      "/evidence/hlklr1.jpeg",
      "/evidence/hlklr2.jpeg",
      "/evidence/hlklr3.jpeg",
      "/evidence/hlklr4.jpeg",

    ],
  },

 


  EU82HNS: {
    brand: "Emare",
    code: "EU82HNS",
    subtitle: "Kaynak: Arşiv • Cihaz: iPhone 13 Pro",
    footnote: "Gizli – yalnızca iç kullanım için.",
    cornerNumber: "2",
    images: [
      "/evidence/sen1.png",
      "/evidence/sen2.png",
      "/evidence/sen3.png",
      "/evidence/sen4.png",
      "/evidence/sen5.png",
      "/evidence/sen6.png",
      "/evidence/sen7.png",
      "/evidence/sen8.png",

    ],
  },
  ORTOTR: {
    brand: "Emare",
    code: "WETCE",
    subtitle: "Kaynak: Kamera görüntüsü • iPhone 13 Pro",
    footnote: "Tüm hakları saklıdır.",
    cornerNumber: "3",
    images: [
      "/evidence/aziul1.jpg",
      "/evidence/aziul2.jpg",
      "/evidence/aziul3.jpg",
      "/evidence/aziul4.jpg",
      "/evidence/aziul5.jpg",
      "/evidence/aziul6.jpg",
      { type: "video", src: "/videos/clip1.mp4" },
      { type: "video", src: "/videos/clip2.mp4" },
    ]
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

  KRTTLR: {
    brand: "Emare",
    code: "KRTTLR",
    subtitle: "Kaynak: Telefon Kayıtları • Cihaz: Google Pixel 6",
    footnote: "Gizli – yalnızca iç kullanım için.",
    cornerNumber: "8",
    images: [
      "/evidence/krtlr1.png",
      "/evidence/krtlr2.png",
      "/evidence/krtlr3.png",
      "/evidence/krtlr4.png",
    ]
  },

  NVDSH: {
    brand: "Emare",
    code: "NVDSH",
    subtitle: "Kaynak: Kamera görüntüsü • iPhone 13 Pro",
    footnote: "Tüm hakları saklıdır.",
    cornerNumber: "5",
    images: [
      "/azizebedi/1.png" ,
      "/azizebedi/2.png",
      "/azizebedi/3.png",
      "/azizebedi/4.png",
      "/azizebedi/5.png",
      "/azizebedi/6.png",
      "/azizebedi/7.png",
      "/azizebedi/8.png",
      "/azizebedi/9.png",
      "/azizebedi/10.png",
    ]
  }
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
