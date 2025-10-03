// src/Pages/FinalConfession.jsx
import {useRef, useState } from "react";

export default function FinalConfession() {
  const videoRef = useRef(null);
  const [ended, setEnded] = useState(false);

  return (
    <div className="center-screen" style={{ textAlign: "center", padding: 20 }}>
      {!ended ? (
        <video
          ref={videoRef}
          src="/kandirdim.mp4"
          autoPlay
          controls
          style={{ maxWidth: "90%", borderRadius: "12px", boxShadow: "0 12px 40px rgba(0,0,0,.4)" }}
          onEnded={() => setEnded(true)}
        />
      ) : (
        <div className="card" style={{ maxWidth: 720, textAlign: "left" }}>
          <h1 style={{ color: "var(--accent)" }}>İtiraf Mektubu</h1>
          <p>
            Sevgili Dedektif,
          </p>
          <p>
            Tüm bu süre boyunca izleri dikkatle takip ettiğini biliyordum. Ama bilmen gereken bir şey var:
            her bulduğun delil, seni adım adım benim planıma yaklaştırıyordu. 
            Senin zekânı küçümsemek istemem ama bazen en bariz olanı görmek en zorudur.
          </p>
          <p>
            Evet, bu oyunu başından beri ben kurdum. Katilin kim olduğunu, kimin azmettirdiğini
            düşündün, notlar aldın, sorguladın... Fakat gerçek, her zaman gölgelerde saklıydı.
          </p>
          <p>
            Cinayet, sadece bir eylem değil; bir mesajdır. Ve sen, o mesajı nihayet okudun.
          </p>
          <p>
            <em>
              “İzler, sabırsız olanı cezalandırır...”
            </em>
          </p>
          <p>
            — İmzasız
          </p>
        </div>
      )}
    </div>
  );
}
