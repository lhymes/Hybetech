# Astro Starter

WebLord-optimized Astro starter with zero JavaScript by default, security, and SEO built-in.

## Quick Start

```bash
# Create project
pnpm create astro@latest . --template minimal --typescript strict

# Install integrations
pnpm add @astrojs/tailwind @astrojs/sitemap
pnpm add tailwindcss

# Copy WebLord configuration
# (Automated during /workflows:architect)
```

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro        # Base layout with security headers
├── pages/
│   ├── index.astro         # Homepage
│   └── [pages].astro       # Additional pages
├── components/
│   ├── ui/                 # Button, Card, etc.
│   ├── sections/           # Hero, Features, CTA
│   └── layout/             # Header, Footer
├── styles/
│   ├── global.css          # Global styles
│   └── design-tokens/      # Colors, typography
├── content/                # Content collections (if needed)
│   └── config.ts
└── types/
    └── index.ts
public/
├── robots.txt
└── favicon.svg
```

## Configuration Files

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
```

### tailwind.config.mjs

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Design tokens integrated here
      },
      fontFamily: {
        // Typography tokens
      },
    },
  },
  plugins: [],
};
```

## Base Layout Template

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image = '/og-image.jpg' } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.site)} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(image, Astro.site)} />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Preconnect to required origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  </head>
  <body>
    <a href="#main-content" class="sr-only focus:not-sr-only">
      Skip to main content
    </a>
    <slot />
  </body>
</html>

<style is:global>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 0.5rem 1rem;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
</style>
```

## Page Template

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Header from '../components/layout/Header.astro';
import Footer from '../components/layout/Footer.astro';
import Hero from '../components/sections/Hero.astro';
---

<Layout
  title="Home | [Site Name]"
  description="[Compelling description with CTA]"
>
  <Header />
  <main id="main-content">
    <Hero />
    <!-- More sections -->
  </main>
  <Footer />
</Layout>
```

## Security Headers (Vercel)

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';" }
      ]
    }
  ]
}
```

## Security Headers (Netlify)

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
```

## robots.txt

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap-index.xml
```

## Checklist

After setup, verify:
- [ ] TypeScript strict mode
- [ ] Tailwind configured
- [ ] Base layout with meta tags
- [ ] Skip link for accessibility
- [ ] Sitemap integration
- [ ] robots.txt in public/
- [ ] Security headers for hosting platform
- [ ] compressHTML enabled
