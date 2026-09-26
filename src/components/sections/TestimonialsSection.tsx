import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';
import { ScrollReveal } from '../common/ScrollReveal';

// Official Multi-Colored Google "G" Icon
const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

// Helper to get initials from member names
const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const TestimonialsSection: React.FC = () => {
  const testimonials = SITE_CONTENT.testimonials;
  const googleShareUrl = SITE_CONTENT.brand.address.googleShareUrl;
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate reviews array to create seamless infinite loop marquee
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative py-28 md:py-36 bg-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-volt/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Verified 4.9★ Google Rating Badge */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
              <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
              <span>4.9★ Google Reputation • 126+ Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              4.9★ RATED BY{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt via-amber-400 to-amber-300">
                126+ GOOGLE REVIEWS.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
              Real impressions from dedicated local athletes who train at SN Olympia Fitness. Verified community proof straight from Google Maps.
            </p>
          </div>

          {/* Interactive Aggregate Rating Card linked to Google */}
          <a
            href={googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/pill p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-brand-volt/60 hover:shadow-glow-volt transition-all duration-300 flex items-center gap-4 shrink-0 shadow-xl"
            title="View all 126+ reviews on Google Maps"
          >
            <div className="flex flex-col items-center justify-center pr-3 border-r border-brand-border/60">
              <div className="text-3xl sm:text-4xl font-black font-mono text-brand-volt leading-none group-hover/pill:scale-105 transition-transform">
                4.9
              </div>
              <span className="text-[10px] font-mono text-brand-text-muted mt-1">OUT OF 5.0</span>
            </div>

            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-text-secondary">
                <GoogleIcon className="w-3.5 h-3.5" />
                <span className="font-semibold text-white">126+ Google Reviews</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-brand-volt pt-0.5 group-hover/pill:underline">
                <span>View on Google Maps</span>
                <ExternalLink className="w-3 h-3 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </a>
        </ScrollReveal>
      </div>

      {/* Infinite Horizontal Marquee Stream (Right to Left) */}
      <div
        className="relative w-full overflow-hidden py-4 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Edge Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent z-20" />
        {/* Right Edge Gradient Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-brand-dark via-brand-dark/80 to-transparent z-20" />

        {/* Marquee Track Moving from Right to Left */}
        <div
          className={`flex gap-6 sm:gap-8 w-max animate-marquee ${
            isPaused ? '[animation-play-state:paused]' : ''
          }`}
          style={{ animationDuration: '36s' }}
        >
          {marqueeItems.map((test, idx) => (
            <div
              key={`${test.id}-${idx}`}
              className="group/card relative w-[320px] sm:w-[390px] md:w-[420px] shrink-0 p-6 sm:p-7 rounded-2xl bg-brand-surface/90 backdrop-blur-xl border border-brand-border/80 hover:border-brand-volt/70 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(255,94,30,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default select-none hover:-translate-y-2.5"
            >
              {/* Neon Glow Accent Line at Top of Card */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-brand-volt to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              {/* Ambient Radial Hover Flare inside Card */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-volt/10 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Top: Author Identity, Rating & Source Badge */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  {/* Author Avatar & Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br ${
                        test.avatarColor || 'from-brand-volt to-amber-500'
                      } flex items-center justify-center font-mono font-black text-white text-sm shadow-md border border-white/20 shrink-0 group-hover/card:scale-105 transition-transform`}
                    >
                      {getInitials(test.author)}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight group-hover/card:text-brand-volt transition-colors">
                        {test.author}
                      </h4>
                      <p className="text-[11px] font-mono text-brand-text-muted mt-0.5">
                        {test.role || 'Member'} • {test.date || 'Verified Review'}
                      </p>
                    </div>
                  </div>

                  {/* Google Verified Review Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-charcoal/90 border border-brand-border text-[11px] font-mono text-brand-text-secondary shrink-0 shadow-sm">
                    <GoogleIcon className="w-3 h-3 shrink-0" />
                    <span className="text-[10px] text-emerald-400 font-bold">Verified</span>
                  </div>
                </div>

                {/* 5 Gold Stars Rating with Glow */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.stars)].map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)]"
                    />
                  ))}
                  <span className="text-xs font-mono font-bold text-amber-400 ml-1.5">5.0</span>
                </div>

                {/* Member Review Quote with Neon Quote Marker */}
                <div className="relative mb-6">
                  <Quote className="w-7 h-7 text-brand-volt/15 group-hover/card:text-brand-volt/40 transition-colors duration-300 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="relative pl-6 text-sm sm:text-[15px] text-brand-text-primary font-normal leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>
              </div>

              {/* Card Footer: Verified Physical Location & Google Review Anchor */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-mono text-brand-text-muted">
                <div className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Timmappa Colony</span>
                </div>

                <a
                  href={googleShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-brand-text-secondary hover:text-brand-volt transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Google Review</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Honest Content Truth Note & Google Link */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ScrollReveal direction="up" delay={0.15}>
          <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-brand-text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% AUTHENTIC GOOGLE MAPS REVIEWS • 4.9★ AVERAGE • 126+ RATINGS</span>
            </div>

            <a
              href={googleShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-volt hover:underline"
            >
              <GoogleIcon className="w-3.5 h-3.5" />
              <span>Read All Reviews on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
