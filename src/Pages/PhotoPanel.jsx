import { useParams } from "react-router-dom";
import { useState } from "react";
import { getPhotoEvidence } from "../data/photoEvindence";
import "./PhotoPanel.css";



export default function PhotoPanel() {
  const { photoId } = useParams();
  const evidence = getPhotoEvidence(photoId);
  const [activeHotspot, setActiveHotspot] = useState(null);

  if (!evidence) {
    return <div style={{ padding: 40, color: "#eee" }}>Kanıt bulunamadı.</div>;
  }

  return (
    <div className="photo-panel">
      <img src={evidence.main} alt={evidence.id} className="main-photo" />

      {evidence.hotspots.map((h) => (
        <div
          key={h.id}
          className="hotspot"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          onClick={() => setActiveHotspot(h)}
        />
      ))}

      {activeHotspot && (
        <div
          className="tooltip"
          style={{ left: `${activeHotspot.x}%`, top: `${activeHotspot.y}%` }}
          onClick={() => setActiveHotspot(null)}
        >
          <img src={activeHotspot.img} alt={activeHotspot.label} className="tooltip-img" />
          <span>{activeHotspot.label}</span>
        </div>
      )}
    </div>
  );
}
