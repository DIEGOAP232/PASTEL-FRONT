import "./Productos.css";
import { useEffect, useState } from "react";
import { fetchProductos } from "../services/productoService";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    try {
      const data = await fetchProductos();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando productos...</p>;
  }

  return (
    <section className="productos-container">
      <h2>Nuestros Productos</h2>

      <div className="productos-grid">
        {productos.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          productos.map((prod) => (
         <div className="producto-card" key={prod.idProducto}>
  
  {prod.imagenUrl ? (
    <img
      src={`http://localhost:8080${prod.imagenUrl}`}
      alt={prod.nombre}
      className="producto-img"
    />
  ) : (
    <img
      src="/no-image.png"   // puedes poner un placeholder opcional
      alt="Sin imagen"
      className="producto-img"
    />
  )}

  <h3>{prod.nombre}</h3>
  <p>{prod.descripcion}</p>
  <span className="precio">S/ {prod.precioBase}</span>

</div>

          ))
        )}
      </div>
    </section>
  );
}

export default Productos;
