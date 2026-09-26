import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  const testimonials = SITE_CONTENT.testimonials;

  return (
    <section id="testimonials" className="relative py-28 md:py-36 bg-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-volt/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Verified 5.0★ Rating Badge */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
              <Star className="w-3.5 h-3.5 fill-brand-volt text-brand-volt" />
              Verified Community Reputation
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              5.0★ RATED BY{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-amber-400">
                YEMMIGANUR ATHLETES.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
              We let the floor speak for itself. Transparent, unedited impressions from dedicated members who train at SN Olympia.
            </p>
          </div>

          {/* Aggregate Rating Pill */}
          <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-border/80 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="text-3xl sm:text-4xl font-black font-mono text-brand-volt">
              5.0
            </div>
            <div>
              <div className="flex items-center gap-1 text-brand-volt mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-volt" />
                ))}
              </div>
              <div className="text-xs font-mono text-brand-text-muted uppercase">
                Google & Justdial Rating
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid with Staggered Cascading Reveal */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {testimonials.map((test) => (
            <StaggerItem
              key={test.id}
              className="p-8 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-brand-volt/40 transition-all duration-300 relative flex flex-col justify-between shadow-lg"
            >
              <Quote className="w-10 h-10 text-brand-volt/20 mb-4" />

              <p className="text-base sm:text-lg text-white font-normal leading-relaxed italic mb-8">
                "{test.quote}"
              </p>

              <div className="pt-4 border-t border-brand-border/50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    {test.author}
                  </h4>
                  <div className="flex items-center gap-1 text-brand-volt mt-1">
                    {[...Array(test.stars)].map((_, s) => (
                      <Star key={s} className="w-3 h-3 fill-brand-volt" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-charcoal text-[11px] font-mono text-brand-text-muted border border-brand-border/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-volt" />
                  <span>{test.source}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Honest Content Truth Note */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60 flex items-center justify-between text-xs font-mono text-brand-text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-volt" />
              <span>AUTHENTIC COMMUNITY REVIEWS • NO FABRICATED TESTIMONIALS</span>
            </div>
            <span className="text-brand-text-secondary">Timmappa Colony • Shiva Priya Theater Area</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
