import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [captura, setCaptura] = useState(null);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("YAPE");
  const [loadingPedido, setLoadingPedido] = useState(true);

  // 🔒 Protegemos ruta
  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  // 🧾 Crear pedido automáticamente al entrar
  useEffect(() => {
    const crearPedido = async () => {
      if (!usuario || cart.length === 0) {
        navigate("/carrito");
        return;
      }

      try {
        const payload = {
          idUsuario: usuario.idUsuario,
          detalles: cart.map(item => ({
            idProducto: item.idProducto,
            cantidad: item.cantidad,
            precioUnitario: item.precioBase,
            subtotal: item.cantidad * item.precioBase,

            // ⭐⭐ AQUI SE AGREGAN LAS PERSONALIZACIONES ⭐⭐
            personalizaciones: item.personalizaciones || []
          }))
        };

        const response = await api.post("/api/pedidos", payload);
        setPedidoCreado(response.data);

      } catch (error) {
        console.error("Error creando pedido:", error);
        alert("Ocurrió un error al generar el pedido.");
      } finally {
        setLoadingPedido(false);
      }
    };

    crearPedido();
  }, [usuario, cart, navigate]);

  // 📸 Convertir imagen a Base64
  const convertirBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setCaptura(reader.result);
    reader.readAsDataURL(file);
  };

  // 💸 Enviar pago
  const enviarPago = async () => {
    if (!captura) {
      alert("Sube una captura de pago primero.");
      return;
    }

    if (!pedidoCreado) {
      alert("No se encontró el pedido.");
      return;
    }

    const payloadPago = {
      idPedido: pedidoCreado.idPedido,
      metodo: metodoSeleccionado,
      monto: pedidoCreado.total,
      captura: captura,
    };

    try {
      await api.post("/api/pagos", payloadPago);
      alert("Pago enviado. Estamos revisando tu pedido.");
      clearCart();
      navigate("/mis-pedidos");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al enviar el pago.");
    }
  };

  // UI cargando
  if (loadingPedido) {
    return (
      <section className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <p>Generando tu pedido...</p>
      </section>
    );
  }

  // Si no se generó el pedido
  if (!pedidoCreado) {
    return (
      <section className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <p>No se pudo generar el pedido.</p>
      </section>
    );
  }

  return (
    <section className="checkout-container">
      <h1 className="checkout-title">Pago de pedido #{pedidoCreado.idPedido}</h1>

      <p className="checkout-total">
        Total a pagar: <span>S/ {pedidoCreado.total}</span>
      </p>

      {/* MÉTODOS DE PAGO */}
      <div className="metodos-grid">

        <div
          className={`metodo-card ${metodoSeleccionado === "YAPE" ? "activo" : ""}`}
          onClick={() => setMetodoSeleccionado("YAPE")}
        >
          <img src="/src/assets/pago/yape.png" alt="Yape" />
          <h3>Yape</h3>
          <p>999 999 999</p>
        </div>

        <div
          className={`metodo-card ${metodoSeleccionado === "PLIN" ? "activo" : ""}`}
          onClick={() => setMetodoSeleccionado("PLIN")}
        >
          <img src="/src/assets/pago/plin.png" alt="Plin" />
          <h3>Plin</h3>
          <p>999 999 999</p>
        </div>

        <div
          className={`metodo-card ${metodoSeleccionado === "TRANSFERENCIA" ? "activo" : ""}`}
          onClick={() => setMetodoSeleccionado("TRANSFERENCIA")}
        >
          <img src="/src/assets/pago/transferencia.png" alt="Transferencia" />
          <h3>Transferencia Bancaria</h3>
          <p>CCI: 002-XXXXXXXXXXXXXXX</p>
        </div>

      </div>

      {/* CAPTURA */}
      <div className="captura-section">
        <h3>Sube la captura del pago</h3>
        <input
          type="file"
          accept="image/*"
          onChange={e => convertirBase64(e.target.files[0])}
        />
      </div>

      <button className="btn-enviar" onClick={enviarPago}>
        Enviar pago
      </button>
    </section>
  );
}

export default Checkout;
