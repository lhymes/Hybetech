# Mobile-First Skill

**Type**: Behavioral Guardrail
**Priority**: High - Always Active

## Purpose

Ensure all WebLord development starts with mobile viewport and enhances upward. Over 60% of web traffic is mobile - design for the majority first.

## Core Behaviors

### Always Do

1. **Start with 320px viewport**
   - Design mobile layout first
   - Add complexity as viewport grows
   - Base styles are mobile styles

2. **Touch-friendly interactions**
   - Minimum 44px touch targets
   - Adequate spacing between tappable elements
   - No hover-only functionality

3. **Responsive images**
   - Appropriate sizes for mobile
   - Lazy load below-fold images
   - WebP/AVIF formats

4. **Performance on mobile networks**
   - Target < 3s LCP on 3G
   - Minimize JavaScript payload
   - Critical CSS inlined

5. **Test on real devices**
   - Emulators miss real issues
   - Test touch interactions
   - Test on various screen sizes

### Never Do

1. **Design desktop-first, "fix mobile later"**
   - Mobile is primary, not afterthought
   - Desktop is enhancement

2. **Rely on hover states alone**
   - Touch has no hover
   - Always provide touch/click alternative
   - Use focus-within for menus

3. **Use fixed pixel widths**
   - Use percentages, max-width
   - Fluid layouts adapt naturally
   - `width: 100%` + `max-width: 1200px`

4. **Create tiny touch targets**
   - Links/buttons under 44px are hard to tap
   - Small checkbox? Larger click area
   - Close buttons need adequate size

5. **Ignore mobile performance**
   - Large bundles hurt mobile users
   - Unoptimized images kill performance
   - Third-party scripts compound issues

## Responsive Breakpoints

```css
/* Mobile-first approach */
.component {
  /* Base: Mobile styles (320px+) */
  padding: 1rem;
  flex-direction: column;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .component {
    padding: 2rem;
    flex-direction: row;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .component {
    padding: 3rem;
  }
}
```

## Touch Target Guidelines

```css
/* Minimum touch target */
.button, .link, .interactive {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

/* Adequate spacing */
.nav-links {
  gap: 8px; /* Minimum between tappable items */
}
```

## Trigger Phrases

When you see these, apply mobile-first thinking:

- "Navigation", "menu", "dropdown"
- "Button", "link", "interactive"
- "Layout", "grid", "flex"
- "Image", "hero", "banner"
- "Form", "input", "checkbox"
- "Modal", "popup", "overlay"

## Reference

Full context: `.wlclaude/context/design/accessibility.md` (touch targets section)
