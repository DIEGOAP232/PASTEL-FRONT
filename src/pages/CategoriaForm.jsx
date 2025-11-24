import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "./CategoriaForm.css";

function CategoriaForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: ""
  });

  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  const cargarCategoria = async () => {
    const res = await api.get(`/api/categorias/${id}`);
    setCategoria(res.data);
    setPreview(`http://localhost:8080${res.data.imagenUrl}`);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNuevaImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let saved;

      if (id) {
        // >>> Actualizar texto
        saved = await api.put(`/api/categorias/${id}`, categoria);
      } else {
        // >>> Crear categoría
        saved = await api.post(`/api/categorias`, categoria);
      }

      const categoriaId = id || saved.data.idCategoria;

      // >>> Subir imagen si el admin seleccionó una
      if (nuevaImagen) {
        const formData = new FormData();
        formData.append("file", nuevaImagen);

        await api.post(
          `/api/categorias/${categoriaId}/imagen`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      navigate("/admin/categorias");

    } catch (err) {
      console.error(err);
      alert("Error al guardar categoría");
    }
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

        <label>Imagen</label>
        {preview && <img src={preview} className="categoria-preview" />}

        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" className="btn-guardar">
          {id ? "Actualizar" : "Crear"}
        </button>

      </form>
    </section>
  );
}

export default CategoriaForm;
