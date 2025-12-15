/**
 * Hybetech Design System - Token Exports
 *
 * Central export point for all design tokens.
 * Import from here to access any token.
 *
 * @example
 * import { colors, typography, spacing } from '@/design-tokens';
 */

// Color tokens
export { colors, accessiblePairs, focusRing as focusRingColors } from './colors';

// Typography tokens
export { typography, textStyles, fluidType } from './typography';

// Spacing tokens
export {
  spacing,
  sectionSpacing,
  containerWidths,
  contentWidths,
  breakpoints,
  zIndex,
  semanticSpacing,
} from './spacing';

// Component tokens
export {
  borderRadius,
  shadow,
  transition,
  opacity,
  blur,
  borderWidth,
  componentTokens,
  focusRing,
} from './components';

// Animation tokens
export {
  default as animations,
  duration,
  easing,
  cssEasing,
  motionPresets,
  scrollPresets,
  interactionPresets,
  pageTransitions,
  keyframes,
  reducedMotion,
} from './animations';

/**
 * Theme object
 *
 * Combines all tokens into a single theme object.
 * Useful for theme providers or CSS-in-JS solutions.
 */
import { colors, accessiblePairs } from './colors';
import { typography, textStyles, fluidType } from './typography';
import {
  spacing,
  sectionSpacing,
  containerWidths,
  contentWidths,
  breakpoints,
  zIndex,
  semanticSpacing,
} from './spacing';
import {
  borderRadius,
  shadow,
  transition,
  opacity,
  blur,
  borderWidth,
  componentTokens,
  focusRing,
} from './components';
import animations from './animations';

export const theme = {
  colors,
  accessiblePairs,
  typography,
  textStyles,
  fluidType,
  spacing,
  sectionSpacing,
  containerWidths,
  contentWidths,
  breakpoints,
  zIndex,
  semanticSpacing,
  borderRadius,
  shadow,
  transition,
  opacity,
  blur,
  borderWidth,
  componentTokens,
  focusRing,
  animations,
} as const;

export type Theme = typeof theme;

export default theme;
