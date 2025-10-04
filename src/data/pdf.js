// data/pdf.js

// PDF listesi
export const PDFS = [
  {
    slug: "azizeadli",
    title: "Azize Adli Rapor",
    src: "/azizeadli.pdf",
    note: "Suç Kaydı Raporu",
  },
  {
    slug: "bedirhanadli",
    title: "Bedirhan Adli Rapor",
    src: "/bedirhanadli.pdf",
    note: "Suç Kaydı Raporu",
  },
  {
    slug: "fundaadli",
    title: "Funda Adli Rapor",
    src: "/fundaadli.pdf",
    note: "Suç Kaydı Raporu",
  },
  {
    slug: "ulviadli",
    title: "Ulvi Adli Rapor",
    src: "/ulviadli.pdf",
    note: "Suç Kaydı Raporu",
  },
  {
    slug: "kamiladli",
    title: "Kamil Adli Rapor",
    src: "/kamiladli.pdf",
    note: "Suç Kaydı Raporu",
  },
  // ... diğer PDF'ler buraya eklenebilir
];

// Yardımcı: slug ile PDF bul
export function getPdfBySlug(slug) {
  if (!slug) return null;
  return PDFS.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
}

// Yardımcı: arama girdisinden PDF slug çözümle
export function resolvePdfSlug(query) {
  if (!query) return null;
  const q = query.toLowerCase();

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
