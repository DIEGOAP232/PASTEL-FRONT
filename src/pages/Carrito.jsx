import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Carrito.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Carrito() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  // 🔥 Calcular total incluyendo costos extra
  const total = cart.reduce((sum, item) => {
    const precioBase = item.precioBase;
    const costoPersonalizaciones =
      item.personalizaciones?.reduce(
        (sub, p) => sub + (p.costoExtra || 0),
        0
      ) || 0;

    const totalItem = (precioBase + costoPersonalizaciones) * item.cantidad;
    return sum + totalItem;
  }, 0);

  const handleCheckout = () => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <section className="carrito-page">
      <h2 className="carrito-title">Tu carrito</h2>

      {cart.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <div className="carrito-layout">
          
          {/* ---- LISTA DE PRODUCTOS ---- */}
          <div className="carrito-items">
            {cart.map((item, index) => (
              <div key={`${item.idProducto}-${index}`} className="carrito-card">

                <div className="carrito-info">
                  <h3>{item.nombre}</h3>
                  <p className="carrito-precio">
                    Precio base: S/ {item.precioBase.toFixed(2)}
                  </p>

                  {/* ⭐ Mostrar personalizaciones seleccionadas */}
                  {item.personalizaciones && item.personalizaciones.length > 0 && (
                    <div className="carrito-personalizaciones">
                      <h4>Personalización:</h4>
                      <ul>
                        {item.personalizaciones.map((p, i) => (
                          <li key={i}>
                            {p.tipo}: <strong>{p.opcion}</strong>  
                            {p.costoExtra > 0 && (
                              <span className="costo-extra">
                                (+ S/ {p.costoExtra.toFixed(2)})
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cantidad */}
                  <div className="carrito-cantidad">
                    <span>Cantidad:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) =>
                        updateQuantity(
                          item.idUnico, // esto será el ID del item en el carrito
                          parseInt(e.target.value) || 1
                        )
                      }
                    />
                  </div>

                  {/* Subtotal */}
                  <p className="carrito-subtotal">
                    Subtotal:{" "}
                    <strong>
                      S/ {(
                        (item.precioBase +
                          (item.personalizaciones?.reduce((s, p) => s + (p.costoExtra || 0), 0) || 0)) *
                        item.cantidad
                      ).toFixed(2)}
                    </strong>
                  </p>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.idUnico)}
                >
                  ❌ Quitar
                </button>

              </div>
            ))}
          </div>

          {/* ---- RESUMEN ---- */}
          <aside className="carrito-resumen">
            <h3>Resumen del pedido</h3>
            <p className="resumen-total">
              Total a pagar: <span>S/ {total.toFixed(2)}</span>
            </p>

            <button className="btn-clear" onClick={clearCart}>
              Vaciar carrito
            </button>

            <button className="btn-comprar" onClick={handleCheckout}>
              Proceder al pago
            </button>
          </aside>

        </div>
      )}
    </section>
  );
}

export default Carrito;
