import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./MisFavoritos.css";
import { useNavigate } from "react-router-dom";

function MisFavoritos() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔒 Protección
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <section className="favoritos-container">
      <h1>Mis favoritos</h1>

      <p className="info">
        Aquí aparecerán tus productos favoritos ❤️  
        (Implementación lista para cuando me digas si va a BD o localStorage)
      </p>
    </section>
  );
}

export default MisFavoritos;
