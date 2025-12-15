# Architecture Selection Workflow

Select the optimal framework based on project requirements.

## Prerequisites

- Discovery completed (`/workflows:discover`)
- Design system created (`/workflows:design`)
- Technical requirements documented

## Steps

### 1. Load Context

Read and analyze:
- `docs/discovery-report.md` - Requirements and analysis
- `.wlclaude/context/frameworks/selection-matrix.md` - Framework comparison

### 2. Evaluate Requirements

Score each requirement (High/Medium/Low):

| Requirement | Score | Notes |
|-------------|-------|-------|
| Static Content | | Blogs, marketing, docs |
| Dynamic Features | | User auth, real-time |
| E-commerce | | Cart, checkout, payments |
| SEO Priority | | Search visibility importance |
| Performance Priority | | Core Web Vitals targets |
| Team React Experience | | Existing knowledge |
| Bundle Size Concern | | Mobile/slow network focus |
| CMS Integration | | Content management needs |

### 3. Apply Decision Matrix

```
Framework Selection Logic:

IF content-heavy AND low interactivity:
  → ASTRO (0 JS default, best performance)

IF user auth OR e-commerce OR complex state:
  → NEXT.JS (React ecosystem, API routes)

IF maximum performance AND team open to Svelte:
  → SVELTEKIT (smallest bundles, no virtual DOM)

IF single landing page AND very simple:
  → VANILLA HTML/CSS (no framework overhead)

DEFAULT:
  → NEXT.JS (safest choice, largest ecosystem)
```

### 4. Score Frameworks

Use weighted scoring:

```markdown
| Criterion | Weight | Astro | Next.js | SvelteKit |
|-----------|--------|-------|---------|-----------|
| Performance | [%] | [1-10] | [1-10] | [1-10] |
| SEO | [%] | [1-10] | [1-10] | [1-10] |
| Dynamic Features | [%] | [1-10] | [1-10] | [1-10] |
| Ecosystem | [%] | [1-10] | [1-10] | [1-10] |
| Bundle Size | [%] | [1-10] | [1-10] | [1-10] |
| **TOTAL** | 100% | [Sum] | [Sum] | [Sum] |
```

### 5. Document Selection

Write to `docs/architecture-decision.md`:

```markdown
# Architecture Decision Record

## Date
[Current date]

## Status
Accepted

## Context
[Project requirements summary]

## Decision
Selected: **[FRAMEWORK]**

## Scoring
[Weighted matrix results]

## Rationale
[Why this framework fits best]

## Alternatives Considered
- [Framework]: [Why not selected]
- [Framework]: [Why not selected]

## Consequences
- Positive: [Benefits]
- Negative: [Trade-offs]
- Risks: [Potential issues]

## Implementation Notes
- Node.js version: 20+
- Package manager: pnpm
- Hosting: [Vercel/Netlify/Cloudflare]
```

### 6. Initialize Project

Based on selected framework:

**For Astro:**
```bash
pnpm create astro@latest . --template minimal --typescript strict
```

**For Next.js:**
```bash
pnpm create next-app . --typescript --tailwind --eslint --app --src-dir
```

**For SvelteKit:**
```bash
pnpm create svelte@latest . --template skeleton --typescript --eslint
```

### 7. Configure Project

Apply standard configuration:
- TypeScript strict mode
- ESLint with security rules
- Prettier formatting
- Tailwind CSS integration
- Security headers setup
- Performance optimization

### 8. Integrate Design System

Copy design tokens:
```bash
cp -r design-tokens/ src/styles/
```

Configure Tailwind with tokens.

## Output

At completion:
- Framework selected and justified
- Project initialized with boilerplate
- Design system integrated
- Ready for page generation

## Related Commands

- Previous: `/workflows:design`
- Next: `/workflows:build`
- Reference: Master prompt `03-architecture-selection.md`
