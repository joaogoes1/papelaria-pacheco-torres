import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

// Header Styles
export const HeaderWrapper = styled.header`
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  padding: ${theme.spacing[4]} 0;
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.normal};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[3]} 0;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing[6]};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing[4]};
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.tight};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
    gap: ${theme.spacing[2]};
  }
`;

export const UserInfo = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

// Navigation Styles
export const NavWrapper = styled.nav<{ $isOpen?: boolean }>`
  background: ${theme.colors.white};
  border-right: 1px solid ${theme.colors.gray[200]};
  width: 250px;
  height: calc(100vh - 73px);
  position: fixed;
  left: 0;
  top: 73px;
  padding: ${theme.spacing[6]} 0;
  overflow-y: auto;
  transition: transform ${theme.transitions.normal};
  z-index: ${theme.zIndex.modal};

  @media (max-width: ${theme.breakpoints.lg}) {
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    box-shadow: ${theme.shadows.lg};
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.full};

    &:hover {
      background: ${theme.colors.gray[400]};
    }
  }
`;

export const NavItem = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border: none;
  background: ${({ active }) => active ? theme.colors.blue.light + '15' : 'transparent'};
  color: ${({ active }) => active ? theme.colors.blue.DEFAULT : theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  text-align: left;
  text-decoration: none;
  position: relative;

  ${({ active }) => active && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: ${theme.colors.blue.DEFAULT};
      border-radius: 0 ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0;
    }
  `}

  &:hover {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.blue.DEFAULT};
    transform: translateX(2px);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    flex-shrink: 0;
  }
`;

export const NavGroup = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

export const NavTitle = styled.div`
  padding: 0 ${theme.spacing[6]} ${theme.spacing[3]};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wider};
`;