import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Shield, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { ASSET_MANIFEST } from '../../data/assets';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../common/ScrollReveal';

interface FacilityFeature {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  image?: string;
  specs: string[];
  equipmentList: string[];
}

const FACILITY_ZONES: FacilityFeature[] = [
  {
    id: 'free-weights',
    title: 'HEAVY FREE WEIGHTS ARENA',
    tagline: 'High-Density Cast & Urethane Dumbbells',
    category: 'RAW STRENGTH ZONE',
    description:
      'Engineered for maximum progression without bottlenecks. Full dumbbell racks calibrated in progressive weight intervals alongside multi-angle commercial grade flat and incline benches.',
    image: ASSET_MANIFEST.facilities.freeWeights.path,
    specs: ['Commercial Knurled Handles', 'High-Impact Shock Flooring', 'Dual Symmetrical Racks'],
    equipmentList: [
      'Incremental Dumbbell Pairs',
      'Heavy-Duty Adjustable Incline & Flat Benches',
      'EZ-Curl Barbells & Fixed Weight Sets',
      'Preacher Curl & Tricep Extension Stations'
    ]
  },
  {
    id: 'power-cages',
    title: 'POWER CAGES & LIFTING PLATFORMS',
    tagline: 'Solid Steel Structural Rigging',
    category: 'COMPOUND RIG',
    description:
      'The heart of heavy compound lifting. Heavy gauge steel power cages equipped with adjustable safety spotter pins, Olympic weight horns, and dedicated pull-up grips for squats, overhead presses, and deadlifts.',
    image: ASSET_MANIFEST.facilities.powerRacks.path,
    specs: ['3x3 Commercial Steel Tubing', 'Drop-Tested Safety Spotter Bars', 'Olympic Bumper Plates'],
    equipmentList: [
      'Multi-Grip Steel Power Racks',
      'Olympic 20kg 50mm Needle-Bearing Barbells',
      'High-Density Rubber Bumper Plate Stacks',
      'Integrated Multi-Angle Chin-Up Handles'
    ]
  },
  {
    id: 'cable-towers',
    title: 'SELECTORIZED CABLE SUITE',
    tagline: 'Continuous Cable Resistance & Biomechanics',
    category: 'ISOLATION & HYPERTROPHY',
    description:
      'Smooth, dual-pulley selectorized stations that maintain uninterrupted tension throughout the entire range of motion, essential for isolating deltoids, back lat fibers, and arms.',
    specs: ['Smooth Ball-Bearing Pulleys', 'Ergonomic Magnetic Selector Pins', 'Full Grip Attachment Array'],
    equipmentList: [
      'Dual Adjustable Cable Crossover System',
      'Heavy Lat Pulldown & Low Row Combos',
      'Neutral, Rope, V-Bar, and Stirrup Attachments',
      'Seated Hamstring Curl & Quad Leg Extension Suite'
    ]
  },
  {
    id: 'conditioning-turf',
    title: 'FUNCTIONAL CONDITIONING FLOOR',
    tagline: 'Agility, Explosiveness & Core Rig',
    category: 'STAMINA & METABOLIC',
    description:
      'High-traction rubberized flooring designed for dynamic athletic movements, core stabilization circuits, plyometrics, and high-intensity metabolic conditioning intervals.',
    specs: ['Non-Slip High Density Rubber', 'Sanitized Daily Maintenance', 'Open Movement Clearance'],
    equipmentList: [
      'High-Velocity Heavy Battle Ropes',
      'Plyometric Jump Boxes & Step Decks',
      'Cast Iron Kettlebell Arsenal',
      'Core Wheels & Resistance Bands'
    ]
  }
];

export const FacilitiesSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('free-weights');
  const activeZone = FACILITY_ZONES.find((z) => z.id === selectedZone) || FACILITY_ZONES[0];

  return (
    <section id="facilities" className="relative py-28 md:py-36 bg-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-brand-volt/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.05} className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            Commercial Training Arsenal
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
            BUILT FOR SERIOUS LOADS.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-amber-400">
              COMMERCIAL GRADE.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
            We don’t fill our floor with gimmick machines. Every piece of equipment at Olympia was chosen to deliver heavy compound loading, smooth tension curves, and uncompromising floor safety.
          </p>
        </ScrollReveal>

        {/* Top 2 Primary Visual Showcases (Free Weights & Power Cages) */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {FACILITY_ZONES.slice(0, 2).map((zone) => (
            <StaggerItem
              key={zone.id}
              className="group relative rounded-2xl overflow-hidden border border-brand-border/80 bg-brand-surface flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-brand-charcoal">
                {zone.image ? (
                  <img
                    src={zone.image}
                    alt={zone.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-charcoal text-brand-text-muted">
                    <Dumbbell className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/40 to-transparent" />
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-brand-dark/80 backdrop-blur-md border border-brand-border text-brand-volt font-mono text-[10px] font-bold tracking-widest uppercase">
                  {zone.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-8 -mt-6 relative z-10">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight group-hover:text-brand-volt transition-colors mb-2">
                  {zone.title}
                </h3>
                <p className="text-xs font-mono text-brand-volt mb-3 font-semibold">
                  {zone.tagline}
                </p>
                <p className="text-sm text-brand-text-secondary leading-relaxed mb-6 font-light">
                  {zone.description}
                </p>

                {/* Specs Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {zone.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-brand-charcoal/90 border border-brand-border/70 text-xs font-mono text-brand-text-primary"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Equipment Checklist */}
                <div className="pt-4 border-t border-brand-border/50 space-y-2">
                  {zone.equipmentList.map((eq, eIdx) => (
                    <div key={eIdx} className="flex items-center gap-2 text-xs text-brand-text-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-volt shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom 2 Zones: Cable Suite & Conditioning Floor */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FACILITY_ZONES.slice(2, 4).map((zone) => (
            <StaggerItem
              key={zone.id}
              className="p-6 sm:p-8 rounded-2xl bg-brand-surface/70 border border-brand-border/80 hover:border-brand-volt/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded bg-brand-volt/10 border border-brand-volt/30 text-brand-volt font-mono text-[10px] font-bold tracking-widest uppercase">
                    {zone.category}
                  </span>
                  <Dumbbell className="w-4 h-4 text-brand-text-muted" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mb-2">
                  {zone.title}
                </h3>
                <p className="text-xs font-mono text-brand-volt mb-3 font-semibold">
                  {zone.tagline}
                </p>
                <p className="text-sm text-brand-text-secondary leading-relaxed mb-6 font-light">
                  {zone.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {zone.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-brand-charcoal/80 border border-brand-border/60 text-xs font-mono text-brand-text-primary"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border/50 space-y-2">
                {zone.equipmentList.map((eq, eIdx) => (
                  <div key={eIdx} className="flex items-center gap-2 text-xs text-brand-text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-volt shrink-0" />
                    <span>{eq}</span>
                  </div>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Floor Cleanliness & Safety Badge */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="mt-12 p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-brand-text-muted">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-brand-volt" />
              <span>DAILY RE-RACKING & HYGIENE PROTOCOLS STRICTLY ENFORCED</span>
            </div>
            <span className="text-brand-text-secondary">Timmappa Colony, Yemmiganur</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
