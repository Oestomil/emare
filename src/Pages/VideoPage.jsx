// src/Pages/VideoPage.jsx
import { useParams } from "react-router-dom";
import "./Video.css";

export default function VideoPage() {
  const { videoId } = useParams();

  return (
    <div className="video-wrap">
      <div className="video-card">
        <div className="card-glow" />
        <h2 style={{ marginBottom: "1rem" }}>Video: {videoId}.mp4</h2>

        <div className="video-frame">
          <video className="video-el" controls autoPlay>
            <source src={`/videos/${videoId}.mp4`} type="video/mp4" />
            Tarayıcınız video oynatmayı desteklemiyor.
          </video>
        </div>
      </div>
    </div>
  );
}
