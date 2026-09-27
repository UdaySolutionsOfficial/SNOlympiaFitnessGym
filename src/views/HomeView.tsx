import React, { useState, useEffect, useRef } from 'react';
import { IntroLoader } from '../components/loader/IntroLoader';
import { TopDock } from '../components/navigation/TopDock';
import { HeroSection } from '../components/hero/HeroSection';
import { SectionTransition } from '../components/hero/SectionTransition';
import { ManifestoMarquee } from '../components/sections/ManifestoMarquee';
import { AboutSection } from '../components/sections/AboutSection';
import { WhyOlympiaSection } from '../components/sections/WhyOlympiaSection';
import { ProgramsSection } from '../components/sections/ProgramsSection';
import { VideoArenaSection } from '../components/sections/VideoArenaSection';
import { MethodologySection } from '../components/sections/MethodologySection';
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
import { SectionDividerWatermark } from '../components/common/SectionDividerWatermark';
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
 * 10. FacilitiesSection (Commercial free weights, power cages, cable suite)
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
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.search.includes('no-intro') || window.location.hash.includes('no-intro');
    }
    return false;
  });
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

  const [activeSection, setActiveSection] = useState('overview');
  const isNavClickRef = useRef(false);
  const navClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavigate = (targetId: string) => {
    const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
    setActiveSection(id);
    isNavClickRef.current = true;
    if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    navClickTimeoutRef.current = setTimeout(() => {
      isNavClickRef.current = false;
    }, 900);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic Sequential Scroll Spy for Navigation Active State
  useEffect(() => {
    const navSections = [
      { id: 'overview', target: 'overview' },
      { id: 'about', target: 'about' },
      { id: 'benefits', target: 'about' },
      { id: 'programs', target: 'programs' },
      { id: 'action', target: 'action' },
      { id: 'methodology', target: 'action' },
      { id: 'facilities', target: 'facilities' },
      { id: 'atmosphere', target: 'facilities' },
      { id: 'gallery', target: 'facilities' },
      { id: 'testimonials', target: 'membership' },
      { id: 'membership', target: 'membership' },
      { id: 'faq', target: 'membership' },
      { id: 'contact', target: 'contact' },
      { id: 'location', target: 'contact' },
    ];

    const handleScroll = () => {
      if (isNavClickRef.current) return;

      // 1. Bottom of page detection -> lock to contact
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      // 2. Top of page detection -> lock to overview
      if (window.scrollY < 120) {
        setActiveSection('overview');
        return;
      }

      // 3. Viewport focal line at 35% from the top
      const focalLine = window.innerHeight * 0.35;
      let matchedSection: string | null = null;

      // Find section enclosing the focal line
      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          matchedSection = sec.target;
          break;
        }
      }

      // Fallback: If in a transition zone, take the last section whose top passed focal line
      if (!matchedSection) {
        for (const sec of navSections) {
          const el = document.getElementById(sec.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalLine) {
            matchedSection = sec.target;
          }
        }
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-dark text-brand-text-primary selection:bg-brand-volt selection:text-brand-dark overflow-x-hidden">
      {/* 1. Cinematic Initial Loader */}
      {!introFinished && (
        <IntroLoader onComplete={() => setIntroFinished(true)} />
      )}

      {/* 2. Responsive Sable-Inspired Top Navigation Dock */}
      <TopDock
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />



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

        {/* Inter-Section Typographic Gradient Bridge */}
        <SectionDividerWatermark quote="UNSTOPPABLE" />

        {/* Act III: Bento Competitive Advantage */}
        <WhyOlympiaSection />

        {/* Inter-Section Typographic Gradient Bridge */}
        <SectionDividerWatermark quote="BEYOND LIMITS" />

        {/* Act IV: Disciplines & Training Architecture */}
        <ProgramsSection onInquireBatch={(progId) => handleOpenEnquiry(`Program: ${progId}`)} />

        {/* Inter-Section Typographic Gradient Bridge */}
        <SectionDividerWatermark quote="RELENTLESS" />

        {/* Act IV.B: Live 3D Curved Video Arena & Training Reels */}
        <VideoArenaSection />

        {/* Act V: The 4-Stage Progressive Methodology */}
        <MethodologySection />

        {/* Inter-Section Typographic Gradient Bridge */}
        <SectionDividerWatermark quote="HEAVY IRON" />

        {/* Act VI: Commercial Iron Arsenal & Equipment */}
        <FacilitiesSection />

        {/* Inter-Section Typographic Gradient Bridge */}
        <SectionDividerWatermark quote="RAW DISCIPLINE" />

        {/* Act VIII: High-Contrast Floor Atmosphere */}
        <AtmosphereSection />

        {/* Act IX: Authentic Visual Archive & Lightbox */}
        <GallerySection />

        {/* Act X: Community Proof & 5.0★ Verified Trust */}
        <TestimonialsSection />

        {/* Inter-Section Typographic Gradient Bridge */}
        <SectionDividerWatermark quote="COMMITMENT" />

        {/* Act XI: Admissions & Membership Commitments */}
        <MembershipSection onSelectPlan={(plan) => handleOpenEnquiry(`Membership Plan: ${plan}`)} />

        {/* Act XII: Clarifications & Frequently Asked Questions */}
        <FAQSection onAskQuestion={() => handleOpenEnquiry('General FAQ Inquiry')} />

        {/* Act XIII: Direct Communication Channels */}
        <ContactSection onOpenEnquiry={() => handleOpenEnquiry('Direct Contact Inquiry')} />

        {/* Act XIV: Physical Ground & Directions */}
        <LocationSection />

        {/* Inter-Section Typographic Gradient Bridge */}
        <SectionDividerWatermark quote="OLYMPIA" />

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
