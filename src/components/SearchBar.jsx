// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveQuery } from "../data/failler";
import { resolveEvidenceCode } from "../data/evidence";

export default function SearchBar({ autoFocus = true }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    // 1) Kanıt kodu mu? (DFGR2 gibi)
    const code = resolveEvidenceCode(q);
    if (code) {
      navigate(`/e/${code}`);
      return;
    }

    // 2) Profil mi?
    const slug = resolveQuery(q);
    if (slug) {
      navigate(`/p/${slug}`);
      return;
    }

    // 3) Hiçbiri değilse: sonuç yok
    const params = new URLSearchParams({ q });
    navigate(`/no-results?${params.toString()}`);
  }

  return (
    <form className="search-wrap" onSubmit={onSubmit} role="search">
      <input
        className="search-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Ara (ör: "Ulvi Plevneli ya da "QPRFC")'
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
