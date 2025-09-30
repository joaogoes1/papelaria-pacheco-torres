import {
  AlertTriangle,
  Package,
  Plus,
  ShoppingCart,
  TrendingUp,
  Users,
  Warehouse,
  Sparkles,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  DashboardGrid,
  StatsCard,
  StatsIcon,
  StatsContent,
  StatsTitle,
  StatsValue,
  QuickActions,
  ActionCard,
  ActionIcon,
  ActionTitle,
  ActionDescription,
  AlertsSection,
  SectionTitle,
  AlertCard,
  ChartsGrid,
  ChartCard,
} from "../../styles/components";
import {
  BinomialDistributionChart,
  NormalDistributionChart,
  SalesBoxplotChart,
  SalesPerClientChart,
  StockStatusChart,
  TopProductsChart,
} from "../Charts";
import { useDashboardStats, useDashboardCharts } from "../../hooks/useDashboardData";
import { theme } from "../../styles/theme";
import {
  MetricCardSkeleton,
  MetricCardsSkeletonGrid,
  QuickActionsSkeleton,
  ChartSkeleton,
  ChartsSkeletonGrid,
} from "../Skeleton";
import AnimatedCounter from "../AnimatedCounter";

const HeroSection = styled.div`
  margin-bottom: ${theme.spacing[10]};
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing[8]};
  }
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.fontSize['7xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[4]};
  letter-spacing: ${theme.typography.letterSpacing.tighter};
  line-height: ${theme.typography.lineHeight.tight};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['5xl']};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: ${theme.typography.lineHeight.relaxed};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.base};
  }
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { chartsData, loading: chartsLoading } = useDashboardCharts();

  return (
    <>
      <HeroSection>
        <HeroTitle>Dashboard</HeroTitle>
        <HeroSubtitle>
          Visão geral completa do seu negócio em tempo real
        </HeroSubtitle>
      </HeroSection>

      {statsLoading ? (
        <MetricCardsSkeletonGrid>
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </MetricCardsSkeletonGrid>
      ) : (
        <DashboardGrid>
        <StatsCard>
          <StatsIcon color="#007aff">
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
          <StatsIcon color="#34c759">
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
          <StatsIcon color="#ff9500">
            <Warehouse size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Itens em Estoque</StatsTitle>
            <StatsValue>
              <AnimatedCounter value={stats.totalItensEstoque} />
            </StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#af52de">
            <TrendingUp size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Vendas Hoje</StatsTitle>
            <StatsValue>
              R$ <AnimatedCounter value={stats.vendasHoje} decimals={2} />
            </StatsValue>
          </StatsContent>
        </StatsCard>
      </DashboardGrid>
      )}

      <SectionTitle>Ações Rápidas</SectionTitle>
      {statsLoading ? (
        <QuickActionsSkeleton />
      ) : (
        <QuickActions>
        <ActionCard onClick={() => navigate("/clientes")}>
          <ActionIcon>
            <Plus size={24} />
          </ActionIcon>
          <ActionTitle>Novo Cliente</ActionTitle>
          <ActionDescription>
            Cadastre um novo cliente no sistema
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => navigate("/produtos")}>
          <ActionIcon>
            <Package size={24} />
          </ActionIcon>
          <ActionTitle>Novo Produto</ActionTitle>
          <ActionDescription>
            Adicione um novo produto ao catálogo
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => navigate("/vendas")}>
          <ActionIcon>
            <ShoppingCart size={24} />
          </ActionIcon>
          <ActionTitle>Nova Venda</ActionTitle>
          <ActionDescription>
            Registre uma nova venda no sistema
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => navigate("/estoque")}>
          <ActionIcon>
            <Warehouse size={24} />
          </ActionIcon>
          <ActionTitle>Controlar Estoque</ActionTitle>
          <ActionDescription>Gerencie o estoque dos produtos</ActionDescription>
        </ActionCard>
      </QuickActions>
      )}

      <SectionTitle>Análise Estatística</SectionTitle>
      {chartsLoading ? (
        <ChartsSkeletonGrid>
          <ChartSkeleton type="line" />
          <ChartSkeleton type="bar" />
          <ChartSkeleton type="line" />
          <ChartSkeleton type="bar" />
          <ChartSkeleton type="bar" />
          <ChartSkeleton type="bar" />
        </ChartsSkeletonGrid>
      ) : (
        <ChartsGrid>
        <ChartCard>
          <NormalDistributionChart 
            media={chartsData.normalDistribution.media} 
            desvio={chartsData.normalDistribution.desvio} 
            min={chartsData.normalDistribution.min} 
            max={chartsData.normalDistribution.max} 
          />
        </ChartCard>

        <ChartCard>
          <SalesBoxplotChart
            valores={chartsData.salesBoxplot.valores}
            categoryLabel="total"
          />
        </ChartCard>

        <ChartCard>
          <BinomialDistributionChart 
            n={chartsData.binomialDistribution.n} 
            p={chartsData.binomialDistribution.p} 
          />
        </ChartCard>

        <ChartCard>
          <TopProductsChart
            produtos={chartsData.topProdutos.produtos}
            quantidades={chartsData.topProdutos.quantidades}
          />
        </ChartCard>

        <ChartCard>
          <StockStatusChart
            produtos={chartsData.stockStatus.produtos}
            estoqueAtual={chartsData.stockStatus.estoqueAtual}
            estoqueMin={chartsData.stockStatus.estoqueMin}
          />
        </ChartCard>

        <ChartCard>
          <SalesPerClientChart
            clientes={chartsData.salesPerClient.clientes}
            totais={chartsData.salesPerClient.totais}
          />
        </ChartCard>
      </ChartsGrid>
      )}

      {!chartsLoading && (
        <AlertsSection>
          <SectionTitle>Alertas</SectionTitle>
          {chartsData.alertas.length > 0 ? (
            chartsData.alertas.map((alerta, index) => (
              <AlertCard key={index}>
                <AlertTriangle size={20} color="#ffa500" />
                <div>
                  <strong>Estoque baixo:</strong> Produto ID {alerta.produtoId} está com
                  {alerta.quantidade} unidades (mínimo: {alerta.quantidadeMinima}).
                </div>
              </AlertCard>
            ))
          ) : (
            <AlertCard>
              <AlertTriangle size={20} color="#34c759" />
              <div>
                <strong>Tudo em ordem:</strong> Nenhum produto com estoque baixo.
              </div>
            </AlertCard>
          )}
        </AlertsSection>
      )}
    </>
  );
};

export default Dashboard;
