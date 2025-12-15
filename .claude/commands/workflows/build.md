# Build Workflow

Generate the complete website based on design and architecture.

## Prerequisites

- Discovery completed (`/workflows:discover`)
- Design system created (`/workflows:design`)
- Framework selected and initialized (`/workflows:architect`)

## Steps

### 1. Load Context

Read and analyze:
- `docs/discovery-report.md` - Site requirements
- `docs/design-system.md` - Design tokens
- `docs/architecture-decision.md` - Framework choice
- `.wlclaude/CLAUDE.md` - Pages and features list

### 2. Create Project Structure

Based on framework:

**Next.js (App Router):**
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── [pages]/
├── components/
│   ├── ui/
│   ├── sections/
│   └── layout/
├── lib/
├── styles/
│   └── design-tokens/
└── types/
```

**Astro:**
```
src/
├── layouts/
├── pages/
├── components/
├── styles/
└── content/
```

### 3. Generate Base Layout

Create layout with:
- HTML structure with semantic elements
- Meta tags (charset, viewport, title, description)
- Open Graph and Twitter Card tags
- Favicon and manifest links
- Security headers configuration
- Skip link for accessibility
- Main navigation
- Footer

### 4. Generate Pages

For each page in requirements:

1. **Create page component/file**
2. **Add SEO metadata:**
   - Unique title (50-60 chars)
   - Meta description (150-160 chars)
   - Canonical URL
   - Open Graph tags
   - Structured data (JSON-LD)

3. **Build sections:**
   - Hero section
   - Content sections
   - Call-to-action sections
   - Footer integration

4. **Apply design system:**
   - Colors from tokens
   - Typography from scale
   - Spacing from system
   - Component patterns

### 5. Generate Components

Create reusable components:

**UI Components:**
- Button (variants: primary, secondary, outline)
- Input (text, email, password, textarea)
- Card (image, title, description)
- Badge (status indicators)
- Alert (success, error, warning, info)

**Layout Components:**
- Header (navigation, mobile menu)
- Footer (links, social, copyright)
- Container (max-width wrapper)
- Section (consistent spacing)
- Grid (responsive columns)

**Section Components:**
- Hero (headline, subhead, CTA, image)
- Features (grid of feature cards)
- Testimonials (slider or grid)
- FAQ (accordion)
- CTA (call-to-action banner)
- Contact (form with validation)

### 6. Implement Forms

For any forms:
- Client-side validation
- Server-side validation
- CSRF protection
- Rate limiting configuration
- Accessible error messages
- Loading states
- Success/error feedback

### 7. Optimize Images

For all images:
- Convert to WebP/AVIF
- Generate responsive sizes
- Add width/height attributes
- Implement lazy loading (below fold)
- Priority loading (LCP images)
- Alt text (descriptive or empty for decorative)

### 8. Configure SEO

Create SEO files:
- `robots.txt` (allow crawling, sitemap link)
- `sitemap.xml` (all public pages)
- Structured data for each page type

### 9. Configure Security

Implement security headers:
```typescript
const headers = [
  { key: 'Content-Security-Policy', value: '...' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Strict-Transport-Security', value: '...' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: '...' },
];
```

### 10. Run Quality Checks

Before completion:
- [ ] All pages render on mobile
- [ ] Lighthouse audit 90+
- [ ] No security scan warnings
- [ ] SEO tags on all pages
- [ ] Images optimized
- [ ] Forms validated
- [ ] No console errors

## Output

At completion:
- Complete website structure
- All pages implemented
- Components library
- SEO configuration
- Security headers
- Ready for deployment

## Related Commands

- Add page: `/workflows:page <name>`
- Add component: `/workflows:component <name>`
- SEO audit: `/workflows:seo`
- Security audit: `/workflows:security`
- Reference: Master prompt `04-page-generation.md`
