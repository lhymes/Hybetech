# Technical SEO Guide

**Purpose**: Ensure WebLord sites are optimized for search visibility
**Updated**: December 2025
**Sources**: Google Search Central, industry best practices

---

## Core Web Vitals

### Targets (Mandatory)

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **INP** | < 200ms | Interaction to Next Paint |
| **CLS** | < 0.1 | Cumulative Layout Shift |

### Optimization Strategies

#### LCP (Largest Contentful Paint)

```typescript
// 1. Preload critical images
<link rel="preload" as="image" href="/hero.webp" />

// 2. Use priority loading for hero images (Next.js)
<Image src="/hero.webp" priority alt="Hero" />

// 3. Optimize server response time
// - Edge deployment
// - Static generation where possible
// - Efficient database queries

// 4. Minimize render-blocking resources
// - Inline critical CSS
// - Defer non-critical JS
```

#### INP (Interaction to Next Paint)

```typescript
// 1. Minimize JavaScript execution
// - Code split by route
// - Lazy load components

// 2. Use efficient event handlers
const handleClick = useCallback(() => {
  // Avoid expensive calculations
}, []);

// 3. Debounce/throttle input handlers
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  []
);

// 4. Use web workers for heavy computation
```

#### CLS (Cumulative Layout Shift)

```typescript
// 1. Always set image dimensions
<Image
  src="/photo.webp"
  width={800}
  height={600}
  alt="Photo"
/>

// 2. Reserve space for dynamic content
<div className="min-h-[400px]">
  {isLoading ? <Skeleton /> : <Content />}
</div>

// 3. Avoid inserting content above existing content

// 4. Use font-display: swap
@font-face {
  font-family: 'Custom';
  font-display: swap;
}
```

---

## Meta Tags

### Essential Meta Tags

```html
<!-- Charset (first) -->
<meta charset="UTF-8">

<!-- Viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Title (50-60 characters) -->
<title>Primary Keyword - Secondary | Brand Name</title>

<!-- Description (150-160 characters) -->
<meta name="description" content="Compelling description with keywords that encourages clicks. Include call-to-action.">

<!-- Canonical URL -->
<link rel="canonical" href="https://example.com/page">

<!-- Robots -->
<meta name="robots" content="index, follow">
```

### Open Graph Tags

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Site Name">
```

### Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://example.com/twitter-image.jpg">
```

---

## Structured Data (JSON-LD)

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/company",
    "https://linkedin.com/company/company"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-555-5555",
    "contactType": "customer service"
  }
}
```

### WebPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Page description",
  "url": "https://example.com/page",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Site Name",
    "url": "https://example.com"
  }
}
```

### BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Category",
      "item": "https://example.com/category"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Current Page"
    }
  ]
}
```

### FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text."
      }
    }
  ]
}
```

---

## Site Structure

### URL Structure

```
Good URLs:
https://example.com/services/web-design
https://example.com/blog/seo-guide-2025

Bad URLs:
https://example.com/page?id=123
https://example.com/services/WEBDESIGN123
```

### Heading Hierarchy

```html
<!-- Each page has exactly ONE H1 -->
<h1>Primary Page Topic</h1>

<!-- H2 for main sections -->
<h2>Section 1</h2>
<h3>Subsection 1.1</h3>
<h3>Subsection 1.2</h3>

<h2>Section 2</h2>
<h3>Subsection 2.1</h3>

<!-- Never skip levels (H1 → H4 is wrong) -->
```

### Internal Linking

```html
<!-- Use descriptive anchor text -->
<a href="/services">our web design services</a> <!-- Good -->
<a href="/services">click here</a> <!-- Bad -->

<!-- Link to relevant pages -->
<!-- Create topic clusters -->
```

---

## XML Sitemap

### Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Generation (Next.js)

```typescript
// app/sitemap.ts
export default async function sitemap() {
  const pages = await getAllPages();

  return pages.map((page) => ({
    url: `https://example.com${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly',
    priority: page.slug === '/' ? 1 : 0.8,
  }));
}
```

---

## Robots.txt

```
# Allow all crawlers
User-agent: *

# Allow everything except private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Sitemap location
Sitemap: https://example.com/sitemap.xml
```

---

## Image Optimization

### Best Practices

```typescript
// 1. Use modern formats
<Image src="/photo.webp" /> // WebP or AVIF

// 2. Provide responsive sizes
<Image
  src="/photo.webp"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>

// 3. Always include alt text
<Image alt="Descriptive alt text for SEO and accessibility" />

// 4. Lazy load below-the-fold images
<Image loading="lazy" /> // Default in Next.js Image

// 5. Priority load hero/LCP images
<Image priority /> // Above the fold images
```

---

## Mobile-First

### Requirements

```css
/* Responsive viewport */
<meta name="viewport" content="width=device-width, initial-scale=1">

/* Mobile-friendly tap targets */
button, a {
  min-height: 44px;
  min-width: 44px;
}

/* Readable font sizes */
body {
  font-size: 16px; /* Minimum */
}

/* No horizontal scroll */
html, body {
  overflow-x: hidden;
}
```

---

## SEO Checklist

### Every Page

- [ ] Unique title tag (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Canonical URL
- [ ] Open Graph tags
- [ ] Single H1 tag
- [ ] Proper heading hierarchy
- [ ] Alt text on images
- [ ] Internal links with descriptive text

### Site-Wide

- [ ] XML sitemap
- [ ] robots.txt
- [ ] Organization schema
- [ ] HTTPS enforced
- [ ] Mobile-friendly design
- [ ] Fast load times (Core Web Vitals)

### Technical

- [ ] No duplicate content
- [ ] No broken links (404s)
- [ ] No redirect chains
- [ ] Clean URL structure
- [ ] Proper language tags

---

## SEO Anti-Patterns (Avoid)

### Content Issues
- Thin content (< 300 words on important pages)
- Duplicate content across pages
- Keyword stuffing
- Hidden text

### Technical Issues
- Slow page load (LCP > 4s)
- Missing meta descriptions
- Broken links
- Redirect chains
- Blocked by robots.txt

### UX Issues
- Intrusive interstitials (popups)
- Aggressive ads above content
- Poor mobile experience
- Confusing navigation

---

**Remember**: SEO is built-in, not bolted on. Every WebLord page is optimized from the start.
