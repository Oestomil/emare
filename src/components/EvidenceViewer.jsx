import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EvidenceViewer.module.css";

/**
 * Serbest (floating) Evidence Viewer
 * - Ortada aktif görsel
 * - Arka planda sol/sağ blur önizleme
 * - Resim alanının sol/sağ yarısı tıklanabilir (hit alanları sadece resimde)
 * - Üst şerit: sol "← Ana sayfa", sağ "Delil Kodu" + alt yazı
 */
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

  const total = images.length;
  const prevIdx = useMemo(() => (idx - 1 + total) % total, [idx, total]);
  const nextIdx = useMemo(() => (idx + 1) % total, [idx, total]);

  const next = () => { if (!total) return; setLoaded(false); setIdx(nextIdx); };
  const prev = () => { if (!total) return; setLoaded(false); setIdx(prevIdx); };

  // Klavye
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextIdx, prevIdx, total]);

  // Swipe (mobil)
  const onTouchStart = (e) => { touch.current.x = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 30) (dx < 0 ? next() : prev());
  };

  // Önyükleme
  useEffect(() => {
    if (total <= 1) return;
    const a = new Image(); a.src = images[nextIdx];
    const b = new Image(); b.src = images[prevIdx];
  }, [idx, images, total, nextIdx, prevIdx]);

  if (!total) return null;

  return (
    <div
      className={styles.scene}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Üst şerit (linkler tıklanabilir) */}
      <div className={styles.topbar}>
        <div className={styles.leftArea}>
          <Link to="/" className={styles.homeLink}>← Ana sayfa</Link>
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

      {/* Blur arkaplan önizlemeler */}
      {total > 1 && (
        <>
          <img
            src={images[prevIdx]}
            alt=""
            className={`${styles.bgImg} ${styles.bgLeft}`}
            draggable={false}
          />
          <img
            src={images[nextIdx]}
            alt=""
            className={`${styles.bgImg} ${styles.bgRight}`}
            draggable={false}
          />
        </>
      )}

      {/* SADECE resim alanını kapsayan sahne */}
      <div className={styles.stage}>
        {/* Hit alanları (resmin sol/sağ yarısı) */}
        {total > 1 && (
          <>
            <button
              className={`${styles.hit} ${styles.left}`}
              aria-label="Önceki"
              onClick={prev}
            />
            <button
              className={`${styles.hit} ${styles.right}`}
              aria-label="Sonraki"
              onClick={next}
            />
          </>
        )}

        {/* Ana görsel */}
        <img
          key={images[idx]}
          src={images[idx]}
          alt={`evidence-${idx + 1}`}
          className={`${styles.mainImg} ${loaded ? styles.show : ""}`}
          onLoad={() => setLoaded(true)}
          draggable={false}
          onClick={next}
        />
      </div>

      {/* Alt dipnot & sayfa bilgisi */}
      <div className={styles.bottombar}>
        {footnote && <div className={styles.footnote}>{footnote}</div>}
        <div className={styles.pager}>{idx + 1} / {total}</div>
      </div>

      {cornerNumber && <div className={styles.cornerNumber}>{cornerNumber}</div>}
    </div>
  );
}
