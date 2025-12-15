/**
 * Hybetech Design System - Spacing Tokens
 *
 * Consistent spacing scale based on 4px base unit.
 * Uses a combination of linear and geometric progression
 * for flexibility at all scales.
 */

export const spacing = {
  // Base unit: 4px
  0: '0',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px - touch target minimum
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
};

/**
 * Section Spacing
 *
 * Vertical rhythm for page sections.
 * Provides consistent breathing room between content blocks.
 */
export const sectionSpacing = {
  // Tight - for related content
  xs: spacing[8], // 32px
  // Small - for subsections
  sm: spacing[12], // 48px
  // Medium - default section gap
  md: spacing[16], // 64px
  // Large - major section breaks
  lg: spacing[24], // 96px
  // Extra large - hero sections
  xl: spacing[32], // 128px
  // 2XL - page-level spacing
  '2xl': spacing[40], // 160px
};

/**
 * Container Widths
 *
 * Max-width constraints for content containers.
 */
export const containerWidths = {
  // Narrow - for reading content (blog posts, documentation)
  prose: '65ch', // ~650px for optimal reading width
  // Small - for compact content
  sm: '640px',
  // Medium - for mixed content
  md: '768px',
  // Large - for wider content
  lg: '1024px',
  // Extra large - for full layouts
  xl: '1280px',
  // 2XL - for very wide screens
  '2xl': '1536px',
  // Full - no constraint
  full: '100%',
};

/**
 * Content Widths
 *
 * Common width patterns for UI elements.
 */
export const contentWidths = {
  // Sidebar width
  sidebar: '280px',
  // Navigation max-width
  nav: '1280px',
  // Card widths
  cardSm: '320px',
  cardMd: '400px',
  cardLg: '480px',
  // Form field widths
  inputSm: '200px',
  inputMd: '320px',
  inputLg: '480px',
  inputFull: '100%',
};

/**
 * Breakpoints
 *
 * Mobile-first responsive breakpoints.
 */
export const breakpoints = {
  xs: '320px', // Small mobile
  sm: '640px', // Large mobile / small tablet
  md: '768px', // Tablet
  lg: '1024px', // Small desktop
  xl: '1280px', // Desktop
  '2xl': '1536px', // Large desktop
};

/**
 * Z-Index Scale
 *
 * Layering system to prevent z-index wars.
 */
export const zIndex = {
  // Base layer - default content
  base: '0',
  // Elevated - cards, dropdowns when closed
  elevated: '10',
  // Dropdown - open dropdowns, popovers
  dropdown: '100',
  // Sticky - sticky headers, floating elements
  sticky: '200',
  // Fixed - fixed headers, sidebars
  fixed: '300',
  // Overlay - backdrop overlays
  overlay: '400',
  // Modal - modal dialogs
  modal: '500',
  // Popover - tooltips, popovers on top of modals
  popover: '600',
  // Toast - notification toasts
  toast: '700',
  // Max - highest priority (use sparingly)
  max: '9999',
};

/**
 * Semantic Spacing
 *
 * Named spacing values for common patterns.
 */
export const semanticSpacing = {
  // Inline spacing (horizontal)
  inline: {
    xs: spacing[1], // 4px - icon gaps
    sm: spacing[2], // 8px - tight inline elements
    md: spacing[4], // 16px - default inline gap
    lg: spacing[6], // 24px - wide inline gap
  },

  // Stack spacing (vertical)
  stack: {
    xs: spacing[2], // 8px - tight stacking
    sm: spacing[4], // 16px - paragraph gaps
    md: spacing[6], // 24px - section elements
    lg: spacing[8], // 32px - subsection gaps
    xl: spacing[12], // 48px - section gaps
  },

  // Inset spacing (padding)
  inset: {
    xs: spacing[2], // 8px - compact padding
    sm: spacing[4], // 16px - standard padding
    md: spacing[6], // 24px - comfortable padding
    lg: spacing[8], // 32px - spacious padding
    xl: spacing[12], // 48px - generous padding
  },

  // Page margins
  pageMargin: {
    mobile: spacing[4], // 16px
    tablet: spacing[8], // 32px
    desktop: spacing[16], // 64px
  },

  // Touch targets (minimum 44px)
  touchTarget: spacing[11], // 44px - WCAG minimum
};

export default spacing;
