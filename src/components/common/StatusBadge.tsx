import React from 'react';
import { cn } from '../../lib/utils';
import { STATUS_CONFIG, type ContentStatus } from '../../data/contentStatus';

export interface StatusBadgeProps {
  status: ContentStatus;
  label?: string;
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className,
  showIcon = true,
}) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border',
        config.badgeClass,
        className
      )}
      title={config.label}
    >
      {showIcon && <span className="text-[11px] font-bold">{config.icon}</span>}
      <span>{label || config.label}</span>
    </span>
  );
};
