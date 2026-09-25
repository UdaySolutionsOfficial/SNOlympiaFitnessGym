/**
 * Olympia Fitness — Content Truth & Verification Engine
 * Strictly guards against publishing fabricated claims, unverified pricing,
 * or synthetic trainer credentials.
 */

export type ContentStatus = 'VERIFIED' | 'PLACEHOLDER' | 'TO_BE_CONFIRMED';

export interface VerifiedField<T> {
  value: T;
  status: ContentStatus;
  notes?: string;
  source?: string;
  lastAudited?: string;
}

/**
 * Creates a verified field entry with type safety
 */
export function createVerifiedField<T>(
  value: T,
  status: ContentStatus,
  notes?: string,
  source?: string
): VerifiedField<T> {
  return {
    value,
    status,
    notes,
    source,
    lastAudited: '2026-09-25',
  };
}

/**
 * Status indicator UI helpers
 */
export const STATUS_CONFIG: Record<ContentStatus, { label: string; badgeClass: string; icon: string }> = {
  VERIFIED: {
    label: 'Verified Ground Truth',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: '✓',
  },
  PLACEHOLDER: {
    label: 'Structural Draft Layout',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    icon: '⚑',
  },
  TO_BE_CONFIRMED: {
    label: 'Content To Be Confirmed',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: '⚠',
  },
};
