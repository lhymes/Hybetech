# SEO Workflow

Comprehensive SEO audit and optimization.

## Usage

```
/workflows:seo
```

## Steps

### 1. Load Context

Read SEO guidelines:
- `.wlclaude/context/seo/technical-seo.md`
- `.wlclaude/context/performance/core-web-vitals.md`

### 2. Audit Meta Tags

For each page, verify:

**Essential Tags:**
- [ ] Unique title (50-60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Canonical URL
- [ ] Robots meta (index, follow)

**Open Graph:**
- [ ] og:type
- [ ] og:title
- [ ] og:description
- [ ] og:image (1200x630)
- [ ] og:url

**Twitter Card:**
- [ ] twitter:card
- [ ] twitter:title
- [ ] twitter:description
- [ ] twitter:image

### 3. Audit Structured Data

Verify JSON-LD schemas:
- [ ] Organization schema (homepage)
- [ ] WebPage schema (all pages)
- [ ] BreadcrumbList (navigation)
- [ ] FAQ schema (FAQ pages)
- [ ] Product schema (e-commerce)
- [ ] Article schema (blog posts)

Validate at: https://validator.schema.org/

### 4. Audit Content Structure

For each page:
- [ ] Single H1 tag
- [ ] Proper H1 → H2 → H3 hierarchy
- [ ] No skipped heading levels
- [ ] Descriptive anchor text
- [ ] No "click here" links

### 5. Audit Technical SEO

**Crawlability:**
- [ ] robots.txt configured correctly
- [ ] XML sitemap exists and is valid
- [ ] No blocked important pages
- [ ] Canonical tags consistent

**URL Structure:**
- [ ] Clean, readable URLs
- [ ] No query parameters for main pages
- [ ] Lowercase URLs
- [ ] Hyphens for word separation

**Performance:**
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1

### 6. Audit Images

For all images:
- [ ] Alt text present (descriptive or empty)
- [ ] Width/height attributes set
- [ ] Modern format (WebP/AVIF)
- [ ] Appropriate file size
- [ ] Lazy loading on below-fold images

### 7. Generate SEO Report

Write to `docs/seo-audit.md`:

```markdown
# SEO Audit Report

## Date
[Current date]

## Summary
- Pages audited: [count]
- Issues found: [count]
- Score: [pass/fail counts]

## Meta Tags Audit
| Page | Title | Description | OG | Twitter | Status |
|------|-------|-------------|----|---------| --------|

## Structured Data
| Page | Schema Type | Valid | Notes |
|------|-------------|-------|-------|

## Content Structure
| Page | H1 | Hierarchy | Issues |
|------|-----|-----------|--------|

## Technical Issues
[List of issues with recommendations]

## Action Items
1. [High priority fixes]
2. [Medium priority fixes]
3. [Low priority fixes]
```

### 8. Fix Issues

Address found issues:
1. Update meta tags
2. Add missing structured data
3. Fix heading hierarchy
4. Optimize images
5. Update sitemap

### 9. Validate Fixes

Re-run audits:
- Lighthouse SEO score 90+
- Schema validator passes
- No missing meta tags

## SEO Files to Generate/Update

- `robots.txt` - Crawler instructions
- `sitemap.xml` - Page listing
- Per-page structured data

## Output

At completion:
- SEO audit report generated
- All issues fixed
- Lighthouse SEO 90+
- Schema validation passing

## Related Commands

- Performance: `/workflows:performance`
- Security: `/workflows:security`
- Quick meta: `/quick:meta`
