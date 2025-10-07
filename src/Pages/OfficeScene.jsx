import { Link } from "react-router-dom";
import "./CrimeScene.css";
import { useNavigate } from "react-router-dom";

/** İstersen burayı props veya API'den besleyebilirsin */
const CASE_NO = "357465";
const PHOTO_SRC = "/evidence/office.jpeg"; // public/evindence/olayana.jpeg
// Eğer klasörün "evidence" ise: const PHOTO_SRC = "/evidence/olayana.jpeg";

const DESTINATIONS = [
  { label: "Ofis Görünüm 1", to: "/photo/cop" },
  { label: "Ofis Görünüm 2", to: "/photo/pc" },

];

export default function CrimeScene() {
  const navigate = useNavigate();
  return (
    
    <div className="cs-wrap">
         <button className="gp-btn" style={{ marginBottom: "12px" }} onClick={() => navigate(-1)}>
          ← Geri
        </button>
      <div className="cs-card">
        <div className="cs-top">
          <div className="cs-case">Dava No : {CASE_NO}</div>
        </div>

        <div className="cs-photo">
          <img src={PHOTO_SRC} alt="Olay yeri fotoğrafı" />
        </div>

        <div className="cs-caption">Olay Yeri İnceleme</div>
      </div>

      <div className="cs-actions">
        {DESTINATIONS.map((d) => (
          <Link key={d.to} to={d.to} className="cs-btn">
            {d.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
