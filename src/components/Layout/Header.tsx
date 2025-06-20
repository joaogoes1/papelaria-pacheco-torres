import React from 'react';
import styled from 'styled-components';
import { Container } from '../../styles/GlobalStyles';
import { ShoppingBag } from 'lucide-react';

const HeaderWrapper = styled.header`
  background: white;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.95);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
`;

const UserInfo = styled.div`
  font-size: 14px;
  color: #86868b;
`;

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Papelaria Pacheco Torres" }) => {
  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <Logo>
            <ShoppingBag size={24} color="#007aff" />
            {title}
          </Logo>
          <UserInfo>
            Sistema de Gestão
          </UserInfo>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;