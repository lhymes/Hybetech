# Performance Workflow

Core Web Vitals optimization and performance audit.

## Usage

```
/workflows:performance
```

## Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **INP** | < 200ms | Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **Lighthouse** | 90+ | Performance score |

## Steps

### 1. Load Context

Read performance guidelines:
- `.wlclaude/context/performance/core-web-vitals.md`

### 2. Run Initial Audit

```bash
# Lighthouse CLI
npx lighthouse [url] --view

# Or use PageSpeed Insights
# https://pagespeed.web.dev/
```

Record baseline scores:
- LCP: ___s
- INP: ___ms
- CLS: ___
- Performance: ___

### 3. Audit LCP (Largest Contentful Paint)

**Identify LCP element:**
- Usually hero image or large text block
- Check in Chrome DevTools → Performance

**Optimize:**
- [ ] LCP image preloaded
- [ ] Priority attribute on LCP image
- [ ] Modern format (WebP/AVIF)
- [ ] Appropriate size (not oversized)
- [ ] No render-blocking resources
- [ ] Server response < 200ms TTFB

```typescript
// Preload LCP image
<link rel="preload" as="image" href="/hero.webp" />

// Next.js priority
<Image src="/hero.webp" priority />

// Native fetchpriority
<img src="/hero.webp" fetchpriority="high" />
```

### 4. Audit INP (Interaction to Next Paint)

**Analyze JavaScript:**
- [ ] Bundle size < 300KB (compressed)
- [ ] Code splitting by route
- [ ] No long tasks (> 50ms)
- [ ] Event handlers optimized

**Optimize:**
- [ ] Dynamic imports for heavy components
- [ ] Debounce input handlers
- [ ] Web workers for heavy computation
- [ ] Virtualize long lists

```typescript
// Dynamic import
const HeavyComponent = dynamic(() => import('./Heavy'));

// Debounce
const debouncedSearch = useMemo(
  () => debounce(search, 300),
  []
);
```

### 5. Audit CLS (Cumulative Layout Shift)

**Find layout shifts:**
- Chrome DevTools → Performance → Layout Shifts

**Fix causes:**
- [ ] All images have width/height
- [ ] Space reserved for dynamic content
- [ ] Fonts use font-display: swap
- [ ] No content inserted above viewport
- [ ] Ads/embeds have reserved space

```typescript
// Always set dimensions
<Image width={800} height={600} />

// Reserve space
<div className="min-h-[400px]">
  {loading ? <Skeleton /> : <Content />}
</div>

// Font display
font-display: swap;
```

### 6. Audit Images

For all images:
- [ ] WebP/AVIF format
- [ ] Responsive sizes (srcset)
- [ ] Lazy loading (below fold)
- [ ] Priority loading (above fold)
- [ ] Width/height set
- [ ] Alt text present

### 7. Audit JavaScript

- [ ] Bundle analyzed (`npm run build -- --analyze`)
- [ ] Tree shaking working
- [ ] No unused dependencies
- [ ] Third-party scripts deferred
- [ ] Critical JS inlined

### 8. Audit CSS

- [ ] Critical CSS inlined
- [ ] Unused CSS purged (Tailwind default)
- [ ] No render-blocking stylesheets
- [ ] Font preconnect configured

### 9. Audit Caching

- [ ] Static assets cached (1 year)
- [ ] HTML has appropriate cache
- [ ] Service worker (if PWA)
- [ ] CDN configured

### 10. Generate Performance Report

Write to `docs/performance-audit.md`:

```markdown
# Performance Audit Report

## Date
[Current date]

## Summary
| Metric | Before | After | Target | Status |
|--------|--------|-------|--------|--------|
| LCP | [val] | [val] | < 2.5s | |
| INP | [val] | [val] | < 200ms | |
| CLS | [val] | [val] | < 0.1 | |
| Lighthouse | [val] | [val] | 90+ | |

## LCP Analysis
- LCP Element: [description]
- Load Time: [value]
- Optimizations Applied: [list]

## INP Analysis
- Main Thread Blocking: [value]
- Long Tasks: [count]
- Optimizations Applied: [list]

## CLS Analysis
- Layout Shifts: [count]
- Major Causes: [list]
- Optimizations Applied: [list]

## Bundle Analysis
- Total Size: [KB]
- Largest Chunks: [list]
- Optimization Opportunities: [list]

## Recommendations
[Additional improvements possible]
```

### 11. Implement Optimizations

Apply fixes in order:
1. LCP optimizations (biggest impact)
2. CLS fixes (user experience)
3. INP improvements (interactivity)
4. General optimizations

### 12. Validate Improvements

Re-run Lighthouse:
- All Core Web Vitals green
- Performance score 90+

## Performance Budget

```yaml
JavaScript: < 300KB (compressed)
CSS: < 100KB (compressed)
Images: < 500KB per page
Fonts: < 100KB total
Total: < 1MB per page
```

## Output

At completion:
- Performance audit report
- Core Web Vitals optimized
- Lighthouse 90+
- All images optimized
- JavaScript bundle optimized

## Related Commands

- SEO: `/workflows:seo`
- Security: `/workflows:security`
- Lighthouse tool: `/tools:lighthouse`
