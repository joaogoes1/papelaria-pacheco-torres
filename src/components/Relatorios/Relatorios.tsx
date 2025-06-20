import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart3, TrendingUp, Users, Package, Calendar } from 'lucide-react';
import { Card } from '../../styles/GlobalStyles';
import { useApi } from '../../hooks/useApi';
import { vendasAPI, clientesAPI, produtosAPI, estoqueAPI } from '../../services/api';

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 24px;
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

  const { data: vendas } = useApi(() => vendasAPI.getAll());
  const { data: clientes } = useApi(() => clientesAPI.getAll());
  const { data: produtos } = useApi(() => produtosAPI.getAll());
  const { data: estoque } = useApi(() => estoqueAPI.getAll());

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

      <StatsGrid>
        <StatsCard>
          <StatsIcon color="#007aff">
            <TrendingUp size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Faturamento Total</StatsTitle>
            <StatsValue>R$ {stats.faturamentoTotal.toFixed(2).replace('.', ',')}</StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#34c759">
            <BarChart3 size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Total de Vendas</StatsTitle>
            <StatsValue>{stats.totalVendas}</StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#af52de">
            <Calendar size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Vendas Hoje</StatsTitle>
            <StatsValue>R$ {stats.vendasHoje.toFixed(2).replace('.', ',')}</StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#ff9500">
            <Users size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Total de Clientes</StatsTitle>
            <StatsValue>{stats.totalClientes}</StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#00d4aa">
            <Package size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Produtos Cadastrados</StatsTitle>
            <StatsValue>{stats.totalProdutos}</StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#ff6b6b">
            <Package size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Produtos Baixo Estoque</StatsTitle>
            <StatsValue>{stats.produtosBaixoEstoque}</StatsValue>
          </StatsContent>
        </StatsCard>
      </StatsGrid>

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
    </>
  );
};

export default Relatorios;