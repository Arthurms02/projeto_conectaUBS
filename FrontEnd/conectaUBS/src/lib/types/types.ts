
export type Usuario = {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cpf: string;
  role: 'agente_saude' | 'agente_endemias';
};

// Tipo para autenticação
export type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (usuario: Omit<Usuario, 'id'>) => Promise<void>;
  logout: () => void;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type RegisterFormInputs = {
  nome: string;
  email: string;
  telefone?: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  role: 'AGENTE_SAUDE' | 'AGENTE_ENDEMIAS';
};
