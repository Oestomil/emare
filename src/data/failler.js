// src/data/failler.js

// -----------------------------------------------------------
// 1) Türkçe uyumlu normalize (ı/İ/ş/ç/ö/ü/ğ vs. katlama)
//    - Harfleri küçük yapar
//    - Türkçe özel harfleri ASCII'ye katlar
//    - Aksan/diakritikleri temizler
//    - Noktalama dışını boşluk yapar, boşlukları sadeleştirir
// -----------------------------------------------------------
export function normalizeQuery(s) {
  let t = (s || "")
    .toLowerCase()
    // Türkçe harf katlama
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ç/g, "c")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    // yaygın apostrof/aksan işaretleri
    .replace(/['’`´^~¨]/g, " ");

  // Birleşik i̇ gibi formları da güvene almak için diakritiklerden arındır
  t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Harf/rakam dışını boşluk yap, boşlukları sadeleştir
  return t.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

// -----------------------------------------------------------
// 2) İzinli aramalar -> slug
//    ALLOW_ENTRIES okunaklı dursun diye ham metinle tutulur,
//    Map ise normalize edilerek oluşturulur (KRİTİK).
// -----------------------------------------------------------
const ALLOW_ENTRIES = [
  // Umut
  ["Kamil Şen", "kamil-sen"],
  ["Kamil Sen", "kamil-sen"],
  ["KS202505X48", "kamil-sen"],


  // Azize
  ["azize güner", "azize-guner"],
  ["azize guner", "azize-guner"],
  ["AG202505X46", "azize-guner"],

  // Funda
  ["funda plevneli", "funda-plevneli"],
  ["funda plevneli", "funda-plevneli"],
  ["FP202505X45", "funda-plevneli"],

  // Bedirhan
  ["bedirhan mardinli", "bedirhan-mardinli"],
  ["bedirhan mardinli", "bedirhan-mardinli"],
  ["BM202505X47", "bedirhan-mardinli"],

  ["Ulvi Plevneli", "ulvi-plevneli"]
];

const ALLOW = new Map(ALLOW_ENTRIES.map(([q, slug]) => [normalizeQuery(q), slug]));

export function resolveQuery(raw) {
  const k = normalizeQuery(raw);
  return ALLOW.get(k) || null;
}

// Kullanıcıya göstereceğimiz örnekler (normalize etmeye gerek yok)
export const KNOWN_EXAMPLES = [
  "Kamil Şen",
  "Azize Güner",
  "Funda Plevneli",
  "Bedirhan Mardinli",
  "Ulvi Plevneli"
];

// -----------------------------------------------------------
/* 3) Görseller
   - public klasörüne (kök) koyduğun dosyaları doğrudan "/dosya.ext" ile çağır.
   - Örn: public/umut.jpeg  =>  photo: "/umut.jpeg"
*/
// -----------------------------------------------------------

// İstersen yedek avatar (koyu tema uyumlu) — kullanmak için photo: AVATAR yap
const AVATAR = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 260'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='%2369b6ff'/>
      <stop offset='100%' stop-color='%23ff5e6e'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' rx='18' fill='%2311162f'/>
  <circle cx='100' cy='90' r='46' fill='url(%23g)' opacity='0.25'/>
  <circle cx='100' cy='90' r='40' fill='%23d7e6ff'/>
  <rect x='40' y='150' width='120' height='70' rx='14' fill='%23d7e6ff'/>
</svg>`;

// -----------------------------------------------------------
// 4) Profiller
//    - "projects" alanı hem string hem {title, url} nesnesi alabilir.
//      (Profile.jsx tarafında buna göre render edecek şekilde ayarladık.)
// -----------------------------------------------------------
export const PROFILES = {
  "kamil-sen": {
    slug: "kamil-sen",
    name: "Kamil Şen",
    subtitle: "Part-Time Aşçı",
    photo: "/kamil.jpg", // public/umut.jpeg
    tags: ["Metin & Fatma"],
    birth: { date: "30.09.2006", place: "Ankara" },
    death: null,
    education: [
      "Lisans: Yok",
    ],
    projects: [
      { title: "Adli Sicil Kaydı", url: "/pdf/kamiladli" },
      { title: "Parmak İzi", url: "/kamilparmak.jpg" },
      { title: "Sosyal Medya", url: "/i/" },
      { title: "Telefon Kayıtları", url: "/e/KRTTLR" }
    ],
    
    alliases: ["kamil şen", "kamil sen", "kamil-sen", "KS202505X48"],
    
  },

  "azize-guner": {
    slug: "azize-guner",
    name: "Azize Güner",
    subtitle: "Geleneksel El Sanatları Öğrencisi",
    photo: "/azize.jpeg", // public/azize.jpeg
    tags: ["Bahadır & Ayten"],
    birth: { date: "27.02.2007", place: "Edirne" },
    death: null,
    education: ["Lisans: Ankara Üniversitesi (Devam Ediyor)"],
    projects: [
      { title: "Adli Sicil Kaydı", url: "/pdf/azizeadli" },
      { title: "Parmak İzi", url: "/azizeparmak.jpg" }, 
       { title: "Sosyal Medya", url: "/i/" }
    ],
  
    alliases: ["azize güner", "azize guner", "azize-guner", "AG202505X46"]
  },

  "funda-plevneli": {
    slug: "funda-plevneli",
    name: "Funda Plevneli",
    subtitle: "Ev Hanımı",
    photo: "/funda.jpg", // public/funda.jpg
    tags: ["Metin & Fatma"],
    birth: { date: "03.08.1986", place: "Ankara" },
    death: null,
    education: ["Lisans: YOK"],
    projects: [
      { title: "Adli Sicil Kaydı", url: "/pdf/fundaadli" },
      { title: "Parmak İzi", url: "/fundaparmak.jpg" },
    ],
  
    alliases: ["funda plevneli", "funda plevneli", "funda-plevneli", "FP202505X45"]
  },

  "bedirhan-mardinli": {
    slug: "bedirhan-mardinli",
    name: "Bedirhan Mardinli",
    subtitle: "Makine Bölümü Öğrencisi",
    photo: "/bedirhan.jpg", // public/bedirhan.jpg
    tags: ["Ahmet & Leman"],
    birth: { date: "19.08.2006", place: "İzmir" },
    death: null,
    education: ["Lisans: Ankara Üniversitesi (Devam Ediyor.)"],
    projects: [
      { title: "Adli Sicil Kaydı", url: "/pdf/bediradli" },
      { title: "Parmak İzi", url: "/bedriparmak.jpg" },
      { title: "Sosyal Medya", url: "/i/" },
    ],
   
    alliases: ["bedirhan mardinli", "bedirhan mardinli", "bedirhan-mardinli", "BM202505X47"]
  },
    "ulvi-plevneli": {
    slug: "ulvi-plevneli",
    name: "Ulvi Plevneli",
    subtitle: "Teknik Resim Öğretim Görevlisi",
    photo: "/ulvi.jpg", // public/bedirhan.jpg
    tags: ["Şenol & Fadime"],
    birth: { date: "09.01.1986", place: "Eskişehir" },
    death: { date: "25.05.2025", place: "Ankara"},
    
    education: ["Lisans: Ankara Üniversitesi",
      "Yüksek Lisans: Anadolu Üniversitesi",
      "Doktora: Anadolu Üniversitesi"
    ],
    projects: [
  { title: "Adli Sicil Kaydı", url: "/pdf/ulviadli" },
  { title: "Parmak İzi", url: "/ulviparmak.jpg" },
  { title: "2. Telefon", url: "/gate" }, // ✅ /s/gate değil
  { title: "1. Telefon", url: "/birincitelefon" } // ✅ /s/evidence/DFGR2 değil
    ],
  },
};
