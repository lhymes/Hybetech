/**
 * Hybetech Design System - Component Tokens
 *
 * Shared tokens for UI components including:
 * - Border radius
 * - Shadows
 * - Transitions
 * - Opacity
 */

import { colors } from './colors';

/**
 * Border Radius
 *
 * Consistent corner rounding across components.
 * Uses a scale that works well with the modern, approachable aesthetic.
 */
export const borderRadius = {
  none: '0',
  sm: '0.25rem', // 4px - subtle rounding
  default: '0.375rem', // 6px - default
  md: '0.5rem', // 8px - medium
  lg: '0.75rem', // 12px - cards, larger elements
  xl: '1rem', // 16px - prominent rounding
  '2xl': '1.5rem', // 24px - large features
  '3xl': '2rem', // 32px - hero elements
  full: '9999px', // Pills, avatars
};

/**
 * Box Shadows
 *
 * Layered shadow system for elevation.
 * Designed for dark mode as primary, with subtle depth.
 */
export const shadow = {
  // Subtle shadow for cards on dark background
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.1)',

  // Default shadow
  default: '0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

  // Medium elevation - dropdowns, popovers
  md: '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

  // High elevation - modals, dialogs
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

  // Highest elevation
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // Extra large for hero elements
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.35)',

  // Inner shadow for inputs
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',

  // No shadow
  none: '0 0 #0000',

  // Glow effects for accent elements
  glow: {
    accent: `0 0 20px ${colors.accent[500]}40, 0 0 40px ${colors.accent[500]}20`,
    violet: `0 0 20px ${colors.violet[500]}40, 0 0 40px ${colors.violet[500]}20`,
    cta: `0 0 20px ${colors.cta.primary}40`,
  },
};

/**
 * Transitions
 *
 * Animation timing for smooth interactions.
 * All transitions respect prefers-reduced-motion.
 */
export const transition = {
  // Timing functions
  timing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom spring-like easing for micro-interactions
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Smooth easing for larger movements
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },

  // Duration scale
  duration: {
    instant: '0ms',
    fast: '100ms', // Micro-interactions
    normal: '150ms', // Default transitions
    medium: '200ms', // Standard animations
    slow: '300ms', // Complex animations
    slower: '400ms', // Page transitions
    slowest: '500ms', // Large animations
  },

  // Pre-composed transitions
  preset: {
    // For micro-interactions (hover, focus)
    micro: '150ms cubic-bezier(0, 0, 0.2, 1)',
    // For UI state changes
    ui: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    // For page/section transitions
    page: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    // For spring-like animations
    spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    // For smooth entrances
    enter: '400ms cubic-bezier(0, 0, 0.2, 1)',
    // For smooth exits
    exit: '200ms cubic-bezier(0.4, 0, 1, 1)',
  },

  // Property groups (for transition-property)
  properties: {
    none: 'none',
    all: 'all',
    default: 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform',
  },
};

/**
 * Opacity Scale
 *
 * Consistent opacity values for layering and states.
 */
export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  15: '0.15',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
};

/**
 * Backdrop Blur
 *
 * For glassmorphism effects.
 */
export const blur = {
  none: '0',
  sm: '4px',
  default: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
};

/**
 * Border Widths
 */
export const borderWidth = {
  0: '0px',
  default: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
};

/**
 * Component-Specific Tokens
 *
 * Pre-configured values for common components.
 */
export const componentTokens = {
  // Button variants
  button: {
    // Sizes
    sm: {
      height: '2rem', // 32px
      paddingX: '0.75rem', // 12px
      fontSize: '0.875rem', // 14px
      borderRadius: borderRadius.md,
    },
    md: {
      height: '2.5rem', // 40px
      paddingX: '1rem', // 16px
      fontSize: '0.875rem', // 14px
      borderRadius: borderRadius.md,
    },
    lg: {
      height: '2.75rem', // 44px - touch target
      paddingX: '1.5rem', // 24px
      fontSize: '1rem', // 16px
      borderRadius: borderRadius.lg,
    },
    xl: {
      height: '3rem', // 48px
      paddingX: '2rem', // 32px
      fontSize: '1.125rem', // 18px
      borderRadius: borderRadius.lg,
    },
  },

  // Input fields
  input: {
    height: '2.75rem', // 44px - touch target
    paddingX: '1rem',
    fontSize: '1rem',
    borderRadius: borderRadius.md,
    borderWidth: '1px',
  },

  // Cards
  card: {
    borderRadius: borderRadius.xl,
    padding: '1.5rem', // 24px
    shadow: shadow.md,
  },

  // Modal/Dialog
  modal: {
    borderRadius: borderRadius['2xl'],
    padding: '2rem', // 32px
    maxWidth: '32rem', // 512px
    shadow: shadow['2xl'],
  },

  // Navigation
  nav: {
    height: '4rem', // 64px
    heightScrolled: '3.5rem', // 56px
    padding: '1rem',
  },

  // Avatar
  avatar: {
    sm: '2rem', // 32px
    md: '2.5rem', // 40px
    lg: '3rem', // 48px
    xl: '4rem', // 64px
    '2xl': '5rem', // 80px
  },

  // Badge/Chip
  badge: {
    paddingX: '0.5rem', // 8px
    paddingY: '0.125rem', // 2px
    fontSize: '0.75rem', // 12px
    borderRadius: borderRadius.full,
  },
};

/**
 * Focus Ring
 *
 * Consistent focus indicator for accessibility.
 */
export const focusRing = {
  width: '2px',
  offset: '2px',
  color: colors.accent[500],
  style: `2px solid ${colors.accent[500]}`,
  boxShadow: `0 0 0 2px ${colors.accent[500]}`,
};

export default componentTokens;
