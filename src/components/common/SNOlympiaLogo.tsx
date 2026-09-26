import React from 'react';

export interface SNOlympiaLogoProps {
  /**
   * 'mark': The circular medallion containing the iconic SN monogram (perfect for navbar badge, icons).
   * 'full': The complete official emblem featuring the kettlebell handle, barbell weights, and SN medallion (perfect for loader & footer).
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
 * Official SN Olympia Fitness Logo Vector Component
 * Digitally reconstructed from the brand's official metallic 3D kettlebell-barbell emblem.
 * Features customizable gradient fills calibrated to the website's dark graphite & neon volt/amber theme.
 */
export const SNOlympiaLogo: React.FC<SNOlympiaLogoProps> = ({
  variant = 'mark',
  className = 'w-8 h-8',
  glow = true,
}) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const gradPrimary = `sn-grad-primary-${uniqueId}`;
  const gradHighlight = `sn-grad-highlight-${uniqueId}`;
  const gradShadow = `sn-grad-shadow-${uniqueId}`;
  const gradGold = `sn-grad-gold-${uniqueId}`;
  const filterGlow = `sn-glow-${uniqueId}`;

  // Shared SN Monogram Elements (Scalable in a 100x100 space centered at 50,50)
  const renderSNMonogram = () => (
    <g id="sn-monogram-core">
      {/* ======================================================== */}
      {/* 1. LETTER 'N' — ATHLETIC BEVELED GOTHIC PILLARS & DIAGONAL */}
      {/* ======================================================== */}
      
      {/* Left Pillar of 'N' (Light/Highlight Facet) */}
      <path
        d="M 23 15 
           L 33 26 
           L 33 46 
           L 24 58 
           Z"
        fill={`url(#${gradHighlight})`}
        opacity="0.95"
      />
      {/* Left Pillar of 'N' (Shadow/Bevel Facet) */}
      <path
        d="M 23 15 
           L 21 62 
           C 21 68 23 75 25 80 
           L 33 85 
           L 33 46 
           L 24 58 
           L 23 15 
           Z"
        fill={`url(#${gradShadow})`}
      />

      {/* Right Pillar of 'N' (Light/Highlight Facet) */}
      <path
        d="M 77 15 
           L 67 26 
           L 67 54 
           L 76 42 
           Z"
        fill={`url(#${gradHighlight})`}
        opacity="0.95"
      />
      {/* Right Pillar of 'N' (Shadow/Bevel Facet) */}
      <path
        d="M 77 15 
           L 79 62 
           C 79 68 77 75 75 80 
           L 67 85 
           L 67 54 
           L 76 42 
           L 77 15 
           Z"
        fill={`url(#${gradShadow})`}
      />

      {/* Diagonal Connecting Web of 'N' */}
      <path
        d="M 33 34 
           L 67 72 
           L 67 85 
           L 33 47 
           Z"
        fill={`url(#${gradPrimary})`}
        opacity="0.85"
      />

      {/* ======================================================== */}
      {/* 2. LETTER 'S' — INTERTWINED EMBOSSED FLUID ATHLETIC SWOOP */}
      {/* ======================================================== */}
      
      {/* 'S' Top Loop & Decorative Hook Terminal (Outer Light Facet) */}
      <path
        d="M 57 24 
           C 57 21 54 18 51 18 
           C 47 18 45 21 44 24 
           C 43 28 45 32 49 35 
           L 58 41 
           C 66 47 68 53 67 60 
           C 66 68 59 74 51 74 
           C 44 74 38 69 37 63 
           C 36 58 39 53 43 51 
           C 46 50 49 52 48 56 
           C 47 60 49 63 53 63 
           C 57 63 59 60 59 56 
           C 59 52 56 48 51 44 
           L 43 38 
           C 36 33 34 27 35 20 
           C 37 11 44 6 52 6 
           C 61 6 67 12 67 20 
           C 67 25 63 29 58 29 
           C 55 29 54 26 57 24 
           Z"
        fill={`url(#${gradPrimary})`}
        stroke={`url(#${gradGold})`}
        strokeWidth="0.75"
        strokeLinejoin="round"
      />

      {/* 'S' Central Power Bevel Spine (Dimensional Ridge Effect) */}
      <path
        d="M 52 8 
           C 58 8 63 13 63 19 
           C 63 23 60 26 57 25 
           C 55 24 53 21 51 21 
           C 48 21 46 23 45 26 
           C 44 29 46 32 49 35 
           L 57 41 
           C 64 46 66 52 65 58 
           C 64 65 58 71 51 71 
           C 45 71 40 67 39 62 
           C 39 58 41 55 44 53 
           C 46 52 47 54 47 56 
           C 46 59 48 61 52 61 
           C 55 61 57 58 57 55 
           C 57 52 54 48 49 44 
           L 42 39 
           C 36 34 35 29 36 23 
           C 37 15 43 10 50 10 
           Z"
        fill={`url(#${gradHighlight})`}
        opacity="0.9"
      />

      {/* Center Bevel Core Line for Metallic Glint */}
      <path
        d="M 50 10 
           Q 40 20 47 32 
           L 56 41 
           Q 65 52 53 66"
        fill="none"
        stroke="#FFF5E0"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  );

  // Common SVG Defs (Gradients and Filters)
  const renderDefs = () => (
    <defs>
      {/* Primary Brand Metallic Gradient: Deep Volt Orange to Radiant Amber Gold */}
      <linearGradient id={gradPrimary} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA034" />
        <stop offset="35%" stopColor="#FF5E1E" />
        <stop offset="70%" stopColor="#E5460E" />
        <stop offset="100%" stopColor="#FFA034" />
      </linearGradient>

      {/* Specular Highlight Gradient: Gleaming Light Edge */}
      <linearGradient id={gradHighlight} x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="#FFEACC" />
        <stop offset="45%" stopColor="#FFAA44" />
        <stop offset="100%" stopColor="#D9480F" />
      </linearGradient>

      {/* Burnished Bronze Shadow Gradient */}
      <linearGradient id={gradShadow} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B33E0B" />
        <stop offset="50%" stopColor="#7A2500" />
        <stop offset="100%" stopColor="#4A1500" />
      </linearGradient>

      {/* Gold Rim / Accent Gradient */}
      <linearGradient id={gradGold} x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#FFA034" />
        <stop offset="50%" stopColor="#FFF2D6" />
        <stop offset="100%" stopColor="#FF5E1E" />
      </linearGradient>

      {/* Soft Glow Filter */}
      {glow && (
        <filter id={filterGlow} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      )}
    </defs>
  );

  // VARIANT 1: Circular Medallion Mark (Clean, high-precision monogram inside circle)
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} transition-transform duration-300 hover:scale-105`}
        role="img"
        aria-label="SN Olympia Fitness Official Logo Mark"
      >
        {renderDefs()}

        {/* Ambient Glow Base Layer */}
        {glow && (
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#FF5E1E"
            strokeWidth="3"
            opacity="0.3"
            filter={`url(#${filterGlow})`}
          />
        )}

        {/* Outer Circular Ring (Metallic Beveled Edge) */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={`url(#${gradShadow})`}
          strokeWidth="7"
        />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={`url(#${gradPrimary})`}
          strokeWidth="5"
        />
        <circle
          cx="50"
          cy="50"
          r="48.5"
          fill="none"
          stroke={`url(#${gradHighlight})`}
          strokeWidth="1.2"
        />
        <circle
          cx="50"
          cy="50"
          r="43.5"
          fill="none"
          stroke={`url(#${gradHighlight})`}
          strokeWidth="1"
        />

        {/* Inner Dark Radial Core */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="#0C0E14"
        />

        {/* The Intertwined 'SN' Core */}
        {renderSNMonogram()}
      </svg>
    );
  }

  // VARIANT 2: Full Official Emblem (Kettlebell Handle + Barbell Weights + SN Medallion)
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300 hover:scale-105`}
      role="img"
      aria-label="SN Olympia Fitness Full Official Emblem"
    >
      {renderDefs()}

      {/* ======================================================== */}
      {/* 1. TOP: KETTLEBELL HANDLE                                */}
      {/* ======================================================== */}
      {/* Outer Handle Arch */}
      <path
        d="M 78 50 
           C 78 20 86 10 100 10 
           C 114 10 122 20 122 50 
           Z"
        fill={`url(#${gradPrimary})`}
        stroke={`url(#${gradHighlight})`}
        strokeWidth="1.5"
      />
      {/* Inner Handle Cutout (Transparent window) */}
      <path
        d="M 85 48 
           C 85 28 90 20 100 20 
           C 110 20 115 28 115 48 
           Z"
        fill="#07080A"
        stroke={`url(#${gradShadow})`}
        strokeWidth="1.5"
      />

      {/* ======================================================== */}
      {/* 2. SIDES: BARBELL SHAFT & GRADUATED WEIGHT PLATES        */}
      {/* ======================================================== */}
      
      {/* Horizontal Barbell Shaft connecting center to plates */}
      <rect
        x="20"
        y="68"
        width="160"
        height="12"
        rx="2"
        fill={`url(#${gradShadow})`}
      />
      <rect
        x="20"
        y="70"
        width="160"
        height="8"
        fill={`url(#${gradPrimary})`}
      />
      {/* Center Top Barbell Light Highlight */}
      <line
        x1="20"
        y1="71"
        x2="180"
        y2="71"
        stroke="#FFF0D0"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* LEFT BARBELL WEIGHT PLATES (3 Graduated Plates + Collar) */}
      {/* Plate 1: Inner Large Plate */}
      <rect
        x="36"
        y="42"
        width="11"
        height="64"
        rx="3"
        fill={`url(#${gradPrimary})`}
        stroke={`url(#${gradHighlight})`}
        strokeWidth="1.2"
      />
      {/* Plate 2: Middle Plate */}
      <rect
        x="24"
        y="48"
        width="10"
        height="52"
        rx="3"
        fill={`url(#${gradShadow})`}
        stroke={`url(#${gradPrimary})`}
        strokeWidth="1.2"
      />
      {/* Plate 3: Outer Plate */}
      <rect
        x="13"
        y="55"
        width="9"
        height="38"
        rx="2.5"
        fill={`url(#${gradPrimary})`}
        stroke={`url(#${gradHighlight})`}
        strokeWidth="1"
      />
      {/* Left End Collar */}
      <rect
        x="8"
        y="67"
        width="5"
        height="14"
        rx="1.5"
        fill={`url(#${gradHighlight})`}
      />

      {/* RIGHT BARBELL WEIGHT PLATES (3 Graduated Plates + Collar) */}
      {/* Plate 1: Inner Large Plate */}
      <rect
        x="153"
        y="42"
        width="11"
        height="64"
        rx="3"
        fill={`url(#${gradPrimary})`}
        stroke={`url(#${gradHighlight})`}
        strokeWidth="1.2"
      />
      {/* Plate 2: Middle Plate */}
      <rect
        x="166"
        y="48"
        width="10"
        height="52"
        rx="3"
        fill={`url(#${gradShadow})`}
        stroke={`url(#${gradPrimary})`}
        strokeWidth="1.2"
      />
      {/* Plate 3: Outer Plate */}
      <rect
        x="178"
        y="55"
        width="9"
        height="38"
        rx="2.5"
        fill={`url(#${gradPrimary})`}
        stroke={`url(#${gradHighlight})`}
        strokeWidth="1"
      />
      {/* Right End Collar */}
      <rect
        x="187"
        y="67"
        width="5"
        height="14"
        rx="1.5"
        fill={`url(#${gradHighlight})`}
      />

      {/* ======================================================== */}
      {/* 3. CENTER: CIRCULAR KETTLEBELL EMBLEM & 'SN' MONOGRAM    */}
      {/* ======================================================== */}
      
      {/* Outer Thick Medallion Ring */}
      <circle
        cx="100"
        cy="74"
        r="44"
        fill="none"
        stroke={`url(#${gradShadow})`}
        strokeWidth="7"
      />
      <circle
        cx="100"
        cy="74"
        r="44"
        fill="none"
        stroke={`url(#${gradPrimary})`}
        strokeWidth="5"
      />
      <circle
        cx="100"
        cy="74"
        r="46.5"
        fill="none"
        stroke={`url(#${gradHighlight})`}
        strokeWidth="1.2"
      />
      <circle
        cx="100"
        cy="74"
        r="41.5"
        fill="none"
        stroke={`url(#${gradHighlight})`}
        strokeWidth="1"
      />

      {/* Inner Dark Floor */}
      <circle
        cx="100"
        cy="74"
        r="40"
        fill="#07080A"
      />

      {/* SN Monogram (Shifted & scaled to center at 100, 74) */}
      <g transform="translate(60, 34) scale(0.8)">
        {renderSNMonogram()}
      </g>
    </svg>
  );
};
