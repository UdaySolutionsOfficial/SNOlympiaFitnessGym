import React from 'react';

export interface SectionDividerWatermarkProps {
  quote: string;
  className?: string;
  /**
   * Direction of gradient fade:
   * 'down': top 75% is visible, bottom 25% blends into the dark screen.
   * 'up': bottom 75% is visible, top 25% blends into the dark screen.
   */
  fadeDirection?: 'down' | 'up';
}

/**
 * SectionDividerWatermark
 * Places an iconic, high-impact athletic quotation watermark in the transition space between sections.
 * 75% of the massive typography is clearly visible with clean typographic presence,
 * and the remaining 25% seamlessly fades into the dark website canvas.
 */
export const SectionDividerWatermark: React.FC<SectionDividerWatermarkProps> = ({
  quote,
  className = '',
  fadeDirection = 'down',
}) => {
  const isDown = fadeDirection === 'down';

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none flex items-center justify-center -my-6 sm:-my-10 md:-my-14 py-3 z-0 ${className}`}
      aria-hidden="true"
    >
      <span
        className={`font-black uppercase tracking-tighter text-[13vw] sm:text-[11vw] md:text-[9.5vw] leading-none whitespace-nowrap block select-none ${
          isDown
            ? 'bg-gradient-to-b from-white/[0.15] via-white/[0.12] to-white/[0.04]'
            : 'bg-gradient-to-t from-white/[0.15] via-white/[0.12] to-white/[0.04]'
        } bg-clip-text text-transparent`}
        style={{
          WebkitMaskImage: isDown
            ? 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.45) 90%, rgba(0,0,0,0) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.45) 90%, rgba(0,0,0,0) 100%)',
          maskImage: isDown
            ? 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.45) 90%, rgba(0,0,0,0) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0.45) 90%, rgba(0,0,0,0) 100%)',
        }}
      >
        {quote}
      </span>
    </div>
  );
};
