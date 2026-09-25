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
import { MembershipSection } from '../components/sections/MembershipSection';
import { FAQSection } from '../components/sections/FAQSection';
import { ContactSection } from '../components/sections/ContactSection';
import { LocationSection } from '../components/sections/LocationSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';
import { MainFooter } from '../components/footer/MainFooter';
import { StickyMobileBar } from '../components/navigation/StickyMobileBar';
import { EnquiryModal } from '../components/modals/EnquiryModal';
import { Layers } from 'lucide-react';

export interface HomeViewProps {
  onOpenDesignSystem?: () => void;
}

/**
 * Phase 4 Complete Master Home View — "Conversion Experience & The Complete Story"
 * Unifies the entire 15-chapter narrative with practical, trustworthy conversion touchpoints:
 * 1. IntroLoader (Cinematic entry sequence)
 * 2. TopDock (Proximity navigation dock with smart anchor linking)
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
 * 15. MembershipSection (Duration toggle, batch admissions & honest price states)
 * 16. FAQSection (Accessible accordion with verified answers)
 * 17. ContactSection (Direct phone, WhatsApp & Instagram channels)
 * 18. LocationSection (Timmappa Colony address, radar map & Google directions)
 * 19. FinalCTASection (The final cinematic climax before footer)
 * 20. MainFooter (The definitive brand footer with watermark and full sitemap)
 * 21. StickyMobileBar (Subtle mobile-only bottom conversion bar)
 * 22. EnquiryModal (Contextual, accessible modal for direct admissions & inquiries)
 */
export const HomeView: React.FC<HomeViewProps> = ({ onOpenDesignSystem }) => {
  const [introFinished, setIntroFinished] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState('General Membership Inquiry');

  const handleOpenEnquiry = (interestSubject: string = 'General Membership Inquiry') => {
    setModalInterest(interestSubject);
    setEnquiryModalOpen(true);
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
          if (href === '#membership') {
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: 'smooth' });
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

      {/* 4. Master Narrative Flow */}
      <main>
        {/* Act I: The Awakening & Master Entrance */}
        <HeroSection
          onJoinClick={() => handleOpenEnquiry('Hero Admission Inquiry')}
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
        <ProgramsSection onInquireBatch={(progId) => handleOpenEnquiry(`Program: ${progId}`)} />

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

        {/* Act XI: Admissions & Membership Commitments */}
        <MembershipSection onSelectPlan={(plan) => handleOpenEnquiry(`Membership Plan: ${plan}`)} />

        {/* Act XII: Clarifications & Frequently Asked Questions */}
        <FAQSection onAskQuestion={() => handleOpenEnquiry('General FAQ Inquiry')} />

        {/* Act XIII: Direct Communication Channels */}
        <ContactSection onOpenEnquiry={() => handleOpenEnquiry('Direct Contact Inquiry')} />

        {/* Act XIV: Physical Ground & Directions */}
        <LocationSection />

        {/* Act XV: The Final Cinematic Climax */}
        <FinalCTASection onJoinClick={() => handleOpenEnquiry('Final Commitment Admission')} />
      </main>

      {/* 5. Master Brand Footer */}
      <MainFooter />

      {/* 6. Mobile-Only Sticky Conversion Bar */}
      <StickyMobileBar
        onJoinClick={() => handleOpenEnquiry('Mobile Sticky Bar')}
        isModalOpen={enquiryModalOpen}
      />

      {/* 7. Direct Admissions & Inquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialInterest={modalInterest}
      />
    </div>
  );
};
