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

  // MODAL STATES
  const [modalProducto, setModalProducto] = useState(null);
  const [personalizaciones, setPersonalizaciones] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [precioFinal, setPrecioFinal] = useState(0);

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

  // Filtrar por categoría
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

  // -------------------------
  //      MODAL LOGIC
  // -------------------------
  const abrirModal = async (prod) => {
    setModalProducto(prod);
    setSeleccionadas([]);
    setPrecioFinal(Number(prod.precioBase));

    const res = await api.get("/api/personalizaciones");

    // Filtrar solo las personalizaciones del producto
    const filtro = res.data.filter(
      (p) => p.producto.idProducto === prod.idProducto
    );

    setPersonalizaciones(filtro);
  };

  const cerrarModal = () => {
    setModalProducto(null);
  };

  const togglePersonalizacion = (pers) => {
    let nuevas = [...seleccionadas];
    const existe = nuevas.find((p) => p.idPersonalizacion === pers.idPersonalizacion);

    if (existe) {
      nuevas = nuevas.filter((p) => p.idPersonalizacion !== pers.idPersonalizacion);
    } else {
      nuevas.push(pers);
    }

    setSeleccionadas(nuevas);

    const extra = nuevas.reduce((acc, p) => acc + Number(p.costoExtra), 0);
    setPrecioFinal(Number(modalProducto.precioBase) + extra);
  };

  const agregarPersonalizado = () => {
    addToCart({
      idProducto: modalProducto.idProducto,
      nombre: modalProducto.nombre,
      precioBase: modalProducto.precioBase,
      imagenUrl: modalProducto.imagenUrl,
      cantidad: 1,
      personalizaciones: seleccionadas.map((s) => s.idPersonalizacion),
      costoExtraTotal: seleccionadas.reduce(
        (acc, p) => acc + Number(p.costoExtra),
        0
      ),
      precioFinal,
    });

    cerrarModal();
    alert("Producto añadido al carrito.");
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
                onClick={() => abrirModal(prod)}
              >
                Personalizar y agregar
              </button>

            </div>
          ))
        )}
      </div>

      {/* -------- MODAL -------- */}
      {modalProducto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>

            <button className="modal-close" onClick={cerrarModal}>✕</button>

            <h2>{modalProducto.nombre}</h2>

            <img
              src={`http://localhost:8080${modalProducto.imagenUrl}`}
              alt={modalProducto.nombre}
              className="modal-img"
            />

            <p className="modal-desc">{modalProducto.descripcion}</p>

            <h3>Personalización</h3>

            {personalizaciones.length === 0 ? (
              <p>Este producto no tiene personalizaciones disponibles.</p>
            ) : (
              <div className="pers-lista">
                {personalizaciones.map((p) => (
                  <div
                    key={p.idPersonalizacion}
                    className={
                      seleccionadas.find(
                        (s) => s.idPersonalizacion === p.idPersonalizacion
                      )
                        ? "pers-item active"
                        : "pers-item"
                    }
                    onClick={() => togglePersonalizacion(p)}
                  >
                    <strong>{p.tipo}:</strong> {p.opcion}
                    {p.costoExtra > 0 && (
                      <span className="extra">+ S/ {p.costoExtra}</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="precio-final">
              <h3>
                Precio final: <span>S/ {precioFinal}</span>
              </h3>
            </div>

            <button className="btn-add-final" onClick={agregarPersonalizado}>
              Agregar al carrito
            </button>

          </div>
        </div>
      )}

    </section>
  );
}

export default Productos;
