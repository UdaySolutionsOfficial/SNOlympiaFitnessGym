import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Compass, Volume2 } from 'lucide-react';
import { ASSET_MANIFEST } from '../../data/assets';

export const AtmosphereSection: React.FC = () => {
  return (
    <section id="atmosphere" className="relative py-32 md:py-44 bg-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Background Cinematic Atmosphere Image with Heavy Vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={ASSET_MANIFEST.about.gymAtmosphere.path}
          alt="Olympia Fitness Atmosphere"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-25 filter brightness-50 contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/85 to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark" />
      </div>

      {/* Central Volt Ambient Light Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-volt/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-8"
        >
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          The Olympia Floor Vibe
        </motion.div>

        {/* Master Cinema Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]"
        >
          WHERE DISCIPLINE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt via-amber-300 to-brand-volt">
            OVERCOMES DOUBT.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-brand-text-secondary leading-relaxed font-light"
        >
          Step onto our floor and leave the noise of the day behind. The clinking of cast iron, chalk in the air, and collective focus create an energy that demands your absolute best.
        </motion.p>

        {/* 3 Core Floor Tenets */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 rounded-2xl bg-brand-surface/60 backdrop-blur-md border border-brand-border/60 hover:border-brand-volt/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white tracking-tight mb-2">
              UNAPOLOGETIC FOCUS
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed font-light">
              Zero crowds loitering on equipment. Every athlete is dialed in with structured sets, deliberate rest times, and clear objectives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-6 rounded-2xl bg-brand-surface/60 backdrop-blur-md border border-brand-border/60 hover:border-brand-volt/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt mb-4">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white tracking-tight mb-2">
              RESPECT & BROTHERHOOD
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed font-light">
              An empowering unisex training culture. Experienced lifters cheer on newcomers, and coaches maintain an ego-free, respectful floor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-6 rounded-2xl bg-brand-surface/60 backdrop-blur-md border border-brand-border/60 hover:border-brand-volt/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center text-brand-volt mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black uppercase text-white tracking-tight mb-2">
              YEMMIGANUR ROOTS
            </h3>
            <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed font-light">
              Proudly serving Timmappa Colony and the greater Yemmiganur community with city-standard equipment and athletic ambition.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
