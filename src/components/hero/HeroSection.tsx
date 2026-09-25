import React, { useState, useCallback, useEffect } from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';
import { PlateViewer } from '../3d/PlateViewer';
import { SITE_CONTENT } from '../../data/siteContent';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HeroSectionProps {
  onJoinClick?: () => void;
  onExploreClick?: () => void;
}

/**
 * Master Centered Hero Section
 * - Centered layered editorial composition (Background text -> Shredded Athlete Cutout -> Foreground text)
 * - Animated glassmorphic card housing plain-language explanation and conversion triggers
 * - Free-floating 3D Olympic Plate (kept completely free on the hero section without any card container)
 * - Responsive across mobile, tablet, and desktop viewports
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinClick,
  onExploreClick,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  // Smooth mouse parallax interpolation on desktop
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || window.innerWidth < 1024) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX; // -1 to +1
      const deltaY = (e.clientY - centerY) / centerY;
      setMouseOffset({ x: deltaX * 20, y: deltaY * 20 });
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('section-transition');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="overview"
      className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 1. Atmospheric Canvas Background Layer */}
      <HeroBackground />

      {/* 2. Free-Floating 3D Animated Olympic Weight Plate */}
      {/* Kept 100% free on the hero section — NOT inside any card container! */}
      <div
        style={{
          transform: !prefersReducedMotion
            ? `translate3d(${mouseOffset.x * -0.05}px, ${mouseOffset.y * -0.05}px, 0)`
            : undefined,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="absolute top-24 sm:top-28 right-3 sm:right-6 md:right-10 z-40 flex flex-col items-center pointer-events-auto cursor-grab active:cursor-grabbing select-none group"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 relative filter drop-shadow-[0_15px_30px_rgba(204,255,0,0.18)]">
          <PlateViewer className="w-full h-full" autoRotate />
        </div>
        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-brand-volt mt-1 drop-shadow-md">
          <Sparkles className="w-3 h-3 animate-pulse text-brand-volt" />
          <span className="font-bold">3D PLATE • 20 KG</span>
        </div>
        <span className="text-[8px] font-mono text-brand-text-muted tracking-tight group-hover:text-white transition-colors">
          DRAG TO ROTATE
        </span>
      </div>

      {/* 3. Centered Hero Main Stage */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto space-y-6 sm:space-y-8">
        
        {/* Top Eyebrow Badge (Centered) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surface/90 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-bold tracking-wider text-brand-text-secondary uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-volt shadow-glow-volt animate-pulse" />
          <span className="text-white">{SITE_CONTENT.hero.badge}</span>
          <span className="text-white/20">/</span>
          <span className="text-brand-volt font-mono">TIMMAPPA COLONY</span>
        </div>

        {/* Layered Visual: Words Behind Person -> Centered Athlete Cutout -> Foreground Words */}
        <HeroVisual mouseOffset={mouseOffset} />

        {/* Animated Glassmorphic Card: Understandable Paragraph & Direct Conversion Actions */}
        <div className="w-full relative z-30 pt-2 sm:pt-4">
          <HeroContent
            onJoinClick={onJoinClick}
            onExploreClick={onExploreClick}
          />
        </div>
      </div>

      {/* 4. Hero Bottom Scroll Cue */}
      <div className="relative z-10 flex justify-center pt-6 sm:pt-10">
        <button
          onClick={scrollToNext}
          aria-label="Scroll to explore Olympia philosophy"
          className="inline-flex flex-col items-center gap-1.5 text-[10px] font-mono font-bold tracking-[0.2em] text-brand-text-muted hover:text-brand-volt transition-colors uppercase group"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-brand-volt" />
        </button>
      </div>
    </section>
  );
};
