import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
  CardContainer,
  CardContent,
  IconWrapper,
  ValueSection,
  Value,
  Label,
  TrendBadge
} from './MetricCard.styles';

export interface MetricCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  iconColor,
  iconBgColor,
  value,
  label,
  trend,
  onClick
}) => {
  return (
    <CardContainer onClick={onClick} clickable={!!onClick}>
      <IconWrapper color={iconColor} bgColor={iconBgColor}>
        <Icon size={28} />
      </IconWrapper>

      <CardContent>
        <ValueSection>
          <Value>{value}</Value>
          {trend && (
            <TrendBadge isPositive={trend.isPositive}>
              {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}%
            </TrendBadge>
          )}
        </ValueSection>
        <Label>{label}</Label>
      </CardContent>
    </CardContainer>
  );
};

export default MetricCard;
