// src/pages/PicPanel.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PICS } from "../data/foto";
import styles from "./PicPanel.module.css";

export default function PicPanel() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const entry = PICS[slug];

  const imgRef = useRef(null);
  const [orientation, setOrientation] = useState("landscape"); // 'portrait' | 'landscape'
  const [fitMode, setFitMode] = useState("contain"); // 'contain' | 'width'

  useEffect(() => {
    setFitMode("contain");
  }, [slug]);

  if (!entry) {
    return (
      <div className={styles.wrap}>
        <div className={styles.card}>
          <h1 className={styles.title}>Bulunamadı</h1>
          <p className={styles.note}>
            İstenen görsel bulunamadı: <code>{slug}</code>
          </p>
          <button className={styles.btn} onClick={() => navigate(-1)}>Geri</button>
        </div>
      </div>
    );
  }

  function onImgLoad(e) {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    setOrientation(h > w ? "portrait" : "landscape");
  }

  const stageClass = [
    styles.stage,
    orientation === "portrait" ? styles.portrait : styles.landscape,
    fitMode === "width" ? styles.fitWidth : styles.fitContain,
  ].join(" ");

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <button className={styles.btn} onClick={() => navigate(-1)}>← Geri</button>

        <div className={styles.meta}>
          <h1 className={styles.title}>{entry.title}</h1>
          {entry.note ? <p className={styles.note}>{entry.note}</p> : null}
        </div>

        <div className={styles.right}>
          <button
            className={styles.btn}
            onClick={() => setFitMode((m) => (m === "contain" ? "width" : "contain"))}
            aria-pressed={fitMode === "width"}
            title={fitMode === "width" ? "Sığdır (contain) moduna dön" : "Genişlet (fit-width) moduna geç"}
          >
            {fitMode === "width" ? "Sığdır" : "Genişlet"}
          </button>
        </div>
      </div>

      <div className={stageClass} aria-label="Görsel alanı">
        <img
          ref={imgRef}
          src={entry.src}
          alt={entry.title}
          className={styles.image}
          onLoad={onImgLoad}
          loading="eager"
        />
      </div>
    </div>
  );
}
