import React from 'react';
import styled from 'styled-components';
import { 
  Users, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  BarChart3,
  Home 
} from 'lucide-react';

const NavWrapper = styled.nav`
  background: white;
  border-right: 1px solid #f0f0f0;
  width: 250px;
  height: calc(100vh - 73px);
  position: fixed;
  left: 0;
  top: 73px;
  padding: 24px 0;
  overflow-y: auto;
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 24px;
  border: none;
  background: ${({ active }) => active ? '#f0f8ff' : 'transparent'};
  color: ${({ active }) => active ? '#007aff' : '#1d1d1f'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: #f8f9fa;
    color: #007aff;
  }
`;

const NavGroup = styled.div`
  margin-bottom: 24px;
`;

const NavTitle = styled.div`
  padding: 0 24px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'produtos', label: 'Produtos', icon: Package },
    { id: 'estoque', label: 'Estoque', icon: Warehouse },
    { id: 'vendas', label: 'Vendas', icon: ShoppingCart },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
  ];

  return (
    <NavWrapper>
      <NavGroup>
        <NavTitle>Menu Principal</NavTitle>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavItem
              key={item.id}
              active={activeSection === item.id}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon size={18} />
              {item.label}
            </NavItem>
          );
        })}
      </NavGroup>
    </NavWrapper>
  );
};

export default Navigation;