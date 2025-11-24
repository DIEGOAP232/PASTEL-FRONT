import "./RecommendedSection.css";
import { useEffect, useState } from "react";
import { fetchProductos } from "../../services/productoService";
import { Link } from "react-router-dom";

function RecommendedSection() {
  const [productos, setProductos] = useState([]);

  const cargarRecomendados = async () => {
    try {
      const data = await fetchProductos();

      // Tomamos 6 productos (si quieres menos cambias aquí)
      const recomendados = data.slice(0, 6);

      setProductos(recomendados);
    } catch (error) {
      console.error("Error cargando recomendados:", error);
    }
  };

  useEffect(() => {
    cargarRecomendados();
  }, []);

  return (
    <section className="recommended-section">
      <h2 className="recommended-title">Recomendados para ti</h2>

      <div className="recommended-grid">
        {productos.map((prod) => (
          <div className="recommended-card" key={prod.idProducto}>

            <img
              src={
                prod.imagenUrl
                  ? `http://localhost:8080${prod.imagenUrl}`
                  : "/no-image.png"
              }
              alt={prod.nombre}
              className="recommended-img"
            />

            <h3>{prod.nombre}</h3>
            <p>{prod.descripcion}</p>

            <span className="price">S/ {prod.precioBase}</span>

            <Link to="/productos" className="btn-ver">
              Ver más
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendedSection;
