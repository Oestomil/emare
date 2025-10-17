// src/data/instaHotspots.js
// Box şeması: { id, rect:{x,y,w,h}, kind:'overlay'|'link', overlay?:{src,alt,maxVw,maxPx,caption} }

const baseGrid = [
  // 1. satır (sol -> sağ)
  { id: 1, x: 0.1,  y: 55.7, w: 33.5, h: 22.8 },
  { id: 2, x: 33.4, y: 55.7, w: 33.5, h: 22.8 },
  { id: 3, x: 66.7, y: 55.7, w: 33.5, h: 22.8 },

  // Link hotspotu (sol üst küçük alan) — her profilde sabit kalsın
  { id: 7, x: 0.1,  y: 0.1,  w: 10,   h: 5, kind: "link" },

  // 2. satır
  { id: 4, x: 0.1,  y: 78.2, w: 33.5, h: 22.8 },
  { id: 5, x: 33.4, y: 78.2, w: 33.5, h: 22.8 },
  { id: 6, x: 66.7, y: 78.2, w: 33.5, h: 22.8 },
];

/**
 * Kişiye özel kutuları üretir:
 * - presentIds: Sadece bu id'lerde overlay oluşturulur (fotoğrafı olmayanlar tamamen atılır).
 * - overrides:  { [id]: {x,y,w,h} } kişi özelinde konumlandırma
 * - ext/prefix: dosya adı deseni (/images/prefix{id}.{ext})
 */
function makeBoxesForPerson({ displayName, prefix, ext, presentIds = [], overrides = {} }) {
  const boxes = [];

  for (const b of baseGrid) {
    // Link kutusu her zaman eklensin (kişiye özel değil)
    if (b.kind === "link") {
      boxes.push({
        id: b.id,
        rect: { x: b.x, y: b.y, w: b.w, h: b.h },
        kind: "link",
        label: "Geri / /i",
      });
      continue;
    }

    // Fotoğrafı olmayan kutuları tamamen SKIP et → tıklanamaz
    if (!presentIds.includes(b.id)) continue;

    // Kişiye özel rect varsa onu kullan
    const r = overrides[b.id] || { x: b.x, y: b.y, w: b.w, h: b.h };

    boxes.push({
      id: b.id,
      rect: r,
      kind: "overlay",
      overlay: {
        src: `/images/${prefix}${b.id}.${ext}`,
        alt: `${displayName} • Fotoğraf ${b.id}`,
        caption: `${displayName} • Fotoğraf ${b.id}`,
        maxVw: 70,
        maxPx: 900,
      },
    });
  }

  return boxes;
}

// ⚠️ presentIds: elinde gerçekten olan görselleri yaz
//    örn. sadece 1,2,5 yüklüyse => presentIds: [1,2,5]
//    overrides opsiyonel: milimetrik hizalamayı kişi bazında yaparsın

const instaHotspots = {
  kamilsenn: {
    title: "Kamil’in akışı",
    bg: "/images/kamil_profile.jpg",
    boxes: makeBoxesForPerson({
      displayName: "Kamil",
      prefix: "kamil",
      ext: "jpg",
      presentIds: [1, 2, 3, 6], // 👈 elinde olanlar (örnek)
    }),
  },

  "azize.g": {
    title: "Azize’nin akışı",
    bg: "/images/azize_profile.png",
    boxes: makeBoxesForPerson({
      displayName: "Azize",
      prefix: "azize",
      ext: "png",
      presentIds: [1, 2, 5], // 👈 sadece bunlar aktif (örnek)

    }),
  },

  bedirhan_35: {
    title: "Bedirhan’ın akışı",
    bg: "/images/bedirhan_profile.png",
    boxes: makeBoxesForPerson({
      displayName: "Bedirhan",
      prefix: "bedirhan",
      ext: "png",
      presentIds: [1, 2, 3], // 👈 elinde olanlar (örnek)
      // overrides: {} // gerekli değilse boş bırak
    }),
  },
};

export default instaHotspots;
