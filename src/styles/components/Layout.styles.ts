import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Header Styles
export const HeaderWrapper = styled.header`
  background: white;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.95);
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
`;

export const UserInfo = styled.div`
  font-size: 14px;
  color: #86868b;
`;

// Navigation Styles
export const NavWrapper = styled.nav`
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

export const NavItem = styled(Link)<{ active?: boolean }>`
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
  text-decoration: none;

  &:hover {
    background: #f8f9fa;
    color: #007aff;
  }
`;

export const NavGroup = styled.div`
  margin-bottom: 24px;
`;

export const NavTitle = styled.div`
  padding: 0 24px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;