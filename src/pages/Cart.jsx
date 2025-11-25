import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Carrito.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Carrito() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const total = cart.reduce(
    (sum, item) => sum + item.precioBase * item.cantidad,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  return (
    <section className="carrito-container">
      <h2>Tu carrito</h2>

      {cart.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="carrito-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.idProducto}>
                  <td>{item.nombre}</td>
                  <td>S/ {item.precioBase}</td>

                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) =>
                        updateQuantity(
                          item.idProducto,
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>

                  <td>S/ {(item.precioBase * item.cantidad).toFixed(2)}</td>

                  <td>
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.idProducto)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="carrito-footer">
            <h3>Total a pagar: S/ {total.toFixed(2)}</h3>

            <button className="btn-clear" onClick={clearCart}>
              Vaciar carrito
            </button>

            <button className="btn-comprar" onClick={handleCheckout}>
              Proceder al pago
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Carrito;
