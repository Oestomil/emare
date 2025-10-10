import { useNavigate } from "react-router-dom";
import styles from "./BirinciTelefon.module.css";

export default function BirinciTelefon() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <button className="gp-btn" style={{ marginBottom: "12px" }} onClick={() => navigate(-1)}>
          ← Geri
        </button>
      {/* sadece cihaz bilgisi ve kartlar kalsın */}
      <section className={styles.deviceInfo}>
        <h2>Ulvı Plevneli&apos;nin Telefonu</h2>
        <p><b>Model :</b> iPhone 13</p>
        <p><b>IMEI :</b> 319231492314</p>
      </section>

      <main className={styles.cards}>
        <button className={styles.card} onClick={() => navigate("/e/WETCE")}>
          <span>Azize Güner ile mesajlaşması</span>
        </button>
        <button className={styles.card} onClick={() => navigate("/e/EU82HNS")}>
          <span>Şen Plevneliler sohbet grubu</span>
        </button>
        <button className={styles.card} onClick={() => navigate("/e/HLKLR")}>
          <span>Bedirhan Mardinli ile mesajlaşması</span>
        </button>
        <button className={styles.card} onClick={() => navigate("/SS")}>
          <span>Galeri (yada değişebilir)</span>
        </button>
      </main>
    </div>
  );
}
