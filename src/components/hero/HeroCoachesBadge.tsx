import React from 'react';

export interface HeroCoachesBadgeProps {
  className?: string;
}

/**
 * 20 Active Coaches Glassmorphism Badge
 * Recreates the bottom-left credential badge from the reference mockup
 * with overlapping coach avatars and crisp athletic typography.
 */
export const HeroCoachesBadge: React.FC<HeroCoachesBadgeProps> = ({ className = '' }) => {
  return (
    <div
      className={`inline-flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Overlapping Coach Avatars */}
      <div className="flex -space-x-2.5 overflow-hidden">
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-[#FF5E1E]/60 object-cover"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
          alt="Coach Priya"
        />
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-[#FF5E1E]/60 object-cover"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
          alt="Coach Rahul"
        />
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-[#FF5E1E]/60 object-cover"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
          alt="Coach Anand"
        />
      </div>

      {/* Label and Count */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono font-black text-white text-base leading-none">20+</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E1E]">
            Active Coaches
          </span>
        </div>
        <span className="text-[9px] text-brand-text-muted font-medium mt-0.5">
          Expert Floor Guidance & Spotting
        </span>
      </div>
    </div>
  );
};
