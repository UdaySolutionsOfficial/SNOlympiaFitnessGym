import React, { useState } from 'react';
import { ASSET_MANIFEST } from '../../data/assets';
import { PlateViewer } from '../3d/PlateViewer';
import { HeroFloatingCards } from './HeroFloatingCards';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HeroVisualProps {
  mouseOffset?: { x: number; y: number };
  className?: string;
}

/**
 * Hero Visual Layer
 * Integrates the generated ultra-realistic athlete photography,
 * responsive mobile/desktop crops, 3D Olympic Plate, and floating cards.
 * Includes graceful static fallback if image fails to load.
 */
export const HeroVisual: React.FC<HeroVisualProps> = ({
  mouseOffset = { x: 0, y: 0 },
  className,
}) => {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Subtle parallax displacement
  const parallaxTransform = !prefersReducedMotion
    ? {
        transform: `translate3d(${mouseOffset.x * 0.02}px, ${mouseOffset.y * 0.02}px, 0)`,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    : undefined;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 1. Athlete Photography Container */}
      <div
        style={parallaxTransform}
        className="relative w-full max-w-lg lg:max-w-xl aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden bg-brand-surface/40 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] group"
      >
        {!imageError ? (
          <picture className="w-full h-full block">
            {/* Mobile portrait crop for screens <= 768px */}
            <source
              media="(max-width: 768px)"
              srcSet={ASSET_MANIFEST.hero.athleteMobile.path}
            />
            {/* Desktop high-resolution banner */}
            <img
              src={ASSET_MANIFEST.hero.athleteDesktop.path}
              alt={ASSET_MANIFEST.hero.athleteDesktop.alt}
              loading="eager"
              decoding="async"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.95] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </picture>
        ) : (
          /* Graceful Fallback if image fails to load */
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-brand-surface text-center">
            <div className="w-20 h-20 rounded-full border-2 border-brand-volt/40 flex items-center justify-center mb-4">
              <span className="text-2xl font-black text-brand-volt">SN</span>
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-1">
              SN OLYMPIA FITNESS
            </h3>
            <p className="text-xs text-brand-text-muted">
              Unisex Strength & Conditioning Ground
            </p>
          </div>
        )}

        {/* Cinematic Rim Shadows & Edge Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/40 via-transparent to-brand-dark/30 pointer-events-none" />

        {/* Bottom Badge Over Image */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-brand-dark/70 backdrop-blur-md border border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-volt block font-bold">
              ESTABLISHED TRAINING GROUND
            </span>
            <span className="text-xs font-black text-white uppercase">
              Shiva Priya Theater Area, Yemmiganur
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-brand-text-secondary">
            AP 518360
          </span>
        </div>
      </div>

      {/* 2. Floating 3D Olympic Weight Plate Satellite Module */}
      <div
        style={{
          transform: !prefersReducedMotion
            ? `translate3d(${mouseOffset.x * -0.03}px, ${mouseOffset.y * -0.03}px, 0)`
            : undefined,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="hidden sm:block absolute -top-8 -right-6 lg:-right-10 z-20 w-36 h-36 md:w-44 md:h-44 rounded-2xl bg-brand-surface/90 backdrop-blur-xl border border-white/15 p-2 shadow-2xl"
      >
        <div className="flex items-center justify-between px-1 text-[9px] font-mono text-brand-text-muted uppercase">
          <span>3D PLATE</span>
          <span className="text-brand-volt font-bold">20 KG</span>
        </div>
        <PlateViewer className="w-full h-28 md:h-36" autoRotate />
      </div>

      {/* 3. Floating Verified Metrics Cards */}
      <HeroFloatingCards
        mouseOffset={mouseOffset}
        className="absolute -bottom-6 -left-4 sm:-left-8 z-20 flex flex-col gap-3"
      />
    </div>
  );
};
