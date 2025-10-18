// src/Pages/Landing.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGINS } from "../data/auth"; // senin auth.js'de p1/p2 veya istediğin anahtarlar olmalı
import { trackEntryChannel, saveEntryToDB } from "../lib/firebase";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const [detectiveNo, setDetectiveNo] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    const dn = localStorage.getItem("detectiveNo") || "";
    const cn = localStorage.getItem("caseNo") || "";
    if (dn) setDetectiveNo(dn);
    if (cn) setCaseNo(cn);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dn = (detectiveNo || "").trim();
    const cn = (caseNo || "").trim();

    // Hangi profil eşleştiyse onu bul
    const matched = Object.entries(LOGINS).find(
      ([, creds]) => dn === creds.DETECTIVE_NO && cn === creds.CASE_NO
    );

    if (!matched) {
      alert("Bilgiler hatalı!");
      return;
    }

    const [profileKey] = matched; // örn "p1" veya "p2"

    // localStorage işlemleri (benzer şekilde)
    if (remember) {
      localStorage.setItem("detectiveNo", dn);
      localStorage.setItem("caseNo", cn);
    } else {
      localStorage.removeItem("detectiveNo");
      localStorage.removeItem("caseNo");
    }

    // 1) Analytics (görünmez) - fire-and-forget
    try {
      trackEntryChannel(profileKey, { case_no: cn });
    } catch (err) {
      // sessizce geç
      console.warn("trackEntryChannel çağrısı hata:", err);
    }

    // 2) Firestore'a kayıt (enteries) - fire-and-forget
    // saveEntryToDB içindeki try/catch hataları yakalar, burada await yok -> kullanıcı beklemez
    saveEntryToDB({ profileKey, detectiveNo: dn, caseNo: cn });

    // 3) Oyuna yönlendir (URL'de kanal bilgisi yok)
    navigate(`/search?case=${encodeURIComponent(cn)}`);
  };

  return (
    <div className="landing">
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />

      <main className="container hero" role="main">
        <section className="welcome" aria-labelledby="welcome-title">
          <h1 id="welcome-title" className="welcome-title">
            EKİBE <span>HOŞ GELDİN!</span>
          </h1>
          <p>
            Dedektiflik Numaranı büro amirimiz <strong>Harun Kavukçu</strong>’dan alabilirsin.
          </p>
          <p>Dava Numarasını bulmak için doğru yere baktığından emin ol.</p>
          <p className="quote">
            Dedektif, bunu sakın unutma: <em>“İzler, sabırsız olanı cezalandırır…”</em>
          </p>
        </section>

        <section className="card" aria-label="Giriş paneli">
          <form onSubmit={handleSubmit} className="form">
            <label className="input">
              <span className="i" aria-hidden="true">👤</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Dedektif Numarası"
                value={detectiveNo}
                onChange={(e) => setDetectiveNo(e.target.value)}
                aria-label="Dedektif Numarası"
                required
                autoComplete="off"
              />
            </label>

            <label className="input">
              <span className="i" aria-hidden="true">🔒</span>
              <input
                type="text"
                placeholder="Dava Numarası"
                value={caseNo}
                onChange={(e) => setCaseNo(e.target.value)}
                aria-label="Dava Numarası"
                required
                autoComplete="off"
              />
            </label>

            <div className="row between">
              <label className="check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Beni Hatırla</span>
              </label>
              <button
                type="button"
                className="link"
                onClick={() =>
                  alert("Parola sıfırlama için büro amiriyle iletişime geçiniz.")
                }
              >
                Parolamı Unuttum
              </button>
            </div>

            <button type="submit" className="btn">GİRİŞ</button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Emare • Güvenlik Birimleri İçin Tasarlanmıştır.
      </footer>
    </div>
  );
}
