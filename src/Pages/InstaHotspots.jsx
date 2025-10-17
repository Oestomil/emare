import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import instaHotspots from "../data/instaHotspots";
import "./Instahotspots.css"; // 👈 ayrı CSS

export default function InstaHotspots() {
  const { name } = useParams();
  const navigate = useNavigate();
  const entry = instaHotspots[name];

  // aktif overlay & img load
  const [active, setActive] = useState(null);   // hotspot id
  const [ready, setReady] = useState(false);    // base img loaded
  const imgRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!entry) {
    const igGradient = "linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)";
    return (
      <div className="ih-miss-wrap">
        <div className="ih-miss-card">
          <div className="ih-miss-head">
            <span aria-hidden className="ih-igdot" style={{ background: igGradient }} />
            <strong>Eksik veya hatalı giriş yaptınız</strong>
          </div>
          <p className="ih-miss-note">Lütfen tekrar deneyin veya Instagram yönlendirme sayfasına dönün.</p>
          <Link to="/i" className="ih-miss-link" style={{ background: igGradient }}>
            /i sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  // Veri sözleşmesi:
  // entry.bg: string (base image)
  // entry.boxes: [{ id, rect:{x,y,w,h}, kind?: 'overlay'|'link', overlay?: {src,alt,maxVw,maxPx,caption} }]
  const activeHotspot = useMemo(
    () => (entry?.boxes || []).find((b) => b.id === active) || null,
    [entry, active]
  );

  const handleBoxClick = (box) => {
    if (box.kind === "link") {
      navigate("/i"); // dahili Link navigasyonu (aynı sekme)
      return;
    }
    if (box.overlay?.src) {
      setActive((prev) => (prev === box.id ? null : box.id));
    }
  };

  return (
    <div className="ih-wrap">
      <div className="ih-header">
        <Link to="/search?case=30912025" className="ih-back">← Geri</Link>
        <h1 className="ih-title">Instagram</h1>
        <div className="ih-sp" />
      </div>

      <div className="ih-frame">
        <div
          className="ih-imgbox"
          onClick={() => { if (active) setActive(null); }}
        >
          {/* SADECE bu blur'lanır */}
          <img
            ref={imgRef}
            src={entry.bg}
            alt={entry.title || "Sahne"}
            className={`ih-base ${active ? "ih-baseBlur" : ""}`}
            onLoad={() => setReady(true)}
            draggable="false"
          />

          {/* Hotspotlar — img yüklenmeden çizme */}
          {ready && (entry.boxes || []).map((box) => (
            <button
              key={box.id}
              className="ih-hotspot"
              style={{
                left: `${box.rect.x}%`,
                top: `${box.rect.y}%`,
                width: `${box.rect.w}%`,
                height: `${box.rect.h}%`,
              }}
              onClick={(e) => { e.stopPropagation(); handleBoxClick(box); }}
              aria-label={box.label || "Detay"}
              title={box.label || ""}
            >
              <span className="ih-tappad" />
            </button>
          ))}

          {/* Önde PNG — PANELSİZ, ortada */}
          {ready && activeHotspot?.overlay?.src && (
            <div
              className="ih-float"
              onClick={(e) => e.stopPropagation()}
              style={{
                ["--ovw"]: `${activeHotspot.overlay.maxVw ?? 70}vw`,
                ["--opx"]: `${activeHotspot.overlay.maxPx ?? 900}px`,
              }}
            >
              <button
                className="ih-close"
                onClick={() => setActive(null)}
                aria-label="Kapat"
                title="Kapat"
              >
                ×
              </button>

              <img
                src={activeHotspot.overlay.src}
                alt={activeHotspot.overlay.alt || ""}
                className="ih-overlay"
              />

              {activeHotspot.overlay.caption && (
                <div className="ih-cap">{activeHotspot.overlay.caption}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
