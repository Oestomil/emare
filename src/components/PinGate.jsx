import { useEffect, useRef, useState } from "react";
import styles from "./PinGate.module.css";

/**
 * PIN Gate (4 kutucuk varsayılan)
 * Props:
 *  - length?: number (default 4)
 *  - onSubmit?: (code: string) => void
 *  - placeholder?: string (default "–")
 *  - title?: string
 *  - subtitle?: string
 *  - footnote?: string
 *  - inputMode?: "latin" | "numeric" (default "latin")
 */
export default function PinGate({
  length = 4,
  onSubmit,
  placeholder = "–",
  title = "Erişim Sınırlandırılmıştır",
  subtitle = "Devam edebilmek için kodunuzu giriniz.",
  footnote = "Bu site Emniyet Genel Müdürlüğü tarafından yaptırılmıştır.*",
  inputMode = "latin",
}) {
  const [vals, setVals] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  // ilk inputa odaklan
  useEffect(() => {
    inputs.current?.[0]?.focus();
  }, []);

  // tüm kutular dolunca tetikle
  useEffect(() => {
    if (vals.length === length && vals.every(Boolean)) {
      onSubmit?.(vals.join(""));
    }
  }, [vals, length, onSubmit]);

  // bir kutucuk değiştiğinde
  function handleChange(i, v) {
    const clean = (v || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) return;
    setVals((prev) => {
      const next = [...prev];
      next[i] = clean.slice(-1);
      return next;
    });
    // sonraki inputa geç
    inputs.current[i + 1]?.focus();
  }

  // klavye davranışları
  function handleKeyDown(i, e) {
    if (e.key === "Backspace") {
      e.preventDefault();
      setVals((prev) => {
        const next = [...prev];
        if (next[i]) {
          next[i] = "";
        } else if (i > 0) {
          next[i - 1] = "";
          inputs.current[i - 1]?.focus();
        }
        return next;
      });
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      inputs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      inputs.current[i + 1]?.focus();
    }
    if (e.key === "Enter" && vals.every(Boolean)) {
      onSubmit?.(vals.join(""));
    }
  }

  // çoklu yapıştırma (örn: "8LSU")
  function handlePaste(e) {
    const data = (e.clipboardData.getData("text") || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, length);
    if (!data) return;
    e.preventDefault();
    const arr = Array(length).fill("");
    for (let i = 0; i < data.length; i++) arr[i] = data[i];
    setVals(arr);
    inputs.current[Math.min(data.length, length - 1)]?.focus();
  }

  return (
    <div className={styles.wrap}>
      {/* kilit ikonu */}
      <div className={styles.lock} aria-hidden>
        <svg viewBox="0 0 100 100" className={styles.lockSvg}>
          <rect x="22" y="42" width="56" height="44" rx="8" />
          <path d="M32 42 v-8 a18 18 0 0 1 36 0 v8" fill="none" strokeWidth="6" />
        </svg>
      </div>

      {/* metinler */}
      <div className={styles.texts}>
        {title && <div className={styles.title}>{title}</div>}
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>

      {/* giriş kutuları */}
      <div className={styles.inputs} onPaste={handlePaste}>
        {vals.map((ch, i) => (
          <div
            key={i}
            className={styles.oct}
            onClick={() => inputs.current[i]?.focus()}
          >
            <input
              ref={(el) => (inputs.current[i] = el)}
              className={styles.inp}
              inputMode={inputMode}
              autoComplete="one-time-code"
              maxLength={1}
              value={ch}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`kod ${i + 1}`}
            />
            {!ch && <span className={styles.placeholder}>{placeholder}</span>}
          </div>
        ))}
      </div>

      {footnote && <div className={styles.footnote}>{footnote}</div>}
    </div>
  );
}
