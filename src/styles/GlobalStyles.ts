import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fafafa;
    color: #1d1d1f;
    line-height: 1.6;
  }

  #root {
    min-height: 100vh;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          padding: 6px 12px;
          font-size: 14px;
          height: 32px;
        `;
      case 'lg':
        return `
          padding: 12px 24px;
          font-size: 16px;
          height: 48px;
        `;
      default:
        return `
          padding: 8px 16px;
          font-size: 14px;
          height: 40px;
        `;
    }
  }}

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: #f5f5f7;
          color: #1d1d1f;
          &:hover {
            background: #e5e5e7;
          }
          &:active {
            background: #d5d5d7;
          }
        `;
      case 'danger':
        return `
          background: #ff6b6b;
          color: white;
          &:hover {
            background: #ff5252;
          }
          &:active {
            background: #f44336;
          }
        `;
      default:
        return `
          background: #007aff;
          color: white;
          &:hover {
            background: #0056cc;
          }
          &:active {
            background: #004499;
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
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }

  &::placeholder {
    color: #86868b;
  }

  &:disabled {
    background: #f5f5f7;
    color: #86868b;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }

  &:disabled {
    background: #f5f5f7;
    color: #86868b;
    cursor: not-allowed;
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
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.th`
  background: #f8f9fa;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #1d1d1f;
  border-bottom: 1px solid #e9ecef;
`;

export const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  color: #1d1d1f;

  &:last-child {
    text-align: right;
  }
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Badge = styled.span<{ variant?: 'success' | 'warning' | 'danger' }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${({ variant = 'success' }) => {
    switch (variant) {
      case 'warning':
        return `
          background: #fff3cd;
          color: #856404;
        `;
      case 'danger':
        return `
          background: #f8d7da;
          color: #721c24;
        `;
      default:
        return `
          background: #d4edda;
          color: #155724;
        `;
    }
  }}
`;