import styled from 'styled-components';
import { Skeleton } from './SkeletonLoader';

const SkeletonActionsContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SkeletonTitle = styled.div`
  margin-bottom: 24px;
`;

const SkeletonActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonActionButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 24px;
  background: #fafafa;
  border-radius: 16px;
  min-height: 140px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 24px 16px;
    min-height: 120px;
    gap: 12px;
  }
`;

const SkeletonIconPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(
    90deg,
    #e8e8e8 0%,
    #f0f0f0 20%,
    #e8e8e8 40%,
    #e8e8e8 100%
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

export const QuickActionsSkeleton: React.FC = () => {
  return (
    <SkeletonActionsContainer>
      <SkeletonTitle>
        <Skeleton width="180px" height="24px" radius="8px" />
      </SkeletonTitle>

      <SkeletonActionsGrid>
        {[1, 2, 3, 4].map((item) => (
          <SkeletonActionButton key={item}>
            <SkeletonIconPlaceholder />
            <Skeleton width="80%" height="16px" radius="6px" />
            <Skeleton width="60%" height="12px" radius="6px" />
          </SkeletonActionButton>
        ))}
      </SkeletonActionsGrid>
    </SkeletonActionsContainer>
  );
};
