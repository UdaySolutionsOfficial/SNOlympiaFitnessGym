import React from 'react';
import { TopDock } from '../components/navigation/TopDock';
import { Button } from '../components/common/Button';
import { SpotlightCard } from '../components/cards/SpotlightCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { PlateViewer } from '../components/3d/PlateViewer';
import { SITE_CONTENT } from '../data/siteContent';
import { 
  ArrowRight, 
  Phone, 
  MapPin, 
  Instagram, 
  Star, 
  ShieldCheck, 
  Dumbbell, 
  Flame, 
  Check, 
  MessageSquare,
  Sparkles,
  Layers
} from 'lucide-react';

export interface HomeViewProps {
  onOpenDesignSystem?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenDesignSystem }) => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-text-primary selection:bg-brand-volt selection:text-brand-dark">
      {/* Pinned Top Navigation Dock */}
      <TopDock activeSection="overview" />

      {/* Floating System Switcher for Reviewer / Developer */}
      <div className="fixed bottom-4 right-4 z-[40]">
        <button
          onClick={onOpenDesignSystem}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-surface/90 backdrop-blur-xl border border-brand-volt/40 text-xs font-bold uppercase tracking-wider text-brand-volt shadow-glow-volt hover:bg-brand-volt hover:text-brand-dark transition-all"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Open Design System QC</span>
        </button>
      </div>

      {/* HERO FOUNDATION */}
      <section id="overview" className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-4 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle Ambient Radial Backlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-volt/5 blur-[140px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Athletic Typography & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-white/10 text-xs font-semibold tracking-wider text-brand-text-secondary uppercase">
              <span className="w-2 h-2 rounded-full bg-brand-volt shadow-glow-volt" />
              <span>{SITE_CONTENT.hero.badge}</span>
              <span className="text-white/20">|</span>
              <span className="text-brand-volt">YEMMIGANUR</span>
            </div>

            <h1 className="text-fluid-hero font-black uppercase text-white tracking-tighter leading-none">
              <span>{SITE_CONTENT.hero.headlineWord1}</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-brand-text-muted">
                {SITE_CONTENT.hero.headlineWord2}
              </span>
            </h1>

            <p className="text-sm md:text-base lg:text-lg text-brand-text-secondary max-w-xl leading-relaxed">
              {SITE_CONTENT.hero.subheadline} Located in Timmappa Colony with proven coaching, modern equipment, and dedicated morning & evening batches.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                variant="primary"
                magnetic
                onClick={() => {
                  const el = document.getElementById('membership');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {SITE_CONTENT.hero.primaryCta}
              </Button>

              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                className="inline-flex"
              >
                <Button
                  size="lg"
                  variant="glass"
                  leftIcon={<Phone className="w-4 h-4 text-brand-volt" />}
                >
                  CALL GYM
                </Button>
              </a>

              <a
                href={`https://wa.me/${SITE_CONTENT.brand.contact.whatsapp.value.replace('+', '')}?text=Hi%20Olympia%20Fitness,%20I%20am%20interested%20in%20joining%20the%20gym`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
                >
                  WHATSAPP
                </Button>
              </a>
            </div>

            {/* Quick Metrics Bento Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-brand-border">
              {SITE_CONTENT.hero.quickStats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-brand-surface/60 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl font-black text-white">{stat.value}</span>
                    <StatusBadge status={stat.status} showIcon={false} label={stat.status === 'VERIFIED' ? '✓' : 'Pending'} className="px-1.5 py-0 text-[9px]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text-muted block mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Signature 3D Olympic Plate Canvas */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="w-full relative aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-b from-brand-surface/40 to-brand-dark border border-white/10 p-6 flex flex-col items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="w-full flex items-center justify-between text-xs text-brand-text-muted">
                <span className="uppercase font-mono tracking-wider">3D PBR INTERACTION</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-brand-volt/10 text-brand-volt font-bold">DRAG TO ROTATE</span>
              </div>

              <PlateViewer className="w-full h-64 md:h-72 my-auto" />

              <div className="w-full pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-extrabold tracking-widest text-white uppercase">CAST IRON & STEEL</span>
                <span className="text-brand-text-muted">SN Olympia Signature Asset</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section id="programs" className="py-20 px-4 max-w-7xl mx-auto border-t border-brand-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-volt uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>TRAINING DISCIPLINES</span>
            </div>
            <h2 className="text-fluid-section font-black uppercase text-white tracking-tight">
              ENGINEERED FOR PROGRESS
            </h2>
          </div>
          <p className="text-xs md:text-sm text-brand-text-secondary max-w-md">
            Whether your objective is progressive overload, metabolic conditioning, or personal form mastery, our unisex programs are structured for results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONTENT.programs.map((program) => (
            <SpotlightCard key={program.id} className="flex flex-col justify-between h-80">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-brand-volt uppercase tracking-wider">
                    {program.category}
                  </span>
                  <StatusBadge status={program.verification.status} label="Active" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase mb-2">
                  {program.title}
                </h3>
                <p className="text-xs text-brand-text-secondary leading-relaxed mb-4">
                  {program.description}
                </p>
              </div>

              <div>
                <ul className="space-y-1.5 mb-4 text-[11px] text-brand-text-muted">
                  {program.focusAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-volt/60" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>

                <Button size="sm" variant="secondary" className="w-full">
                  INQUIRE BATCH
                </Button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* FACILITIES OVERVIEW */}
      <section id="facilities" className="py-20 px-4 max-w-7xl mx-auto border-t border-brand-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-volt uppercase tracking-wider mb-2">
              <Dumbbell className="w-4 h-4" />
              <span>THE GYM FLOOR</span>
            </div>
            <h2 className="text-fluid-section font-black uppercase text-white tracking-tight">
              COMMERCIAL GRADE EQUIPMENT
            </h2>
          </div>
          <StatusBadge status="VERIFIED" label="Gym Floor Features" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONTENT.facilities.map((fac) => (
            <div
              key={fac.id}
              className="p-6 rounded-2xl bg-brand-surface border border-white/10 flex flex-col justify-between h-64 hover:border-brand-volt/40 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-text-muted block mb-1">
                  {fac.equipmentType}
                </span>
                <h3 className="text-base font-bold text-white uppercase mb-2">
                  {fac.title}
                </h3>
                <p className="text-xs text-brand-text-secondary leading-relaxed">
                  {fac.description}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-brand-text-muted">
                <span>Timmappa Colony Floor</span>
                <span className="text-brand-volt font-bold">AVAILABLE</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP PREVIEW (WITH EXPLICIT UNVERIFIED FLAGS) */}
      <section id="membership" className="py-20 px-4 max-w-7xl mx-auto border-t border-brand-border">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-volt uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>MEMBERSHIP OPTIONS</span>
          </div>
          <h2 className="text-fluid-section font-black uppercase text-white tracking-tight">
            JOIN SN OLYMPIA
          </h2>
          <p className="text-xs md:text-sm text-brand-text-secondary mt-2">
            Per client governance rules, official membership prices and batch registration fees are verified directly with the gym team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONTENT.membership.map((plan) => (
            <SpotlightCard
              key={plan.id}
              className={`flex flex-col justify-between h-96 ${
                plan.badge ? 'border-brand-volt/50 shadow-glow-volt' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-brand-volt uppercase tracking-wider">
                    {plan.billingCycle}
                  </span>
                  {plan.badge ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-volt text-brand-dark">
                      {plan.badge}
                    </span>
                  ) : (
                    <StatusBadge status="TO_BE_CONFIRMED" label="Rates on Request" />
                  )}
                </div>

                <h3 className="text-xl font-black text-white uppercase mb-2">
                  {plan.tierName}
                </h3>

                <div className="py-2 mb-4 border-b border-white/5">
                  <span className="text-2xl font-black text-white block">
                    {plan.priceNote.value}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    ⚠ Contact for current batch offer
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-brand-text-secondary">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-volt shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                className="w-full block"
              >
                <Button
                  size="md"
                  variant={plan.badge ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {plan.ctaLabel}
                </Button>
              </a>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* LOCATION & GROUND TRUTH CONTACT SECTION */}
      <section id="location" className="py-20 px-4 max-w-7xl mx-auto border-t border-brand-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-surface/40 p-6 md:p-10 rounded-3xl border border-white/10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <StatusBadge status="VERIFIED" label="Confirmed Location & Phone" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
              VISIT THE CRUCIBLE IN YEMMIGANUR
            </h2>

            <div className="space-y-3 text-sm text-brand-text-secondary">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-volt shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {SITE_CONTENT.brand.officialName.value}
                  </span>
                  <span>{SITE_CONTENT.brand.address.fullFormatted.value}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-volt shrink-0" />
                <div>
                  <span className="text-white font-mono font-bold">
                    {SITE_CONTENT.brand.contact.phoneDisplay.value}
                  </span>
                  <span className="text-xs text-brand-text-muted block">Direct line for memberships & batch timings</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-brand-volt shrink-0" />
                <a
                  href={SITE_CONTENT.brand.contact.instagramUrl.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-text-primary hover:text-brand-volt transition-colors font-semibold"
                >
                  {SITE_CONTENT.brand.contact.instagramHandle.value}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={SITE_CONTENT.brand.address.googleShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="md" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  OPEN IN GOOGLE MAPS
                </Button>
              </a>

              <a href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}>
                <Button size="md" variant="secondary" leftIcon={<Phone className="w-4 h-4" />}>
                  CALL DIRECTLY
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-brand-surface border border-white/10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-volt block">
              OPERATING TIMINGS (PROVISIONAL)
            </span>
            <div className="space-y-2 text-xs text-brand-text-secondary">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Morning Batch</span>
                <span className="font-bold text-white">05:30 AM – 10:00 AM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Evening Batch</span>
                <span className="font-bold text-white">05:00 PM – 09:30 PM</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Sunday</span>
                <span className="font-mono text-amber-400">Rest Day / Special Batch</span>
              </div>
            </div>
            <p className="text-[11px] text-brand-text-muted italic">
              * Timings are based on standard local gym shifts. Exact batch slots to be confirmed on phone.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 max-w-7xl mx-auto border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text-muted">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-volt" />
          <span className="font-bold text-white uppercase tracking-wider">
            SN OLYMPIA FITNESS
          </span>
          <span>© 2026. All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenDesignSystem}
            className="hover:text-brand-volt transition-colors uppercase tracking-wider font-semibold"
          >
            Design System QC
          </button>
          <span>•</span>
          <span>Yemmiganur, AP 518360</span>
        </div>
      </footer>
    </div>
  );
};
