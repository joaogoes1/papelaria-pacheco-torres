import styled, { keyframes } from 'styled-components';
import { Skeleton } from './SkeletonLoader';

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.75;
  }
`;

const SkeletonChartContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 16px;
  }
`;

const SkeletonChartHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonChartArea = styled.div`
  width: 100%;
  height: 300px;
  background: #fafafa;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    animation: shimmer 3.5s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    height: 250px;
    padding: 16px;
  }
`;

const SkeletonBar = styled.div<{ height: string }>`
  flex: 1;
  background: linear-gradient(
    180deg,
    #e0e0e0 0%,
    #e8e8e8 100%
  );
  border-radius: 8px 8px 0 0;
  height: ${props => props.height};
  animation: ${pulse} 3.5s ease-in-out infinite;
  animation-delay: ${props => Math.random() * 0.5}s;
`;

const SkeletonLineChart = styled.div`
  width: 100%;
  height: 300px;
  background: #fafafa;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    animation: shimmer 3.5s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  @media (max-width: 768px) {
    height: 250px;
    padding: 16px;
  }
`;

const SkeletonLine = styled.svg`
  width: 100%;
  height: 100%;

  path {
    fill: none;
    stroke: #e0e0e0;
    stroke-width: 3;
    stroke-linecap: round;
    animation: ${pulse} 3.5s ease-in-out infinite;
  }

  circle {
    fill: #e8e8e8;
    animation: ${pulse} 3.5s ease-in-out infinite;
  }
`;

export const ChartSkeleton: React.FC<{ type?: 'bar' | 'line' }> = ({ type = 'bar' }) => {
  return (
    <SkeletonChartContainer>
      <SkeletonChartHeader>
        <Skeleton width="40%" height="20px" radius="8px" />
        <Skeleton width="60%" height="14px" radius="6px" />
      </SkeletonChartHeader>

      {type === 'bar' ? (
        <SkeletonChartArea>
          <SkeletonBar height="60%" />
          <SkeletonBar height="80%" />
          <SkeletonBar height="45%" />
          <SkeletonBar height="90%" />
          <SkeletonBar height="70%" />
          <SkeletonBar height="55%" />
          <SkeletonBar height="85%" />
          <SkeletonBar height="65%" />
        </SkeletonChartArea>
      ) : (
        <SkeletonLineChart>
          <SkeletonLine viewBox="0 0 400 200">
            <path d="M 0 150 Q 50 120, 100 100 T 200 80 T 300 60 T 400 50" />
            <circle cx="0" cy="150" r="4" />
            <circle cx="100" cy="100" r="4" />
            <circle cx="200" cy="80" r="4" />
            <circle cx="300" cy="60" r="4" />
            <circle cx="400" cy="50" r="4" />
          </SkeletonLine>
        </SkeletonLineChart>
      )}
    </SkeletonChartContainer>
  );
};

export const ChartsSkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;
