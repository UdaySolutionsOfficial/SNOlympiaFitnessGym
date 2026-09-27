import React from 'react';

export interface SNOlympiaLogoProps {
  variant?: 'mark' | 'full';
  className?: string;
  alt?: string;
  size?: number | string;
  glow?: boolean;
  priority?: boolean;
}

/**
 * Official SN Olympia Fitness Logo Component
 * Renders the authentic official metallic chrome interlocking SN monogram
 * with transparent alpha background and zero background container.
 */
export const SNOlympiaLogo: React.FC<SNOlympiaLogoProps> = ({
  className = 'w-8 h-8',
  alt = 'SN Olympia Fitness Official Logo',
  size,
  priority = false,
}) => {
  const inlineStyle: React.CSSProperties = {};
  if (typeof size === 'number') {
    inlineStyle.width = `${size}px`;
    inlineStyle.height = `${size}px`;
  } else if (typeof size === 'string') {
    inlineStyle.width = size;
    inlineStyle.height = size;
  }

  return (
    <img
      src="/assets/images/logo/sn-olympia-logo.png"
      alt={alt}
      width={100}
      height={100}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`shrink-0 object-contain select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] ${className}`}
      style={inlineStyle}
    />
  );
};

export default SNOlympiaLogo;
