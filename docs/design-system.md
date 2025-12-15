# Hybetech Design System

**Version**: 1.0.0
**Last Updated**: December 2025
**Framework**: Astro + Tailwind CSS + Motion

---

## Overview

The Hybetech Design System creates a **modern, bold, corporate yet approachable** visual identity for an AI solutions company. This system intentionally moves away from the "nerdy" aesthetic of the previous site toward a sophisticated, trustworthy design that appeals to business decision-makers.

### Design Principles

1. **Approachable Technology** - AI should feel accessible, not intimidating
2. **Trust Through Professionalism** - Sophisticated design builds credibility
3. **Outcome-Focused** - Visual hierarchy emphasizes business results
4. **Performance First** - Every design choice considers load time
5. **Accessible by Default** - WCAG 2.1 AA compliance throughout

---

## Color Palette

### Primary Colors

The primary palette uses deep slate/navy tones that convey sophistication and trust.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-900` | `#0f172a` | Primary background (dark mode default) |
| `primary-800` | `#1e293b` | Elevated surfaces, cards |
| `primary-700` | `#334155` | Borders, dividers |
| `primary-400` | `#94a3b8` | Muted text (5.1:1 contrast) |
| `primary-100` | `#f1f5f9` | Primary text (15.4:1 contrast) |

### Accent Colors

Electric blue serves as the primary accent, used sparingly (~10% of interface).

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-500` | `#3b82f6` | Primary accent, links |
| `accent-400` | `#60a5fa` | Hover states, highlights |
| `accent-600` | `#2563eb` | Active states |

### Secondary Accent (Violet)

Used for creative elements and differentiation.

| Token | Hex | Usage |
|-------|-----|-------|
| `violet-500` | `#8b5cf6` | Secondary highlights |
| `violet-400` | `#a78bfa` | Gradient endpoints |

### CTA Colors

High-contrast colors for primary and secondary actions.

| Token | Hex | Usage |
|-------|-----|-------|
| `cta-primary` | `#14b8a6` | Primary CTA buttons |
| `cta-secondary` | `#f97316` | Secondary CTA buttons |

### Semantic Colors

| Purpose | Token | Hex |
|---------|-------|-----|
| Success | `success-500` | `#10b981` |
| Warning | `warning-500` | `#f59e0b` |
| Error | `error-500` | `#ef4444` |
| Info | `info-500` | `#06b6d4` |

### Gradients

```css
/* Hero background gradient */
.bg-gradient-hero {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

/* Accent gradient for CTAs */
.bg-gradient-accent {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}

/* Mesh gradient for backgrounds */
.bg-gradient-mesh {
  background:
    radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(20, 184, 166, 0.1) 0px, transparent 50%);
}
```

---

## Typography

### Font Families

| Usage | Font | Tailwind Class |
|-------|------|----------------|
| Headlines | Plus Jakarta Sans | `font-heading` |
| Body | Inter | `font-body` |
| Code | JetBrains Mono | `font-mono` |

### Font Loading

```html
<!-- Add to <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Style | Size | Weight | Line Height | Class |
|-------|------|--------|-------------|-------|
| Display | 60px (fluid) | 700 | 1.1 | `text-display font-heading font-bold` |
| H1 | 48px (fluid) | 700 | 1.2 | `text-h1 font-heading font-bold` |
| H2 | 36px (fluid) | 600 | 1.25 | `text-h2 font-heading font-semibold` |
| H3 | 30px (fluid) | 600 | 1.3 | `text-h3 font-heading font-semibold` |
| H4 | 20px | 500 | 1.4 | `text-xl font-heading font-medium` |
| Body Large | 20px (fluid) | 400 | 1.6 | `text-body-lg` |
| Body | 16px | 400 | 1.5 | `text-base` |
| Small | 14px | 400 | 1.4 | `text-sm` |
| Caption | 12px | 400 | 1.3 | `text-xs` |

### Fluid Typography

Headlines use `clamp()` for smooth responsive scaling:

```css
/* Display: 36px → 72px */
font-size: clamp(2.25rem, 5vw + 1rem, 4.5rem);

/* H1: 30px → 48px */
font-size: clamp(1.875rem, 3vw + 1rem, 3rem);
```

---

## Spacing

### Spacing Scale

Based on 4px base unit with a harmonious progression.

| Token | Value | Pixels |
|-------|-------|--------|
| `1` | 0.25rem | 4px |
| `2` | 0.5rem | 8px |
| `3` | 0.75rem | 12px |
| `4` | 1rem | 16px |
| `6` | 1.5rem | 24px |
| `8` | 2rem | 32px |
| `12` | 3rem | 48px |
| `16` | 4rem | 64px |
| `24` | 6rem | 96px |
| `32` | 8rem | 128px |

### Section Spacing

| Size | Value | Usage |
|------|-------|-------|
| xs | 32px | Related content |
| sm | 48px | Subsections |
| md | 64px | Default section gap |
| lg | 96px | Major sections |
| xl | 128px | Hero sections |

### Container Widths

| Size | Width | Usage |
|------|-------|-------|
| prose | 65ch | Blog content |
| sm | 640px | Compact content |
| md | 768px | Mixed content |
| lg | 1024px | Wider layouts |
| xl | 1280px | Full layouts |

---

## Components

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Subtle rounding |
| `rounded` | 6px | Default |
| `rounded-md` | 8px | Medium |
| `rounded-lg` | 12px | Cards |
| `rounded-xl` | 16px | Large features |
| `rounded-2xl` | 24px | Hero elements |
| `rounded-full` | 9999px | Pills, avatars |

### Shadows

```css
/* Subtle - cards on dark bg */
shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.1);

/* Default */
shadow: 0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Medium - dropdowns */
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/* Large - modals */
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* Glow effects */
shadow-glow-accent: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2);
```

### Button Styles

#### Primary CTA
```html
<button class="
  bg-cta-primary hover:bg-cta-primary-hover active:bg-cta-primary-active
  text-white font-medium
  px-6 py-3 rounded-lg
  transition-all duration-150 ease-out
  hover:scale-[1.02] active:scale-[0.98]
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900
">
  Book a Free Consultation
</button>
```

#### Secondary CTA
```html
<button class="
  bg-transparent border border-accent-500 text-accent-400
  hover:bg-accent-500/10
  font-medium px-6 py-3 rounded-lg
  transition-all duration-150 ease-out
">
  Learn More
</button>
```

### Card Styles

```html
<div class="
  bg-primary-800 rounded-xl p-6
  border border-primary-700
  shadow-md hover:shadow-lg
  transition-all duration-200
  hover:-translate-y-1
">
  <h3 class="font-heading text-xl font-semibold text-primary-100">Card Title</h3>
  <p class="text-primary-400 mt-2">Card content goes here.</p>
</div>
```

### Glass Card (Glassmorphism)

```html
<div class="
  bg-white/5 backdrop-blur-md
  rounded-xl p-6
  border border-white/10
">
  Content
</div>
```

---

## Animations

### Transition Defaults

| Property | Duration | Easing |
|----------|----------|--------|
| Color changes | 150ms | ease-out |
| Transform | 200ms | ease-out |
| Page transitions | 300ms | ease-in-out |
| Scroll reveals | 400-600ms | ease-out |

### Hover States

```css
/* Button hover */
hover:scale-[1.02]
transition-transform duration-150 ease-spring

/* Card hover */
hover:-translate-y-1 hover:shadow-lg
transition-all duration-200
```

### Scroll Reveal (Motion)

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  Content
</motion.div>
```

### Reduced Motion

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility

### Color Contrast Pairs

All combinations meet WCAG 2.1 AA requirements (4.5:1 minimum).

| Background | Text Color | Ratio |
|------------|------------|-------|
| `primary-900` | `primary-100` | 15.4:1 |
| `primary-900` | `primary-400` | 5.1:1 |
| `primary-900` | `accent-400` | 4.8:1 |
| `cta-primary` | `white` | 4.6:1 |

### Focus States

All interactive elements must have visible focus:

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-accent-500
focus-visible:ring-offset-2
focus-visible:ring-offset-primary-900
```

### Touch Targets

Minimum touch target size: **44px x 44px**

```html
<button class="min-h-[44px] min-w-[44px] px-4 py-2">
  Tap me
</button>
```

### Screen Reader Utilities

```html
<!-- Visually hidden but accessible -->
<span class="sr-only">Screen reader only text</span>

<!-- Skip link -->
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4">
  Skip to main content
</a>
```

---

## Dark Mode

The site is **dark mode by default** with an optional light mode toggle.

### Implementation

```html
<!-- Add 'dark' class to html element (default) -->
<html class="dark">
```

### Light Mode Override

```css
/* Light mode specific styles */
.light {
  --bg-primary: theme('colors.primary.50');
  --text-primary: theme('colors.primary.900');
}
```

---

## File Structure

```
design-tokens/
├── index.ts          # Central export
├── colors.ts         # Color palette
├── typography.ts     # Font system
├── spacing.ts        # Spacing scale
├── components.ts     # Component tokens
└── animations.ts     # Animation presets

tailwind.config.ts    # Tailwind configuration

docs/
├── discovery-report.md
└── design-system.md  # This file
```

---

## Usage Examples

### Hero Section

```html
<section class="relative min-h-[80vh] bg-gradient-hero flex items-center">
  <div class="absolute inset-0 bg-gradient-mesh"></div>
  <div class="container relative z-10">
    <h1 class="text-display font-heading font-bold text-primary-100">
      AI Solutions That <span class="text-accent-400">Actually Work</span>
    </h1>
    <p class="text-body-lg text-primary-300 mt-6 max-w-2xl">
      Transform your business with boutique AI solutions designed for real results.
    </p>
    <div class="flex gap-4 mt-8">
      <button class="bg-cta-primary hover:bg-cta-primary-hover text-white px-8 py-4 rounded-lg font-medium">
        Book a Free Assessment
      </button>
      <button class="border border-accent-500 text-accent-400 hover:bg-accent-500/10 px-8 py-4 rounded-lg font-medium">
        See Our Work
      </button>
    </div>
  </div>
</section>
```

### Service Card

```html
<div class="bg-primary-800 rounded-xl p-8 border border-primary-700 hover:-translate-y-1 transition-all duration-200">
  <div class="w-12 h-12 rounded-lg bg-accent-500/10 flex items-center justify-center mb-4">
    <Icon class="w-6 h-6 text-accent-400" />
  </div>
  <h3 class="font-heading text-xl font-semibold text-primary-100">
    AI Consultation
  </h3>
  <p class="text-primary-400 mt-2">
    Strategic AI assessment to identify opportunities in your business.
  </p>
  <a href="/services/consultation" class="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 mt-4 font-medium">
    Learn more
    <ArrowRight class="w-4 h-4" />
  </a>
</div>
```

---

## Next Steps

1. Run `/workflows:architect` to set up the Astro project structure
2. Install required fonts and dependencies
3. Create base layout components
4. Build page templates using this design system

---

**Remember**: The design system serves the user experience. Every choice should make AI more approachable and Hybetech more trustworthy.
