# Framework Selection Matrix

**Purpose**: Guide AI in selecting the optimal framework for each project
**Updated**: December 2025

---

## Quick Decision Tree

```
START
  │
  ├─ Content-heavy site (blog, docs, marketing)?
  │   └─ YES → ASTRO
  │
  ├─ User authentication required?
  │   └─ YES → NEXT.JS
  │
  ├─ E-commerce with cart/checkout?
  │   └─ YES → NEXT.JS
  │
  ├─ Real-time features (chat, live updates)?
  │   └─ YES → SVELTEKIT or NEXT.JS
  │
  ├─ Team knows React?
  │   └─ YES → NEXT.JS
  │
  ├─ Maximum performance priority?
  │   └─ YES → ASTRO or SVELTEKIT
  │
  ├─ Single landing page only?
  │   └─ YES → VANILLA HTML/CSS
  │
  └─ General web app → NEXT.JS (safest default)
```

---

## Framework Profiles

### Astro

**Best For:**
- Marketing websites
- Documentation sites
- Blogs and content sites
- Portfolio websites
- Static sites with minimal interactivity

**Strengths:**
- 0 JavaScript by default (best performance)
- Content Collections for structured content
- Island architecture (partial hydration)
- Use any UI framework for interactive parts
- Excellent SEO out of the box

**Weaknesses:**
- Limited for highly interactive apps
- Smaller ecosystem than React
- Learning curve for island architecture

**When to Choose:**
```yaml
Content Type: Mostly static
Interactivity: Low to Medium
SEO Priority: Critical
Performance Priority: Critical
JavaScript Needed: Minimal
```

---

### Next.js (App Router)

**Best For:**
- Web applications
- E-commerce sites
- SaaS products
- Sites requiring authentication
- React ecosystem projects

**Strengths:**
- React ecosystem (largest community)
- Server Components (RSC)
- API routes built-in
- Excellent Vercel integration
- Image optimization built-in
- Great TypeScript support

**Weaknesses:**
- Heavier than Astro for static content
- React learning curve
- Vercel-centric development
- Complex for simple sites

**When to Choose:**
```yaml
Content Type: Dynamic or Mixed
Interactivity: Medium to High
SEO Priority: High (SSR helps)
Auth Required: Yes
E-commerce: Yes
Team Expertise: React
```

---

### SvelteKit

**Best For:**
- Interactive applications
- Performance-critical sites
- Real-time features
- Teams open to learning Svelte

**Strengths:**
- Smallest bundle size
- No virtual DOM (faster)
- Built-in stores (state management)
- Less boilerplate than React
- Excellent performance

**Weaknesses:**
- Smaller ecosystem
- Fewer developers know Svelte
- Less third-party component libraries
- Smaller community

**When to Choose:**
```yaml
Content Type: Dynamic
Interactivity: High
Performance Priority: Critical
Bundle Size: Must be minimal
Team Expertise: Open to learning
```

---

### Vanilla HTML/CSS/JS

**Best For:**
- Single landing pages
- Maximum simplicity
- No build step required
- Learning projects

**Strengths:**
- Zero dependencies
- Fastest possible (no framework overhead)
- No build step
- Universal understanding
- Maximum control

**Weaknesses:**
- Manual everything
- No component reuse (without templates)
- No built-in optimization
- Harder to maintain at scale

**When to Choose:**
```yaml
Page Count: 1-3 pages
Interactivity: Minimal
Complexity: Low
Build Step: Not wanted
```

---

## Detailed Comparison Matrix

| Feature | Astro | Next.js | SvelteKit | Vanilla |
|---------|-------|---------|-----------|---------|
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **SEO** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Dynamic Features** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Ecosystem** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Learning Curve** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Bundle Size** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **TypeScript** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Hosting Options** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## Project Type Recommendations

### Marketing Website
```
Recommended: ASTRO
Reason: Static content, SEO critical, fast load times
Alternative: Next.js (if team knows React)
```

### E-commerce Store
```
Recommended: NEXT.JS
Reason: Cart state, user auth, payment integration, API routes
Alternative: SvelteKit (if bundle size critical)
```

### SaaS Product Website
```
Recommended: NEXT.JS
Reason: Auth, dashboard, API integration, React ecosystem
Alternative: Astro (if just marketing site, app is separate)
```

### Blog / Documentation
```
Recommended: ASTRO
Reason: Content Collections, MDX support, maximum performance
Alternative: Next.js (if auth/comments needed)
```

### Portfolio Website
```
Recommended: ASTRO
Reason: Image-heavy, static, performance matters
Alternative: Next.js (if interactive case studies)
```

### Web Application
```
Recommended: NEXT.JS or SVELTEKIT
Reason: Dynamic content, state management, real-time features
Decision Factor: Team expertise (React vs Svelte)
```

### Landing Page
```
Recommended: ASTRO or VANILLA
Reason: Simple, fast, no ongoing state
Decision Factor: Need for components/reuse
```

---

## Scoring Template

When evaluating for a specific project:

```
Project: [Name]
Requirements: [List]

Score each framework 1-10:

| Criterion | Weight | Astro | Next.js | SvelteKit |
|-----------|--------|-------|---------|-----------|
| Performance | [%] | [1-10] | [1-10] | [1-10] |
| SEO Capability | [%] | [1-10] | [1-10] | [1-10] |
| Dynamic Features | [%] | [1-10] | [1-10] | [1-10] |
| Developer Experience | [%] | [1-10] | [1-10] | [1-10] |
| Ecosystem Needs | [%] | [1-10] | [1-10] | [1-10] |
| Bundle Size | [%] | [1-10] | [1-10] | [1-10] |
| WEIGHTED TOTAL | 100% | [Sum] | [Sum] | [Sum] |

Winner: [Highest score]
Rationale: [Why this framework fits best]
```

---

## Common Mistakes

### Don't Choose Astro When:
- You need complex state management
- Heavy real-time interactivity required
- Team is React-first

### Don't Choose Next.js When:
- Simple static content site
- Bundle size is critical concern
- No dynamic features needed

### Don't Choose SvelteKit When:
- Team has no Svelte experience and deadline is tight
- You need extensive third-party React components
- Enterprise requirement for "safe" technology choice

### Don't Choose Vanilla When:
- More than 3-5 pages
- Component reuse needed
- Build optimization required

---

**Remember**: The best framework is the one that fits the project requirements and team expertise. When in doubt, Next.js is the safest default for web applications, Astro for content sites.
