import api from "./api";

export const fetchProductos = async () => {
  const response = await api.get("/api/productos");
  return response.data;
};

export const createProducto = async (productoData) => {
  const response = await api.post("/api/productos", productoData);
  return response.data;
};

export const updateProducto = async (id, productoData) => {
  const response = await api.put(`/api/productos/${id}`, productoData);
  return response.data;
};

export const updateProductoEstado = async (id, estado) => {
  const response = await api.put(`/api/productos/${id}/estado`, { estado });
  return response.data;
};

export const deleteProducto = async (id) => {
  await api.delete(`/api/productos/${id}`);
};
