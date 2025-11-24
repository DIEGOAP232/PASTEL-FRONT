import { useEffect, useState } from "react";
import api from "../../services/api";
import "./CategoriesCarousel.css";

function CategoriesCarousel() {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    try {
      const res = await api.get("/api/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.log("Error cargando categorías:", error);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <section className="categorias-section">
      <h2 className="categorias-title">Explorar por categoría</h2>

      <div className="categorias-carousel">
        {categorias.map((cat) => (
          <div key={cat.idCategoria} className="categoria-card">
            <img
              src={
                cat.imagenUrl
                  ? `http://localhost:8080${cat.imagenUrl}`
                  : "/img/no-category.png"
              }
              alt={cat.nombre}
              className="categoria-img"
            />

            <p className="categoria-nombre">{cat.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoriesCarousel;
