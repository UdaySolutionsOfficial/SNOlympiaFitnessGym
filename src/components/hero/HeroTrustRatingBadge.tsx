import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HeroTrustRatingBadgeProps {
  className?: string;
}

/**
 * ThreeUI Luxury Glassmorphic Trust & Review Badge (Desktop Only)
 * 
 * Clean, high-impact social proof credential:
 * - 5.0 Rating score in bold athletic typography
 * - 5 Golden glowing stars with staggered hover bloom
 * - Official VERIFIED badge with shield check
 * - "500+ Member Reviews • Top Rated in Yemmiganur"
 * - Decoupled continuous levitation & calibrated spring hover in/out
 * - Strictly hidden on mobile screens (<md)
 */
export const HeroTrustRatingBadge: React.FC<HeroTrustRatingBadgeProps> = ({
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        !prefersReducedMotion
          ? {
              y: [0, -4, 0],
              transition: {
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
          : undefined
      }
      className="inline-block"
    >
      <motion.div
        whileHover={
          !prefersReducedMotion
            ? {
                y: -2.5,
                scale: 1.015,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 28,
                },
              }
            : undefined
        }
        whileTap={!prefersReducedMotion ? { scale: 0.985 } : undefined}
        className={`group/trust relative inline-flex flex-col text-left px-5 py-3 rounded-2xl bg-[#0C0E14]/85 backdrop-blur-2xl border border-white/12 shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(255,94,30,0.12)] hover:border-[#FF5E1E]/45 hover:shadow-[0_22px_48px_rgba(0,0,0,0.95),0_0_36px_rgba(255,94,30,0.28)] hover:bg-[#11141C]/90 transition-all duration-300 ease-out cursor-default select-none overflow-hidden ${className}`}
      >
        {/* Soft Ambient Radial Sheen on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5E1E]/[0.07] to-transparent opacity-0 group-hover/trust:opacity-100 transition-opacity duration-400 ease-out pointer-events-none" />

        {/* Top Subtle Amber Rim Light */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF5E1E]/80 to-transparent group-hover/trust:via-[#FF5E1E] group-hover/trust:shadow-[0_0_12px_#FF5E1E] transition-all duration-300" />

        {/* Row 1: 5.0 Rating + 5 Golden Stars + Verified Pill */}
        <div className="relative z-10 flex items-center gap-2.5">
          <span className="font-athletic italic font-black text-white text-lg leading-none tracking-tight">
            5.0
          </span>

          {/* 5 Golden Glowing Stars with Smooth Synchronized Hover Lift & Bloom */}
          <div className="flex items-center gap-1 text-[#FFA034]">
            {[0, 1, 2, 3, 4].map((starIdx) => (
              <Star
                key={starIdx}
                className="w-3.5 h-3.5 fill-[#FFA034] text-[#FFA034] drop-shadow-[0_0_6px_rgba(255,160,52,0.7)] group-hover/trust:drop-shadow-[0_0_10px_rgba(255,160,52,0.95)] group-hover/trust:scale-105 transition-all duration-300 ease-out"
                style={{
                  transitionDelay: `${starIdx * 35}ms`,
                }}
              />
            ))}
          </div>

          {/* Verified Check Pill */}
          <span className="inline-flex items-center gap-1 ml-0.5 px-2 py-0.5 rounded-full bg-[#FF5E1E]/15 border border-[#FF5E1E]/30 text-[9px] font-mono font-bold text-[#FFA034] uppercase tracking-wider group-hover/trust:border-[#FF5E1E]/50 group-hover/trust:bg-[#FF5E1E]/25 transition-colors duration-300">
            <ShieldCheck className="w-2.5 h-2.5 text-[#FF5E1E]" />
            <span>VERIFIED</span>
          </span>
        </div>

        {/* Row 2: Review Count & Authority Statement */}
        <div className="relative z-10 flex items-center gap-2 mt-1.5">
          <span className="text-[11px] font-mono font-bold text-white tracking-wider uppercase">
            500+ Member Reviews
          </span>
          <span className="text-[10px] text-[#FF5E1E]">&bull;</span>
          <span className="text-[11px] font-sans font-medium text-neutral-300 tracking-normal group-hover/trust:text-white transition-colors duration-300">
            Top Rated in Yemmiganur
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
