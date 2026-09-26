import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Target, TrendingUp, Cpu, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';

interface MethodStep {
  step: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  keyActions: string[];
  metrics: string[];
  icon: React.ElementType;
}

const METHOD_STEPS: MethodStep[] = [
  {
    step: 'STAGE 01',
    number: '01',
    title: 'ASSESS & ALIGN',
    tagline: 'Precision Baseline Diagnostic',
    description:
      'No athlete trains blind. Before loading a single barbell, we evaluate joint mobility, posterior chain recruitment, bilateral imbalances, and foundational work capacity.',
    keyActions: [
      'Comprehensive movement & joint range screening',
      'Postural alignment & bilateral symmetry audit',
      'Aerobic base & resting cardiovascular assessment',
      'Realistic goal setting & timeline formulation'
    ],
    metrics: ['Mobility Score', 'Bilateral Symmetry', 'Base Aerobic Capacity'],
    icon: Target
  },
  {
    step: 'STAGE 02',
    number: '02',
    title: 'STRUCTURE & LOAD',
    tagline: 'Biomechanical Foundations & Progressive Overload',
    description:
      'We establish flawless motor patterns across the primary compound lifts (Squat, Hinge, Press, Pull). Once mechanics are unshakeable, load is methodically increased.',
    keyActions: [
      'Mastery of barbell mechanics and spine bracing',
      'Strict repetition cadence and eccentric control',
      'Micro-loading progressive resistance model',
      'Structural connective tissue adaptation'
    ],
    metrics: ['Form Fidelity', 'Bar Speed Consistency', 'Load Volume (kg)'],
    icon: ShieldCheck
  },
  {
    step: 'STAGE 03',
    number: '03',
    title: 'INTENSIFY & ADAPT',
    tagline: 'Metabolic Density & Muscle Hypertrophy',
    description:
      'Transitioning raw strength into dense muscular conditioning. We manipulate training density, rest intervals, and metabolic stress while safeguarding joint integrity.',
    keyActions: [
      'Periodized wave loading & drop-set density',
      'Functional conditioning and anaerobic threshold work',
      'Targeted hypertrophy assistance accessory circuits',
      'Dynamic neuromuscular recovery protocols'
    ],
    metrics: ['Work Density (J/min)', 'Recovery Heart Rate', 'Muscle Fullness'],
    icon: TrendingUp
  },
  {
    step: 'STAGE 04',
    number: '04',
    title: 'MEASURE & SCALE',
    tagline: 'Objective Data & Ongoing Evolution',
    description:
      'Continuous evolution requires objective tracking. Every cycle concludes with quantitative re-testing to adjust volume, nutrition guidelines, and advance toward the next ceiling.',
    keyActions: [
      'Bi-weekly body composition & circumferences audit',
      'Compound 1RM / 3RM estimated strength benchmarks',
      'Macro & micronutrient adjustment consultations',
      'Next mesocycle programming calibration'
    ],
    metrics: ['Body Composition Delta', '1RM Progression', 'Systemic Fatigue Index'],
    icon: Cpu
  }
];

export const MethodologySection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = METHOD_STEPS[activeStepIndex];

  return (
    <section id="methodology" className="relative py-28 md:py-36 bg-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Background ambient grid & glow */}
      <div className="absolute inset-0 bg-radial-gradient-to-tr from-brand-charcoal/40 via-brand-dark to-brand-dark opacity-80 pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-brand-volt/5 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-volt animate-pulse" />
            The Olympia Framework
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
            ENGINEERED PROGRESSION.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-amber-400">
              NOT GUESSWORK.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
            Real physical transformation is not accidental. We employ an evidence-based, four-stage progressive protocol designed to systematically turn effort into measurable athletic capacity.
          </p>
        </ScrollReveal>

        {/* Interactive Step Timeline Controls with Staggered Cascading Reveal */}
        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {METHOD_STEPS.map((step, index) => {
            const isActive = activeStepIndex === index;
            const Icon = step.icon;

            return (
              <StaggerItem key={step.number}>
                <button
                  onClick={() => setActiveStepIndex(index)}
                  className={`w-full relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? 'bg-brand-surface border-brand-volt/80 shadow-glow-volt/30 shadow-lg'
                      : 'bg-brand-surface/40 border-brand-border/70 hover:border-brand-border hover:bg-brand-surface/80'
                  }`}
                >
                {/* Active Top Glow Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeMethodTab"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-volt to-amber-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold tracking-widest ${
                    isActive ? 'text-brand-volt' : 'text-brand-text-muted group-hover:text-brand-text-secondary'
                  }`}>
                    {step.step}
                  </span>
                  <Icon className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-brand-volt' : 'text-brand-text-muted group-hover:text-brand-text-secondary'
                  }`} />
                </div>

                <div className="text-base sm:text-lg font-black uppercase tracking-tight text-white line-clamp-1">
                  {step.title}
                </div>
                <div className="text-xs text-brand-text-muted mt-1 truncate">
                  {step.tagline}
                </div>
              </button>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

        {/* Detailed Stage Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-brand-surface via-brand-surface/90 to-brand-charcoal/40 border border-brand-border/80 shadow-2xl relative overflow-hidden"
          >
            {/* Stage background watermark number */}
            <div className="absolute -right-6 -bottom-10 text-[160px] sm:text-[220px] font-black text-white/[0.02] select-none pointer-events-none font-mono">
              {activeStep.number}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
              {/* Left Column: Stage Overview */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-brand-volt/10 border border-brand-volt/30 text-brand-volt font-mono text-xs font-bold">
                    PHASE {activeStep.number}
                  </span>
                  <span className="text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                    Olympia Performance Standard
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight">
                  {activeStep.title}:{' '}
                  <span className="text-brand-volt">{activeStep.tagline}</span>
                </h3>

                <p className="text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
                  {activeStep.description}
                </p>

                {/* Key Execution Actions */}
                <div className="pt-2">
                  <h4 className="text-xs font-mono font-bold tracking-widest text-brand-volt uppercase mb-4">
                    Core Floor Protocols
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeStep.keyActions.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-text-primary">
                        <CheckCircle2 className="w-4 h-4 text-brand-volt shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Quantitative Metrics & Next Transition */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-brand-dark/70 border border-brand-border/60">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-brand-text-muted mb-4">
                    Audited Metrics & KPIs
                  </div>
                  <div className="space-y-3">
                    {activeStep.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-brand-surface/60 border border-brand-border/50 text-xs sm:text-sm"
                      >
                        <span className="text-brand-text-primary font-medium">{metric}</span>
                        <span className="font-mono text-xs text-brand-volt bg-brand-volt/10 px-2 py-0.5 rounded">
                          TRACKED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-brand-border/50 flex items-center justify-between">
                  <div className="text-xs text-brand-text-muted font-mono">
                    STAGE {activeStep.number} OF 04
                  </div>
                  <button
                    onClick={() => setActiveStepIndex((prev) => (prev + 1) % METHOD_STEPS.length)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-brand-volt hover:text-white transition-colors"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
