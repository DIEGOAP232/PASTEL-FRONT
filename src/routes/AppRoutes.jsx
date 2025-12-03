import { Routes, Route } from "react-router-dom";

// Páginas públicas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contacto from "../pages/Contacto";
import Carrito from "../pages/Carrito";
import Cart from "../pages/Cart";
import Nosotros from "../pages/Nosotros";
import PedidoDetalle from "../pages/PedidoDetalle";

// Productos (público)
import Productos from "../pages/Productos";

// Checkout
import Checkout from "../pages/Checkout";

// Panel Admin
import Admin from "../pages/Admin";
import AdminProductos from "../pages/AdminProductos";
import ProductoForm from "../pages/ProductoForm";
import AdminCategorias from "../pages/AdminCategorias";
import CategoriaForm from "../pages/CategoriaForm";
import RevisionPagos from "../pages/RevisionPagos";
import MisPedidos from "../pages/MisPedidos";
import MisFavoritos from "../pages/MisFavoritos";

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
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    <Route
  path="/admin/revision-pagos"
  element={
    <AdminRoute>
      <RevisionPagos />
    </AdminRoute>
  }
/>

<Route path="/nosotros" element={<Nosotros />} />

<Route path="/mis-pedidos" element={<MisPedidos />} />
<Route path="/mis-favoritos" element={<MisFavoritos />} />
<Route path="/pedido/:idPedido" element={<PedidoDetalle />} />

      {/* PRODUCTOS PÚBLICO */}
      <Route path="/productos" element={<Productos />} />

      {/* RUTAS SOLO ADMIN */}
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
