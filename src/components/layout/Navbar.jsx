console.log("isAuthenticated:", isAuthenticated);
console.log("usuario:", usuario);

import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {

  const { usuario, logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Pastelería Esencia</div>

      <ul className="navbar-links">

        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>

        {isAuthenticated && (
          <>
            {/* Ruta de Productos */}
            <li><Link to="/productos">Productos</Link></li>

            {/* Ruta de Administrador SOLO si es ADMIN */}
          <li>
  <Link 
    to={
      !isAuthenticated
        ? "/login"          // no logueado
        : usuario.rolNombre !== "ADMIN"
        ? "/"               // logueado pero NO admin
        : "/admin"          // logueado y admin
    }
  >
    Administrador
  </Link>
</li>



            {/* Nombre del usuario */}
            <li className="navbar-user">
              Hola, {usuario.nombre} {usuario.apellido}
            </li>

            {/* Botón Logout */}
            <li>
              <button className="logout-btn" onClick={logout}>
                Cerrar Sesión
              </button>
            </li>
          </>
        )}

        {!isAuthenticated && (
          <>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/register">Registrarse</Link></li>
          </>
        )}
        
      </ul>
    </nav>
  );
}

export default Navbar;
