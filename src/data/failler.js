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


  // Azize
  ["azize güner", "azize-guner"],
  ["azize guner", "azize-guner"],

  // Funda
  ["funda plevneli", "funda-plevneli"],

  // Bedirhan
  ["bedirhan mardinli", "bedirhan-mardinli"],

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
    bio: `Ablasının (Funda) yanında eline bir miktar para geçene kadar kalmak zorunda olan Aşçı kardeş. Ablasının otoriter kişiliğinin altında ezilmiş olsa da ona annesinden daha bağlıdır. Eniştesi (Ulvi), ona sürekli yanlarında sığıntı gibi yaşadığını hatırlatacak söylemler ve hareketlerde bulunduğundan, kendisinden haz etmez. Artık başka ev bulup, gitmesi gün aşırı konuşulur olmuştur ve Kamil artık kendini köşeye sıkışmış hissetmektedir. Kamil, öfke problemleri olan aile otoritesin ve huzurunu yaşayamamış birisidir. Ayrıca Kamil yeni hayatının ilk zamanlarını yaşıyordur. Zira adam yaralamadan 1 kez ıslah evinde yatmıştır, uyuşturucu madde kullanmak ve bulundurmaktan da sabıkası vardır.  İçeri girip çıkmış ve ona ablası kapılarını açmıştır. Bir tanıdığının restorantında mutfakta iş ayarlamıştır.  Şartlı tahliye ile çıkmıştır, onun için de zaten çalışması gerekmektedir.`,
    education: [
      "Lisans: Yok",
    ],
    projects: [
      { title: "Adli Sicil Kaydı", url: "/kamiladli.pdf" },
      { title: "Parmak İzi", url: "/kamilparmak.jpg" },
    ],
    news: [
      {
        id: "n1",
        title: "Çankaya'da Vahşet",
        date: "18 Nisan 2025",
        source: "Gerekli Haber",
        snippet:
          "Ankara Üniversitesi öğretim üyesi Ulvi Plevneli, evinde ölü bulundu. Polis olayla ilgili soruşturma başlattı.",
      },
      {
        id: "n2",
        title: "Yaşlı Taksiciye Gasp Girişimi",
        date: "10 Mayıs 2018",
        source: "Taraf",
        snippet:
          "Ankara Mamak'da, K.Ş. (17) uyuşturucu parası için O.D. (62)'nin taksisine binerek bıçak zoruyla tüm parasına el koydu. Uzun bir kovalamacanın ardından yakalanan K.Ş. kasten adam yaralama ve hırsızlık suçundan yarın hakim karşısına çıkıcak.",
      },
    ],
    
  },

  "azize-guner": {
    slug: "azize-guner",
    name: "Azize Güner",
    subtitle: "Geleneksel El Sanatları Öğrencisi",
    photo: "/azize.jpeg", // public/azize.jpeg
    tags: ["Bahadır & Ayten"],
    birth: { date: "27.02.2007", place: "Edirne" },
    death: null,
    bio: `Genç yaşında yasak bir ilişki sonucu hamile kalan Azize, durumu hocası Ulvi Pinebleni'ye anlattıktan sonra bir daha asla kendisine ulaşamaz. Bunu ailesi ve sevgilisi Bedirhan Mardinli öğrenirse kendisine zarar vereceklerini ve hayatının eskisi gibi olmayacağından endişelenerek stres bozukluğu yaşamaktadır. Bir gece intihar etmeye çalışır fakat gözünü açtığında hastanededir.`,
    education: ["Lisans: Ankara Üniversitesi (Devam Ediyor)"],
    projects: [
      { title: "Adli Sicil Kaydı", url: "/azizeadli.pdf" },
      { title: "Parmak İzi", url: "/azizeparmak.jpg" },
    ],
    news: [
      {
        id: "n1",
        title: "Çankaya'da Vahşet",
        date: "18 Nisan 2025",
        source: "Gerekli Haber",
        snippet:
          "Ankara Üniversitesi öğretim üyesi Ulvi Plevneli, evinde ölü bulundu. Polis olayla ilgili soruşturma başlattı.",
      },
      {
        id: "n2",
        title: "Genç Kızın Akıl Almaz İntiharı",
        date: "10 Mayıs 2021",
        source: "SABAH",
        snippet:
          "A.G. (19), genç yaşta hamilelik şüphesiyle kendi canına kıymak istedi. Aşırı dozda antidepresan içen A.G. hastaneye yurt arkadaşları tarafından yetiştirilerek, son anda hayata döndürüldü.",
      },
    ],
  },

  "funda-plevneli": {
    slug: "funda-plevneli",
    name: "Funda Plevneli",
    subtitle: "Ev Hanımı",
    photo: "/funda.jpg", // public/funda.jpg
    tags: ["Metin & Fatma"],
    birth: { date: "03.08.1986", place: "Ankara" },
    death: null,
    bio: `Gençliğinde yerel güzellik yarışmasında birincilik almıştır. Hayatının erken yaşlarında modellik yaparak para kazanan Funda, eşi Ulvi ile tanıştıktan sonra bir daha çalışmasına izin verilmemiş bir ev hanımıdır. Sağlık durumu nedeniyle çocuk sahibi olamadığını evliliğinin 5. yılında öğrenen çiftin evliliği, uçuruma doğru sürüklenmektedir. Funda, kendinde kusur görmeyecek kadar egoist bir kişiliğe sahip. Hatta hamile kalmama sebebini kocasının beceriksizliğine bağlasa da evliliğine bağlı kalmıştır.`,
    education: ["Lisans: YOK"],
    projects: [
      { title: "Adli Sicil Kaydı", url: "/fundaadli.pdf" },
      { title: "Parmak İzi", url: "/fundaparmak.jpg" },
    ],
    news: [
      {
        id: "n1",
        title: "Çankaya'da Vahşet",
        date: "18 Nisan 2025",
        source: "Gerekli Haber",
        snippet:
          "Ankara Üniversitesi öğretim üyesi Ulvi Plevneli, evinde ölü bulundu. Polis olayla ilgili soruşturma başlattı.",
      },
      {
        id: "n2",
        title: "Mamak Turşu Güzeli Yarışması",
        date: "01 Haziran 2004",
        source: "Ankara'nın Sesi",
        snippet:
          "Mamakta dördüncüsü düzenlenen Turşu Güzeli yarışmasının bu seneki kazanını Funda Şen, dünya barışı dilediğini söyledi.",
      },
    ],
  },

  "bedirhan-mardinli": {
    slug: "bedirhan-mardinli",
    name: "Bedirhan Mardinli",
    subtitle: "Makine Bölümü Öğrencisi",
    photo: "/bedirhan.jpg", // public/bedirhan.jpg
    tags: ["Ahmet & Leman"],
    birth: { date: "19.08.2006", place: "İzmir" },
    death: null,
    bio: `Bedirhan, 2006 yılında İzmir Bornova'da, 5 çocuklu bir ailenin ortanca çocuğu olarak dünyaya geldi. En küçük kardeşini okutmak için hem okuyup hem çalışan Bedirhan, 2020 yılında Ankara'da üniversite okuma fırsatını yakaladı. Bedirhan, hem okuyup aynı zamanda şantiyelerde çalışarak, ailesine para göndermektedir.`,
    education: ["Lisans: Ankara Üniversitesi (Devam Ediyor.)"],
    projects: [
      { title: "Adli Sicil Kaydı", url: "/bediradli.pdf" },
      { title: "Parmak İzi", url: "/bedriparmak.jpg" },
    ],
    news: [
      {
        id: "n1",
        title: "Çankaya'da Vahşet",
        date: "18 Nisan 2025",
        source: "Gerekli Haber",
        snippet:
          "Ankara Üniversitesi öğretim üyesi Ulvi Plevneli, evinde ölü bulundu. Polis olayla ilgili soruşturma başlattı.",
      },
    ],
  },
    "ulvi-plevneli": {
    slug: "ulvi-plevneli",
    name: "Ulvi Plevneli",
    subtitle: "Teknik Resim Öğretim Görevlisi",
    photo: "/ulvi.jpg", // public/bedirhan.jpg
    tags: ["Şenol & Fadime"],
    birth: { date: "09.01.1986", place: "Eskişehir" },
    death: { date: "11.04.2025", place: "Ankara"},
    bio: `EKLENECEK`,
    education: ["Lisans: Ankara Üniversitesi",
      "Yüksek Lisans: Anadolu Üniversitesi",
      "Doktora: Anadolu Üniversitesi"
    ],
    projects: [
  { title: "Adli Sicil Kaydı", url: "/ulviadli.pdf" },
  { title: "Parmak İzi", url: "/ulviparmak.jpg" },
  { title: "2. Telefon", url: "#/gate" } // ✅ /s/gate değil
    ],

    news: [
        {
        id: "n1",
        title: "Çankaya'da Vahşet",
        date: "18 Nisan 2025",
        source: "Gerekli Haber",
        snippet:
          "Ankara Üniversitesi öğretim üyesi Ulvi Plevneli, evinde ölü bulundu. Polis olayla ilgili soruşturma başlattı.",
        },
        {id: "n2",
        title: "Uluslararası Uzay Mekiği Maket Yarışması",
        date: "19 Mayıs 2017",
        source: "Yeni Şafak",
        snippet:
          "Ülkemizi, Uluslararası Uzay Mekiği Maket Yarışmasında temsil eden Anadolu Üniversitesi öğrencileri ülkemize 2 bronz ve 1 adet gümüş madalya getirerek, gururlandırdı.",
      },
    ],
  },
};
