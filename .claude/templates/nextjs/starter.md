# Next.js App Router Starter

WebLord-optimized Next.js 14+ starter with security, performance, and SEO built-in.

## Quick Start

```bash
# Create project
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir

# Install additional dependencies
pnpm add clsx tailwind-merge
pnpm add -D @types/node

# Copy WebLord configuration
# (Automated during /workflows:architect)
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with security headers
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Tailwind + custom styles
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Robots.txt
│   └── [pages]/            # Additional pages
├── components/
│   ├── ui/                 # Button, Input, Card, etc.
│   ├── sections/           # Hero, Features, CTA, etc.
│   └── layout/             # Header, Footer, Container
├── lib/
│   ├── utils.ts            # Utility functions
│   └── constants.ts        # Site constants
├── styles/
│   └── design-tokens/      # Colors, typography, spacing
└── types/
    └── index.ts            # TypeScript types
```

## Configuration Files

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';",
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

module.exports = nextConfig;
```

### tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
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

export default config;
```

## Root Layout Template

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: '[Site Name]',
    template: '%s | [Site Name]',
  },
  description: '[Site description]',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    type: 'website',
    siteName: '[Site Name]',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@username',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
```

## Utility Functions

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add more pages
  ];
}
```

## Robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

## Checklist

After setup, verify:
- [ ] Security headers configured
- [ ] TypeScript strict mode
- [ ] Tailwind with design tokens
- [ ] Root layout with skip link
- [ ] Sitemap generation
- [ ] robots.txt configured
- [ ] Meta tags in layout
- [ ] Font optimization (next/font)
