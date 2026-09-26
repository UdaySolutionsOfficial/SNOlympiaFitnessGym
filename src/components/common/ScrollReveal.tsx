import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'none';

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  blur?: boolean;
  scale?: number;
  amount?: number | 'some' | 'all';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 32,
  className = '',
  once = false,
  blur = true,
  scale,
  amount = 0.12,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'zoom':
        return { x: 0, y: 0, scale: scale ?? 0.94 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  const initialVariant = {
    opacity: 0,
    ...initialPos,
    ...(blur ? { filter: 'blur(6px)' } : {}),
    ...(scale && direction !== 'zoom' ? { scale } : {}),
  };

  const visibleVariant = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    ...(blur ? { filter: 'blur(0px)' } : {}),
  };

  return (
    <motion.div
      initial={initialVariant}
      whileInView={visibleVariant}
      viewport={{ once, amount, margin: '-40px 0px -40px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple/Nike style fluid inertia curve
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  delayChildren = 0,
  className = '',
  once = false,
  amount = 0.12,
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '-40px 0px -40px 0px' }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  blur?: boolean;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  distance = 28,
  duration = 0.65,
  blur = true,
  className = '',
  ...rest
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'zoom':
        return { scale: 0.94, x: 0, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
      ...(blur ? { filter: 'blur(4px)' } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      ...(blur ? { filter: 'blur(0px)' } : {}),
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
};
