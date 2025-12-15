# Validate Tool

Validate HTML, CSS, and accessibility.

## Usage

```
/tools:validate
```

## Steps

### 1. HTML Validation

Check all pages for:
- Valid HTML5 structure
- Proper nesting
- Required attributes
- No deprecated elements

Common issues to check:
- [ ] DOCTYPE present
- [ ] html lang attribute
- [ ] Meta charset first
- [ ] Unique IDs
- [ ] Proper form structure

### 2. CSS Validation

Check for:
- Valid CSS syntax
- No unknown properties
- Browser compatibility
- Unused selectors

### 3. TypeScript Validation

```bash
# Run type checking
pnpm type-check
# or
npx tsc --noEmit
```

### 4. ESLint Validation

```bash
# Run linter
pnpm lint
# or
npx eslint .
```

### 5. Accessibility Validation

Check pages with:
- axe DevTools
- WAVE extension
- Lighthouse accessibility audit

Key checks:
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color contrast meets WCAG
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA used correctly

### 6. Link Validation

Check for:
- [ ] No broken internal links
- [ ] No broken external links
- [ ] No redirect chains

```bash
# Check for broken links
npx broken-link-checker http://localhost:3000 --recursive
```

### 7. Generate Report

```markdown
## Validation Results

### HTML
- Status: [pass/fail]
- Issues: [list]

### CSS
- Status: [pass/fail]
- Issues: [list]

### TypeScript
- Status: [pass/fail]
- Errors: [count]

### ESLint
- Status: [pass/fail]
- Warnings: [count]
- Errors: [count]

### Accessibility
- Score: [number]
- Critical issues: [list]

### Links
- Broken: [count]
- Redirects: [count]

### Required Fixes
[Prioritized list of fixes]
```

## Output

Validation report with all issues and recommended fixes.

## Related Commands

- Full SEO audit: `/workflows:seo`
- Performance: `/workflows:performance`
