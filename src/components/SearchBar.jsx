import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveQuery } from "../data/failler";
import { resolveEvidenceCode } from "../data/evidence";

export default function SearchBar({ autoFocus = true }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const input = q.trim().toLowerCase();

    // 1) Kanıt kodu mu? (DFGR2 gibi)
    const code = resolveEvidenceCode(input);
    if (code) {
      navigate(`/e/${code}`);
      return;
    }

    // 2) Video mu? (sktret / mtsh)
    if (input === "sktret" || input === "mtsh") {
      navigate(`/video/${input}`);
      return;
    }

    // 3) Profil mi?
    const slug = resolveQuery(input);
    if (slug) {
      navigate(`/p/${slug}`);
      return;
    }
    if (input === "foto1") {
    navigate("/photo/photo1");
    return;
    }
      if (input === "foto2") {
  navigate("/photo/photo2");
  return;
    }

    // 4) Hiçbiri değilse: sonuç yok
    const params = new URLSearchParams({ q: input });
    navigate(`/no-results?${params.toString()}`);
  }

  return (
    <form className="search-wrap" onSubmit={onSubmit} role="search">
      <input
        className="search-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Ara (ör: "Ulvi Plevneli" ya da "QPRFC")'
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
