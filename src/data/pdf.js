// data/pdf.js
// Sitede göstermek istediğin PDF'leri burada listeliyorsun.
// "slug" route için, "src" dosya yolu (public/pdfs altında), opsiyonel "title" ve "note".

export const PDFS = [
  {
    slug: "azizeadli",
    title: "Azize Adli Rapor",
    src: "/azizeadli.pdf",
    note: "Suç Kaydı Raporu",
  },
  {
    slug: "sunum-arge",
    title: "Ar-Ge Sunumu",
    src: "/pdfs/sunum-arge.pdf",
    note: "Toplantı sunumu, 24 sayfa.",
  },
  // yenilerini ekle:
  // { slug: "dosya-adi", title: "Görünen Ad", src: "/pdfs/dosya-adi.pdf", note: "opsiyonel" },
];

// Yardımcı: slug ile PDF bul
export function getPdfBySlug(slug) {
  if (!slug) return null;
  return PDFS.find(p => p.slug === slug) || null;
}
