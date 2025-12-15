# Lighthouse Tool

Run Lighthouse audit on the current project.

## Usage

```
/tools:lighthouse
```

## Steps

### 1. Check Prerequisites

Verify:
- Project is built
- Development server is running OR production build exists

### 2. Run Lighthouse

```bash
# If dev server running
npx lighthouse http://localhost:3000 --view

# For specific pages
npx lighthouse http://localhost:3000/about --view
npx lighthouse http://localhost:3000/contact --view
```

### 3. Analyze Results

Check each category:

**Performance (Target: 90+)**
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- Total Blocking Time
- Speed Index

**Accessibility (Target: 90+)**
- Color contrast
- Alt text
- Form labels
- ARIA attributes
- Keyboard navigation

**Best Practices (Target: 90+)**
- HTTPS
- No console errors
- No deprecated APIs
- Image aspect ratios

**SEO (Target: 90+)**
- Meta tags
- Structured data
- Crawlability
- Mobile friendly

### 4. Generate Summary

```markdown
## Lighthouse Audit Results

| Category | Score | Status |
|----------|-------|--------|
| Performance | [score] | [pass/fail] |
| Accessibility | [score] | [pass/fail] |
| Best Practices | [score] | [pass/fail] |
| SEO | [score] | [pass/fail] |

### Issues Found
[List of issues with recommendations]

### Quick Wins
[Easy fixes with biggest impact]
```

### 5. Recommendations

For any score below 90, provide specific recommendations:
- What to fix
- How to fix it
- Expected impact

## Output

Lighthouse audit summary with actionable recommendations.

## Related Commands

- Performance workflow: `/workflows:performance`
- SEO workflow: `/workflows:seo`
