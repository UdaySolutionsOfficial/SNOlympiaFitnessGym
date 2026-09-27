import React from 'react';

export interface SectionDividerWatermarkProps {
  quote: string;
  className?: string;
  /**
   * Direction of gradient fade:
   * 'down': top 75% is clearly visible, bottom 25% fades smoothly into the website.
   * 'up': bottom 75% is clearly visible, top 25% fades smoothly into the website.
   */
  fadeDirection?: 'down' | 'up';
}

/**
 * SectionDividerWatermark
 * Places an iconic, high-impact athletic quotation watermark in the transition space between sections.
 * Features 75% clear vertical typographic visibility with the remaining 25% smoothly fading into the dark background,
 * exactly matching the reference aesthetic.
 */
export const SectionDividerWatermark: React.FC<SectionDividerWatermarkProps> = ({
  quote,
  className = '',
  fadeDirection = 'down',
}) => {
  const isDown = fadeDirection === 'down';

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none flex items-center justify-center pt-8 pb-4 sm:pt-12 sm:pb-6 md:pt-16 md:pb-8 z-10 ${className}`}
      aria-hidden="true"
    >
      <span
        className={`font-black uppercase tracking-tighter text-[13vw] sm:text-[11vw] md:text-[9.5vw] leading-[0.85] whitespace-nowrap block select-none ${
          isDown
            ? 'bg-gradient-to-b from-white/20 via-white/16 to-white/05'
            : 'bg-gradient-to-t from-white/20 via-white/16 to-white/05'
        } bg-clip-text text-transparent`}
        style={{
          WebkitMaskImage: isDown
            ? 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
          maskImage: isDown
            ? 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
        }}
      >
        {quote}
      </span>
    </div>
  );
};
