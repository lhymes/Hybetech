# CMS Integration Workflow

Set up a headless CMS for content management with security best practices.

---

## Context Files to Read First

Read these context files before proceeding:
- `.claude/context/cms/headless-cms.md` - CMS selection and security patterns

---

## CMS Selection

Based on project requirements, evaluate and recommend:

### Decision Matrix

| Requirement | Sanity | Contentful | Strapi |
|-------------|--------|------------|--------|
| Real-time collaboration | Best | Good | Limited |
| Developer flexibility | Best | Good | Good |
| Free tier generosity | Best | Limited | Self-host |
| Enterprise workflows | Good | Best | Good |
| Self-hosted option | No | No | Yes |
| Security (managed) | SOC 2, GDPR | SOC 2, ISO 27001 | User-managed |

### Recommendation

Default recommendation: **Sanity** for most projects due to:
- Generous free tier (3 users, 10GB assets)
- Real-time collaborative editing
- Excellent developer experience
- GROQ query language
- Strong security posture

---

## Implementation Steps

### For Sanity

```bash
# Install dependencies
npm i @sanity/client @portabletext/react
npm i -D sanity @sanity/vision

# Initialize Sanity Studio (separate project or embedded)
npx sanity init
```

**Client Configuration:**

```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client';

// PUBLIC client - safe for browser
export const publicClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  // NO TOKEN - public read only
});

// PRIVATE client - server-side only
export const privateClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!, // Never expose to client
});
```

**Security Requirements:**

```typescript
// ALWAYS use GROQ parameters - prevents injection
const query = `*[_type == "post" && slug.current == $slug][0]`;
const post = await client.fetch(query, { slug: userInput });

// NEVER do this - vulnerable to injection
// const query = `*[_type == "post" && slug.current == "${userInput}"][0]`;
```

**Webhook Verification:**

```typescript
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

export async function POST(request: Request) {
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();

  if (!isValidSignature(body, signature!, process.env.SANITY_WEBHOOK_SECRET!)) {
    return new Response('Invalid signature', { status: 401 });
  }

  // Process valid webhook...
}
```

### For Contentful

```bash
npm i contentful
```

```typescript
// lib/contentful.ts
import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Preview client for drafts (server-side only)
export const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
});
```

### For Strapi (Self-Hosted)

```bash
npx create-strapi-app@latest my-cms
```

**Security Hardening:**

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
        },
      },
      frameguard: { action: 'deny' },
      hsts: { maxAge: 31536000, includeSubDomains: true },
    },
  },
  'strapi::cors',
  // ... other middlewares
];
```

---

## Security Checklist

- [ ] API tokens stored in environment variables
- [ ] No tokens exposed to client-side code
- [ ] GROQ queries use parameters (Sanity)
- [ ] Webhook signatures verified
- [ ] Dataset visibility configured correctly
- [ ] CORS properly restricted
- [ ] Rate limiting in place
- [ ] Audit logging enabled

---

## Content Modeling Best Practices

```typescript
// Example schema (Sanity)
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
      ],
    },
  ],
};
```

---

## Environment Variables Template

```bash
# .env.local

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
SANITY_WEBHOOK_SECRET=your-webhook-secret

# Contentful
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_ACCESS_TOKEN=your-access-token
CONTENTFUL_PREVIEW_TOKEN=your-preview-token
CONTENTFUL_ENVIRONMENT=master
```

---

**After setup, verify:**
1. Content fetches correctly
2. No tokens exposed in browser network tab
3. Webhooks trigger on content changes
4. Preview mode works for drafts
