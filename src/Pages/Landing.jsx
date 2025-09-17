import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DETECTIVE_NO, CASE_NO } from "../data/auth";
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
    const ok =
      detectiveNo?.trim() === DETECTIVE_NO &&
      caseNo?.trim() === CASE_NO;

    if (!ok) return alert("Bilgiler hatalı!");

    if (remember) {
      localStorage.setItem("detectiveNo", detectiveNo.trim());
      localStorage.setItem("caseNo", caseNo.trim());
    } else {
      localStorage.removeItem("detectiveNo");
      localStorage.removeItem("caseNo");
    }
    navigate(`/search?case=${encodeURIComponent(caseNo.trim())}`);
  };

  return (
    <div className="landing">
      {/* arka-plan efektleri */}
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-noise" aria-hidden="true" />

      <header className="topbar">
        <img src="/banner.svg" alt="Emare" className="brand" />

      </header>

      <main className="container hero" role="main">
        {/* Metin – mobilde üste gelecek */}
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

        {/* Giriş Kartı */}
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
