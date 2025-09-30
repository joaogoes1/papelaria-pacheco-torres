import styled from 'styled-components';
import { Skeleton } from './SkeletonLoader';

const SkeletonTableContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SkeletonTableHeader = styled.div`
  display: grid;
  grid-template-columns: ${(props: { columns: number }) => `repeat(${props.columns}, 1fr) 100px`};
  gap: 16px;
  padding: 20px 24px;
  background: #fafafa;
  border-radius: 16px 16px 0 0;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

const SkeletonTableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props: { columns: number }) => `repeat(${props.columns}, 1fr) 100px`};
  gap: 16px;
  padding: 20px 24px;
  background: white;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.2s ease;

  &:last-child {
    border-radius: 0 0 16px 16px;
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

const SkeletonCell = styled.div`
  display: flex;
  align-items: center;
`;

const SkeletonActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const SkeletonActionButton = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #f8f8f8 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2.8s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4
}) => {
  const getRandomWidth = () => {
    const widths = ['60%', '70%', '80%', '90%'];
    return widths[Math.floor(Math.random() * widths.length)];
  };

  return (
    <SkeletonTableContainer>
      <SkeletonTableHeader columns={columns}>
        {Array.from({ length: columns }).map((_, index) => (
          <SkeletonCell key={`header-${index}`}>
            <Skeleton width="70%" height="16px" radius="6px" />
          </SkeletonCell>
        ))}
        <SkeletonCell>
          <Skeleton width="60px" height="16px" radius="6px" />
        </SkeletonCell>
      </SkeletonTableHeader>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <SkeletonTableRow key={`row-${rowIndex}`} columns={columns}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonCell key={`cell-${rowIndex}-${colIndex}`}>
              <Skeleton width={getRandomWidth()} height="14px" radius="6px" />
            </SkeletonCell>
          ))}
          <SkeletonActions>
            <SkeletonActionButton />
            <SkeletonActionButton />
          </SkeletonActions>
        </SkeletonTableRow>
      ))}
    </SkeletonTableContainer>
  );
};

// Skeleton para cards de filtro/busca
export const SearchBarSkeleton = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

export const SearchInputSkeleton = styled.div`
  flex: 1;
  min-width: 250px;
`;

// Skeleton para paginação
const PaginationSkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background: white;
  border-radius: 16px;
  margin-top: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    gap: 16px;
  }
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PaginationButtonSkeleton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #f8f8f8 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2.8s ease-in-out infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export const PaginationSkeleton: React.FC = () => {
  return (
    <PaginationSkeletonContainer>
      <Skeleton width="150px" height="16px" radius="6px" />
      <PaginationButtons>
        <PaginationButtonSkeleton />
        <PaginationButtonSkeleton />
        <PaginationButtonSkeleton />
        <PaginationButtonSkeleton />
        <PaginationButtonSkeleton />
      </PaginationButtons>
      <Skeleton width="120px" height="16px" radius="6px" />
    </PaginationSkeletonContainer>
  );
};
