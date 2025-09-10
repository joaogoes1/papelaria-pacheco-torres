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

export interface DashboardStats {
  totalClientes: number;
  totalProdutos: number;
  totalEstoque: number;
  vendasHoje: number;
}

export interface DashboardAlert {
  id: number;
  tipo: 'estoque_baixo' | 'venda_alta' | 'produto_popular';
  mensagem: string;
  produtoId?: number;
  quantidade?: number;
}

export interface ChartData {
  normalDistribution: NormalDistributionData;
  salesBoxplot: SalesBoxplotData;
  binomialDistribution: BinomialDistributionData;
  topProducts: TopProductsData;
  stockStatus: StockStatusData;
  salesPerClient: SalesPerClientData;
}

export interface NormalDistributionData {
  media: number;
  desvio: number;
  min: number;
  max: number;
}

export interface SalesBoxplotData {
  valores: number[];
  categoryLabel: string;
}

export interface BinomialDistributionData {
  n: number;
  p: number;
}

export interface TopProductsData {
  produtos: string[];
  quantidades: number[];
}

export interface StockStatusData {
  produtos: string[];
  estoqueAtual: number[];
  estoqueMin: number[];
}

export interface SalesPerClientData {
  clientes: string[];
  totais: number[];
}