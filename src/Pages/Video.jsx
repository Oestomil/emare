import { useRef, useEffect, useState } from "react";
import "./Video.css";

export default function Video() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Space tuşu ile oynat/duraklat
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="video-wrap">
      {/* sol üst küçük logo (isteğe bağlı) */}
      <div className="brand">
        <span className="brand-hand">Emare</span>
        <span className="brand-underline" />
      </div>

      <div className="video-card">
        <div className="card-glow" />
        <header className="video-header">
          <h2>Olay Kaydı</h2>
          <p className="muted">Panel içinde video oynatıcı</p>
        </header>

        <div className="video-frame">
          <video
            ref={videoRef}
            className="video-el"
            controls
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            poster="/poster.jpg"                     // (opsiyonel) public/poster.jpg
          >
            {/* Örnek dosya: public/videos/sample.mp4 */}
            <source src="/videos/sample.mp4" type="video/mp4" />
            {/* Altyazı örneği: public/captions/tr.vtt */}
            <track
              kind="subtitles"
              srcLang="tr"
              label="Türkçe"
              src="/captions/tr.vtt"
              default
            />
            Tarayıcınız video etiketini desteklemiyor.
          </video>

          {/* Kocaman ortadaki oynat/duraklat butonu (isteğe bağlı) */}
          <button
            className="playtoggle"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.paused ? v.play() : v.pause();
            }}
            aria-label={playing ? "Duraklat" : "Oynat"}
          >
            {playing ? "❚❚" : "►"}
          </button>
        </div>

        <footer className="site-footer">
          Bu site Emniyet Birimleri için özel tasarlanmıştır.
        </footer>
      </div>
    </div>
  );
}
