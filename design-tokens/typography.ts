/**
 * Hybetech Design System - Typography Tokens
 *
 * Font strategy:
 * - Headlines: Space Grotesk - tech-forward, distinctive, memorable
 * - Body: Inter - clean, highly legible, designed for screens
 *
 * This combination balances technical credibility with approachability,
 * avoiding the "nerdy" feel while maintaining modern tech aesthetics.
 */

export const typography = {
  /**
   * Font Families
   *
   * Using CSS custom properties for easy theme switching
   * and consistent font fallbacks.
   */
  fontFamily: {
    // Headlines - Space Grotesk
    // Quirky, tech-forward, creates visual interest
    heading: [
      'Space Grotesk',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(', '),

    // Body text - Inter
    // Optimized for screens, excellent legibility at all sizes
    body: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'sans-serif',
    ].join(', '),

    // Monospace - for code snippets, technical content
    mono: [
      'JetBrains Mono',
      'Fira Code',
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ].join(', '),
  },

  /**
   * Font Sizes
   *
   * Based on a modular scale (1.25 ratio) for harmonious sizing.
   * All sizes include line-height for optimal readability.
   */
  fontSize: {
    // Extra small - captions, labels
    xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
    // Small - secondary text, metadata
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    // Base - body text
    base: ['1rem', { lineHeight: '1.5rem' }], // 16px
    // Large - emphasized body, lead paragraphs
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    // Extra large - subheadings
    xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    // 2XL - section headings
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    // 3XL - page subheadings
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    // 4XL - page headings
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    // 5XL - hero subheadings
    '5xl': ['3rem', { lineHeight: '1.2' }], // 48px
    // 6XL - hero headings
    '6xl': ['3.75rem', { lineHeight: '1.1' }], // 60px
    // 7XL - display headings
    '7xl': ['4.5rem', { lineHeight: '1.1' }], // 72px
    // 8XL - large display
    '8xl': ['6rem', { lineHeight: '1' }], // 96px
    // 9XL - extra large display
    '9xl': ['8rem', { lineHeight: '1' }], // 128px
  },

  /**
   * Line Heights
   *
   * Named values for different content types.
   */
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '1.75',
  },

  /**
   * Font Weights
   *
   * Space Grotesk: 300-700
   * Inter: 100-900
   */
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  /**
   * Letter Spacing
   *
   * Tracking adjustments for different sizes.
   * Headlines get tighter, body stays neutral.
   */
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

/**
 * Typography Presets
 *
 * Pre-configured text styles for common use cases.
 * These combine font-family, size, weight, and line-height.
 */
export const textStyles = {
  // Display - Hero headlines
  display: {
    fontFamily: typography.fontFamily.heading,
    fontSize: typography.fontSize['6xl'],
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: typography.lineHeight.tight,
  },

  // H1 - Page titles
  h1: {
    fontFamily: typography.fontFamily.heading,
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: typography.lineHeight.tight,
  },

  // H2 - Section headings
  h2: {
    fontFamily: typography.fontFamily.heading,
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: typography.lineHeight.snug,
  },

  // H3 - Subsection headings
  h3: {
    fontFamily: typography.fontFamily.heading,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.snug,
  },

  // H4 - Card headings
  h4: {
    fontFamily: typography.fontFamily.heading,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.normal,
  },

  // H5 - Small headings
  h5: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.normal,
  },

  // H6 - Overlines, labels
  h6: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.wider,
    lineHeight: typography.lineHeight.normal,
    textTransform: 'uppercase' as const,
  },

  // Body - Default paragraph text
  body: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.relaxed,
  },

  // Body Large - Lead paragraphs
  bodyLarge: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.relaxed,
  },

  // Body Small - Secondary text
  bodySmall: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.normal,
  },

  // Caption - Metadata, labels
  caption: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: typography.letterSpacing.wide,
    lineHeight: typography.lineHeight.normal,
  },

  // Code - Inline code
  code: {
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.normal,
  },

  // Button - Button text
  button: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.wide,
    lineHeight: typography.lineHeight.tight,
  },

  // Button Large - Large button text
  buttonLarge: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: typography.letterSpacing.wide,
    lineHeight: typography.lineHeight.tight,
  },

  // Link - Hyperlink text
  link: {
    fontFamily: typography.fontFamily.body,
    fontWeight: typography.fontWeight.medium,
    textDecoration: 'underline' as const,
    textUnderlineOffset: '2px',
  },

  // Quote - Blockquote text
  quote: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.normal,
    fontStyle: 'italic' as const,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.relaxed,
  },
};

/**
 * Responsive Typography
 *
 * Fluid type scale using clamp() for smooth scaling.
 * Min: mobile (320px), Max: desktop (1280px)
 */
export const fluidType = {
  // Hero display: 36px → 72px
  display: 'clamp(2.25rem, 5vw + 1rem, 4.5rem)',
  // H1: 30px → 48px
  h1: 'clamp(1.875rem, 3vw + 1rem, 3rem)',
  // H2: 24px → 36px
  h2: 'clamp(1.5rem, 2vw + 1rem, 2.25rem)',
  // H3: 20px → 30px
  h3: 'clamp(1.25rem, 1.5vw + 0.75rem, 1.875rem)',
  // Body large: 16px → 20px
  bodyLarge: 'clamp(1rem, 0.5vw + 0.875rem, 1.25rem)',
};

export default typography;
