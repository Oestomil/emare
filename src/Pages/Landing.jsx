import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DETECTIVE_NUMBER, CASE_NUMBER } from "../data/auth";

export default function Landing() {
  const nav = useNavigate();
  const [detective, setDetective] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [remember, setRemember] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    // “Beni hatırla” için localStorage
    const saved = localStorage.getItem("emare_login");
    if (saved) {
      try {
        const { detective, caseNo } = JSON.parse(saved);
        setDetective(detective || "");
        setCaseNo(caseNo || "");
      } catch {}
    }
  }, []);

  function normalizeDigits(s) {
    // boşluk, tire vs. temizle
    return String(s || "").replace(/[^\dA-Za-z]/g, "");
  }

  function onSubmit(e) {
    e.preventDefault();
    setErr("");

    const d = normalizeDigits(detective);
    const c = normalizeDigits(caseNo);

    const ok =
      d.toUpperCase() === DETECTIVE_NUMBER.toUpperCase() &&
      c.toUpperCase() === CASE_NUMBER.toUpperCase();

    if (!ok) {
      setErr("Bilgiler hatalı. Lütfen dedektif numarası ve dava numarasını kontrol edin.");
      return;
    }

    if (remember) {
      localStorage.setItem("emare_login", JSON.stringify({ detective: d, caseNo: c }));
    } else {
      localStorage.removeItem("emare_login");
    }

    nav("/search");
  }

  return (
    <div className="landing">
      {/* soldaki minilogo */}
      <img src="/banner.svg" alt="Emare" className="landing-mini" />

      <div className="landing-grid">
        {/* Sol: kart form */}
        <div className="card landing-card">
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <img src="/banner.svg" alt="Emare" style={{ width: 120, opacity: 0.95 }} />
          </div>

          <form onSubmit={onSubmit} className="form">
            <label className="form-group">
              <span className="form-label">Dedektif Numarası</span>
              <input
                className="field"
                inputMode="numeric"
                autoComplete="off"
                value={detective}
                onChange={(e) => setDetective(e.target.value)}
                placeholder="Dedektif Numarası"
              />
            </label>

            <label className="form-group">
              <span className="form-label">Dava Numarası</span>
              <input
                className="field"
                autoComplete="off"
                value={caseNo}
                onChange={(e) => setCaseNo(e.target.value)}
                placeholder="Dava Numarası"
              />
            </label>

            <div className="form-row">
              <label className="chk">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Beni hatırla</span>
              </label>

              <span className="link-dim" title="Şimdilik aktif değil">Parolamı Unuttum</span>
            </div>

            {err && <div className="err">{err}</div>}

            <button className="btn" type="submit" style={{ width: "100%", marginTop: 6 }}>
              GİRİŞ
            </button>
          </form>
        </div>

        {/* Sağ: metin bloğu */}
        <div className="landing-copy">
          <h2 className="landing-h">EKİBE<br />HOŞ GELDİN!</h2>
          <p>Dedektiflik numaranı büro amirimiz <strong>Harun Kavukçu</strong>’dan alabilirsin.</p>
          <p>Dava numarasını bulmak için doğru yere baktığından emin ol.</p>
          <p>Dedektif! Bunu sakın unutma:<br />
            <em>“İzler, sabırsız olanı cezalandırır…”</em>
          </p>
        </div>
      </div>

      <div className="landing-foot">Bu site Emare Dedektiflik şirketi tarafından yaptırılmıştır.*</div>
    </div>
  );
}
