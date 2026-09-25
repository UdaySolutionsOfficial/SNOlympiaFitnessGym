import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface IntroLoaderProps {
  onComplete: () => void;
  minDuration?: number;
}

/**
 * Cinematic Brand Film Opening / Intro Loader
 * Inspired by ThreeUI Article Headings text reveal mechanics.
 * Restrained, confident, 1.4s duration, non-blocking fallback.
 */
export const IntroLoader: React.FC<IntroLoaderProps> = ({
  onComplete,
  minDuration = 1400,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<'init' | 'wordmark' | 'subtitle' | 'exit'>('init');

  useEffect(() => {
    // If reduced motion is requested or already seen in session, complete immediately
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const hasSeenIntro = sessionStorage.getItem('olympia_intro_seen');
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    // Sequence stages
    const timer1 = setTimeout(() => setPhase('wordmark'), 150);
    const timer2 = setTimeout(() => setPhase('subtitle'), 600);
    const timer3 = setTimeout(() => setPhase('exit'), minDuration);
    const timer4 = setTimeout(() => {
      sessionStorage.setItem('olympia_intro_seen', 'true');
      onComplete();
    }, minDuration + 500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        sessionStorage.setItem('olympia_intro_seen', 'true');
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [minDuration, onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-label="Welcome to SN Olympia Fitness"
      aria-modal="true"
      onClick={() => {
        sessionStorage.setItem('olympia_intro_seen', 'true');
        onComplete();
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08090A] cursor-pointer transition-all duration-700 select-none ${
        phase === 'exit'
          ? 'opacity-0 -translate-y-6 pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Subtle Ambient Laser Line in Background */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-volt/40 to-transparent top-1/2 -translate-y-12" />

      {/* Atmospheric Radial Beam */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-brand-volt/5 blur-[120px] pointer-events-none" />

      {/* Centered Wordmark Lockup */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Top Eyebrow Tag */}
        <div
          className={`overflow-hidden transition-all duration-500 mb-3 ${
            phase !== 'init' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-brand-volt uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-volt animate-ping" />
            ATHLETIC DISCIPLINE • YEMMIGANUR
          </span>
        </div>

        {/* Signature Brand Wordmark with Masked Reveal */}
        <div className="overflow-hidden py-1">
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === 'wordmark' || phase === 'subtitle' || phase === 'exit'
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
            }`}
          >
            OLYMPIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-white">FITNESS</span>
          </h1>
        </div>

        {/* Subtitle / Ground Truth Mandate */}
        <div
          className={`overflow-hidden mt-3 transition-all duration-500 delay-100 ${
            phase === 'subtitle' || phase === 'exit'
              ? 'opacity-80 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-brand-text-secondary uppercase">
            UNISEX HIGH-PERFORMANCE TRAINING GROUND
          </p>
        </div>

        {/* Skip Cue */}
        <div className="absolute -bottom-20 text-[10px] font-mono tracking-widest text-brand-text-muted/60 uppercase">
          [ CLICK OR TAP TO ENTER ]
        </div>
      </div>
    </div>
  );
};
