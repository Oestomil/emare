import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getVideoBySlug } from "../data/video";
import styles from "./VideoPage.module.css";

export default function VideoPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const video = getVideoBySlug(slug);

  const headerRef = useRef(null);
  const frameRef = useRef(null);

  const [orientation, setOrientation] = useState("landscape"); // 'portrait' | 'landscape'
  const [ready, setReady] = useState(false);

  // Header yüksekliğini ölç → mobil tam ekran için CSS değişkeni
  useEffect(() => {
    const setHeights = () => {
      const hh = headerRef.current?.getBoundingClientRect().height || 0;
      frameRef.current?.style.setProperty("--header-h", `${hh}px`);
    };
    setHeights();
    window.addEventListener("resize", setHeights);
    return () => window.removeEventListener("resize", setHeights);
  }, []);

  if (!video) {
    return (
      <div className={styles.wrap}>
        <h1>Video bulunamadı</h1>
        <button onClick={() => navigate(-1)} className={styles.btn}>← Geri</button>
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

  const letterTitle = video.mektupTitle ?? video["mektup-title"];
  const letterText  = video.mektupYazi  ?? video["mektup-yazi"];
  const letterUrl   = video.mektupUrl   ?? video["mektup-url"];

  return (
    <div className={styles.wrap}>
      <div ref={headerRef} className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.btn}>← Geri</button>
        <h1 className={styles.title}>{video.title}</h1>
        <div className={styles.spacer} />
      </div>

      <div ref={frameRef} className={playerClass} aria-label="Video alanı">
        <video
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

      {letterTitle && letterText && letterUrl &&(
        <div className={styles.mektup}>
          <h2 className={styles.mektupTitle}>{letterTitle}</h2>
          <p className={styles.mektupYazi}>{letterText}</p>
          <a href={letterUrl} className={styles.mektupLink}>
            İtirafın Tamamını Görüntüle
          </a>
        </div>
      )}
    </div>
  );
}
