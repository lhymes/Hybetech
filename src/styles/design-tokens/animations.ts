/**
 * Hybetech Design System - Animation Tokens
 *
 * Rich but tasteful animations using Motion library patterns.
 * All animations respect prefers-reduced-motion.
 *
 * Animation philosophy:
 * - Enhance, don't distract
 * - GPU-accelerated properties only (transform, opacity)
 * - Consistent timing across the site
 * - Subtle by default, impactful when needed
 */

/**
 * Animation Durations
 *
 * Timing based on perceived performance and user research.
 */
export const duration = {
  instant: 0, // 0ms - immediate
  micro: 100, // 100ms - micro-interactions
  fast: 150, // 150ms - hover, focus
  normal: 200, // 200ms - default transitions
  medium: 300, // 300ms - complex state changes
  slow: 400, // 400ms - page transitions
  slower: 500, // 500ms - large animations
  slowest: 600, // 600ms - scroll reveals
};

/**
 * Easing Functions
 *
 * Named easings for consistent motion feel.
 */
export const easing = {
  // Standard easings
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],

  // Custom easings for personality
  spring: [0.34, 1.56, 0.64, 1], // Bouncy
  smooth: [0.25, 0.1, 0.25, 1], // Smooth
  anticipate: [0.68, -0.55, 0.265, 1.55], // Anticipation + overshoot
};

/**
 * CSS Easing (for non-Motion animations)
 */
export const cssEasing = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
};

/**
 * Motion Presets
 *
 * Pre-configured animation variants for Motion library.
 * Use with framer-motion/motion animate, initial, exit props.
 */
export const motionPresets = {
  // Fade in/out
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.normal / 1000, ease: easing.easeOut },
  },

  // Fade and slide up
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: duration.medium / 1000, ease: easing.easeOut },
  },

  // Fade and slide down
  fadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: duration.medium / 1000, ease: easing.easeOut },
  },

  // Fade and slide left
  fadeLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
    transition: { duration: duration.medium / 1000, ease: easing.easeOut },
  },

  // Fade and slide right
  fadeRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
    transition: { duration: duration.medium / 1000, ease: easing.easeOut },
  },

  // Scale up
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: duration.medium / 1000, ease: easing.spring },
  },

  // Scale down (for overlays, modals)
  scaleDown: {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: duration.medium / 1000, ease: easing.easeOut },
  },

  // Stagger children container
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  // Stagger children item
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.medium / 1000, ease: easing.easeOut },
  },
};

/**
 * Scroll Animation Presets
 *
 * For scroll-triggered animations.
 */
export const scrollPresets = {
  // Simple reveal on scroll
  reveal: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: duration.slowest / 1000, ease: easing.easeOut },
  },

  // Reveal with scale
  revealScale: {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: duration.slowest / 1000, ease: easing.easeOut },
  },

  // Parallax (for use with useScroll + useTransform)
  parallax: {
    slow: 0.5, // Moves at half speed
    normal: 1, // Moves at normal speed
    fast: 1.5, // Moves at 1.5x speed
  },
};

/**
 * Hover & Tap Presets
 *
 * Micro-interactions for buttons and interactive elements.
 */
export const interactionPresets = {
  // Button hover/tap
  button: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: duration.fast / 1000, ease: easing.spring },
  },

  // Card hover
  card: {
    whileHover: {
      y: -4,
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    },
    transition: { duration: duration.normal / 1000, ease: easing.easeOut },
  },

  // Link hover
  link: {
    whileHover: { x: 4 },
    transition: { duration: duration.fast / 1000, ease: easing.easeOut },
  },

  // Icon button
  iconButton: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    transition: { duration: duration.fast / 1000, ease: easing.spring },
  },
};

/**
 * Page Transition Presets
 *
 * For page-level transitions (use with AnimatePresence).
 */
export const pageTransitions = {
  // Simple fade
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.slow / 1000 },
  },

  // Slide and fade
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: duration.slow / 1000, ease: easing.easeInOut },
  },

  // Cross-fade with scale
  crossFade: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: duration.slow / 1000, ease: easing.easeInOut },
  },
};

/**
 * Keyframe Animations (CSS)
 *
 * For CSS animations, to be included in global styles.
 */
export const keyframes = {
  // Pulse animation for CTAs
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `,

  // Subtle glow for accents
  glow: `
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
      50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
    }
  `,

  // Float animation for decorative elements
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,

  // Shimmer for loading states
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `,

  // Spin for loaders
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,

  // Bounce for attention
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
      50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
    }
  `,
};

/**
 * Reduced Motion Alternatives
 *
 * Simplified animations for users who prefer reduced motion.
 */
export const reducedMotion = {
  // Replace transform animations with opacity only
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.01 },
  },

  // Instant state changes
  instant: {
    transition: { duration: 0 },
  },
};

export default {
  duration,
  easing,
  cssEasing,
  motionPresets,
  scrollPresets,
  interactionPresets,
  pageTransitions,
  keyframes,
  reducedMotion,
};
