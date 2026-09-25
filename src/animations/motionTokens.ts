/**
 * Olympia Fitness — Motion Tokens & Physical Timing Registry
 */

export const MOTION_DURATIONS = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  reveal: 0.6,
  cinematic: 0.9,
  heroSlow: 1.2,
} as const;

export const MOTION_EASINGS = {
  // Snappy athletic response with weighted physical settling
  athleticOut: [0.16, 1, 0.3, 1] as const,
  // Explosive departure
  powerOut: [0.22, 1, 0.36, 1] as const,
  // Smooth natural editorial transitions
  editorial: [0.25, 0.1, 0.25, 1] as const,
  // Standard linear
  linear: [0, 0, 1, 1] as const,
} as const;

export const MOTION_DISTANCES = {
  subtle: 12,
  standard: 24,
  dramatic: 48,
} as const;

export const MOTION_SPRINGS = {
  tactile: { type: 'spring', stiffness: 400, damping: 25 },
  fluid: { type: 'spring', stiffness: 200, damping: 20 },
  dock: { type: 'spring', stiffness: 320, damping: 28 },
} as const;
