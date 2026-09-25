import React from 'react';
import { Button } from '../common/Button';
import { SITE_CONTENT } from '../../data/siteContent';
import { ArrowRight, Phone, MessageSquare, ChevronDown } from 'lucide-react';

export interface HeroContentProps {
  onJoinClick?: () => void;
  onExploreClick?: () => void;
  className?: string;
}

/**
 * Hero Content & CTA System
 * Oversized athletic typography, masked entrance sequence,
 * and high-impact conversion triggers inspired by ThreeUI Glass AI button.
 */
export const HeroContent: React.FC<HeroContentProps> = ({
  onJoinClick,
  onExploreClick,
  className,
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Eyebrow Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface/80 border border-white/10 text-xs font-bold tracking-wider text-brand-text-secondary uppercase shadow-sm">
        <span className="w-2 h-2 rounded-full bg-brand-volt shadow-glow-volt animate-pulse" />
        <span className="text-white">{SITE_CONTENT.hero.badge}</span>
        <span className="text-white/20">/</span>
        <span className="text-brand-volt font-mono">TIMMAPPA COLONY</span>
      </div>

      {/* 2. Headline with Split Athletic Weight */}
      <div className="space-y-1">
        <h1 className="text-fluid-hero font-black uppercase text-white tracking-tighter leading-[0.92] select-none">
          <span className="block drop-shadow-md">{SITE_CONTENT.hero.headlineWord1}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-text-primary to-brand-text-muted">
            {SITE_CONTENT.hero.headlineWord2}
          </span>
        </h1>
      </div>

      {/* 3. Supporting Editorial Statement */}
      <p className="text-sm sm:text-base md:text-lg text-brand-text-secondary max-w-xl leading-relaxed font-normal">
        {SITE_CONTENT.hero.subheadline} Step inside Yemmiganur’s premier unisex crucible for heavy iron, metabolic conditioning, and personal discipline.
      </p>

      {/* 4. Action CTAs (Primary Glass AI Style + Secondary Outline + Direct WhatsApp) */}
      <div className="flex flex-wrap items-center gap-3.5 pt-2">
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

        {/* Secondary CTA (EXPLORE GYM) */}
        <Button
          size="lg"
          variant="secondary"
          onClick={onExploreClick}
        >
          {SITE_CONTENT.hero.secondaryCta}
        </Button>

        {/* Quick WhatsApp Local Inquiry */}
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
      </div>

      {/* 5. Verified Metric Micro-Bar */}
      <div className="flex items-center gap-6 pt-4 border-t border-white/5 text-xs text-brand-text-muted">
        <div>
          <span className="font-mono font-black text-white text-base block">5.0★</span>
          <span className="uppercase text-[10px] tracking-wider">Member Reviews</span>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div>
          <span className="font-mono font-black text-white text-base block">100%</span>
          <span className="uppercase text-[10px] tracking-wider">Unisex Facility</span>
        </div>
        <div className="h-6 w-px bg-white/10" />
        <div>
          <span className="font-mono font-black text-white text-base block">PRO</span>
          <span className="uppercase text-[10px] tracking-wider">Coaching Guidance</span>
        </div>
      </div>
    </div>
  );
};
