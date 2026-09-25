import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Dumbbell, Award, AlertCircle, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';

interface CoachRole {
  id: string;
  roleTitle: string;
  badge: string;
  focusArea: string;
  description: string;
  responsibilities: string[];
  standards: string[];
}

const COACHING_ROLES: CoachRole[] = [
  {
    id: 'head-coach',
    roleTitle: 'Head Strength Coach & Floor Director',
    badge: 'LEAD SPECIALIST',
    focusArea: 'Biomechanics, Heavy Compound Lifts & Program Architecture',
    description:
      'Directs floor methodology, master lifts (Squat, Deadlift, Bench Press), and progressive loading strategies. Personally ensures that no member performs high-risk movements with compromised form.',
    responsibilities: [
      'Comprehensive form audit & biomechanical screening',
      'Structural periodization for raw strength & hypertrophy',
      'Plateau breakthroughs & customized weight calibrations',
      'Spotter oversight during maximum threshold attempts'
    ],
    standards: ['100% Rep-by-Rep Scrutiny', 'Injury-Free Overload Protocol', 'Targeted Muscle Recruitment']
  },
  {
    id: 'conditioning-trainer',
    roleTitle: 'Conditioning & High-Volume Floor Coach',
    badge: 'CORE FACULTY',
    focusArea: 'Metabolic Conditioning, Functional Circuits & Agility',
    description:
      'Orchestrates high-intensity conditioning waves, interval cardio regimens, and core stabilization routines. Delivers relentless energy to push past mental barriers while monitoring pacing.',
    responsibilities: [
      'High-energy interval and battle rope circuits',
      'Cardiorespiratory threshold pacing and endurance',
      'Movement rhythm and agility conditioning',
      'Fat oxidation and athletic stamina tracking'
    ],
    standards: ['Strict Work-to-Rest Ratios', 'Continuous Heart Rate Awareness', 'Form Maintenance Under Fatigue']
  },
  {
    id: 'functional-trainer',
    roleTitle: 'Unisex Floor Mentor & Movement Specialist',
    badge: 'COMMUNITY MENTOR',
    focusArea: 'Beginner Onboarding, Postural Alignment & Women’s Fitness',
    description:
      'Guides newly enrolled members, female athletes, and individuals rebuilding joint confidence. Creates an unintimidating, welcoming floor environment with attentive posture coaching.',
    responsibilities: [
      'Foundational machine & barbell ergonomics orientation',
      'Glute, hip mobility, and spinal decompressions',
      'Unisex training comfort and technique assurance',
      'Consistent habit formation and weekly check-ins'
    ],
    standards: ['Zero Ego Floor Culture', 'Empowered Unisex Training', 'Adaptive Scaled Exercises']
  }
];

export const TrainersSection: React.FC = () => {
  return (
    <section id="trainers" className="relative py-28 md:py-36 bg-brand-surface/30 overflow-hidden border-t border-brand-border/60">
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-volt/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
              <UserCheck className="w-3.5 h-3.5" />
              Floor Leadership & Mentorship
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              COACHING ROOTED IN{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-emerald-400">
                DISCIPLINE & SAFETY.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
              Equipment is only as effective as the guidance behind it. At Olympia, our coaches aren’t passive bystanders on phones—they actively spot, correct angles, and safeguard your athletic longevity.
            </p>
          </div>

          {/* Strict Content Truth Verification Callout */}
          <div className="lg:max-w-xs p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200/90 text-xs font-mono">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-400 mb-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>CONTENT INTEGRITY</span>
            </div>
            <p className="leading-relaxed text-[11px] text-amber-200/80">
              Individual coach personal dossiers are currently undergoing verification. Roles and floor protocols presented reflect actual daily operational standards at Olympia Fitness.
            </p>
          </div>
        </div>

        {/* 3 Coaching Role Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {COACHING_ROLES.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-brand-surface border border-brand-border/70 hover:border-brand-volt/50 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-glow-volt/10"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-volt/40 to-transparent group-hover:via-brand-volt transition-all duration-500" />

              <div>
                {/* Badge & Step indicator */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded bg-brand-volt/10 border border-brand-volt/30 text-brand-volt font-mono text-[10px] font-bold tracking-widest uppercase">
                    {coach.badge}
                  </span>
                  <span className="text-xs font-mono text-brand-text-muted">
                    ROLE 0{index + 1}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-2 group-hover:text-brand-volt transition-colors">
                  {coach.roleTitle}
                </h3>

                {/* Focus Area */}
                <div className="text-xs font-mono text-emerald-400 mb-4 font-semibold">
                  {coach.focusArea}
                </div>

                {/* Description */}
                <p className="text-sm text-brand-text-secondary leading-relaxed mb-6 font-light">
                  {coach.description}
                </p>

                {/* Floor Responsibilities */}
                <div className="mb-6 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-brand-text-muted">
                    Floor Execution Scope
                  </div>
                  {coach.responsibilities.map((resp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-brand-text-primary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-volt shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Standard Footer */}
              <div className="pt-5 border-t border-brand-border/50">
                <div className="text-[10px] font-mono text-brand-text-muted uppercase tracking-wider mb-2">
                  Non-Negotiable Standards
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {coach.standards.map((std, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-brand-charcoal/80 border border-brand-border/60 text-[10px] font-mono text-brand-text-secondary"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floor Philosophy Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-charcoal/90 via-brand-surface to-brand-charcoal/90 border border-brand-border/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-volt/10 border border-brand-volt/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-volt" />
            </div>
            <div>
              <h4 className="text-lg font-black uppercase text-white tracking-tight">
                The Olympia Floor Commitment
              </h4>
              <p className="text-sm text-brand-text-secondary font-light">
                Whether you lift 20kg or 200kg, you receive the same degree of technical attention, spotter vigilance, and motivational push.
              </p>
            </div>
          </div>

          <a
            href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
            className="w-full md:w-auto text-center px-6 py-3 rounded-lg bg-brand-volt text-brand-dark font-black text-xs uppercase tracking-widest hover:bg-white hover:shadow-glow-volt transition-all duration-300 shrink-0"
          >
            Speak With A Coach
          </a>
        </div>
      </div>
    </section>
  );
};
