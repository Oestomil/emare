// pages/Pdf.jsx
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPdfBySlug } from "../data/pdf";
import "./pdf.css";

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
            <p>“{slug}” için bir PDF tanımı yok.</p>
          </div>
        </div>
      </div>
    );
  }

  // Bazı tarayıcılar yerleşik PDF görüntüleyici kullanır (Chrome, Edge, Safari).
  // Görüntüleme parametreleri: #toolbar=1&navpanes=0&scrollbar=1&zoom=page-width
  const viewerSrc = `${item.src}#toolbar=1&navpanes=0&scrollbar=1&zoom=page-width`;

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

        {/* Viewer alanı */}
        <div className="pdf-view">
          {/* 1) Tarayıcı destekliyorsa yerleşik görüntüleyici */}
          <iframe
            className="pdf-frame"
            title={item.title || item.slug}
            src={viewerSrc}
          />

          {/* 2) Fallback: embed (bazı ortamlar iframe yerine embed'i seviyor) */}
          <embed className="pdf-embed" src={item.src} type="application/pdf" />

          {/* 3) Son çare: Link ver */}
          <div className="pdf-fallback">
            PDF görüntülenemedi. <a href={item.src} target="_blank" rel="noopener noreferrer">Buradan aç</a> veya
            <a href={item.src} download> indir</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
