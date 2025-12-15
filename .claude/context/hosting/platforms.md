# Hosting Platforms Guide

**Purpose**: Platform selection and deployment configuration
**Updated**: December 2025

---

## Platform Comparison Matrix

| Platform | SSR | Serverless | Edge | Best Framework | Pricing |
|----------|-----|------------|------|----------------|---------|
| **Vercel** | Yes | Yes (native) | Yes | Next.js | Free tier, then usage |
| **Netlify** | Yes | Yes | Yes | Any | Free tier, then usage |
| **Cloudflare Pages** | Yes | Yes (Workers) | Yes (native) | Astro | Generous free tier |
| **AWS Amplify** | Yes | Yes (Lambda) | Yes | Any | Pay as you go |
| **DigitalOcean** | Yes | Limited | No | Any (container) | $5+/mo |
| **Render** | Yes | Limited | No | Any | Free tier, then usage |
| **Railway** | Yes | Yes | No | Any | Usage-based |
| **Static/Shared** | No | No | No | Static only | Varies |

---

## Platform Details

### Vercel

**Best For**: Next.js projects, React ecosystem

```yaml
Capabilities:
  SSR: Native Next.js support
  Serverless: Edge and Node.js functions
  Edge: Middleware, Edge Config
  Analytics: Web Vitals built-in
  Preview: Automatic PR previews
  Domains: Free SSL, custom domains

Framework Support:
  Next.js: Optimal (native platform)
  Astro: Excellent
  SvelteKit: Good
  Remix: Good

Configuration:
  File: vercel.json
  CLI: vercel
```

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

### Netlify

**Best For**: JAMstack sites, built-in forms

```yaml
Capabilities:
  SSR: Via adapters
  Serverless: Netlify Functions
  Edge: Edge Functions
  Forms: Built-in form handling
  Identity: Built-in auth
  Analytics: Optional add-on

Framework Support:
  Astro: Excellent
  Next.js: Good (adapter)
  SvelteKit: Good (adapter)
  Eleventy: Excellent

Configuration:
  File: netlify.toml
  CLI: netlify
```

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"

# Built-in form handling
# Just add netlify attribute to form
```

### Cloudflare Pages

**Best For**: Edge-first, global performance

```yaml
Capabilities:
  SSR: Via Workers
  Serverless: Workers (edge-native)
  Edge: Native, fast cold starts
  KV: Key-value storage
  D1: SQLite at edge
  R2: Object storage

Framework Support:
  Astro: Excellent (native adapter)
  Next.js: Good (with adapter)
  SvelteKit: Excellent
  Remix: Excellent

Configuration:
  File: wrangler.toml
  CLI: wrangler
```

```toml
# wrangler.toml
name = "my-site"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"
```

### AWS Amplify

**Best For**: Enterprise, AWS ecosystem

```yaml
Capabilities:
  SSR: Via Lambda
  Serverless: Lambda, API Gateway
  Edge: Lambda@Edge, CloudFront
  Database: DynamoDB, RDS
  Auth: Cognito
  Storage: S3

Framework Support:
  Next.js: Good
  Astro: Good
  Any: Via custom build

Configuration:
  File: amplify.yml
  CLI: amplify
```

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Static/Shared Hosting

**Best For**: Budget sites, simple content

```yaml
Capabilities:
  SSR: NO
  Serverless: NO
  Edge: NO
  Custom Code: NO (PHP only on some)

Platforms:
  - GoDaddy
  - Bluehost
  - HostGator
  - SiteGround
  - cPanel-based hosts

Framework Options:
  - Astro (static export)
  - Next.js (static export)
  - Eleventy
  - Hugo
  - Plain HTML/CSS/JS

Limitations:
  - No server-side rendering
  - No API routes
  - No serverless functions
  - Forms need external service
  - No real-time features
```

---

## Framework + Hosting Compatibility

### Next.js

| Platform | SSR | API Routes | Edge | Notes |
|----------|-----|------------|------|-------|
| Vercel | Full | Full | Full | Native, best experience |
| Netlify | Full | Full | Full | Via adapter |
| Cloudflare | Full | Workers | Full | Via adapter |
| AWS Amplify | Full | Lambda | Partial | Good support |
| Static | Export | No | No | `next export` only |

### Astro

| Platform | SSR | Endpoints | Edge | Notes |
|----------|-----|-----------|------|-------|
| Vercel | Full | Full | Full | Official adapter |
| Netlify | Full | Full | Full | Official adapter |
| Cloudflare | Full | Workers | Full | Excellent, native feel |
| AWS | Full | Lambda | Partial | Via adapter |
| Static | No | No | No | Default static output |

### SvelteKit

| Platform | SSR | API | Edge | Notes |
|----------|-----|-----|------|-------|
| Vercel | Full | Full | Full | Official adapter |
| Netlify | Full | Full | Full | Official adapter |
| Cloudflare | Full | Workers | Full | Official adapter |
| Node.js | Full | Full | No | node adapter |
| Static | Prerender | No | No | static adapter |

---

## Deployment Checklists

### Pre-Deployment

- [ ] Environment variables configured
- [ ] Build command verified locally
- [ ] Output directory correct
- [ ] Security headers configured
- [ ] Custom domain ready (DNS)
- [ ] SSL certificate (usually automatic)

### Vercel Deployment

```bash
# Install CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Netlify Deployment

```bash
# Install CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

### Cloudflare Deployment

```bash
# Install CLI
npm i -g wrangler

# Deploy
wrangler pages deploy dist
```

---

## Form Handling by Platform

### Vercel (No Built-in)

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Send to email service, database, etc.
}
```

### Netlify (Built-in)

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <input type="text" name="name" required />
  <button type="submit">Send</button>
</form>
```

### Static Hosting (External Service)

```html
<!-- Formspree -->
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <input type="text" name="name" required />
  <button type="submit">Send</button>
</form>
```

---

## Cost Considerations

| Platform | Free Tier | Typical Small Site | Notes |
|----------|-----------|-------------------|-------|
| Vercel | 100GB bandwidth | $0-20/mo | Generous for personal |
| Netlify | 100GB bandwidth | $0-20/mo | Forms included |
| Cloudflare | Unlimited bandwidth | $0-5/mo | Very generous |
| AWS Amplify | 1000 build min | $5-50/mo | Pay per use |
| Shared Hosting | N/A | $5-15/mo | Fixed cost |

---

**Remember**: Choose hosting based on requirements, not just price. The wrong platform can limit your entire architecture.
