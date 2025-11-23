import "./Header.css";
import { Link } from "react-router-dom";

function NavMenu() {
  return (
    <nav className="navmenu">
      <button className="menu-categorias">
        ☰ Nuestras Categorías
      </button>

      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
      </ul>
    </nav>
  );
}

export default NavMenu;
