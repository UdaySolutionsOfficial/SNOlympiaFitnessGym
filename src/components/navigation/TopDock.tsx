import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONTENT } from '../../data/siteContent';
import { Button } from '../common/Button';
import { Phone, Menu, X, ArrowUpRight, Dumbbell } from 'lucide-react';

export interface TopDockProps {
  onNavigate?: (href: string) => void;
  activeSection?: string;
}

/**
 * Premium Luxury Navigation Header & Dock
 * Designed to feel like a high-end athletic brand (Nike Lab / Equinox).
 * Clean typography, non-wrapping hotline, subtle active indicator dots,
 * and zero cramped/garish neon blobs.
 */
export const TopDock: React.FC<TopDockProps> = ({
  onNavigate,
  activeSection = 'overview',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // Monitor scroll for header background elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Primary desktop navigation items (curated for visual balance and zero crowding)
  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Programs', href: '#programs' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Membership', href: '#membership' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[40] transition-all duration-300 pointer-events-none ${
          isScrolled
            ? 'py-3 bg-brand-dark/90 backdrop-blur-xl border-b border-brand-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 md:py-6 bg-gradient-to-b from-brand-dark/90 via-brand-dark/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
          <nav
            ref={navRef}
            aria-label="Primary Navigation"
            className="flex items-center justify-between"
          >
            {/* Left: Brand Logo & Wordmark */}
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#overview');
              }}
              className="flex items-center gap-2.5 group focus-visible:outline-none"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-surface border border-brand-volt/40 group-hover:border-brand-volt group-hover:scale-105 transition-all shadow-glow-volt/20">
                <Dumbbell className="w-4 h-4 text-brand-volt" />
              </div>
              <div className="flex flex-col">
                <span className="font-black tracking-tight text-sm sm:text-base text-white uppercase leading-none">
                  SN OLYMPIA
                </span>
                <span className="text-[9px] font-mono tracking-widest text-brand-volt uppercase font-bold mt-0.5">
                  UNISEX FITNESS
                </span>
              </div>
            </a>

            {/* Center: Curated Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-surface/70 backdrop-blur-md border border-brand-border/70 text-xs font-semibold uppercase tracking-wider text-brand-text-secondary shadow-lg">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.href);
                      }}
                      className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 select-none block ${
                        isActive
                          ? 'text-white bg-white/10 font-bold'
                          : 'hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-volt shadow-glow-volt" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Right: Phone Hotline & Primary CTA */}
            <div className="flex items-center gap-3">
              {/* Phone Line: Never wraps into vertical lines */}
              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                aria-label={`Call Olympia Fitness at ${SITE_CONTENT.brand.contact.phoneDisplay.value}`}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-brand-text-secondary hover:text-brand-volt transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-brand-volt shrink-0" />
                <span className="whitespace-nowrap">{SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
              </a>

              {/* Join Now Button */}
              <button
                onClick={() => handleLinkClick('#membership')}
                className="px-4 py-2 rounded-lg bg-brand-volt text-brand-dark font-black text-xs uppercase tracking-wider hover:bg-white hover:shadow-glow-volt transition-all flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <span>JOIN NOW</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="inline-flex lg:hidden p-2 rounded-lg bg-brand-surface border border-brand-border text-brand-text-secondary hover:text-white focus:outline-none focus:ring-1 focus:ring-brand-volt"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* FULLSCREEN MOBILE NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 lg:hidden bg-brand-dark/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar with Brand & Close */}
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center">
                <Dumbbell className="w-3.5 h-3.5 text-brand-volt" />
              </div>
              <span className="font-black text-white text-base tracking-tight uppercase">
                SN OLYMPIA
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-lg bg-brand-charcoal text-brand-text-secondary hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links List */}
          <ul className="space-y-4 my-auto py-6">
            {navItems.map((item, index) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="group flex items-center justify-between text-2xl font-black uppercase text-white hover:text-brand-volt transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-brand-text-muted group-hover:text-brand-volt">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom Mobile Drawer Actions */}
          <div className="space-y-3 pt-4 border-t border-brand-border/60">
            <a
              href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-surface border border-brand-border text-white text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-volt" />
              <span>{SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
            </a>

            <button
              onClick={() => handleLinkClick('#membership')}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-volt text-brand-dark font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-glow-volt"
            >
              <span>JOIN OLYMPIA FITNESS</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
