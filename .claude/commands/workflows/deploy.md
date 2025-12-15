# Deploy Workflow

Set up CI/CD pipeline and deploy the website.

## Usage

```
/workflows:deploy
```

## Steps

### 1. Pre-Deployment Checklist

Run all audits:
- [ ] `/workflows:security` - Security audit passed
- [ ] `/workflows:seo` - SEO audit passed
- [ ] `/workflows:performance` - Performance 90+

Verify:
- [ ] All pages render correctly
- [ ] Mobile responsive
- [ ] Forms working
- [ ] No console errors
- [ ] No broken links

### 2. Environment Setup

**Environment Variables:**
```bash
# .env.local (never commit)
DATABASE_URL=
API_KEY=
SESSION_SECRET=

# .env.example (commit this)
DATABASE_URL=your-database-url
API_KEY=your-api-key
SESSION_SECRET=your-session-secret
```

**Production Checks:**
- [ ] Debug mode disabled
- [ ] Source maps disabled
- [ ] Error messages generic
- [ ] Logging configured

### 3. Select Hosting Platform

**Vercel** (Recommended for Next.js):
```bash
npm i -g vercel
vercel
```

**Netlify** (Great for Astro):
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**Cloudflare Pages** (Edge performance):
```bash
npm i -g wrangler
wrangler pages deploy
```

### 4. Configure CI/CD

**GitHub Actions:**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Type Check
        run: pnpm type-check

      - name: Build
        run: pnpm build

      - name: Security Audit
        run: pnpm audit --audit-level=high

  lighthouse:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun

  deploy:
    needs: [build, lighthouse]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      # Platform-specific deploy step
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 5. Configure Lighthouse CI

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:3000/", "http://localhost:3000/about"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### 6. Configure Security Scanning

```yaml
# Add to CI workflow
- name: Security Scan
  run: |
    npx semgrep --config=auto .
    npx gitleaks detect --source=. --verbose
```

### 7. Set Up Monitoring

**Error Tracking:**
- Sentry, LogRocket, or similar

**Analytics:**
- Google Analytics 4, Plausible, or Fathom

**Uptime Monitoring:**
- UptimeRobot, Pingdom, or similar

### 8. Configure Domain

- [ ] DNS configured
- [ ] SSL certificate active
- [ ] HTTPS redirect enabled
- [ ] www redirect configured
- [ ] Staging environment set up

### 9. Post-Deploy Verification

**Automated:**
- [ ] Lighthouse CI passes
- [ ] Security scan passes
- [ ] No build errors

**Manual:**
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Mobile navigation works
- [ ] Security headers present (securityheaders.com)
- [ ] SSL working (ssllabs.com)

### 10. Document Deployment

Write to `docs/deployment.md`:

```markdown
# Deployment Documentation

## Hosting
- Platform: [Vercel/Netlify/Cloudflare]
- URL: [production-url]
- Staging: [staging-url]

## CI/CD
- GitHub Actions configured
- Lighthouse CI on every PR
- Auto-deploy on main merge

## Environment Variables
[List required variables - no values]

## Deployment Process
1. Create PR
2. CI runs (lint, build, test, audit)
3. Lighthouse CI checks performance
4. Merge to main
5. Auto-deploy to production

## Rollback Process
[How to rollback if needed]

## Monitoring
- Error tracking: [service]
- Analytics: [service]
- Uptime: [service]
```

## Output

At completion:
- CI/CD pipeline configured
- Deployment automated
- Monitoring set up
- Documentation complete
- Site live and verified

## Related Commands

- Security: `/workflows:security`
- SEO: `/workflows:seo`
- Performance: `/workflows:performance`
