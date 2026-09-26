import React from 'react';
import { cn } from '../../lib/utils';
import { useSpotlight } from '../../hooks/useSpotlight';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string;
  spotlightSize?: number;
  interactive?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = 'rgba(255, 94, 30, 0.16)',
  spotlightSize = 350,
  interactive = true,
  ...props
}) => {
  const { containerRef, position, opacity } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative rounded-2xl bg-brand-surface border border-brand-border overflow-hidden p-6 transition-all duration-300',
        interactive && 'hover:border-brand-volt/40 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {/* Radial Spotlight Gradient overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
