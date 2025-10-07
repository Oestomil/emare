// src/pages/PicPanel.jsx
import { useParams, useNavigate } from "react-router-dom";
import { PICS } from "../data/foto";
import styles from "./PicPanel.module.css";

export default function PicPanel() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const entry = PICS[slug];

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

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <button className={styles.btn} onClick={() => navigate(-1)}>← Geri</button>
        <div className={styles.meta}>
          <h1 className={styles.title}>{entry.title}</h1>
          {entry.note ? <p className={styles.note}>{entry.note}</p> : null}
        </div>
        <div className={styles.spacer} />
      </div>

      {/* 720p görünümü: 16:9 bir çerçeve; içinde görsel "contain" */}
      <div className={styles.stage} aria-label="Görsel alanı">
        <img
          src={entry.src}
          alt={entry.title}
          className={styles.image}
          loading="eager"
        />
      </div>
    </div>
  );
}
