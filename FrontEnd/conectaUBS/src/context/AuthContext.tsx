import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock de usuários administradores
const ADMIN_USERS = [
  { id: '1', email: 'admin@conectaubs.gov.br', password: 'admin123', name: 'Administrador' },
  { id: '2', email: 'gestor@conectaubs.gov.br', password: 'gestor123', name: 'Gestor UBS' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('conectaubs_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simula uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = ADMIN_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem('conectaubs_user', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('conectaubs_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
