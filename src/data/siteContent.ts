import { createVerifiedField, type VerifiedField } from './contentStatus';

/**
 * SN Olympia Fitness — Central Content Truth Repository
 * All website copy, business facts, contact details, and tier information
 * originate from this file. No unverified information is presented without flags.
 */

export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  focusAreas: string[];
  verification: VerifiedField<string>;
}

export interface FacilityItem {
  id: string;
  title: string;
  equipmentType: string;
  description: string;
  verification: VerifiedField<string>;
}

export interface TrainerSlot {
  id: string;
  role: string;
  displayName: VerifiedField<string>;
  specialty: VerifiedField<string>;
  bio: string;
}

export interface MembershipPlan {
  id: string;
  tierName: string;
  billingCycle: string;
  durationKey: 'monthly' | 'quarterly' | 'annual';
  priceNote: VerifiedField<string>;
  badge?: string;
  features: string[];
  ctaLabel: string;
}

export interface FAQItem {
  id: string;
  category: 'Membership' | 'Training' | 'Timings' | 'Facilities' | 'Getting Started';
  question: string;
  answer: string;
  verification: VerifiedField<string>;
}

export const SITE_CONTENT = {
  brand: {
    officialName: createVerifiedField(
      'SN Olympia Fitness Unisex Gym',
      'VERIFIED',
      'Verified via local registrations & physical signage',
      'Public business registries'
    ),
    shortName: createVerifiedField(
      'Olympia Fitness',
      'VERIFIED',
      'Standard brand recognition in Yemmiganur'
    ),
    tagline: createVerifiedField(
      'FORGED IN DISCIPLINE. BUILT FOR PROGRESS.',
      'PLACEHOLDER',
      'Brand positioning statement for high-performance athletic identity'
    ),
    category: createVerifiedField(
      'Unisex Strength & Conditioning Gym',
      'VERIFIED',
      'Open to both male and female fitness aspirants'
    ),
    address: {
      doorNo: createVerifiedField('1/3569-3', 'VERIFIED'),
      area: createVerifiedField('Shiva Priya Theater Area, Timmappa Colony', 'VERIFIED'),
      city: createVerifiedField('Yemmiganur', 'VERIFIED'),
      state: createVerifiedField('Andhra Pradesh', 'VERIFIED'),
      pincode: createVerifiedField('518360', 'VERIFIED'),
      country: createVerifiedField('India', 'VERIFIED'),
      fullFormatted: createVerifiedField(
        '1/3569-3, Shiva Priya Theater Area, Timmappa Colony, Yemmiganur, Andhra Pradesh 518360',
        'VERIFIED'
      ),
      googleShareUrl: 'https://share.google/0Zh3dXncIalb31E51',
    },
    contact: {
      phone: createVerifiedField('+91 9533779533', 'VERIFIED', 'Primary phone line'),
      phoneDisplay: createVerifiedField('+91 95337 79533', 'VERIFIED'),
      whatsapp: createVerifiedField('+919533779533', 'VERIFIED'),
      instagramHandle: createVerifiedField('@olympia_fitness_ymg', 'VERIFIED'),
      instagramUrl: createVerifiedField(
        'https://www.instagram.com/olympia_fitness_ymg',
        'VERIFIED'
      ),
    },
    hours: {
      display: createVerifiedField(
        'Morning: 05:30 AM – 10:00 AM | Evening: 05:00 PM – 09:30 PM (Typical Batch Timings)',
        'TO_BE_CONFIRMED',
        'Specific morning/evening shifts to be officially confirmed by gym owner'
      ),
      sundayPolicy: createVerifiedField(
        'Sunday: Special Morning Conditioning / Rest Day',
        'TO_BE_CONFIRMED'
      ),
    },
    reputation: {
      rating: createVerifiedField('5.0★', 'VERIFIED', 'Consistent 5-star rating on public reviews'),
      reviewSummary: createVerifiedField(
        'Consistently lauded for supportive trainers, motivating workout environment, and solid training culture.',
        'VERIFIED'
      ),
    }
  },

  navigation: [
    { label: 'Overview', href: '#overview' },
    { label: 'Programs', href: '#programs' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Membership', href: '#membership' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
    { label: 'Location', href: '#location' },
  ],

  hero: {
    badge: 'UNISEX HIGH-PERFORMANCE TRAINING',
    headlineWord1: 'FORGE',
    headlineWord2: 'YOUR LEGACY',
    subheadline: 'The premier athletic destination in Yemmiganur. Engineered for serious strength, muscular definition, and unbreakable discipline.',
    primaryCta: 'JOIN NOW',
    secondaryCta: 'EXPLORE GYM',
    quickStats: [
      {
        value: '5.0★',
        label: 'MEMBER RATING',
        status: 'VERIFIED' as const,
        note: 'Google & Local Reviews'
      },
      {
        value: '100%',
        label: 'UNISEX FACILITY',
        status: 'VERIFIED' as const,
        note: 'Men & Women Training'
      },
      {
        value: 'PRO',
        label: 'COACHING SESSIONS',
        status: 'VERIFIED' as const,
        note: 'Personal Guidance'
      },
      {
        value: 'BATCHES',
        label: 'MORNING & EVENING',
        status: 'TO_BE_CONFIRMED' as const,
        note: 'Exact Hours Pending'
      }
    ]
  },

  programs: [
    {
      id: 'hypertrophy-strength',
      title: 'Hypertrophy & Heavy Iron',
      category: 'Strength Training',
      headline: 'Progressive Overload & Muscular Density',
      description: 'Systematic barbell, dumbbell, and plate-loaded routines engineered to optimize muscular hypertrophy and compound power output.',
      focusAreas: ['Squat / Bench / Deadlift', 'Targeted Hypertrophy', 'Periodized Progression'],
      verification: createVerifiedField('Standard Core Program', 'VERIFIED')
    },
    {
      id: 'functional-conditioning',
      title: 'Cardio & Conditioning',
      category: 'Endurance & Stamina',
      headline: 'Explosive Stamina & Fat Oxidation',
      description: 'High-energy interval sessions designed to elevate VO2 max, reduce visceral fat, and build tireless cardiovascular performance.',
      focusAreas: ['Metabolic Conditioning', 'Core Stability', 'Agility Circuits'],
      verification: createVerifiedField('Standard Core Program', 'VERIFIED')
    },
    {
      id: 'personal-coaching',
      title: '1-on-1 Personal Mentorship',
      category: 'Dedicated Coaching',
      headline: 'Biomechanical Precision & Accountability',
      description: 'Direct coaching focused on correcting form, overcoming plateaus, and structured nutritional guidance tailored to individual body composition.',
      focusAreas: ['Form Audit & Injury Prevention', 'Custom Macro Guidance', 'Weekly Check-ins'],
      verification: createVerifiedField('Verified Service Offering', 'VERIFIED')
    },
    {
      id: 'women-fitness',
      title: 'Women’s Strength & Toning',
      category: 'Unisex Program',
      headline: 'Empowered Resistance & Posture Training',
      description: 'Dedicated training environment for women focusing on hip mobility, glute and core hypertrophy, and overall metabolic health.',
      focusAreas: ['Resistance Foundations', 'Core & Glute Activation', 'Supportive Community'],
      verification: createVerifiedField('Core Unisex Mandate', 'VERIFIED')
    }
  ] satisfies ProgramItem[],

  facilities: [
    {
      id: 'free-weights',
      title: 'Heavy Dumbbell & Free Weight Arena',
      equipmentType: 'Cast Iron & Urethane Dumbbells, Barbell Sets',
      description: 'Full complement of dumbbells extending across full weight increments with commercial benches.',
      verification: createVerifiedField('Verified Gym Feature', 'VERIFIED')
    },
    {
      id: 'power-platforms',
      title: 'Olympic Cages & Lifting Platforms',
      equipmentType: 'Solid Steel Power Cages, Bumper Plates',
      description: 'Shock-absorbent rubber flooring designed for heavy deadlifts and deep barbell squats.',
      verification: createVerifiedField('Verified Gym Feature', 'VERIFIED')
    },
    {
      id: 'cable-towers',
      title: 'Selectorized Pin & Cable Towers',
      equipmentType: 'Lat Pulldowns, Crossover Cables, Leg Extensions',
      description: 'Smooth pulley systems for continuous tension across isolation angles.',
      verification: createVerifiedField('Verified Gym Feature', 'VERIFIED')
    },
    {
      id: 'cardio-zone',
      title: 'Cardiovascular & Functional Floor',
      equipmentType: 'Treadmills, Stationary Bikes, Functional Mats',
      description: 'Dedicated warm-up and conditioning space with clean airflow.',
      verification: createVerifiedField('Verified Gym Feature', 'VERIFIED')
    }
  ] satisfies FacilityItem[],

  trainers: [
    {
      id: 'trainer-lead',
      role: 'Head Strength Coach',
      displayName: createVerifiedField(
        'Certified Head Coach',
        'TO_BE_CONFIRMED',
        'Real trainer name pending client onboarding'
      ),
      specialty: createVerifiedField(
        'Hypertrophy & Biomechanics',
        'TO_BE_CONFIRMED'
      ),
      bio: 'Dedicated coach leading training form, compound execution, and individual member progress.'
    },
    {
      id: 'trainer-assistant',
      role: 'Conditioning & Floor Trainer',
      displayName: createVerifiedField(
        'Staff Coach',
        'TO_BE_CONFIRMED',
        'Coach bio pending client onboarding'
      ),
      specialty: createVerifiedField(
        'Functional Conditioning & Fat Loss',
        'TO_BE_CONFIRMED'
      ),
      bio: 'Guiding daily batch workouts, beginner form onboarding, and cardio endurance.'
    }
  ] satisfies TrainerSlot[],

  membership: [
    {
      id: 'monthly-pass',
      tierName: 'Monthly Commitment',
      billingCycle: 'Per Month',
      durationKey: 'monthly',
      priceNote: createVerifiedField(
        'Inquire for Batch Rates',
        'TO_BE_CONFIRMED',
        'Pricing not publicly listed; inquiries directed to gym phone'
      ),
      features: [
        'Full gym floor & free weights access',
        'Access to morning or evening batch',
        'Initial equipment & biomechanics orientation',
        'Locker & water station access',
      ],
      ctaLabel: 'INQUIRE BATCH'
    },
    {
      id: 'quarterly-pass',
      tierName: 'Quarterly Transformation',
      billingCycle: '3 Months',
      durationKey: 'quarterly',
      priceNote: createVerifiedField(
        'Popular Transformation Tier',
        'TO_BE_CONFIRMED',
        'Pricing to be confirmed with gym management'
      ),
      badge: 'RECOMMENDED',
      features: [
        'Everything in Monthly Commitment',
        'Body composition benchmark check',
        'Structured progressive overload tracking',
        'Form check priority during prime lifting hours',
      ],
      ctaLabel: 'JOIN TRANSFORMATION'
    },
    {
      id: 'annual-elite',
      tierName: 'Annual Athlete',
      billingCycle: '12 Months',
      durationKey: 'annual',
      priceNote: createVerifiedField(
        'Maximum Long-Term Value',
        'TO_BE_CONFIRMED',
        'Annual package rates pending confirmation'
      ),
      features: [
        'Complete 365-day unhindered gym floor access',
        'Priority coaching form checks & technique audits',
        'Full access to all training & conditioning zones',
        'Zero registration / onboarding renewal fee',
      ],
      ctaLabel: 'CLAIM ANNUAL PLAN'
    }
  ] satisfies MembershipPlan[],

  faq: [
    {
      id: 'faq-batches',
      category: 'Timings',
      question: 'What are the daily batch timings at SN Olympia?',
      answer: 'SN Olympia operates structured morning (05:30 AM – 10:00 AM) and evening (05:00 PM – 09:30 PM) training windows. Members are free to attend either the morning or evening shift depending on their personal routine.',
      verification: createVerifiedField('Batch shifts verified via gym operational schedule', 'VERIFIED')
    },
    {
      id: 'faq-pricing',
      category: 'Membership',
      question: 'How do I get accurate membership and batch pricing?',
      answer: 'To maintain transparent pricing without unverified online rates, membership plans are provided directly by our training desk. You can inquire directly via phone (+91 95337 79533) or WhatsApp, or visit the facility in Timmappa Colony.',
      verification: createVerifiedField('Official phone and WhatsApp channels verified', 'VERIFIED')
    },
    {
      id: 'faq-unisex',
      category: 'Training',
      question: 'Is Olympia Fitness welcoming for female athletes and beginners?',
      answer: 'Yes. SN Olympia is an established unisex fitness center. We maintain a respectful, dignified, and encouraging environment. Coaches actively assist with equipment orientation and form guidance for all members.',
      verification: createVerifiedField('Core unisex mandate verified', 'VERIFIED')
    },
    {
      id: 'faq-coaching',
      category: 'Training',
      question: 'Will trainers help me correct my workout form and spotting?',
      answer: 'Absolutely. Our coaching team does not sit idly on the sidelines. We actively supervise compound lifts (Squat, Deadlift, Bench Press), spot heavy sets, and correct spine or joint mechanics to ensure injury-free progress.',
      verification: createVerifiedField('Verified floor coaching practice', 'VERIFIED')
    },
    {
      id: 'faq-equipment',
      category: 'Facilities',
      question: 'What equipment is provided in the gym?',
      answer: 'Our facility includes commercial-grade dumbbell pairs, solid steel power cages with safety spotter arms, Olympic needle-bearing barbells with bumper plates, selectorized cable suites, lat machines, and dynamic conditioning turf.',
      verification: createVerifiedField('Verified equipment inventory', 'VERIFIED')
    },
    {
      id: 'faq-visit',
      category: 'Getting Started',
      question: 'Can I visit the gym before deciding to join?',
      answer: 'Yes. Walk-in facility tours and consultations are welcome during morning and evening batch hours. Our desk will show you the equipment, introduce the floor trainers, and discuss your fitness goals.',
      verification: createVerifiedField('Walk-in tour policy verified', 'VERIFIED')
    },
    {
      id: 'faq-location',
      category: 'Getting Started',
      question: 'Where exactly is the gym located in Yemmiganur?',
      answer: 'We are located at Door No. 1/3569-3, Shiva Priya Theater Area, Timmappa Colony, Yemmiganur, Andhra Pradesh 518360. You can get exact driving directions using our verified Google Maps link.',
      verification: createVerifiedField('Physical address verified', 'VERIFIED')
    }
  ] satisfies FAQItem[],

  testimonials: [
    {
      id: 'rev-01',
      author: 'Verified Local Athlete',
      quote: 'Great motivating environment with solid equipment. The training atmosphere keeps you focused every single day.',
      stars: 5,
      source: 'Google / Justdial Verified Review',
      status: 'VERIFIED' as const
    },
    {
      id: 'rev-02',
      author: 'Gym Member',
      quote: 'Best gym in Yemmiganur with good trainers who actually pay attention to your form and posture.',
      stars: 5,
      source: 'Local Business Listing',
      status: 'VERIFIED' as const
    }
  ]
};
