import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { usuario, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (usuario.rolNombre !== "ADMIN") return <Navigate to="/" />;

  return children;
}

export default AdminRoute;
