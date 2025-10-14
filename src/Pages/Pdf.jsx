// pages/Pdf.jsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPdfBySlug } from "../data/pdf";
import "./Pdf.css";

import { Document, Page, pdfjs } from "react-pdf";
// Vite/webpack için worker (Vite'te ?url gerekli)
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function Pdf() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const item = useMemo(() => getPdfBySlug(slug), [slug]);
  const isPdf = (item?.type || "pdf") === "pdf";
  const src = item?.src;

  // State
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [fit, setFit] = useState("width"); // "width" | "page"
  const [showThumbs, setShowThumbs] = useState(true);
  const [autoPage, setAutoPage] = useState(true); // otomatik sayfa geçişi
  const [error, setError] = useState(null);
  const [loadingDoc, setLoadingDoc] = useState(!!isPdf);

  // Ölçüm & scroll referansları
  const viewRef = useRef(null);
  const pageWrapRef = useRef(null);
  const [wrapW, setWrapW] = useState(0);
  const [wrapH, setWrapH] = useState(0);

  // Auto-switch kontrol
  const autoLockRef = useRef(null); // "next" | "prev" | null
  const prevScrollTopRef = useRef(0);
  const AUTO_SWITCH_THRESHOLD = 96;
  const AUTO_COOLDOWN_MS = 350;

  // Boyut değişikliklerini dinle
  useEffect(() => {
    if (!pageWrapRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const box = entries[0].contentRect;
      setWrapW(box.width);
      setWrapH(box.height);
    });
    obs.observe(pageWrapRef.current);
    return () => obs.disconnect();
  }, []);

  // Slug değişince reset
  useEffect(() => {
    setPageNumber(1);
    setScale(1);
    setFit("width");
    setError(null);
    setLoadingDoc(!!isPdf);
  }, [slug, isPdf]);

  // Belge yüklendi
  const onDocLoad = ({ numPages }) => {
    setNumPages(numPages);
    setLoadingDoc(false);
  };
  const onDocError = (e) => {
    setError(e?.message || "PDF yüklenemedi.");
    setLoadingDoc(false);
  };

  // Zoom
  const zoomIn = () => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.4, +(s - 0.1).toFixed(2)));
  const resetZoom = () => setScale(1);

  // Sayfa
  const goPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goNext = () => setPageNumber((p) => Math.min(numPages || 1, p + 1));

  // Tam ekran
  const toggleFullscreen = useCallback(() => {
    const el = viewRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.();
  }, []);

  // Klavye kısayolları
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === "arrowleft") goPrev();
      else if (k === "arrowright") goNext();
      else if (k === "+") zoomIn();
      else if (k === "-") zoomOut();
      else if (k === "0") resetZoom();
      else if (k === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPages]);

  // Scroll ile otomatik sayfa geçişi
  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!autoPage || loadingDoc || !numPages) return;
      const st = el.scrollTop;
      const dir = st > prevScrollTopRef.current ? "down" : st < prevScrollTopRef.current ? "up" : "none";
      prevScrollTopRef.current = st;

      // aşağı → sonraki
      if (
        dir === "down" &&
        autoLockRef.current === null &&
        pageNumber < (numPages || 1) &&
        st + el.clientHeight >= el.scrollHeight - AUTO_SWITCH_THRESHOLD
      ) {
        autoLockRef.current = "next";
        setPageNumber((p) => Math.min(p + 1, numPages || 1));
        setTimeout(() => (autoLockRef.current = null), AUTO_COOLDOWN_MS);
        return;
      }
      // yukarı → önceki
      if (
        dir === "up" &&
        autoLockRef.current === null &&
        pageNumber > 1 &&
        st <= AUTO_SWITCH_THRESHOLD
      ) {
        autoLockRef.current = "prev";
        setPageNumber((p) => Math.max(p - 1, 1));
        setTimeout(() => (autoLockRef.current = null), AUTO_COOLDOWN_MS);
        return;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [autoPage, loadingDoc, numPages, pageNumber]);

  // Sayfa değişince scroll konumu ayarla
  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    if (autoLockRef.current === "next") {
      el.scrollTop = 0;
    } else if (autoLockRef.current === "prev") {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    } else {
      // manuel değişim → üstten başlat
      el.scrollTop = 0;
    }
    const t = setTimeout(() => (autoLockRef.current = null), AUTO_COOLDOWN_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  // Mouse wheel ile ctrl+scroll zoom (masaüstü)
  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (!e.ctrlKey) return; // ctrl+scroll → zoom
      e.preventDefault();
      const delta = -e.deltaY;
      if (delta > 0) zoomIn();
      else zoomOut();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Touch pinch yakınlaştırma (basit)
  useEffect(() => {
    const el = viewRef.current;
    if (!el) return;
    let lastDist = null;

    const onTouchMove = (e) => {
      if (e.touches.length !== 2) {
        lastDist = null;
        return;
      }
      const [a, b] = e.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      if (lastDist) {
        const diff = dist - lastDist;
        if (Math.abs(diff) > 2) {
          if (diff > 0) setScale((s) => Math.min(3, +(s + 0.03).toFixed(2)));
          else setScale((s) => Math.max(0.4, +(s - 0.03).toFixed(2)));
        }
      }
      lastDist = dist;
    };

    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, []);

  // Not found
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

  return (
    <div className="pdf-wrap">
      <div className="pdf-card">
        {/* ÜST BAR */}
        <div className="pdf-top">
          <button className="pdf-btn" onClick={() => navigate(-1)}>← Geri</button>
          <div className="pdf-meta">
            <div className="pdf-title">{item.title || item.slug}</div>
            {item.note && <div className="pdf-sub">{item.note}</div>}
          </div>
          <div className="pdf-actions">
            {isPdf && (
              <button className="pdf-btn" onClick={() => setShowThumbs((v) => !v)}>
                {showThumbs ? "Önizlemeleri Gizle" : "Önizlemeleri Göster"}
              </button>
            )}
            <a className="pdf-btn" href={src} target="_blank" rel="noopener noreferrer">Yeni Sekmede Aç</a>
            <a className="pdf-btn pdf-btn--accent" href={src} download>İndir</a>
          </div>
        </div>

        {/* TOOLBAR */}
        {isPdf && (
          <div className="pdf-toolbar">
            <div className="group">
              <button className="pdf-icon" onClick={goPrev} disabled={pageNumber <= 1} title="Önceki (←)">⟨</button>
              <span className="pdf-pageinfo">
                <input
                  className="pdf-pageinput"
                  type="number"
                  min={1}
                  max={numPages || 1}
                  value={pageNumber}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (!Number.isFinite(v)) return;
                    setPageNumber(Math.min(Math.max(1, v), numPages || 1));
                  }}
                />
                <span> / {numPages || "?"}</span>
              </span>
              <button className="pdf-icon" onClick={goNext} disabled={!numPages || pageNumber >= numPages} title="Sonraki (→)">⟩</button>
            </div>

            <div className="group">
              <button className="pdf-icon" onClick={zoomOut} title="Uzaklaştır (-)">−</button>
              <span className="pdf-zoom">{Math.round(scale * 100)}%</span>
              <button className="pdf-icon" onClick={zoomIn} title="Yakınlaştır (+)">＋</button>
              <button className="pdf-icon" onClick={resetZoom} title="%100 (0)">⟲</button>
            </div>

            <div className="group">
              <button
                className={`pdf-chip ${fit === "width" ? "is-active" : ""}`}
                onClick={() => setFit("width")}
                title="Genişliğe sığdır"
              >
                Genişliğe Sığdır
              </button>
              <button
                className={`pdf-chip ${fit === "page" ? "is-active" : ""}`}
                onClick={() => setFit("page")}
                title="Sayfaya sığdır"
              >
                Sayfaya Sığdır
              </button>
            </div>

            <div className="group">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={autoPage}
                  onChange={(e) => setAutoPage(e.target.checked)}
                />
                <span>Oto Sayfa Geçişi</span>
              </label>
            </div>

            <div className="group ml-auto">
              <button className="pdf-icon" onClick={toggleFullscreen} title="Tam Ekran (F)">⛶</button>
            </div>
          </div>
        )}

        {/* GÖRÜNÜM */}
        <div className="pdf-shell">
          {isPdf && showThumbs && (
            <aside className="pdf-thumbs">
              <div className="pdf-thumbs-scroll">
                <Document file={src} onLoadError={() => {}} loading={null}>
                  {Array.from(new Array(numPages || 0), (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      className={`thumb-item ${n === pageNumber ? "is-active" : ""}`}
                      onClick={() => setPageNumber(n)}
                      title={`Sayfa ${n}`}
                    >
                      <Page
                        pageNumber={n}
                        width={110}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={<div className="thumb-skel" />}
                      />
                      <span className="thumb-num">{n}</span>
                    </button>
                  ))}
                </Document>
              </div>
            </aside>
          )}

          <div className="pdf-view" ref={viewRef}>
            {!isPdf ? (
              // Görsel tipi için viewer
              <div className="img-view">
                <img className="img-el" src={src} alt={item.title || item.slug} loading="lazy" />
                <div className="img-fallback">
                  Görsel yüklenemedi.{" "}
                  <a href={src} target="_blank" rel="noopener noreferrer">Buradan aç</a> veya
                  <a href={src} download> indir</a>.
                </div>
              </div>
            ) : error ? (
              // PDF.js hata → iframe/embed fallback
              <div className="pdf-fallback-outer">
                <div className="pdf-fallback-msg">PDF iç gömme başarısız: {error}</div>
                <iframe
                  className="pdf-frame"
                  title={item.title || item.slug}
                  src={`${src}#toolbar=1&navpanes=0&scrollbar=1&zoom=page-width`}
                />
                <embed className="pdf-embed" src={src} type="application/pdf" />
                <div className="pdf-fallback">
                  PDF görüntülenemedi.{" "}
                  <a href={src} target="_blank" rel="noopener noreferrer">Buradan aç</a> veya
                  <a href={src} download> indir</a>.
                </div>
              </div>
            ) : (
              <div className="pdf-page-wrap" ref={pageWrapRef}>
                <Document
                  file={src}
                  onLoadSuccess={onDocLoad}
                  onLoadError={onDocError}
                  loading={<div className="pdf-loading">Yükleniyor…</div>}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={fit === "width" ? Math.floor(wrapW * scale) : undefined}
                    height={fit === "page" ? Math.floor((wrapH - 8) * scale) : undefined}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={<div className="pdf-skel">Yükleniyor…</div>}
                  />
                </Document>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
