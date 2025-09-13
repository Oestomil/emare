import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DETECTIVE_NO, CASE_NO } from "../data/auth";

export default function Landing() {
  const navigate = useNavigate();
  const [detective, setDetective] = useState("");
  const [caseNo, setCaseNo] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (detective === DETECTIVE_NO && caseNo === CASE_NO) {
      if (remember) {
        localStorage.setItem("detective", detective);
        localStorage.setItem("caseNo", caseNo);
      }
      navigate("/search");
    } else {
      setError("Numara hatalı. Lütfen tekrar deneyiniz.");
    }
  }

  return (
    <div className="center-screen">
      <div className="card" style={{ padding: "28px", minWidth: "320px", maxWidth: "400px" }}>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Dedektif Numarası</label>
          <input
            className="form-input"
            value={detective}
            onChange={(e) => setDetective(e.target.value)}
            placeholder="35746533"
          />

          <label className="form-label" style={{ marginTop: "14px" }}>Dava Numarası</label>
          <input
            className="form-input"
            value={caseNo}
            onChange={(e) => setCaseNo(e.target.value)}
            placeholder="123123123"
          />

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            <label style={{ fontSize: "14px" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ marginRight: "6px" }}
              />
              Beni hatırla
            </label>
            <a href="#" style={{ fontSize: "14px", color: "#69b6ff" }}>Parolamı Unuttum</a>
          </div>

          {error && <div style={{ color: "#ff5e6e", marginTop: "10px", fontSize: "14px" }}>{error}</div>}

          <button className="btn" type="submit" style={{ marginTop: "16px", width: "100%" }}>
            GİRİŞ
          </button>
        </form>
      </div>

      {/* Sağdaki bilgilendirme */}
      <div style={{ marginLeft: "40px", maxWidth: "420px" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>EKİBE<br />HOŞ GELDİN!</h1>
        <p style={{ marginTop: "14px" }}>
          Dedektiflik numaranı büro amirimiz <strong>Harun Kavukçu</strong>’dan alabilirsin.
        </p>
        <p>Dava numarasını bulmak için doğru yere baktığından emin ol.</p>
        <p><strong>Dedektif!</strong> Bunu sakın unutma:</p>
        <blockquote style={{ fontStyle: "italic", color: "#aaa" }}>
          “İzler, sabırsız olanı cezalandırır…”
        </blockquote>
      </div>
    </div>
  );
}
