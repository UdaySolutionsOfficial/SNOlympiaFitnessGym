import React from 'react';
import { Check, Shield, Sparkles, ArrowRight, Flame, Clock, Award } from 'lucide-react';
import { SITE_CONTENT, type MembershipPlan } from '../../data/siteContent';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export interface MembershipSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onSelectPlan }) => {
  const plans = SITE_CONTENT.membership;

  const handlePlanClick = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    } else {
      window.location.href = `tel:${SITE_CONTENT.brand.contact.phone.value}`;
    }
  };

  return (
    <section id="membership" className="relative py-28 md:py-36 bg-brand-surface/30 overflow-hidden border-t border-brand-border/60">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-volt/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Clean: No filter pills as requested) */}
        <ScrollReveal direction="up" delay={0.05} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Admissions & Membership Tiers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
            CHOOSE YOUR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt via-amber-400 to-amber-300">
              COMMITMENT.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
            We respect your dedication. Whether you start month-to-month, build for half a year, or commit to a year-long athletic transformation, our floor coaches deliver the same relentless guidance and spotter vigilance.
          </p>
        </ScrollReveal>

        {/* 3 Tier Cards Grid: 1 Month (Left), 12 Months Recommended (Center), 6 Months (Right) */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4 sm:pt-6">
          {plans.map((plan: MembershipPlan) => {
            const isFeatured = plan.durationKey === 'annual';

            return (
              <StaggerItem
                key={plan.id}
                className={`relative flex flex-col justify-between ${
                  isFeatured ? 'md:-translate-y-4 lg:-translate-y-5 z-20' : 'z-10'
                }`}
              >
                {/* Outer Looping Glowing Edge Border Shell */}
                <div
                  className={`group/card relative w-full h-full rounded-3xl p-[2px] overflow-hidden transition-all duration-500 flex flex-col justify-between ${
                    isFeatured
                      ? 'shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_55px_rgba(255,94,30,0.4)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.98),0_0_75px_rgba(255,94,30,0.65)] hover:-translate-y-2'
                      : 'shadow-[0_15px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_45px_rgba(255,94,30,0.35)] hover:-translate-y-2'
                  }`}
                >
                  {/* Layer 1: Base Dark Edge Outline */}
                  <div
                    className={`absolute inset-0 rounded-3xl pointer-events-none transition-colors duration-500 ${
                      isFeatured ? 'bg-brand-volt/30' : 'bg-white/10 group-hover/card:bg-white/20'
                    }`}
                  />

                  {/* Layer 2: Dual Opposite-Sided Looping Border Beam (Moving & Glowing continuous rotation) */}
                  <div
                    className={`absolute inset-[-150%] pointer-events-none animate-border-beam transition-opacity duration-500 ${
                      isFeatured
                        ? 'opacity-100'
                        : 'opacity-30 group-hover/card:opacity-100'
                    }`}
                    style={{
                      background: `conic-gradient(
                        from 0deg at 50% 50%,
                        transparent 0deg,
                        transparent 55deg,
                        rgba(255, 94, 30, 0.45) 70deg,
                        rgba(255, 160, 52, 0.95) 85deg,
                        #FFFFFF 90deg,
                        rgba(255, 160, 52, 0.95) 95deg,
                        rgba(255, 94, 30, 0.45) 110deg,
                        transparent 125deg,
                        transparent 235deg,
                        rgba(255, 94, 30, 0.45) 250deg,
                        rgba(255, 160, 52, 0.95) 265deg,
                        #FFFFFF 270deg,
                        rgba(255, 160, 52, 0.95) 275deg,
                        rgba(255, 94, 30, 0.45) 290deg,
                        transparent 305deg,
                        transparent 360deg
                      )`,
                    }}
                  />

                  {/* Ambient Soft Neon Glow on Hover behind the card */}
                  <div
                    className={`absolute -inset-2 rounded-3xl bg-brand-volt/20 blur-xl pointer-events-none transition-opacity duration-500 ${
                      isFeatured ? 'opacity-80' : 'opacity-0 group-hover/card:opacity-70'
                    }`}
                  />

                  {/* Layer 3: Inner Glassmorphic Surface of the Card */}
                  <div
                    className={`relative w-full h-full rounded-[calc(1.5rem-2px)] p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-colors duration-300 ${
                      isFeatured
                        ? 'bg-gradient-to-b from-[#141822] via-[#0C0E14] to-[#08090C]'
                        : 'bg-[#0C0E12] group-hover/card:bg-[#10131A]'
                    }`}
                  >
                    {/* Top Radial Flare on hover */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-brand-volt/10 rounded-full blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      {/* Integrated In-Card Recommendation Pill - Seamless architectural part of card */}
                      {isFeatured && (
                        <div className="flex justify-center -mt-1 sm:-mt-2 mb-5">
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-volt/15 via-brand-volt/25 to-brand-volt/15 border border-brand-volt/40 text-brand-volt font-mono text-[11px] sm:text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(255,94,30,0.3)] backdrop-blur-md">
                            <Flame className="w-3.5 h-3.5 fill-brand-volt text-brand-volt animate-pulse" />
                            <span>RECOMMENDED • BEST VALUE</span>
                          </div>
                        </div>
                      )}

                      {/* Duration & Access Badge */}
                      <div className="flex items-center justify-between text-xs font-mono mb-3">
                        <span className="text-brand-text-muted uppercase font-bold tracking-wider">
                          {isFeatured ? 'Annual Pass (12 Mo)' : plan.billingCycle}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-volt px-2 py-0.5 rounded bg-brand-volt/10 border border-brand-volt/20">
                          <Award className="w-3 h-3" />
                          UNISEX ACCESS
                        </span>
                      </div>

                      {/* Tier Name */}
                      <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-2 group-hover/card:text-brand-volt transition-colors">
                        {plan.tierName}
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs text-brand-text-secondary leading-relaxed mb-6 font-light">
                        {plan.tagline}
                      </p>

                      {/* Prominent High-Contrast Pricing Display */}
                      <div className={`p-4 sm:p-5 rounded-2xl mb-6 border transition-all ${
                        isFeatured
                          ? 'bg-gradient-to-br from-brand-surface/90 to-brand-volt/10 border-brand-volt/50 shadow-[0_0_30px_rgba(255,94,30,0.15)]'
                          : 'bg-brand-dark/90 border-brand-border/70 group-hover/card:border-brand-border'
                      }`}>
                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                              {plan.price}
                            </span>
                            <span className="text-base sm:text-lg font-bold text-brand-volt font-mono">
                              /-
                            </span>
                          </div>
                          {plan.savings && (
                            <span className="px-2.5 py-1 rounded-md bg-brand-volt/20 border border-brand-volt/40 text-brand-volt text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider animate-pulse">
                              {plan.savings}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px] font-mono text-brand-text-muted">
                          <span className="uppercase tracking-wider">{plan.billingCycle}</span>
                          <span className="text-brand-text-secondary">{plan.breakdown}</span>
                        </div>
                      </div>

                      {/* Plan Inclusions Checklist */}
                      <div className="space-y-3 mb-8">
                        <div className="text-[11px] font-mono uppercase tracking-widest text-brand-text-muted font-bold">
                          Included In Discipline
                        </div>
                        {plan.features.map((feat: string, fIdx: number) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text-primary">
                            <div className="w-4 h-4 rounded-full bg-brand-volt/15 border border-brand-volt/40 flex items-center justify-center shrink-0 mt-0.5 group-hover/card:bg-brand-volt/25 transition-colors">
                              <Check className="w-2.5 h-2.5 text-brand-volt stroke-[3]" />
                            </div>
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Action CTA Button */}
                    <div className="pt-4 border-t border-brand-border/50">
                      <button
                        onClick={() => handlePlanClick(plan.tierName)}
                        className={`w-full py-4 px-5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                          isFeatured
                            ? 'bg-gradient-to-r from-amber-400 via-[#FF7538] to-[#FF5E1E] text-brand-dark shadow-[0_0_25px_rgba(255,94,30,0.7)] hover:shadow-[0_0_40px_rgba(255,94,30,1)] hover:scale-[1.02] active:scale-95'
                            : 'bg-brand-surface border border-white/15 text-white hover:border-brand-volt hover:text-brand-volt hover:bg-brand-surface-hover hover:scale-[1.02] active:scale-95'
                        }`}
                      >
                        <span>{plan.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Content Truth Guarantee Footer Bar - Sleek capsule matching reference image */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="mt-12 sm:mt-16 px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0C0E14]/80 border border-brand-border/70 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-brand-text-muted shadow-lg">
            <div className="flex items-center gap-2.5 text-brand-text-secondary">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="tracking-wide">
                100% DIRECT DESK TRANSPARENCY • NO HIDDEN RENEWAL SURCHARGES
              </span>
            </div>
            <a
              href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
              className="inline-flex items-center gap-1.5 text-brand-volt hover:text-amber-300 font-bold transition-colors group/inq"
            >
              <span>Direct Inquiry: {SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/inq:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
