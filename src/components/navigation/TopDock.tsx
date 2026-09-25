import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONTENT } from '../../data/siteContent';
import { Button } from '../common/Button';
import { Phone, Menu, X, ArrowUpRight, Dumbbell } from 'lucide-react';

export interface TopDockProps {
  onNavigate?: (href: string) => void;
  activeSection?: string;
}

/**
 * Premium Responsive Navigation Dock
 * Inspired by ThreeUI Sable Dock with pointer proximity and scroll transformation.
 * Desktop: Centered glass pill with subtle hover expansion & compact scroll state.
 * Mobile: Full-screen editorial overlay with sequential entrance.
 */
export const TopDock: React.FC<TopDockProps> = ({
  onNavigate,
  activeSection = 'overview',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Monitor scroll for compact navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[35] px-4 pointer-events-none flex justify-center transition-all duration-300 ${
          isScrolled ? 'pt-3' : 'pt-5 md:pt-7'
        }`}
      >
        <div className="w-full max-w-5xl pointer-events-auto">
          <nav
            ref={navRef}
            aria-label="Primary Navigation"
            className={`flex items-center justify-between rounded-full border transition-all duration-300 ${
              isScrolled
                ? 'py-2 px-4 bg-brand-surface/90 backdrop-blur-2xl border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)]'
                : 'py-2.5 px-5 bg-brand-surface/65 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            }`}
          >
            {/* Brand Logo & Wordmark */}
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#overview');
              }}
              className="flex items-center gap-2 group px-2 py-1 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-volt"
            >
              <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-brand-volt/10 border border-brand-volt/40 group-hover:scale-110 transition-transform">
                <Dumbbell className="w-3.5 h-3.5 text-brand-volt" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-brand-volt animate-ping" />
              </div>
              <span className="font-black tracking-tight text-sm md:text-base text-white uppercase flex items-center gap-1.5">
                SN OLYMPIA
                <span className="text-[10px] font-mono tracking-widest text-brand-volt px-1.5 py-0.2 rounded bg-brand-volt/10 border border-brand-volt/20 hidden sm:inline-block">
                  GYM
                </span>
              </span>
            </a>

            {/* Desktop Sable-Inspired Dock Navigation */}
            <ul
              className="hidden md:flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-text-secondary"
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {SITE_CONTENT.navigation.map((item, idx) => {
                const isActive = activeSection === item.href.replace('#', '');
                const isHovered = hoveredIdx === idx;
                const isNeighbor =
                  hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

                return (
                  <li key={item.label} className="relative">
                    <a
                      href={item.href}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.href);
                      }}
                      className={`relative inline-block px-3.5 py-1.5 rounded-full transition-all duration-200 select-none ${
                        isActive
                          ? 'text-brand-dark bg-brand-volt font-black shadow-glow-volt'
                          : isHovered
                          ? 'text-white bg-white/10 scale-105'
                          : isNeighbor
                          ? 'text-brand-text-primary bg-white/5 scale-[1.02]'
                          : 'hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Quick Actions (Call line & Primary CTA) */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                aria-label={`Call Olympia Fitness at ${SITE_CONTENT.brand.contact.phoneDisplay.value}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-text-secondary hover:text-brand-volt transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-volt" />
                <span className="font-mono">{SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
              </a>

              <Button
                size="sm"
                variant="primary"
                magnetic
                onClick={() => handleLinkClick('#membership')}
                rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
              >
                JOIN NOW
              </Button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="inline-flex md:hidden p-2 rounded-full text-brand-text-secondary hover:text-white hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-brand-volt"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* DEDICATED FULLSCREEN MOBILE NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-[60] bg-brand-dark/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar with Brand & Close Button */}
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-volt shadow-glow-volt" />
              <span className="font-black text-lg text-white uppercase tracking-tight">
                SN OLYMPIA FITNESS
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2.5 rounded-full bg-brand-surface border border-white/10 text-white hover:text-brand-volt hover:border-brand-volt focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sequential Menu Links */}
          <nav className="my-auto py-8">
            <ul className="flex flex-col gap-5">
              {SITE_CONTENT.navigation.map((item, idx) => (
                <li key={item.label} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="flex items-center justify-between text-2xl sm:text-3xl font-black uppercase tracking-tight text-brand-text-secondary hover:text-brand-volt transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xs font-mono text-brand-volt">0{idx + 1}</span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className="w-6 h-6 opacity-40 text-brand-volt" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions & Ground Details */}
          <div className="border-t border-brand-border pt-6 space-y-4">
            <a
              href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-surface border border-white/10 text-sm font-bold text-white uppercase tracking-wider hover:border-brand-volt transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-volt" />
              <span>Call: {SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
            </a>

            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={() => handleLinkClick('#membership')}
            >
              JOIN NOW — INQUIRE BATCH
            </Button>

            <p className="text-[11px] text-center font-mono text-brand-text-muted">
              Timmappa Colony, Yemmiganur, AP 518360
            </p>
          </div>
        </div>
      )}
    </>
  );
};
