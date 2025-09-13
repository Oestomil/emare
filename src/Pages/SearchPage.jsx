import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";

export default function Home() {
  return (
    <div className="center-screen">
      {/* Logomsu AvalFinder */}
      <img
        src="./banner.svg"
        alt="Emare"
        className="logo-text logo-alt1"
        style={{ width: "350px", height: "200px" }}
      />

      {/* Arama Çubuğu */}
      <div style={{ width: "100%", maxWidth: 600 }}>
        <SearchBar />
      </div>

      
    </div>
  );
}

