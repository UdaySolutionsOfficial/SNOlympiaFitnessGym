import React from 'react';
import { ASSET_MANIFEST } from '../../data/assets';
import { SITE_CONTENT } from '../../data/siteContent';
import { StatusBadge } from '../common/StatusBadge';
import { Shield, Target, Flame, Users2, MapPin } from 'lucide-react';

export interface AboutSectionProps {
  className?: string;
}

/**
 * Editorial About Olympia Section
 * Communicates the true athletic ethos, unisex mandate, and local Yemmiganur roots.
 * Avoids generic stock copy; grounded in biomechanics, consistency, and discipline.
 */
export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  const pillars = [
    {
      icon: <Target className="w-4 h-4 text-brand-volt" />,
      title: 'Biomechanical Form First',
      description: 'Strict attention to spine neutrality, joint tracking, and proper bar path before increasing loads.',
    },
    {
      icon: <Flame className="w-4 h-4 text-brand-volt" />,
      title: 'Progressive Overload',
      description: 'Systematic incremental resistance using commercial barbells, calibrated plates, and dumbbells.',
    },
    {
      icon: <Users2 className="w-4 h-4 text-brand-volt" />,
      title: 'Unisex Athletic Community',
      description: 'A dignified, encouraging environment engineered for both male and female fitness aspirants.',
    },
    {
      icon: <Shield className="w-4 h-4 text-brand-volt" />,
      title: 'Daily Batch Consistency',
      description: 'Structured morning and evening training windows to build lifelong physical momentum.',
    },
  ];

  return (
    <section
      id="about"
      className={`relative py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
    >
      <div className="space-y-16">
        {/* Section Header with Eyebrow */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-brand-volt uppercase">
              // 01. ABOUT OLYMPIA FITNESS
            </span>
            <StatusBadge status="VERIFIED" label="Timmappa Colony Ground" />
          </div>

          <h2 className="text-fluid-section font-black uppercase text-white tracking-tighter leading-[1.02]">
            TRAINING IS NOT ONLY ABOUT HOW YOU LOOK.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-white">
              IT IS ABOUT HOW STRONG YOU FEEL.
            </span>
          </h2>
        </div>

        {/* Editorial 2-Column Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Narrative & Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-sm md:text-base text-brand-text-secondary leading-relaxed font-normal">
              <p>
                Established in the heart of Yemmiganur at <strong className="text-white">Timmappa Colony</strong> (Shiva Priya Theater Area), <strong className="text-white">SN Olympia Fitness</strong> was created to reject the vanity and distractions of modern commercial fitness lounges.
              </p>
              <p>
                We operate as a true athletic forge: heavy cast iron, solid steel racks, high-energy conditioning turf, and floor coaches who prioritize your biomechanical longevity. Whether you are lifting a barbell for the first time or chasing a personal record, every session is designed to make you physically resilient and mentally disciplined.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-brand-surface/70 border border-white/5 space-y-2 hover:border-brand-volt/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-volt/10 border border-brand-volt/20 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Location Hook */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-surface/40 border border-white/5 text-xs text-brand-text-secondary">
              <MapPin className="w-4 h-4 text-brand-volt shrink-0" />
              <span>{SITE_CONTENT.brand.address.fullFormatted.value}</span>
            </div>
          </div>

          {/* Right Column: Wide Cinematic Atmosphere Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden bg-brand-surface/50 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <img
                src={ASSET_MANIFEST.about.gymAtmosphere.path}
                alt={ASSET_MANIFEST.about.gymAtmosphere.alt}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[16/10] object-cover object-center filter contrast-[1.08] brightness-[0.92] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-brand-dark/80 backdrop-blur-md border border-white/10 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-brand-volt font-bold block uppercase">
                    AUTHENTIC TRAINING FLOOR
                  </span>
                  <span className="font-bold text-white uppercase">
                    Commercial Free Weights & Platforms
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-brand-text-muted">
                  YEMMIGANUR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
