// src/pages/GatePanel.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./GatePanel.css";
// (Opsiyonel) kod bazlı not metni istersen aç:
import { GATE_NOTES } from "../data/gates";

export default function GatePanel() {
  const navigate = useNavigate();
  const location = useLocation();

  // target: örn "/e/DFGR2"  |  pin: örn "3091"
  const target = location.state?.target;
  const pin = location.state?.pin;

  useEffect(() => {
    if (!target) {
      // state yoksa, örn. sayfa direkt açıldıysa anasayfaya dön
      navigate("/", { replace: true });
    }
  }, [target, navigate]);

  const evidenceId = useMemo(() => {
    // "/e/DFGR2" → "DFGR2"
    const m = typeof target === "string" ? target.match(/^\/e\/([^/?#]+)/) : null;
    return m?.[1] || "";
  }, [target]);

  // Not metnini dinamik (opsiyonel) ya da sabit göster
  const noteText = (pin && GATE_NOTES?.[pin]) || "buraya kanıt";

  // Modal durumları
  const [showNote, setShowNote] = useState(false);

  // Ekran Görüntüleri: sol tık ile de doğrudan kanıta git (basit akış)
  function goEvidence() {
    if (typeof target === "string") navigate(target);
  }

  // Sağ tık → EvidenceViewer
  function onContextToEvidence(e) {
    e.preventDefault();
    goEvidence();
  }

  return (
    <div className="gp-wrap">
      <div className="gp-grid">
        {/* Sol kutu: Not Defteri */}
        <div
          className="gp-box gp-left"
          onClick={() => setShowNote(true)}
          onContextMenu={onContextToEvidence}
          role="button"
          tabIndex={0}
          aria-label="Not Defteri (tıkla: aç, sağ tık: kanıta git)"
        >
          <div className="gp-box-title">Not Defteri</div>
          <div className="gp-box-sub">Tıklayınca okuma modunda açılır</div>

          {/* Mobil erişilebilirlik için küçük buton */}
          <div className="gp-actions">
            <button className="gp-btn" onClick={(e) => { e.stopPropagation(); setShowNote(true); }}>
              Notu Aç
            </button>
            <button className="gp-btn ghost" onClick={(e) => { e.stopPropagation(); goEvidence(); }}>
              Kanıta Git
            </button>
          </div>
        </div>

        {/* Sağ kutu: Ekran Görüntüleri */}
        <div
          className="gp-box gp-right"
          onClick={goEvidence}
          onContextMenu={onContextToEvidence}
          role="button"
          tabIndex={0}
          aria-label="Ekran Görüntüleri (tıkla/sağ tık: kanıta git)"
        >
          <div className="gp-box-title">Ekran Görüntüleri</div>
          <div className="gp-box-sub">
            {evidenceId ? `Kanıt: ${evidenceId}` : "Kanıta git"}
          </div>

          <div className="gp-actions">
            <button className="gp-btn" onClick={(e) => { e.stopPropagation(); goEvidence(); }}>
              Kanıta Git
            </button>
          </div>
        </div>
      </div>

      {/* Not Defteri Modal (read-only) */}
      {showNote && (
        <div className="gp-modal-backdrop" onClick={() => setShowNote(false)}>
          <div className="gp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gp-modal-head">
              <div className="gp-modal-title">Not Defteri</div>
              <button className="gp-close" onClick={() => setShowNote(false)}>✕</button>
            </div>
            <div className="gp-modal-body">
              <div className="gp-notepad" aria-readonly>
                <pre>{noteText}</pre>
              </div>
              <div className="gp-modal-foot">
                <button className="gp-btn" onClick={() => setShowNote(false)}>Kapat</button>
                <button className="gp-btn ghost" onClick={goEvidence}>Kanıta Git</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sol alttaki resmi not */}
      <div className="gp-footnote">Bu site Emniyet Birimleri için özel tasarlanmıştır.</div>
    </div>
  );
}
