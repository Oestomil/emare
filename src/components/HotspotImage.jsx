import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HotspotImage.css";

/**
 * props:
 *  - src: string (arka plan görseli)
 *  - boxes: Array<{ id:number|string, x:number, y:number, w:number, h:number, img?:string, caption?:string, kind?:'link'|'default' }>
 *  - onBoxClick?: (box) => void   // opsiyonel: link tipine özel davranış
 */
export default function HotspotImage({ src, boxes = [], onBoxClick }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  // Masaüstü tespiti: fare + geniş ekran
  const isDesktop = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return true;
    return window.matchMedia("(pointer:fine) and (min-width: 769px)").matches;
  }, []);

  // ESC kapatma
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleHotspotClick = (box) => {
    // Geri/Link
    if (box?.id === 7 || box?.kind === "link") {
      if (typeof onBoxClick === "function") return onBoxClick(box);
      navigate("/i");
      return;
    }
    setActive(box);
  };

  return (
    <div className="hs-wrap">
      <img src={src} alt="hotspot background" className="hs-bg" draggable={false} />

      {boxes.map((b) => (
        <button
          key={b.id}
          className={`hs-dot ${b.id === 7 || b.kind === "link" ? "is-link" : ""}`}
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
          }}
          onClick={() => handleHotspotClick(b)}
          aria-label={b.id === 7 || b.kind === "link" ? "Geri" : `Bölge ${b.id}`}
        />
      ))}

      {active && (
        <>
          <div className="hs-overlay" onClick={() => setActive(null)} aria-hidden="true" />
          <div
            className={`hs-tooltip ${isDesktop ? "center" : "sheet"}`}
            role="dialog"
            aria-modal="true"
          >
            <button className="hs-close" onClick={() => setActive(null)} aria-label="Kapat">
              ✕
            </button>

            {active.img && (
              <img
                className="hs-media"
                src={active.img}
                alt={active.caption || "Görsel"}
                draggable={false}
              />
            )}
            {active.caption && <div className="hs-cap">{active.caption}</div>}
          </div>
        </>
      )}
    </div>
  );
}
