import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Instagram, Clock, MapPin, Send, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';

export interface ContactSectionProps {
  onOpenEnquiry?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenEnquiry }) => {
  const brand = SITE_CONTENT.brand;

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent('Hi Olympia Fitness Team, I want to inquire about gym membership and batch timings.');
    window.open(`https://wa.me/919533779533?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-brand-surface/20 overflow-hidden border-t border-brand-border/60">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-brand-volt/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Headline & Brand Identity (Span 6) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
                <Phone className="w-3.5 h-3.5" />
                Direct Communication
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.02]">
                TALK DIRECTLY TO THE{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-emerald-400">
                  OLYMPIA TEAM.
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
                No third-party call centers or automated loops. Your questions are answered directly by our floor coaching and management team in Yemmiganur.
              </p>
            </div>

            {/* Operating Shift Overview */}
            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-volt uppercase font-bold tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Daily Floor Hours (Morning & Evening Shifts)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-brand-charcoal/80 border border-brand-border/60">
                  <div className="text-brand-text-muted uppercase mb-1">Morning Batch</div>
                  <div className="text-white font-bold text-sm">05:30 AM – 10:00 AM</div>
                  <div className="text-[10px] text-brand-text-secondary mt-0.5">Peak Strength & Cardio</div>
                </div>
                <div className="p-3.5 rounded-xl bg-brand-charcoal/80 border border-brand-border/60">
                  <div className="text-brand-text-muted uppercase mb-1">Evening Batch</div>
                  <div className="text-white font-bold text-sm">05:00 PM – 09:30 PM</div>
                  <div className="text-[10px] text-brand-text-secondary mt-0.5">Heavy Iron & Conditioning</div>
                </div>
              </div>
              <div className="text-[11px] font-mono text-brand-text-muted flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sunday: Special Morning Recovery / Conditioning Session</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Channels & Interactive Card (Span 6) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Phone Call Card */}
            <a
              href={`tel:${brand.contact.phone.value}`}
              className="group p-6 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-brand-volt/60 transition-all duration-300 flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-brand-text-muted uppercase">Phone Hotline</div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-white group-hover:text-brand-volt transition-colors">
                    {brand.contact.phoneDisplay.value}
                  </div>
                  <div className="text-xs text-brand-text-secondary font-light mt-0.5">
                    Tap to initiate call on mobile
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-brand-text-muted group-hover:text-brand-volt transition-colors" />
            </a>

            {/* WhatsApp Card */}
            <button
              onClick={handleWhatsAppDirect}
              className="w-full text-left group p-6 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-emerald-400/60 transition-all duration-300 flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-brand-text-muted uppercase">Instant WhatsApp</div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-white group-hover:text-emerald-400 transition-colors">
                    Chat With Floor Desk
                  </div>
                  <div className="text-xs text-brand-text-secondary font-light mt-0.5">
                    Direct message pre-composed for quick response
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-brand-text-muted group-hover:text-emerald-400 transition-colors" />
            </button>

            {/* Instagram Profile Card */}
            <a
              href={brand.contact.instagramUrl.value}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-brand-surface border border-brand-border/80 hover:border-pink-500/60 transition-all duration-300 flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-brand-text-muted uppercase">Official Instagram</div>
                  <div className="text-lg sm:text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                    {brand.contact.instagramHandle.value}
                  </div>
                  <div className="text-xs text-brand-text-secondary font-light mt-0.5">
                    Follow daily floor stories, member PRs & updates
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-brand-text-muted group-hover:text-pink-400 transition-colors" />
            </a>

            {/* Modal Trigger Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-charcoal via-brand-surface to-brand-charcoal border border-brand-border flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Prefer an organized inquiry?
                </h4>
                <p className="text-xs text-brand-text-secondary font-light mt-0.5">
                  Submit your details and training goals via our quick modal.
                </p>
              </div>
              <button
                onClick={onOpenEnquiry}
                className="px-4 py-2.5 rounded-xl bg-brand-volt text-brand-dark font-black text-xs uppercase tracking-widest hover:bg-white hover:shadow-glow-volt transition-all shrink-0"
              >
                Open Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
