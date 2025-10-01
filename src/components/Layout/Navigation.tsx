import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavWrapper, NavItem, NavGroup, NavTitle } from '../../styles/components';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import {
  Users,
  Package,
  Warehouse,
  ShoppingCart,
  BarChart3,
  Home,
  Brain,
  FileBarChart,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const MobileOverlay = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: ${theme.zIndex.modalBackdrop};
    backdrop-filter: blur(4px);
  }
`;

const NavDivider = styled.div`
  height: 1px;
  background: ${theme.colors.gray[200]};
  margin: ${theme.spacing[4]} ${theme.spacing[6]};
`;

const NavBadge = styled.span<{ color?: string }>`
  margin-left: auto;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  background: ${({ color }) => color || theme.colors.blue.DEFAULT}15;
  color: ${({ color }) => color || theme.colors.blue.DEFAULT};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  border-radius: ${theme.borderRadius.full};
  line-height: 1;
`;

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();

  const mainMenuItems = [
    { id: 'home', path: '/', label: 'Início', icon: Home },
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  const managementItems = [
    { id: 'clientes', path: '/clientes', label: 'Clientes', icon: Users },
    { id: 'produtos', path: '/produtos', label: 'Produtos', icon: Package },
    { id: 'estoque', path: '/estoque', label: 'Estoque', icon: Warehouse },
  ];

  const operationsItems = [
    { id: 'vendas', path: '/vendas', label: 'Vendas', icon: ShoppingCart },
  ];

  const analyticsItems = [
    { id: 'financeiro', path: '/financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'previsao', path: '/previsao', label: 'Previsão IA', icon: Brain, badge: 'IA', badgeColor: '#5856d6' },
    { id: 'relatorios', path: '/relatorios', label: 'Relatórios', icon: FileBarChart },
  ];

  const renderNavItems = (items: typeof mainMenuItems) => {
    return items.map((item) => {
      const Icon = item.icon;
      return (
        <NavItem
          key={item.id}
          to={item.path}
          active={location.pathname === item.path}
          onClick={onClose}
        >
          <Icon size={18} />
          {item.label}
          {'badge' in item && item.badge && (
            <NavBadge color={'badgeColor' in item ? item.badgeColor : undefined}>
              {item.badge}
            </NavBadge>
          )}
        </NavItem>
      );
    });
  };

  return (
    <>
      <MobileOverlay isOpen={isOpen} onClick={onClose} />
      <NavWrapper $isOpen={isOpen}>
        <NavGroup>
          <NavTitle>Principal</NavTitle>
          {renderNavItems(mainMenuItems)}
        </NavGroup>

        <NavDivider />

        <NavGroup>
          <NavTitle>Cadastros</NavTitle>
          {renderNavItems(managementItems)}
        </NavGroup>

        <NavDivider />

        <NavGroup>
          <NavTitle>Operações</NavTitle>
          {renderNavItems(operationsItems)}
        </NavGroup>

        <NavDivider />

        <NavGroup>
          <NavTitle>Análises</NavTitle>
          {renderNavItems(analyticsItems)}
        </NavGroup>
      </NavWrapper>
    </>
  );
};

export default Navigation;