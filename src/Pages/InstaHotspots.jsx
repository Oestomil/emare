import { useParams, Link } from "react-router-dom";
import instaHotspots from "../data/instaHotspots";
import HotspotImage from "../components/HotspotImage";

export default function InstaHotspots(){
  const { name } = useParams();
  const entry = instaHotspots[name];

  if(!entry){
    // kişi yoksa basit seçim ekranı
    const keys = Object.keys(instaHotspots);
    return (
      <div style={{padding:24,color:"#e9eefb",background:"#0c1320",minHeight:"100dvh"}}>
        <h2>Profil Seç</h2>
        <ul>
          {keys.map(k => <li key={k}><Link to={`/insta/${k}`}>/insta/{k}</Link></li>)}
        </ul>
      </div>
    );
  }

  return (
    <div style={{padding:16,background:"#0c1320",minHeight:"100dvh"}}>
      <HotspotImage src={entry.bg} boxes={entry.boxes} />
    </div>
  );
}
