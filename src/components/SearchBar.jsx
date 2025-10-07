import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveQuery } from "../data/failler";
import { resolveEvidenceCode } from "../data/evidence";
import { resolvePhotoEvidenceSlug } from "../data/photoEvidence"; // 👈 yeni
import { resolvePdfSlug } from "../data/pdf"; // 👈 ekle
import { resolvePicSlug } from "../data/foto"; // 👈 yeni


export default function SearchBar({ autoFocus = true }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const input = q.trim();
    const lower = input.toLowerCase();

    // 1) Kanıt kodu mu? (DFGR2 vb.)
    const code = resolveEvidenceCode(lower);
    if (code) {
      navigate(`/e/${code}`);
      return;
    }

    // 2) Fotoğraflı delil mi? (slug/alias -> /photo/:id)
    const photoSlug = resolvePhotoEvidenceSlug(lower);
    if (photoSlug) {
      navigate(`/photo/${photoSlug}`);
      return;
    }

    const picSlug = resolvePicSlug(lower);
    if (picSlug) {
      navigate(`/pic/${picSlug}`);
      return;
    }

    // 3) Video mu? (örnek: sktret / mtsh)
    if (lower === "sktret" || lower === "mtsh") {
      navigate(`/video/${lower}`);
      return;
    }
    // 4) PDF mi?
    const pdfSlug = resolvePdfSlug(lower);
    if (pdfSlug) {
      navigate(`/pdf/${pdfSlug}`);
     return;
    }



    // 4) Profil mi?
    const slug = resolveQuery(lower);
    if (slug) {
      navigate(`/p/${slug}`);
      return;
    }
    if (lower === "qprfc") {
       navigate("/videofeed");
      return;
    }
    if (lower === "plara") {
    navigate("/olayyeri");
    return;
   }
   

    // 5) Hiçbiri değilse: sonuç yok
    const params = new URLSearchParams({ q: lower });
    navigate(`/no-results?${params.toString()}`);

  }

  return (
    <form className="search-wrap" onSubmit={onSubmit} role="search">
      <input
        className="search-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Ara (ör: "Ulvi Plevneli")'
        aria-label="Arama"
        autoFocus={autoFocus}
      />
      <button className="search-btn" type="submit" aria-label="Ara">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="20"
          height="20"
          style={{ marginRight: 6 }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Ara
      </button>
    </form>
  );
}
