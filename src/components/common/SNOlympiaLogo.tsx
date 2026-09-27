import React from 'react';

export interface SNOlympiaLogoProps {
  /**
   * 'mark': The circular medallion containing the iconic SN monogram (perfect for navbar badge, icons).
   * 'full': The complete official emblem featuring the kettlebell handle, barbell weights, and SN medallion.
   */
  variant?: 'mark' | 'full';
  className?: string;
  size?: number | string;
  /**
   * Optional custom glow intensity
   */
  glow?: boolean;
}

/**
 * Official SN Olympia Fitness Logo Component
 * Uses the authentic high-resolution 3D circular monogram emblem with volt-orange and amber theme colors,
 * exactly matching the official brand identity.
 */
export const SNOlympiaLogo: React.FC<SNOlympiaLogoProps> = ({
  variant = 'mark',
  className = 'w-9 h-9',
  glow = true,
}) => {
  if (variant === 'mark') {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 ${className} ${
          glow ? 'drop-shadow-[0_0_16px_rgba(255,94,30,0.65)]' : ''
        } transition-transform duration-300 hover:scale-105 select-none`}
        role="img"
        aria-label="Official SN Olympia Fitness Logo Mark"
      >
        <img
          src="/assets/images/brand/sn-olympia-badge.png"
          alt="SN Olympia Fitness Logo"
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // VARIANT 2: Full Official Emblem with kettlebell arch & barbell plates
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className} ${
        glow ? 'drop-shadow-[0_0_24px_rgba(255,94,30,0.5)]' : ''
      } transition-transform duration-300 hover:scale-105 select-none`}
      role="img"
      aria-label="Official SN Olympia Fitness Full Emblem"
    >
      <svg
        viewBox="0 0 200 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="sn-full-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA034" />
            <stop offset="45%" stopColor="#FF5E1E" />
            <stop offset="100%" stopColor="#B33E0B" />
          </linearGradient>
          <linearGradient id="sn-full-grad-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFEACC" />
            <stop offset="100%" stopColor="#FF5E1E" />
          </linearGradient>
          <linearGradient id="sn-full-grad-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A1500" />
            <stop offset="100%" stopColor="#120500" />
          </linearGradient>
        </defs>

        {/* 1. TOP: KETTLEBELL ARCH */}
        <path
          d="M 78 50 C 78 20 86 10 100 10 C 114 10 122 20 122 50 Z"
          fill="url(#sn-full-grad-primary)"
          stroke="url(#sn-full-grad-highlight)"
          strokeWidth="1.5"
        />
        <path
          d="M 85 48 C 85 28 90 20 100 20 C 110 20 115 28 115 48 Z"
          fill="#07080A"
          stroke="url(#sn-full-grad-shadow)"
          strokeWidth="1.5"
        />

        {/* 2. BARBELL SHAFT & GRADUATED WEIGHT PLATES */}
        <rect x="20" y="68" width="160" height="12" rx="2" fill="url(#sn-full-grad-shadow)" />
        <rect x="20" y="70" width="160" height="8" fill="url(#sn-full-grad-primary)" />
        <line x1="20" y1="71" x2="180" y2="71" stroke="#FFF0D0" strokeWidth="1" opacity="0.7" />

        {/* LEFT BARBELL WEIGHT PLATES */}
        <rect x="36" y="42" width="11" height="64" rx="3" fill="url(#sn-full-grad-primary)" stroke="url(#sn-full-grad-highlight)" strokeWidth="1.2" />
        <rect x="24" y="48" width="10" height="52" rx="3" fill="url(#sn-full-grad-shadow)" stroke="url(#sn-full-grad-primary)" strokeWidth="1.2" />
        <rect x="13" y="55" width="9" height="38" rx="2.5" fill="url(#sn-full-grad-primary)" stroke="url(#sn-full-grad-highlight)" strokeWidth="1" />
        <rect x="8" y="67" width="5" height="14" rx="1.5" fill="url(#sn-full-grad-highlight)" />

        {/* RIGHT BARBELL WEIGHT PLATES */}
        <rect x="153" y="42" width="11" height="64" rx="3" fill="url(#sn-full-grad-primary)" stroke="url(#sn-full-grad-highlight)" strokeWidth="1.2" />
        <rect x="166" y="48" width="10" height="52" rx="3" fill="url(#sn-full-grad-shadow)" stroke="url(#sn-full-grad-primary)" strokeWidth="1.2" />
        <rect x="178" y="55" width="9" height="38" rx="2.5" fill="url(#sn-full-grad-primary)" stroke="url(#sn-full-grad-highlight)" strokeWidth="1" />
        <rect x="187" y="67" width="5" height="14" rx="1.5" fill="url(#sn-full-grad-highlight)" />

        {/* 3. CENTER EMBLEM: Official 3D Monogram Badge */}
        <image
          href="/assets/images/brand/sn-olympia-badge.png"
          x="55"
          y="29"
          width="90"
          height="90"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
};
