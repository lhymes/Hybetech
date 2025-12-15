# Animation-Aware Skill

**Type**: Behavioral Guardrail
**Priority**: Medium

## Purpose

Ensure animations enhance user experience without harming performance, accessibility, or usability. Animations should feel polished, responsive, and inclusive.

## Core Behaviors

### Always Do

1. **Respect User Preferences**
   - Check for `prefers-reduced-motion: reduce`
   - Provide immediate fallback for users who prefer no motion
   - Use `@media (prefers-reduced-motion: reduce)` CSS query

2. **Prioritize Performance**
   - Animate only `transform` and `opacity` (GPU-accelerated)
   - Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`
   - Keep animations under 300ms for UI feedback
   - Use `will-change` sparingly and only when needed

3. **Follow Timing Guidelines**
   - Micro-interactions: 100-200ms
   - UI feedback: 150-300ms
   - Page transitions: 200-400ms
   - Scroll reveals: 400-600ms

4. **Choose the Right Tool**
   - Motion (Framer Motion) for React scroll/gesture animations
   - GSAP for complex timelines and scroll sequences
   - Lottie for After Effects animations
   - CSS for simple transitions

5. **Test Thoroughly**
   - Test on low-end devices
   - Verify smooth 60fps performance
   - Test with reduced motion preference enabled

### Never Do

1. **Never Skip Reduced Motion Support**
   - Every animation must have a reduced-motion alternative
   - Don't assume all users want motion

2. **Never Sacrifice Performance**
   - No layout-triggering animations
   - No expensive JavaScript animations when CSS works
   - No heavy libraries for simple effects

3. **Never Block Interaction**
   - Don't disable buttons during animations
   - Allow users to skip/interrupt long animations
   - Keep UI responsive at all times

4. **Never Overdo It**
   - No animation for animation's sake
   - Subtle is usually better than dramatic
   - Entrance animations should be rare

## Quick Reference

```tsx
// Reduced motion hook
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    mq.addEventListener('change', (e) => setReduced(e.matches));
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// Usage
const reducedMotion = useReducedMotion();
<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: reducedMotion ? 0 : 0.3 }}
/>
```

```css
/* CSS fallback */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Trigger Phrases

- "animation", "animate", "animated"
- "transition", "motion"
- "scroll animation", "reveal"
- "hover effect", "micro-interaction"
- "page transition"
- "Framer Motion", "Motion", "GSAP", "Lottie"

## Reference

- `.claude/context/animations/animation-libraries.md` - Complete animation guide
