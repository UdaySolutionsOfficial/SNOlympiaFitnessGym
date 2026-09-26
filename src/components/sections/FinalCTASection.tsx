import React from 'react';
import { Flame, ArrowRight, Phone } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';
import { ASSET_MANIFEST } from '../../data/assets';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export interface FinalCTASectionProps {
  onJoinClick?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onJoinClick }) => {
  return (
    <section className="relative py-36 md:py-48 bg-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Background High-Impact Photography with Dark Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={ASSET_MANIFEST.about.gymAtmosphere.path}
          alt="Olympia Fitness Training Floor"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-20 filter brightness-40 contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark" />
        <div className="absolute inset-0 bg-radial-gradient-to-c from-brand-volt/10 via-transparent to-brand-dark" />
      </div>

      {/* Central Volt Ambient Light Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-volt/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Badge */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-8">
            <Flame className="w-3.5 h-3.5 animate-pulse" />
            The Final Commitment
          </div>
        </ScrollReveal>

        {/* Master Cinema Headline */}
        <ScrollReveal direction="zoom" delay={0.15} duration={0.8}>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.94]">
            FORGE YOUR PROGRESS.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt via-amber-300 to-brand-volt">
              START TODAY.
            </span>
          </h2>
        </ScrollReveal>

        {/* Narrative */}
        <ScrollReveal direction="up" delay={0.25}>
          <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-brand-text-secondary leading-relaxed font-light">
            The iron is racked. The coaches are on the floor. Take the first step toward the strongest version of yourself at Yemmiganur’s premier unisex fitness center.
          </p>
        </ScrollReveal>

        {/* Dual Conversion Action Buttons */}
        <ScrollReveal direction="up" delay={0.35}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onJoinClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-volt text-brand-dark font-black text-xs uppercase tracking-widest hover:bg-white hover:shadow-glow-volt transition-all flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>JOIN NOW & INQUIRE BATCH</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-brand-surface border border-brand-border text-white font-bold text-xs uppercase tracking-widest hover:border-brand-volt hover:text-brand-volt transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-volt" />
              <span>Call {SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
            </a>
          </div>
        </ScrollReveal>

        {/* Reassurance Metadata */}
        <ScrollReveal direction="up" delay={0.45}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-brand-text-muted">
            <span>✓ 100% Unisex Facility</span>
            <span>•</span>
            <span>✓ Morning & Evening Shifts</span>
            <span>•</span>
            <span>✓ Certified Floor Spotters</span>
            <span>•</span>
            <span>✓ 5.0★ Community Trust</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
