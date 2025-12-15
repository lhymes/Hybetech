# Animations & Micro-Interactions Workflow

Implement modern, performant animations for engaging user experiences.

---

## Context Files to Read First

Read these context files before proceeding:
- `.claude/context/animations/animation-libraries.md` - Animation library selection and patterns

---

## Library Selection

### Quick Decision

| If you need... | Use |
|----------------|-----|
| React/Next.js with smooth animations | **Motion** |
| Complex scroll-based sequences | **GSAP + ScrollTrigger** |
| After Effects animations | **Lottie** |
| Simple transitions, max performance | **CSS + View Transitions** |

### Bundle Size Comparison

- Motion: ~16kb (tree-shakeable)
- GSAP: ~60kb (+ plugins)
- Lottie: ~65kb
- CSS: 0kb

---

## Motion (Recommended for React)

### Installation

```bash
npm install motion
```

### Basic Animations

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

### Installation

```bash
npm install gsap
```

### ScrollTrigger Animations

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
          scrub: 0.5,
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

### Pinned Scroll Section

```tsx
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

---

## Lottie (After Effects)

### Installation

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

**Resources**: [LottieFiles](https://lottiefiles.com/) for free animations

---

## View Transitions API (Native CSS)

### Enable Globally

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}

@keyframes fade-out { to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } }
```

### Named Transitions

```tsx
<div style={{ viewTransitionName: 'hero-image' }}>
  <Image src="/hero.jpg" alt="Hero" />
</div>
```

```css
::view-transition-old(hero-image) {
  animation: scale-down 0.5s ease-out;
}

::view-transition-new(hero-image) {
  animation: scale-up 0.5s ease-out;
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

### Hover Card

```tsx
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

### Loading Spinner

```tsx
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

## Performance & Accessibility

### Reduced Motion Support

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

## Checklist

- [ ] Animation library installed and configured
- [ ] Reduced motion support implemented
- [ ] Animations are GPU-accelerated (transform, opacity)
- [ ] No layout-triggering animations (width, height, top, left)
- [ ] Animations under 300ms for UI feedback
- [ ] Tested on low-end devices
- [ ] Scroll animations perform smoothly

---

**Remember**: Animation should enhance, not distract. When in doubt, less is more.
