import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EvidenceViewer.module.css";

export default function EvidenceViewer({
  images = [],
  code,
  subtitle,
  footnote,
  cornerNumber,
}) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const touch = useRef({ x: 0 });
  const navigate = useNavigate();

  const total = images.length;

  // normalize: her şeyi {type, src} haline getir
  const normalize = (item) => {
    if (!item) return null;
    if (typeof item === "string") return { type: "image", src: item };
    return item; // {type:"video",src:"..."} gibi
  };

  const cur = normalize(images[idx]);
  const prev = normalize(images[(idx - 1 + total) % total]);
  const next = normalize(images[(idx + 1) % total]);

  const goNext = () => {
    if (!total) return;
    setLoaded(false);
    setIdx((idx + 1) % total);
  };
  const goPrev = () => {
    if (!total) return;
    setLoaded(false);
    setIdx((idx - 1 + total) % total);
  };

  // Klavye
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, total]);

  // Swipe (mobil)
  const onTouchStart = (e) => { touch.current.x = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 30) (dx < 0 ? goNext() : goPrev());
  };

  // Ön yükleme sadece image için
  useEffect(() => {
    [prev, next].forEach((item) => {
      if (item?.type === "image") {
        const img = new Image();
        img.src = item.src;
      }
    });
  }, [idx]);

  if (!total || !cur) return null;

  return (
    <div
      className={styles.scene}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Üst şerit */}
      <div className={styles.topbar}>
        <div className={styles.leftArea}>
          <button onClick={() => navigate(-1)} className={styles.homeLink}>
            ← Geri
          </button>
        </div>
        <div className={styles.rightTexts}>
          {code && (
            <div className={styles.code}>
              Delil Kodu: <strong>{code}</strong>
            </div>
          )}
          {subtitle && <div className={styles.sub}>{subtitle}</div>}
        </div>
      </div>

      {/* Blur arkaplan (sadece resim) */}
      {total > 1 && (
        <>
          {prev?.type === "image" && (
            <img
              src={prev.src}
              alt=""
              className={`${styles.bgImg} ${styles.bgLeft}`}
              draggable={false}
            />
          )}
          {next?.type === "image" && (
            <img
              src={next.src}
              alt=""
              className={`${styles.bgImg} ${styles.bgRight}`}
              draggable={false}
            />
          )}
        </>
      )}

      {/* Ana sahne */}
      <div className={styles.stage}>
        {total > 1 && (
          <>
            <button
              className={`${styles.hit} ${styles.left}`}
              onClick={goPrev}
              aria-label="Önceki"
            />
            <button
              className={`${styles.hit} ${styles.right}`}
              onClick={goNext}
              aria-label="Sonraki"
            />
          </>
        )}

        {cur.type === "image" && (
          <img
            key={cur.src}
            src={cur.src}
            alt={`evidence-${idx + 1}`}
            className={`${styles.mainImg} ${loaded ? styles.show : ""}`}
            onLoad={() => setLoaded(true)}
            draggable={false}
            onClick={goNext}
          />
        )}

        {cur.type === "video" && (
          <video
            key={cur.src}
            src={cur.src}
            className={`${styles.mainImg} ${loaded ? styles.show : ""}`}
            controls
            autoPlay
            playsInline
            onCanPlay={() => setLoaded(true)}
          />
        )}
      </div>

      {/* Alt bar */}
      <div className={styles.bottombar}>
        {footnote && <div className={styles.footnote}>{footnote}</div>}
        <div className={styles.pager}>{idx + 1} / {total}</div>
      </div>

      {cornerNumber && (
        <div className={styles.cornerNumber}>{cornerNumber}</div>
      )}
    </div>
  );
}
