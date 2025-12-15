# Site Modernization Workflow

Analyze and modernize an existing website with modern technologies and best practices.

---

## When to Use

Use this workflow when:
- Client has an existing website that needs updating
- Site needs performance/accessibility improvements
- Design feels outdated but content is valuable
- Moving from legacy platform to modern stack

---

## Step 1: Gather Existing Site Information

Before running `/workflows:discover`, collect:

```yaml
Existing Site URL: [current-site.com]
Project Type:
  - MODERNIZE: Keep structure, update design/tech
  - REDESIGN: Complete overhaul with new approach
  - MIGRATE: Move to new platform, keep content

Content Strategy:
  - ALL: Migrate everything as-is
  - SELECTIVE: Review and curate
  - REWRITE: Fresh content

What Works:
  - [List elements to preserve]

Pain Points:
  - [List issues to fix]
```

---

## Step 2: Run Site Analysis

Analyze the existing site thoroughly:

### Content Inventory

```bash
# Crawl existing site
# Use sitemap or manual discovery
# Document all pages and their purposes
```

**For each page, document:**
- URL and title
- Primary content/purpose
- Key messaging
- Images and media
- SEO metadata
- Traffic/importance (if analytics available)

### Technical Audit

```bash
# Run Lighthouse on key pages
npx lighthouse [URL] --output json --output-path ./audit.json
```

**Check:**
- Performance score and issues
- Accessibility violations
- SEO problems
- Best practice warnings
- Current tech stack (view-source, Wappalyzer)

### Design Audit

Document:
- Color palette (use color picker)
- Typography (fonts, sizes)
- Logo and brand assets
- Layout patterns
- Navigation structure
- Component library (if any)

### SEO Status

Document:
- Current rankings (Search Console if available)
- Indexed pages
- Backlinks (Ahrefs, Moz if available)
- URL structure
- Redirects needed for new structure

---

## Step 3: Find Modern Inspiration

Based on existing site's offerings, research:

1. **Similar Successful Sites**
   - Find 3-5 modern sites in same industry
   - Note what they do better
   - Identify innovations to adopt

2. **Best-in-Class Examples**
   - Award-winning sites (Awwwards, CSS Design Awards)
   - Industry leaders
   - Emerging design trends

3. **Competitive Gap Analysis**
   - Features competitors have that existing site lacks
   - Modern patterns not yet adopted
   - Performance/accessibility improvements

---

## Step 4: Create Migration Plan

### Content Migration Matrix

| Page | Action | Notes |
|------|--------|-------|
| Homepage | Redesign | Keep messaging, new layout |
| About | Migrate | Update images |
| Services | Restructure | Split into sub-pages |
| Blog | Migrate | All 50 posts |
| Contact | Simplify | Remove form fields |

### URL Redirect Map

```
/old-page → /new-page
/services/old-name → /services/new-name
/blog/YYYY/MM/slug → /blog/slug
```

### Asset Migration

- Logo: Keep / Update / Redesign
- Images: Keep / Optimize / Replace
- Videos: Keep / Re-encode / Replace
- Documents: Keep / Convert / Archive

---

## Step 5: Proceed with Standard Flow

After analysis, continue with:

1. `/workflows:discover` - Include existing site findings
2. `/workflows:design` - Reference preserved brand elements
3. `/workflows:architect` - Plan for content migration
4. `/workflows:build` - Implement with migration hooks

---

## Modernization vs Redesign Decision Tree

```
START
  │
  ├─ Is branding/messaging working?
  │   ├─ YES → Is only the tech outdated?
  │   │         ├─ YES → MODERNIZE (preserve design, update tech)
  │   │         └─ NO → REDESIGN with brand preservation
  │   └─ NO → Full REDESIGN
  │
  ├─ Is content valuable?
  │   ├─ YES → Plan content migration
  │   └─ NO → Plan content rewrite
  │
  └─ Are there SEO rankings to preserve?
      ├─ YES → Careful URL mapping, 301 redirects
      └─ NO → Can restructure freely
```

---

## Output: Modernization Brief

```markdown
# [Site Name] Modernization Brief

## Current State
- URL: [current-site.com]
- Tech Stack: [current technologies]
- Performance: [X/100]
- Accessibility: [X/100]
- Last Updated: [date or estimate]

## Decision
Project Type: [MODERNIZE / REDESIGN]
Rationale: [why this approach]

## Preserve
- [Brand elements to keep]
- [Content to migrate]
- [URLs requiring redirects]

## Change
- [Design updates]
- [Tech stack changes]
- [New features]

## Remove
- [Outdated content]
- [Unused pages]
- [Legacy features]

## Migration Plan
- Content: [X pages to migrate]
- Redirects: [X URLs to redirect]
- Assets: [X images, X documents]
- Timeline: [phases]

## Modern Inspiration
1. [site1.com] - [what to learn]
2. [site2.com] - [what to learn]
3. [site3.com] - [what to learn]

## Risk Mitigation
- SEO: [redirect strategy]
- Users: [communication plan]
- Downtime: [deployment strategy]
```

---

## Checklist

- [ ] Existing site fully audited
- [ ] Content inventory complete
- [ ] Brand assets collected
- [ ] SEO baseline documented
- [ ] Redirect map created
- [ ] Modern inspiration gathered
- [ ] Decision (modernize/redesign) documented
- [ ] Migration plan approved

---

**After this workflow, proceed to `/workflows:discover` with existing site context.**
