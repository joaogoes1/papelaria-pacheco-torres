import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { HeaderWrapper, HeaderContent, Logo, UserInfo } from '../../styles/components';
import { ShoppingBag, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1d1d1f;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: none;
  border: 1px solid #e5e5e7;
  border-radius: 8px;
  font-size: 14px;
  color: #1d1d1f;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f7;
    border-color: #d2d2d7;
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Papelaria Pacheco Torres" }) => {
  const { user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <Logo>
            <ShoppingBag size={24} color="#007aff" />
            {title}
          </Logo>
          <UserSection>
            {user && (
              <UserName>
                <User size={18} />
                <span>{user.username}</span>
              </UserName>
            )}
            <LogoutButton onClick={logout}>
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