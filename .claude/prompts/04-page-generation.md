# Master Prompt: Page & Component Generation

**Purpose**: Generate complete website pages and components based on architecture
**Usage**: Run after `/workflows:architect` approval
**Philosophy**: AI builds production-ready code, you review and refine

---

```markdown
You are an expert web developer tasked with generating complete website pages and components. Based on all previous phases, build the production-ready website.

## INPUTS FROM PREVIOUS PHASES

**From Discovery:**
- Site Structure: [Pages to build]
- Features: [Features to implement]
- Content Strategy: [Content types]

**From Design:**
- Design System: [Colors, typography, spacing]
- Component Patterns: [Button, card, form styles]

**From Architecture:**
- Framework: [Next.js / Astro / SvelteKit]
- Project Structure: [Directory layout]
- Component List: [Components to create]

---

## AUTONOMOUS EXECUTION INSTRUCTIONS

Generate the complete website code. Present for review after completion.

### PHASE 1: PROJECT INITIALIZATION

**Set up the project:**

```bash
# Initialize project with selected framework
# Install dependencies
# Configure Tailwind CSS with design tokens
# Set up TypeScript
# Configure security headers
```

**Create configuration files:**

1. `tailwind.config.js` - With design system tokens
2. `tsconfig.json` - Strict TypeScript
3. `next.config.js` or `astro.config.mjs` - With security headers
4. `.env.example` - Environment variable template
5. `.gitignore` - Standard ignores

### PHASE 2: LAYOUT COMPONENTS

**Create core layout components:**

#### Header Component
```typescript
// Requirements:
// - Responsive navigation (hamburger on mobile)
// - Logo placement
// - Navigation links from site structure
// - Mobile menu with smooth animation
// - Sticky behavior (optional based on design)
// - Accessibility: keyboard navigable, ARIA labels
```

#### Footer Component
```typescript
// Requirements:
// - Site links organized by category
// - Social media links
// - Copyright notice
// - Optional newsletter signup
// - Accessibility: proper landmarks
```

#### Navigation Component
```typescript
// Requirements:
// - Desktop: horizontal menu
// - Mobile: slide-out or dropdown
// - Active state for current page
// - Smooth transitions
// - Touch-friendly (44px min tap targets)
```

### PHASE 3: UI COMPONENTS

**Create reusable UI components:**

#### Button Component
```typescript
// Variants: primary, secondary, ghost, destructive
// Sizes: sm, md, lg
// States: default, hover, active, disabled, loading
// Props: asChild (for links), icon, iconPosition
// Accessibility: proper focus states, aria-disabled
```

#### Card Component
```typescript
// Variants: default, elevated, outlined
// Subcomponents: CardHeader, CardContent, CardFooter
// Hover effects per design system
// Accessibility: semantic structure
```

#### Input Component
```typescript
// Types: text, email, password, textarea
// States: default, focus, error, disabled
// Validation feedback display
// Accessibility: labels, error messages, aria-describedby
```

#### Modal Component
```typescript
// Focus trap
// Escape key closes
// Click outside closes
// Smooth enter/exit animations
// Accessibility: role="dialog", aria-modal
```

### PHASE 4: PAGE SECTIONS

**Create page section components:**

#### Hero Section
```typescript
// Variants: centered, split, with-image, with-video
// Content: headline, subheadline, CTA buttons
// Responsive: different layouts per breakpoint
// Performance: priority load hero images
```

#### Features Section
```typescript
// Layouts: grid, list, alternating
// Content: icon, title, description per feature
// Animation: reveal on scroll (optional)
```

#### Testimonials Section
```typescript
// Layouts: carousel, grid, single featured
// Content: quote, author, role, company, avatar
// Credibility signals
```

#### CTA Section
```typescript
// Layouts: simple, with image, full-width
// Content: headline, description, button(s)
// High contrast for visibility
```

#### Contact Section
```typescript
// Form with validation
// Contact information
// Optional map integration
// Form submission handling
```

### PHASE 5: PAGE GENERATION

**Generate all pages from site structure:**

For each page:

1. **Create page file** with proper routing
2. **Add metadata** (title, description, OG tags)
3. **Implement sections** from component library
4. **Add structured data** (JSON-LD)
5. **Ensure accessibility** (heading hierarchy, landmarks)
6. **Optimize performance** (lazy loading, code splitting)

#### Homepage
```typescript
// Sections: Hero, Features, Testimonials, CTA
// Metadata: Primary keywords, compelling description
// Schema: Organization + WebPage
```

#### About Page
```typescript
// Sections: Story, Team, Values, CTA
// Metadata: About-focused keywords
// Schema: AboutPage
```

#### Services/Products Page
```typescript
// Sections: Overview, Service Cards, Process, CTA
// Metadata: Service-focused keywords
// Schema: Service or Product
```

#### Contact Page
```typescript
// Sections: Contact Form, Contact Info, Map
// Metadata: Contact keywords
// Schema: ContactPage
// Form handling: validation + submission
```

#### Blog Index (if applicable)
```typescript
// Sections: Featured Post, Post Grid, Categories
// Metadata: Blog keywords
// Schema: Blog + CollectionPage
// Pagination or infinite scroll
```

### PHASE 6: FORM HANDLING

**Implement form functionality:**

```typescript
// Validation
// - Client-side with Zod
// - Required fields
// - Email format
// - Phone format (optional)
// - Custom validation rules

// Security
// - CSRF protection
// - Rate limiting info in UI
// - Honeypot field
// - Input sanitization

// UX
// - Loading states
// - Success messages
// - Error messages
// - Field-level validation
// - Form-level validation

// Submission
// - API route or server action
// - Email notification (template ready)
// - Success redirect or message
```

### PHASE 7: SEO IMPLEMENTATION

**Implement complete SEO:**

```typescript
// Per-page metadata
export const metadata = {
  title: '[Page Title] | [Site Name]',
  description: '[Compelling description under 160 chars]',
  openGraph: {
    title: '[OG Title]',
    description: '[OG Description]',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// Structured data
const schema = {
  '@context': 'https://schema.org',
  '@type': '[PageType]',
  // ... complete schema
};
```

### PHASE 8: SECURITY IMPLEMENTATION

**Implement security measures:**

```typescript
// next.config.js or middleware
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];
```

### PHASE 9: PERFORMANCE OPTIMIZATION

**Implement performance measures:**

```typescript
// Image optimization
// - Use next/image or astro:assets
// - Proper sizing per breakpoint
// - WebP/AVIF formats
// - Lazy loading below fold
// - Priority for hero images

// Code splitting
// - Dynamic imports for modals, carousels
// - Route-based splitting (automatic)

// Font optimization
// - next/font or font-display: swap
// - Subset fonts if possible
// - Preload critical fonts

// Third-party scripts
// - Load analytics defer/async
// - Minimize external scripts
```

---

## DELIVERABLE: COMPLETE WEBSITE

### Files Created

```
[Complete list of all files created with descriptions]
```

### Running the Site

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Lighthouse Scores (Expected)

```
Performance: 95+
Accessibility: 100
Best Practices: 100
SEO: 100
```

### Security Checklist

```
[x] Security headers configured
[x] CSRF protection on forms
[x] Input validation implemented
[x] No secrets in client code
[x] HTTPS ready
```

### Next Steps

```
1. Add real content (images, copy)
2. Connect form to email service
3. Run /workflows:security for full audit
4. Run /workflows:seo for optimization check
5. Deploy with /workflows:deploy
```

---

## CHECKPOINT: USER REVIEW

Present the completed website and ask:

1. Review the generated code structure
2. Test the development server
3. Check responsiveness on different devices
4. Verify all pages and components work
5. Any adjustments needed?

**After approval, proceed to `/workflows:security` and `/workflows:seo`**

---

## QUALITY STANDARDS

- [ ] All TypeScript types properly defined (no `any`)
- [ ] Components are accessible (ARIA, keyboard nav)
- [ ] Responsive design works 320px to 1920px+
- [ ] No console errors or warnings
- [ ] Forms validate properly
- [ ] Images optimized
- [ ] Security headers in place
- [ ] SEO metadata on all pages
- [ ] Performance optimized

---

Begin now. Generate the complete website.
```
