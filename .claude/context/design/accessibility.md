# Web Accessibility Guide (WCAG 2.1/2.2)

**Purpose**: Ensure all WebLord sites meet accessibility standards
**Standard**: WCAG 2.1 Level AA minimum
**Updated**: December 2025

---

## Core Principles (POUR)

### 1. Perceivable
Users must be able to perceive the information presented.

### 2. Operable
Users must be able to operate the interface.

### 3. Understandable
Users must be able to understand the information and operation.

### 4. Robust
Content must be robust enough for assistive technologies.

---

## Color & Contrast

### Contrast Requirements

```
Normal text (< 18px or < 14px bold):
  Minimum: 4.5:1 contrast ratio

Large text (≥ 18px or ≥ 14px bold):
  Minimum: 3:1 contrast ratio

UI components and graphics:
  Minimum: 3:1 contrast ratio

Focus indicators:
  Minimum: 3:1 contrast ratio
```

### Color Usage

```typescript
// DON'T rely on color alone
<span class="text-red-500">Error</span> // ❌ Color only

// DO use color + text/icon
<span class="text-red-500">
  <ErrorIcon /> Error: Invalid email
</span> // ✅ Color + icon + text

// DON'T use problematic combinations
text-red-500 on bg-green-500 // ❌ Red-green colorblind issue

// DO test with colorblind simulators
```

### Tools for Checking

- WebAIM Contrast Checker
- Chrome DevTools color picker
- Axe browser extension
- WAVE accessibility tool

---

## Keyboard Navigation

### Focus Management

```typescript
// All interactive elements must be focusable
<button>Click me</button> // ✅ Naturally focusable
<div onclick>Click me</div> // ❌ Not focusable

// If using div/span, add tabindex and role
<div role="button" tabindex="0" onKeyDown={handleKeyDown}>
  Click me
</div>

// Focus order must be logical
// DOM order should match visual order
```

### Focus Indicators

```css
/* DON'T remove focus outlines */
*:focus {
  outline: none; /* ❌ Never do this */
}

/* DO customize focus styles visibly */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Or use ring utilities in Tailwind */
.focus-visible:ring-2 .focus-visible:ring-primary
```

### Keyboard Shortcuts

```typescript
// Common expected behaviors
Enter/Space: Activate buttons
Escape: Close modals, cancel
Arrow keys: Navigate within components
Tab: Move between focusable elements
Shift+Tab: Move backwards
```

---

## Semantic HTML

### Proper Structure

```html
<!-- DO use semantic elements -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<article>...</article>
<aside>...</aside>
<footer>...</footer>

<!-- DON'T use div for everything -->
<div class="header">...</div> <!-- ❌ -->
```

### Heading Hierarchy

```html
<!-- DO maintain proper hierarchy -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
  <h2>Another Section</h2>

<!-- DON'T skip levels -->
<h1>Title</h1>
<h4>Subsection</h4> <!-- ❌ Skipped h2, h3 -->

<!-- Only ONE h1 per page -->
```

### Landmarks

```html
<header role="banner">
<nav role="navigation">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">
<form role="search">
```

---

## Forms

### Labels

```html
<!-- DO associate labels with inputs -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- Or wrap input in label -->
<label>
  Email
  <input type="email" />
</label>

<!-- DON'T use placeholder as label -->
<input placeholder="Email" /> <!-- ❌ Disappears on input -->
```

### Error Messages

```html
<!-- DO describe errors clearly -->
<input
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
/>
<p id="email-error" role="alert">
  Please enter a valid email address
</p>

<!-- DO provide error summary for forms -->
<div role="alert" aria-live="assertive">
  <h2>Please fix the following errors:</h2>
  <ul>
    <li><a href="#email">Email is required</a></li>
  </ul>
</div>
```

### Required Fields

```html
<label for="name">
  Name <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span>
</label>
<input id="name" required aria-required="true" />
```

---

## Images

### Alt Text

```html
<!-- Informative images: describe content -->
<img src="chart.png" alt="Bar chart showing 50% increase in sales Q4 2025" />

<!-- Decorative images: empty alt -->
<img src="decoration.svg" alt="" role="presentation" />

<!-- Complex images: link to description -->
<img src="infographic.png" alt="2025 Market Overview" aria-describedby="desc" />
<p id="desc" class="sr-only">Detailed description...</p>

<!-- Icons with meaning: add text alternative -->
<button aria-label="Close modal">
  <CloseIcon aria-hidden="true" />
</button>
```

### SVG Accessibility

```html
<!-- Decorative SVG -->
<svg aria-hidden="true" focusable="false">...</svg>

<!-- Meaningful SVG -->
<svg role="img" aria-labelledby="svg-title">
  <title id="svg-title">Company Logo</title>
  ...
</svg>
```

---

## Interactive Components

### Buttons vs Links

```html
<!-- Buttons: trigger actions -->
<button onClick={submitForm}>Submit</button>
<button onClick={openModal}>Open Settings</button>

<!-- Links: navigate to URLs -->
<a href="/about">About Us</a>
<a href="#section">Jump to Section</a>

<!-- DON'T use links for actions -->
<a href="#" onClick={doSomething}>Submit</a> <!-- ❌ -->
```

### Modal Dialogs

```typescript
// Modal requirements:
// 1. Focus trap (Tab stays within modal)
// 2. Escape closes modal
// 3. Focus returns to trigger on close
// 4. Background is inert

<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Modal Title</h2>
  ...
  <button onClick={close}>Close</button>
</div>
```

### Accordions

```html
<div>
  <button
    aria-expanded="false"
    aria-controls="panel1"
  >
    Section 1
  </button>
  <div id="panel1" hidden>
    Content for section 1
  </div>
</div>
```

### Tabs

```html
<div role="tablist" aria-label="Settings tabs">
  <button role="tab" aria-selected="true" aria-controls="panel1">
    General
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2">
    Security
  </button>
</div>
<div role="tabpanel" id="panel1">...</div>
<div role="tabpanel" id="panel2" hidden>...</div>
```

---

## Motion & Animation

### Reduced Motion

```css
/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```typescript
// Check preference in JavaScript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Enable animations
}
```

### Animation Guidelines

- Provide pause/stop controls for auto-playing content
- Avoid flashing content (> 3 flashes per second)
- Keep animations subtle and purposeful
- Don't distract from content

---

## Screen Reader Utilities

### Visually Hidden Content

```css
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Skip Links

```html
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Live Regions

```html
<!-- Polite: announce when idle -->
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

<!-- Assertive: announce immediately -->
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

---

## Testing Checklist

### Automated Testing

- [ ] Run axe-core or similar
- [ ] Check with Lighthouse accessibility audit
- [ ] Validate HTML

### Manual Testing

- [ ] Navigate entire site with keyboard only
- [ ] Test with screen reader (VoiceOver, NVDA)
- [ ] Check color contrast
- [ ] Verify focus indicators visible
- [ ] Test zoom to 200%
- [ ] Test with reduced motion

### Common Issues

- [ ] Missing alt text
- [ ] Poor color contrast
- [ ] Missing form labels
- [ ] Inaccessible custom components
- [ ] Focus not visible
- [ ] Keyboard traps
- [ ] Missing skip links
- [ ] Improper heading hierarchy

---

**Remember**: Accessibility benefits everyone, not just users with disabilities.
