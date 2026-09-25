import React, { useState } from 'react';
import { SITE_CONTENT } from '../../data/siteContent';
import { Button } from '../common/Button';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';

export interface TopDockProps {
  onNavigate?: (href: string) => void;
  activeSection?: string;
}

export const TopDock: React.FC<TopDockProps> = ({
  onNavigate,
  activeSection = 'overview',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-[30] px-4 pointer-events-none flex justify-center">
      <div className="w-full max-w-5xl pointer-events-auto">
        <nav
          aria-label="Primary Navigation"
          className="flex items-center justify-between px-4 py-2.5 rounded-full bg-brand-surface/75 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300"
        >
          {/* Brand Wordmark Lockup */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#overview');
            }}
            className="flex items-center gap-2 group px-2 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-volt rounded-full"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-brand-volt shadow-glow-volt transition-transform group-hover:scale-125" />
            <span className="font-extrabold tracking-tight text-sm md:text-base text-brand-text-primary uppercase flex items-center">
              SN OLYMPIA
              <span className="text-brand-volt font-black ml-1 text-xs px-1.5 py-0.5 rounded bg-brand-volt/10 border border-brand-volt/20 hidden sm:inline-block">
                GYM
              </span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
            {SITE_CONTENT.navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-brand-dark bg-brand-volt font-bold'
                        : 'hover:text-brand-text-primary hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Quick Actions (Call & Join CTA) */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
              aria-label="Call Olympia Fitness"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-text-secondary hover:text-brand-volt transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-volt" />
              <span>{SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
            </a>

            <Button
              size="sm"
              variant="primary"
              magnetic
              onClick={() => handleLinkClick('#membership')}
              rightIcon={<ArrowUpRight className="w-3 h-3" />}
            >
              JOIN NOW
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="inline-flex md:hidden p-2 rounded-full text-brand-text-secondary hover:text-brand-text-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-brand-surface/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-2">
            <ul className="flex flex-col gap-1">
              {SITE_CONTENT.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-text-secondary hover:text-brand-volt hover:bg-white/5 transition-colors uppercase tracking-wider"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-xs font-semibold text-brand-text-primary"
              >
                <Phone className="w-3.5 h-3.5 text-brand-volt" />
                <span>Call {SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
