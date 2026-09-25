import React, { useState } from 'react';
import { IntroLoader } from '../components/loader/IntroLoader';
import { TopDock } from '../components/navigation/TopDock';
import { HeroSection } from '../components/hero/HeroSection';
import { SectionTransition } from '../components/hero/SectionTransition';
import { ManifestoMarquee } from '../components/sections/ManifestoMarquee';
import { AboutSection } from '../components/sections/AboutSection';
import { WhyOlympiaSection } from '../components/sections/WhyOlympiaSection';
import { ProgramsSection } from '../components/sections/ProgramsSection';
import { MethodologySection } from '../components/sections/MethodologySection';
import { TrainersSection } from '../components/sections/TrainersSection';
import { FacilitiesSection } from '../components/sections/FacilitiesSection';
import { AtmosphereSection } from '../components/sections/AtmosphereSection';
import { GallerySection } from '../components/sections/GallerySection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { EndPhaseTransition } from '../components/sections/EndPhaseTransition';
import { SITE_CONTENT } from '../data/siteContent';
import { Layers, MapPin, Phone, Instagram, Star, ShieldCheck } from 'lucide-react';

export interface HomeViewProps {
  onOpenDesignSystem?: () => void;
}

/**
 * Phase 3 Master Home View — "The Living Fitness Story"
 * Assembles the full cinematic narrative:
 * 1. IntroLoader (Cinematic entry sequence)
 * 2. TopDock (Proximity navigation dock)
 * 3. HeroSection (Signature hero + 3D Plate satellite + verified stats)
 * 4. SectionTransition (Philosophy bridge)
 * 5. ManifestoMarquee (Kinetic velocity typography)
 * 6. AboutSection (Editorial identity & 4 pillars)
 * 7. WhyOlympiaSection (Asymmetric bento differentiators)
 * 8. ProgramsSection (Interactive discipline switcher + mobile vertical stack)
 * 9. MethodologySection (4-stage progressive adaptation timeline)
 * 10. TrainersSection (Coaching vigilance, floor safety & honest content truth)
 * 11. FacilitiesSection (Commercial free weights, power cages, cable suite)
 * 12. AtmosphereSection (Full-bleed raw steel & discipline visual moment)
 * 13. GallerySection (Editorial photo grid + accessible Lightbox modal)
 * 14. TestimonialsSection (Verified 5.0★ Google/Justdial community feedback)
 * 15. EndPhaseTransition (Floor inquiry invitation & Phase 4 teaser)
 * 16. Comprehensive Milestone Footer
 */
export const HomeView: React.FC<HomeViewProps> = ({ onOpenDesignSystem }) => {
  const [introFinished, setIntroFinished] = useState(false);

  const handleJoinClick = () => {
    window.location.href = `tel:${SITE_CONTENT.brand.contact.phone.value}`;
  };

  const handleExploreClick = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-brand-dark text-brand-text-primary selection:bg-brand-volt selection:text-brand-dark overflow-x-hidden">
      {/* 1. Cinematic Initial Loader */}
      {!introFinished && (
        <IntroLoader onComplete={() => setIntroFinished(true)} />
      )}

      {/* 2. Responsive Sable-Inspired Top Navigation Dock */}
      <TopDock
        onNavigate={(href) => {
          if (href === '#membership' || href === '#contact') {
            handleJoinClick();
          } else {
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 3. Floating Design System QC Switcher */}
      <div className="fixed bottom-4 right-4 z-[40]">
        <button
          onClick={onOpenDesignSystem}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-brand-surface/90 backdrop-blur-xl border border-brand-volt/40 text-xs font-bold uppercase tracking-wider text-brand-volt shadow-glow-volt hover:bg-brand-volt hover:text-brand-dark transition-all"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Design System QC</span>
        </button>
      </div>

      {/* 4. The Continuous Fitness Story */}
      <main>
        {/* Act I: The Awakening */}
        <HeroSection
          onJoinClick={handleJoinClick}
          onExploreClick={handleExploreClick}
        />

        {/* Transition Bridge: Philosophy Statement */}
        <SectionTransition onExploreNext={handleExploreClick} />

        {/* Kinetic Velocity Manifesto Marquee */}
        <ManifestoMarquee />

        {/* Act II: Identity & Ethos */}
        <AboutSection />

        {/* Act III: Bento Competitive Advantage */}
        <WhyOlympiaSection />

        {/* Act IV: Disciplines & Training Architecture */}
        <ProgramsSection onInquireBatch={handleJoinClick} />

        {/* Act V: The 4-Stage Progressive Methodology */}
        <MethodologySection />

        {/* Act VI: Floor Mentorship & Coaching Standards */}
        <TrainersSection />

        {/* Act VII: Commercial Iron Arsenal & Equipment */}
        <FacilitiesSection />

        {/* Act VIII: High-Contrast Floor Atmosphere */}
        <AtmosphereSection />

        {/* Act IX: Authentic Visual Archive & Lightbox */}
        <GallerySection />

        {/* Act X: Community Proof & 5.0★ Verified Trust */}
        <TestimonialsSection />

        {/* Act XI: Floor Inquiry & Transition to Phase 4 */}
        <EndPhaseTransition />
      </main>

      {/* 5. Phase 3 Milestone Footer */}
      <footer className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-brand-border/60">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-volt shadow-glow-volt" />
              <span className="font-black text-white uppercase tracking-wider text-base">
                SN OLYMPIA FITNESS UNISEX GYM
              </span>
            </div>
            <p className="text-sm text-brand-text-secondary leading-relaxed max-w-md font-light">
              Yemmiganur’s premier unisex strength and conditioning destination. Built on biomechanics, heavy iron, and unyielding training consistency.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified 5.0★ Google & Justdial Rating</span>
            </div>
          </div>

          {/* Quick Contact & Location */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <div className="font-mono uppercase tracking-widest text-brand-volt font-bold">
              Facility Address
            </div>
            <div className="text-brand-text-secondary leading-relaxed font-light">
              {SITE_CONTENT.brand.address.doorNo.value}, {SITE_CONTENT.brand.address.area.value},<br />
              {SITE_CONTENT.brand.address.city.value}, {SITE_CONTENT.brand.address.state.value} {SITE_CONTENT.brand.address.pincode.value}
            </div>
            <a
              href={SITE_CONTENT.brand.address.googleShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-volt hover:underline font-mono"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>View On Google Maps</span>
            </a>
          </div>

          {/* Direct Line & Social */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <div className="font-mono uppercase tracking-widest text-brand-volt font-bold">
              Direct Communication
            </div>
            <div>
              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                className="font-mono text-sm text-white hover:text-brand-volt transition-colors font-bold block"
              >
                {SITE_CONTENT.brand.contact.phoneDisplay.value}
              </a>
              <span className="text-[11px] text-brand-text-muted">Morning & Evening Shifts</span>
            </div>
            <a
              href={SITE_CONTENT.brand.contact.instagramUrl.value}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-text-secondary hover:text-brand-volt transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{SITE_CONTENT.brand.contact.instagramHandle.value}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-text-muted">
          <div>
            © {new Date().getFullYear()} SN Olympia Fitness. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-volt font-bold">PHASE 3 COMPLETE</span>
            <span>•</span>
            <span>THE LIVING FITNESS STORY</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
