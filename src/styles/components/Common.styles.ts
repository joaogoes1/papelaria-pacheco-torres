import styled from 'styled-components';
import { theme } from '../theme';

// Common Page Structure
export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[8]};
  gap: ${theme.spacing[4]};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing[6]};
    gap: ${theme.spacing[3]};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

export const Title = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  letter-spacing: ${theme.typography.letterSpacing.tight};
  line-height: ${theme.typography.lineHeight.tight};
  flex: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[4]};
  letter-spacing: ${theme.typography.letterSpacing.tight};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.xl};
    margin-bottom: ${theme.spacing[3]};
  }
`;

// Empty States
export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing[20]} ${theme.spacing[6]};
  color: ${theme.colors.text.secondary};

  h3 {
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.text.primary};
    margin-bottom: ${theme.spacing[2]};
    font-weight: ${theme.typography.fontWeight.semibold};
  }

  p {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.tertiary};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[12]} ${theme.spacing[4]};

    h3 {
      font-size: ${theme.typography.fontSize.lg};
    }

    p {
      font-size: ${theme.typography.fontSize.sm};
    }
  }
`;

export const EmptyIcon = styled.div`
  width: 96px;
  height: 96px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.gray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing[4]};
  transition: all ${theme.transitions.normal};

  &:hover {
    background: ${theme.colors.gray[200]};
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 72px;
    height: 72px;
  }
`;

// Action Buttons
export const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
  justify-content: flex-end;

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing[1]};
  }
`;

// Special Table Cells
export const PriceCell = styled.td`
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.success};
  font-variant-numeric: tabular-nums;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[3]};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

export const TotalCell = styled.td`
  padding: ${theme.spacing[4]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.success};
  font-variant-numeric: tabular-nums;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing[3]};
    font-size: ${theme.typography.fontSize.sm};
  }
`;