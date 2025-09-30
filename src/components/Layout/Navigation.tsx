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
  Brain
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

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const navItems = [
    { id: 'dashboard', path: '/', label: 'Dashboard', icon: Home },
    { id: 'clientes', path: '/clientes', label: 'Clientes', icon: Users },
    { id: 'produtos', path: '/produtos', label: 'Produtos', icon: Package },
    { id: 'estoque', path: '/estoque', label: 'Estoque', icon: Warehouse },
    { id: 'vendas', path: '/vendas', label: 'Vendas', icon: ShoppingCart },
    { id: 'previsao', path: '/previsao', label: 'Previsão IA', icon: Brain },
    { id: 'relatorios', path: '/relatorios', label: 'Relatórios', icon: BarChart3 },
  ];

  return (
    <>
      <MobileOverlay isOpen={isOpen} onClick={onClose} />
      <NavWrapper $isOpen={isOpen}>
        <NavGroup>
          <NavTitle>Menu Principal</NavTitle>
          {navItems.map((item) => {
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
              </NavItem>
            );
          })}
        </NavGroup>
      </NavWrapper>
    </>
  );
};

export default Navigation;