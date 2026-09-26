import React, { useState, useCallback, useEffect } from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroVideoCard } from './HeroVideoCard';
import { HeroCoachesBadge } from './HeroCoachesBadge';
import { PlateViewer } from '../3d/PlateViewer';
import { GlassAiButton } from '../../shaders/glass-ai-button/GlassAiButton';
import '../../shaders/threeui.css';
import { ASSET_MANIFEST } from '../../data/assets';
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HeroSectionProps {
  onJoinClick?: () => void;
  onExploreClick?: () => void;
}

/**
 * Modern High-Impact Hero Section matching Reference Mockup
 * - Vibrant electric orange theme
 * - Front-facing muscular athlete with curling barbell and bold transparent "OLAMPIYA" in the background
 * - Left column: "Get Fit", glassmorphic description, "Explore more" orange button & ThreeUI GlassAiButton, 20 Active Coaches badge
 * - Right column: "Stay Fit", interactive glassmorphic video player with intro video, free-floating 3D Olympic plate
 * - Bottom teaser: "CLASSES DESIGNED / FOR YOU"
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinClick,
  onExploreClick,
}) => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  // Subtle mouse parallax on desktop
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || window.innerWidth < 1024) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;
      setMouseOffset({ x: deltaX * 15, y: deltaY * 15 });
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('section-transition') || document.getElementById('programs');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="overview"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 sm:pt-28 sm:pb-16 px-3 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* 1. Ambient Background Layer */}
      <HeroBackground />

      {/* 2. Main Stadium Hero Container (Framed exactly like reference image) */}
      <div className="relative z-10 w-full rounded-[2rem] sm:rounded-[2.5rem] bg-[#0C0E12] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-auto">
        
        {/* Top Orange Neon Accent Edge Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-volt to-transparent opacity-80" />

        {/* HERO ATHLETE WITH BACKGROUND "OLAMPIYA" TEXT */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <img
            src={ASSET_MANIFEST.hero.athleteCurlingOlampiya.path}
            alt="SN Olympia Fitness muscular athlete with curling barbell and Olampiya background typography"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.95]"
          />
          {/* Subtle Lateral Vignettes for Crystal-Clear Text Contrast */}
          <div className="absolute inset-y-0 left-0 w-2/5 sm:w-1/3 bg-gradient-to-r from-[#0C0E12]/95 via-[#0C0E12]/70 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-2/5 sm:w-1/3 bg-gradient-to-l from-[#0C0E12]/95 via-[#0C0E12]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0E12] via-[#0C0E12]/60 to-transparent" />
        </div>

        {/* CONTENT GRID: LEFT (Get Fit) & RIGHT (Stay Fit + Video) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] p-6 sm:p-10 lg:p-14">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: "Get Fit", Glassmorphic Card, Buttons & 20 Active Coaches    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Giant "Get Fit" Headline */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.92] drop-shadow-lg select-none">
                Get <span className="text-white">Fit</span>
              </h1>

              {/* Glassmorphic Description Card */}
              <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-2xl max-w-sm sm:max-w-md">
                <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed font-normal">
                  Placerat eget Sed leo, malesuada convallis. Donec diam lorem, viverra vehicula, porta
                  adipiscing maximus consectetur quis nulla, vel elementum nec id Cras in. Welcome to Olympia Fitness.
                </p>
              </div>

              {/* Action Buttons: "Explore more" Orange Pill + ThreeUI GlassAiButton */}
              <div className="flex flex-wrap items-center gap-3.5 mt-6">
                {/* "Explore more" Orange Button */}
                <button
                  onClick={onExploreClick || onJoinClick}
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-brand-volt hover:bg-brand-volt-hover text-white font-black text-xs uppercase tracking-wider shadow-glow-volt transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>Explore more</span>
                  <ArrowUpRight className="w-4 h-4 text-white/90" />
                </button>

                {/* Integrated ThreeUI <GlassAiButton /> */}
                <div
                  onClick={onJoinClick}
                  title="Experience Glass AI Button"
                  className="w-44 sm:w-48 h-12 rounded-full overflow-hidden border border-white/20 shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                >
                  <GlassAiButton className="w-full h-full" />
                </div>
              </div>
            </div>

            {/* Bottom Left: "20 Active Coaches" Glassmorphism Badge */}
            <div className="pt-4 lg:pt-8">
              <HeroCoachesBadge />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CENTER SPACER: Keeps center athlete clear and visible                     */}
          {/* ========================================================================= */}
          <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: "Stay Fit", Video Card Placeholder, Scroll Down Button      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end h-full space-y-6">
            <div className="flex flex-col items-start lg:items-end w-full">
              {/* Giant "Stay Fit" Headline */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.92] drop-shadow-lg select-none text-left lg:text-right">
                Stay <span className="text-white">Fit</span>
              </h2>

              {/* Floating Translucent Video Card (Intro Video) */}
              <div className="mt-5">
                <HeroVideoCard />
              </div>
            </div>

            {/* Bottom Right: Circular Scroll Down Button & 3D Plate Satellite */}
            <div className="flex items-center gap-4 pt-4 lg:pt-8 w-full justify-between lg:justify-end">
              {/* Free-Floating 3D Olympic Plate Medallion */}
              <div
                style={{
                  transform: !prefersReducedMotion
                    ? `translate3d(${mouseOffset.x * -0.04}px, ${mouseOffset.y * -0.04}px, 0)`
                    : undefined,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-brand-volt/30 shadow-md cursor-grab active:cursor-grabbing group"
              >
                <div className="w-7 h-7 relative">
                  <PlateViewer className="w-full h-full" autoRotate />
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono tracking-widest text-brand-volt uppercase font-bold">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                  <span>3D 20KG</span>
                </div>
              </div>

              {/* Circular Scroll Down Button */}
              <button
                onClick={scrollToNext}
                aria-label="Scroll down to classes"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-brand-volt hover:text-white border border-white/20 text-brand-volt flex items-center justify-center shadow-lg transition-all active:scale-95 group"
              >
                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Teaser Headline Below Hero Frame (Matching Reference Mockup) */}
      <div className="relative z-10 pt-10 sm:pt-14 px-2 select-none">
        <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-brand-text-muted uppercase font-bold block mb-1">
          CLASSES DESIGNED
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight">
          FOR YOU
        </h2>
      </div>
    </section>
  );
};
