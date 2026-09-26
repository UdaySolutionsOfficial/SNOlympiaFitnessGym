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
  targetFormat: 'webp' | 'avif' | 'glb' | 'mp4' | 'svg' | 'jpg';
  status: 'PENDING_GENERATION' | 'READY';
}

export const ASSET_MANIFEST = {
  hero: {
    athleteCurlingOlampiya: {
      id: 'hero-athlete-curling-olampiya',
      path: '/assets/images/hero/hero-curling-olampiya.jpg',
      width: 1376,
      height: 768,
      aspectRatio: '16:9',
      alt: 'SN Olympia Fitness front view athlete with curling barbell and Olampiya background typography',
      description: 'Cinematic front-facing muscular athlete with barbell and Olampiya background',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    introVideo: {
      id: 'hero-intro-video',
      path: '/assets/videos/intro-video.mp4',
      width: 1920,
      height: 1080,
      aspectRatio: '16:9',
      alt: 'SN Olympia Fitness intensive training intro video',
      description: 'Cinematic video showcase of Olympia Fitness facilities and training',
      targetFormat: 'mp4',
      status: 'READY',
    } satisfies AssetMeta,
    introVideo2: {
      id: 'hero-intro-video-2',
      path: '/assets/videos/intro-video-2.mp4',
      width: 1920,
      height: 1080,
      aspectRatio: '16:9',
      alt: 'SN Olympia Fitness high energy workout preview',
      description: 'Second dynamic training video showing energy and coaching',
      targetFormat: 'mp4',
      status: 'READY',
    } satisfies AssetMeta,
    athleteDesktop: {
      id: 'hero-athlete-desktop',
      path: '/assets/images/hero/hero-athlete-desktop.jpg',
      width: 2560,
      height: 1440,
      aspectRatio: '16:9',
      alt: 'SN Olympia Fitness Athlete during intensive strength session',
      description: 'Cinematic rim-lit strength athlete in dark atmospheric gym',
      targetFormat: 'jpg',
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
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    athleteCutout: {
      id: 'hero-athlete-cutout',
      path: '/assets/images/hero/hero-athlete-cutout.png',
      width: 1376,
      height: 768,
      aspectRatio: '16:9',
      alt: 'SN Olympia Fitness shredded muscular athlete with arms outstretched and transparent background',
      description: 'Transparent PNG cutout of athlete with black band removed and seamless edge feathering',
      targetFormat: 'webp',
      status: 'READY',
    } satisfies AssetMeta,
    athleteCutoutWebp: {
      id: 'hero-athlete-cutout-webp',
      path: '/assets/images/hero/hero-athlete-cutout.webp',
      width: 1376,
      height: 768,
      aspectRatio: '16:9',
      alt: 'SN Olympia Fitness shredded muscular athlete with arms outstretched',
      description: 'Ultra-compressed transparent WebP cutout of athlete',
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

  about: {
    gymAtmosphere: {
      id: 'about-gym-atmosphere',
      path: '/assets/images/about/about-gym-atmosphere.jpg',
      width: 2560,
      height: 1440,
      aspectRatio: '16:9',
      alt: 'Wide interior view of SN Olympia training floor with dumbbell rack and platforms',
      description: 'Atmospheric heavy dumbbell racks and Olympic power cages with chalk dust',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
  },

  programs: {
    strength: {
      id: 'program-strength-hypertrophy',
      path: '/assets/images/programs/program-strength.jpg',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'Heavy barbell deadlift strength training at SN Olympia',
      description: 'Knurled steel Olympic bar with chalk dust and iron plates',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    conditioning: {
      id: 'program-conditioning-hiit',
      path: '/assets/images/programs/program-conditioning.jpg',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'High-intensity conditioning battle ropes exercise',
      description: 'Dynamic motion blur battle ropes and agility training',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    coaching: {
      id: 'program-personal-coaching',
      path: '/assets/images/programs/program-coaching.jpg',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'One-on-one personal coaching biomechanical analysis',
      description: 'Dedicated trainer spotting and guiding athletic execution',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    womens: {
      id: 'program-womens-fitness',
      path: '/assets/images/programs/program-womens.jpg',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'Women’s functional resistance and strength conditioning',
      description: 'Athletic woman performing focused kettlebell movement on turf',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
  },

  facilities: {
    freeWeights: {
      id: 'facility-free-weights',
      path: '/assets/images/facilities/facility-free-weights.jpg',
      width: 2560,
      height: 1440,
      aspectRatio: '16:9',
      alt: 'Heavy dumbbell rack and free weight zone',
      description: 'Precision urethane dumbbells neatly aligned with floor uplights',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    powerRacks: {
      id: 'facility-power-cages',
      path: '/assets/images/facilities/facility-power-cages.jpg',
      width: 2560,
      height: 1440,
      aspectRatio: '16:9',
      alt: 'Olympic lifting platforms and heavy-duty power racks',
      description: 'Commercial power cages with Olympic bumper plates',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
  },

  gallery: [
    {
      id: 'gallery-01',
      path: '/assets/images/gallery/gallery-01.jpg',
      width: 1080,
      height: 1080,
      aspectRatio: '1:1',
      alt: 'Extreme macro close-up of knurled steel barbell with magnesium chalk',
      description: 'Olympic barbell knurling macro texture',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    {
      id: 'gallery-02',
      path: '/assets/images/gallery/gallery-02.jpg',
      width: 1440,
      height: 1080,
      aspectRatio: '4:3',
      alt: 'Athlete clapping chalk hands with billowing dust in atmospheric gym',
      description: 'Pre-lift chalk clap focus in dark gym environment',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    {
      id: 'gallery-03',
      path: '/assets/images/facilities/facility-free-weights.jpg',
      width: 2560,
      height: 1440,
      aspectRatio: '16:9',
      alt: 'Free weight dumbbell arena perspective down the line',
      description: 'Dumbbell tier line with precision knurling',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
    {
      id: 'gallery-04',
      path: '/assets/images/programs/program-strength.jpg',
      width: 1200,
      height: 800,
      aspectRatio: '3:2',
      alt: 'Heavy barbell deadlift execution on shock-absorbent platform',
      description: 'Heavy compound lift in dark industrial atmosphere',
      targetFormat: 'jpg',
      status: 'READY',
    } satisfies AssetMeta,
  ],

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
};
