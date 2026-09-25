import React, { useState, useCallback, useEffect } from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HeroSectionProps {
  onJoinClick?: () => void;
  onExploreClick?: () => void;
}

/**
 * Master Hero Section
 * Orchestrates atmospheric canvas, fluid typography, high-resolution photography,
 * 3D plate satellite, verified floating metrics, and pointer parallax.
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
      className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pt-36 sm:pb-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 1. Atmospheric Canvas Background Layer */}
      <HeroBackground />

      {/* 2. Main Hero Composition (Asymmetric 12-Column Grid) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* Left Column: Typography, Value Proposition & CTAs (Span 6) */}
        <div className="lg:col-span-6">
          <HeroContent
            onJoinClick={onJoinClick}
            onExploreClick={onExploreClick}
          />
        </div>

        {/* Right Column: High-End Athlete Photography, 3D Plate & Verified Cards (Span 6) */}
        <div className="lg:col-span-6 relative">
          <HeroVisual mouseOffset={mouseOffset} />
        </div>
      </div>

      {/* 3. Hero Bottom Scroll Cue */}
      <div className="relative z-10 flex justify-center pt-8 sm:pt-12">
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
