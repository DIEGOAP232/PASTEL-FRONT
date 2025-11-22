import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "./AdminCategorias.css";

function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    const res = await api.get("/api/categorias");
    setCategorias(res.data);
  };

  const eliminarCategoria = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    await api.delete(`/api/categorias/${id}`);
    cargarCategorias();
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <section className="admin-categorias-container">
      <h2>Gestión de Categorías</h2>

      <div className="admin-categorias-header">
        <Link className="btn-crear" to="/admin/categorias/crear">
          + Crear Categoría
        </Link>
      </div>

      <table className="tabla-categorias">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.idCategoria}>
              <td>{cat.idCategoria}</td>
              <td>{cat.nombre}</td>
              <td>{cat.descripcion}</td>

              <td>
                <Link className="btn-editar" to={`/admin/categorias/editar/${cat.idCategoria}`}>
                  Editar
                </Link>

                <button
                  className="btn-eliminar"
                  onClick={() => eliminarCategoria(cat.idCategoria)}
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

export default AdminCategorias;
