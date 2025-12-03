import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./MisPedidos.css";
import { useNavigate } from "react-router-dom";

function MisPedidos() {
  const { usuario, isAuthenticated } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  // Protección
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  // Cargar pedidos del usuario
  const cargarPedidos = async () => {
    try {
      const res = await api.get(`/api/pedidos/usuario/${usuario.idUsuario}`);
      setPedidos(res.data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    }
  };

  useEffect(() => {
    if (usuario) cargarPedidos();
  }, [usuario]);

  return (
    <section className="mis-pedidos-container">
      <h1>Mis pedidos</h1>

      {pedidos.length === 0 && (
        <p className="sin-pedidos">Aún no tienes pedidos realizados.</p>
      )}

      <div className="pedidos-lista">
        {pedidos.map((p) => (
          <div key={p.idPedido} className="pedido-card">
            <h3>Pedido #{p.idPedido}</h3>

            <p><strong>Fecha:</strong> {p.fecha}</p>
            <p><strong>Total:</strong> S/ {p.total}</p>

            <p>
              <strong>Estado:</strong>{" "}
              <span className={`estado ${p.estado.toLowerCase()}`}>
                {p.estado}
              </span>
            </p>

            {/* Contenedor ordenado de botones */}
            <div className="botones">
              <button 
                className="btn-detalle"
                onClick={() => navigate(`/pedido/${p.idPedido}`)}
              >
                Ver detalle
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default MisPedidos;
