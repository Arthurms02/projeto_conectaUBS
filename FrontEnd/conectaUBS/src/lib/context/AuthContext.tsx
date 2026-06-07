import {createContext, useContext , useState, useEffect} from 'react';
import api from '../../api/axios';
import type { AuthContextType } from '../types/types';
import type { Usuario } from '../types/types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const login = async (email: string, password: string) => {
    await api.post("/api/token/", { email, password });
    setIsAuthenticated(true);
  };

  const registerUser = async (usuario: Omit<Usuario, 'id'>) => {
    await api.post("/api/v1/usuarios/", usuario);
    setIsAuthenticated(true);
    window.location.href = "/login-usuario";
  }

  const logout = () => {
    void api.post("/api/token/logout/").finally(() => {
      setIsAuthenticated(false);
      window.location.href = "/login-usuario";
    });
  };

  useEffect(() => {
    const validateSession = async () => {
      try {
        await api.get("/api/v1/me/");
        setIsAuthenticated(true);
      } catch (error: any) {
        setIsAuthenticated(false);
        // Redireciona uma única vez, evita múltiplas redireções
        if (window.location.pathname !== "/login" && window.location.pathname !== "/login-usuario") {
          window.location.href = "/login-usuario";
        }
      }
    };

    validateSession();
  }, []);

  if (isAuthenticated === null) {
    return <div> Verificando sessão...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);