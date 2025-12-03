import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /** 
   * Genera ID único para cada ítem del carrito
   * Esto permite:
   * - mismo producto + personalización A
   * - mismo producto + personalización B
   * sin mezclarlos
   */
  const generarIdUnico = (producto) => {
    return `${producto.idProducto}-${JSON.stringify(producto.personalizaciones || [])}-${Date.now()}-${Math.random()}`;
  };

  /**
   * Añadir al carrito
   * producto debe venir así:
   * {
   *   idProducto,
   *   nombre,
   *   precioBase,
   *   imagenUrl,
   *   cantidad (1 por defecto),
   *   personalizaciones: [{ idPersonalizacion, tipo, opcion, costoExtra }]
   * }
   */
  const addToCart = (producto) => {
    setCart((prev) => {
      // Buscar si existe el mismo producto con mismas personalizaciones
      const existente = prev.find(
        (item) =>
          item.idProducto === producto.idProducto &&
          JSON.stringify(item.personalizaciones) ===
            JSON.stringify(producto.personalizaciones)
      );

      if (existente) {
        // Aumentar cantidad
        return prev.map((item) =>
          item.idProducto === producto.idProducto &&
          JSON.stringify(item.personalizaciones) ===
            JSON.stringify(producto.personalizaciones)
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      // Producto nuevo → asignar idUnico
      return [
        ...prev,
        {
          ...producto,
          cantidad: producto.cantidad || 1,
          idUnico: generarIdUnico(producto),
        },
      ];
    });
  };

  /**
   * Actualizar cantidad por idUnico
   */
  const updateQuantity = (idUnico, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item.idUnico === idUnico
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  /**
   * Eliminar por idUnico
   */
  const removeFromCart = (idUnico) => {
    setCart((prev) => prev.filter((item) => item.idUnico !== idUnico));
  };

  /**
   * Limpiar carrito
   */
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
