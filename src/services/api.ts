import axios from 'axios';
import { Cliente, Produto, Estoque, Venda } from '../types';
import { getStoredToken, clearAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

// Request interceptor - Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);

    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      const isLoginPage = window.location.pathname === '/login';

      // Only clear auth and redirect if not already on login page
      if (!isLoginPage) {
        clearAuth();
        toast.error('Sessão expirada. Faça login novamente.');

        // Redirect to login
        window.location.href = '/login';
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      toast.error('Você não tem permissão para acessar este recurso.');
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      toast.error('Erro no servidor. Tente novamente mais tarde.');
    }

    // Handle network errors
    if (!error.response) {
      toast.error('Erro de conexão. Verifique sua internet.');
    }

    return Promise.reject(error);
  }
);

// Clientes
export const clientesAPI = {
  getAll: () => api.get<Cliente[]>('/clientes'),
  getById: (id: number) => api.get<Cliente>(`/clientes/${id}`),
  create: (cliente: Omit<Cliente, 'id' | 'createdAt'>) =>
    api.post<Cliente>('/clientes', {
      ...cliente,
      createdAt: new Date().toISOString(),
    }),
  update: (id: number, cliente: Omit<Cliente, 'id' | 'createdAt'>) =>
    api.put<Cliente>(`/clientes/${id}`, cliente),
  delete: (id: number) => api.delete(`/clientes/${id}`),
  exportar: () => api.get('/relatorios/clientes/exportar'),
  importar: (filePath: string) => {
    return api.post('/clientes/importar', { filePath });
  },
};

// Produtos
export const produtosAPI = {
  getAll: () => api.get<Produto[]>('/produtos'),
  getById: (id: number) => api.get<Produto>(`/produtos/${id}`),
  create: (produto: Omit<Produto, 'id' | 'createdAt'>) =>
    api.post<Produto>('/produtos', {
      ...produto,
      createdAt: new Date().toISOString(),
    }),
  update: (id: number, produto: Omit<Produto, 'id' | 'createdAt'>) =>
    api.put<Produto>(`/produtos/${id}`, produto),
  delete: (id: number) => api.delete(`/produtos/${id}`),
};

// Estoque
export const estoqueAPI = {
  getAll: () => api.get<Estoque[]>('/estoque'),
  getById: (id: number) => api.get<Estoque>(`/estoque/${id}`),
  getByProdutoId: (produtoId: number) =>
    api.get<Estoque[]>(`/estoque?produtoId=${produtoId}`),
  create: (estoque: Omit<Estoque, 'id'>) => api.post<Estoque>('/estoque', estoque),
  update: (id: number, estoque: Partial<Estoque>) =>
    api.put<Estoque>(`/estoque/${id}`, {
      ...estoque,
      ultimaAtualizacao: new Date().toISOString(),
    }),
  delete: (id: number) => api.delete(`/estoque/${id}`),
  exportar: () => api.get('/relatorios/estoque/exportar'),
};

// Vendas
export const vendasAPI = {
  getAll: () => api.get<Venda[]>('/vendas'),
  getById: (id: number) => api.get<Venda>(`/vendas/${id}`),
  create: (venda: Omit<Venda, 'id'>) =>
    api.post<Venda>('/vendas', {
      ...venda,
      data: new Date().toISOString(),
    }),
  update: (id: number, venda: Omit<Venda, 'id'>) =>
    api.put<Venda>(`/vendas/${id}`, venda),
  delete: (id: number) => api.delete(`/vendas/${id}`),
  exportar: () => api.get('/relatorios/vendas/exportar'),
};

// Auth - Login endpoint doesn't need token
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post<{ token: string }>('/login', credentials),
};

export default api;