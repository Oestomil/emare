import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveQuery } from "../data/failler";
import { resolveEvidenceCode } from "../data/evidence";

import { resolvePdfSlug } from "../data/pdf";
import { resolvePicSlug } from "../data/foto";
import { resolveVideoSlug } from "../data/video";

export default function SearchBar({ autoFocus = true }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const input = q.trim();
    const lower = input.toLowerCase();

    // 1) Kanıt kodu
    const code = resolveEvidenceCode(lower);
    if (code) { navigate(`/e/${code}`); return; }


    // 2.5) Yeni PIC
    const picSlug = resolvePicSlug(lower);
    if (picSlug) { navigate(`/pic/${picSlug}`); return; }



    // 4) PROFİL (isim yazınca buraya düşmeli)
    const profileSlug = resolveQuery(lower);
    if (profileSlug) { navigate(`/p/${profileSlug}`); return; }

    // 5) PDF — SADECE TAM SLUG! (örn: USTMEL, AGPEZ, ulviadli)
    const pdfSlug = resolvePdfSlug(input); // orijinali veriyoruz ki büyük/küçük önemsiz olsun
    if (pdfSlug) { navigate(`/pdf/${pdfSlug}`); return; }

   const videoSlug = resolveVideoSlug(lower);
    if (videoSlug) {
       navigate(`/video/${videoSlug}`);
     return;
   }

    // 6) diğer kısayollar
    if (lower === "qprfc") { navigate("/videofeed"); return; }
    if (lower === "emare") { navigate("/olayyeri"); return; }
    if (lower === "iuahab") { navigate("/pdf/kamiladli"); return; }


    // 7) sonuç yok
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
        <svg className="search-icon" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             width="20" height="20" style={{ marginRight: 6 }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Ara
      </button>
    </form>
  );
}
