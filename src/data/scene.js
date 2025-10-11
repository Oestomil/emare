// src/data/scene.js
// Bir sahnede birden fazla hotspot olabilir.
// Her hotspot tıklanınca "overlay" (örn: bilet PNG) ortada görünür,
// arka plan blur'lanır.

export const SCENES = {
  "ofis-cop": {
    title: "Ofis Çöp Kutusu",
    base: "/de/ornek1.jpeg", // örnek-1 jpeg (public içine koy)
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)

    hotspots: [
      {
        id: "ticket",
        label: "Tatil Bileti",
        // Yüzde cinsinden tıklanabilir dikdörtgen (base görsele göre)
        rect: { x: 36, y: 40, w: 15, h: 15 }, // ⚠️ yaklaşık — devtools ile kolayca ayarla
        overlay: {
          src: "/de/bilet.png", // arkaplansız PNG
          alt: "Gezinti.com Tatil Bileti",
          maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
          maxPx: 900,    // masaüstü sınırı
          caption: "İki kişilik tatil bileti, Parmak izi için 'lab-1' kodunu girin.",
        },
      },
      {
        id: "paper",
        label: "Buruşuk Kağıt",
        rect: { x: 68, y: 73, w: 16, h: 16 }, // ⚠️ yaklaşık — ayarlayabilirsin
        overlay: {
          src: "/de/kgt.png",      // elindeki PNG (yoksa geçici bir görsel koy)
          alt: "Buruşuk kağıt",
          maxVw: 55,
          maxPx: 700,
          caption: "Üzerinde el yazısı notlar var. Parmak izi için 'lab-1' kodunu girin.",
        },
      },
    ],
  },
  "antre": {
    title: "Antre",
    base: "/evidence/photo4/antre.jpeg", // örnek-2 jpeg (public içine koy)
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
        {
        id: "detail1",
        label: "Detay 1",
        rect: { x: 40, y: 45, w: 5, h: 5 },}// yaklaşık — devtools ile ayarla
    ],
    
 },
 "fridge": {
    title: "Buzdolabı",
    base: "/evidence/photo1/fridge.jpeg", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
      {
        id: "detail1",  
        label: "Detay 1",
        rect: { x: 35, y: 15, w: 5, h: 5 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/evidence/photo1/detail1.png", // arkaplansız PNG
            alt: "Detay 1",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Detay 1 açıklaması",
        },
      },
        {
        id: "detail2",  
        label: "Detay 2",
        rect: { x: 35, y: 25, w: 5, h: 5 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/evidence/photo1/detail2.jpeg", // arkaplansız PNG
            alt: "Detay 2",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Detay 2 açıklaması",
        },
      },
    ],
  },
  "kulluk": {
    title: "Küllük",
    base: "/evidence/photo2/kulluk.png", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
      {
        id: "detail1",
        label: "Detay 1",
        rect: { x: 40, y: 45, w: 5, h: 5 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/evidence/photo2/detay1.png", // arkaplansız PNG
            alt: "Detay 1",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Detay 1 açıklaması",
        },
      },
      {
        id: "detail2",
        label: "Detay 2",
        rect: { x: 55, y: 55, w: 5, h: 5 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/evidence/photo2/detay2.png", // arkaplansız PNG
            alt: "Detay 2",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Detay 2 açıklaması",
        },
      },
    ],
    },
    "masa": {
    title: "Masa",
    base: "/evidence/photo3/Masa.jpeg", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
        {
        id: "detail1",
        label: "Detay 1",
        rect: { x: 30, y: 40, w: 10, h: 10 }, // yaklaşık — devtools ile ayarla
        overlay: { 
            src: "/evidence/photo3/detail1.png", // arkaplansız PNG
            alt: "Detay 1",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Detay 1 açıklaması",
        },
      },
    ],
    },
    "pc": {
    title: "Ofis Görünüm 2",
    main: "/evidence/office.jpeg", // 1280x720 fotoğraf
    hotspots: [
        { id: "b", x: 75, y: 70, img: "/evidence/photo5/hediye.jpg", label: "Detay 1" },
        { id: "c", x: 25, y: 20, img: "/evidence/photo5/ataturk.png", label: "Detay 2" },
    ],
    },
    "bilet": {
    title: "bilet",
    base: "/de/bilet.png", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
        {
        id: "detail1",
        label: "Funda Parmak İzi",
        rect: { x: 15, y: 50, w: 10, h: 10 }, // yaklaşık — devtools ile ayarla
          overlay: { 
              src: "/fundaparmak.jpg", // arkaplansız PNG
              alt: "Funda Parmak İzi",
              maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
              maxPx: 900,    // masaüstü sınırı
              caption: "Funda'nın Parmak İzi",
          }
        },
        {
        id: "detail2",
        label: "Azize Parmak İzi",
        rect: { x: 30, y: 65, w: 10, h: 10 }, // yaklaşık — devtools ile ayarla
        overlay: { 
            src: "/azizeparmak.jpg", // arkaplansız PNG
            alt: "Azize Parmak İzi",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Azize'nin Parmak İzi",
        },
      },
        {
        id: "detail3",
        label: "Ulvi Parmak İzi",
        rect: { x: 70, y: 35, w: 10, h: 10 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/ulviparmak.jpg", // arkaplansız PNG
            alt: "Ulvi Parmak İzi",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Ulvi'nin Parmak İzi",
        },},
        {
           id: "detail4",
        label: "Tatil Turu Personel Parmak İzi",
        rect: { x: 70, y: 50, w: 10, h: 10 }, // yaklaşık — devtools ile ayarla 
        overlay: { 
            src: "/tur.svg", // arkaplansız PNG
            alt: "Tatil Turu Personel Parmak İzi",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Tatil Turu Personel Parmak İzi",

      },
    },

      ],
    },
    "knf33": {
    title: "Bicak",
    base: "/de/bicak.jpeg", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
        { 
        id: "detail1",
        label: "Kamil Şen Parmak İzi",
        rect: { x: 45, y: 80, w: 10, h: 10 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/kamilparmak.jpg", // arkaplansız PNG
            alt: "Kamil Şen Parmak İzi",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Kamil Şen'in Parmak İzi",
        }
        },

    ]},
    "siir": {
    title: "Şiir",
    base: "/de/kgt.png", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
        {
        id: "detail1",
        label: "Funda Parmak İzi",
        rect: { x: 15, y: 15, w: 10, h: 20 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/fundaparmak.jpg", // arkaplansız PNG
            alt: "Funda Parmak İzi",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Funda'nın Parmak İzi",
        }
        },
        {
        id: "detail2",
        label: "Ulvi Parmak İzi",
        rect: { x: 10, y: 65, w: 10, h: 20 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/ulviparmak.jpg", // arkaplansız PNG
            alt: "Ulvi Parmak İzi",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Ulvi'nin Parmak İzi",
        },
      },
    ],
        }
  };


// Yardımcı: sahneyi slug ile getir
export function getScene(slug) {
  return SCENES[slug] || null;
}
