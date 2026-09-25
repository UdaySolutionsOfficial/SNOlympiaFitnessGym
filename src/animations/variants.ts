import { MOTION_DURATIONS, MOTION_EASINGS } from './motionTokens';

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.reveal,
      ease: MOTION_EASINGS.athleticOut,
      delay: customDelay,
    },
  }),
};

export const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.reveal,
      ease: MOTION_EASINGS.athleticOut,
      delay: customDelay,
    },
  }),
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const cardHoverVariants = {
  rest: { y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  hover: { y: -4, transition: { duration: 0.25, ease: MOTION_EASINGS.athleticOut } },
};
