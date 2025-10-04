import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPhotoEvidence } from "../data/photoEvidence";
import "./PhotoPanel.css";
import { useNavigate } from "react-router-dom";

export default function PhotoPanel() {
  const { photoId } = useParams();
  const evidence = getPhotoEvidence(photoId);   // 👈 ev yerine evidence
  const [activeHotspot, setActiveHotspot] = useState(null);
  const navigate = useNavigate();

  // Esc ile kapat
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActiveHotspot(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!evidence) {
    return <div style={{ padding: 32, color: "#eee" }}>Delil bulunamadı.</div>;
  }

  return (
    // Dışarı tık → kapat
    <div className="top-photo-panel">
               <button className="gp-btn" style={{ marginBottom: "12px" }} onClick={() => navigate(-1)}>
          ← Geri
        </button>
        
    <div className="photo-panel" onClick={() => setActiveHotspot(null)}>
      <img src={evidence.main} alt={evidence.id} className="main-photo" />

      {evidence.hotspots.map((h) => (
        <div
          key={h.id}
          className="hotspot"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          onClick={(e) => {
            e.stopPropagation();
            setActiveHotspot(h);
          }}
        />
      ))}

      {activeHotspot && (
          <div
    className="tooltip tooltip--down"
        style={{
      left: `${activeHotspot.x}%`,
      top: `calc(${activeHotspot.y}% + 14px)`,
        }   }
         onClick={(e) => e.stopPropagation()}
      >
    {/* Kapatma butonu */}
            <button
            className="tooltip-close"
           onClick={() => setActiveHotspot(null)}
             aria-label="Kapat"
         >
      ×
         </button>

            <img
            src={activeHotspot.img}
             alt={activeHotspot.label}
                className="tooltip-img"
            />
            <span className="tooltip-title">{activeHotspot.label}</span>
        </div>
      )}
    </div>
    </div>
  );
}
