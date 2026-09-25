import React, { useState } from 'react';
import { ASSET_MANIFEST } from '../../data/assets';
import { SITE_CONTENT } from '../../data/siteContent';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HeroVisualProps {
  mouseOffset?: { x: number; y: number };
  className?: string;
}

/**
 * Centered Layered Editorial Hero Visual
 * - Layer 1 (z-10, behind person): Monumental typography ("BUILD YOUR" & "OLYMPIA")
 * - Layer 2 (z-20, center): Shredded athlete transparent cutout (zero black band, ultra-detailed 8K musculature)
 * - Layer 3 (z-30, foreground at bottom of image): Punchy universally understandable headline ("UNSTOPPABLE STRENGTH")
 */
export const HeroVisual: React.FC<HeroVisualProps> = ({
  mouseOffset = { x: 0, y: 0 },
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Subtle mouse parallax depth
  const parallaxAthlete = !prefersReducedMotion
    ? {
        transform: `translate3d(${mouseOffset.x * 0.03}px, ${mouseOffset.y * 0.03}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    : undefined;

  const parallaxBackdrop = !prefersReducedMotion
    ? {
        transform: `translate3d(${mouseOffset.x * -0.015}px, ${mouseOffset.y * -0.015}px, 0)`,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }
    : undefined;

  return (
    <div className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* ========================================================================= */}
      {/* LAYER 1 (z-10): WORDS BEHIND THE PERSON                                   */}
      {/* ========================================================================= */}
      <div
        style={parallaxBackdrop}
        className="relative z-10 w-full flex flex-col items-center justify-center text-center pointer-events-none"
      >
        {/* Top Phrase Behind Athlete's Head */}
        <span className="text-xs sm:text-sm md:text-base font-black tracking-[0.35em] text-brand-volt/90 uppercase mb-1">
          {SITE_CONTENT.hero.topPhrase || 'BUILD YOUR'}
        </span>

        {/* Monumental Architectural Word Sitting Behind the Outstretched Arms */}
        <h2 className="text-[19vw] sm:text-[17vw] md:text-[14vw] lg:text-[11rem] xl:text-[13rem] font-black uppercase tracking-tighter text-white/[0.07] leading-[0.8] select-none">
          {SITE_CONTENT.hero.backgroundWord || 'OLYMPIA'}
        </h2>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2 (z-20): CENTERED SHREDDED ATHLETE CUTOUT (NO BLACK BAND, NO BG)  */}
      {/* ========================================================================= */}
      <div
        style={parallaxAthlete}
        className="relative z-20 -mt-[14vw] sm:-mt-[12vw] md:-mt-[9rem] lg:-mt-[11rem] w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl flex items-center justify-center pointer-events-none"
      >
        {!imageError ? (
          <div className="relative w-full aspect-[16/9] flex items-center justify-center">
            {/* Ambient Backlight Glow behind the athlete */}
            <div className="absolute inset-0 max-w-lg mx-auto bg-gradient-to-t from-brand-volt/10 via-brand-volt/5 to-transparent blur-3xl rounded-full -z-10" />

            <picture className="w-full h-full flex items-center justify-center">
              <source
                srcSet={ASSET_MANIFEST.hero.athleteCutoutWebp.path}
                type="image/webp"
              />
              <img
                src={ASSET_MANIFEST.hero.athleteCutout.path}
                alt="SN Olympia Fitness muscular athlete with shredded back and outstretched arms on dark transparent background"
                loading="eager"
                decoding="async"
                onError={() => setImageError(true)}
                className="w-full h-full object-contain filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </picture>

            {/* Seamless Bottom Edge Feathering onto dark canvas */}
            <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent pointer-events-none" />
          </div>
        ) : (
          /* Graceful Fallback if image fails */
          <div className="w-64 h-64 rounded-full border border-brand-volt/30 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-3xl font-black text-brand-volt">SN</span>
            <span className="text-sm font-bold text-white uppercase mt-2">OLYMPIA FITNESS</span>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* LAYER 3 (z-30): FOREGROUND WORDS AT BOTTOM OF HERO IMAGE                   */}
      {/* ========================================================================= */}
      <div className="relative z-30 -mt-10 sm:-mt-14 md:-mt-20 lg:-mt-24 text-center px-4 max-w-4xl pointer-events-none">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]">
          <span className="block text-white">UNSTOPPABLE</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-volt via-white to-brand-volt">
            STRENGTH
          </span>
        </h1>
      </div>
    </div>
  );
};
