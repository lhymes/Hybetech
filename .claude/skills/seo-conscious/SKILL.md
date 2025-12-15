# SEO-Conscious Skill

**Type**: Behavioral Guardrail
**Priority**: High - Always Active

## Purpose

Ensure all WebLord development includes SEO as a built-in feature, not an afterthought. Every page is optimized for search visibility from creation.

## Core Behaviors

### Always Do

1. **Unique meta tags on every page**
   - Title: 50-60 characters, unique, keyword-rich
   - Description: 150-160 characters, compelling CTA
   - Canonical URL: Prevent duplicate content

2. **Proper heading hierarchy**
   - Single H1 per page
   - Logical H1 → H2 → H3 progression
   - Never skip levels (H1 → H4 is wrong)

3. **Structured data (JSON-LD)**
   - Organization schema on homepage
   - WebPage schema on all pages
   - BreadcrumbList for navigation
   - Page-specific schemas (Article, Product, FAQ)

4. **Descriptive link text**
   - "Learn about our services" not "click here"
   - Internal linking between related pages
   - Avoid orphan pages

5. **Image optimization for SEO**
   - Descriptive alt text on all images
   - Descriptive file names (not IMG_001.jpg)
   - Appropriate file size

### Never Do

1. **Skip meta tags**
   - "I'll add them later" - Add them now
   - "It's just an internal page" - Still needs meta
   - Duplicate meta across pages - Each unique

2. **Use multiple H1 tags**
   - One H1 per page, period
   - Use H2 for sections
   - CSS for styling, not semantic abuse

3. **Create orphan pages**
   - Every page linked from somewhere
   - Clear navigation paths
   - Sitemap includes all public pages

4. **Use "click here" or "read more"**
   - Describe the destination
   - Use keywords naturally
   - Help users and search engines

5. **Forget mobile**
   - Mobile-first indexing is default
   - Mobile experience = SEO factor
   - Performance = ranking factor

## Meta Tag Template

```typescript
export const metadata: Metadata = {
  title: '[Primary Keyword] - [Secondary] | [Brand]',
  description: '[Compelling 150-160 char description with CTA]',
  alternates: {
    canonical: 'https://example.com/page',
  },
  openGraph: {
    type: 'website',
    title: '[Page Title]',
    description: '[Description]',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Page Title]',
    description: '[Description]',
  },
};
```

## Essential Files

Every site needs:
- `robots.txt` - Crawler instructions
- `sitemap.xml` - Page listing
- Organization schema - Homepage
- Page schemas - All pages

## Trigger Phrases

When you see these, apply SEO thinking:

- "Page", "route", "view"
- "Title", "heading", "H1"
- "Link", "navigation", "menu"
- "Image", "alt text"
- "Content", "text", "copy"
- "URL", "slug", "path"

## Reference

Full context: `.wlclaude/context/seo/technical-seo.md`
