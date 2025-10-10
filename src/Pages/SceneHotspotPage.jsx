import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScene } from "../data/scene";
import styles from "./SceneHotspotPage.module.css";

export default function SceneHotspotsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const scene = getScene(slug);

  const [active, setActive] = useState(null);   // aktif hotspot id
  const [ready, setReady] = useState(false);    // img yüklendi mi?
  const imgRef = useRef(null);

  const activeHotspot = useMemo(
    () => scene?.hotspots.find(h => h.id === active) || null,
    [scene, active]
  );

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey, { passive: true });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!scene) {
    return (
      <div className={styles.miss}>
        <h1>Sahne bulunamadı</h1>
        <button className={styles.btn} onClick={() => navigate(-1)}>← Geri</button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <button className={styles.btn} onClick={() => navigate(-1)}>← Geri</button>
        <h1 className={styles.title}>{scene.title}</h1>
        <div className={styles.spacer} />
      </div>

      {/* dış süsler frame’de, gerçek çalışma alanı imgBox */}
      <div className={styles.frame}>
        <div
          className={styles.imgBox}
          onClick={() => { if (active) setActive(null); }}
        >
          {/* SADECE arka görsel blur edilir */}
          <img
            ref={imgRef}
            src={scene.base}
            alt={scene.title}
            className={`${styles.base} ${active ? styles.baseBlur : ""}`}
            onLoad={() => setReady(true)}
            draggable="false"
          />

          {/* Hotspotlar — img yüklenmeden render ETME! */}
          {ready && scene.hotspots.map(h => (
            <button
              key={h.id}
              className={styles.hotspot}
              style={{
                left: `${h.rect.x}%`,
                top: `${h.rect.y}%`,
                width: `${h.rect.w}%`,
                height: `${h.rect.h}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActive(prev => (prev === h.id ? null : h.id));
              }}
              aria-label={h.label || "Detay"}
              title={h.label || ""}
            >
              <span className={styles.tapPad} />
            </button>
          ))}

          {/* ÖNDE PNG – panelsiz, float merkez */}
          {ready && activeHotspot && (
            <div
              className={styles.float}
              onClick={(e) => e.stopPropagation()}
              style={{
                ["--ovw"]: `${activeHotspot.overlay.maxVw || 70}vw`,
                ["--opx"]: `${activeHotspot.overlay.maxPx || 900}px`,
              }}
            >
              <button className={styles.close} onClick={() => setActive(null)} aria-label="Kapat">×</button>

              <img
                src={activeHotspot.overlay.src}
                alt={activeHotspot.overlay.alt || ""}
                className={styles.overlayImg}
              />

              {activeHotspot.overlay.caption ? (
                <div className={styles.caption}>{activeHotspot.overlay.caption}</div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
