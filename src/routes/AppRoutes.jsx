import { Routes, Route } from "react-router-dom";

// Páginas públicas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contacto from "../pages/Contacto";

// Páginas protegidas
import Productos from "../pages/Productos";

// Panel Admin
import Admin from "../pages/Admin";
import AdminProductos from "../pages/AdminProductos";
import ProductoForm from "../pages/ProductoForm";
import AdminCategorias from "../pages/AdminCategorias";
import CategoriaForm from "../pages/CategoriaForm";

// Rutas protegidas
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* LOGUEADOS */}
      <Route
        path="/productos"
        element={
          <ProtectedRoute>
            <Productos />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/productos"
        element={
          <AdminRoute>
            <AdminProductos />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/productos/crear"
        element={
          <AdminRoute>
            <ProductoForm />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/productos/editar/:id"
        element={
          <AdminRoute>
            <ProductoForm />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/categorias"
        element={
          <AdminRoute>
            <AdminCategorias />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/categorias/crear"
        element={
          <AdminRoute>
            <CategoriaForm />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/categorias/editar/:id"
        element={
          <AdminRoute>
            <CategoriaForm />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
