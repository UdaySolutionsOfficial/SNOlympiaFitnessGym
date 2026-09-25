import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Instagram, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';

export const EndPhaseTransition: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 bg-gradient-to-b from-brand-dark via-brand-surface/40 to-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Background Accent Lines & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-volt/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Phase Transition Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          The Story Continues • Phase 3 Milestone
        </div>

        {/* Master Invitation Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          READY TO EXPERIENCE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt via-emerald-300 to-brand-volt">
            SN OLYMPIA IN PERSON?
          </span>
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
          Floor tours, physical form consultations, and batch inquiries are open daily. Visit our facility at Timmappa Colony or speak directly with our training desk.
        </p>

        {/* Primary Contact Action Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          {/* Call / WhatsApp */}
          <a
            href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
            className="group p-5 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-brand-volt transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                <Phone className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-brand-text-muted group-hover:text-brand-volt transition-colors" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-brand-text-muted uppercase">Direct Floor Desk</div>
              <div className="text-base font-bold font-mono text-white group-hover:text-brand-volt transition-colors">
                {SITE_CONTENT.brand.contact.phoneDisplay.value}
              </div>
            </div>
          </a>

          {/* Location / Walk-in */}
          <a
            href={SITE_CONTENT.brand.address.googleShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-brand-volt transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                <MapPin className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-brand-text-muted group-hover:text-brand-volt transition-colors" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-brand-text-muted uppercase">Visit The Gym</div>
              <div className="text-sm font-bold text-white group-hover:text-brand-volt transition-colors line-clamp-1">
                Timmappa Colony, YMG
              </div>
            </div>
          </a>

          {/* Instagram Social */}
          <a
            href={SITE_CONTENT.brand.contact.instagramUrl.value}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-brand-volt transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt">
                <Instagram className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-brand-text-muted group-hover:text-brand-volt transition-colors" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-brand-text-muted uppercase">Daily Updates</div>
              <div className="text-sm font-bold text-white group-hover:text-brand-volt transition-colors">
                {SITE_CONTENT.brand.contact.instagramHandle.value}
              </div>
            </div>
          </a>
        </div>

        {/* Phase 4 Preview Notice */}
        <div className="mt-16 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-surface/40 border border-brand-border/60 text-xs font-mono text-brand-text-muted">
          <span className="w-2 h-2 rounded-full bg-brand-volt animate-ping" />
          <span>PHASE 4 UPCOMING: FULL MEMBERSHIP TIERS, ENQUIRY FORMS & ADMISSIONS</span>
        </div>
      </div>
    </section>
  );
};
