import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import instaLinks, { toInstaUrl } from "../data/instaLinks";
import "./InstaGo.css";

/* IG kullanıcı adı doğrulaması:
   1–30 char, harf/rakam/._ ; baş/son nokta yok; çift nokta yok */
const isValidUsername = (raw) => {
  if (!raw) return false;
  const u = raw.trim().replace(/^@/, "");
  const re = /^(?!.*\.\.)(?!\.)(?!.*\.$)[A-Za-z0-9._]{1,30}$/;
  return re.test(u);
};

export default function InstaGo() {
  // /i/:name ile gelirseniz yine tek kişilik sayfa çalışsın (opsiyonel)
  const { name } = useParams();
  const prefilled = name && instaLinks[name] ? `@${instaLinks[name].username}` : "";

  const [customUser, setCustomUser] = useState(prefilled);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Tamamen bizim kontrolümüzde çalışsın (form yok)
  const attemptGo = () => {
    const raw = (customUser || "").trim();
    // full url yazdıysa son segmenti alıp doğrula
    const m = raw.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/?#]+)/i);
    const username = m ? m[1] : raw.replace(/^@/, "");

    if (!isValidUsername(username)) {
      setError("Eksik veya hatalı giriş yaptınız.");
      inputRef.current?.focus();
      return;
    }
    setError("");
    window.open(toInstaUrl(username), "_blank", "noopener"); // sadece geçerliyse aç
  };

  return (
    <div className="ig-wrap">
      <div className="ig-card">
        <div className="ig-head">
          <Link to="/" className="ig-back">← Geri</Link>
          <h1>Instagram’a Git</h1>
        </div>

        <p className="ig-caption">Kullanıcı adı yaz:</p>

        <div className={`ig-inputrow ig-inputrow--lg ${error ? "has-error" : ""}`}>
          <span className="ig-icon large" aria-hidden>
            <svg viewBox="0 0 24 24">
              <defs>
                <linearGradient id="ig2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%"  stopColor="#f9ce34"/>
                  <stop offset="50%" stopColor="#ee2a7b"/>
                  <stop offset="100%" stopColor="#6228d7"/>
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig2)"/>
              <circle cx="12" cy="12" r="4.2" fill="#fff"/>
              <circle cx="17.4" cy="6.6" r="1.3" fill="#fff"/>
            </svg>
          </span>

          <input
            ref={inputRef}
            className="ig-input ig-input--lg"
            placeholder="your_username"
            value={customUser}
            onChange={(e) => {
              setCustomUser(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();          // ⛔️ varsayılan davranış yok
                attemptGo();
              }
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-invalid={!!error}
            aria-describedby={error ? "ig-error" : undefined}
          />

          <button
            className="ig-go ig-go--lg"
            type="button"                   // ⛔️ submit değil
            onClick={attemptGo}
          >
            Git
          </button>
        </div>

        {error && (
          <div id="ig-error" className="ig-error" role="alert" aria-live="polite">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
