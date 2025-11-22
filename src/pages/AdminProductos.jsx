import { useEffect, useState } from "react";
import { fetchProductos, deleteProducto } from "../services/productoService";
import "./AdminProductos.css";
import { Link } from "react-router-dom";

function AdminProductos() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const data = await fetchProductos();
    setProductos(data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    await deleteProducto(id);
    cargarProductos();
  };

  return (
    <section className="admin-productos-container">
      <h2>Gestión de Productos</h2>

      <div className="admin-productos-header">
        <Link className="btn-crear" to="/admin/productos/crear">
          + Crear Producto
        </Link>
      </div>

      <table className="tabla-productos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th> 
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio Base</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((prod) => (
            <tr key={prod.idProducto}>
              <td>{prod.idProducto}</td>


             <td>
  {prod.imagenUrl ? (
    <img
      src={`http://localhost:8080${prod.imagenUrl}`}
      alt={prod.nombre}
      className="miniatura"
    />
  ) : (
    "Sin imagen"
  )}
</td>


              <td>{prod.nombre}</td>
              <td>{prod.categoria?.nombre}</td>
              <td>S/ {prod.precioBase}</td>
              <td>{prod.estado}</td>

              <td>
                <Link className="btn-editar" to={`/admin/productos/editar/${prod.idProducto}`}>
                  Editar
                </Link>

                <button
                  className="btn-eliminar"
                  onClick={() => eliminarProducto(prod.idProducto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </section>
  );
}

export default AdminProductos;
