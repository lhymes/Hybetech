# Headless CMS Integration Guide

**Purpose**: Secure content management for WebLord websites
**Updated**: December 2025
**Sources**: Sanity, Contentful, Strapi official documentation

---

## Overview

A headless CMS provides content management without a frontend, delivering content via API. This architecture:
- Reduces attack surface (decoupled from presentation)
- Enables multi-channel content delivery
- Provides structured content modeling
- Supports real-time collaboration

---

## Recommended CMS Options

### Selection Matrix

| CMS | Best For | Pricing | Self-Host | Security |
|-----|----------|---------|-----------|----------|
| **Sanity** | Real-time collaboration, developer flexibility | Generous free tier | No (managed) | SOC 2, GDPR |
| **Contentful** | Enterprise, large teams, complex workflows | $489+/mo enterprise | No (managed) | SOC 2, ISO 27001 |
| **Strapi** | Full control, open-source, self-hosted | Free (self-host) | Yes | User-managed |

### Decision Tree

```
START
  │
  ├─ Need full control over data/hosting?
  │   └─ YES → STRAPI (self-hosted)
  │
  ├─ Need real-time collaborative editing?
  │   └─ YES → SANITY
  │
  ├─ Enterprise with complex approval workflows?
  │   └─ YES → CONTENTFUL
  │
  ├─ Budget-conscious project?
  │   └─ YES → SANITY (free tier) or STRAPI
  │
  └─ Default → SANITY (best developer experience)
```

---

## Sanity (Recommended)

### Why Sanity

- **GROQ Query Language**: Powerful, type-safe content queries
- **Sanity Studio**: Customizable React-based admin UI
- **Real-time Collaboration**: Google Docs-style editing
- **Portable Text**: Rich text with full control
- **Content Lake**: Structured content as data

### Security Best Practices

```typescript
// ✅ CORRECT: Use GROQ parameters (prevents injection)
const query = `*[_type == "post" && slug.current == $slug][0]`;
const post = await client.fetch(query, { slug: userInput });

// ❌ WRONG: String interpolation (vulnerable)
const query = `*[_type == "post" && slug.current == "${userInput}"][0]`;
```

### Token Security

```typescript
// sanity.client.ts
import { createClient } from '@sanity/client';

// PUBLIC: Content Delivery (read-only, safe for browser)
export const publicClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN caching
  // NO TOKEN - public read access only
});

// PRIVATE: Server-side only (never expose to browser)
export const privateClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!, // Server-side only!
});
```

### Dataset Security

```yaml
# Production dataset: PRIVATE
# - Requires authentication for all queries
# - Use for draft/unpublished content
# - Use for member-only content

# Public dataset: PUBLIC
# - Public documents queryable without auth
# - Draft documents (starting with 'drafts.') still protected
# - Use for fully public content sites
```

### Webhook Security

```typescript
// Verify webhook signature
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

export async function POST(request: Request) {
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();

  if (!isValidSignature(body, signature!, process.env.SANITY_WEBHOOK_SECRET!)) {
    return new Response('Invalid signature', { status: 401 });
  }

  // Process webhook...
}
```

---

## Contentful

### Security Configuration

```typescript
// Environment-specific tokens
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Use Preview API for drafts (server-side only)
const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!, // Different token!
  host: 'preview.contentful.com',
});
```

### Token Best Practices

1. **Separate tokens per environment** (dev, staging, prod)
2. **Set token expiration** for PATs
3. **Use CDA token for public content** (read-only)
4. **Keep CMA token server-side only** (write access)
5. **Rotate tokens regularly**

---

## Strapi (Self-Hosted)

### Security Hardening

```typescript
// config/middlewares.ts
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'"],
          'img-src': ["'self'", 'data:', 'blob:', 'cdn.example.com'],
        },
      },
      frameguard: { action: 'deny' },
      hsts: { maxAge: 31536000, includeSubDomains: true },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### API Token Configuration

```bash
# .env (never commit)
ADMIN_JWT_SECRET=<random-64-char-string>
API_TOKEN_SALT=<random-64-char-string>
JWT_SECRET=<random-64-char-string>

# Generate secure secrets
openssl rand -base64 48
```

---

## Integration Patterns

### Next.js + Sanity

```typescript
// app/posts/[slug]/page.tsx
import { publicClient } from '@/lib/sanity';

export async function generateStaticParams() {
  const slugs = await publicClient.fetch(`*[_type == "post"].slug.current`);
  return slugs.map((slug: string) => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await publicClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  return <article>{/* Render post */}</article>;
}
```

### Astro + Sanity

```astro
---
// src/pages/posts/[slug].astro
import { sanityClient } from '@/lib/sanity';

export async function getStaticPaths() {
  const posts = await sanityClient.fetch(`*[_type == "post"]{ slug }`);
  return posts.map((post) => ({
    params: { slug: post.slug.current },
  }));
}

const { slug } = Astro.params;
const post = await sanityClient.fetch(
  `*[_type == "post" && slug.current == $slug][0]`,
  { slug }
);
---

<article>{/* Render post */}</article>
```

---

## Content Modeling Best Practices

### Schema Design

```typescript
// schemas/post.ts (Sanity example)
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', validation: (Rule) => Rule.max(60) },
        { name: 'metaDescription', type: 'text', validation: (Rule) => Rule.max(160) },
        { name: 'ogImage', type: 'image' },
      ],
    },
  ],
};
```

---

## Security Checklist

### Every CMS Integration

- [ ] API tokens stored in environment variables
- [ ] No tokens exposed to client-side code
- [ ] Webhook signatures verified
- [ ] Rate limiting configured
- [ ] CORS properly restricted
- [ ] Input validation on all queries
- [ ] Audit logging enabled

### Sanity-Specific

- [ ] Dataset visibility configured correctly
- [ ] GROQ queries use parameters (not interpolation)
- [ ] Studio access restricted by role
- [ ] Webhook secret configured

### Contentful-Specific

- [ ] Separate CDA/CMA tokens
- [ ] Environment-specific API keys
- [ ] Token expiration set
- [ ] RBAC configured

### Strapi-Specific

- [ ] JWT secrets rotated
- [ ] Admin panel secured
- [ ] Database credentials secured
- [ ] Server hardened (if self-hosted)

---

**Remember**: CMS credentials are high-value targets. Treat them with the same security as database passwords.
