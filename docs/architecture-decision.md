# Architecture Decision Record: Hybetech

## Date
December 2025

## Status
**Accepted**

---

## Context

Hybetech is a boutique AI solutions company redesigning their website with the following requirements:

### Business Requirements
- Lead generation and sales inquiries (primary goal)
- Professional credibility for non-technical business decision-makers
- Portfolio/case studies showcase
- Blog/insights section for thought leadership
- Contact form with email/Calendly integration

### Technical Requirements
- 10 pages (Home, About, Services x5, Case Studies, Blog, Contact)
- Contact form (external service - Formspree/Netlify Forms)
- Blog/insights (markdown-based content)
- Newsletter signup (embed)
- Dark mode toggle
- Rich animations (scroll reveals, micro-interactions)
- Static hosting compatible (budget constraint)

### Constraints
- Startup budget (minimal hosting costs)
- Currently on AWS Lightsail
- No user authentication needed
- No e-commerce needed
- No real-time features needed

---

## Requirements Evaluation

| Requirement | Priority | Notes |
|-------------|----------|-------|
| Static Content | **High** | Marketing site, blog, case studies |
| Dynamic Features | **Low** | No auth, no real-time, no e-commerce |
| SEO Priority | **Critical** | Lead generation depends on visibility |
| Performance Priority | **Critical** | Core Web Vitals targets, mobile-first |
| Bundle Size Concern | **High** | Mobile users, fast loading essential |
| CMS Integration | **Low** | Markdown sufficient initially |
| Animation Needs | **Medium** | React islands for Motion library |

---

## Framework Scoring

### Weighted Criteria Analysis

| Criterion | Weight | Astro | Next.js | SvelteKit | Rationale |
|-----------|--------|-------|---------|-----------|-----------|
| **Performance** | 25% | 10 | 7 | 9 | 0 JS default critical for Core Web Vitals |
| **SEO Capability** | 25% | 10 | 8 | 8 | Static HTML + excellent meta handling |
| **Dynamic Features** | 10% | 6 | 10 | 9 | Only need islands for animations |
| **Hosting Flexibility** | 15% | 10 | 6 | 8 | Static output works on any platform |
| **Developer Experience** | 10% | 8 | 9 | 8 | Good DX, TypeScript, hot reload |
| **Bundle Size** | 10% | 10 | 6 | 9 | 0 KB JS by default wins |
| **Ecosystem/Components** | 5% | 7 | 10 | 6 | Can use React components in islands |

### Weighted Totals

| Framework | Calculation | Total |
|-----------|-------------|-------|
| **Astro** | (10×.25)+(10×.25)+(6×.10)+(10×.15)+(8×.10)+(10×.10)+(7×.05) | **9.25** |
| **Next.js** | (7×.25)+(8×.25)+(10×.10)+(6×.15)+(9×.10)+(6×.10)+(10×.05) | **7.55** |
| **SvelteKit** | (9×.25)+(8×.25)+(9×.10)+(8×.15)+(8×.10)+(9×.10)+(6×.05) | **8.25** |

### Winner: **Astro** (9.25/10)

---

## Decision

**Selected Framework: Astro**

**Version**: 5.x (latest)

**Hosting**: Cloudflare Pages (recommended migration from AWS Lightsail)

---

## Rationale

### Why Astro?

1. **Zero JavaScript by Default**
   - Ships 0 KB JS for static pages
   - Critical for mobile performance and Core Web Vitals
   - Only loads JS for interactive "islands"

2. **Content Collections**
   - Built-in support for blog posts and case studies
   - Type-safe markdown/MDX handling
   - Perfect for structured content sites

3. **Island Architecture**
   - Can use React components for Motion animations
   - Only hydrates components that need interactivity
   - Best of both worlds: static + dynamic

4. **Static Output**
   - Works on any hosting platform
   - Compatible with current Lightsail setup
   - Can migrate to Cloudflare Pages for free hosting

5. **SEO Excellence**
   - Pre-rendered HTML for every page
   - Built-in sitemap generation
   - Easy structured data integration

6. **Budget Friendly**
   - Static output = cheap/free hosting
   - No serverless functions needed
   - Forms handled by Formspree (free tier sufficient)

---

## Alternatives Considered

### Next.js
**Why not selected:**
- Overkill for a marketing site with no dynamic features
- Heavier bundle size for equivalent functionality
- SSR/ISR not needed for static marketing content
- Vercel-optimized, less ideal for Cloudflare/static

**Would choose if:**
- User authentication was required
- E-commerce functionality was needed
- Heavy client-side state management required

### SvelteKit
**Why not selected:**
- Smaller ecosystem for component libraries
- Motion library (Framer Motion) is React-based
- Less community resources for troubleshooting

**Would choose if:**
- Team already knew Svelte
- Maximum interactivity was required
- Bundle size was the only priority

### Vanilla HTML/CSS
**Why not selected:**
- 10 pages requires component reuse
- Blog content needs templating
- Build optimization essential for performance

---

## Technical Architecture

### Stack Overview

```yaml
Framework: Astro 5.x
Language: TypeScript (strict)
Styling: Tailwind CSS 3.x
Package Manager: pnpm
Content: Astro Content Collections (Markdown/MDX)
Animations: Motion (React islands)
Forms: Formspree
Icons: Lucide Icons
Fonts: Google Fonts (Space Grotesk, Inter)
```

### Hosting Architecture

```yaml
Platform: Cloudflare Pages (recommended)
CDN: Cloudflare (global edge)
SSL: Automatic (free)
Forms: Formspree (free tier)
Analytics: Cloudflare Web Analytics (free)
Fallback: AWS Lightsail (current, static deploy)
```

### Project Structure

```
hybetech/
├── public/
│   ├── fonts/
│   ├── images/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/           # Buttons, cards, inputs
│   │   ├── layout/       # Header, footer, nav
│   │   ├── sections/     # Hero, services, CTA
│   │   └── islands/      # React components (animations)
│   ├── content/
│   │   ├── blog/         # Blog posts (*.md)
│   │   └── case-studies/ # Case studies (*.md)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── services/
│   │   ├── blog/
│   │   └── case-studies/
│   └── styles/
│       ├── global.css
│       └── design-tokens/
├── design-tokens/        # Design system source
├── docs/                 # Documentation
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Consequences

### Positive

- **Maximum Performance**: 0 JS default ensures excellent Core Web Vitals
- **Low Hosting Costs**: Static output works on free tiers
- **SEO Optimized**: Pre-rendered HTML for every page
- **Type Safety**: Full TypeScript support
- **Flexible Animations**: React islands for Motion library
- **Future Proof**: Can add SSR via Cloudflare adapter if needed

### Negative

- **Learning Curve**: Island architecture is newer concept
- **Limited Interactivity**: Heavy client-side features would require refactoring
- **Smaller Ecosystem**: Fewer ready-made components than React

### Risks

| Risk | Mitigation |
|------|------------|
| Team unfamiliar with Astro | Well-documented, similar to HTML |
| Need dynamic features later | Cloudflare adapter enables SSR |
| Animation complexity | Use React islands for complex animations |

---

## Implementation Notes

### Node.js Version
- **Required**: Node.js 20+ (LTS)

### Package Manager
- **Selected**: pnpm (faster, disk efficient)

### Key Dependencies

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/react": "^4.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.0",
    "@tailwindcss/forms": "^0.5.0",
    "@tailwindcss/aspect-ratio": "^0.4.0",
    "@tailwindcss/container-queries": "^0.1.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.14.0",
    "prettier-plugin-tailwindcss": "^0.6.0"
  }
}
```

### Security Headers

Configured in Cloudflare Pages `_headers` file:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://formspree.io
```

---

## Next Steps

1. Initialize Astro project with TypeScript
2. Configure Tailwind with design tokens
3. Set up project structure
4. Create base layouts
5. Run `/workflows:build` to generate pages

---

## References

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Pages](https://pages.cloudflare.com)
- [Motion for React](https://motion.dev)
- Discovery Report: `docs/discovery-report.md`
- Design System: `docs/design-system.md`
