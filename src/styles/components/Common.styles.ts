import styled from 'styled-components';

// Common Page Structure
export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
  flex: 1;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 16px;
`;

// Empty States
export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #86868b;
`;

export const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

// Action Buttons
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

// Special Table Cells
export const PriceCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
  color: #34c759;
`;

export const TotalCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
  color: #34c759;
`;