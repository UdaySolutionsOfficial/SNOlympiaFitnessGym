import React from 'react';
import { Button } from '../common/Button';
import { SITE_CONTENT } from '../../data/siteContent';
import { ArrowRight, Phone, MessageSquare, Star, ShieldCheck, Clock } from 'lucide-react';

export interface HeroContentProps {
  onJoinClick?: () => void;
  onExploreClick?: () => void;
  className?: string;
}

/**
 * Animated Glassmorphic Hero Card
 * Houses the understandable plain-language value proposition,
 * direct action buttons, and verified gym details in a floating frosted card.
 */
export const HeroContent: React.FC<HeroContentProps> = ({
  onJoinClick,
  onExploreClick,
  className = '',
}) => {
  return (
    <div
      className={`relative max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-brand-surface/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-center transition-all duration-500 hover:border-brand-volt/50 ${className}`}
    >
      {/* Subtle Ambient Radial Light Accent Inside the Card */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-volt/60 to-transparent" />

      {/* Understandable Paragraph Text for Everyone */}
      <p className="text-base sm:text-lg md:text-xl text-brand-text-primary leading-relaxed font-medium max-w-2xl mx-auto">
        {SITE_CONTENT.hero.subheadline}
      </p>

      {/* Direct Action Triggers */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 pt-6">
        {/* Primary CTA (JOIN NOW) */}
        <Button
          size="lg"
          variant="primary"
          magnetic
          onClick={onJoinClick}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="shadow-glow-volt hover:shadow-glow-volt-lg transition-all"
        >
          {SITE_CONTENT.hero.primaryCta}
        </Button>

        {/* Secondary CTA (EXPLORE PROGRAMS) */}
        <Button
          size="lg"
          variant="secondary"
          onClick={onExploreClick}
        >
          {SITE_CONTENT.hero.secondaryCta}
        </Button>

        {/* Quick WhatsApp Inquiry */}
        <a
          href={`https://wa.me/${SITE_CONTENT.brand.contact.whatsapp.value.replace('+', '')}?text=Hi%20Olympia%20Fitness,%20I%20would%20like%20to%20inquire%20about%20membership%20and%20timings`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Inquire with Olympia Fitness on WhatsApp"
          className="inline-flex"
        >
          <Button
            size="lg"
            variant="glass"
            leftIcon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
          >
            WHATSAPP
          </Button>
        </a>

        {/* Direct Phone Dial */}
        <a
          href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-white hover:border-brand-volt hover:text-brand-volt transition-colors whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-brand-volt shrink-0" />
          <span className="whitespace-nowrap">{SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
        </a>
      </div>

      {/* Verified Facility Credentials Micro-Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10 text-xs text-brand-text-muted">
        <div className="flex items-center justify-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
          <span className="font-bold text-white">5.0★ Google Rating</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-volt shrink-0" />
          <span className="font-bold text-white">100% Unisex Facility</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-brand-text-secondary shrink-0" />
          <span className="font-mono text-white">5:00 AM – 10:00 PM</span>
        </div>
      </div>
    </div>
  );
};
