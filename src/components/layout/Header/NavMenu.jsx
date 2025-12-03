import "./Header.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { useContext } from "react";

function NavMenu() {
  const { cart } = useContext(CartContext);

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

        {/* CARRO SOLO EN NAVMENU */}
        <li>
          <Link to="/carrito" className="cart-btn">
            🛒 Carrito ({cart.length})
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;
