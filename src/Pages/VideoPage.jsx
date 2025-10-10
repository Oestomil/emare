import { useParams, Link, useNavigate } from "react-router-dom";
import { getVideoBySlug } from "../data/video";
import styles from "./VideoPage.module.css";

export default function VideoPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const video = getVideoBySlug(slug);

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

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.btn}>← Geri</button>
        <h1 className={styles.title}>{video.title}</h1>
        <div className={styles.spacer} />
      </div>

      <div className={styles.player}>
        <video
          src={video.src}
          controls
          preload="metadata"
          className={styles.video}
        />
      </div>

      <div className={styles.note}>{video.note}</div>

      {/* Örn. başka videoya link */}
      <div className={styles.footer}>
        <Link to="/video/SKTRET" className={styles.link}>Sokak Röportajı</Link>
        <Link to="/video/MTSH" className={styles.link}>Mahkeme Kaydı</Link>
        <Link to="/video/V5WQS" className={styles.link}>112 Acil Çağrı Arama Kaydı</Link>

      </div>
    </div>
  );
}
