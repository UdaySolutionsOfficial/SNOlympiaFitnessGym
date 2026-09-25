/**
 * SN Olympia Fitness — Deterministic Asset Manifest
 * Single source of truth for all image, video, 3D, and vector assets.
 */

export interface AssetMeta {
  id: string;
  path: string;
  fallbackSvg?: string;
  width: number;
  height: number;
  aspectRatio: string;
  alt: string;
  description: string;
  targetFormat: 'webp' | 'avif' | 'glb' | 'mp4' | 'svg';
  status: 'PENDING_GENERATION' | 'READY';
}

export const ASSET_MANIFEST = {
  hero: {
    athleteDesktop: {
      id: 'hero-athlete-desktop',
      path: '/assets/images/hero/hero-athlete-desktop.jpg',
      width: 2560,
      height: 1440,
      aspectRatio: '16:9',
      alt: 'SN Olympia Fitness Athlete during intensive strength session',
      description: 'Cinematic rim-lit strength athlete in dark atmospheric gym',
      targetFormat: 'webp',
      status: 'READY',
    } satisfies AssetMeta,
    athleteMobile: {
      id: 'hero-athlete-mobile',
      path: '/assets/images/hero/hero-athlete-mobile.jpg',
      width: 1080,
      height: 1920,
      aspectRatio: '9:16',
      alt: 'Athletic portrait composed for mobile viewports',
      description: 'Vertical athletic portrait with dark negative space top/bottom',
      targetFormat: 'webp',
      status: 'READY',
    } satisfies AssetMeta,
    ambientDepth: {
      id: 'hero-ambient-depth',
      path: '/assets/images/hero/hero-ambient-depth.webp',
      width: 1920,
      height: 1080,
      aspectRatio: '16:9',
      alt: 'Atmospheric charcoal smoke and subtle volt backlight',
      description: 'Subtle ambient volumetric lighting texture',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
  },

  programs: {
    strength: {
      id: 'program-strength-hypertrophy',
      path: '/assets/images/programs/program-strength.webp',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'Heavy barbell deadlift strength training at SN Olympia',
      description: 'Knurled steel Olympic bar with chalk dust and iron plates',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
    conditioning: {
      id: 'program-conditioning-hiit',
      path: '/assets/images/programs/program-conditioning.webp',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'High-intensity conditioning battle ropes exercise',
      description: 'Dynamic motion blur battle ropes and agility training',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
    coaching: {
      id: 'program-personal-coaching',
      path: '/assets/images/programs/program-coaching.webp',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'One-on-one personal coaching biomechanical analysis',
      description: 'Dedicated trainer spotting and guiding athletic execution',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
    functional: {
      id: 'program-functional-mobility',
      path: '/assets/images/programs/program-functional.webp',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'Functional fitness and joint mobility exercises',
      description: 'Kettlebell precision movement on athletic turf',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
  },

  facilities: {
    freeWeights: {
      id: 'facility-free-weights',
      path: '/assets/images/facilities/facility-free-weights.webp',
      width: 1400,
      height: 900,
      aspectRatio: '14:9',
      alt: 'Heavy dumbbell rack and free weight zone',
      description: 'Precision urethane dumbbells neatly aligned with floor uplights',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
    powerRacks: {
      id: 'facility-power-cages',
      path: '/assets/images/facilities/facility-power-cages.webp',
      width: 1400,
      height: 900,
      aspectRatio: '14:9',
      alt: 'Olympic lifting platforms and heavy-duty power racks',
      description: 'Commercial power cages with Olympic bumper plates',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
    cardioFloor: {
      id: 'facility-cardio-turf',
      path: '/assets/images/facilities/facility-cardio-turf.webp',
      width: 1400,
      height: 900,
      aspectRatio: '14:9',
      alt: 'Sprint turf and high-end cardio machines',
      description: 'Curved treadmills and athletic sprint track',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
  },

  threeD: {
    signaturePlate: {
      id: '3d-olympic-plate',
      path: '/assets/models/olympic-weight-plate.glb',
      width: 0,
      height: 0,
      aspectRatio: '1:1',
      alt: 'Interactive 3D Olympic Weight Plate with realistic metallic sheen',
      description: 'Signature PBR cast iron and brushed steel weight plate',
      targetFormat: 'glb',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
  },

  cta: {
    crucibleAtmosphere: {
      id: 'cta-crucible-atmosphere',
      path: '/assets/images/cta/cta-atmosphere.webp',
      width: 2560,
      height: 1200,
      aspectRatio: '21:9',
      alt: 'Atmospheric view inside SN Olympia Gym floor',
      description: 'Wide cinematic perspective inviting member action',
      targetFormat: 'webp',
      status: 'PENDING_GENERATION',
    } satisfies AssetMeta,
  }
};
