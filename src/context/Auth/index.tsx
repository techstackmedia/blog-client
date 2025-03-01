import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { login, register } from '../../services/auth';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

const setAuthData = (token: string) => {
  const expiry = Date.now() + ONE_MONTH_MS;
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry.toString());
};

const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiry');
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    setAuthData(response.token);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    const response = await register(name, email, password);
    setAuthData(response.token);
    setUser(response.user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('expiry');
    if (token && expiry && Date.now() < parseInt(expiry)) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login: handleLogin, register: handleRegister, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
