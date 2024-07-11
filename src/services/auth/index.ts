import api from '../api';

export const login = async (email: string, password: string) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post('/api/auth/register', { name, email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
};
