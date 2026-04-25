
export type Usuario = {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  cpf: string;
  role: 'AGENTE_SAUDE' | 'AGENTE_ENDEMIAS' | null;
};

// Tipo para autenticação
export type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type LoginFormInputs = {
  username: string;
  password: string;
};

