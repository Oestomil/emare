import { useParams, Link } from "react-router-dom";
import { EVIDENCE } from "../data/evidence";
import EvidenceViewer from "../components/EvidenceViewer";

export default function EvidencePage() {
  const { slug } = useParams();
  const data = EVIDENCE[slug];

  if (!data) {
    return (
      <div className="card" style={{ padding: 24 }}>
        <h2>Kayıt bulunamadı</h2>
        <p>Bu delil sayfası tanımlı değil: <strong>{slug}</strong></p>
        <Link className="btn" to="/">Ana sayfa</Link>
      </div>
    );
  }

  return (
    <EvidenceViewer
      code={data.code}
      subtitle={data.subtitle}
      footnote={data.footnote}
      cornerNumber={data.cornerNumber}
      images={data.images}
    />
  );
}
