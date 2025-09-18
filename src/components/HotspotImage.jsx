import { useEffect, useRef, useState } from "react";
import "./HotspotImage.css";

/**
 * props:
 *  - src: arkaplan (profil ekran görüntüsü)
 *  - boxes: [{id, x,y,w,h, img, caption}]
 */
export default function HotspotImage({ src, boxes = [] }) {
  const wrapRef = useRef(null);
  const tipRef = useRef(null);

  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [dir, setDir] = useState("down");

  // ESC ile kapat
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Viewport değişikliklerinde tooltip pozisyonunu güncelle
  useEffect(() => {
    if (!active) return;
    
    const updatePosition = () => {
      calculatePosition(active);
    };
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [active]);

  const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

  const calculatePosition = (box) => {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (!wrap) return;
    
    const wrapRect = wrap.getBoundingClientRect();
    
    // Anchor noktası (kutunun ortası)
    const anchorX = wrapRect.left + (box.x + box.w / 2) * 0.01 * wrapRect.width;
    const anchorY = wrapRect.top + box.y * 0.01 * wrapRect.height;
    
    const margin = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Tooltip boyutları (tahmin veya gerçek)
    const tipWidth = tip ? tip.offsetWidth : 320;
    const tipHeight = tip ? tip.offsetHeight : 400;
    
    // Yatay pozisyon hesaplaması
    let left = anchorX;
    
    // Sol kenarda mı?
    if (left - tipWidth / 2 < margin) {
      left = margin + tipWidth / 2;
    }
    // Sağ kenarda mı?
    else if (left + tipWidth / 2 > viewportWidth - margin) {
      left = viewportWidth - margin - tipWidth / 2;
    }
    
    // Dikey pozisyon ve yön hesaplaması
    const spaceBelow = viewportHeight - anchorY;
    const spaceAbove = anchorY;
    
    let newDir = "down";
    let top = anchorY;
    
    // Aşağıda yeterli yer var mı?
    if (spaceBelow >= tipHeight + margin) {
      newDir = "down";
      top = anchorY;
    }
    // Yukarıda yeterli yer var mı?
    else if (spaceAbove >= tipHeight + margin) {
      newDir = "up";
      top = anchorY;
    }
    // Her iki tarafta da yeterli yer yok - daha fazla yer olan tarafa aç
    else {
      if (spaceBelow > spaceAbove) {
        newDir = "down";
        top = anchorY;
      } else {
        newDir = "up";  
        top = anchorY;
      }
    }
    
    setDir(newDir);
    setPos({ left, top });
  };

  const openBox = (box) => {
    setActive(box);
    
    // İlk hesaplama (tooltip henüz render olmadığı için tahminî boyutlarla)
    calculatePosition(box);
    
    // Tooltip render olduktan sonra gerçek boyutlarla tekrar hesapla
    setTimeout(() => {
      calculatePosition(box);
    }, 0);
  };

  const closeTooltip = () => {
    setActive(null);
  };

  return (
    <div className="hs-wrap" ref={wrapRef}>
      <img src={src} alt="profile" className="hs-bg" draggable={false} />

      {/* Hotspot düğmeleri */}
      {boxes.map((b) => (
        <button
          key={b.id}
          className="hs-dot"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
          }}
          aria-label={`Fotoğraf ${b.id}`}
          onClick={() => openBox(b)}
        />
      ))}

      {/* Tooltip / Panel */}
      {active && (
        <>
          <div className="hs-overlay" onClick={closeTooltip} />
          <div
            ref={tipRef}
            className={`hs-tooltip ${dir}`}
            style={{ left: pos.left, top: pos.top }}
            role="dialog"
            aria-modal="true"
          >
            <button className="hs-close" onClick={closeTooltip} aria-label="Kapat">
              ✕
            </button>
            <img src={active.img} alt={active.caption} loading="lazy" />
            <div className="hs-cap">{active.caption}</div>
          </div>
        </>
      )}
    </div>
  );
}