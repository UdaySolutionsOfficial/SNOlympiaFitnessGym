import React from 'react';
import { ArrowDown, Flame, Shield, Target } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';

export interface SectionTransitionProps {
  onExploreNext?: () => void;
  className?: string;
}

/**
 * First Section Transition Band
 * Bridges the Cinematic Hero into Phase 3 sections with high-impact kinetic typography.
 * Restrained, dark graphite foundation with bold athletic principles.
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({
  onExploreNext,
  className,
}) => {
  return (
    <section
      id="section-transition"
      className={`relative py-24 md:py-36 px-4 bg-brand-surface/40 border-y border-brand-border overflow-hidden ${className}`}
    >
      {/* Background Accent Beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-brand-volt/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Transparent Super-Typographic Background Watermark */}
      <div className="absolute top-[22%] md:top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[14vw] md:text-[12vw] font-black uppercase tracking-tighter text-white/[0.04] whitespace-nowrap leading-none block">
          NO SHORTCUTS
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Kinetic Statement Lockup */}
        <ScrollReveal direction="up" className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-white/10 text-xs font-mono font-bold tracking-widest text-brand-volt uppercase">
            <Flame className="w-3.5 h-3.5 text-brand-volt" />
            <span>THE OLYMPIA PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tighter leading-[1.05]">
            TRAIN WITH PURPOSE.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-white">
              BUILT FOR PROGRESS.
            </span>
          </h2>

          <p className="text-sm md:text-base text-brand-text-secondary max-w-2xl mx-auto leading-relaxed">
            We don’t believe in gimmicks, quick fixes, or half-hearted workouts. At SN Olympia Fitness, every barbell load, every conditioning interval, and every coach interaction is calibrated for measurable physical adaptation.
          </p>
        </ScrollReveal>

        {/* 3 Core Pillars Preview */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <StaggerItem>
            <div className="p-6 rounded-2xl bg-brand-surface/80 border border-white/5 space-y-3 hover:border-brand-volt/40 transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-tight">
                01. Progressive Overload
              </h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Structured compound barbell and dumbbell movements designed to progressively increase resistance and muscle density week over week.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 rounded-2xl bg-brand-surface/80 border border-white/5 space-y-3 hover:border-brand-volt/40 transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-tight">
                02. High-Capacity Cardio
              </h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Metabolic conditioning circuits that elevate cardiovascular threshold, incinerate visceral fat, and build athletic stamina.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 rounded-2xl bg-brand-surface/80 border border-white/5 space-y-3 hover:border-brand-volt/40 transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-tight">
                03. Biomechanical Safety
              </h3>
              <p className="text-xs text-brand-text-secondary leading-relaxed">
                Attentive floor coaches ensuring spine safety, joint alignment, and strict execution across all weight classes and experience levels.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Phase 3 Transition Indicator */}
        <ScrollReveal direction="up" delay={0.2} className="text-center pt-8">
          <button
            onClick={() => {
              if (onExploreNext) {
                onExploreNext();
              } else {
                const target = document.getElementById('programs');
                target?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-text-muted hover:text-brand-volt transition-colors group"
          >
            <span>DISCOVER TRAINING DISCIPLINES (PHASE 3)</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
};
