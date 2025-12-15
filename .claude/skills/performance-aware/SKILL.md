# Performance-Aware Skill

**Type**: Behavioral Guardrail
**Priority**: High - Always Active

## Purpose

Ensure all WebLord development prioritizes Core Web Vitals and overall performance. Every millisecond matters for user experience and SEO.

## Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **INP** | < 200ms | Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **Lighthouse** | 90+ | Performance score |

## Core Behaviors

### Always Do

1. **Optimize images**
   - WebP/AVIF format
   - Responsive sizes (srcset)
   - Width/height attributes (prevents CLS)
   - Lazy load below-fold
   - Priority load LCP images

2. **Minimize JavaScript**
   - Code split by route
   - Dynamic imports for heavy components
   - Tree shake unused code
   - Defer non-critical scripts

3. **Prevent layout shifts**
   - Set dimensions on all images
   - Reserve space for dynamic content
   - Use font-display: swap
   - Don't insert content above viewport

4. **Optimize loading**
   - Preload critical resources
   - Preconnect to required origins
   - Inline critical CSS
   - Defer non-critical CSS

5. **Monitor performance**
   - Run Lighthouse before deploy
   - Use real user monitoring
   - Set up performance budgets

### Never Do

1. **Ship unoptimized images**
   - PNG when WebP works: Use WebP
   - 4000px image for 400px display: Resize
   - All images load immediately: Lazy load

2. **Block the main thread**
   - Long synchronous operations
   - Heavy computation without web workers
   - Large blocking scripts in head

3. **Cause layout shifts**
   - Images without dimensions
   - Dynamic content pushing things down
   - Fonts causing FOUT
   - Ads loading without reserved space

4. **Over-engineer**
   - Loading spinner for instant operations
   - Animations that delay content
   - Third-party scripts for basic functionality

## Performance Budget

```yaml
JavaScript: < 300KB (compressed)
CSS: < 100KB (compressed)
Images: < 500KB per page
Fonts: < 100KB total
Total: < 1MB per page
```

## Quick Wins

```typescript
// Preload LCP image
<link rel="preload" as="image" href="/hero.webp" />

// Priority loading (Next.js)
<Image src="/hero.webp" priority />

// Lazy load (default for Next.js Image)
<Image src="/below-fold.webp" loading="lazy" />

// Dynamic import
const Modal = dynamic(() => import('./Modal'), { ssr: false });

// Font display
font-display: swap;

// Reserve space for dynamic content
<div className="min-h-[400px]">
  {loading ? <Skeleton /> : <Content />}
</div>
```

## Trigger Phrases

When you see these, apply performance thinking:

- "Image", "hero", "banner", "gallery"
- "Component", "modal", "dialog"
- "Bundle", "import", "script"
- "Font", "typography"
- "Animation", "transition"
- "Third-party", "analytics", "embed"

## Reference

Full context: `.wlclaude/context/performance/core-web-vitals.md`
