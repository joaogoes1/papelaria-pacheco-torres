import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart3, TrendingUp, Users, Package, Calendar, Download } from 'lucide-react';
import { Card, Button } from '../../styles/GlobalStyles';
import { useApi } from '../../hooks/useApi';
import { vendasAPI, clientesAPI, produtosAPI, estoqueAPI } from '../../services/api';
import { MetricCardSkeleton, Skeleton } from '../Skeleton';
import { toast } from 'react-toastify';
import { AnimatedCounter } from '../AnimatedCounter';

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 24px;
`;

const ExportSection = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatsCard = styled(Card)`
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatsIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsTitle = styled.h3`
  font-size: 14px;
  color: #86868b;
  margin-bottom: 4px;
  font-weight: 500;
`;

const StatsValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
`;

const ReportSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 16px;
`;

const RecentSalesCard = styled(Card)`
  padding: 24px;
`;

const SaleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const SaleInfo = styled.div`
  flex: 1;
`;

const SaleName = styled.div`
  font-weight: 500;
  color: #1d1d1f;
  margin-bottom: 4px;
`;

const SaleDate = styled.div`
  font-size: 12px;
  color: #86868b;
`;

const SaleValue = styled.div`
  font-weight: 600;
  color: #34c759;
`;

const StockAlerts = styled(Card)`
  padding: 24px;
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const AlertIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffa500;
`;

const Relatorios: React.FC = () => {
  const [stats, setStats] = useState({
    totalVendas: 0,
    faturamentoTotal: 0,
    totalClientes: 0,
    totalProdutos: 0,
    vendasHoje: 0,
    produtosBaixoEstoque: 0,
  });

  const { data: vendas, loading: loadingVendasData } = useApi(() => vendasAPI.getAll());
  const { data: clientes, loading: loadingClientesData } = useApi(() => clientesAPI.getAll());
  const { data: produtos, loading: loadingProdutosData } = useApi(() => produtosAPI.getAll());
  const { data: estoque, loading: loadingEstoqueData } = useApi(() => estoqueAPI.getAll());

  const loading = loadingVendasData || loadingClientesData || loadingProdutosData || loadingEstoqueData;

  const [loadingExportVendas, setLoadingExportVendas] = useState(false);
  const [loadingExportClientes, setLoadingExportClientes] = useState(false);
  const [loadingExportEstoque, setLoadingExportEstoque] = useState(false);

  useEffect(() => {
    if (vendas && clientes && produtos && estoque) {
      const hoje = new Date().toDateString();
      const vendasHoje = vendas.filter(v => 
        new Date(v.data).toDateString() === hoje
      );

      const produtosBaixoEstoque = estoque.filter(e => 
        e.quantidade <= e.quantidadeMinima
      );

      setStats({
        totalVendas: vendas.length,
        faturamentoTotal: vendas.reduce((total, venda) => total + venda.total, 0),
        totalClientes: clientes.length,
        totalProdutos: produtos.length,
        vendasHoje: vendasHoje.reduce((total, venda) => total + venda.total, 0),
        produtosBaixoEstoque: produtosBaixoEstoque.length,
      });
    }
  }, [vendas, clientes, produtos, estoque]);

  const handleExportVendas = async () => {
    try {
      setLoadingExportVendas(true);
      const response = await vendasAPI.exportar();

      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'vendas.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Relatório de vendas exportado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar vendas:', error);
      toast.error('Erro ao exportar relatório de vendas');
    } finally {
      setLoadingExportVendas(false);
    }
  };

  const handleExportClientes = async () => {
    try {
      setLoadingExportClientes(true);
      const response = await clientesAPI.exportar();

      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'clientes.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Relatório de clientes exportado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar clientes:', error);
      toast.error('Erro ao exportar relatório de clientes');
    } finally {
      setLoadingExportClientes(false);
    }
  };

  const handleExportEstoque = async () => {
    try {
      setLoadingExportEstoque(true);
      const response = await estoqueAPI.exportar();

      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'estoque.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Relatório de estoque exportado com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar estoque:', error);
      toast.error('Erro ao exportar relatório de estoque');
    } finally {
      setLoadingExportEstoque(false);
    }
  };

  const recentSales = vendas?.slice(-5).reverse() || [];
  const lowStockProducts = estoque?.filter(e => e.quantidade <= e.quantidadeMinima) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getClienteName = (clienteId: number) => {
    return clientes?.find(c => c.id === clienteId)?.nome || 'Cliente não encontrado';
  };

  const getProductName = (produtoId: number) => {
    return produtos?.find(p => p.id === produtoId)?.nome || 'Produto não encontrado';
  };

  return (
    <>
      <Title>Relatórios</Title>

      <ExportSection>
        <Button onClick={handleExportVendas} disabled={loadingExportVendas}>
          <Download size={16} />
          {loadingExportVendas ? 'Exportando...' : 'Exportar Vendas'}
        </Button>
        <Button onClick={handleExportClientes} disabled={loadingExportClientes}>
          <Download size={16} />
          {loadingExportClientes ? 'Exportando...' : 'Exportar Clientes'}
        </Button>
        <Button onClick={handleExportEstoque} disabled={loadingExportEstoque}>
          <Download size={16} />
          {loadingExportEstoque ? 'Exportando...' : 'Exportar Estoque'}
        </Button>
      </ExportSection>

      {loading ? (
        <StatsGrid>
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </StatsGrid>
      ) : (
        <StatsGrid>
        <StatsCard>
          <StatsIcon color="#007aff">
            <TrendingUp size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Faturamento Total</StatsTitle>
            <StatsValue>
              R$ <AnimatedCounter value={stats.faturamentoTotal} decimals={2} />
            </StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#34c759">
            <BarChart3 size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Total de Vendas</StatsTitle>
            <StatsValue>
              <AnimatedCounter value={stats.totalVendas} />
            </StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#af52de">
            <Calendar size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Vendas Hoje</StatsTitle>
            <StatsValue>
              R$ <AnimatedCounter value={stats.vendasHoje} decimals={2} />
            </StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#ff9500">
            <Users size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Total de Clientes</StatsTitle>
            <StatsValue>
              <AnimatedCounter value={stats.totalClientes} />
            </StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#00d4aa">
            <Package size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Produtos Cadastrados</StatsTitle>
            <StatsValue>
              <AnimatedCounter value={stats.totalProdutos} />
            </StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#ff6b6b">
            <Package size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Produtos Baixo Estoque</StatsTitle>
            <StatsValue>
              <AnimatedCounter value={stats.produtosBaixoEstoque} />
            </StatsValue>
          </StatsContent>
        </StatsCard>
      </StatsGrid>
      )}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <ReportSection>
            <Skeleton width="150px" height="24px" radius="6px" style={{ marginBottom: '16px' }} />
            <Card style={{ padding: '24px' }}>
              <Skeleton width="100%" height="60px" radius="8px" style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height="60px" radius="8px" style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height="60px" radius="8px" style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height="60px" radius="8px" style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height="60px" radius="8px" />
            </Card>
          </ReportSection>

          <ReportSection>
            <Skeleton width="150px" height="24px" radius="6px" style={{ marginBottom: '16px' }} />
            <Card style={{ padding: '24px' }}>
              <Skeleton width="100%" height="60px" radius="8px" style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height="60px" radius="8px" style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height="60px" radius="8px" style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height="60px" radius="8px" style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height="60px" radius="8px" />
            </Card>
          </ReportSection>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <ReportSection>
            <SectionTitle>Vendas Recentes</SectionTitle>
            <RecentSalesCard>
              {recentSales.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#86868b', padding: '20px' }}>
                  Nenhuma venda realizada
                </div>
              ) : (
                recentSales.map((venda) => (
                  <SaleItem key={venda.id}>
                    <SaleInfo>
                      <SaleName>{getClienteName(venda.clienteId)}</SaleName>
                      <SaleDate>{formatDate(venda.data)}</SaleDate>
                    </SaleInfo>
                    <SaleValue>R$ {venda.total.toFixed(2).replace('.', ',')}</SaleValue>
                  </SaleItem>
                ))
              )}
            </RecentSalesCard>
          </ReportSection>

          <ReportSection>
            <SectionTitle>Alertas de Estoque</SectionTitle>
            <StockAlerts>
              {lowStockProducts.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#86868b', padding: '20px' }}>
                  Todos os produtos têm estoque adequado
                </div>
              ) : (
                lowStockProducts.map((item) => (
                  <AlertItem key={item.id}>
                    <AlertIcon />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', color: '#1d1d1f' }}>
                        {getProductName(item.produtoId)}
                      </div>
                      <div style={{ fontSize: '12px', color: '#86868b' }}>
                        Estoque: {item.quantidade} | Mínimo: {item.quantidadeMinima}
                      </div>
                    </div>
                  </AlertItem>
                ))
              )}
            </StockAlerts>
          </ReportSection>
        </div>
      )}
    </>
  );
};

export default Relatorios;