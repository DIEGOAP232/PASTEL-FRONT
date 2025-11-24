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

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <section className="admin-categorias-container">
      <h2>Gestión de Categorías</h2>

      <div className="admin-header">
        <Link className="btn-crear" to="/admin/categorias/crear">
          + Crear Categoría
        </Link>
      </div>

      <table className="tabla-categorias">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.idCategoria}>
              <td>{cat.idCategoria}</td>

              <td>
                {cat.imagenUrl ? (
                  <img
                    src={`http://localhost:8080${cat.imagenUrl}`}
                    className="categoria-img-mini"
                  />
                ) : (
                  "---"
                )}
              </td>

              <td>{cat.nombre}</td>
              <td>{cat.descripcion}</td>

              <td>
                <Link
                  className="btn-editar"
                  to={`/admin/categorias/editar/${cat.idCategoria}`}
                >
                  Editar
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminCategorias;
