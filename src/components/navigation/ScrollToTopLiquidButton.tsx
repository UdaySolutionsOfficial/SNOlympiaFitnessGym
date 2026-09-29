import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface ScrollToTopLiquidButtonProps {
  /** Scroll offset in pixels after which the button becomes visible (default: 80px) */
  showThreshold?: number;
}

interface SmokeParticle {
  id: number;
  initialX: number;
  driftX: number;
  targetY: number;
  size: number;
  blur: number;
  duration: number;
  delay: number;
  color: string;
}

const SMOKE_PARTICLES: readonly SmokeParticle[] = [
  { id: 1, initialX: -6, driftX: -14, targetY: -52, size: 7, blur: 2.5, duration: 1.4, delay: 0.05, color: '#FF5E1E' },
  { id: 2, initialX: 4, driftX: 12, targetY: -44, size: 5, blur: 2, duration: 1.2, delay: 0.2, color: '#FFA034' },
  { id: 3, initialX: -2, driftX: -8, targetY: -58, size: 9, blur: 3.5, duration: 1.7, delay: 0.1, color: '#FF7538' },
  { id: 4, initialX: 8, driftX: 16, targetY: -50, size: 6, blur: 2.5, duration: 1.5, delay: 0.35, color: '#FF5E1E' },
  { id: 5, initialX: -10, driftX: -16, targetY: -40, size: 4, blur: 1.5, duration: 1.1, delay: 0.15, color: '#FFA034' },
  { id: 6, initialX: 2, driftX: 7, targetY: -64, size: 10, blur: 4, duration: 1.9, delay: 0.45, color: '#FF5E1E' },
  { id: 7, initialX: -5, driftX: -11, targetY: -46, size: 5, blur: 2, duration: 1.3, delay: 0.25, color: '#FF9100' },
  { id: 8, initialX: 6, driftX: 11, targetY: -55, size: 8, blur: 3, duration: 1.6, delay: 0.3, color: '#FF7538' },
];

/**
 * ScrollToTopLiquidButton
 * Ultra-luxury floating circular action button at the bottom-right of the screen.
 *
 * Enhancements:
 * 1. ZERO-GAP SEAMLESS VESSEL: Filled edge-to-edge with the rich theme color without any inner padding gaps.
 * 2. REAL LIQUID DUAL-WAVE MENISCUS: Two counter-phase fluid waves undulate continuously at the water surface.
 * 3. FLUID INERTIA LERP: Spring-damped scroll tracking simulating realistic water mass.
 * 4. ANIMATED HOVER ORANGE TRANSFORMATION: Transitions smoothly into fiery brand orange with radiant aura.
 * 5. SMOKE & EMBER PARTICLES: Floating ethereal smoke/ember particles evolve and drift upward on hover.
 * 6. SINGLE HIGH-CONTRAST ARROW: Exactly one athletic arrow that adapts cleanly between dark mode and hover mode.
 * 7. SILKY SMOOTH REVEAL & HIDE: Spring-interpolated opacity, scale, and position without sudden popping.
 */
export const ScrollToTopLiquidButton: React.FC<ScrollToTopLiquidButtonProps> = ({
  showThreshold = 80,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Smooth liquid level animation (lerp state)
  const targetLevelRef = useRef(0);
  const currentLevelRef = useRef(0);
  const [displayLevel, setDisplayLevel] = useState(0);
  const lerpRafRef = useRef<number | null>(null);

  // Smooth fluid inertia lerp loop
  useEffect(() => {
    const updateFluidLevel = () => {
      const diff = targetLevelRef.current - currentLevelRef.current;
      if (Math.abs(diff) > 0.05) {
        currentLevelRef.current += diff * 0.12;
        setDisplayLevel(currentLevelRef.current);
        lerpRafRef.current = requestAnimationFrame(updateFluidLevel);
      } else {
        currentLevelRef.current = targetLevelRef.current;
        setDisplayLevel(currentLevelRef.current);
        lerpRafRef.current = null;
      }
    };

    const triggerLerp = () => {
      if (lerpRafRef.current === null) {
        lerpRafRef.current = requestAnimationFrame(updateFluidLevel);
      }
    };

    const handleScroll = () => {
      const scrollY =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      const shouldBeVisible = scrollY > showThreshold;
      setIsVisible(shouldBeVisible);

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 800;
      const maxScroll = Math.max(1, docHeight - winHeight);
      const rawProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
      const targetPercent = rawProgress * 100;

      targetLevelRef.current = targetPercent;
      setScrollPercent(Math.round(targetPercent));
      triggerLerp();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (lerpRafRef.current !== null) {
        cancelAnimationFrame(lerpRafRef.current);
      }
    };
  }, [showThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.72,
        y: isVisible ? 0 : 20,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 22,
        mass: 0.8,
      }}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      className="fixed z-[100] bottom-20 sm:bottom-20 md:bottom-8 right-4 sm:right-6 md:right-8 flex flex-col items-end select-none"
    >
      {/* ========================================================================= */}
      {/* RISING SMOKE & EMBER PARTICLES (EVOLVES ON HOVER)                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isHovered && isVisible && !prefersReducedMotion && (
          <div className="absolute -inset-x-6 bottom-6 h-20 pointer-events-none overflow-visible z-50">
            {SMOKE_PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 0, x: p.initialX, scale: 0.3 }}
                animate={{
                  opacity: [0, 0.85, 0.65, 0],
                  y: [0, p.targetY * 0.4, p.targetY * 0.75, p.targetY],
                  x: [p.initialX, p.initialX + p.driftX * 0.5, p.initialX + p.driftX],
                  scale: [0.3, 1.1, 1.4, 0.2],
                }}
                exit={{ opacity: 0, scale: 0.2 }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  filter: `blur(${p.blur}px)`,
                }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full pointer-events-none shadow-[0_0_8px_currentColor]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* PROFESSIONAL GLASSMORPHIC HOVER TOOLTIP                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isHovered && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute bottom-full mb-3 right-0 pointer-events-none z-50"
          >
            <div className="relative px-3.5 py-1.5 rounded-full bg-[#0C0E14]/95 backdrop-blur-xl border border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.9),0_0_20px_rgba(255,94,30,0.35)] flex items-center gap-2 whitespace-nowrap">
              {/* Glowing Pulse Indicator */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] shadow-[0_0_8px_#FF5E1E] animate-pulse" />

              {/* Tooltip Label */}
              <span className="font-athletic italic uppercase font-bold text-[11px] text-white tracking-wider">
                BACK TO TOP
              </span>

              {/* Live Telemetry Progress Pill */}
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-[#FF5E1E]/20 text-[#FFA034] border border-[#FF5E1E]/30">
                {scrollPercent}%
              </span>

              {/* Bottom Caret Arrow */}
              <div className="absolute top-full right-5 -mt-[1px] w-2 h-2 rotate-45 bg-[#0C0E14] border-r border-b border-white/20" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SEAMLESS ZERO-GAP FLOATING LIQUID BUTTON                                  */}
      {/* ========================================================================= */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.92 }}
        aria-label={`Scroll to top of page (Current scroll progress: ${scrollPercent}%)`}
        className="group relative w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {/* 1. Ambient Looping Aurora Glow Aura (Intensifies on hover) */}
        <div
          className={`absolute -inset-2 rounded-full filter blur-xl transition-all duration-500 pointer-events-none ${
            isHovered
              ? 'bg-gradient-to-r from-[#FF5E1E] via-[#FF7538] to-[#FFA034] opacity-95 scale-125'
              : 'bg-[#FF5E1E] opacity-35 animate-pulse'
          }`}
          style={{ animationDuration: '3s' }}
          aria-hidden="true"
        />

        {/* 2. Seamless Full-Circle Reservoir Vessel (Edge-to-Edge with Zero Gaps) */}
        <div className="relative w-full h-full rounded-full overflow-hidden border border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.85)] bg-gradient-to-b from-[#1C202A] to-[#0A0C11]">
          {/* Base Inner Depth Shadow */}
          <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.85)] pointer-events-none z-10" />

          {/* 3. REAL DUAL-WAVE LIQUID BODY (Rising with fluid inertia on scroll) */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden transition-[height] duration-75 ease-out z-10"
            style={{ height: `${Math.min(100, Math.max(0, displayLevel))}%` }}
          >
            {/* Deep Molten Liquid Body */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#B83200] via-[#FF5E1E] to-[#FFA034] shadow-[inset_0_0_12px_rgba(255,255,255,0.35)]" />

            {/* DUAL LIQUID WAVES AT WATERLINE (Counter-phase 3D fluid sloshing) */}
            {!prefersReducedMotion && (
              <>
                {/* Wave 1: Back Wave (Deeper Burnt Orange, Moving in 3.6s) */}
                <div className="absolute top-0 inset-x-0 -translate-y-[60%] h-4.5 overflow-hidden pointer-events-none opacity-65">
                  <svg
                    viewBox="0 0 200 24"
                    preserveAspectRatio="none"
                    className="w-[200%] h-full fill-[#E0480C] animate-liquid-wave-back"
                  >
                    <path d="M 0 14 C 25 24, 25 2, 50 14 C 75 24, 75 2, 100 14 C 125 24, 125 2, 150 14 C 175 24, 175 2, 200 14 V 30 H 0 Z" />
                  </svg>
                </div>

                {/* Wave 2: Front Wave (Vibrant Molten Amber-Volt, Moving in 2.2s in Counter-Phase) */}
                <div className="absolute top-0 inset-x-0 -translate-y-1/2 h-4 overflow-hidden pointer-events-none opacity-95">
                  <svg
                    viewBox="0 0 200 24"
                    preserveAspectRatio="none"
                    className="w-[200%] h-full fill-[#FFA034] animate-liquid-wave-front"
                  >
                    <path d="M 0 12 C 25 0, 25 24, 50 12 C 75 0, 75 24, 100 12 C 125 0, 125 24, 150 12 C 175 0, 175 24, 200 12 V 30 H 0 Z" />
                  </svg>
                </div>
              </>
            )}

            {/* Surface Foam / Specular Crest Highlight Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* 4. HOVER ORANGE SURGE OVERLAY (Smooth animated transition to blazing electric volt-orange) */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.94,
            }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute inset-0 bg-gradient-to-tr from-[#D63E04] via-[#FF5E1E] to-[#FFA034] shadow-[inset_0_0_18px_rgba(255,255,255,0.45)] pointer-events-none z-20"
          />

          {/* 5. SINGLE ATHLETIC UPWARD ARROW (Exactly ONE arrow — crisp white, shifts to black on hover) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <motion.div
              animate={{
                y: isHovered ? -2 : 0,
                color: isHovered ? '#090A0E' : '#FFFFFF',
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <ArrowUp
                className={`w-5 h-5 transition-all duration-200 stroke-[2.75] ${
                  isHovered
                    ? 'stroke-[3.2] drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]'
                    : 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]'
                }`}
              />
            </motion.div>
          </div>

          {/* 6. Top Specular Glass Reflection (Lens Curvature) */}
          <div className="absolute inset-x-1 top-0.5 h-3 rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none z-40" />
        </div>
      </motion.button>
    </motion.div>
  );
};
