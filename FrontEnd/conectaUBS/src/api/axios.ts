import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// --- Interceptor de REQUISIÇÃO ---
// Antes de toda chamada, pegamos o access token da memória e injetamos.
api.interceptors.request.use(
  (config) => {
    // O token fica em memória (variável no módulo) — mais seguro que localStorage
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Interceptor de RESPOSTA ---
// Se o servidor retornar 401, tentamos renovar o token automaticamente.
api.interceptors.response.use(
  (response) => response, // sucesso: não faz nada, apenas passa adiante
  async (error) => {
    const originalRequest = error.config;

    // Evita loop infinito: só tenta renovar uma vez por requisição
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = getRefreshToken();
        const { data } = await axios.post(`${baseURL}/token/refresh/`, { refresh });

        // Atualiza os tokens em memória
        setAccessToken(data.access);
        if (data.refresh) setRefreshToken(data.refresh); // se ROTATE_REFRESH_TOKENS=True

        // Reprocessa a requisição original com o novo token
        originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh inválido → força logout
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// --- Gerenciamento de tokens em memória ---
// Usamos variáveis de módulo (não localStorage) para evitar ataques XSS.
// O refresh token pode ir em httpOnly cookie em produção.
let _accessToken: string | null = null;
let _refreshToken: string | null = null;

export const getAccessToken = () => _accessToken;
export const getRefreshToken = () => _refreshToken;
export const setAccessToken = (t: string | null) => (_accessToken = t);
export const setRefreshToken = (t: string | null) => (_refreshToken = t);
export const clearTokens = () => { _accessToken = null; _refreshToken = null; };

export default api;