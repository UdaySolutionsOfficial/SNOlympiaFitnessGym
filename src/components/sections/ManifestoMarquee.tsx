import React, { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface ManifestoMarqueeProps {
  className?: string;
}

/**
 * Athletic Manifesto Marquee
 * Energetic horizontal marquee providing momentum and transition between sections.
 * Pauses on hover, hardware accelerated, reduced-motion compliant.
 */
export const ManifestoMarquee: React.FC<ManifestoMarqueeProps> = ({ className }) => {
  const prefersReducedMotion = useReducedMotion();
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const marqueePhrases = [
    'DISCIPLINE OVER MOTIVATION',
    'UNISEX ATHLETIC CRUCIBLE',
    'TIMMAPPA COLONY YEMMIGANUR',
    'PROGRESSIVE OVERLOAD',
    'FORGED IN HEAVY IRON',
    'NO GIMMICKS NO SHORTCUTS',
  ];

  if (prefersReducedMotion) {
    return (
      <div className={`py-6 px-4 bg-brand-surface/40 border-y border-white/5 text-center ${className}`}>
        <p className="text-xs font-mono font-bold tracking-[0.25em] text-brand-volt uppercase">
          DISCIPLINE OVER MOTIVATION • UNISEX ATHLETIC CRUCIBLE • YEMMIGANUR
        </p>
      </div>
    );
  }

  return (
    <div
      ref={marqueeRef}
      className={`relative w-full overflow-hidden py-5 md:py-7 bg-brand-surface/30 border-y border-white/10 select-none group ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient fades for seamless loop */}
      <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {/* Render twice for continuous loop */}
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex items-center gap-8 shrink-0 pr-8">
            {marqueePhrases.map((phrase, idx) => (
              <span key={`${copyIndex}-${idx}`} className="flex items-center gap-8">
                <span className="text-sm md:text-base font-black tracking-widest uppercase text-white/90 transition-colors group-hover:text-brand-volt">
                  {phrase}
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-volt shadow-glow-volt shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
