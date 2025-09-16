// src/pages/GatePage.jsx
import { useNavigate, Link } from "react-router-dom";
import PinGate from "../components/PinGate.jsx";
import { GATES } from "../data/gates";

export default function GatePage() {
  const navigate = useNavigate();

  function handleSubmit(codeRaw) {
    const code = String(codeRaw).toUpperCase();
    const url = GATES[code];

    if (!url) {
      alert("Kod geçersiz.");
      return;
    }

    // Dış link ise aynen bırak
    if (/^https?:\/\//i.test(url)) {
      window.location.href = url;
      return;
    }

    // EvidenceViewer hedefi ise önce GatePanel'e uğra
    if (url.startsWith("/e/")) {
      navigate("/gate-panel", { state: { target: url, pin: code } });
      return;
    }

    // Diğer iç rotalar (profil vs.)
    navigate(url);
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 48px)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div className="card" style={{ width: "min(960px, 96vw)", padding: 28, position: "relative" }}>
        {/* 🔽 Home link (ev ikonu) */}
        <Link
          to="/"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#112057",
            color: "#fff",
            textDecoration: "none",
          }}
          title="Ana Sayfa"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round"
               style={{ width: 20, height: 20 }}>
            <path d="M3 9l9-7 9 7" />
            <path d="M9 22V12h6v10" />
          </svg>
        </Link>
        {/* 🔼 Home ikonu sonu */}

        <PinGate
          length={4}
          onSubmit={handleSubmit}
          placeholder="–"
          title="Erişim Sınırlandırılmıştır"
          subtitle="Devam edebilmek için kodunuzu giriniz."
          footnote="Bu site Emniyet Genel Müdürlüğü tarafından yaptırılmıştır.*"
          inputMode="latin"
        />
      </div>
    </div>
  );
}
