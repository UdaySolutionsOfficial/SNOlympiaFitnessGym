import React from 'react';
import { SpotlightCard } from '../cards/SpotlightCard';
import { StatusBadge } from '../common/StatusBadge';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';
import { Dumbbell, ShieldCheck, Users, Clock, Award, Sparkles } from 'lucide-react';

export interface WhyOlympiaSectionProps {
  className?: string;
}

/**
 * Why Olympia Section
 * Asymmetric editorial Bento Grid featuring interactive Spotlight & Depth Card interactions.
 * Strictly communicates verified differentiators: Unisex facility, coaching attention, heavy iron.
 */
export const WhyOlympiaSection: React.FC<WhyOlympiaSectionProps> = ({ className }) => {
  return (
    <section
      id="benefits"
      className={`relative py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-brand-border overflow-hidden ${className}`}
    >
      <div className="relative z-10 space-y-12">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-brand-volt uppercase">
                // 02. WHY SN OLYMPIA
              </span>
              <StatusBadge status="VERIFIED" label="Gym Advantages" />
            </div>
            <h2 className="text-fluid-section font-black uppercase text-white tracking-tighter leading-none">
              THE UNCOMPROMISING ADVANTAGE
            </h2>
          </div>
          <p className="text-xs md:text-sm text-brand-text-secondary max-w-md">
            Engineered from the ground up for serious physical adaptation. Discover why athletes and beginners alike trust SN Olympia in Yemmiganur.
          </p>
        </ScrollReveal>

        {/* Asymmetrical Bento Grid with Staggered Fluid Reveal */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Dominant Feature (Span 7) - Heavy Free Weights & Platforms */}
          <StaggerItem className="md:col-span-7 flex">
            <SpotlightCard className="w-full flex flex-col justify-between p-8 bg-brand-surface/80 border-brand-border/80 hover:border-brand-volt/40 min-h-[320px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-brand-volt uppercase font-bold">
                  HEAVY STEEL & CALIBRATED LOADS
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-3">
                Uncompromising Free Weight Arena
              </h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed max-w-lg">
                Full run of commercial-grade dumbbells, Olympic power cages, and dedicated deadlift platforms with shock-absorbent flooring. No waiting around for flimsy plastic machines; we provide authentic cast iron and precision knurling for true progressive overload.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-brand-border/40 flex flex-wrap items-center gap-4 text-xs font-mono text-brand-text-muted">
              <span>✓ Calibrated Bumper Plates</span>
              <span>✓ Solid Steel Power Cages</span>
              <span>✓ High-Density Rubber Mats</span>
            </div>
          </SpotlightCard>
        </StaggerItem>

        {/* Card 2: 100% Unisex Inclusive Culture (Span 5) */}
        <StaggerItem className="md:col-span-5 flex">
          <SpotlightCard className="w-full flex flex-col justify-between p-8 bg-brand-surface/80 border-brand-border/80 hover:border-brand-volt/40 min-h-[320px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-brand-volt uppercase font-bold">
                  RESPECT & DIGNITY
                </span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-3">
                100% Unisex Facility
              </h3>
              <p className="text-sm text-brand-text-secondary leading-relaxed">
                A focused, safe, and motivating training ground open to both men and women. We foster a culture of mutual respect, zero intimidation, and shared dedication to strength and health.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-brand-border/40 flex items-center gap-2 text-xs text-brand-text-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified Safe & Welcoming Space in Yemmiganur</span>
            </div>
          </SpotlightCard>
        </StaggerItem>

        {/* Card 3: Form Correction & Floor Guidance (Span 5) */}
        <StaggerItem className="md:col-span-5 flex">
          <SpotlightCard className="w-full flex flex-col justify-between p-8 bg-brand-surface/80 border-brand-border/80 hover:border-brand-volt/40 min-h-[280px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-brand-volt uppercase font-bold">
                  COACHING ATTENTION
                </span>
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-tight mb-2">
                Biomechanical Form Audits
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                You never lift alone in confusion. Our floor coaches actively watch movement mechanics, knee-elbow alignment, and bar velocity to protect your joints and accelerate muscle gains.
              </p>
            </div>

            <div className="pt-4 border-t border-brand-border/40 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>★ 4.9★ Google Reputation (126+ Reviews)</span>
            </div>
          </SpotlightCard>
        </StaggerItem>

        {/* Card 4: Structured Batches & Location Convenience (Span 7) */}
        <StaggerItem className="md:col-span-7 flex">
          <SpotlightCard className="w-full flex flex-col justify-between p-8 bg-brand-surface/80 border-brand-border/80 hover:border-brand-volt/40 min-h-[280px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-brand-volt uppercase font-bold">
                  MORNING & EVENING
                </span>
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-tight mb-2">
                Convenient Shift Batches
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                Whether you train before the workday at 5:30 AM or hit the iron after hours in the evening, our batches fit your life. Prime location in Timmappa Colony with easy access and dedicated bike/vehicle parking.
              </p>
            </div>

            <div className="pt-4 border-t border-brand-border/40 flex flex-wrap items-center justify-between gap-2 text-xs text-brand-text-muted">
              <span>Shiva Priya Theater Area, Yemmiganur</span>
              <span className="text-brand-volt font-bold font-mono">DIRECT ACCESS</span>
            </div>
          </SpotlightCard>
        </StaggerItem>
      </StaggerContainer>
    </div>
  </section>
  );
};
