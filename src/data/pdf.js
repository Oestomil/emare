// data/pdf.js

// Ortak medya listesi (PDF + Görsel)
export const PDFS = [
  // --- PDF'ler (type opsiyonel; yoksa 'pdf' varsayılır) ---
  {
    slug: "azizeadli",
    title: "Azize Adli Rapor",
    src: "/azizeadli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },
  {
    slug: "bedirhanadli",
    title: "Bedirhan Adli Rapor",
    src: "/bedirhanadli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },
  {
    slug: "fundaadli",
    title: "Funda Adli Rapor",
    src: "/fundaadli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },
  {
    slug: "ulviadli",
    title: "Ulvi Adli Rapor",
    src: "/ulviadli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },
  {
    slug: "kamiladli",
    title: "Kamil Adli Rapor",
    src: "/kamiladli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },

  // --- Görseller (JPEG/PNG/WebP vs.) ---
  {
    slug: "ben ölüme yürüdüm",
    title: "Ben Ölüme Yürüdüm",
    src: "/evidence/korkulanolmadi.jpeg",
    note: "Kanıt fotoğrafı",
    type: "image",
  },
  {
    slug: "ben olume yurudum",
    title: "Ben Ölüme Yürüdüm",
    src: "/evidence/korkulanolmadi.jpeg",
    note: "Kanıt fotoğrafı",
    type: "image",
  },

  // ...diğerleri
];

// Yardımcı: slug ile bul
export function getPdfBySlug(slug) {
  if (!slug) return null;
  const item =
    PDFS.find((p) => p.slug.toLowerCase() === String(slug).toLowerCase()) || null;

  // geriye dönük uyum: type yoksa pdf say
  if (item && !item.type) item.type = "pdf";
  return item;
}

// Yardımcı: arama girdisinden slug çöz
export function resolvePdfSlug(query) {
  if (!query) return null;
  const q = String(query).toLowerCase();

  // slug ile eşleşme
  const bySlug = PDFS.find((p) => p.slug.toLowerCase() === q);
  if (bySlug) return bySlug.slug;

  // title veya note içinde arama (kısmi eşleşme)
  const byTitle = PDFS.find(
    (p) =>
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.note && p.note.toLowerCase().includes(q))
  );
  if (byTitle) return byTitle.slug;

  return null;
}
