// src/pages/Insta.jsx
import { useParams } from "react-router-dom";
import instaData from "../data/instaData";
import "./Insta.css";

export default function Insta() {
  const { name } = useParams();       // /insta/:name parametresi
  const photos = instaData[name] || [];

  return (
    <div className="insta-wrap">
      <h1 className="insta-title">
        {name ? `${name} için Fotoğraflar` : "Instagram Fotoğrafları"}
      </h1>

      <div className="insta-panel">
        {photos.length > 0 ? (
          photos.map((src, i) => (
            <div key={i} className="insta-item">
              <img src={src} alt={`${name}-${i}`} />
            </div>
          ))
        ) : (
          <p className="insta-empty">Bu kullanıcı için fotoğraf yok.</p>
        )}
      </div>
    </div>
  );
}
