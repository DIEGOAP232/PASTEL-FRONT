import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function TopBar() {

  const { isAuthenticated, usuario, logout } = useContext(AuthContext);

  return (
    <div className="topbar">
      
      {/* LOGO */}
      <Link to="/" className="topbar-logo">
        Pastelería Esencia
      </Link>

      {/* BUSCADOR */}
      <div className="topbar-search">
        <input 
          type="text" 
          placeholder="Buscar productos..." 
        />
        <button className="search-btn">
          🔍
        </button>
      </div>

      {/* ICONOS DERECHA */}
      <div className="topbar-icons">

        {/* USUARIO NO AUTENTICADO */}
        {!isAuthenticated && (
          <Link to="/login" className="icon-item">
            👤 <span>Iniciar Sesión</span>
          </Link>
        )}

        {/* USUARIO AUTENTICADO */}
        {isAuthenticated && (
          <>
            <div className="icon-item">
              👤 <span>{usuario.nombre}</span>
            </div>

            {usuario.rolNombre === "ADMIN" && (
              <Link to="/admin" className="icon-item">
                🛠 <span>Admin</span>
              </Link>
            )}

            <button className="icon-item logout-btn" onClick={logout}>
              ❌ <span>Cerrar</span>
            </button>
          </>
        )}

        {/* Carrito y Favoritos */}
        <Link to="/carrito" className="icon-item">
          🛒 <span>Carrito</span>
        </Link>

        <Link to="/favoritos" className="icon-item">
          ❤️ <span>Favoritos</span>
        </Link>

      </div>
    </div>
  );
}

export default TopBar;
