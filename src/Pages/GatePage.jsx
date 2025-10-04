// src/pages/GatePage.jsx
import { useNavigate, Link } from "react-router-dom";
import PinGate from "../components/PinGate.jsx";
import { GATES } from "../data/gates";
import "./GatePage.css";                    // ⬅️ ekle

export default function GatePage() {
  const navigate = useNavigate();

  function handleSubmit(codeRaw) {
    const code = String(codeRaw).toUpperCase();
    const url = GATES[code];

    if (!url) { alert("Kod geçersiz."); return; }
    if (/^https?:\/\//i.test(url)) { window.location.href = url; return; }
    if (url.startsWith("/e/")) { navigate("/gate-panel", { state: { target: url, pin: code } }); return; }
    navigate(url);
  }

  return (
    <div className="gate-wrap">
      <div className="gate-card">
        {/* Home butonu */}
         <button className="gp-btn" style={{ marginBottom: "12px" }} onClick={() => navigate(-1)}>
          ← Geri
        </button>


        <PinGate
          length={4}
          onSubmit={handleSubmit}
          placeholder="–"
          title="Erişim Sınırlandırılmıştır"
          subtitle="Devam edebilmek için kodunuzu giriniz."
          footnote="Bu site Emniyet Genel Müdürlüğü tarafından yaptırılmıştır.*"
          inputMode="latin"
        />
        <p className="secret-note">Kartallar tersten uçar</p>
      </div>
    </div>
  );
}
