# Core Web Vitals Optimization

**Purpose**: Ensure WebLord sites achieve excellent Core Web Vitals scores
**Targets**: LCP < 2.5s, INP < 200ms, CLS < 0.1
**Updated**: December 2025

---

## Overview

Core Web Vitals are Google's essential metrics for user experience. They directly impact search rankings.

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **INP** | ≤ 200ms | 200ms - 500ms | > 500ms |
| **CLS** | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

---

## LCP (Largest Contentful Paint)

### What It Measures
Time until the largest content element is rendered.

### Common LCP Elements
- Hero images
- Video poster images
- Large text blocks
- Background images (CSS)

### Optimization Strategies

#### 1. Optimize the LCP Element

```typescript
// Preload LCP image
<link rel="preload" as="image" href="/hero.webp" />

// Priority attribute (Next.js)
<Image src="/hero.webp" priority alt="Hero" />

// Fetchpriority for native img
<img src="/hero.webp" fetchpriority="high" alt="Hero" />
```

#### 2. Optimize Server Response

```typescript
// Use static generation where possible
export const dynamic = 'force-static';

// Use edge runtime for dynamic pages
export const runtime = 'edge';

// Implement efficient caching
export const revalidate = 3600; // ISR - revalidate every hour
```

#### 3. Eliminate Render-Blocking Resources

```typescript
// Defer non-critical JavaScript
<script src="analytics.js" defer />

// Inline critical CSS
<style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

// Preconnect to required origins
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

#### 4. Optimize Images

```typescript
// Use modern formats
<Image src="/hero.webp" /> // WebP or AVIF

// Provide appropriate sizes
<Image
  src="/hero.webp"
  sizes="100vw"
  width={1920}
  height={1080}
/>

// Use responsive images
<picture>
  <source media="(max-width: 640px)" srcSet="/hero-mobile.webp" />
  <source media="(max-width: 1024px)" srcSet="/hero-tablet.webp" />
  <img src="/hero-desktop.webp" alt="Hero" />
</picture>
```

---

## INP (Interaction to Next Paint)

### What It Measures
Time from user interaction to visual update.

### Common INP Issues
- Heavy JavaScript execution
- Long tasks blocking main thread
- Expensive re-renders
- Synchronous operations

### Optimization Strategies

#### 1. Minimize JavaScript

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});

// Code split by route (automatic in Next.js/Astro)

// Tree shake unused code
// Use ES modules
import { specificFunction } from 'large-library';
```

#### 2. Optimize Event Handlers

```typescript
// Avoid inline functions in render
// Bad
<button onClick={() => handleClick(item.id)}>Click</button>

// Good
const handleItemClick = useCallback((id: string) => {
  handleClick(id);
}, []);
<button onClick={() => handleItemClick(item.id)}>Click</button>

// Debounce input handlers
const debouncedSearch = useMemo(
  () => debounce((query: string) => search(query), 300),
  []
);
```

#### 3. Use Web Workers for Heavy Computation

```typescript
// Offload expensive work
const worker = new Worker('/workers/compute.js');
worker.postMessage(data);
worker.onmessage = (e) => setResult(e.data);
```

#### 4. Virtualize Long Lists

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});
```

#### 5. Use Optimistic Updates

```typescript
// Update UI immediately, sync with server
const handleLike = async () => {
  setLiked(true); // Optimistic
  setLikeCount((c) => c + 1); // Optimistic

  try {
    await api.like(postId);
  } catch {
    setLiked(false); // Rollback
    setLikeCount((c) => c - 1);
  }
};
```

---

## CLS (Cumulative Layout Shift)

### What It Measures
Visual stability - how much content shifts unexpectedly.

### Common CLS Issues
- Images without dimensions
- Ads loading without reserved space
- Dynamic content above existing content
- Web fonts causing FOUT/FOIT

### Optimization Strategies

#### 1. Always Set Image Dimensions

```typescript
// Always provide width and height
<Image
  src="/photo.webp"
  width={800}
  height={600}
  alt="Photo"
/>

// Or use aspect-ratio
<div className="aspect-video">
  <Image src="/video-poster.webp" fill alt="Video" />
</div>
```

#### 2. Reserve Space for Dynamic Content

```typescript
// Set minimum height for async content
<div className="min-h-[400px]">
  {isLoading ? <Skeleton /> : <Content />}
</div>

// Use placeholders
<div className="h-[300px] bg-gray-100 animate-pulse" />
```

#### 3. Handle Web Fonts Properly

```css
/* Use font-display: swap */
@font-face {
  font-family: 'Custom Font';
  font-display: swap;
  src: url('/fonts/custom.woff2') format('woff2');
}

/* Or optional for non-critical fonts */
@font-face {
  font-family: 'Decorative';
  font-display: optional;
}
```

```typescript
// Next.js - use next/font
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

#### 4. Avoid Inserting Content Above

```typescript
// Bad - pushes content down
<main>
  {showBanner && <Banner />} {/* Appears after load */}
  <Content />
</main>

// Good - reserve space
<main>
  <div className="h-[60px]"> {/* Always reserved */}
    {showBanner && <Banner />}
  </div>
  <Content />
</main>
```

#### 5. Handle Ads and Embeds

```typescript
// Reserve space for ads
<div className="min-h-[250px]"> {/* Standard ad size */}
  <AdComponent />
</div>

// Use aspect-ratio for embeds
<div className="aspect-video">
  <iframe src="https://youtube.com/embed/..." />
</div>
```

---

## Measurement Tools

### Lighthouse

```bash
# CLI
npx lighthouse https://example.com --view

# In Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Run audit
```

### PageSpeed Insights

```
https://pagespeed.web.dev/
```

### Web Vitals JavaScript

```typescript
import { onCLS, onINP, onLCP } from 'web-vitals';

onCLS(console.log);
onINP(console.log);
onLCP(console.log);

// Send to analytics
function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  navigator.sendBeacon('/analytics', body);
}

onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
```

### Chrome DevTools

- **Performance panel**: Record and analyze
- **Network panel**: Waterfall analysis
- **Coverage panel**: Find unused code
- **Rendering panel**: Paint flashing, layout shift regions

---

## Framework-Specific Optimizations

### Next.js

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  experimental: {
    optimizeCss: true,
  },
};

// Use Image component
import Image from 'next/image';

// Use Font optimization
import { Inter } from 'next/font/google';
```

### Astro

```javascript
// astro.config.mjs
export default defineConfig({
  image: {
    service: 'astro/assets/services/sharp',
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});

// Use astro:assets
import { Image } from 'astro:assets';
```

---

## Performance Budget

### Recommended Limits

```yaml
JavaScript: < 300KB (compressed)
CSS: < 100KB (compressed)
Images: < 500KB per page (optimized)
Fonts: < 100KB total
Third-party: < 100KB total

Total page weight: < 1MB
```

### Monitoring in CI

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun --config=lighthouserc.json

# lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

---

## Checklist

### LCP Optimization
- [ ] LCP element identified
- [ ] LCP image preloaded
- [ ] No render-blocking resources
- [ ] Images optimized (WebP/AVIF)
- [ ] Server response fast (< 200ms TTFB)

### INP Optimization
- [ ] Minimal JavaScript
- [ ] Code splitting implemented
- [ ] Event handlers optimized
- [ ] No long tasks (> 50ms)
- [ ] Heavy computation offloaded

### CLS Optimization
- [ ] All images have dimensions
- [ ] Space reserved for dynamic content
- [ ] Fonts use display: swap
- [ ] No content inserted above viewport

---

**Target**: Lighthouse Performance Score 90+
