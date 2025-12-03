import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../../context/CartContext";

function TopBar() {

  const { isAuthenticated, usuario, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <div className="topbar">
      
      {/* LOGO */}
      <Link to="/" className="topbar-logo">
        Pastelería Esencia
      </Link>

      {/* BUSCADOR */}
      <div className="topbar-search">
        <input type="text" placeholder="Buscar productos..." />
        <button className="search-btn">🔍</button>
      </div>

      {/* ICONOS DERECHA */}
      <div className="topbar-icons">

        {/* USUARIO NO AUTENTICADO */}
        {!isAuthenticated && (
          <>
            <Link to="/register" className="icon-item">👤 <span>Registrarse</span></Link>
            <Link to="/login" className="icon-item">👤 <span>Iniciar Sesión</span></Link>
            <Link to="/carrito" className="icon-item">🛒 <span>Carrito({cart.length})</span></Link>
          </>
        )}

        {/* USUARIO AUTENTICADO */}
        {isAuthenticated && (
          <>
            {/* Nombre del usuario */}
            <div className="icon-item">
              👤 <span>{usuario.nombre}</span>
            </div>

            {/* SOLO CLIENTE (NO ADMIN) */}
            {usuario.rolNombre === "CLIENTE" && (
              <>
                <Link to="/mis-pedidos" className="icon-item">
                  📦 <span>Mis pedidos</span>
                </Link>

                <Link to="/mis-favoritos" className="icon-item">
                  ❤️ <span>Favoritos</span>
                </Link>
              </>
            )}

            {/* SOLO ADMIN */}
            {usuario.rolNombre === "ADMIN" && (
              <Link to="/admin" className="icon-item">
                🛠 <span>Admin</span>
              </Link>
            )}

            {/* Cerrar sesión */}
            <button className="icon-item logout-btn" onClick={logout}>
              ❌ <span>Cerrar</span>
            </button>

            {/* Carrito para usuario logueado */}
            <Link to="/carrito" className="icon-item">
              🛒 <span>Carrito({cart.length})</span>
            </Link>
          </>
        )}

      </div>
    </div>
  );
}

export default TopBar;
