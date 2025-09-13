// src/Pages/Landing.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DETECTIVE_NO, CASE_NO } from "../data/auth";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  const [detectiveNo, setDetectiveNo] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [remember, setRemember] = useState(true);

  // varsa localStorage'dan doldur
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

    if (!ok) {
      alert("Bilgiler hatalı!");
      return;
    }

    // Beni Hatırla
    if (remember) {
      localStorage.setItem("detectiveNo", detectiveNo.trim());
      localStorage.setItem("caseNo", caseNo.trim());
    } else {
      localStorage.removeItem("detectiveNo");
      localStorage.removeItem("caseNo");
    }

    // Eşleşmede /search?case=...
    const q = new URLSearchParams({ case: caseNo.trim() }).toString();
    navigate(`/search?${q}`);
  };

  return (
    <div className="landing-wrap">
      {/* ana düzen */}
      <div className="hero">
        {/* giriş kartı */}
        <div className="card">
          <div className="card-glow" />
          <div className="card-body">
            {/* kart başlığı: public/banner.svg */}
            <img
              src="/banner.svg"
              alt="Emare"
              className="card-logo"
              loading="eager"
              decoding="async"
            />

            <p className="helper">Sisteme erişmek için bilgileri giriniz.</p>

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
                  onClick={() => alert("Parola sıfırlama için büro amiriyle iletişime geçiniz.")}
                >
                  Parolamı Unuttum
                </button>
              </div>

              <button type="submit" className="btn">GİRİŞ</button>
            </form>
          </div>
        </div>

        {/* sağ bilgilendirme bloğu */}
        <div className="welcome">
          <h1 className="welcome-title">
            EKİBE <br /> HOŞ GELDİN!
          </h1>
          <p>
            Dedektiflik Numaranı büro amirimiz <strong>Harun Kavukçu</strong>’dan alabilirsin.
          </p>
          <p>Dava Numarasını bulmak için doğru yere baktığından emin ol.</p>
          <p>
            Dedektif, bunu sakın unutma:<br />
            <em>“İzler, sabırsız olanı cezalandırır…”</em>
          </p>
        </div>
      </div>

      {/* sol alt küçük not */}
      <footer className="site-footer">
        Bu site Emniyet Birimleri için özel tasarlanmıştır.
      </footer>
    </div>
  );
}
