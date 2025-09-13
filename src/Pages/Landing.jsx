import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DETECTIVE_NO, CASE_NO } from "../data/auth";

export default function Landing() {
  const navigate = useNavigate();
  const [detectiveNo, setDetectiveNo] = useState("");
  const [caseNo, setCaseNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (detectiveNo === DETECTIVE_NO && caseNo === CASE_NO) {
      navigate("/home");
    } else {
      alert("Bilgiler hatalı!");
    }
  };

  return (
    <div className="landing" style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Emare Sistemi</h1>
      <p>Lütfen giriş bilgilerinizi giriniz.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Dedektif No"
            value={detectiveNo}
            onChange={(e) => setDetectiveNo(e.target.value)}
            style={{ padding: "0.5rem", width: "200px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Olay No"
            value={caseNo}
            onChange={(e) => setCaseNo(e.target.value)}
            style={{ padding: "0.5rem", width: "200px" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Giriş
        </button>
      </form>

      {/* Footer kısmı */}
      <footer
        style={{
          fontSize: "0.8rem",
          textAlign: "center",
          marginTop: "3rem",
          color: "#888",
        }}
      >
        Bu site Emniyet Birimleri için özel tasarlanmıştır.
      </footer>
    </div>
  );
}
