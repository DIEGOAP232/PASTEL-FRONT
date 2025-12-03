import { Link } from "react-router-dom";
import "./Admin.css";

function Admin() {
  return (
    <section className="admin-container">
      <h2>Panel Administrador</h2>
      <p>Bienvenido, selecciona una opción:</p>

      <div className="admin-opciones">
        <Link className="admin-btn" to="/admin/productos">
          Gestionar Productos
        </Link>

        <Link className="admin-btn" to="/admin/productos/crear">
          Crear Producto
        </Link>

        <Link className="admin-btn" to="/admin/revision-pagos">
         Revisar Pagos
        </Link>

      </div>
    </section>
  );
}

export default Admin;
