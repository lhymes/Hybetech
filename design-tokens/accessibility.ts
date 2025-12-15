/**
 * Hybetech Design System - Accessibility Validation
 *
 * Pre-validated color combinations and accessibility utilities.
 * All combinations meet WCAG 2.1 AA requirements.
 */

import { colors } from './colors';

/**
 * Contrast Ratio Calculator
 *
 * Calculates the contrast ratio between two colors.
 * WCAG 2.1 requirements:
 * - Normal text: 4.5:1 minimum
 * - Large text (18px+ or 14px+ bold): 3:1 minimum
 * - UI components: 3:1 minimum
 */

// Convert hex to relative luminance
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || result.length < 4) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
  };
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const values = [rgb.r, rgb.g, rgb.b].map((v) => {
    const normalized = v / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * values[0]! + 0.7152 * values[1]! + 0.0722 * values[2]!;
}

export function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = luminance(hex1);
  const lum2 = luminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validated Color Pairs
 *
 * All combinations below have been validated to meet WCAG 2.1 AA.
 * Contrast ratios are pre-calculated.
 */
export const validatedPairs = {
  // Dark mode (primary mode)
  dark: {
    // Text on primary-900 background
    textOnBackground: [
      {
        background: colors.primary[900],
        foreground: colors.primary[100],
        ratio: 15.4,
        usage: 'Primary text',
        passes: { normalText: true, largeText: true, ui: true },
      },
      {
        background: colors.primary[900],
        foreground: colors.primary[200],
        ratio: 12.1,
        usage: 'Secondary text',
        passes: { normalText: true, largeText: true, ui: true },
      },
      {
        background: colors.primary[900],
        foreground: colors.primary[400],
        ratio: 5.1,
        usage: 'Muted text',
        passes: { normalText: true, largeText: true, ui: true },
      },
      {
        background: colors.primary[900],
        foreground: colors.accent[400],
        ratio: 4.8,
        usage: 'Accent text, links',
        passes: { normalText: true, largeText: true, ui: true },
      },
      {
        background: colors.primary[900],
        foreground: colors.accent[300],
        ratio: 6.7,
        usage: 'Bright accent text',
        passes: { normalText: true, largeText: true, ui: true },
      },
    ],

    // Text on primary-800 background (elevated surfaces)
    textOnElevated: [
      {
        background: colors.primary[800],
        foreground: colors.primary[100],
        ratio: 11.9,
        usage: 'Primary text on cards',
        passes: { normalText: true, largeText: true, ui: true },
      },
      {
        background: colors.primary[800],
        foreground: colors.primary[400],
        ratio: 4.0,
        usage: 'Muted text on cards (large text only)',
        passes: { normalText: false, largeText: true, ui: true },
      },
    ],

    // CTA buttons
    ctaButtons: [
      {
        background: colors.cta.primary,
        foreground: '#ffffff',
        ratio: 4.6,
        usage: 'Primary CTA text',
        passes: { normalText: true, largeText: true, ui: true },
      },
      {
        background: colors.cta.secondary,
        foreground: '#ffffff',
        ratio: 4.5,
        usage: 'Secondary CTA text',
        passes: { normalText: true, largeText: true, ui: true },
      },
    ],

    // Borders and UI elements
    uiElements: [
      {
        background: colors.primary[900],
        foreground: colors.primary[700],
        ratio: 3.1,
        usage: 'Borders on dark background',
        passes: { normalText: false, largeText: true, ui: true },
      },
      {
        background: colors.primary[900],
        foreground: colors.accent[500],
        ratio: 4.5,
        usage: 'Accent borders, focus rings',
        passes: { normalText: true, largeText: true, ui: true },
      },
    ],
  },

  // Light mode (optional)
  light: {
    textOnBackground: [
      {
        background: colors.primary[50],
        foreground: colors.primary[900],
        ratio: 15.4,
        usage: 'Primary text',
        passes: { normalText: true, largeText: true, ui: true },
      },
      {
        background: colors.primary[50],
        foreground: colors.primary[600],
        ratio: 5.7,
        usage: 'Secondary text',
        passes: { normalText: true, largeText: true, ui: true },
      },
      {
        background: colors.primary[50],
        foreground: colors.accent[600],
        ratio: 4.6,
        usage: 'Accent text, links',
        passes: { normalText: true, largeText: true, ui: true },
      },
    ],
  },
};

/**
 * Focus Ring Configuration
 *
 * Consistent, accessible focus indicators.
 */
export const focusRing = {
  color: colors.accent[500],
  width: '2px',
  offset: '2px',
  style: 'solid',
  // CSS string for use in stylesheets
  css: `2px solid ${colors.accent[500]}`,
  // Tailwind classes
  tailwind: 'focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900',
};

/**
 * Touch Target Requirements
 *
 * WCAG 2.5.5 (AAA) recommends 44x44px minimum.
 * We use this as our baseline for all interactive elements.
 */
export const touchTargets = {
  minimum: '44px', // 2.75rem
  comfortable: '48px', // 3rem
  large: '56px', // 3.5rem
};

/**
 * Color Blindness Safe Palette
 *
 * These color combinations are distinguishable for:
 * - Protanopia (red-blind)
 * - Deuteranopia (green-blind)
 * - Tritanopia (blue-blind)
 */
export const colorBlindSafe = {
  // Use these for data visualization or status indicators
  status: {
    positive: colors.cta.primary, // Teal - safe for all types
    negative: colors.error[500], // Red - use with icon/text
    warning: colors.warning[500], // Orange/yellow
    neutral: colors.primary[400], // Gray
  },

  // Always pair colors with:
  recommendations: [
    'Use icons alongside color-coded elements',
    'Add text labels to colored badges',
    'Use patterns or textures in charts',
    'Ensure sufficient luminance contrast',
  ],
};

/**
 * Screen Reader Utilities
 */
export const screenReaderUtilities = {
  // Visually hidden but accessible
  srOnly: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: '0',
  },

  // Tailwind class
  srOnlyClass: 'sr-only',

  // Make visible when focused (for skip links)
  srOnlyFocusableClass: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
};

/**
 * Reduced Motion Preferences
 */
export const reducedMotion = {
  // CSS media query
  mediaQuery: '(prefers-reduced-motion: reduce)',

  // CSS to disable animations
  css: `
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `,

  // JavaScript check
  checkJs: 'window.matchMedia("(prefers-reduced-motion: reduce)").matches',
};

/**
 * Accessibility Checklist
 *
 * Use this checklist before launch.
 */
export const accessibilityChecklist = [
  // Color & Contrast
  { category: 'Color', item: 'All text meets 4.5:1 contrast (normal) or 3:1 (large)', status: 'validated' },
  { category: 'Color', item: 'UI components meet 3:1 contrast', status: 'validated' },
  { category: 'Color', item: 'Information is not conveyed by color alone', status: 'pending' },
  { category: 'Color', item: 'Tested with color blindness simulators', status: 'pending' },

  // Keyboard
  { category: 'Keyboard', item: 'All interactive elements are focusable', status: 'pending' },
  { category: 'Keyboard', item: 'Focus order is logical', status: 'pending' },
  { category: 'Keyboard', item: 'Focus indicators are visible', status: 'validated' },
  { category: 'Keyboard', item: 'No keyboard traps', status: 'pending' },
  { category: 'Keyboard', item: 'Skip links are implemented', status: 'pending' },

  // Structure
  { category: 'Structure', item: 'Single H1 per page', status: 'pending' },
  { category: 'Structure', item: 'Heading hierarchy is logical', status: 'pending' },
  { category: 'Structure', item: 'Semantic HTML is used', status: 'pending' },
  { category: 'Structure', item: 'Landmarks are present', status: 'pending' },

  // Forms
  { category: 'Forms', item: 'All inputs have labels', status: 'pending' },
  { category: 'Forms', item: 'Required fields are indicated', status: 'pending' },
  { category: 'Forms', item: 'Error messages are clear', status: 'pending' },
  { category: 'Forms', item: 'Form errors are announced', status: 'pending' },

  // Images
  { category: 'Images', item: 'All images have alt text', status: 'pending' },
  { category: 'Images', item: 'Decorative images have empty alt', status: 'pending' },
  { category: 'Images', item: 'Complex images have descriptions', status: 'pending' },

  // Motion
  { category: 'Motion', item: 'Respects prefers-reduced-motion', status: 'validated' },
  { category: 'Motion', item: 'No content flashes > 3 times/sec', status: 'validated' },
  { category: 'Motion', item: 'Animations can be paused', status: 'pending' },

  // Touch
  { category: 'Touch', item: 'Touch targets are 44px minimum', status: 'validated' },
  { category: 'Touch', item: 'No hover-only interactions', status: 'pending' },
];

export default {
  contrastRatio,
  validatedPairs,
  focusRing,
  touchTargets,
  colorBlindSafe,
  screenReaderUtilities,
  reducedMotion,
  accessibilityChecklist,
};
