import React, { useState, useCallback, useEffect, useRef } from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroVideoCard } from './HeroVideoCard';
import { HeroTrustRatingBadge } from './HeroTrustRatingBadge';
import { HeroExplore3DButton } from './HeroExplore3DButton';
import { AthleteBodySmoke } from './AthleteBodySmoke';
import { ASSET_MANIFEST } from '../../data/assets';
import { ChevronDown, Sparkles, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const heroGlowRef = useRef<HTMLDivElement | null>(null);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Pointer position tracker for hero border glow following cursor direction (direct DOM update - zero re-renders)
  const handleHeroPointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current || !heroGlowRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroGlowRef.current.style.background = `radial-gradient(
      450px circle at ${x}px ${y}px,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 160, 52, 0.85) 15%,
      rgba(255, 94, 30, 0.5) 35%,
      transparent 70%
    )`;
  };

  const [mobileTooltipOpen, setMobileTooltipOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Close mobile video tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('button[data-reel-toggle="true"]')) {
          setMobileTooltipOpen(false);
        }
      }
    };
    if (mobileTooltipOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as any);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as any);
    };
  }, [mobileTooltipOpen]);

  const scrollToNext = () => {
    const nextSection = document.getElementById('section-transition') || document.getElementById('programs');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="overview"
      className="relative flex flex-col items-center pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-8 md:pb-12 px-3 sm:px-6 lg:px-8 max-w-[1400px] mx-auto overflow-hidden"
    >
      {/* 1. Ambient Background Layer */}
      <HeroBackground />

      {/* 2. Main Stadium Hero Container with Dual Opposite-Sided Looping Border Beam & Pointer Glow */}
      <div
        ref={heroCardRef}
        onMouseMove={handleHeroPointerMove}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative z-10 w-full rounded-[1.75rem] sm:rounded-[2.5rem] p-[2px] overflow-hidden my-auto shadow-[0_25px_80px_rgba(0,0,0,0.95)] group/herocard transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(255,94,30,0.3),0_25px_90px_rgba(0,0,0,0.95)]"
      >
        {/* Border Layer 1: Base Dark Edge Outline */}
        <div className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2.5rem] bg-white/10 pointer-events-none" />

        {/* Border Layer 2: Dual Opposite-Sided Looping Border Beam */}
        <div
          className="absolute inset-[-150%] pointer-events-none animate-border-beam"
          style={{
            background: `conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              transparent 55deg,
              rgba(255, 94, 30, 0.4) 70deg,
              rgba(255, 160, 52, 0.95) 85deg,
              #FFFFFF 90deg,
              rgba(255, 160, 52, 0.95) 95deg,
              rgba(255, 94, 30, 0.4) 110deg,
              transparent 125deg,
              transparent 235deg,
              rgba(255, 94, 30, 0.4) 250deg,
              rgba(255, 160, 52, 0.95) 265deg,
              #FFFFFF 270deg,
              rgba(255, 160, 52, 0.95) 275deg,
              rgba(255, 94, 30, 0.4) 290deg,
              transparent 305deg,
              transparent 360deg
            )`,
          }}
        />

        {/* Border Layer 3: Interactive Pointer-Responsive Glow following Cursor Direction near Edges */}
        <div
          ref={heroGlowRef}
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isHeroHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Inner Surface of Hero Card */}
        <div className="relative w-full h-full rounded-[calc(1.75rem-2px)] sm:rounded-[calc(2.5rem-2px)] bg-[#0C0E12] overflow-hidden">
          {/* Top Subtle Amber Ambient Highlight */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5E1E] to-transparent opacity-80 shadow-[0_0_15px_#FF5E1E]" />

          {/* Mobile Top Video Tooltip (<md) - Shows on Top with Autoplaying Video Previews */}
          <AnimatePresence>
            {mobileTooltipOpen && (
              <motion.div
                ref={tooltipRef}
                initial={{ opacity: 0, y: -18, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.94 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-auto sm:right-4 md:hidden w-[min(calc(100vw-2.5rem),340px)] mx-auto rounded-2xl bg-[#0C0E14]/98 backdrop-blur-2xl border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,94,30,0.35)] p-3 space-y-2.5 z-50 text-left pointer-events-auto"
                role="tooltip"
                aria-label="Hero Video Reels"
              >
                {/* Tooltip Header Bar */}
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5E1E] shadow-[0_0_8px_#FF5E1E] animate-pulse" />
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#FFA034]">
                      SN OLYMPIA REELS (AUTOPLAYING)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileTooltipOpen(false)}
                    aria-label="Close tooltip"
                    className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Tooltip Videos (Autoplaying live previews; tap to play from beginning with sound) */}
                <div className="space-y-2">
                  <HeroVideoCard
                    videoSrc={ASSET_MANIFEST.hero.introVideo2.path}
                    title="SN Olympia Energy & Coaching"
                    alignment="left"
                    compact={true}
                  />
                  <HeroVideoCard
                    videoSrc={ASSET_MANIFEST.hero.introVideo.path}
                    title="SN Olympia Facility Showcase"
                    alignment="right"
                    compact={true}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HERO ATHLETE WITH BACKGROUND "OLAMPIYA" TEXT */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <img
              src={ASSET_MANIFEST.hero.athleteCurlingOlampiya.path}
              alt="SN Olympia Fitness muscular athlete with curling barbell and Olampiya background typography"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.95]"
            />

            {/* Realistic Muscle Heat & Steam Vapor Rising from Athlete's Body */}
            <AthleteBodySmoke />

            {/* Subtle Lateral Vignettes for Crystal-Clear Text Contrast */}
            <div className="absolute inset-y-0 left-0 w-2/5 sm:w-1/3 bg-gradient-to-r from-[#0C0E12]/95 via-[#0C0E12]/70 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-2/5 sm:w-1/3 bg-gradient-to-l from-[#0C0E12]/95 via-[#0C0E12]/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0C0E12] via-[#0C0E12]/60 to-transparent" />
          </div>

          {/* CONTENT GRID: LEFT (Get Fit) & RIGHT (Stay Fit + Video) */}
          <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-6 lg:gap-4 items-stretch min-h-[560px] sm:min-h-[660px] md:min-h-[700px] lg:min-h-[720px] p-5 sm:p-8 md:p-8 lg:p-14">
            
            {/* ========================================================================= */}
            {/* LEFT COLUMN: "Get Fit", Coaches/Trust Badge, and Bottom-Left Video Container */}
            {/* ========================================================================= */}
            <div className="md:col-span-1 lg:col-span-5 flex flex-col justify-between h-full space-y-4 sm:space-y-6">
              <div className="space-y-4">
                {/* Giant Energetic Athletic "Get Fit" Headline */}
                <div className="group/headline cursor-default select-none text-left">
                  {/* Discipline • Hypertrophy Pill (Hidden on mobile <md) */}
                  <div className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-[#FF5E1E] uppercase font-bold">
                      DISCIPLINE &bull; HYPERTROPHY
                    </span>
                  </div>
                  <h1 className="font-athletic italic uppercase font-black tracking-tight leading-[0.85] text-3xl sm:text-4xl md:text-6xl lg:text-8xl drop-shadow-2xl transition-transform duration-300 group-hover/headline:translate-x-1 text-left">
                    <span className="text-sheen-effect inline-block">GET</span>{' '}
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1E] via-[#FF7538] to-[#FFA034] text-glow-orange">
                      FIT
                    </span>
                  </h1>
                </div>

                {/* 5.0 Google Rating & Member Reviews Credential Badge (Desktop only >=lg, sits below GET FIT) */}
                <div className="hidden lg:block mt-6 lg:mt-8 pt-1">
                  <HeroTrustRatingBadge />
                </div>
              </div>

              {/* Bottom Left: Second Video Card & Tablet Rating Badge */}
              <div className="hidden md:flex flex-col gap-3 pt-2 w-fit">
                <HeroVideoCard
                  videoSrc={ASSET_MANIFEST.hero.introVideo2.path}
                  title="SN Olympia Energy & Coaching"
                  alignment="left"
                />

                {/* On Tablet (md:max-lg), 5-star rating card is moved down below the video at the barbell/hand level as requested */}
                <div className="hidden md:block lg:hidden mt-2">
                  <HeroTrustRatingBadge />
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* CENTER SPACER: Keeps center athlete clear and visible (Desktop only)      */}
            {/* ========================================================================= */}
            <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

            {/* ========================================================================= */}
            {/* RIGHT COLUMN: "Stay Fit", First Video Card, Scroll Down Button            */}
            {/* ========================================================================= */}
            <div className="md:col-span-1 lg:col-span-5 flex flex-col justify-between items-end h-full space-y-4 sm:space-y-6">
              <div className="flex flex-col items-end w-full space-y-4">
                {/* Giant Energetic Athletic "Stay Fit" Headline (Moved upper on tablet to match GET FIT) */}
                <div className="group/stayline cursor-default select-none flex flex-col items-end text-right">
                  {/* Performance • Resilience Pill (Hidden on mobile <md) */}
                  <div className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-[#FF5E1E] uppercase font-bold">
                      PERFORMANCE &bull; RESILIENCE
                    </span>
                  </div>
                  <h2 className="font-athletic italic uppercase font-black tracking-tight leading-[0.85] text-3xl sm:text-4xl md:text-6xl lg:text-8xl drop-shadow-2xl transition-transform duration-300 text-right">
                    <span className="text-sheen-effect inline-block">STAY</span>{' '}
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1E] via-[#FF7538] to-[#FFA034] text-glow-orange">
                      FIT
                    </span>
                  </h2>
                </div>

                {/* Floating Translucent Video Card (Hidden on mobile <md) */}
                <div className="hidden md:block mt-1 w-fit">
                  <HeroVideoCard
                    videoSrc={ASSET_MANIFEST.hero.introVideo.path}
                    title="SN Olympia Facility Showcase"
                    alignment="right"
                  />
                </div>
              </div>

              {/* Bottom Right: Circular Scroll Down Button (3D plate pill completely removed) */}
              <div className="flex items-center gap-4 pt-2 w-full justify-end">
                {/* Circular Scroll Down Button (Desktop / Tablet >=md) */}
                <button
                  onClick={scrollToNext}
                  aria-label="Scroll down to classes"
                  className="hidden md:flex w-11 h-11 rounded-full bg-white/10 hover:bg-[#FF5E1E] hover:text-white border border-white/20 text-[#FF5E1E] flex items-center justify-center shadow-lg transition-all active:scale-95 group"
                >
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                </button>

                {/* Mobile Animated Neon Play Button (<md) */}
                <div className="relative md:hidden flex items-center justify-end z-40">
                  {/* Neon Animated Circular Play Button (No text, pulsing neon rings) */}
                  <button
                    type="button"
                    data-reel-toggle="true"
                    onClick={() => setMobileTooltipOpen((prev) => !prev)}
                    aria-label={mobileTooltipOpen ? 'Close video reels' : 'Open video reels'}
                    aria-expanded={mobileTooltipOpen}
                    className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-[0_0_28px_rgba(255,94,30,0.9),0_0_55px_rgba(255,94,30,0.45)] border border-white/30"
                    style={{
                      background: 'linear-gradient(135deg, #FF5E1E 0%, #FF7A18 50%, #FFA034 100%)',
                    }}
                  >
                    {/* Subtle Expanding Outer Radar Wave / Pulse Ping */}
                    <span className="absolute -inset-2 rounded-full bg-[#FF5E1E]/35 animate-ping opacity-60 pointer-events-none" />
                    <span className="absolute -inset-1 rounded-full border border-[#FF5E1E]/70 animate-pulse pointer-events-none" />

                    {/* Pure Neon Play Icon (No text) */}
                    <Play className="relative z-10 w-5 h-5 text-white fill-white translate-x-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
                  </button>
                </div>
              </div>
          </div>
        </div>

        {/* Signature Centered 3D "Explore More" Button (Elevated to z-30 with pointer-events isolation) */}
        <div className="relative lg:absolute lg:bottom-7 inset-x-0 flex justify-center items-center z-30 pointer-events-none pb-6 lg:pb-0">
          <div className="pointer-events-auto">
            <HeroExplore3DButton onClick={onExploreClick || onJoinClick} />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};
