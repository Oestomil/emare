import { useParams, Link, useNavigate } from "react-router-dom";
import { PROFILES } from "../data/failler";
import "./Profile.css";

export default function Profile() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const p = PROFILES[slug];

  if (!p) {
    return (
      <div className="card" style={{ padding: 24 }}>
        <h2>Kayıt bulunamadı</h2>
        <p>Bu profil sistemde yok.</p>
        <Link className="btn" to="/">Ana sayfa</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-2">
      {/* Sol panel */}
      <aside className="card side">
        {/* Geri butonu */}
        <button className="btn" style={{ marginBottom: "12px" }} onClick={() => navigate(-1)}>
          ← Geri
        </button>

        <div className="photo">
          <img
            src={p.photo}
            alt={`${p.name} fotoğrafı`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="kv">
          <div className="row">
            <strong>Ad</strong>
            <span>{p.name}</span>
          </div>
          {p.birth && (
            <div className="row">
              <strong>Doğum</strong>
              <span>{p.birth.date} • {p.birth.place}</span>
            </div>
          )}
          {p.death && (
            <div className="row">
              <strong>Ölüm</strong>
              <span>{p.death.date} • {p.death.place}</span>
            </div>
          )}
          {p.tags?.length > 0 && (
            <div className="row">
              <strong>Baba & Anne</strong>
              <span>{p.tags.join(", ")}</span>
            </div>
          )}
          {p.education?.length > 0 && (
            <div className="row">
              <strong>Eğitim</strong>
              <span>
                {p.education.map((e, i) => <li key={i}>{e}</li>)}
              </span>
            </div>
          )}
        </div>
      </aside>

      {/* Sağ panel */}
      <main className="card main">
        <h2 className="title" style={{ marginTop: 0 }}>{p.name}</h2>
        {p.subtitle && <p className="sub">{p.subtitle}</p>}

        {/* Hakkında */}
        <section className="section">
          <h3 style={{ margin: "0 0 8px 0" }}>Hakkında</h3>
          <p style={{ margin: 0, whiteSpace: "pre-line" }}>{p.bio}</p>
        </section>

        {/* Projeler */}
        <section className="section">
          <h3 style={{ margin: "0 0 8px 0" }}>İlgili Dosyalar</h3>
          
          {p.projects?.length ? (
            p.projects.map((proj, i) => (
              <article key={i} className="article">
                {proj.url.match(/\.(jpg|pdf)$/i) ? (
                  <a href={proj.url} target="_blank" rel="noopener noreferrer">
                    {proj.title}
                  </a>
                ) : (
                  <Link to={`../${proj.url}`}>
                    {proj.title}
                  </Link>
                )}
              </article>
            ))
          ) : (
            <div className="empty">Dosya eklenmemiş.</div>
          )}
        </section>

        {/* Haberler */}
        <section className="section">
          <h3 style={{ margin: "0 0 4px 0" }}>Haberler</h3>
          {p.news?.length ? (
            p.news.map((n) => (
              <article key={n.id} className="article">
                <h4>{n.title}</h4>
                <div className="meta">{n.date} • {n.source}</div>
                <p style={{ margin: 0 }}>{n.snippet}</p>
              </article>
            ))
          ) : (
            <div className="empty">Haber kaydı eklenmemiş.</div>
          )}
        </section>
      </main>
    </div>
  );
}
