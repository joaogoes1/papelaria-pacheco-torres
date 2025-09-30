import { motion, useSpring, useTransform } from 'framer-motion';
import React, { useEffect } from 'react';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1
}) => {
  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => {
    return prefix + current.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
};

export default AnimatedCounter;
