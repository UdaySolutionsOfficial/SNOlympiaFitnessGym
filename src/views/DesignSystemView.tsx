import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { SpotlightCard } from '../components/cards/SpotlightCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { PlateViewer } from '../components/3d/PlateViewer';
import { ArrowRight, CheckCircle2, Phone, Sparkles, ShieldAlert, Award, Dumbbell } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';

export const DesignSystemView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'typography' | 'buttons' | 'cards' | 'truth' | '3d'>('tokens');

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text-primary px-4 py-12 md:py-20 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="mb-12 border-b border-brand-border pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-brand-volt shadow-glow-volt animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              OLYMPIA FITNESS — DESIGN SYSTEM PREVIEW
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status="VERIFIED" label="Phase 1 Foundation" />
            <span className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-brand-text-muted font-mono">
              v1.0.0
            </span>
          </div>
        </div>
        <p className="text-sm md:text-base text-brand-text-secondary max-w-3xl">
          Visual Quality Control (QC) and living token verification dashboard for the SN Olympia Fitness digital platform. Validates typography clamps, color tokens, button ergonomics, card lighting, and the Content Truth System before section assembly.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-8">
          {[
            { id: 'tokens', label: '1. Color & Surfaces' },
            { id: 'typography', label: '2. Fluid Typography' },
            { id: 'buttons', label: '3. Athletic Buttons' },
            { id: 'cards', label: '4. Cards & Bento' },
            { id: 'truth', label: '5. Content Truth System' },
            { id: '3d', label: '6. 3D Engine Preview' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-volt text-brand-dark shadow-glow-volt'
                  : 'bg-brand-surface border border-white/5 text-brand-text-secondary hover:text-white hover:bg-brand-surface-hover'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. TOKENS & SURFACES */}
      {activeTab === 'tokens' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="text-brand-volt">01.</span> Color Tokens & Surface Hierarchy
            </h2>
            <p className="text-xs text-brand-text-muted mb-6">
              Near-black obsidian base elevated by subtle graphite layers and high-visibility athletic volt accents.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-xl bg-[#08090A] border border-white/10 flex flex-col justify-between h-32">
                <span className="text-xs font-mono text-brand-text-muted">#08090A</span>
                <div>
                  <span className="block text-xs font-bold text-white uppercase">Canvas Base</span>
                  <span className="text-[10px] text-brand-text-muted">--color-bg-base</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1114] border border-white/10 flex flex-col justify-between h-32">
                <span className="text-xs font-mono text-brand-text-muted">#0E1114</span>
                <div>
                  <span className="block text-xs font-bold text-white uppercase">Secondary BG</span>
                  <span className="text-[10px] text-brand-text-muted">--color-bg-secondary</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#15191E] border border-white/10 flex flex-col justify-between h-32">
                <span className="text-xs font-mono text-brand-text-muted">#15191E</span>
                <div>
                  <span className="block text-xs font-bold text-white uppercase">Surface Card</span>
                  <span className="text-[10px] text-brand-text-muted">--color-surface-card</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1C2229] border border-white/10 flex flex-col justify-between h-32">
                <span className="text-xs font-mono text-brand-text-muted">#1C2229</span>
                <div>
                  <span className="block text-xs font-bold text-white uppercase">Surface Hover</span>
                  <span className="text-[10px] text-brand-text-muted">--color-surface-hover</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-volt text-brand-dark border border-brand-volt flex flex-col justify-between h-32 shadow-glow-volt">
                <span className="text-xs font-mono font-bold">#CCFF00</span>
                <div>
                  <span className="block text-xs font-black uppercase">Athletic Volt</span>
                  <span className="text-[10px] font-semibold opacity-80">--color-accent-primary</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#00E599] text-brand-dark border border-[#00E599] flex flex-col justify-between h-32">
                <span className="text-xs font-mono font-bold">#00E599</span>
                <div>
                  <span className="block text-xs font-black uppercase">Verified Emerald</span>
                  <span className="text-[10px] font-semibold opacity-80">--color-status-verified</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-text-muted mb-4">
              Glassmorphic Surfaces & Border Treatments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl">
                <span className="text-xs uppercase tracking-widest text-brand-volt font-bold block mb-2">
                  Glass Card Layer
                </span>
                <p className="text-xs text-brand-text-secondary leading-relaxed">
                  Blur radius: 16px. Border: 1px rgba(255,255,255,0.08). Used across modal sheets and floating control panels.
                </p>
              </div>

              <div className="glass-pill p-6 rounded-2xl">
                <span className="text-xs uppercase tracking-widest text-white font-bold block mb-2">
                  Frosted Dock Pill
                </span>
                <p className="text-xs text-brand-text-secondary leading-relaxed">
                  Blur radius: 20px with elevated dark opacity (0.75). Pinned navigation and badge controls.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-volt/40 shadow-glow-volt">
                <span className="text-xs uppercase tracking-widest text-brand-volt font-bold block mb-2">
                  Active Volt Edge
                </span>
                <p className="text-xs text-brand-text-secondary leading-relaxed">
                  Accent glow border with subtle drop shadow for active tier selection and focused interactive items.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. TYPOGRAPHY */}
      {activeTab === 'typography' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="text-brand-volt">02.</span> Fluid Clamp Typography Hierarchy
            </h2>
            <p className="text-xs text-brand-text-muted mb-6">
              Scales responsively between 360px and 1920px viewports without breaking lines or clipping containers.
            </p>

            <div className="space-y-8 bg-brand-surface/40 p-6 md:p-8 rounded-2xl border border-brand-border">
              <div className="border-b border-brand-border pb-6">
                <span className="text-[10px] font-mono uppercase text-brand-volt block mb-1">
                  Display 01 — Hero Headline (`--font-display-hero`)
                </span>
                <div className="text-fluid-hero font-black uppercase text-white tracking-tighter">
                  DISCIPLINE IS THE ONLY SHORTCUT
                </div>
              </div>

              <div className="border-b border-brand-border pb-6">
                <span className="text-[10px] font-mono uppercase text-brand-volt block mb-1">
                  Display 02 — Section Title (`--font-display-section`)
                </span>
                <div className="text-fluid-section font-extrabold uppercase text-brand-text-primary tracking-tight">
                  FORGED IN SWEAT & HEAVY IRON
                </div>
              </div>

              <div className="border-b border-brand-border pb-6">
                <span className="text-[10px] font-mono uppercase text-brand-volt block mb-1">
                  Heading 01 — Feature / Program (`--font-heading-lg`)
                </span>
                <div className="text-fluid-heading font-bold text-white">
                  HYPERTROPHY & COMPOUND STRENGTH BATCHES
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-brand-volt block mb-1">
                  Body Lead Paragraph (`--font-body-lead`)
                </span>
                <p className="text-sm md:text-base text-brand-text-secondary max-w-2xl leading-relaxed">
                  SN Olympia Fitness provides high-performance coaching, progressive barbell overload, and dedicated batch support in Yemmiganur. Every workout is structured with intention, bio-mechanical precision, and zero wasted motion.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. BUTTONS */}
      {activeTab === 'buttons' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="text-brand-volt">03.</span> Reusable Button System
            </h2>
            <p className="text-xs text-brand-text-muted mb-6">
              Ergonomic, accessible, and tactile buttons with optional magnetic pointer pull and active states.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary Variants */}
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                  Primary Action (JOIN NOW)
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg" variant="primary" magnetic rightIcon={<ArrowRight className="w-4 h-4" />}>
                    JOIN NOW (LG)
                  </Button>
                  <Button size="md" variant="primary" magnetic rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    JOIN NOW (MD)
                  </Button>
                  <Button size="sm" variant="primary">
                    JOIN (SM)
                  </Button>
                </div>
                <p className="text-[11px] text-brand-text-muted">
                  Includes volt illumination shadow, uppercase heavy tracking, and magnetic pull on desktop cursor.
                </p>
              </div>

              {/* Secondary & Glass */}
              <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                  Secondary & Translucent Glass
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg" variant="secondary" leftIcon={<Dumbbell className="w-4 h-4" />}>
                    EXPLORE GYM
                  </Button>
                  <Button size="md" variant="glass" leftIcon={<Phone className="w-3.5 h-3.5 text-brand-volt" />}>
                    CONTACT COACH
                  </Button>
                  <Button size="md" variant="tertiary" rightIcon={<ArrowRight className="w-3 h-3" />}>
                    LEARN MORE
                  </Button>
                </div>
                <p className="text-[11px] text-brand-text-muted">
                  Secondary states maintain visual hierarchy without competing with primary conversion triggers.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. CARDS & BENTO */}
      {activeTab === 'cards' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="text-brand-volt">04.</span> Interactive Spotlight & Bento Grid
            </h2>
            <p className="text-xs text-brand-text-muted mb-6">
              Move your mouse across the cards to observe dynamic radial illumination tracking your pointer position.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SpotlightCard className="flex flex-col justify-between h-72">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-volt uppercase tracking-wider">PROGRAM 01</span>
                    <StatusBadge status="VERIFIED" label="Core" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase mb-2">Hypertrophy & Heavy Iron</h3>
                  <p className="text-xs text-brand-text-secondary leading-relaxed">
                    Systematic barbell and dumbbell progressive overload routines engineered to optimize strength and muscle thickness.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-brand-text-muted uppercase">Morning & Evening</span>
                  <Button size="sm" variant="tertiary" rightIcon={<ArrowRight className="w-3 h-3" />}>
                    Details
                  </Button>
                </div>
              </SpotlightCard>

              <SpotlightCard className="flex flex-col justify-between h-72">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-volt uppercase tracking-wider">PROGRAM 02</span>
                    <StatusBadge status="VERIFIED" label="Unisex" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase mb-2">Cardio & Conditioning</h3>
                  <p className="text-xs text-brand-text-secondary leading-relaxed">
                    Metabolic conditioning circuits designed to elevate stamina, shred body fat, and build cardiovascular endurance.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-brand-text-muted uppercase">Daily Batches</span>
                  <Button size="sm" variant="tertiary" rightIcon={<ArrowRight className="w-3 h-3" />}>
                    Details
                  </Button>
                </div>
              </SpotlightCard>

              <SpotlightCard className="flex flex-col justify-between h-72 border-brand-volt/40">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-volt uppercase tracking-wider">MEMBERSHIP TIER</span>
                    <StatusBadge status="TO_BE_CONFIRMED" label="Rates Pending" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase mb-1">Quarterly Transformation</h3>
                  <span className="text-2xl font-black text-brand-volt block mb-2">INQUIRE BATCH</span>
                  <p className="text-xs text-brand-text-secondary leading-relaxed">
                    Includes full gym floor access, trainer form reviews, and progression check-ins.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <Button size="sm" variant="primary" className="w-full">
                    INQUIRE PLAN
                  </Button>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </section>
      )}

      {/* 5. CONTENT TRUTH SYSTEM */}
      {activeTab === 'truth' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="text-brand-volt">05.</span> Content Truth & Verification Engine
            </h2>
            <p className="text-xs text-brand-text-muted mb-6">
              Guards against synthetic marketing claims. Clearly distinguishes verified business facts from unconfirmed client data.
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-brand-surface border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge status="VERIFIED" />
                    <span className="text-xs font-mono text-emerald-400">Ground Truth Verified</span>
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase">
                    Official Location: 1/3569-3, Timmappa Colony, Yemmiganur (518360)
                  </h4>
                  <p className="text-xs text-brand-text-muted">
                    Source: Google Maps & Local Business Registrations | Phone: +91 9533779533
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold self-start md:self-auto">
                  CONFIRMED
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-brand-surface border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge status="TO_BE_CONFIRMED" />
                    <span className="text-xs font-mono text-amber-400">Pending Verification</span>
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase">
                    Membership Pricing & Shift Schedules
                  </h4>
                  <p className="text-xs text-brand-text-muted">
                    Per Phase 1 governance, no synthetic prices or batch hours are published without explicit client sign-off.
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold self-start md:self-auto">
                  AWAITING DATA
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. 3D SYSTEM */}
      {activeTab === '3d' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="text-brand-volt">06.</span> Three.js Athletic 3D Subsystem
            </h2>
            <p className="text-xs text-brand-text-muted mb-6">
              Interactive, metallic Olympic weight plate with auto-rotation, mouse tilt, and automatic GPU disposal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-brand-surface/40 p-6 md:p-8 rounded-2xl border border-brand-border">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-brand-volt font-bold">
                  Signature PBR Mesh
                </span>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  Precision Olympic Steel
                </h3>
                <p className="text-xs text-brand-text-secondary leading-relaxed">
                  Engineered with Three.js Standard Materials to deliver authentic cast iron micro-roughness, a brushed stainless steel 50mm bore hub, and athletic volt rim illumination. Paired with IntersectionObserver for automatic rendering pause when scrolled outside the viewport.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-brand-text-muted font-mono">
                    Low Draw Calls
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-brand-text-muted font-mono">
                    Auto Disposal
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-brand-text-muted font-mono">
                    Reduced-Motion Safe
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-brand-dark/80 border border-brand-border p-4 shadow-card-depth flex items-center justify-center">
                <PlateViewer className="w-full h-72" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
