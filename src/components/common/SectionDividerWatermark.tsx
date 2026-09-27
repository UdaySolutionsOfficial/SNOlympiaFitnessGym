import React from 'react';

export interface SectionDividerWatermarkProps {
  quote: string;
  className?: string;
  /**
   * Direction of gradient fade:
   * 'down': top is visible, bottom half blends into the black screen.
   * 'up': bottom is visible, top half blends into the black screen.
   */
  fadeDirection?: 'down' | 'up';
}

/**
 * SectionDividerWatermark
 * Places an iconic, high-impact athletic quotation watermark in the transition space between sections.
 * Features a vertical gradient mask that half-blends the massive typography completely into the dark screen,
 * ensuring zero collision with section headings or foreground content.
 */
export const SectionDividerWatermark: React.FC<SectionDividerWatermarkProps> = ({
  quote,
  className = '',
  fadeDirection = 'down',
}) => {
  const isDown = fadeDirection === 'down';

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none flex items-center justify-center -my-6 sm:-my-10 md:-my-14 py-2 z-0 ${className}`}
      aria-hidden="true"
    >
      <span
        className={`font-black uppercase tracking-tighter text-[13vw] sm:text-[11vw] md:text-[9.5vw] leading-none whitespace-nowrap block select-none ${
          isDown
            ? 'bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent'
            : 'bg-gradient-to-t from-white/10 via-white/[0.03] to-transparent'
        } bg-clip-text text-transparent`}
        style={{
          WebkitMaskImage: isDown
            ? 'linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 80%)'
            : 'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 80%)',
          maskImage: isDown
            ? 'linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 80%)'
            : 'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 80%)',
        }}
      >
        {quote}
      </span>
    </div>
  );
};
