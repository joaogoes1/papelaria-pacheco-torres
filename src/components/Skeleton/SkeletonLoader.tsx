import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

const SkeletonBase = styled.div<SkeletonProps>`
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #f8f8f8 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2.8s ease-in-out infinite;
  border-radius: ${props => props.radius || '12px'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  position: relative;
  overflow: hidden;

  ${props => props.variant === 'circular' && `
    border-radius: 50%;
    width: ${props.width || '40px'};
    height: ${props.height || props.width || '40px'};
  `}

  ${props => props.variant === 'text' && `
    border-radius: 8px;
    height: ${props.height || '16px'};
  `}
`;

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  return <SkeletonBase {...props} />;
};

export const SkeletonText = styled(Skeleton).attrs({ variant: 'text' })``;
export const SkeletonCircle = styled(Skeleton).attrs({ variant: 'circular' })``;
export const SkeletonRect = styled(Skeleton).attrs({ variant: 'rectangular' })``;
