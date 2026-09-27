import React from 'react';

export interface SNOlympiaLogoProps {
  /**
   * 'mark': The circular medallion containing the official SN emblem.
   * 'full': Complete emblem with extended glow.
   */
  variant?: 'mark' | 'full';
  className?: string;
  size?: number | string;
  /**
   * Optional custom glow intensity
   */
  glow?: boolean;
  alt?: string;
}

/**
 * Official SN Olympia Fitness Logo Component
 * Renders the brand's official 3D metallic embossed SN logo icon
 * customized with the website's dark graphite & neon orange/volt palette.
 */
export const SNOlympiaLogo: React.FC<SNOlympiaLogoProps> = ({
  className = 'w-9 h-9',
  glow = true,
  alt = 'SN Olympia Fitness Official Logo',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
    >
      <img
        src="/assets/brand/sn-logo-icon.png"
        alt={alt}
        loading="eager"
        decoding="async"
        className={`w-full h-full object-contain pointer-events-none transition-all duration-300 ${
          glow
            ? 'drop-shadow-[0_0_10px_rgba(255,94,30,0.55)] group-hover:drop-shadow-[0_0_18px_rgba(255,94,30,0.85)]'
            : ''
        }`}
      />
    </div>
  );
};

export default SNOlympiaLogo;
