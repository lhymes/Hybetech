# WebLord Project Configuration

> **You MUST fill in the sections below before running `/workflows:discover`.**
> The AI reads this file to understand your project and work autonomously.

---

## Project Overview (Fill This In First!)

Replace the bracketed placeholders with your actual project details:

```yaml
Project Name: Hybetech (existing site is https://www.hybe.tech/)
Project Type: Website
Industry: Technology - AI Solutions Provider
Target Audience: Businesses of all sizes looking to implement AI solutions into their company. We offer consultation, integration, and solutions development and implementation.
Primary Goal: Lead generation, sales, information, portfolio. Our existing site is not hitting the mark. It's too complicated for our target audience and really doesn't provide the exiting engagement we're hoping to deliver to hook them on the benefits we can offer their business.
```


---

## Core Development Principles

### The Golden Rules

1. **AI Executes, You Approve** - AI handles research, design, and implementation. You direct and review.
2. **Security First** - OWASP 2025 compliance is non-negotiable. Every feature is secure by default.
3. **Mobile First** - Design for mobile, enhance for desktop. Touch-friendly, responsive always.
4. **Performance Matters** - Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
5. **SEO Built-In** - Every page is optimized for search. Visibility is not an afterthought.

### Quality Standards

**File Organization**
- Files MUST NOT exceed 600 lines
- Each file has single, clear responsibility
- Components are self-contained and reusable

**Security Standards**
- OWASP Top 10 2025 compliance
- Security headers on every page (CSP, HSTS, X-Frame-Options)
- Input validation on all forms
- No secrets in code or client bundles
- HTTPS everywhere

**Accessibility Standards**
- WCAG 2.1 AA minimum
- Semantic HTML structure
- Color contrast 4.5:1 minimum
- Keyboard navigable
- Screen reader compatible

**Performance Standards**
- Lighthouse score 90+ all categories
- Images optimized (WebP/AVIF, lazy loading)
- Code splitting implemented
- Critical CSS inlined
- No render-blocking resources

---

## Technology Stack

> **Note**: Framework is selected dynamically during `/workflows:architect` based on project requirements.

```yaml
# Possible Frameworks (AI selects based on requirements)
Frameworks:
  - Next.js 14+ (Dynamic apps, React ecosystem, SSR/SSG)
  - Astro (Content sites, 0 JS default, maximum performance)
  - SvelteKit (Interactive + performance, smaller bundles)

# Always Used
Styling: Tailwind CSS
Language: TypeScript (strict mode)
Package Manager: pnpm

# Security Tools
Security Scanning: Semgrep, npm audit
Secret Detection: gitleaks
Header Validation: securityheaders.com
Dynamic Scanning: OWASP ZAP (staging)

# Performance Tools
Lighthouse CI: Automated on every build
Core Web Vitals: Real User Monitoring
Image Optimization: Framework-native

# Hosting Options
Vercel, Netlify, Cloudflare Pages
```

---

## Project-Specific Context (Fill This In Too!)

> **Required**: Fill in these sections before running workflows. The more detail you provide, the better the AI can research and build autonomously.

### Design Preferences

```yaml
Style: Modern, Bold, Corporate yet Approachable
Color Preferences:
  Primary Background: Deep slate/navy (#0F172A) - sophisticated, trustworthy
  Primary Accent: Electric blue (#3B82F6) - innovation, confidence
  Alternative Accent: Violet (#8B5CF6) - creativity, premium feel
  Neutral: Warm slate tones for approachability
  CTA/Success: Vibrant teal or coral for action buttons
  Note: Moving away from "nerdy" neon green to refined, professional palette
Typography:
  Headlines: Space Grotesk - tech-forward, distinctive, memorable
  Body: Inter - clean, highly legible, designed for screens
  Alternative: Geist (Vercel's font) for precision feel
Imagery Style: Professional, human-centric, outcome-focused
Animation Level: Rich but tasteful (Motion library for React islands)
```

### Existing Site (If Modernizing)

```yaml
Current Site URL: https://www.hybe.tech/
Project Type: Redesign
Content Strategy: Rewrite. Use our existing content as guidance, but our plan is to simplify our messaging to Consultation, Training, Implementation, and Development of Boutique AI Solutions. We are building products that we plan to sell as solutions by Hybetech, but we haven't figured out the right strategy for that yet.
What Works: Nothing really. The website is not generating any real interest and we aren't getting any feedback.
Pain Points: We've struggled to create an engaging and exciting site to help drive our new company to success.
```

### Hosting Platform

```yaml
Preferred Host: AWS (I'm currently using Lightsail)
Existing Host: AWS (Lightsail)
Constraints: I don't want to spend lots of money - we're a startup that isn't making any money yet.

# Platform capabilities quick reference:
# Vercel: Best for Next.js, full SSR/serverless/edge
# Netlify: Great all-around, built-in forms, SSR/serverless
# Cloudflare: Edge-first, excellent Astro support, Workers
# AWS Amplify: Enterprise, full control, more complex
# Static/Shared: SSG only, no server features, forms need external service
```

### Content Structure

```yaml
Pages Needed:
  - Home (Hero + Trust bar + Services overview + Testimonial + CTA)
  - About (Company story + Team + Values + Credibility)
  - Services (Overview page linking to individual services)
  - Services/Consultation (AI strategy and assessment)
  - Services/Training (Team education on AI tools)
  - Services/Implementation (Deploying AI into workflows)
  - Services/Development (Custom boutique AI solutions)
  - Case Studies (Problem → Solution → Results format) [Priority]
  - Insights/Blog (Thought leadership, AI education)
  - Contact (Form + Calendly booking + Direct contact)

Features Needed:
  - [x] Contact Form (via Formspree or Netlify Forms)
  - [x] Blog/News (Astro Content Collections)
  - [x] Newsletter Signup (ConvertKit/Mailchimp embed)
  - [ ] User Authentication (NOT NEEDED)
  - [ ] E-commerce (NOT NEEDED)
  - [ ] CMS Integration (NOT NEEDED - Markdown sufficient initially)
  - [ ] Search (NOT NEEDED initially)
  - [x] Dark Mode (CSS variables + toggle)
  - [ ] Internationalization (NOT NEEDED)
  - [ ] PWA / App-Like Experience (NOT NEEDED)
  - [x] Rich Animations (Motion library for islands)
  - [ ] Web Game Elements (NOT NEEDED)
```

### Competitors to Analyze

```yaml
Competitors (Researched December 2025):
  Enterprise Leaders (Aspirational):
    - Miquido (miquido.com) - Outcome-focused messaging, strong trust signals
    - Imaginary Cloud (imaginarycloud.com) - "Response in 1 hour", quantified results
    - Markovate (markovate.com) - Clear AI positioning, clean design

  Boutique Competitors (Direct):
    - AI REV (airev.us) - Narrow focus, impressive logos despite boutique size
    - MQLFlow (mqlflow.com) - AI accessibility for small businesses

  Key Insights:
    - Lead with outcomes, not technology
    - Include quantified results and social proof
    - Specific CTAs outperform generic "Contact Us"
    - Balance tech credibility with approachability
```

### Technical Decisions (From Discovery)

```yaml
Framework: Astro (recommended)
  Rationale: Content-heavy marketing site, 0 JS default, excellent SEO, static output fits budget
  Alternative: Next.js static export if more interactivity needed

Hosting: Cloudflare Pages (recommended migration)
  Rationale: Free tier, edge CDN, simpler than Lightsail, better performance
  Current: AWS Lightsail
  Fallback: Stay on Lightsail with static Astro build

Form Handling: Formspree or Netlify Forms
  Rationale: No backend required, works with static hosting

Animation: Motion library (React islands in Astro)
  Rationale: 2.5x faster than GSAP, tree-shakeable, excellent React support
```

---

## Behavioral Guardrails

### Security-First Skill
- All user input is treated as malicious until validated
- Security headers are mandatory, not optional
- Dependencies are scanned before every deploy
- Secrets never appear in code or logs

### Mobile-First Skill
- Start with 320px viewport, enhance upward
- Touch targets minimum 44px
- No hover-only interactions
- Fast mobile load (<3s LCP on 3G)

### Performance-Aware Skill
- No unoptimized images (WebP/AVIF required)
- No render-blocking resources
- Lazy load below-the-fold content
- Code split by route

### SEO-Conscious Skill
- Every page has unique title and meta description
- Proper heading hierarchy (single H1)
- Structured data (JSON-LD) on all pages
- Sitemap and robots.txt generated

### Accessible-Design Skill
- Semantic HTML over divs
- Form labels required
- Alt text on all images
- Keyboard focus visible

### Animation-Aware Skill
- Always respect `prefers-reduced-motion`
- Use GPU-accelerated properties (transform, opacity)
- Keep UI feedback under 300ms
- Test on low-end devices

### Content-Managed Skill
- Structure content for CMS from the start
- Use GROQ parameters, never string interpolation
- Separate public/private API clients
- Never expose API tokens to client

### App-Like-Experience Skill
- Include all iOS Safari meta tags
- Handle safe areas (notch padding)
- Detect and adapt to standalone mode
- Use app-like navigation patterns

---

## Anti-Patterns to Avoid

**NEVER:**
- Skip security validation "to save time"
- Use inline styles instead of design tokens
- Ignore mobile viewport
- Add hover-only interactions without touch alternatives
- Use `any` type in TypeScript
- Commit without running linters
- Deploy without security scan
- Create new files when existing can be updated

**ALWAYS:**
- Validate all inputs (client AND server)
- Test on real mobile devices
- Check Lighthouse before deploy
- Use semantic HTML
- Include alt text
- Run security scan
- Update documentation when code changes

---

## Tool Usage Guidelines

### Slash Commands

**Workflows** (Complete phases):
- `/workflows:discover` - Research and requirements
- `/workflows:design` - Design system generation
- `/workflows:architect` - Framework selection
- `/workflows:build` - Website generation
- `/workflows:page <name>` - Add page
- `/workflows:component <name>` - Add component
- `/workflows:seo` - SEO optimization
- `/workflows:security` - Security audit
- `/workflows:performance` - Core Web Vitals
- `/workflows:deploy` - CI/CD setup
- `/workflows:cms` - CMS integration (Sanity/Contentful/Strapi)
- `/workflows:pwa` - PWA and app-like experience
- `/workflows:animations` - Modern animations (Motion/GSAP/Lottie)
- `/workflows:images` - Stock photo sourcing
- `/workflows:game` - Web game setup (Phaser/PixiJS/Three.js)
- `/workflows:modernize` - Existing site analysis and migration

**Tools** (Targeted tasks):
- `/tools:research <url>` - Analyze competitor
- `/tools:lighthouse` - Run audit
- `/tools:scan` - Security scan
- `/tools:validate` - HTML/CSS validation
- `/tools:sitemap` - Generate sitemap
- `/tools:schema` - Structured data

**Quick** (Micro-tasks):
- `/quick:meta` - Meta tags
- `/quick:image` - Image optimization
- `/quick:header` - Security headers

### Agents

- `design-researcher` - Trend and competitor analysis
- `security-auditor` - OWASP vulnerability detection
- `seo-specialist` - SEO optimization
- `performance-optimizer` - Core Web Vitals tuning
- `accessibility-auditor` - WCAG compliance

---

## Quality Checks

Before considering ANY work complete:

- [ ] All pages render correctly on mobile
- [ ] Lighthouse score 90+ all categories
- [ ] No security scan warnings/errors
- [ ] SEO meta tags on all pages
- [ ] Structured data validates
- [ ] All forms have validation
- [ ] Images optimized
- [ ] No console errors
- [ ] Accessibility passes WAVE tool
- [ ] **Header/nav text clearly visible** (contrast validated)
- [ ] Documentation updated

---

**Philosophy**: AI executes, you approve. Security first. Quality over speed.
