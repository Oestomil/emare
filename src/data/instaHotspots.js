// Her kişi için: arkaplan görseli + (yüzde cinsinden) hotspot kutuları.
// x,y: sol-üst köşe; w,h: genişlik/yükseklik. Hepsi % (0-100).
// img: tıklanınca gösterilecek büyük görsel (jpg/png).

const sharedBoxes = [
  // 1. satır grid (sol -> sağ)
  { id: 1, x: 0.1,  y: 55.7, w: 33.5, h: 22.8 },
  { id: 2, x: 33.4, y: 55.7, w: 33.5, h: 22.8 },
  { id: 3, x: 66.7, y: 55.7, w: 33.5, h: 22.8 },
  // 2. satır grid
  { id: 4, x: 0.1,  y: 78.2, w: 33.5, h: 22.8 },
  { id: 5, x: 33.4, y: 78.2, w: 33.5, h: 22.8 },
  { id: 6, x: 66.7, y: 78.2, w: 33.5, h: 22.8},
];

const instaHotspots = {
  kamil: {
    bg: "/images/kamil_profile.jpg",          // büyük profil ekran görüntüsü
    boxes: sharedBoxes.map((b) => ({
      ...b,
      img: `/images/kamil${b.id}.jpg`,     // kamil1.jpg ... kamil6.jpg
      caption: `Kamil • Fotoğraf ${b.id}`,
    })),
  },

  azize: {
    bg: "/images/azize_profile.jpg",
    boxes: sharedBoxes.map((b) => ({
      ...b,
      img: `/images/azize${b.id}.png`,
      caption: `Azize • Fotoğraf ${b.id}`,
    })),
  },

  bedirhan: {
    bg: "/images/bedirhan_profile.jpg",
    boxes: sharedBoxes.map((b) => ({
      ...b,
      img: `/images/bedirhan${b.id}.png`,
      caption: `Bedirhan • Fotoğraf ${b.id}`,
    })),
  },

  funda: {
    bg: "/images/funda_profile.jpg",
    boxes: sharedBoxes.map((b) => ({
      ...b,
      img: `/images/funda${b.id}.png`,
      caption: `Funda • Fotoğraf ${b.id}`,
    })),
  },
};

export default instaHotspots;
