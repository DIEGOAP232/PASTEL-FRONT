import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import "./Checkout.css"; // 👈 nuevo archivo CSS

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { usuario } = useContext(AuthContext);

  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [captura, setCaptura] = useState(null);
  const [metodoPago, setMetodoPago] = useState("YAPE");

  const convertirBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setCaptura(reader.result);
    reader.readAsDataURL(file);
  };

  const crearPedido = async () => {
    const payload = {
      idUsuario: usuario.idUsuario,
      detalles: cart.map(item => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        precioUnitario: item.precioBase,
        subtotal: item.cantidad * item.precioBase
      }))
    };

    const response = await api.post("/api/pedidos", payload);
    setPedidoCreado(response.data);
  };

  const enviarPago = async () => {
    if (!captura) {
      alert("Sube una captura de pago primero.");
      return;
    }

    const payloadPago = {
      idPedido: pedidoCreado.idPedido,
      metodo: metodoPago,
      monto: pedidoCreado.total,
      captura: captura
    };

    await api.post("/api/pagos", payloadPago);

    alert("Pago enviado para revisión.");
    clearCart();
  };

  return (
    <section className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      {!pedidoCreado && (
        <button className="btn-generar" onClick={crearPedido}>
          Generar Pedido
        </button>
      )}

      {pedidoCreado && (
        <div className="checkout-card">
          <h2>Pedido #{pedidoCreado.idPedido}</h2>
          <p className="total">Total: <span>S/ {pedidoCreado.total}</span></p>

          <div className="pago-section">
            <h3>Método de pago</h3>
            <select
              className="pago-select"
              onChange={e => setMetodoPago(e.target.value)}
            >
              <option value="YAPE">Yape</option>
              <option value="PLIN">Plin</option>
              <option value="TRANSFERENCIA">Transferencia</option>
            </select>
          </div>

          <div className="captura-section">
            <h3>Sube la captura del pago</h3>
            <input
              type="file"
              accept="image/*"
              onChange={e => convertirBase64(e.target.files[0])}
            />
          </div>

          <button className="btn-enviar" onClick={enviarPago}>
            Enviar Pago
          </button>
        </div>
      )}
    </section>
  );
}

export default Checkout;
