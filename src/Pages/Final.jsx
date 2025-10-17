import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveGuess } from "../services/guesses";
import "./Final.css";

/** Değiştireceğin yer: her kişi için gideceği URL */
const REDIRECTS = {
  "Kamil Şen": "/video/secenekkamil",
  "Bedirhan Mardinli": "/video/secenekbedirhan", // doğruysa da buraya gitsin
  "Funda Plevneli": "/video/secenekfunda",
};

const PEOPLE = [
  "Kamil Şen",
  "Bedirhan Mardinli",
  "Funda Plevneli",
];

export default function Final() {
  const navigate = useNavigate();

  const [killer, setKiller] = useState("");
  const [instigator, setInstigator] = useState(""); // opsiyonel
  const [motive, setMotive] = useState("");
  const [evidence, setEvidence] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!killer) return;

    const isCorrect = killer === "Bedirhan Mardinli";
    const target = REDIRECTS[killer] || "/";

    setLoading(true);
    try {
      await saveGuess({
        killer,
        instigator: instigator || null,
        motive,
        evidence,
        email,
        is_correct: isCorrect,
        ua: navigator.userAgent,
        game: "emare-v1",
      });
    } catch (err) {
      console.error("save failed:", err?.message || err);
      // kayıt patlasa bile akışı bozma
    } finally {
      setLoading(false);
    }

    // HashRouter kullanıyorsan:
    // window.location.hash = target;
    navigate(target);
  }

  return (
    <div className="final-shell">
      {/* Üst bar */}
      <header className="final-header" role="banner">
        <button type="button" className="gp-btn" onClick={() => navigate(-1)}>
          ← Geri
        </button>
        <h1 className="final-brand">Son Tahmin</h1>
        <div className="final-header-spacer" />
      </header>

      {/* Orta alan */}
      <main className="final-container" role="main">
        <div className="final-wrap">
          <form className="final-card" onSubmit={handleSubmit}>
            {/* Katil */}
            <div className="final-section">
              <label className="form-label" htmlFor="killer">Katil</label>
              <select
                id="killer"
                className="field"
                value={killer}
                onChange={(e) => setKiller(e.target.value)}
                required
                aria-required="true"
              >
                <option value="">Seçiniz</option>
                {PEOPLE.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Azmettirici (opsiyonel) */}
            <div className="final-section">
              <label className="form-label" htmlFor="instigator">
                Azmettirici <span className="muted">(opsiyonel)</span>
              </label>
              <select
                id="instigator"
                className="field"
                value={instigator}
                onChange={(e) => setInstigator(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {PEOPLE.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Motivasyon & Somut Delil */}
            <div className="final-grid-2" aria-label="Açıklama alanları">
              <div className="final-section">
                <label className="form-label" htmlFor="motive">Motivasyon</label>
                <textarea
                  id="motive"
                  className="field"
                  rows={10}
                  value={motive}
                  onChange={(e) => setMotive(e.target.value)}
                  placeholder="Cinayetin neden işlendiğine dair motivasyonu yazın"
                />
              </div>

              <div className="final-section">
                <label className="form-label" htmlFor="evidence">Somut Delil</label>
                <textarea
                  id="evidence"
                  className="field"
                  rows={10}
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  placeholder="Elinizdeki somut delilleri yazın"
                />
              </div>
            </div>

            {/* E-posta */}
            <section className="final-article" aria-label="Ödül için iletişim">
              <div className="tiny-muted">Ödül kazanmak için e-posta adresini girebilirsin.</div>
              <input
                className="field"
                type="email"
                placeholder="mail adresi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputMode="email"
                autoComplete="email"
              />
            </section>

            {/* CTA */}
            <div className="cta-row">
              <button
                type="submit"
                className="btn btn-danger"
                disabled={loading || !killer}
                aria-busy={loading ? "true" : "false"}
              >
                {loading ? "Kaydediliyor..." : "Buldum!"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
