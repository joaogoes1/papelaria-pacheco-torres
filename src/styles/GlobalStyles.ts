import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* Reset and base styles */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.regular};
    line-height: ${theme.typography.lineHeight.normal};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.primary};
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.semibold};
    line-height: ${theme.typography.lineHeight.tight};
    letter-spacing: ${theme.typography.letterSpacing.tight};
    color: ${theme.colors.text.primary};
  }

  h1 {
    font-size: ${theme.typography.fontSize['6xl']};
    font-weight: ${theme.typography.fontWeight.bold};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['4xl']};
    }
  }

  h2 {
    font-size: ${theme.typography.fontSize['4xl']};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['3xl']};
    }
  }

  h3 {
    font-size: ${theme.typography.fontSize['3xl']};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }

  p {
    line-height: ${theme.typography.lineHeight.relaxed};
    color: ${theme.colors.text.secondary};
  }

  a {
    color: ${theme.colors.blue.DEFAULT};
    text-decoration: none;
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.blue.dark};
    }
  }

  button {
    font-family: ${theme.typography.fontFamily.primary};
    cursor: pointer;
    border: none;
    outline: none;
  }

  /* Scrollbar styling (Apple-like) */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.full};
    border: 3px solid ${theme.colors.gray[100]};

    &:hover {
      background: ${theme.colors.gray[400]};
    }
  }

  /* Selection styling */
  ::selection {
    background-color: ${theme.colors.blue.light};
    color: ${theme.colors.white};
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid ${theme.colors.blue.DEFAULT};
    outline-offset: 2px;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing[6]};

  @media (max-width: ${theme.breakpoints.lg}) {
    max-width: 100%;
    padding: 0 ${theme.spacing[5]};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing[4]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing[3]};
  }
`;

export const Card = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.apple};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.normal};

  &:hover {
    box-shadow: ${theme.shadows.appleLg};
  }
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  border: none;
  outline: none;
  font-family: ${theme.typography.fontFamily.primary};
  white-space: nowrap;

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
          height: 32px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.lg};
          height: 52px;
        `;
      default:
        return `
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.sm};
          height: 40px;
        `;
    }
  }}

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.colors.gray[100]};
          color: ${theme.colors.text.primary};
          &:hover {
            background: ${theme.colors.gray[200]};
            transform: translateY(-1px);
          }
          &:active {
            background: ${theme.colors.gray[300]};
            transform: translateY(0);
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.white};
          &:hover {
            background: ${theme.colors.error}dd;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px ${theme.colors.error}40;
          }
          &:active {
            background: ${theme.colors.error}cc;
            transform: translateY(0);
          }
        `;
      default:
        return `
          background: ${theme.colors.blue.DEFAULT};
          color: ${theme.colors.white};
          &:hover {
            background: ${theme.colors.blue.dark};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px ${theme.colors.blue.DEFAULT}40;
          }
          &:active {
            background: ${theme.colors.blue.dark};
            transform: translateY(0);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.xs};
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.primary};
  transition: all ${theme.transitions.fast};
  background: ${theme.colors.white};
  color: ${theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue.DEFAULT};
    box-shadow: 0 0 0 4px ${theme.colors.blue.DEFAULT}15;
  }

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  &:disabled {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.text.tertiary};
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.primary};
  transition: all ${theme.transitions.fast};
  background: ${theme.colors.white};
  color: ${theme.colors.text.primary};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.blue.DEFAULT};
    box-shadow: 0 0 0 4px ${theme.colors.blue.DEFAULT}15;
  }

  &:disabled {
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.text.tertiary};
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[2]} ${theme.spacing[3]};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #1d1d1f;
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ff6b6b;
  margin-top: 4px;
`;

export const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.apple};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const TableHeader = styled.th`
  background: ${theme.colors.gray[50]};
  padding: ${theme.spacing[4]};
  text-align: left;
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  border-bottom: 2px solid ${theme.colors.gray[200]};
  font-size: ${theme.typography.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[3]};
    font-size: ${theme.typography.fontSize.xs};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[2]};
  }
`;

export const TableCell = styled.td`
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid ${theme.colors.gray[100]};
  color: ${theme.colors.text.primary};
  vertical-align: middle;

  &:last-child {
    text-align: right;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[3]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing[2]};
  }
`;

export const TableRow = styled.tr`
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.gray[50]};
  }

  &:last-child td {
    border-bottom: none;
  }

  &:active {
    background: ${theme.colors.gray[100]};
  }
`;

export const SearchBar = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing[3]};
    margin-bottom: ${theme.spacing[4]};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Badge = styled.span<{ variant?: 'success' | 'warning' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: ${theme.typography.letterSpacing.wide};
  white-space: nowrap;

  ${({ variant = 'success' }) => {
    switch (variant) {
      case 'warning':
        return `
          background: ${theme.colors.warning}20;
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning}40;
        `;
      case 'danger':
        return `
          background: ${theme.colors.error}20;
          color: ${theme.colors.error};
          border: 1px solid ${theme.colors.error}40;
        `;
      default:
        return `
          background: ${theme.colors.success}20;
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success}40;
        `;
    }
  }}
`;