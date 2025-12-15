# Animation Libraries Guide

**Purpose**: Modern, performant animations for WebLord websites
**Updated**: December 2025
**Sources**: Motion, GSAP, Lottie official documentation

---

## Overview

Modern web animations enhance user experience when done right. This guide covers:
- Animation library selection
- Performance optimization
- Scroll-triggered animations
- Micro-interactions
- View Transitions API

---

## Library Selection Matrix

| Library | Best For | Bundle Size | Learning Curve | React Support |
|---------|----------|-------------|----------------|---------------|
| **Motion** | React/Next.js projects | 16kb (core) | Easy | Native |
| **GSAP** | Complex sequences, precise control | 60kb | Medium | Via hooks |
| **Lottie** | After Effects animations | 65kb | Easy | Via packages |
| **CSS/View Transitions** | Simple transitions | 0kb | Easy | Native |

### Decision Tree

```
START
  │
  ├─ Using React/Next.js?
  │   ├─ YES → Need complex scroll animations?
  │   │         ├─ YES → GSAP + ScrollTrigger
  │   │         └─ NO → Motion (formerly Framer Motion)
  │   └─ NO → Continue...
  │
  ├─ Have After Effects animations?
  │   └─ YES → Lottie
  │
  ├─ Need precise timeline control?
  │   └─ YES → GSAP
  │
  ├─ Simple transitions only?
  │   └─ YES → CSS + View Transitions API
  │
  └─ Default → Motion (if React) or GSAP (if vanilla)
```

---

## Motion (Recommended for React)

### Why Motion

- **2.5x faster** than GSAP for unknown value animations
- **90% less code** for basic animations
- **Tree-shakeable** - only include what you use
- **10M+ downloads/month** - largest animation library
- **Free since Webflow acquisition** (2024)

### Basic Setup

```bash
npm install motion
```

### Animation Examples

```tsx
// components/AnimatedCard.tsx
import { motion } from 'motion/react';

export function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card"
    >
      {children}
    </motion.div>
  );
}
```

### Scroll Animations

```tsx
// components/ScrollReveal.tsx
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function ScrollReveal({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
```

### Page Transitions (App Router)

```tsx
// app/template.tsx
'use client';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## GSAP (Complex Animations)

### Why GSAP

- **Industry standard** for complex animations
- **ScrollTrigger** - best-in-class scroll animations
- **Timeline control** - precise sequencing
- **Free since Webflow acquisition** (2024)

### Basic Setup

```bash
npm install gsap
```

### ScrollTrigger Example

```tsx
// components/ScrollSection.tsx
'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5, // Smooth scrubbing
          // markers: true, // Enable for debugging
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <section ref={sectionRef}>
      <h2 ref={headingRef}>Animated Heading</h2>
    </section>
  );
}
```

### Pin Section Example

```tsx
// Pin an element while scrolling
useLayoutEffect(() => {
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: true,
    },
    y: -50,
    opacity: 0.5,
  });
}, []);
```

### Timeline Sequences

```tsx
// Complex animation sequence
const tl = gsap.timeline();

tl.from('.logo', { opacity: 0, duration: 0.5 })
  .from('.nav-item', { opacity: 0, y: -20, stagger: 0.1 })
  .from('.hero-text', { opacity: 0, y: 50 }, '-=0.3')
  .from('.hero-button', { scale: 0, ease: 'back.out(1.7)' });
```

---

## Lottie (After Effects Animations)

### When to Use Lottie

- Complex vector animations
- Animated icons and illustrations
- Loading animations
- Onboarding sequences
- Any After Effects export

### Setup

```bash
npm install lottie-react
```

### Usage

```tsx
// components/AnimatedIcon.tsx
import Lottie from 'lottie-react';
import checkAnimation from '@/animations/check.json';

export function AnimatedCheck({ play = true }) {
  return (
    <Lottie
      animationData={checkAnimation}
      loop={false}
      autoplay={play}
      style={{ width: 100, height: 100 }}
    />
  );
}
```

### Loading from URL

```tsx
// components/LottieFromUrl.tsx
import { useLottie } from 'lottie-react';
import { useEffect, useState } from 'react';

export function LottieFromUrl({ url }: { url: string }) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setAnimationData);
  }, [url]);

  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
  });

  return animationData ? View : <div>Loading...</div>;
}
```

### Resources

- [LottieFiles](https://lottiefiles.com/) - Free animations library
- Export from After Effects with Bodymovin plugin

---

## View Transitions API (Native)

### Browser Support

As of October 2025, View Transitions API is Baseline (works in all modern browsers).

### Same-Document Transitions

```css
/* Enable globally */
@view-transition {
  navigation: auto;
}

/* Customize transition */
::view-transition-old(root) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
}
```

### Named Transitions

```tsx
// Give specific elements their own transition
<div style={{ viewTransitionName: 'hero-image' }}>
  <Image src="/hero.jpg" alt="Hero" />
</div>
```

```css
/* Customize specific element transition */
::view-transition-old(hero-image) {
  animation: scale-down 0.5s ease-out;
}

::view-transition-new(hero-image) {
  animation: scale-up 0.5s ease-out;
}
```

### React Integration (Experimental)

```tsx
// React 19+ experimental
import { ViewTransition } from 'react';

function App() {
  return (
    <ViewTransition>
      <Page />
    </ViewTransition>
  );
}
```

---

## Micro-Interactions

### Button Feedback

```tsx
// components/ui/Button.tsx
import { motion } from 'motion/react';

export function Button({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Input Focus

```css
/* Smooth focus transition */
.input {
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
}
```

### Hover Cards

```tsx
// components/HoverCard.tsx
import { motion } from 'motion/react';

export function HoverCard({ children }) {
  return (
    <motion.div
      className="card"
      whileHover={{
        y: -4,
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
```

### Loading States

```tsx
// components/Spinner.tsx
import { motion } from 'motion/react';

export function Spinner() {
  return (
    <motion.div
      className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
}
```

---

## Performance Best Practices

### Respect User Preferences

```tsx
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
}

// Usage
function AnimatedComponent() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
    />
  );
}
```

### CSS Fallback

```css
/* Always provide CSS fallback */
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

### Performance Tips

1. **Use `transform` and `opacity`** - GPU accelerated
2. **Avoid animating `width`, `height`, `top`, `left`** - triggers layout
3. **Use `will-change` sparingly** - only for complex animations
4. **Keep animations under 300ms** for UI feedback
5. **Test on low-end devices** - not just your MacBook Pro

---

## Animation Timing Guidelines

| Type | Duration | Easing |
|------|----------|--------|
| Micro-interaction | 100-200ms | ease-out |
| UI feedback | 150-300ms | ease-out |
| Page transition | 200-400ms | ease-in-out |
| Scroll reveal | 400-600ms | ease-out |
| Complex sequence | 500-1000ms | custom |

---

**Remember**: Animation should enhance, not distract. When in doubt, less is more.
