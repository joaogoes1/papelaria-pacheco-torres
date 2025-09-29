import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavWrapper, NavItem, NavGroup, NavTitle } from '../../styles/components';
import {
  Users,
  Package,
  Warehouse,
  ShoppingCart,
  BarChart3,
  Home,
  Brain
} from 'lucide-react';

const Navigation: React.FC = () => {
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
    <NavWrapper>
      <NavGroup>
        <NavTitle>Menu Principal</NavTitle>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavItem
              key={item.id}
              to={item.path}
              active={location.pathname === item.path}
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