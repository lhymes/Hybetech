# Accessible-Design Skill

**Type**: Behavioral Guardrail
**Priority**: High - Always Active

## Purpose

Ensure all WebLord development creates websites usable by everyone. Accessibility is not a feature—it's a requirement. WCAG 2.1 AA minimum.

## Core Behaviors

### Always Do

1. **Use semantic HTML**
   - `<button>` not `<div onClick>`
   - `<nav>`, `<main>`, `<header>`, `<footer>`
   - `<article>`, `<section>`, `<aside>`
   - Proper heading hierarchy

2. **Provide text alternatives**
   - Alt text on all images (descriptive or empty for decorative)
   - Captions/transcripts for media
   - Labels for form inputs

3. **Ensure keyboard accessibility**
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order
   - No keyboard traps

4. **Maintain color contrast**
   - 4.5:1 minimum for normal text
   - 3:1 minimum for large text
   - Don't rely on color alone
   - **⚠️ HEADERS ARE HIGH-RISK**: Always validate nav text against header background
   - If dark header → use white/light text
   - If light header → use dark text that passes 4.5:1 (can be bold colors, not just gray!)
   - If transparent header → add backdrop or text shadow for readability

5. **Support screen readers**
   - ARIA only when needed
   - Live regions for dynamic content
   - Skip links for navigation

### Never Do

1. **Remove focus outlines without replacement**
   ```css
   /* BAD */
   *:focus { outline: none; }

   /* GOOD */
   *:focus-visible {
     outline: 2px solid var(--color-primary);
     outline-offset: 2px;
   }
   ```

2. **Use divs for interactive elements**
   ```typescript
   // BAD
   <div onClick={handleClick}>Click me</div>

   // GOOD
   <button onClick={handleClick}>Click me</button>
   ```

3. **Create images without alt text**
   ```typescript
   // BAD
   <img src="/chart.png" />

   // GOOD (informative)
   <img src="/chart.png" alt="Sales chart showing 50% growth" />

   // GOOD (decorative)
   <img src="/decoration.svg" alt="" role="presentation" />
   ```

4. **Rely on color alone for information**
   ```typescript
   // BAD
   <span className="text-red-500">Error</span>

   // GOOD
   <span className="text-red-500">
     <ErrorIcon aria-hidden /> Error: Invalid email
   </span>
   ```

5. **Use dark text on dark backgrounds (or light on light)**
   ```typescript
   // BAD - Dark header with dark text
   <header className="bg-gray-900">
     <nav className="text-gray-700">...</nav>  // ❌ Invisible!
   </header>

   // GOOD - Dark header with light text
   <header className="bg-gray-900">
     <nav className="text-white">...</nav>  // ✓ High contrast
   </header>

   // BAD - Light header with light text
   <header className="bg-white">
     <nav className="text-gray-300">...</nav>  // ❌ Hard to read!
   </header>

   // GOOD - Light header with dark text (gray OR bold colors!)
   <header className="bg-white">
     <nav className="text-gray-800">...</nav>  // ✓ Neutral dark
   </header>
   <header className="bg-white">
     <nav className="text-blue-900">...</nav>  // ✓ Bold dark blue
   </header>
   <header className="bg-white">
     <nav className="text-emerald-900">...</nav>  // ✓ Rich dark green
   </header>
   ```

6. **Create tiny touch/click targets**
   - Minimum 44x44px for touch
   - Adequate spacing between targets
   - Larger click areas for small elements

## Quick Reference

### Form Accessibility
```typescript
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-hint"
  aria-invalid={hasError}
/>
<span id="email-hint">We'll never share your email</span>
{hasError && <span role="alert">Please enter valid email</span>}
```

### Button vs Link
```typescript
// Navigation → Link
<Link href="/about">About Us</Link>

// Action → Button
<button onClick={handleSubmit}>Submit Form</button>
```

### Skip Link
```typescript
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

## WCAG Quick Checklist

- [ ] All images have alt text
- [ ] Color contrast 4.5:1 minimum
- [ ] **Header/nav text visible against background** ← Common failure!
- [ ] Form inputs have labels
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] No content flashes
- [ ] Text resizable to 200%
- [ ] Single H1 per page

## Trigger Phrases

When you see these, apply accessibility thinking:

- "Button", "link", "interactive"
- "Image", "icon", "graphic"
- "Form", "input", "select"
- "Color", "contrast", "theme"
- "Navigation", "menu", "modal"
- "Focus", "click", "tap"

## Reference

Full context: `.wlclaude/context/design/accessibility.md`
