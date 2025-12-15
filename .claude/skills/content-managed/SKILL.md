# Content-Managed Skill

**Type**: Behavioral Guardrail
**Priority**: Medium

## Purpose

Design content structures that are CMS-ready from the start. Ensure content is structured, queryable, and secure when integrated with headless CMS platforms.

## Core Behaviors

### Always Do

1. **Structure Content for CMS**
   - Use clear content models (title, body, metadata, relationships)
   - Separate content from presentation
   - Plan for localization from the start
   - Include SEO fields in content types

2. **Secure CMS Integration**
   - Use GROQ parameters, not string interpolation (Sanity)
   - Separate public/private API clients
   - Store API tokens in environment variables
   - Verify webhook signatures

3. **Plan for Content Editing**
   - Make content editable at granular level
   - Use structured rich text (Portable Text, not raw HTML)
   - Configure preview modes for drafts
   - Set up proper content validation

4. **Optimize Queries**
   - Fetch only required fields
   - Use projections to limit response size
   - Implement proper caching strategies
   - Consider CDN for published content

5. **Document Content Models**
   - Define clear content type schemas
   - Document field purposes and constraints
   - Note relationships between content types

### Never Do

1. **Never Expose API Tokens**
   - No tokens in client-side code
   - No tokens in Git repositories
   - No hardcoded credentials anywhere

2. **Never Use String Interpolation in Queries**
   ```typescript
   // NEVER do this (vulnerable to injection)
   const query = `*[_type == "post" && slug.current == "${userInput}"][0]`;

   // ALWAYS do this
   const query = `*[_type == "post" && slug.current == $slug][0]`;
   const post = await client.fetch(query, { slug: userInput });
   ```

3. **Never Skip Validation**
   - Always validate content on input
   - Set max lengths and required fields
   - Validate relationships exist

4. **Never Couple Content to Design**
   - Content should be presentation-agnostic
   - No design-specific classes in content
   - Use semantic structure, not visual

## Quick Reference

```typescript
// Sanity client setup
// PUBLIC client - safe for browser
export const publicClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  // NO TOKEN
});

// PRIVATE client - server only
export const privateClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});
```

```typescript
// Content type schema example
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'seo',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string' },
        { name: 'metaDescription', type: 'text' },
      ],
    },
  ],
};
```

## Trigger Phrases

- "CMS", "content management"
- "Sanity", "Contentful", "Strapi"
- "blog", "posts", "articles"
- "editable content", "dynamic content"
- "content type", "schema"
- "GROQ", "GraphQL"

## Reference

- `.claude/context/cms/headless-cms.md` - Complete CMS integration guide
