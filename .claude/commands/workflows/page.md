# Add Page Workflow

Generate a new page for the website.

## Usage

```
/workflows:page <page-name>
```

Examples:
- `/workflows:page about`
- `/workflows:page services`
- `/workflows:page contact`
- `/workflows:page blog`

## Steps

### 1. Validate Request

- Verify page name is provided
- Check page doesn't already exist
- Confirm framework is initialized

### 2. Gather Page Information

Determine:
- Page purpose and content
- Page type (static, dynamic, form, listing)
- Required sections
- SEO keywords
- Calls to action

### 3. Generate Page File

**Next.js (App Router):**
```typescript
// src/app/[page-name]/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '[Page Title] | [Site Name]',
  description: '[150-160 char description]',
  openGraph: {
    title: '[Page Title]',
    description: '[Description]',
    type: 'website',
  },
};

export default function PageName() {
  return (
    <main>
      {/* Page sections */}
    </main>
  );
}
```

**Astro:**
```astro
---
// src/pages/[page-name].astro
import Layout from '../layouts/Layout.astro';
---

<Layout
  title="[Page Title] | [Site Name]"
  description="[150-160 char description]"
>
  <main>
    <!-- Page sections -->
  </main>
</Layout>
```

### 4. Add SEO Elements

Include:
- Unique title tag (50-60 chars)
- Meta description (150-160 chars)
- Canonical URL
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data

### 5. Build Page Sections

Create appropriate sections:
- Hero/Header section
- Content sections
- Call-to-action
- Related content (if applicable)

### 6. Apply Design System

Use existing design tokens:
- Colors from palette
- Typography scale
- Spacing system
- Component patterns

### 7. Ensure Accessibility

Verify:
- Single H1 tag
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text on images
- Form labels (if forms present)
- Skip link works

### 8. Update Navigation

Add page to:
- Main navigation (if appropriate)
- Sitemap
- Any relevant link lists

### 9. Validate

Run checks:
- Page renders correctly
- Mobile responsive
- Lighthouse audit
- SEO tags present
- No console errors

## Output

At completion:
- New page file created
- SEO metadata configured
- Navigation updated
- Page accessible and responsive

## Related Commands

- Full build: `/workflows:build`
- Add component: `/workflows:component`
- SEO audit: `/workflows:seo`
