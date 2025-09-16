import { useApi } from './useApi';
import { clientesAPI, produtosAPI, estoqueAPI, vendasAPI } from '../services/api';
import { Cliente, Produto, Estoque, Venda } from '../types';

// Hook para dados básicos do dashboard
export function useDashboardStats() {
  const { data: clientes, loading: clientesLoading } = useApi(() => clientesAPI.getAll());
  const { data: produtos, loading: produtosLoading } = useApi(() => produtosAPI.getAll());
  const { data: estoque, loading: estoqueLoading } = useApi(() => estoqueAPI.getAll());
  const { data: vendas, loading: vendasLoading } = useApi(() => vendasAPI.getAll());

  const loading = clientesLoading || produtosLoading || estoqueLoading || vendasLoading;

  // Calcular estatísticas
  const stats = {
    totalClientes: clientes?.length || 0,
    totalProdutos: produtos?.length || 0,
    totalItensEstoque: estoque?.reduce((acc, item) => acc + item.quantidade, 0) || 0,
    vendasHoje: vendas?.filter(venda => {
      const hoje = new Date().toDateString();
      const dataVenda = new Date(venda.data).toDateString();
      return dataVenda === hoje;
    }).reduce((acc, venda) => acc + venda.total, 0) || 0,
  };

  return { stats, loading };
}

// Hook para dados dos gráficos
export function useDashboardCharts() {
  const { data: vendas, loading: vendasLoading } = useApi(() => vendasAPI.getAll());
  const { data: estoque, loading: estoqueLoading } = useApi(() => estoqueAPI.getAll());
  const { data: produtos, loading: produtosLoading } = useApi(() => produtosAPI.getAll());
  const { data: clientes, loading: clientesLoading } = useApi(() => clientesAPI.getAll());

  const loading = vendasLoading || estoqueLoading || produtosLoading || clientesLoading;

  // Dados para gráfico de distribuição normal (baseado nas vendas)
  const vendasValores = vendas?.map(venda => venda.total) || [];
  const mediaVendas = vendasValores.length > 0 
    ? vendasValores.reduce((acc, val) => acc + val, 0) / vendasValores.length 
    : 0;
  const desvioVendas = vendasValores.length > 1 
    ? Math.sqrt(vendasValores.reduce((acc, val) => acc + Math.pow(val - mediaVendas, 2), 0) / (vendasValores.length - 1))
    : 0;

  // Dados para boxplot de vendas
  const boxplotData = vendasValores.sort((a, b) => a - b);

  // Dados para produtos mais vendidos
  const produtosVendidos = vendas?.reduce((acc, venda) => {
    venda.itens.forEach(item => {
      const produto = produtos?.find(p => p.id === item.produtoId);
      if (produto) {
        const existing = acc.find(p => p.id === produto.id);
        if (existing) {
          existing.quantidade += item.quantidade;
        } else {
          acc.push({
            id: produto.id,
            nome: produto.nome,
            quantidade: item.quantidade
          });
        }
      }
    });
    return acc;
  }, [] as Array<{ id: number; nome: string; quantidade: number }>) || [];

  const topProdutos = produtosVendidos
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 9);

  // Dados para status do estoque
  const estoqueData = estoque?.map(item => {
    const produto = produtos?.find(p => p.id === item.produtoId);
    return {
      nome: produto?.nome || `Produto ${item.produtoId}`,
      estoqueAtual: item.quantidade,
      estoqueMin: item.quantidadeMinima
    };
  }) || [];

  // Dados para vendas por cliente
  const vendasPorCliente = vendas?.reduce((acc, venda) => {
    const cliente = clientes?.find(c => c.id === venda.clienteId);
    if (cliente) {
      const existing = acc.find(c => c.id === cliente.id);
      if (existing) {
        existing.total += venda.total;
      } else {
        acc.push({
          id: cliente.id,
          nome: cliente.nome,
          total: venda.total
        });
      }
    }
    return acc;
  }, [] as Array<{ id: number; nome: string; total: number }>) || [];

  const topClientes = vendasPorCliente
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  // Alertas de estoque baixo
  const alertasEstoque = estoque?.filter(item => item.quantidade <= item.quantidadeMinima) || [];

  return {
    loading,
    chartsData: {
      // Distribuição normal
      normalDistribution: {
        media: mediaVendas,
        desvio: desvioVendas,
        min: Math.min(...vendasValores) || 0,
        max: Math.max(...vendasValores) || 100
      },
      // Boxplot de vendas
      salesBoxplot: {
        valores: boxplotData
      },
      // Distribuição binomial (usando dados de vendas para simular)
      binomialDistribution: {
        n: Math.min(vendasValores.length, 20),
        p: vendasValores.length > 0 ? 0.5 : 0.1
      },
      // Top produtos
      topProdutos: {
        produtos: topProdutos.map(p => p.nome),
        quantidades: topProdutos.map(p => p.quantidade)
      },
      // Status do estoque
      stockStatus: {
        produtos: estoqueData.map(e => e.nome),
        estoqueAtual: estoqueData.map(e => e.estoqueAtual),
        estoqueMin: estoqueData.map(e => e.estoqueMin)
      },
      // Vendas por cliente
      salesPerClient: {
        clientes: topClientes.map(c => c.nome),
        totais: topClientes.map(c => c.total)
      },
      // Alertas
      alertas: alertasEstoque
    }
  };
}
