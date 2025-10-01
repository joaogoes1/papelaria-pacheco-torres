export interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  endereco: string;
  telefone: string;
  email: string;
  createdAt: string;
}

export interface Produto {
  id: number;
  nome: string;
  codigo: string;
  preco: number;
  categoria: string;
  descricao: string;
  createdAt: string;
}

export interface Estoque {
  id: number;
  produtoId: number;
  quantidade: number;
  quantidadeMinima: number;
  ultimaAtualizacao: string;
}

export interface ItemVenda {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

export interface Venda {
  id: number;
  clienteId: number;
  itens: ItemVenda[];
  total: number;
  data: string;
}

export interface FormData {
  [key: string]: any;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface ReceitaMensal {
  mes: string;
  receita: number;
  totalVendas: number;
}

export interface TopCliente {
  clienteId: string;
  clienteNome: string;
  totalGasto: number;
  totalCompras: number;
}

export interface VendaPorCategoria {
  categoria: string;
  receita: number;
  quantidadeVendida: number;
}

export interface FinanceiroData {
  receitaTotal: number;
  receitaMensal: number;
  receitaDiaria: number;
  ticketMedio: number;
  totalVendas: number;
  totalVendasMes: number;
  crescimentoMensal: number;
  receitaPorMes: ReceitaMensal[];
  topClientes: TopCliente[];
  vendasPorCategoria: VendaPorCategoria[];
}