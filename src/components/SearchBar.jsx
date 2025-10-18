import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resolveQuery } from "../data/failler";
import { resolveEvidenceCode } from "../data/evidence";
import { resolvePdfSlug } from "../data/pdf";
import { resolvePicSlug } from "../data/foto";
import { resolveVideoSlug } from "../data/video";

/** ====== Basit yerel hafıza (kullanıcıya özel anahtar destekli) ====== */
const RECENT_KEY = (userId) => `emare:recentSearches:${userId || "anon"}`;
const RECENT_LIMIT = 10;
function loadRecent(userId = "anon") {
  try {
    const raw = localStorage.getItem(RECENT_KEY(userId));
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter(x => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function saveRecent(term, userId = "anon") {
  const t = (term || "").trim();
  if (!t) return;
  const key = RECENT_KEY(userId);
  let list = loadRecent(userId);
  list = [t, ...list.filter(x => x.toLowerCase() !== t.toLowerCase())];
  if (list.length > RECENT_LIMIT) list = list.slice(0, RECENT_LIMIT);
  localStorage.setItem(key, JSON.stringify(list));
}

/**
 * Props:
 * - autoFocus?: boolean
 * - currentUserId?: string  // istersen login UID gibi ver; vermezsen "anon"
 */
export default function SearchBar({ autoFocus = true, currentUserId = "anon" }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [recent, setRecent] = useState(() => loadRecent(currentUserId));
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRecent(loadRecent(currentUserId));
  }, [currentUserId]);

  // dışarı tık → kapat
  useEffect(() => {
    function onClick(e) {
      const inside =
        (listRef.current && listRef.current.contains(e.target)) ||
        (inputRef.current && inputRef.current.contains(e.target));
      if (!inside) {
        setOpen(false);
        setHoverIndex(-1);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const suggestions = useMemo(() => {
    const val = q.trim().toLowerCase();
    const base = recent;
    if (!val) return base;
    const starts = base.filter(t => t.toLowerCase().startsWith(val));
    const includes = base.filter(
      t => !starts.includes(t) && t.toLowerCase().includes(val)
    );
    return [...starts, ...includes];
  }, [q, recent]);

  function performNavigate(input) {
    const term = input.trim();
    const lower = term.toLowerCase();


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
    const pdfSlug = resolvePdfSlug(term); // orijinali veriyoruz
    if (pdfSlug) { navigate(`/pdf/${pdfSlug}`); return; }

    // 5.5) Video
    const videoSlug = resolveVideoSlug(lower);
    if (videoSlug) { navigate(`/video/${videoSlug}`); return; }

    // 6) diğer kısayollar
    if (lower === "qprfc") { navigate("/videofeed"); return; }
    if (lower === "emare") { navigate("/olayyeri"); return; }
    if (lower === "iuahab") { navigate("/pdf/kamiladli"); return; }
    if (lower === "lab-1") { navigate("/lab"); return; }
    if (lower === "KNF33") { navigate("/scene/knF33"); return; }
    if (lower === "knf33") { navigate("/scene/knf33"); return; }

    // 7) sonuç yok
    const params = new URLSearchParams({ q: lower });
    navigate(`/no-results?${params.toString()}`);
  }

  function onSubmit(e) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    saveRecent(term, currentUserId);
    setRecent(loadRecent(currentUserId));
    setOpen(false);
    setHoverIndex(-1);
    performNavigate(term);
  }

  function onPick(term) {
    setQ(term);
    saveRecent(term, currentUserId);
    setRecent(loadRecent(currentUserId));
    setOpen(false);
    setHoverIndex(-1);
    performNavigate(term);
  }

  function onKeyDown(e) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHoverIndex(i => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHoverIndex(i => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (hoverIndex >= 0) {
        e.preventDefault();
        onPick(suggestions[hoverIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHoverIndex(-1);
    }
  }

  return (
    <div className="search-wrap-outer" style={{ position: "relative" }}>
      <form className="search-wrap" onSubmit={onSubmit} role="search" autoComplete="off">
        <input
          ref={inputRef}
          className="search-input"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
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

      {open && suggestions.length > 0 && (
        <div
          ref={listRef}
          className="search-dropdown"
          role="listbox"
          aria-label="Son aramalar"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            maxHeight: "56vh",
            overflow: "auto",
            background: "var(--dropdown-bg, #0b1224)",
            border: "1px solid rgba(109,123,255,.25)",
            borderRadius: 12,
            boxShadow: "0 12px 40px rgba(0,0,0,.35)",
            padding: 4,
            zIndex: 50
          }}
        >
          {suggestions.map((s, idx) => (
            <button
              key={`${s}-${idx}`}
              className={`search-item ${idx === hoverIndex ? "search-item-active" : ""}`}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(-1)}
              onClick={() => onPick(s)}
              role="option"
              aria-selected={idx === hoverIndex}
              title={s}
              style={{
                width: "100%",
                textAlign: "left",
                background: "transparent",
                color: "var(--fg, #e9eefc)",
                border: 0,
                padding: "10px 12px",
                borderRadius: 10,
                display: "grid",
                gridTemplateColumns: "22px 1fr",
                gap: 8,
                cursor: "pointer"
              }}
            >
              <span aria-hidden>🕘</span>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {s}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
