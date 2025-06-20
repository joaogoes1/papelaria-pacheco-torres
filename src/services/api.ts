import axios from 'axios';
import { Cliente, Produto, Estoque, Venda } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
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
};

export default api;