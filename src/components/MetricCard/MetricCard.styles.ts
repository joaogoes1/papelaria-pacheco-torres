import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const CardContainer = styled.div<{ clickable?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.gray[200]};
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 20px;
  }
`;

export const IconWrapper = styled.div<{ color: string; bgColor: string }>`
  width: 56px;
  height: 56px;
  min-width: 56px;
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px ${({ color }) => `${color}20`};

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 48px;
    height: 48px;
    min-width: 48px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const CardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ValueSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`;

export const Value = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1d1d1f;
  line-height: 1.2;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 24px;
  }
`;

export const Label = styled.div`
  font-size: 14px;
  color: #86868b;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TrendBadge = styled.div<{ isPositive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${({ isPositive }) => isPositive ? '#D4EDDA' : '#F8D7DA'};
  color: ${({ isPositive }) => isPositive ? '#155724' : '#721C24'};
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;
