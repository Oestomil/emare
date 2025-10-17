// data/pdf.js

export const PDFS = [
  { slug: "azizeadli",   title: "Azize Adli Rapor",   src: "/pdf/azizeadli.pdf",   note: "Suç Kaydı Raporu", type: "pdf" },
  { slug: "bedirhanadli",title: "Bedirhan Adli Rapor",src: "/pdf/bedirhanadli.pdf",note: "Suç Kaydı Raporu", type: "pdf" },
  { slug: "fundaadli",   title: "Funda Adli Rapor",   src: "/pdf/fundaadli.pdf",   note: "Suç Kaydı Raporu", type: "pdf" },
  { slug: "ulviadli",    title: "Ulvi Adli Rapor",    src: "/pdf/ulviadli.pdf",    note: "Suç Kaydı Raporu", type: "pdf" },
  { slug: "kamiladli",   title: "Kamil Adli Rapor",   src: "/pdf/kamiladli.pdf",   note: "Suç Kaydı Raporu", type: "pdf" },
  { slug: "IUHAB",   title: "Kamil Adli Rapor",   src: "/pdf/kamiladli.pdf",   note: "Suç Kaydı Raporu", type: "pdf", allias: ["IUHAB", "iuhab"] },

  { slug: "USTMEL", title: "Ulvi Plevneli Otopsi Raporu", src: "/pdf/otopsiuzun.pdf", note: "Adli Tıp Raporu", type: "pdf" },
  { slug: "AGPEZ",  title: "Azize Güner 2. Sorgu",        src: "/pdf/Azize2pdf.pdf",  note: "A.G. 2. Sorgu",  type: "pdf" },
  { slug: "KSMER",  title: "Kamil Şen 2. Sorgu",          src: "/pdf/kamil2.pdf",     note: "K.Ş. İfade",     type: "pdf" },
  { slug: "FNDHC",  title: "Funda P. 2. Sorgu",           src: "/pdf/Funda2.pdf",     note: "F.P. İfade",     type: "pdf" },
  { slug: "bdhjja",  title: "Bedirhan M. İfade",           src: "/pdf/Bedirhan2.pdf",   note: "B.M. İfade",     type: "pdf" },
  { slug: "kamiltut", title: "Bedirhan Tutuklama Kararı", src: "/pdf/kamiltutuklama.pdf", note: "Bedirhan Tutuklama Kararı", type: "pdf" },
  { slug: "fundatut", title: "Bedirhan Tutuklama Kararı", src: "/pdf/fundatutuklama.pdf", note: "Bedirhan Tutuklama Kararı", type: "pdf" },
  { slug: "bedirhantut", title: "Bedirhan Tutuklama Kararı", src: "/pdf/bedirhantutuklama.pdf", note: "Bedirhan Mardinli Tutuklama Kararı", type: "pdf" },
];

// tekil pdf bulucu
export function getPdfBySlug(slug) {
  if (!slug) return null;
  return PDFS.find((p) => p.slug.toLowerCase() === String(slug).toLowerCase()) || null;
}

// 🔴 sadece tam slug eşleşmesi
export function resolvePdfSlug(query) {
  if (!query) return null;

  // "pdf/slug" veya "/pdf/slug" yazılırsa temizle
  let q = String(query).trim().replace(/^\/?pdf\//i, "");

  // yalnızca slug eşleşmesi (başlık/note taraması yok!)
  const item = PDFS.find((p) => p.slug.toLowerCase() === q.toLowerCase());
  return item ? item.slug : null;
}
