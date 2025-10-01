import styled from 'styled-components';

export const FinanceiroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 12px;
`;

export const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  > div {
    flex: 1;
  }
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #86868b;
  font-weight: 500;
`;

export const StatChange = styled.div<{ isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.isPositive ? '#34C759' : '#FF3B30'};
  margin-top: 8px;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
  margin: 24px 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ChartTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 20px;
`;

export const TableCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background: #f5f5f7;
    border-radius: 8px;
  }

  th {
    padding: 16px;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    color: #1d1d1f;
    border-bottom: 2px solid #e5e5e7;
  }

  td {
    padding: 16px;
    font-size: 14px;
    color: #1d1d1f;
    border-bottom: 1px solid #e5e5e7;
  }

  tbody tr {
    transition: background 0.2s ease;

    &:hover {
      background: #f5f5f7;
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  @media (max-width: 768px) {
    th, td {
      padding: 12px 8px;
      font-size: 12px;
    }
  }
`;
