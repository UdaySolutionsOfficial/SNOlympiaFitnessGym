import React, { useState } from 'react';
import { ASSET_MANIFEST } from '../../data/assets';
import { PlateViewer } from '../3d/PlateViewer';
import { HeroFloatingCards } from './HeroFloatingCards';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Sparkles } from 'lucide-react';

export interface HeroVisualProps {
  mouseOffset?: { x: number; y: number };
  className?: string;
}

/**
 * Senior UI/UX Redesigned Hero Visual Layer
 * Features the ultra-muscular athlete back with wide wingspan,
 * seamlessly blended into the obsidian background with chiaroscuro edge gradients.
 * The 3D Olympic Plate is resized into an elegant, non-intrusive interactive medallion
 * positioned gracefully at the bottom-right, leaving the athlete in full glory.
 */
export const HeroVisual: React.FC<HeroVisualProps> = ({
  mouseOffset = { x: 0, y: 0 },
  className,
}) => {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Gentle parallax displacement on desktop
  const parallaxTransform = !prefersReducedMotion
    ? {
        transform: `translate3d(${mouseOffset.x * 0.02}px, ${mouseOffset.y * 0.02}px, 0)`,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    : undefined;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 1. Athlete Photography Container (Wide 16:10 aspect to honor arm wingspan) */}
      <div
        style={parallaxTransform}
        className="relative w-full max-w-xl lg:max-w-2xl aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-brand-surface/40 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] group"
      >
        {!imageError ? (
          <picture className="w-full h-full block">
            {/* Mobile portrait crop */}
            <source
              media="(max-width: 640px)"
              srcSet={ASSET_MANIFEST.hero.athleteMobile.path}
            />
            {/* Desktop high-resolution wide composition */}
            <img
              src={ASSET_MANIFEST.hero.athleteDesktop.path}
              alt="SN Olympia Fitness Athlete demonstrating high-performance back hypertrophy and discipline"
              loading="eager"
              decoding="async"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
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

        {/* Seamless Dark Edge Vignettes & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 via-transparent to-brand-dark/40 pointer-events-none" />

        {/* Bottom Location & Floor Credential Tag */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/10 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-volt animate-pulse" />
          <span className="text-white font-bold tracking-wider uppercase">COMMERCIAL IRON</span>
          <span className="text-brand-text-muted">•</span>
          <span className="text-brand-volt">TIMMAPPA COLONY</span>
        </div>
      </div>

      {/* 2. Resized, Repositioned 3D Olympic Weight Plate Medallion */}
      {/* Placed at bottom-right corner as an elegant interactive badge that does not obstruct the athlete */}
      <div
        style={{
          transform: !prefersReducedMotion
            ? `translate3d(${mouseOffset.x * -0.025}px, ${mouseOffset.y * -0.025}px, 0)`
            : undefined,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="hidden sm:flex flex-col items-center absolute -bottom-6 -right-3 sm:-right-6 z-20 p-2.5 rounded-2xl bg-brand-surface/90 backdrop-blur-xl border border-brand-volt/30 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:border-brand-volt transition-colors"
      >
        <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase text-brand-text-muted tracking-wider mb-1">
          <Sparkles className="w-3 h-3 text-brand-volt" />
          <span>3D PLATE</span>
          <span className="text-brand-volt font-bold">20 KG</span>
        </div>
        <div className="w-24 h-24 md:w-28 md:h-28 relative">
          <PlateViewer className="w-full h-full" autoRotate />
        </div>
        <span className="text-[8px] font-mono text-brand-text-muted mt-0.5 tracking-tight">
          DRAG TO ROTATE
        </span>
      </div>

      {/* 3. Floating Verified Proof Badges (Bottom-Left Counterbalance) */}
      <HeroFloatingCards
        mouseOffset={mouseOffset}
        className="hidden sm:flex absolute -bottom-6 -left-3 sm:-left-6 z-20 flex-col gap-2.5"
      />
    </div>
  );
};
