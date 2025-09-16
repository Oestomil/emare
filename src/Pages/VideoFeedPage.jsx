import { VIDEO_FEED } from "../data/videoFeed";
import "./VideoFeedPage.css";

export default function VideoFeedPage() {
  return (
    <div className="feed-wrap">
      {VIDEO_FEED.map((v) => (
        <div key={v.id} className="feed-item">
          <video
            src={v.src}
            className="feed-video"
            controls
            preload="auto"
            playsInline
          />
          <div className="feed-meta">
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
