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
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function saveRecent(term, userId = "anon") {
  const t = (term || "").trim();
  if (!t) return;
  const key = RECENT_KEY(userId);
  let list = loadRecent(userId);
  list = [t, ...list.filter((x) => x.toLowerCase() !== t.toLowerCase())];
  if (list.length > RECENT_LIMIT) list = list.slice(0, RECENT_LIMIT);
  localStorage.setItem(key, JSON.stringify(list));
}

// ✅ Tamamını temizle
function clearRecent(userId = "anon") {
  localStorage.removeItem(RECENT_KEY(userId));
}

// ✅ Tek tek sil
function removeOneRecent(term, userId = "anon") {
  const key = RECENT_KEY(userId);
  const list = loadRecent(userId).filter(
    (x) => x.toLowerCase() !== (term || "").toLowerCase()
  );
  localStorage.setItem(key, JSON.stringify(list));
}

/**
 * Props:
 * - autoFocus?: boolean
 * - currentUserId?: string
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
    const starts = base.filter((t) => t.toLowerCase().startsWith(val));
    const includes = base.filter(
      (t) => !starts.includes(t) && t.toLowerCase().includes(val)
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

    // 4) PROFİL
    const profileSlug = resolveQuery(lower);
    if (profileSlug) { navigate(`/p/${profileSlug}`); return; }

    // 5) PDF (tam slug)
    const pdfSlug = resolvePdfSlug(term);
    if (pdfSlug) { navigate(`/pdf/${pdfSlug}`); return; }

    // 5.5) Video
    const videoSlug = resolveVideoSlug(lower);
    if (videoSlug) { navigate(`/video/${videoSlug}`); return; }

    // 6) kısayollar
    if (lower === "qprfc") { navigate("/videofeed"); return; }
    if (lower === "emare") { navigate("/olayyeri"); return; }
    if (lower === "iuahab") { navigate("/pdf/kamiladli"); return; }
    if (lower === "lab-1") { navigate("/lab"); return; }
    if (lower === "KNF33" || lower === "knf33") { navigate("/scene/knf33"); return; }

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
      setHoverIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHoverIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
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

  // 🔘 tümünü temizle
  function onClearAll(e) {
    e.stopPropagation();
    clearRecent(currentUserId);
    setRecent([]);
    setHoverIndex(-1);
    // list açık kalsın; istersen setOpen(false) yapabilirsin
  }

  // ❌ tek satırı sil
  function onRemoveOne(e, term) {
    e.stopPropagation();
    removeOneRecent(term, currentUserId);
    setRecent(loadRecent(currentUserId));
    // hoverIndex düzelt
    setHoverIndex((i) => {
      if (i < 0) return i;
      const len = suggestions.length - 1;
      return len <= 0 ? -1 : Math.min(i, len - 1);
    });
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

        {/* Temizle butonu: input sağında küçük bir ikon */}
        {recent.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            aria-label="Son aramaları temizle"
            title="Son aramaları temizle"
            style={{
              position: "absolute",
              right: 96, // Ara butonuna çakışmasın diye
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: 0,
              cursor: "pointer",
              fontSize: 14,
              opacity: 0.85
            }}
          >
            🧹
          </button>
        )}

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
          {/* Başlık + Toplu Temizle */}
          <div
            style={{
              position: "sticky",
              top: 0,
              background: "inherit",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px dashed rgba(255,255,255,.08)",
              borderRadius: 8,
            }}
          >
            <span style={{ opacity: 0.8, fontSize: 12 }}>Son aramalar</span>
            <button
              type="button"
              onClick={onClearAll}
              className="search-clear-btn"
              aria-label="Tümünü temizle"
              title="Tümünü temizle"
              style={{
                background: "transparent",
                border: 0,
                color: "var(--fg, #e9eefc)",
                fontSize: 12,
                opacity: 0.9,
                cursor: "pointer",
                padding: "4px 6px",
              }}
            >
              Temizle
            </button>
          </div>

          {suggestions.map((s, idx) => (
            <div
              key={`${s}-${idx}`}
              style={{
                display: "grid",
                gridTemplateColumns: "22px 1fr 22px",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 10,
                background:
                  idx === hoverIndex ? "rgba(109,123,255,.10)" : "transparent",
              }}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(-1)}
            >
              <span aria-hidden>🕘</span>

              <button
                onClick={() => onPick(s)}
                title={s}
                role="option"
                aria-selected={idx === hoverIndex}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  color: "var(--fg, #e9eefc)",
                  border: 0,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  padding: 0,
                }}
              >
                {s}
              </button>

              <button
                aria-label={`${s} ifadesini listeden kaldır`}
                title="Bu ifadeyi kaldır"
                onClick={(e) => onRemoveOne(e, s)}
                style={{
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  opacity: 0.8,
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
