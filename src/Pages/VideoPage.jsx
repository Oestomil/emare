import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getVideoBySlug } from "../data/video";
import styles from "./VideoPage.module.css";

export default function VideoPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const video = getVideoBySlug(slug);

  const playerRef = useRef(null);
  const headerRef = useRef(null);
  const frameRef = useRef(null);

  const [orientation, setOrientation] = useState("landscape");
  const [ready, setReady] = useState(false);

  // Header yüksekliğini ölçüp CSS değişkenine aktar
  useEffect(() => {
    const setHeights = () => {
      const hh = headerRef.current?.getBoundingClientRect().height || 0;
      if (frameRef.current)
        frameRef.current.style.setProperty("--header-h", `${hh}px`);
    };
    setHeights();
    window.addEventListener("resize", setHeights);
    return () => window.removeEventListener("resize", setHeights);
  }, []);

  if (!video) {
    return (
      <div className={styles.wrap}>
        <h1>Video bulunamadı</h1>
        <button onClick={() => navigate(-1)} className={styles.btn}>
          ← Geri
        </button>
      </div>
    );
  }

  function onLoadedMetadata(e) {
    const el = e.currentTarget;
    const w = el.videoWidth || 0;
    const h = el.videoHeight || 0;
    setOrientation(h > w ? "portrait" : "landscape");
    setReady(true);
  }

  const playerClass = [
    styles.player,
    orientation === "portrait" ? styles.portrait : styles.landscape,
  ].join(" ");

  return (
    <div className={styles.wrap}>
      <div ref={headerRef} className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.btn}>← Geri</button>
        <h1 className={styles.title}>{video.title}</h1>
        <div className={styles.spacer} />
      </div>

      <div ref={frameRef} className={playerClass} aria-label="Video alanı">
        <video
          ref={playerRef}
          src={video.src}
          controls
          preload="metadata"
          playsInline
          className={styles.video}
          onLoadedMetadata={onLoadedMetadata}
          poster={video.poster || undefined}
        />
        {!ready && <div className={styles.skeleton} />}
      </div>

      {video.note ? <div className={styles.note}>{video.note}</div> : null}

      {/* --- MEKTUP ALANI --- */}
      {video.mektupTitle && video.mektupYazi && (
        <div className={styles.mektup}>
          <h2 className={styles.mektupTitle}>{video.mektupTitle}</h2>
          <p className={styles.mektupYazi}>{video.mektupYazi}</p>
        </div>
      )}

      <div className={styles.footer}>
        <Link to="/video/SKTRET" className={styles.link}>Sokak Röportajı</Link>
        <Link to="/video/MTSH" className={styles.link}>Mahkeme Kaydı</Link>
        <Link to="/video/V5WQS" className={styles.link}>112 Acil Çağrı Arama Kaydı</Link>
      </div>
    </div>
  );
}
