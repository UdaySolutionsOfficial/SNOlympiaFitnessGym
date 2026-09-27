import React, { useState } from 'react';
import { SITE_CONTENT, type ProgramItem } from '../../data/siteContent';
import { ASSET_MANIFEST } from '../../data/assets';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';
import { Dumbbell, ArrowRight, Flame, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

export interface ProgramsSectionProps {
  className?: string;
  onInquireBatch?: (programId: string) => void;
}

/**
 * Interactive Programs Section
 * Desktop: Interactive program switcher with directional image reveals and focus points.
 * Mobile: Clean, touch-friendly stacked cards that never trap scroll velocity.
 */
export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  className,
  onInquireBatch,
}) => {
  const [activeId, setActiveId] = useState<string>('hypertrophy-strength');

  const programImages: Record<string, string> = {
    'hypertrophy-strength': ASSET_MANIFEST.programs.strength.path,
    'functional-conditioning': ASSET_MANIFEST.programs.conditioning.path,
    'personal-coaching': ASSET_MANIFEST.programs.coaching.path,
    'women-fitness': ASSET_MANIFEST.programs.womens.path,
  };

  const activeProgram =
    SITE_CONTENT.programs.find((p) => p.id === activeId) || SITE_CONTENT.programs[0];

  const handleInquire = (program: ProgramItem) => {
    if (onInquireBatch) {
      onInquireBatch(program.id);
    } else {
      window.location.href = `tel:${SITE_CONTENT.brand.contact.phone.value}`;
    }
  };

  return (
    <section
      id="programs"
      className={`relative py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-brand-border overflow-hidden ${className}`}
    >
      <div className="relative z-10 space-y-12">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-brand-volt uppercase">
                // 03. TRAINING DISCIPLINES
              </span>
              <StatusBadge status="VERIFIED" label="Active Batches" />
            </div>
            <h2 className="text-fluid-section font-black uppercase text-white tracking-tighter leading-none">
              TRAIN WITH PURPOSE
            </h2>
          </div>
          <p className="text-xs md:text-sm text-brand-text-secondary max-w-md">
            Four systematically periodized training categories designed to develop raw compound power, functional stamina, and sustainable body composition.
          </p>
        </ScrollReveal>

        {/* Desktop Interactive Storytelling Showcase (>= 1024px) */}
        <ScrollReveal direction="up" delay={0.12} duration={0.8} className="hidden lg:grid grid-cols-12 gap-8 items-center bg-brand-surface/50 border border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          {/* Left Column: Program Navigation Tabs (Span 5) */}
          <div className="col-span-5 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-brand-text-muted uppercase font-bold block mb-2">
              SELECT TRAINING DISCIPLINE
            </span>

            <div className="space-y-2.5">
              {SITE_CONTENT.programs.map((program, idx) => {
                const isActive = program.id === activeId;
                return (
                  <button
                    key={program.id}
                    onClick={() => setActiveId(program.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      isActive
                        ? 'bg-brand-surface border-brand-volt/50 shadow-glow-volt translate-x-1.5'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive ? 'text-brand-volt' : 'text-brand-text-muted'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          className={`text-sm font-black uppercase tracking-tight transition-colors ${
                            isActive ? 'text-white' : 'text-brand-text-secondary group-hover:text-white'
                          }`}
                        >
                          {program.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-brand-text-muted font-medium block mt-1 ml-6">
                        {program.category}
                      </span>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isActive
                          ? 'text-brand-volt translate-x-1'
                          : 'text-brand-text-muted opacity-40 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Program Cinematic Card (Span 7) */}
          <div className="col-span-7 relative flex flex-col justify-between rounded-2xl overflow-hidden bg-brand-surface border border-white/10 shadow-card-depth min-h-[500px]">
            {/* Background Image with Cinematic Vignette */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={programImages[activeProgram.id]}
                alt={activeProgram.title}
                key={activeProgram.id}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.95] animate-fadeIn"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/40 to-transparent" />

              <div className="absolute top-4 left-4">
                <StatusBadge status={activeProgram.verification.status} label="Verified Core Program" />
              </div>
            </div>

            {/* Content Details */}
            <div className="p-8 space-y-5">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-volt uppercase block mb-1">
                  {activeProgram.category}
                </span>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  {activeProgram.headline}
                </h3>
                <p className="text-sm text-brand-text-secondary leading-relaxed mt-2">
                  {activeProgram.description}
                </p>
              </div>

              {/* Focus Points */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[10px] font-mono tracking-widest text-brand-text-muted uppercase font-bold block">
                  KEY ADAPTATION TARGETS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeProgram.focusAreas.map((focus, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-2 text-xs text-brand-text-primary"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-volt shrink-0" />
                      <span className="font-semibold text-[11px]">{focus}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => handleInquire(activeProgram)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  INQUIRE {activeProgram.title.toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile & Tablet Stacked Presentation (< 1024px) */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
          {SITE_CONTENT.programs.map((program, idx) => (
            <StaggerItem
              key={program.id}
              className="rounded-2xl overflow-hidden bg-brand-surface/90 border border-white/10 flex flex-col justify-between shadow-card-depth"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <img
                  src={programImages[program.id]}
                  alt={program.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-dark/80 text-brand-volt font-bold border border-white/10">
                    0{idx + 1}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-brand-volt font-bold block mb-1">
                    {program.category}
                  </span>
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-xs text-brand-text-secondary leading-relaxed mt-1.5">
                    {program.description}
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-brand-text-muted">
                  {program.focusAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-volt" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                    onClick={() => handleInquire(program)}
                  >
                    INQUIRE BATCH
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
