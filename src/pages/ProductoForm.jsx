import { useEffect, useState } from "react";
import { createProducto, updateProducto } from "../services/productoService";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductoForm.css";
import api from "../services/api";

function ProductoForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precioBase: "",
    estado: "ACTIVO",
    categoria: {
      idCategoria: ""
    }
  });

  const [categorias, setCategorias] = useState([]);

  // ⭐ NUEVO: archivo imagen + vista previa
  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // ⭐ Cargar categorías
  const cargarCategorias = async () => {
    const res = await api.get("/api/categorias");
    setCategorias(res.data);
  };

  // ⭐ Cargar producto si estamos editando
  const cargarProducto = async () => {
    const res = await api.get(`/api/productos/${id}`);

    setProducto({
      nombre: res.data.nombre,
      descripcion: res.data.descripcion,
      precioBase: res.data.precioBase,
      estado: res.data.estado,
      imagenUrl: res.data.imagenurl,
      categoria: {
        idCategoria: res.data.categoria.idCategoria
      }
    });

    // ⭐ Si el producto tiene imagen, mostrarla como preview
    if (res.data.imagenUrl) {
      setPreview(res.data.imagenUrl);
    }
  };

  useEffect(() => {
    cargarCategorias();
    if (id) cargarProducto();
  }, []);

  // ⭐ Manejar cambios en campos de texto/select
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "idCategoria") {
      setProducto({
        ...producto,
        categoria: { idCategoria: value }
      });
    } else {
      setProducto({
        ...producto,
        [name]: value
      });
    }
  };

  // ⭐ Manejar selección de imagen
  const handleImagen = (e) => {
    const file = e.target.files[0];
    setImagenFile(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ⭐ Función que envía la imagen al backend
  const subirImagen = async (productoId) => {
    if (!imagenFile) return;

    const formData = new FormData();
    formData.append("imagen", imagenFile);

    await api.post(`/api/productos/${productoId}/imagen`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  };

  // ⭐ Guardar producto (crear/editar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (id) {
        // EDITAR
        res = await updateProducto(id, producto);
        await subirImagen(id);
      } else {
        // CREAR
        res = await createProducto(producto);
        await subirImagen(res.idProducto);
      }

      navigate("/admin/productos");
    } catch (error) {
      alert("Error al guardar el producto");
      console.error(error);
    }
  };

  return (
    <section className="producto-form-container">
      <h2>{id ? "Editar Producto" : "Crear Producto"}</h2>

      <form className="producto-form" onSubmit={handleSubmit}>

        {/* Mostrar la imagen actual si existe y estamos editando */}
{id && producto.imagenUrl && (
  <div className="preview-container">
    <p>Imagen actual:</p>
    <img
      src={`http://localhost:8080${producto.imagenUrl}`}
      alt="Producto"
      className="preview-img"
    />
  </div>
)}



        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />

        <label>Precio Base</label>
        <input
          type="number"
          name="precioBase"
          value={producto.precioBase}
          onChange={handleChange}
          required
        />

        <label>Categoría</label>
        <select
          name="idCategoria"
          value={producto.categoria.idCategoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione...</option>
          {categorias.map((cat) => (
            <option key={cat.idCategoria} value={cat.idCategoria}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <label>Estado</label>
        <select
          name="estado"
          value={producto.estado}
          onChange={handleChange}
        >
          <option value="ACTIVO">ACTIVO</option>
          <option value="INACTIVO">INACTIVO</option>
        </select>

        {/* ⭐ Campo de imagen */}
        <label>Imagen</label>
        <input type="file" accept="image/*" onChange={handleImagen} />

        {preview && (
          <img src={preview} className="preview-img" alt="preview" />
        )}

        <button type="submit" className="btn-guardar">
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </section>
  );
}

export default ProductoForm;
