import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto) => {
    setCart((prev) => {
      const existe = prev.find((p) => p.idProducto === producto.idProducto);

      if (existe) {
        return prev.map((p) =>
          p.idProducto === producto.idProducto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const updateQuantity = (idProducto, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return;

    setCart((prev) =>
      prev.map((p) =>
        p.idProducto === idProducto ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  const removeFromCart = (idProducto) => {
    setCart((prev) => prev.filter((p) => p.idProducto !== idProducto));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
