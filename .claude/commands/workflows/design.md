# Design System Workflow

Generate a complete design system based on discovery findings.

## Prerequisites

- Discovery phase completed (`/workflows:discover`)
- Discovery report exists at `docs/discovery-report.md`
- CLAUDE.md has design preferences filled in

## Steps

### 1. Load Context

Read and analyze:
- `docs/discovery-report.md` - Discovery findings
- `.wlclaude/CLAUDE.md` - Design preferences
- `.wlclaude/context/design/trends-2025.md` - Current trends
- `.wlclaude/context/design/accessibility.md` - WCAG requirements

### 2. Generate Color Palette

Based on industry, brand, and preferences:

```typescript
// Create design-tokens/colors.ts
export const colors = {
  primary: {
    50: '#...',
    100: '#...',
    // ... through 900
  },
  secondary: { /* same scale */ },
  neutral: { /* same scale */ },
  success: '#...',
  warning: '#...',
  error: '#...',
  info: '#...',
};
```

Ensure:
- Primary color matches brand/industry
- All combinations meet WCAG 4.5:1 contrast
- Light and dark mode considered
- Accessible color pairs documented

### 3. Generate Typography Scale

```typescript
// Create design-tokens/typography.ts
export const typography = {
  fontFamily: {
    heading: 'var(--font-heading)',
    body: 'var(--font-body)',
    mono: 'var(--font-mono)',
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
```

### 4. Generate Spacing Scale

```typescript
// Create design-tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};
```

### 5. Generate Component Patterns

Define patterns for:

```typescript
// Create design-tokens/components.ts
export const components = {
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    default: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  transition: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
};
```

### 6. Generate Tailwind Configuration

```typescript
// Create tailwind.config.ts
import type { Config } from 'tailwindcss';
import { colors } from './design-tokens/colors';
import { typography } from './design-tokens/typography';
import { spacing } from './design-tokens/spacing';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,astro,svelte}'],
  theme: {
    extend: {
      colors,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      spacing,
    },
  },
  plugins: [],
};

export default config;
```

### 7. Create Design System Documentation

Write to `docs/design-system.md`:

```markdown
# Design System: [Project Name]

## Color Palette
[Visual swatches and usage guidelines]

## Typography
[Font selections and hierarchy]

## Spacing
[Spacing scale and usage]

## Components
[Component patterns and variants]

## Accessibility
[Color contrast pairs, focus states]
```

### 8. Validate Accessibility

Run accessibility checks:
- All color combinations meet WCAG 4.5:1
- Touch targets defined as 44px minimum
- Focus states defined
- High contrast mode considered

## Output

At completion:
- `design-tokens/` directory with all tokens
- `tailwind.config.ts` configured
- `docs/design-system.md` documentation
- Accessibility validation passed

## Related Commands

- Previous: `/workflows:discover`
- Next: `/workflows:architect`
- Reference: Master prompt `02-design-system.md`
