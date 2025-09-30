import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { HeaderWrapper, HeaderContent, Logo, UserInfo } from '../../styles/components';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[2]};
  background: transparent;
  border: none;
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  border-radius: ${theme.borderRadius.md};

  &:hover {
    background: ${theme.colors.gray[100]};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    display: flex;
  }
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #007aff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing[2]};
  }
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.fontWeight.medium};

  @media (max-width: ${theme.breakpoints.sm}) {
    span {
      display: none;
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.primary};
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover {
    background: ${theme.colors.gray[50]};
    border-color: ${theme.colors.gray[400]};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[2]} ${theme.spacing[3]};

    span {
      display: none;
    }
  }
`;

interface HeaderProps {
  title?: string;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title = "Papelaria Pacheco Torres",
  onMenuToggle,
  isMenuOpen = false
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
            <MenuButton onClick={onMenuToggle} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </MenuButton>
            <Logo>
              <LogoIcon>E</LogoIcon>
              {title}
            </Logo>
          </div>
          <UserSection>
            {user && (
              <UserName>
                <User size={18} />
                <span>{user.username}</span>
              </UserName>
            )}
            <LogoutButton onClick={handleLogout}>
              <LogOut size={16} />
              <span>Sair</span>
            </LogoutButton>
          </UserSection>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;