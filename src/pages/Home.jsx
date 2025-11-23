import "./Home.css";
import { Link } from "react-router-dom";

// Componentes del Home
import CategoriesCarousel from "../components/home/CategoriesCarousel";
import RecommendedSection from "../components/home/RecommendedSection";

function Home() {
  return (
    <>
      {/* HERO PRINCIPAL */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            ¿Semana intensa?<br />Date un gustito
          </h1>

          <p className="hero-subtext">
            Tu esfuerzo es valioso. ¡Ven y disfruta!
          </p>

          <Link to="/productos" className="hero-btn">
            Ver productos
          </Link>
        </div>

        <div className="hero-image-container">
          <img
            src="/img/pastel-chocolate.png"
            alt="Pastel de chocolate"
            className="hero-image"
          />
        </div>
      </section>

      {/* CARRUSEL DE CATEGORÍAS */}
      <CategoriesCarousel />

      {/* SECCIÓN RECOMENDADOS */}
      <RecommendedSection />
    </>
  );
}

export default Home;
