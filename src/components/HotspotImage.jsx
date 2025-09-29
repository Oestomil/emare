import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";   // ⬅️ ekle
import "./HotspotImage.css";

export default function HotspotImage({ src, boxes = [] }) {
  const navigate = useNavigate();                 // ⬅️ ekle
  const wrapRef = useRef(null);
  const tipRef = useRef(null);
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [dir, setDir] = useState("down");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

  const openBox = (box) => {
    // 🔗 GERİ HOTSPOT: tooltip açma, doğrudan /i'ye git
    if (box?.id === 7 || box?.kind === "link") {
      navigate("/i");                 // HashRouter ise #/i olur
      // alternatif: window.location.hash = "/i/";
      return;
    }

    // normal tooltip akışı
    setActive(box);
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const anchorX = r.left + (box.x + box.w / 2) * 0.01 * r.width;
    const anchorY = r.top + box.y * 0.01 * r.height;
    const margin = 12;
    const left = clamp(anchorX, margin, window.innerWidth - margin);
    const spaceBelow = window.innerHeight - anchorY;
    const fallbackTipH = 320;
    const shouldOpenUp = spaceBelow < fallbackTipH || box.y > 80;

    setDir(shouldOpenUp ? "up" : "down");
    setPos({ left, top: anchorY });

    setTimeout(() => {
      const tip = tipRef.current;
      if (!tip) return;
      const rect = tip.getBoundingClientRect();
      const realBelow = window.innerHeight - anchorY;
      setDir(realBelow < rect.height + 16 ? "up" : "down");
    }, 0);
  };

  return (
    <div className="hs-wrap" ref={wrapRef}>
      <img src={src} alt="profile" className="hs-bg" draggable={false} />

      {boxes.map((b) => (
        <button
          key={b.id}
          className={`hs-dot ${b.id === 7 || b.kind === "link" ? "is-link" : ""}`}
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
          aria-label={b.id === 7 || b.kind === "link" ? "Geri" : `Fotoğraf ${b.id}`}
          onClick={() => openBox(b)}
        />
      ))}

      {active && (
        <>
          <div className="hs-overlay" onClick={() => setActive(null)} />
          <div
            ref={tipRef}
            className={`hs-tooltip ${dir}`}
            style={{ "--hs-left": `${pos.left}px`, "--hs-top": `${pos.top}px` }}
            role="dialog"
            aria-modal="true"
          >
            <button className="hs-close" onClick={() => setActive(null)}>✕</button>
            <img src={active.img} alt={active.caption} />
            <div className="hs-cap">{active.caption}</div>
          </div>
        </>
      )}
    </div>
  );
}
