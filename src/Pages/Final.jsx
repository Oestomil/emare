import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import "./Final.css"

const PEOPLE = [
  "Kamil Şen",
  "Azize Güner",
  "Bedirhan Mardinli",
  "Funda Plevneli",
  "İntihar",
];

export default function Final() {
  const [killer, setKiller] = useState("");
  const [motive, setMotive] = useState("");
  const [evidence, setEvidence] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [wrong, setWrong] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!killer) return;

    const isCorrect = killer === "Bedirhan Mardinli";
    setLoading(true);

    // KAYDET
    try {
      await supabase.from("guesses").insert({
        killer,
        motive,
        evidence,
        email,
        is_correct: isCorrect,
        ua: navigator.userAgent,
        game: "emare-v1",
      });
    } catch (err) {
      console.error("save failed:", err);
      // kayıt başarısızsa da oyunu bozmuyoruz
    } finally {
      setLoading(false);
    }

    if (isCorrect) {
      window.location.hash = "/ss";
    } else {
      setWrong(true);
    }
  }

  function resetAll() {
    setWrong(false);
    // İstersen alanları temizle:
    // setKiller(""); setMotive(""); setEvidence(""); setEmail("");
  }

  function gotoReveal() {
    window.location.hash = "/sss";
  }

  return (
    <div className="container final">

    <div className="container" style={{ maxWidth: 1080 }}>
              {/* Home butonu */}
         <button className="gp-btn" style={{ marginBottom: "12px" }} onClick={() => navigate(-1)}>
          ← Geri
        </button>

      <form onSubmit={handleSubmit}
        className="card"
        style={{
          padding: 24,
          borderRadius: 20,
          background: "linear-gradient(180deg,#141b33 0%, #111831 100%)",
          boxShadow: "0 30px 80px rgba(0,0,0,.35), inset 0 1px 0 #1b2445",
        }}>
        <h2 className="title" style={{ marginBottom: 18 }}>Son Tahmin</h2>

        {/* KILLER + (opsiyonel) AZMETTİRİCİ */}
        <div className="grid" style={{ gap: 16, gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div className="form-label" style={{ marginBottom: 6 }}>Katil</div>
            <select className="field" value={killer} onChange={(e)=>setKiller(e.target.value)}>
              <option value="">Seçiniz</option>
              {PEOPLE.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <div className="form-label" style={{ marginBottom: 6 }}>
              Azmettirici <span style={{color:"#9aa3cc"}}>(opsiyonel)</span>
            </div>
            <select className="field">
              <option value="">Seçiniz</option>
              {PEOPLE.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Motivasyon + Somut Delil */}
        <div className="grid" style={{ gap: 16, gridTemplateColumns: "1.6fr 1fr", marginTop: 14 }}>
          <div>
            <div className="form-label" style={{ marginBottom: 6 }}>Motivasyon</div>
            <textarea
              className="field"
              rows={10}
              value={motive}
              onChange={(e)=>setMotive(e.target.value)}
              placeholder="Cinayetin sizin tarafından neden işlendiğinin motivasyonunu yazın" />
          </div>
          <div>
            <div className="form-label" style={{ marginBottom: 6 }}>Somut Delil</div>
            <textarea
              className="field"
              rows={10}
              value={evidence}
              onChange={(e)=>setEvidence(e.target.value)}
              placeholder="Elinizdeki somut delilleri yazın" />
          </div>
        </div>

        {/* E-posta */}
        <div className="article" style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, color: "#aeb6dc", marginBottom: 6 }}>
            Ödül kazanmak için e-posta adresini girebilirsin.
          </div>
          <input
            className="field"
            type="email"
            placeholder="mail adresi"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            inputMode="email" />
        </div>

        {/* Aksiyon alanı */}
        {!wrong ? (
          <div style={{ display:"flex", justifyContent:"center", marginTop: 16 }}>
            <button type="submit" className="btn btn-danger" disabled={loading} style={{ minWidth: 220 }}>
              {loading ? "Kaydediliyor..." : "Buldum!"}
            </button>
          </div>
        ) : (
          <div className="empty" style={{ textAlign:"center", marginTop:16 }}>
            <div style={{ fontWeight:700, marginBottom:8, color:"#ff969e" }}>Yanlış tahmin</div>
            <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
              <button type="button" className="btn" onClick={resetAll}>Tekrar tahmin et</button>
              <button type="button" className="btn" onClick={gotoReveal}>Sonucu gör</button>
            </div>
          </div>
        )}
      </form>
    </div>
    </div>
    
  );
}
