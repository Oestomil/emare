// src/pages/SceneHotspotsPage.jsx
import { useEffect, useRef, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScene } from "../data/scene";
import styles from "./SceneHotspotPage.module.css";

export default function SceneHotspotsPage() {
  // --- Router ---
  const { slug } = useParams();
  const navigate = useNavigate();

  // --- Hooks (HER ZAMAN EN ÜSTE KOY) ---
  const [active, setActive] = useState(null);   // aktif hotspot id
  const [ready, setReady]   = useState(false);  // base img yüklendi mi?
  const headerRef = useRef(null);
  const frameRef  = useRef(null);

  // --- Scene (hook'lardan sonra hesapla) ---
  const scene = getScene(slug);
  const hotspots = scene?.hotspots ?? [];

  // Aktif hotspot
  const activeHotspot = useMemo(
    () => hotspots.find(h => h.id === active) || null,
    [hotspots, active]
  );

  // Overlay açıkken scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (active) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [active]);

  // ESC ile kapat
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Header yüksekliğini ölç → frame'e CSS değişkeni yaz
  useEffect(() => {
    const setHeights = () => {
      const hh = headerRef.current?.getBoundingClientRect().height || 0;
      frameRef.current?.style.setProperty("--header-h", `${hh}px`);
    };
    setHeights();
    window.addEventListener("resize", setHeights);
    return () => window.removeEventListener("resize", setHeights);
  }, []);

  // --- Render ---
  return (
    <div className={styles.wrap}>
      <header ref={headerRef} className={styles.header}>
        <button className={styles.btn} onClick={() => navigate(-1)}>← Geri</button>
        <h1 className={styles.title}>{scene?.title ?? "Sahne"}</h1>
        <div className={styles.spacer} />
      </header>

      <main ref={frameRef} className={styles.frame}>
        {!scene ? (
          <div className={styles.miss}>
            <h1>Sahne bulunamadı</h1>
            <button className={styles.btn} onClick={() => navigate(-1)}>← Geri</button>
          </div>
        ) : (
          <div
            className={styles.imgBox}
            role="region"
            aria-label={`${scene.title} sahnesi`}
            onClick={() => { if (active) setActive(null); }}
          >
            {/* Taban görsel */}
            <img
              src={scene.base}
              alt={scene.title}
              className={`${styles.base} ${active ? styles.baseBlur : ""}`}
              onLoad={() => setReady(true)}
              decoding="async"
              loading="eager"
              draggable="false"
            />

            {/* Hotspotlar (yalnızca görsel yüklenince) */}
            {ready && hotspots.map(h => {
              const r = h.rect || {};
              const x = r.x ?? 0, y = r.y ?? 0, w = r.w ?? 8, hh = r.h ?? 8;
              return (
                <button
                  key={h.id}
                  className={styles.hotspot}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    width: `${w}%`,
                    height: `${hh}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(prev => (prev === h.id ? null : h.id));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(prev => (prev === h.id ? null : h.id));
                    }
                  }}
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-expanded={active === h.id}
                  aria-label={h.label || "Detay"}
                  title={h.label || ""}
                >
                  <span className={styles.tapPad} />
                </button>
              );
            })}

            {/* Overlay */}
            {ready && activeHotspot && (
              <div
                className={styles.float}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
                style={{
                  ["--ovw"]: `${activeHotspot.overlay?.maxVw || 70}vw`,
                  ["--opx"]: `${activeHotspot.overlay?.maxPx || 900}px`,
                }}
              >
                <button
                  className={styles.close}
                  onClick={() => setActive(null)}
                  aria-label="Kapat"
                >
                  ×
                </button>

                <img
                  src={activeHotspot.overlay?.src}
                  alt={activeHotspot.overlay?.alt || ""}
                  className={styles.overlayImg}
                  draggable="false"
                />

                {activeHotspot.overlay?.caption && (
                  <div className={styles.caption} role="document">
                    {activeHotspot.overlay.caption}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
