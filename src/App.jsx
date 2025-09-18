import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Yeni sayfalar
import Landing from "./Pages/Landing.jsx";       // 🔸 yeni ana sayfa (login)
import SearchPage from "./Pages/SearchPage.jsx"; // 🔸 eski Home içerikleri burada

// Mevcut sayfalar
import NoResults from "./Pages/NoResults.jsx";
import Profile from "./Pages/Profile.jsx";
import EvidencePage from "./Pages/EvidencePage.jsx";
import GatePage from "./Pages/GatePage.jsx";
import Video from "./Pages/Video.jsx"
import VideoPage from "./Pages/VideoPage.jsx";
import GatePanel from "./Pages/GatePanel.jsx";
import PhotoPanel from "./Pages/PhotoPanel.jsx";  
import VideoFeedPage from "./Pages/VideoFeedPage.jsx";
import Insta from "./Pages/Insta.jsx";
import InstaHotspots from "./Pages/InstaHotspots.jsx";
import BirinciTelefon from "./Pages/BirinciTelefon.jsx";




export default function App() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formatted);
    }
    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <Link to="/" aria-label="Emare anasayfa">
          <img
            src="/banner.svg"
            alt="Emare"
            style={{ width: 100, height: "auto", display: "block" }}
          />
        </Link>
        <span className="badge">{time}</span>
      </header>

      {/* Rotalar */}
      <Routes>
        {/* 🔸 Yeni ana sayfa */}
        <Route index element={<Landing />} />

        {/* 🔸 Arama sayfası (eski Home) */}
        <Route path="/search" element={<SearchPage />} />

        {/* Diğerleri */}
        <Route path="/no-results" element={<NoResults />} />
        <Route path="/p/:slug" element={<Profile />} />
        <Route path="/e/:slug" element={<EvidencePage />} />
        <Route path="/gate" element={<GatePage />} />
        <Route path="/video" element={<Video />} />   
         <Route path="/video/:videoId" element={<VideoPage />} />
         <Route path="/gate-panel" element={<GatePanel />} />
          <Route path="/photo/:photoId" element={<PhotoPanel />} />
          <Route path="/videofeed" element={<VideoFeedPage />} />

          <Route path="/insta/:name" element={<InstaHotspots />} />
          <Route path="/birincitelefon" element={<BirinciTelefon />} />
          




        {/* Eski linkler için örnek yönlendirme (gerekirse) */}
        <Route path="/s/gate" element={<Navigate to="/gate" replace />} />

        {/* 404 → ana sayfa */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
