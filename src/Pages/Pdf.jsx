// pages/Pdf.jsx
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPdfBySlug } from "../data/pdf";
import "./Pdf.css";

export default function Pdf() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const item = useMemo(() => getPdfBySlug(slug), [slug]);

  if (!item) {
    return (
      <div className="pdf-wrap">
        <div className="pdf-card">
          <div className="pdf-top">
            <button className="pdf-btn" onClick={() => navigate(-1)}>← Geri</button>
          </div>
          <div className="pdf-empty">
            <div className="pdf-title">Kayıt bulunamadı</div>
            <p>“{slug}” için bir kayıt tanımı yok.</p>
          </div>
        </div>
      </div>
    );
  }

  const type = item.type || "pdf";

  return (
    <div className="pdf-wrap">
      <div className="pdf-card">
        {/* Üst şerit */}
        <div className="pdf-top">
          <button className="pdf-btn" onClick={() => navigate(-1)}>← Geri</button>

          <div className="pdf-meta">
            <div className="pdf-title">{item.title || item.slug}</div>
            {item.note && <div className="pdf-sub">{item.note}</div>}
          </div>

          <div className="pdf-actions">
            <a className="pdf-btn" href={item.src} target="_blank" rel="noopener noreferrer">
              Yeni Sekmede Aç
            </a>
            <a className="pdf-btn pdf-btn--accent" href={item.src} download>
              İndir
            </a>
          </div>
        </div>

        {type === "pdf" ? (
          // ================== PDF VIEWER ==================
          <div className="pdf-view">
            {/* Tarayıcı destekliyorsa yerleşik görüntüleyici */}
            <iframe
              className="pdf-frame"
              title={item.title || item.slug}
              src={`${item.src}#toolbar=1&navpanes=0&scrollbar=1&zoom=page-width`}
            />
            {/* Fallback */}
            <embed className="pdf-embed" src={item.src} type="application/pdf" />
            <div className="pdf-fallback">
              PDF görüntülenemedi.{" "}
              <a href={item.src} target="_blank" rel="noopener noreferrer">Buradan aç</a> veya
              <a href={item.src} download> indir</a>.
            </div>
          </div>
        ) : (
          // ================== IMAGE VIEWER ==================
          <div className="img-view">
            <img
              className="img-el"
              src={item.src}
              alt={item.title || item.slug}
              loading="lazy"
            />
            <div className="img-fallback">
              Görsel yüklenemedi.{" "}
              <a href={item.src} target="_blank" rel="noopener noreferrer">Buradan aç</a> veya
              <a href={item.src} download> indir</a>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
