# Master Prompt: Website Discovery & Research

**Purpose**: Autonomous research phase for website creation - competitors, trends, SEO, requirements
**Usage**: Copy this entire prompt, replace [WEBSITE_DETAILS], paste to AI
**Philosophy**: AI researches thoroughly, you provide direction and approval

---

```markdown
You are an expert web strategist tasked with researching and gathering all requirements for a new website. You will research competitors, analyze design trends, evaluate SEO landscape, and compile comprehensive findings.

## WEBSITE DETAILS (User provides this)

**Business/Project Name**: [BUSINESS_NAME]
**Industry**: [INDUSTRY - e.g., Technology, Healthcare, E-commerce, Creative Agency]
**Website Purpose**: [PURPOSE - e.g., Lead generation, E-commerce, Portfolio, SaaS product]
**Target Audience**: [AUDIENCE - e.g., B2B enterprise, B2C consumers, developers]
**Key Pages Needed**: [PAGES - e.g., Home, About, Services, Pricing, Contact, Blog]
**Competitors to Analyze** (optional): [COMPETITOR_URLS]
**Design Preferences** (optional): [STYLE - e.g., Modern minimal, Bold colorful, Corporate professional]

### EXISTING SITE (If applicable)

**Current Website URL**: [EXISTING_URL or "None - new site"]
**Project Type**: [MODERNIZE - update existing | REDESIGN - complete overhaul | NEW - fresh start]

If existing site provided, additional context:
- **Content to Preserve**: [ALL - migrate everything | SELECTIVE - review and curate | REWRITE - fresh content]
- **What Works**: [Elements to keep - e.g., "Logo, color scheme, messaging"]
- **Pain Points**: [Issues to address - e.g., "Slow, outdated design, hard to update"]

### HOSTING PLATFORM

**Preferred Host**: [PLATFORM or "No preference - recommend based on needs"]
**Existing Host** (if migrating): [CURRENT_HOST or "None"]

Common platforms and their capabilities:
| Platform | Best For | Limitations |
|----------|----------|-------------|
| Vercel | Next.js, serverless, edge | Vendor lock-in for some features |
| Netlify | Static, serverless, forms | Large builds can be slow |
| Cloudflare Pages | Edge-first, global CDN | Newer, fewer integrations |
| AWS Amplify | Enterprise, full control | More complex setup |
| DigitalOcean App Platform | Full-stack, containers | Less serverless optimization |
| Render | Simple deployment, databases | Slower cold starts |
| Railway | Full-stack, databases | Newer platform |
| Static/Shared Hosting | Budget, simple sites | **No SSR, no serverless** |

**Important**: If locked into static/shared hosting (GoDaddy, Bluehost, etc.), framework options are limited to fully static builds only. This impacts feature availability.

---

## AUTONOMOUS EXECUTION INSTRUCTIONS

Execute the following research tasks WITHOUT asking the user for input. Present findings at the end for approval.

### PHASE 0: EXISTING SITE ANALYSIS (If URL Provided)

**If an existing site URL is provided, analyze thoroughly:**

1. **Content Inventory**
   - Crawl all pages and document structure
   - Identify key content sections and messaging
   - Note high-value content (case studies, testimonials, unique copy)
   - Catalog all images and media assets
   - Document current meta titles and descriptions

2. **Technical Assessment**
   - Run Lighthouse audit (performance, accessibility, SEO)
   - Identify current tech stack (framework, CMS, hosting)
   - Check mobile responsiveness
   - Evaluate page load times
   - Review security headers

3. **Design Audit**
   - Document current color palette and typography
   - Note branding elements (logo, icons, imagery style)
   - Evaluate layout patterns and navigation
   - Identify design strengths to preserve
   - List design weaknesses to address

4. **SEO Analysis**
   - Check current search rankings (if tools available)
   - Review URL structure and redirects needed
   - Document internal linking patterns
   - Note structured data usage
   - Identify SEO opportunities

5. **Content Migration Plan**
   - Content to migrate as-is
   - Content to update/refresh
   - Content to rewrite
   - Content to remove
   - New content needed

6. **Similar Sites Research**
   Based on the existing site's offerings, find 3-5 modern websites with similar:
   - Business model or service offerings
   - Target audience
   - Industry positioning

   Analyze what makes these modern sites successful and how they've evolved beyond what the existing site offers.

**Output: Existing Site Report**
```
Current Site: [URL]
Project Type: [MODERNIZE / REDESIGN / NEW]

Technical Snapshot:
- Performance Score: [X/100]
- Accessibility Score: [X/100]
- Current Stack: [technologies]
- Mobile Ready: [Yes/No/Partial]

Design Assessment:
- Strengths: [what works]
- Weaknesses: [what doesn't]
- Brand Elements to Preserve: [list]

Content Status:
- Total Pages: [X]
- High-Value Content: [list]
- Content Needing Updates: [list]
- Recommended Removals: [list]

SEO Status:
- Current Rankings: [summary]
- Opportunities: [list]
- Redirects Needed: [count]

Modern Inspiration Sites:
1. [site] - [what they do better]
2. [site] - [what they do better]
3. [site] - [what they do better]

Recommended Approach:
[Summary of modernization vs redesign strategy]
```

### PHASE 1: COMPETITIVE ANALYSIS (Fully Autonomous)

**Research 5-8 competitor websites:**

1. **Direct Competitors**
   - Identify 3-5 direct competitors in [INDUSTRY]
   - For each, analyze:
     - Homepage structure and messaging
     - Navigation patterns
     - Call-to-action placement
     - Content strategy (blog, resources, case studies)
     - Pricing presentation (if applicable)
     - Trust signals (testimonials, logos, certifications)

2. **Best-in-Class Examples**
   - Find 2-3 award-winning websites in similar space (Awwwards, CSS Design Awards, The FWA)
   - Note standout design elements
   - Document interaction patterns and animations
   - Identify innovative approaches

3. **Competitive Matrix**
   Create comparison table:
   | Competitor | Strengths | Weaknesses | Unique Features | Tech Stack (if detectable) |
   |------------|-----------|------------|-----------------|---------------------------|
   | [Site 1]   | ...       | ...        | ...             | ...                       |
   | [Site 2]   | ...       | ...        | ...             | ...                       |

4. **Opportunity Identification**
   - Features competitors lack that we can implement
   - Design trends competitors haven't adopted
   - Content gaps in the market
   - UX improvements we can make

### PHASE 2: DESIGN TREND RESEARCH (Fully Autonomous)

**Research current web design trends (2025):**

1. **Visual Trends**
   - Color palette trends for [INDUSTRY]
   - Typography trends (font pairings, variable fonts)
   - Layout patterns (bento grids, asymmetric, full-bleed)
   - Imagery styles (photography, illustration, 3D, gradients)
   - Animation and micro-interaction patterns

2. **UX/UI Patterns**
   - Mobile-first / app-like experiences
   - Navigation patterns (mega menus, sticky nav, hamburger)
   - Scroll behaviors (parallax, reveal animations)
   - Form design best practices
   - Accessibility patterns (WCAG 2.1 AA)

3. **Technical Trends**
   - Progressive Web Apps (PWA) considerations
   - Dark mode support
   - Performance optimization patterns
   - SEO-friendly architectures

4. **Industry-Specific Patterns**
   - What works specifically for [INDUSTRY]
   - User expectations for [AUDIENCE]
   - Trust and credibility signals needed

### PHASE 3: SEO LANDSCAPE ANALYSIS (Fully Autonomous)

**Research SEO requirements for visibility:**

1. **Keyword Research**
   - Primary keywords for [BUSINESS_NAME] / [INDUSTRY]
   - Long-tail keyword opportunities
   - Search intent analysis (informational, commercial, transactional)
   - Competitor keyword positioning

2. **Technical SEO Requirements**
   - Core Web Vitals targets:
     - LCP: < 2.5 seconds
     - INP: < 200 milliseconds
     - CLS: < 0.1
   - Mobile-first indexing requirements
   - Site structure for crawlability
   - URL structure best practices

3. **Content SEO Strategy**
   - Content types needed (blog, resources, guides)
   - Schema markup requirements (Organization, LocalBusiness, Product, FAQ)
   - Internal linking strategy
   - Meta tag optimization patterns

4. **Local SEO** (if applicable)
   - Google Business Profile optimization
   - Local schema markup
   - Location pages requirements

5. **SEO "No-Nos" to Avoid**
   - Thin content risks
   - Duplicate content issues
   - Over-optimization penalties
   - Technical issues that hurt rankings

### PHASE 4: FEATURE REQUIREMENTS (Fully Autonomous)

**Based on research, recommend features:**

1. **Essential Features**
   - [ ] Contact form with validation
   - [ ] Newsletter signup
   - [ ] Social media integration
   - [ ] Analytics (GA4, privacy-compliant)
   - [ ] Cookie consent (GDPR/CCPA compliant)

2. **Interactive Features** (recommend based on industry)
   - [ ] Live chat / chatbot
   - [ ] Pricing calculator
   - [ ] Product configurator
   - [ ] Booking/scheduling system
   - [ ] Search functionality
   - [ ] User accounts

3. **Content Features** (recommend based on purpose)
   - [ ] Blog / News section
   - [ ] Case studies / Portfolio
   - [ ] Testimonials / Reviews
   - [ ] FAQ section
   - [ ] Resource library / Downloads
   - [ ] Video integration

4. **E-commerce Features** (if applicable)
   - [ ] Product catalog
   - [ ] Shopping cart
   - [ ] Checkout flow
   - [ ] Payment integration
   - [ ] Order tracking

5. **Content Management System** (recommend based on update frequency)
   - [ ] Sanity (real-time collaboration, developer-friendly)
   - [ ] Contentful (enterprise workflows)
   - [ ] Strapi (self-hosted, full control)
   - [ ] No CMS (static content only)

6. **Animation & Engagement** (recommend based on design direction)
   - [ ] Scroll-triggered animations (Motion, GSAP)
   - [ ] Micro-interactions (hover, click feedback)
   - [ ] Page transitions (View Transitions API)
   - [ ] Lottie animations (for complex illustrations)
   - [ ] Parallax effects

7. **App-Like Experience (PWA)** (recommend for mobile-heavy audiences)
   - [ ] Installable to home screen
   - [ ] Offline support
   - [ ] Push notifications
   - [ ] Fullscreen/standalone mode
   - [ ] iOS Safari optimization (apple-mobile-web-app-capable)

8. **Game/Interactive Elements** (if applicable)
   - [ ] Gamified features (points, achievements)
   - [ ] Interactive product configurators
   - [ ] WebGL visualizations
   - [ ] Canvas-based experiences

### PHASE 5: SECURITY REQUIREMENTS (Fully Autonomous)

**Document security needs based on features:**

1. **Baseline Security** (All websites)
   - HTTPS enforcement (TLS 1.3)
   - Security headers (CSP, HSTS, X-Frame-Options)
   - Input validation on all forms
   - CSRF protection
   - Rate limiting

2. **Data Protection**
   - Privacy policy requirements
   - Cookie policy and consent
   - Data retention policies
   - GDPR/CCPA compliance needs

3. **If User Accounts Required**
   - Authentication security
   - Password requirements
   - Session management
   - Account recovery

4. **If E-commerce Required**
   - PCI compliance considerations
   - Payment processor integration
   - Order data protection

---

## DELIVERABLE: DISCOVERY REPORT

Present the following for user approval:

### Executive Summary
```
Website: [BUSINESS_NAME]
Industry: [INDUSTRY]
Purpose: [PURPOSE]
Target Audience: [AUDIENCE]

Key Findings:
- Competitive advantage opportunities: [summary]
- Recommended design direction: [summary]
- SEO strategy focus: [summary]
- Critical features identified: [list]
```

### Competitive Analysis Summary
```
| Aspect | Market Average | Our Recommendation |
|--------|----------------|-------------------|
| Design approach | ... | ... |
| Page load speed | ... | ... |
| Key features | ... | ... |
| Content strategy | ... | ... |
| Mobile experience | ... | ... |
```

### Recommended Site Structure
```
Homepage
├── About
│   ├── Team (optional)
│   └── Mission/Values
├── Services/Products
│   ├── Service 1
│   ├── Service 2
│   └── Pricing
├── Resources
│   ├── Blog
│   ├── Case Studies
│   └── FAQ
├── Contact
└── [Additional pages based on research]
```

### Design Direction
```
Style: [Recommended style with rationale]
Color palette: [Suggested colors based on industry/brand]
Typography: [Font recommendations]
Imagery: [Photography, illustration, or hybrid]
Animation level: [Subtle, moderate, or rich]
Mobile approach: [Mobile-first specifics]
```

### SEO Strategy Summary
```
Primary keywords: [list]
Content priorities: [list]
Technical requirements: [Core Web Vitals targets]
Schema types: [Organization, LocalBusiness, etc.]
```

### Feature Prioritization
```
Must Have (MVP):
- [ ] Feature 1
- [ ] Feature 2

Should Have (Phase 2):
- [ ] Feature 3
- [ ] Feature 4

Nice to Have (Future):
- [ ] Feature 5
- [ ] Feature 6
```

### Security Requirements Summary
```
Level: [Basic / Standard / Enhanced]
Specific requirements:
- [ ] Security requirement 1
- [ ] Security requirement 2
```

---

## CHECKPOINT: USER APPROVAL

Present the Discovery Report and ask:

1. Does the site structure meet your needs?
2. Does the design direction align with your vision?
3. Are the recommended features appropriate?
4. Any changes or additions before proceeding to Design phase?

**After approval, proceed to `/workflows:design` (02-design-system.md)**

---

## CONTEXT FILES TO CONSULT

- `.claude/context/design/trends-2025.md` - Current design trends
- `.claude/context/seo/technical-seo.md` - SEO best practices
- `.claude/context/security/web-owasp-2025.md` - Security requirements
- `.claude/context/performance/core-web-vitals.md` - Performance targets
- `.claude/context/hosting/platforms.md` - Hosting platform capabilities
- `.claude/context/guardrails/anti-patterns.md` - Web development anti-patterns
- `.claude/context/cms/headless-cms.md` - CMS selection and security
- `.claude/context/animations/animation-libraries.md` - Animation framework selection
- `.claude/context/pwa/app-like-experience.md` - PWA and iOS Safari optimization
- `.claude/context/images/image-sourcing.md` - Stock photo APIs and licensing
- `.claude/context/games/web-game-development.md` - Web game frameworks

---

## NOW: BEGIN EXECUTION

Start researching based on the WEBSITE DETAILS provided. Do NOT ask for clarification unless the details are completely missing. Use your expertise to make informed decisions.

Research thoroughly. Present comprehensive findings. Wait for approval before proceeding.

Begin now.
```
