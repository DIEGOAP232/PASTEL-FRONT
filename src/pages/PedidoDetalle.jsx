import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./PedidoDetalle.css";

function PedidoDetalle() {
  const { idPedido } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    cargarInformacion();
  }, []);

  const cargarInformacion = async () => {
    try {
      // Cargar pedido
      const resPedido = await api.get(`/api/pedidos/${idPedido}`);
      setPedido(resPedido.data);

      // Cargar detalles del pedido
      const resDetalles = await api.get(`/api/detalles-pedido/pedido/${idPedido}`);
      setDetalles(resDetalles.data);

    } catch (error) {
      console.error("Error al cargar detalle del pedido:", error);
      alert("No se pudo cargar la información del pedido.");
      navigate("/mis-pedidos");
    }
  };

  if (!pedido) return <p className="cargando">Cargando pedido...</p>;

  return (
    <section className="detalle-container">

      <button className="btn-volver" onClick={() => navigate("/mis-pedidos")}>
        ← Volver
      </button>

      <h1>Detalle del Pedido #{pedido.idPedido}</h1>

      <div className="info-general">
        <p><strong>Fecha:</strong> {pedido.fecha}</p>

        {/* tu backend usa estadoPedido, NO estado */}
        <p><strong>Estado:</strong> {pedido.estadoPedido}</p>

        <p><strong>Total:</strong> S/ {pedido.total}</p>
      </div>

      <h2>Productos</h2>

      <div className="tabla-detalle">
        {detalles.map((d) => (
          <div key={d.idDetalle} className="detalle-item">
            <div className="detalle-info">
              <p className="nombre">{d.producto.nombre}</p>
              <p>Cantidad: {d.cantidad}</p>
              <p>Precio unitario: S/ {d.precioUnitario}</p>
            </div>

            <div className="subtotal">
              <strong>Subtotal:</strong> S/ {d.subtotal}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default PedidoDetalle;
