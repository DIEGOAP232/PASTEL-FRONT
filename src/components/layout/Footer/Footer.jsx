import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* INFORMACIÓN */}
        <div className="footer-section">
          <h3>Información</h3>

          <ul>
            <li><Link to="/trabaja">Trabaja con nosotros</Link></li>
            <li><Link to="/alergenos">Cartilla de alérgenos</Link></li>
            <li><Link to="/reparto">Zonas de reparto</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* LIBRO DE RECLAMACIONES */}
        <div className="footer-section">
          <div className="libro-reclamos-box">
            <img src="/img/libro-reclamos.png" alt="Libro de reclamaciones" />
          </div>

          <p className="central">Central Telefónica: (01) 416 6400</p>

          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        Pastelería Esencia © {new Date().getFullYear()} Todos los derechos reservados.
        <br />
        Diseño web: DREART
      </div>

    </footer>
  );
}

export default Footer;
