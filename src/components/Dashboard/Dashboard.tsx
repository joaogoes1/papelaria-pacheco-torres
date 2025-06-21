import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../styles/GlobalStyles';
import { 
  Users, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  Plus,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const DashboardGrid = styled.div`
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

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const ActionCard = styled(Card)`
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #f0f8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #007aff;
`;

const ActionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 8px;
`;

const ActionDescription = styled.p`
  font-size: 14px;
  color: #86868b;
  line-height: 1.4;
`;

const AlertsSection = styled.div`
  margin-top: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 16px;
`;

const AlertCard = styled(Card)`
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 4px solid #ffa500;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <DashboardGrid>
        <StatsCard>
          <StatsIcon color="#007aff">
            <Users size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Total de Clientes</StatsTitle>
            <StatsValue>2</StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#34c759">
            <Package size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Produtos Cadastrados</StatsTitle>
            <StatsValue>3</StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#ff9500">
            <Warehouse size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Itens em Estoque</StatsTitle>
            <StatsValue>175</StatsValue>
          </StatsContent>
        </StatsCard>

        <StatsCard>
          <StatsIcon color="#af52de">
            <TrendingUp size={24} />
          </StatsIcon>
          <StatsContent>
            <StatsTitle>Vendas Hoje</StatsTitle>
            <StatsValue>R$ 27,15</StatsValue>
          </StatsContent>
        </StatsCard>
      </DashboardGrid>

      <SectionTitle>Ações Rápidas</SectionTitle>
      <QuickActions>
        <ActionCard onClick={() => navigate('/clientes')}>
          <ActionIcon>
            <Plus size={24} />
          </ActionIcon>
          <ActionTitle>Novo Cliente</ActionTitle>
          <ActionDescription>
            Cadastre um novo cliente no sistema
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => navigate('/produtos')}>
          <ActionIcon>
            <Package size={24} />
          </ActionIcon>
          <ActionTitle>Novo Produto</ActionTitle>
          <ActionDescription>
            Adicione um novo produto ao catálogo
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => navigate('/vendas')}>
          <ActionIcon>
            <ShoppingCart size={24} />
          </ActionIcon>
          <ActionTitle>Nova Venda</ActionTitle>
          <ActionDescription>
            Registre uma nova venda no sistema
          </ActionDescription>
        </ActionCard>

        <ActionCard onClick={() => navigate('/estoque')}>
          <ActionIcon>
            <Warehouse size={24} />
          </ActionIcon>
          <ActionTitle>Controlar Estoque</ActionTitle>
          <ActionDescription>
            Gerencie o estoque dos produtos
          </ActionDescription>
        </ActionCard>
      </QuickActions>

      <AlertsSection>
        <SectionTitle>Alertas</SectionTitle>
        <AlertCard>
          <AlertTriangle size={20} color="#ffa500" />
          <div>
            <strong>Estoque baixo:</strong> Alguns produtos estão com estoque próximo ao mínimo.
          </div>
        </AlertCard>
      </AlertsSection>
    </>
  );
};

export default Dashboard;