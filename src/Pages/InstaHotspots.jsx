import { useParams, Link, useNavigate } from "react-router-dom";
import instaHotspots from "../data/instaHotspots";
import HotspotImage from "../components/HotspotImage";

export default function InstaHotspots() {
  const { name } = useParams();
  const navigate = useNavigate();
  const entry = instaHotspots[name];

  if (!entry) {
    // IG gradient renkleri
    const igGradient = "linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)";

    return (
      <div
        style={{
          minHeight: "100dvh",
          background: "#0c1320",
          display: "grid",
          placeItems: "center",
          padding: 24,
          color: "#e9eefb",
        }}
      >
        <div
          style={{
            width: "min(560px, 92vw)",
            background:
              "linear-gradient(180deg, rgba(27,35,54,.75), rgba(17,24,41,.9))",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 16,
            padding: 24,
            textAlign: "center",
            boxShadow: "0 18px 48px rgba(0,0,0,.45)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: igGradient,
                display: "inline-block",
              }}
            />
            <strong style={{ fontSize: 18 }}>
              Eksik veya hatalı giriş yaptınız
            </strong>
          </div>

          <p style={{ color: "#a4aec2", marginTop: 6, marginBottom: 18 }}>
            Lütfen tekrar deneyin veya Instagram yönlendirme sayfasına dönün.
          </p>

          <Link
            to="/i"
            style={{
              display: "inline-block",
              padding: "10px 16px",
              borderRadius: 999,
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              background: igGradient,
              boxShadow: "0 10px 24px rgba(0,0,0,.35)",
            }}
          >
            /i sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  // 🔹 kind:"link" olan kutuya özel click handler
  const handleBoxClick = (box) => {
    if (box.kind === "link") {
      navigate("/i"); // HashRouter varsa otomatik #/i
    }
  };

  return (
    <div style={{ padding: 16, background: "#0c1320", minHeight: "100dvh" }}>
      <HotspotImage
        src={entry.bg}
        boxes={entry.boxes}
        onBoxClick={handleBoxClick} // HotspotImage'e prop geçiyoruz
      />
    </div>
  );
}
