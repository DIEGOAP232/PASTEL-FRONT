import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./CategoriaForm.css";

function CategoriaForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: ""
  });

  const cargarCategoria = async () => {
    const res = await api.get(`/api/categorias/${id}`);
    setCategoria({
      nombre: res.data.nombre,
      descripcion: res.data.descripcion
    });
  };

  useEffect(() => {
    if (id) cargarCategoria();
  }, []);

  const handleChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await api.put(`/api/categorias/${id}`, categoria);
    } else {
      await api.post("/api/categorias", categoria);
    }

    navigate("/admin/categorias");
  };

  return (
    <section className="categoria-form-container">
      <h2>{id ? "Editar Categoría" : "Crear Categoría"}</h2>

      <form className="categoria-form" onSubmit={handleSubmit}>

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={categoria.nombre}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={categoria.descripcion}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-guardar">
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </section>
  );
}

export default CategoriaForm;
