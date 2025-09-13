import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DETECTIVE_NO, CASE_NO } from "../data/auth";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const [detectiveNo, setDetectiveNo] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (detectiveNo === DETECTIVE_NO && caseNo === CASE_NO) {
      navigate("/home");
    } else {
      alert("Bilgiler hatalı!");
    }
  };

  return (
    <div className="landing-wrap">
      {/* Sol üst logo */}
      <div className="brand">
        <span className="brand-hand">Emare</span>
        <span className="brand-underline" />
      </div>

      {/* Orta alan */}
      <div className="hero">
        {/* Kart */}
        <div className="card">
          <div className="card-glow" />
          <div className="card-body">
            <div className="card-title">
              <span className="logo-hand">Emare</span>
              <span className="logo-underline" />
            </div>

            <p className="helper">Sisteme erişmek için bilgileri giriniz.</p>

            <form onSubmit={handleSubmit} className="form">
              <label className="input">
                <span className="i i-user" aria-hidden="true">👤</span>
                <input
                  type="text"
                  placeholder="Dedektif Numarası"
                  value={detectiveNo}
                  onChange={(e) => setDetectiveNo(e.target.value)}
                />
              </label>

              <label className="input">
                <span className="i i-lock" aria-hidden="true">🔒</span>
                <input
                  type="text"
                  placeholder="Dava Numarası"
                  value={caseNo}
                  onChange={(e) => setCaseNo(e.target.value)}
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
                  onClick={() => alert("Amirinle iletişime geçiniz.")}
                >
                  Parolamı Unuttum
                </button>
              </div>

              <button type="submit" className="btn">
                GİRİŞ
              </button>
            </form>
          </div>
        </div>

        {/* Sağ metin bloğu */}
        <div className="welcome">
          <h1 className="welcome-title">
            EKİBE <br /> HOŞ GELDİN!
          </h1>

          <p>
            Dedektiflik Numaranı büro amirimiz <strong>Harun Kavukçu</strong>’dan alabilirsin.
          </p>
          <p>
            Dava Numarasını bulmak için doğru yere baktığından emin ol.
          </p>
          <p>
            Dedektif, bunu sakın unutma:<br />
            <em>“İzler, sabırsız olanı cezalandırır…”</em>
          </p>
        </div>
      </div>

      {/* Sol alt footer */}
      <footer className="site-footer">
        Bu site Emniyet Birimleri için özel tasarlanmıştır.
      </footer>
    </div>
  );
}
