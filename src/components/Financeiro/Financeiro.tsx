import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../styles/GlobalStyles';
import { usePageTitle } from '../../hooks/usePageTitle';
import api from '../../services/api';
import { FinanceiroData } from '../../types';
import * as echarts from 'echarts';
import {
  FinanceiroContainer,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatChange,
  ChartsGrid,
  ChartCard,
  ChartTitle,
  TableCard,
  Table,
} from './Financeiro.styles';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, CreditCard, Target } from 'lucide-react';
import { toast } from 'react-toastify';
import { MetricCardSkeleton, MetricCardsSkeletonGrid, ChartSkeleton, ChartsSkeletonGrid, TableSkeleton } from '../Skeleton';

const PageHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    color: #1d1d1f;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #86868b;
  }
`;

const Financeiro: React.FC = () => {
  usePageTitle('Financeiro');
  const [data, setData] = useState<FinanceiroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinanceiroData();
  }, []);

  const fetchFinanceiroData = async () => {
    try {
      setLoading(true);
      const response = await api.get<FinanceiroData>('/financeiro');
      setData(response.data);

      // Renderizar gráficos após dados carregados
      setTimeout(() => {
        if (response.data) {
          renderReceitaMensalChart(response.data.receitaPorMes);
          renderCategoriaChart(response.data.vendasPorCategoria);
        }
      }, 100);
    } catch (error) {
      console.error('Erro ao carregar dados financeiros:', error);
      toast.error('Erro ao carregar dados financeiros');
    } finally {
      setLoading(false);
    }
  };

  const renderReceitaMensalChart = (receitaPorMes: FinanceiroData['receitaPorMes']) => {
    const chartDom = document.getElementById('receita-mensal-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: receitaPorMes.map(r => r.mes),
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: 'Receita (R$)'
      },
      series: [
        {
          name: 'Receita',
          type: 'bar',
          data: receitaPorMes.map(r => r.receita),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#007aff' },
              { offset: 1, color: '#5856d6' }
            ])
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params: any) => `R$ ${params.value.toFixed(2)}`
          }
        }
      ]
    };

    myChart.setOption(option);
  };

  const renderCategoriaChart = (vendasPorCategoria: FinanceiroData['vendasPorCategoria']) => {
    const chartDom = document.getElementById('categoria-chart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: R$ {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Receita por Categoria',
          type: 'pie',
          radius: '60%',
          data: vendasPorCategoria.map(v => ({
            name: v.categoria,
            value: v.receita
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    myChart.setOption(option);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (loading) {
    return (
      <Container>
        <PageHeader>
          <h1>Financeiro</h1>
          <p>Visualize o desempenho financeiro da sua empresa</p>
        </PageHeader>

        <FinanceiroContainer>
          {/* Loading Skeleton para Cards */}
          <MetricCardsSkeletonGrid>
            {[...Array(6)].map((_, index) => (
              <MetricCardSkeleton key={index} />
            ))}
          </MetricCardsSkeletonGrid>

          {/* Loading Skeleton para Gráficos */}
          <ChartsSkeletonGrid>
            <ChartSkeleton />
            <ChartSkeleton />
          </ChartsSkeletonGrid>

          {/* Loading Skeleton para Tabelas */}
          <TableSkeleton />
          <TableSkeleton />
        </FinanceiroContainer>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <PageHeader>
          <h1>Financeiro</h1>
        </PageHeader>
        <p>Erro ao carregar dados financeiros</p>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader>
        <h1>Financeiro</h1>
        <p>Visualize o desempenho financeiro da sua empresa</p>
      </PageHeader>

      <FinanceiroContainer>
        {/* Cards de Estatísticas */}
        <StatsGrid>
          <StatCard>
            <DollarSign size={32} color="#007aff" />
            <div>
              <StatValue>{formatCurrency(data.receitaTotal)}</StatValue>
              <StatLabel>Receita Total</StatLabel>
            </div>
          </StatCard>

          <StatCard>
            <CreditCard size={32} color="#34C759" />
            <div>
              <StatValue>{formatCurrency(data.receitaMensal)}</StatValue>
              <StatLabel>Receita Mensal</StatLabel>
              <StatChange isPositive={data.crescimentoMensal >= 0}>
                {data.crescimentoMensal >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(data.crescimentoMensal).toFixed(2)}%
              </StatChange>
            </div>
          </StatCard>

          <StatCard>
            <ShoppingCart size={32} color="#FF9500" />
            <div>
              <StatValue>{formatCurrency(data.receitaDiaria)}</StatValue>
              <StatLabel>Receita Hoje</StatLabel>
            </div>
          </StatCard>

          <StatCard>
            <Target size={32} color="#5856d6" />
            <div>
              <StatValue>{formatCurrency(data.ticketMedio)}</StatValue>
              <StatLabel>Ticket Médio</StatLabel>
            </div>
          </StatCard>

          <StatCard>
            <ShoppingCart size={32} color="#FF2D55" />
            <div>
              <StatValue>{data.totalVendas}</StatValue>
              <StatLabel>Total de Vendas</StatLabel>
            </div>
          </StatCard>

          <StatCard>
            <ShoppingCart size={32} color="#AF52DE" />
            <div>
              <StatValue>{data.totalVendasMes}</StatValue>
              <StatLabel>Vendas do Mês</StatLabel>
            </div>
          </StatCard>
        </StatsGrid>

        {/* Gráficos */}
        <ChartsGrid>
          <ChartCard>
            <ChartTitle>Receita Mensal (Últimos 12 Meses)</ChartTitle>
            <div id="receita-mensal-chart" style={{ width: '100%', height: '400px' }}></div>
          </ChartCard>

          <ChartCard>
            <ChartTitle>Receita por Categoria</ChartTitle>
            <div id="categoria-chart" style={{ width: '100%', height: '400px' }}></div>
          </ChartCard>
        </ChartsGrid>

        {/* Top 10 Clientes */}
        <TableCard>
          <ChartTitle>Top 10 Clientes</ChartTitle>
          <Table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Cliente</th>
                <th>Total Gasto</th>
                <th>Compras</th>
                <th>Ticket Médio</th>
              </tr>
            </thead>
            <tbody>
              {data.topClientes.map((cliente, index) => (
                <tr key={cliente.clienteId}>
                  <td>#{index + 1}</td>
                  <td>{cliente.clienteNome}</td>
                  <td>{formatCurrency(cliente.totalGasto)}</td>
                  <td>{cliente.totalCompras}</td>
                  <td>{formatCurrency(cliente.totalGasto / cliente.totalCompras)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>

        {/* Vendas por Categoria */}
        <TableCard>
          <ChartTitle>Vendas por Categoria</ChartTitle>
          <Table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Receita</th>
                <th>Quantidade Vendida</th>
                <th>Preço Médio</th>
              </tr>
            </thead>
            <tbody>
              {data.vendasPorCategoria.map((categoria) => (
                <tr key={categoria.categoria}>
                  <td>{categoria.categoria}</td>
                  <td>{formatCurrency(categoria.receita)}</td>
                  <td>{categoria.quantidadeVendida}</td>
                  <td>{formatCurrency(categoria.receita / categoria.quantidadeVendida)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>
      </FinanceiroContainer>
    </Container>
  );
};

export default Financeiro;
