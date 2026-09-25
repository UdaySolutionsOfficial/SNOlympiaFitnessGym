import React, { useState } from 'react';
import { IntroLoader } from '../components/loader/IntroLoader';
import { TopDock } from '../components/navigation/TopDock';
import { HeroSection } from '../components/hero/HeroSection';
import { SectionTransition } from '../components/hero/SectionTransition';
import { SITE_CONTENT } from '../data/siteContent';
import { Layers, MapPin, Phone, Instagram } from 'lucide-react';

export interface HomeViewProps {
  onOpenDesignSystem?: () => void;
}

/**
 * Phase 2 Master Home View
 * Showcases the signature cinematic opening, responsive navigation dock,
 * master hero with ultra-realistic imagery, and the Phase 3 transition bridge.
 */
export const HomeView: React.FC<HomeViewProps> = ({ onOpenDesignSystem }) => {
  const [introFinished, setIntroFinished] = useState(false);

  const handleJoinClick = () => {
    // Smooth scroll down to transition or trigger phone call
    window.location.href = `tel:${SITE_CONTENT.brand.contact.phone.value}`;
  };

  const handleExploreClick = () => {
    const transition = document.getElementById('section-transition');
    transition?.scrollIntoView({ behavior: 'smooth' });
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

      {/* 4. The Master Hero Section */}
      <main>
        <HeroSection
          onJoinClick={handleJoinClick}
          onExploreClick={handleExploreClick}
        />

        {/* 5. First Section Transition (Bridging into Phase 3) */}
        <SectionTransition onExploreNext={handleExploreClick} />
      </main>

      {/* 6. Minimal Phase 2 Milestone Footer */}
      <footer className="py-12 px-4 max-w-7xl mx-auto border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-text-muted">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-volt" />
          <span className="font-bold text-white uppercase tracking-wider">
            SN OLYMPIA FITNESS UNISEX GYM
          </span>
          <span>•</span>
          <span>Phase 2 Milestone</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
            className="hover:text-brand-volt transition-colors font-mono"
          >
            {SITE_CONTENT.brand.contact.phoneDisplay.value}
          </a>
          <span>•</span>
          <span className="text-brand-text-secondary">Timmappa Colony, Yemmiganur</span>
        </div>
      </footer>
    </div>
  );
};
