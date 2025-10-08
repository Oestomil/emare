// data/pdf.js

// Ortak medya listesi (PDF + Görsel)
export const PDFS = [
  // --- PDF'ler (type opsiyonel; yoksa 'pdf' varsayılır) ---
  {
    slug: "azizeadli",
    title: "Azize Adli Rapor",
    src: "/pdf/azizeadli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },
  {
    slug: "bedirhanadli",
    title: "Bedirhan Adli Rapor",
    src: "/pdf/bedirhanadli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },
  {
    slug: "fundaadli",
    title: "Funda Adli Rapor",
    src: "/pdf/fundaadli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },
  {
    slug: "ulviadli",
    title: "Ulvi Adli Rapor",
    src: "/pdf/ulviadli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },
  {
    slug: "kamiladli",
    title: "Kamil Adli Rapor",
    src: "/pdf/kamiladli.pdf",
    note: "Suç Kaydı Raporu",
    type: "pdf",
  },

{    slug: "USTMEL",
    title: "Ulvi Plevneli Otopsi Raporu",
    src: "/pdf/otopsiuzun.pdf",
    note: "Adli Tıp Raporu",
    type: "pdf",
  },

  {    slug: "AQPEZ",
    title: "Azize Güner 2. Sorgu",
    src: "/pdf/Azize2pdf.pdf",
    note: "A.G. 2. Sorgu Rapor",
    type: "pdf",
  },

  {    slug: "KSMER",
    title: "Kamil Şen 2. Sorgu",
    src: "/pdf/kamil2.pdf",
    note: "Kamil Sen İfadesi",
    type: "pdf",
  }

  // --- Görseller (JPEG/PNG/WebP vs.) ---


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
