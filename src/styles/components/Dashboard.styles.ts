import styled from 'styled-components';
import { Card } from '../GlobalStyles';

// Dashboard Grid
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

// Stats Cards
export const StatsCard = styled(Card)`
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StatsIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const StatsContent = styled.div`
  flex: 1;
`;

export const StatsTitle = styled.h3`
  font-size: 14px;
  color: #86868b;
  margin-bottom: 4px;
  font-weight: 500;
`;

export const StatsValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
`;

// Quick Actions
export const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

export const ActionCard = styled(Card)`
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const ActionIcon = styled.div`
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

export const ActionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 8px;
`;

export const ActionDescription = styled.p`
  font-size: 14px;
  color: #86868b;
  line-height: 1.4;
`;

// Alerts Section
export const AlertsSection = styled.div`
  margin-top: 32px;
`;

export const AlertCard = styled(Card)`
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 4px solid #ffa500;
`;

// Charts
export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const ChartCard = styled(Card)`
  padding: 16px;
`;