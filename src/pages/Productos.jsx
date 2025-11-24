import { useEffect, useState, useContext } from "react";
import { fetchProductos } from "../services/productoService";
import api from "../services/api";
import "./Productos.css";
import { CartContext } from "../context/CartContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("TODOS");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  // Cargar categorías
  const cargarCategorias = async () => {
    const res = await api.get("/api/categorias");
    setCategorias(res.data);
  };

  // Cargar productos
  const cargarProductos = async () => {
    const data = await fetchProductos();
    setProductos(data);
    setProductosFiltrados(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarCategorias();
    cargarProductos();
  }, []);

  // Filtrar productos cuando cambia la categoría
  const filtrarPorCategoria = (idCategoria) => {
    setCategoriaSeleccionada(idCategoria);

    if (idCategoria === "TODOS") {
      setProductosFiltrados(productos);
      return;
    }

    const filtrados = productos.filter(
      (prod) => prod.categoria.idCategoria === idCategoria
    );

    setProductosFiltrados(filtrados);
  };

  if (loading) return <p className="loading">Cargando productos...</p>;

  return (
    <section className="productos-page">

      {/* -------- CATEGORÍAS -------- */}
      <div className="categoria-bar">
        <button
          className={
            categoriaSeleccionada === "TODOS" ? "cat-btn active" : "cat-btn"
          }
          onClick={() => filtrarPorCategoria("TODOS")}
        >
          Todos
        </button>

        {categorias.map((cat) => (
          <button
            key={cat.idCategoria}
            className={
              categoriaSeleccionada === cat.idCategoria
                ? "cat-btn active"
                : "cat-btn"
            }
            onClick={() => filtrarPorCategoria(cat.idCategoria)}
          >
            <img
              src={`http://localhost:8080${cat.imagenUrl}`}
              alt={cat.nombre}
              className="cat-img"
            />
            {cat.nombre}
          </button>
        ))}
      </div>

      {/* -------- PRODUCTOS -------- */}
      <div className="productos-grid">
        {productosFiltrados.length === 0 ? (
          <p>No hay productos en esta categoría</p>
        ) : (
          productosFiltrados.map((prod) => (
            <div className="producto-card" key={prod.idProducto}>

              <img
                src={`http://localhost:8080${prod.imagenUrl}`}
                alt={prod.nombre}
                className="producto-img"
              />

              <h3>{prod.nombre}</h3>
              <p>{prod.descripcion}</p>
              <span className="precio">S/ {prod.precioBase}</span>

              <button 
                className="btn-add-cart"
                onClick={() => addToCart(prod)}
              >
                Añadir al carrito
              </button>

            </div>
          ))
        )}
      </div>

    </section>
  );
}

export default Productos;
