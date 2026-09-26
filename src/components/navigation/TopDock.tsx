import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONTENT } from '../../data/siteContent';
import { Phone, ArrowUpRight, Menu, X, Dumbbell, User } from 'lucide-react';

export interface TopDockProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

/**
 * Athletic Modern Navigation Dock
 * Features sleek orange theme styling, centered brand insignia,
 * direct Contact Us pill button, user profile trigger, and responsive mobile overlay.
 */
export const TopDock: React.FC<TopDockProps> = ({
  activeSection = 'overview',
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // Scroll detection for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: 'Home', href: '#overview' },
    { label: 'Membership', href: '#membership' },
    { label: 'About', href: '#facilities' },
    { label: 'Programs', href: '#programs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-[50] transition-all duration-300 pointer-events-none ${
          isScrolled
            ? 'py-3 bg-brand-dark/95 backdrop-blur-xl border-b border-brand-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
            : 'py-5 md:py-6 bg-gradient-to-b from-brand-dark/90 via-brand-dark/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
          <nav
            ref={navRef}
            aria-label="Primary Navigation"
            className="flex items-center justify-between"
          >
            {/* Left: Nav Links (Desktop) & Brand (Mobile) */}
            <div className="flex items-center gap-6">
              {/* Brand Logo & Wordmark */}
              <a
                href="#overview"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#overview');
                }}
                className="flex items-center gap-2.5 group focus-visible:outline-none"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-volt/15 border border-brand-volt/40 group-hover:border-brand-volt group-hover:scale-105 transition-all shadow-glow-volt/30">
                  <Dumbbell className="w-4 h-4 text-brand-volt" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black tracking-tight text-sm sm:text-base text-white uppercase leading-none">
                    OLYMPIA <span className="text-brand-volt">GYM</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-brand-text-muted uppercase font-bold mt-0.5">
                    UNISEX FITNESS
                  </span>
                </div>
              </a>

              {/* Desktop Nav Links */}
              <ul className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-semibold uppercase tracking-wider text-brand-text-secondary pl-4">
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
                        className={`px-3 py-1.5 rounded-full transition-all duration-200 select-none block ${
                          isActive
                            ? 'text-white font-bold bg-white/10'
                            : 'hover:text-brand-volt hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: Hotline, Orange Contact Us Pill & User Profile Trigger */}
            <div className="flex items-center gap-3">
              {/* Phone Hotline */}
              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                aria-label={`Call Olympia Fitness at ${SITE_CONTENT.brand.contact.phoneDisplay.value}`}
                className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-brand-text-secondary hover:text-brand-volt transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-brand-volt shrink-0" />
                <span className="whitespace-nowrap">{SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
              </a>

              {/* Orange Contact Us Button */}
              <button
                onClick={() => handleLinkClick('#contact')}
                className="px-5 sm:px-6 py-2 rounded-full bg-[#FF5E1E] text-white font-black text-xs uppercase tracking-wider hover:bg-[#FF7538] hover:shadow-[0_0_25px_rgba(255,94,30,0.6)] transition-all flex items-center gap-1.5 shadow-md active:scale-95"
              >
                <span>Contact us</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/90" />
              </button>

              {/* User Profile Avatar Icon in Orange Circle */}
              <button
                onClick={() => handleLinkClick('#membership')}
                aria-label="Member Area & Profile"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FF5E1E] text-white flex items-center justify-center hover:scale-105 hover:bg-[#FF7538] hover:shadow-[0_0_25px_rgba(255,94,30,0.6)] transition-all shadow-md active:scale-95 shrink-0"
              >
                <User className="w-4 h-4 fill-white text-white" />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="inline-flex md:hidden p-2 rounded-lg bg-brand-surface border border-brand-border text-brand-text-secondary hover:text-white focus:outline-none focus:ring-1 focus:ring-brand-volt"
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
          className="fixed inset-0 z-[60] md:hidden bg-brand-dark/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar with Brand & Close */}
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-volt/15 border border-brand-volt/30 flex items-center justify-center">
                <Dumbbell className="w-3.5 h-3.5 text-brand-volt" />
              </div>
              <span className="font-black text-white text-base tracking-tight uppercase">
                OLYMPIA <span className="text-brand-volt">GYM</span>
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-lg bg-brand-surface text-brand-text-secondary hover:text-white transition-colors"
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
              onClick={() => handleLinkClick('#contact')}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-volt text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-glow-volt"
            >
              <span>CONTACT US NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
