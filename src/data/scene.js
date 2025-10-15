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

    
 },
 "fridge": {
    title: "Buzdolabı",
    base: "/evidence/photo1/fridge.png", // public içine koy
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

        },
      },
        {
        id: "detail2",  
        label: "Detay 2",
        rect: { x: 35, y: 25, w: 5, h: 5 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/evidence/photo1/detail2.png", // arkaplansız PNG
            alt: "Detay 2",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı

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

        },
      },
    ],
    },
    "masa": {
    title: "Masa",
    base: "/evidence/photo3/masa.png", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)

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
              caption: "Bunların kimin olduğunu bulmak lazım.",
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
              caption: "Bunların kimin olduğunu bulmak lazım.",
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
              caption: "Bunların kimin olduğunu bulmak lazım.",
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
              caption: "Bunların kimin olduğunu bulmak lazım.",

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
              caption: "Bunların kimin olduğunu bulmak lazım.",
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
        },
        "pc": {
    title: "Ofis Bilgisayarı",
    base: "/evidence/office.jpeg", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
        {
        id: "detail1",
        label: "Bardak",
        rect: { x: 70, y: 65, w: 10, h: 12 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/evidence/photo5/hediye.png", // arkaplansız PNG
            alt: "Bardak",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
        }, },
        {
        id: "detail2",
        label: "Atatürk Resmi",
        rect: { x: 15, y: 10, w: 20, h: 30 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/evidence/photo5/ataturk.png", // arkaplansız PNG
            alt: "Atatürk resmi",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Başbuğ o7",  
        }
        }
        ],
    },
    "BM202EV15D2": {
    title: "Son Sahne",
    base: "/son.jpeg", // public içine koy
    maxWidth: 1280,               // sahnenin genişlik sınırı (px)
    hotspots: [
        {
        id: "detail1",
        label: "Detay 1",
        rect: { x: 35, y: 15, w: 5, h: 5 }, // yaklaşık — devtools ile ayarla
        overlay: {
            src: "/bedriparmak.jpg", // arkaplansız PNG
            alt: "Detay 1",
            maxVw: 70,     // overlay genişlik sınırı: min(70vw, maxPx)
            maxPx: 900,    // masaüstü sınırı
            caption: "Bunların kimin olduğunu bulmak lazım.",
        },
      },
    ],
    },
  };


// Yardımcı: sahneyi slug ile getir
export function getScene(slug) {
  return SCENES[slug] || null;
}
