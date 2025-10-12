// Her kişi için: arkaplan görseli + (yüzde cinsinden) hotspot kutuları.
// x,y: sol-üst köşe; w,h: genişlik/yükseklik. Hepsi % (0-100).
// img: tıklanınca gösterilecek büyük görsel (jpg/png).

const sharedBoxes = [
  // 1. satır grid (sol -> sağ)
  { id: 1, x: 0.1,  y: 55.7, w: 33.5, h: 22.8 },
  { id: 2, x: 33.4, y: 55.7, w: 33.5, h: 22.8 },
  { id: 3, x: 66.7, y: 55.7, w: 33.5, h: 22.8 },
  {id: 7, x: 0.1, y:0.1, w:10, h:5, kind: "link"},
  // 2. satır grid
  { id: 4, x: 0.1,  y: 78.2, w: 33.5, h: 22.8 },
  { id: 5, x: 33.4, y: 78.2, w: 33.5, h: 22.8 },
  { id: 6, x: 66.7, y: 78.2, w: 33.5, h: 22.8},
];

const instaHotspots = {
  kamilsenn: {
    bg: "/images/kamil_profile.jpg",          // büyük profil ekran görüntüsü
    boxes: sharedBoxes.map((b) => ({
      ...b,
      img: `/images/kamil${b.id}.jpg`,     // kamil1.jpg ... kamil6.jpg
      caption: `Kamil • Fotoğraf ${b.id}`,
    })),
  },

  "azize.g": {
    bg: "/images/azize_profile.png",
    boxes: sharedBoxes.map((b) => ({
      ...b,
      img: `/images/azize${b.id}.png`,
      caption: `Azize • Fotoğraf ${b.id}`,
    })),
  },

  bedirhan_35: {
    bg: "/images/bedirhan_profile.png",
    boxes: sharedBoxes.map((b) => ({
      ...b,
      img: `/images/bedirhan${b.id}.png`,
      caption: `Bedirhan • Fotoğraf ${b.id}`,
    })),
  },


};

export default instaHotspots;
