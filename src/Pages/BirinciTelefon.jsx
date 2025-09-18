import { useNavigate } from "react-router-dom";
import "./BirinciTelefon.css";

export default function BirinciTelefon() {
  const navigate = useNavigate();

  return (
    <div className="split-wrap">
      <div className="split-left" onClick={() => navigate("/e/ORTOTR")}>
        Azize Güner
      </div>
      <div className="split-right" onClick={() => navigate("/e/EU82HNS")}>
        Şen Plevneliler
      </div>
    </div>
  );
}
