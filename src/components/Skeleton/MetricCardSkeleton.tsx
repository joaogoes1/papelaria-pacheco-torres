import styled from 'styled-components';
import { Skeleton, SkeletonCircle } from './SkeletonLoader';

const SkeletonCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 160px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    min-height: 140px;
  }
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SkeletonTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

export const MetricCardSkeleton: React.FC = () => {
  return (
    <SkeletonCard>
      <SkeletonHeader>
        <SkeletonTitleGroup>
          <Skeleton width="60%" height="14px" radius="6px" />
          <Skeleton width="40%" height="12px" radius="6px" />
        </SkeletonTitleGroup>
        <SkeletonCircle width="48px" height="48px" />
      </SkeletonHeader>

      <SkeletonContent>
        <Skeleton width="70%" height="32px" radius="10px" />
        <Skeleton width="50%" height="12px" radius="6px" />
      </SkeletonContent>
    </SkeletonCard>
  );
};

export const MetricCardsSkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;
