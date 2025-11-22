// src/services/authService.js
import api from './api';

export const loginUsuario = async (email, contrasena) => {
  const response = await api.post('/api/auth/login', { email, contrasena });
  return response.data;
};

export const registerUsuario = async (userData) => {
  const response = await api.post('/api/usuarios', userData);
  return response.data;
};
