import axios from 'axios';
import { Cliente, Produto, Estoque, Venda } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
      "Authorizations": `Bearer ${localStorage.getItem('token')}`
  }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.setAuthorization(`Bearer ${token}`)
    }
    return config
});

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
  exportar: () => api.get('/clientes/exportar'),
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
  exportar: () => api.get('/estoque/exportar'),
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
  exportar: () => api.get('/vendas/exportar'),
};

// Auth
export const authAPI = {
  login: (credentials: {username: string, password: string}) => api.post('/login', credentials),
}

export default api;