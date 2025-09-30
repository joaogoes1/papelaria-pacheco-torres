import styled from 'styled-components';
import { Card } from '../GlobalStyles';
import { theme } from '../theme';

// Dashboard Grid
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[8]};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${theme.spacing[4]};
    margin-bottom: ${theme.spacing[6]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[3]};
  }
`;

// Stats Cards
export const StatsCard = styled(Card)`
  padding: ${theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.appleLg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[4]};
    gap: ${theme.spacing[3]};
  }
`;

export const StatsIcon = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.xl};
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  flex-shrink: 0;
  box-shadow: 0 4px 12px ${({ color }) => color}40;
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 48px;
    height: 48px;
  }
`;

export const StatsContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StatsTitle = styled.h3`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing[1]};
  font-weight: ${theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.xs};
  }
`;

export const StatsValue = styled.div`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  line-height: ${theme.typography.lineHeight.tight};
  font-variant-numeric: tabular-nums;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

// Quick Actions
export const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[5]};
  margin-bottom: ${theme.spacing[8]};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${theme.spacing[4]};
    margin-bottom: ${theme.spacing[6]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ActionCard = styled(Card)`
  padding: ${theme.spacing[6]};
  text-align: center;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.appleLg};
    border-color: ${theme.colors.blue.light};
  }

  &:active {
    transform: translateY(-2px);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[5]};
  }
`;

export const ActionIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${theme.borderRadius.xl};
  background: linear-gradient(135deg, ${theme.colors.blue.light}15, ${theme.colors.blue.DEFAULT}10);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing[4]};
  color: ${theme.colors.blue.DEFAULT};
  transition: all ${theme.transitions.normal};

  ${ActionCard}:hover & {
    background: linear-gradient(135deg, ${theme.colors.blue.light}25, ${theme.colors.blue.DEFAULT}20);
    transform: scale(1.1);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 56px;
    height: 56px;
  }
`;

export const ActionTitle = styled.h3`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
  line-height: ${theme.typography.lineHeight.tight};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.base};
  }
`;

export const ActionDescription = styled.p`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.tertiary};
  line-height: ${theme.typography.lineHeight.relaxed};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.xs};
  }
`;

// Alerts Section
export const AlertsSection = styled.div`
  margin-top: ${theme.spacing[8]};

  @media (max-width: ${theme.breakpoints.md}) {
    margin-top: ${theme.spacing[6]};
  }
`;

export const AlertCard = styled(Card)`
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[3]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  border-left: 4px solid ${theme.colors.warning};
  background: ${theme.colors.warning}08;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.warning}12;
    transform: translateX(4px);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[3]};
    gap: ${theme.spacing[2]};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

// Charts
export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[6]};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing[5]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing[4]};
    margin-top: ${theme.spacing[4]};
  }
`;

export const ChartCard = styled(Card)`
  padding: ${theme.spacing[6]};
  transition: all ${theme.transitions.normal};

  &:hover {
    box-shadow: ${theme.shadows.appleLg};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[4]};
  }
`;