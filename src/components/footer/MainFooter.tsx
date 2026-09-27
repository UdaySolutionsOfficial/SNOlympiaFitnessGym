import React from 'react';
import { ArrowUp, MapPin, Instagram, ShieldCheck } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';
import { SNOlympiaLogo } from '../common/SNOlympiaLogo';
import { SITE_CONTENT } from '../../data/siteContent';

export const MainFooter: React.FC = () => {
  const brand = SITE_CONTENT.brand;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060708] text-brand-text-primary pt-20 pb-12 overflow-hidden border-t border-brand-border/60">
      {/* Massive Brand Watermark in Background */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[100px] sm:text-[180px] lg:text-[240px] font-black text-white/[0.015] select-none pointer-events-none tracking-tighter whitespace-nowrap font-mono">
        SN OLYMPIA
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid with Staggered Cascading Reveal */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-brand-border/40"
        >
          {/* Brand Info (Span 4) */}
          <StaggerItem className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <SNOlympiaLogo variant="mark" className="w-10 h-10 shrink-0" glow={true} />
              <div className="flex items-center tracking-normal">
                <span className="font-athletic font-black uppercase text-base sm:text-lg tracking-wider text-white">
                  OLYMPIA
                </span>
                <span className="font-athletic italic font-black uppercase text-base sm:text-lg tracking-wider text-[#FF5E1E] ml-1.5">
                  GYM
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed font-light">
              Yemmiganur’s premier unisex strength and conditioning destination. Built on disciplined biomechanics, heavy iron, and an ego-free training environment.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-brand-volt">
              <ShieldCheck className="w-4 h-4" />
              <span>4.9★ (126+ Verified Google Reviews)</span>
            </div>
          </StaggerItem>

          {/* Navigation Links (Span 3) */}
          <StaggerItem className="lg:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-volt font-bold">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-mono text-brand-text-secondary">
              <li>
                <a href="#overview" className="hover:text-brand-volt transition-colors">
                  // 01. Overview & Hero
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-volt transition-colors">
                  // 02. About & Ethos
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-brand-volt transition-colors">
                  // 03. Training Disciplines
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-brand-volt transition-colors">
                  // 04. Equipment Arsenal
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-brand-volt transition-colors">
                  // 05. Admissions & Tiers
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-volt transition-colors">
                  // 06. Clarifications & FAQ
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-brand-volt transition-colors">
                  // 07. Location & Directions
                </a>
              </li>
            </ul>
          </StaggerItem>

          {/* Facility Location (Span 3) */}
          <StaggerItem className="lg:col-span-3 space-y-3 text-xs">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-volt font-bold">
              Training Facility
            </div>
            <div className="text-brand-text-secondary leading-relaxed font-light">
              <strong className="text-white block font-mono mb-1">{brand.address.doorNo.value}</strong>
              {brand.address.area.value},<br />
              {brand.address.city.value}, {brand.address.state.value} — {brand.address.pincode.value}
            </div>
            <div className="pt-2">
              <a
                href={brand.address.googleShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-volt hover:underline font-mono"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>
            </div>
            <div className="text-[11px] text-brand-text-muted font-mono pt-1">
              Morning: 05:30 AM – 10:00 AM<br />
              Evening: 05:00 PM – 09:30 PM
            </div>
          </StaggerItem>

          {/* Direct Communication & Social (Span 2) */}
          <StaggerItem className="lg:col-span-2 space-y-3 text-xs">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-volt font-bold">
              Connect
            </div>
            <div>
              <a
                href={`tel:${brand.contact.phone.value}`}
                className="font-mono text-sm text-white hover:text-brand-volt transition-colors font-bold block"
              >
                {brand.contact.phoneDisplay.value}
              </a>
              <span className="text-[11px] text-brand-text-muted">Training Desk Line</span>
            </div>
            <div className="pt-2">
              <a
                href={brand.contact.instagramUrl.value}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-text-secondary hover:text-pink-400 transition-colors font-mono"
              >
                <Instagram className="w-4 h-4" />
                <span>{brand.contact.instagramHandle.value}</span>
              </a>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Bar */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-text-muted">
            <div>
              © {new Date().getFullYear()} SN Olympia Fitness Unisex Gym. All verified business facts reserved.
            </div>

            <div className="flex items-center gap-4">
              <span className="text-brand-volt">Yemmiganur, Andhra Pradesh</span>
              <span>•</span>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-brand-text-secondary hover:text-brand-volt transition-colors"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
