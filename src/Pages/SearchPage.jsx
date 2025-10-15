import SearchBar from "../components/SearchBar.jsx";

export default function Home() {
  // örnek: const uid = auth?.currentUser?.uid || "anon";
  const uid = "anon";

  return (
    <div className="center-screen">
      <img
        src="./banner.svg"
        alt="Emare"
        className="logo-text logo-alt1"
      />
      <div style={{ width: "100%", maxWidth: 600 }}>
        <SearchBar currentUserId={uid} />
      </div>
    </div>
  );
}
