import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Sparkles, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { SITE_CONTENT, type MembershipPlan } from '../../data/siteContent';

export interface MembershipSectionProps {
  onSelectPlan?: (planName: string) => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onSelectPlan }) => {
  const plans = SITE_CONTENT.membership;
  const [activeDuration, setActiveDuration] = useState<'all' | 'monthly' | 'quarterly' | 'annual'>('all');

  const filteredPlans =
    activeDuration === 'all'
      ? plans
      : plans.filter((p) => p.durationKey === activeDuration);

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
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-brand-volt/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Admissions & Tiers
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              CHOOSE YOUR{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-emerald-400">
                COMMITMENT.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
              We respect your dedication. Whether you commit month-to-month or build a year-long transformation, our floor coaches deliver the same relentless guidance and spotter vigilance.
            </p>
          </div>

          {/* Duration Filter Switcher */}
          <div className="inline-flex p-1.5 rounded-xl bg-brand-surface border border-brand-border/80 self-start lg:self-end">
            <button
              onClick={() => setActiveDuration('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                activeDuration === 'all'
                  ? 'bg-brand-volt text-brand-dark shadow-sm'
                  : 'text-brand-text-secondary hover:text-white'
              }`}
            >
              All Tiers
            </button>
            <button
              onClick={() => setActiveDuration('monthly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                activeDuration === 'monthly'
                  ? 'bg-brand-volt text-brand-dark shadow-sm'
                  : 'text-brand-text-secondary hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveDuration('quarterly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                activeDuration === 'quarterly'
                  ? 'bg-brand-volt text-brand-dark shadow-sm'
                  : 'text-brand-text-secondary hover:text-white'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setActiveDuration('annual')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                activeDuration === 'annual'
                  ? 'bg-brand-volt text-brand-dark shadow-sm'
                  : 'text-brand-text-secondary hover:text-white'
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {filteredPlans.map((plan: MembershipPlan, index: number) => {
            const isFeatured = plan.durationKey === 'quarterly';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                  isFeatured
                    ? 'bg-brand-surface border-2 border-brand-volt/80 shadow-glow-volt/20 shadow-xl'
                    : 'bg-brand-surface/70 border border-brand-border/80 hover:border-brand-border hover:bg-brand-surface'
                }`}
              >
                {/* Highlight Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-volt text-brand-dark font-mono text-[10px] font-black tracking-widest uppercase shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Duration Label */}
                  <div className="flex items-center justify-between text-xs font-mono text-brand-text-muted uppercase mb-3">
                    <span>{plan.billingCycle}</span>
                    <span className="text-brand-volt">UNISEX ACCESS</span>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-4">
                    {plan.tierName}
                  </h3>

                  {/* Honest Price State Banner */}
                  <div className="p-4 rounded-xl bg-brand-dark/80 border border-brand-border/60 mb-6">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-brand-text-muted">
                      Admission Rate
                    </div>
                    <div className="text-sm font-bold text-brand-volt mt-0.5 font-mono">
                      {plan.priceNote.value}
                    </div>
                    <div className="text-[10px] text-brand-text-muted mt-1 leading-snug">
                      Shift schedules & batch concessions confirmed directly at the desk.
                    </div>
                  </div>

                  {/* Inclusions Feature List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono uppercase tracking-widest text-brand-text-muted">
                      Plan Inclusions
                    </div>
                    {plan.features.map((feat: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text-primary">
                        <Check className="w-4 h-4 text-brand-volt shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action CTA */}
                <div className="pt-4 border-t border-brand-border/50">
                  <button
                    onClick={() => handlePlanClick(plan.tierName)}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'bg-brand-volt text-brand-dark hover:bg-white hover:shadow-glow-volt'
                        : 'bg-brand-charcoal border border-brand-border text-white hover:border-brand-volt hover:text-brand-volt'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Content Truth Guarantee Footer */}
        <div className="mt-12 p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-text-muted">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>NO HIDDEN RENEWAL SURCHARGES • DIRECT DESK TRANSPARENCY</span>
          </div>
          <a
            href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
            className="text-brand-volt hover:underline"
          >
            Direct Inquiry: {SITE_CONTENT.brand.contact.phoneDisplay.value}
          </a>
        </div>
      </div>
    </section>
  );
};
