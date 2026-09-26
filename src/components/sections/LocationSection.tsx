import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, ExternalLink, ShieldCheck, Car } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';
import { ScrollReveal } from '../common/ScrollReveal';

export const LocationSection: React.FC = () => {
  const address = SITE_CONTENT.brand.address;

  // Exact Google Maps embed for Olympia Fitness Gym Yemmiganur
  const googleMapsEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8226025456042!2d77.47717267512941!3d15.760162484875424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb641003ef2a611%3A0xaeee89493d07ee92!2sOlympia%20Fitness%20Gym!5e1!3m2!1sen!2sin!4v1790430676663!5m2!1sen!2sin';

  return (
    <section id="location" className="relative py-28 md:py-36 bg-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-brand-volt/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
            <Compass className="w-3.5 h-3.5" />
            Physical Facility Ground
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
            TRAIN AT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-amber-400">
              TIMMAPPA COLONY.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
            Conveniently situated in the Shiva Priya Theater area of Yemmiganur. Easily accessible for daily morning and evening training routines.
          </p>
        </ScrollReveal>

        {/* Location Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Landmarks, Parking & Directions (Span 5) */}
          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-5 h-full">
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-xl space-y-6 h-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-brand-volt uppercase font-bold tracking-wider mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Verified Facility Address</span>
                </div>

                {/* Formatted Address */}
                <div className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-4">
                  SN OLYMPIA FITNESS UNISEX GYM
                </div>

                <div className="p-4 rounded-xl bg-brand-charcoal/80 border border-brand-border/60 text-xs sm:text-sm text-brand-text-secondary leading-relaxed space-y-1 mb-6">
                  <div className="font-semibold text-white font-mono">{address.doorNo.value}</div>
                  <div>{address.area.value}</div>
                  <div>{address.city.value}, {address.state.value} — {address.pincode.value}</div>
                  <div className="text-[11px] text-brand-volt font-mono pt-1">
                    Landmark: Shiva Priya Theater Area
                  </div>
                </div>

                {/* Facility Logistics */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-brand-text-primary">
                    <Car className="w-4 h-4 text-brand-volt shrink-0" />
                    <span>Two-wheeler & vehicle parking space available outside</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-text-primary">
                    <ShieldCheck className="w-4 h-4 text-brand-volt shrink-0" />
                    <span>Secure, well-lit street entrance for evening shifts</span>
                  </div>
                </div>
              </div>

              {/* Direct Directions Action Button */}
              <div className="pt-4 border-t border-brand-border/50">
                <a
                  href={address.googleShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-brand-volt text-white font-black text-xs uppercase tracking-widest hover:bg-brand-volt-hover hover:shadow-glow-volt transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="text-[10px] font-mono text-brand-text-muted text-center mt-2">
                  Opens directly in Google Maps / Navigation app
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Functional Map Embed Frame (Span 7) */}
          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-7 h-full">
            <div className="relative min-h-[380px] lg:min-h-full rounded-2xl overflow-hidden border border-brand-border/80 bg-brand-charcoal shadow-xl flex flex-col h-full">
              {/* Top Map Bar */}
              <div className="px-5 py-3 bg-brand-surface border-b border-brand-border/60 flex items-center justify-between text-xs font-mono text-brand-text-secondary z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-volt animate-pulse" />
                  <span>YEMMIGANUR GEOGRAPHICAL RADAR</span>
                </div>
                <span className="text-brand-volt">15.7602° N, 77.4772° E</span>
              </div>

              {/* Map Frame */}
              <div className="relative flex-1 w-full h-full min-h-[320px]">
                <iframe
                  title="SN Olympia Fitness Official Google Map"
                  src={googleMapsEmbedUrl}
                  className="w-full h-full border-0 filter invert contrast-[1.08] grayscale-[0.25] opacity-85 hover:opacity-100 hover:filter-none transition-all duration-300"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />

                {/* Pin Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm p-4 rounded-xl bg-brand-dark/90 backdrop-blur-md border border-brand-border text-xs pointer-events-none">
                  <div className="font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-volt" />
                    <span>SN Olympia Fitness</span>
                  </div>
                  <div className="text-brand-text-secondary text-[11px]">
                    1/3569-3, Timmappa Colony, Shiva Priya Theater Area
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
