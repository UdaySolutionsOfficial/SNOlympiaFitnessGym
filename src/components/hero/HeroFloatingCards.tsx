import React from 'react';
import { Star, ShieldCheck, Dumbbell } from 'lucide-react';

export interface HeroFloatingCardsProps {
  className?: string;
  mouseOffset?: { x: number; y: number };
}

/**
 * Hero Floating UI Cards
 * 2–3 grounded, verified micro-cards with subtle parallax floating physics.
 * No fabricated statistics; strictly verified ground truth facts.
 */
export const HeroFloatingCards: React.FC<HeroFloatingCardsProps> = ({
  className,
  mouseOffset = { x: 0, y: 0 },
}) => {
  return (
    <div className={`pointer-events-none ${className}`}>
      {/* Card 1: 5.0 Star Verified Rating */}
      <div
        style={{
          transform: `translate3d(${mouseOffset.x * 0.04}px, ${mouseOffset.y * 0.04}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-auto inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-white">5.0 RATING</span>
            <span className="text-[9px] px-1.5 py-0 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              VERIFIED
            </span>
          </div>
          <span className="text-[10px] text-brand-text-muted font-medium block">
            Google & Local Reviews
          </span>
        </div>
      </div>

      {/* Card 2: 100% Unisex Facility */}
      <div
        style={{
          transform: `translate3d(${mouseOffset.x * -0.03}px, ${mouseOffset.y * -0.03}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-auto inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/85 backdrop-blur-xl border border-brand-volt/25 shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-volt/10 border border-brand-volt/30">
          <ShieldCheck className="w-4 h-4 text-brand-volt" />
        </div>
        <div>
          <span className="text-xs font-black text-white block">100% UNISEX</span>
          <span className="text-[10px] text-brand-text-muted font-medium">
            Men & Women Batches
          </span>
        </div>
      </div>
    </div>
  );
};
