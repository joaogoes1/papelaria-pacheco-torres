import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  Brain,
  Warehouse
} from 'lucide-react';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboardStats } from '../../hooks/useDashboardData';
import { usePageTitle } from '../../hooks/usePageTitle';
import AnimatedCounter from '../AnimatedCounter';
import { MetricCardsSkeletonGrid, MetricCardSkeleton } from '../Skeleton';
import { MetricCard } from '../MetricCard';

const HomeWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
`;

const HeroSection = styled.div`
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing[16]} ${theme.spacing[12]};
  color: white;
  margin-bottom: ${theme.spacing[12]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-30px, -30px) rotate(180deg); }
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} ${theme.spacing[8]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[10]} ${theme.spacing[6]};
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const WelcomeText = styled.div`
  font-size: ${theme.typography.fontSize.lg};
  color: #FFFFFF;
  margin-bottom: ${theme.spacing[3]};
  font-weight: ${theme.typography.fontWeight.medium};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.fontSize['6xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing[4]};
  line-height: ${theme.typography.lineHeight.tight};
  color: #FFFFFF;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['5xl']};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.fontSize.xl};
  color: #FFFFFF;
  max-width: 700px;
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing[8]};
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[4]} ${theme.spacing[8]};
  background: white;
  color: #007aff;
  border: none;
  border-radius: ${theme.borderRadius.xl};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[12]};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[4]};
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[8]};
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.normal};
  border: 1px solid ${theme.colors.gray[200]};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[4]};
`;

const StatIcon = styled.div<{ color: string; bgColor: string }>`
  width: 56px;
  height: 56px;
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: ${theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px ${({ color }) => `${color}30`};
`;

const StatTrend = styled.div<{ positive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  background: ${({ positive }) => positive ? '#D4EDDA' : '#F8D7DA'};
  color: ${({ positive }) => positive ? '#155724' : '#721C24'};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
`;

const StatValue = styled.div`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

const StatLabel = styled.div`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const QuickActionsSection = styled.div`
  margin-bottom: ${theme.spacing[12]};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[6]};
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing[6]};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[4]};
  }
`;

const ActionCard = styled.button`
  background: white;
  border: 2px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[8]};
  text-align: left;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: #007aff;
    transition: height ${theme.transitions.normal};
  }

  &:hover {
    border-color: #007aff;
    transform: translateX(4px);
    box-shadow: ${theme.shadows.lg};

    &::before {
      height: 100%;
    }
  }
`;

const ActionIcon = styled.div<{ color: string; bgColor: string }>`
  width: 48px;
  height: 48px;
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing[4]};
  box-shadow: 0 2px 8px ${({ color }) => `${color}20`};
`;

const ActionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

const ActionDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const FeaturesSection = styled.div`
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[12]} ${theme.spacing[8]};
  margin-bottom: ${theme.spacing[12]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[8]} ${theme.spacing[6]};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[8]};
  margin-top: ${theme.spacing[8]};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[6]};
  }
`;

const FeatureItem = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #007aff15;
  color: #007aff;
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]};
`;

const FeatureDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const Home: React.FC = () => {
  usePageTitle('Início');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, loading } = useDashboardStats();
  const [greeting, setGreeting] = useState('Bem-vindo');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  const quickActions = [
    {
      icon: Users,
      color: '#0051D5',
      bgColor: '#E3F2FD',
      title: 'Gerenciar Clientes',
      description: 'Visualize, adicione ou edite informações de clientes',
      path: '/clientes',
    },
    {
      icon: Package,
      color: '#2E7D32',
      bgColor: '#E8F5E9',
      title: 'Catálogo de Produtos',
      description: 'Gerencie produtos e suas informações',
      path: '/produtos',
    },
    {
      icon: Warehouse,
      color: '#E65100',
      bgColor: '#FFF3E0',
      title: 'Controle de Estoque',
      description: 'Monitore níveis de estoque e alertas',
      path: '/estoque',
    },
    {
      icon: ShoppingCart,
      color: '#7B1FA2',
      bgColor: '#F3E5F5',
      title: 'Registrar Vendas',
      description: 'Crie novas vendas e acompanhe transações',
      path: '/vendas',
    },
    {
      icon: Brain,
      color: '#4527A0',
      bgColor: '#EDE7F6',
      title: 'Previsão IA',
      description: 'Análise preditiva com machine learning',
      path: '/previsao',
    },
    {
      icon: BarChart3,
      color: '#C62828',
      bgColor: '#FFEBEE',
      title: 'Relatórios',
      description: 'Gere relatórios e exporte dados',
      path: '/relatorios',
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Rápido e Eficiente',
      description: 'Interface otimizada para máxima produtividade',
    },
    {
      icon: Shield,
      title: 'Seguro',
      description: 'Autenticação JWT e proteção de dados',
    },
    {
      icon: Clock,
      title: 'Tempo Real',
      description: 'Atualizações instantâneas de estoque e vendas',
    },
    {
      icon: Brain,
      title: 'Inteligente',
      description: 'Machine Learning para previsões de vendas',
    },
  ];

  return (
    <HomeWrapper>
      <HeroSection>
        <HeroContent>
          <WelcomeText>{greeting}, {user?.username}! 👋</WelcomeText>
          <HeroTitle>Papelaria Pacheco Torres</HeroTitle>
          <HeroSubtitle>
            Sistema completo de gestão empresarial. Controle vendas, estoque, clientes e tome decisões estratégicas com análises em tempo real.
          </HeroSubtitle>
          <CTAButton onClick={() => navigate('/vendas')}>
            Nova Venda <ArrowRight size={20} />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      {loading ? (
        <MetricCardsSkeletonGrid>
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </MetricCardsSkeletonGrid>
      ) : (
        <StatsGrid>
          <MetricCard
            icon={Users}
            iconColor="#0051D5"
            iconBgColor="#E3F2FD"
            value={<AnimatedCounter value={stats.totalClientes} />}
            label="Total de Clientes"
            trend={{ value: 12, isPositive: true }}
          />

          <MetricCard
            icon={Package}
            iconColor="#2E7D32"
            iconBgColor="#E8F5E9"
            value={<AnimatedCounter value={stats.totalProdutos} />}
            label="Produtos Ativos"
            trend={{ value: 8, isPositive: true }}
          />

          <MetricCard
            icon={Warehouse}
            iconColor="#E65100"
            iconBgColor="#FFF3E0"
            value={<AnimatedCounter value={stats.totalItensEstoque} />}
            label="Itens em Estoque"
            trend={{ value: 5, isPositive: true }}
          />

          <MetricCard
            icon={ShoppingCart}
            iconColor="#7B1FA2"
            iconBgColor="#F3E5F5"
            value={<>R$ <AnimatedCounter value={stats.vendasHoje} decimals={2} /></>}
            label="Vendas Hoje"
            trend={{ value: 15, isPositive: true }}
          />
        </StatsGrid>
      )}

      <QuickActionsSection>
        <SectionTitle>Acesso Rápido</SectionTitle>
        <ActionsGrid>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <ActionCard key={index} onClick={() => navigate(action.path)}>
                <ActionIcon color={action.color} bgColor={action.bgColor}>
                  <Icon size={24} />
                </ActionIcon>
                <ActionTitle>{action.title}</ActionTitle>
                <ActionDescription>{action.description}</ActionDescription>
              </ActionCard>
            );
          })}
        </ActionsGrid>
      </QuickActionsSection>

      <FeaturesSection>
        <SectionTitle>Por que usar nosso ERP?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FeatureItem key={index}>
                <FeatureIcon>
                  <Icon size={20} />
                </FeatureIcon>
                <FeatureContent>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            );
          })}
        </FeaturesGrid>
      </FeaturesSection>
    </HomeWrapper>
  );
};

export default Home;
