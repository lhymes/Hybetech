# Sitemap Tool

Generate or update XML sitemap.

## Usage

```
/tools:sitemap
```

## Steps

### 1. Collect Pages

Identify all public pages:
- Static pages
- Dynamic pages
- Blog posts
- Product pages

### 2. Generate Sitemap

**Next.js (App Router):**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic pages (e.g., blog posts)
  const posts = await getAllPosts();
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}
```

**Astro:**

```javascript
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
});
```

### 3. Set Priorities

Assign priorities:
- Homepage: 1.0
- Main pages: 0.8
- Secondary pages: 0.6
- Blog/news: 0.5
- Archive pages: 0.3

### 4. Configure robots.txt

```
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

### 5. Validate Sitemap

Check:
- [ ] All pages included
- [ ] No duplicate URLs
- [ ] Correct priorities
- [ ] Valid XML format
- [ ] Accessible at /sitemap.xml

### 6. Submit to Search Engines

- Google Search Console
- Bing Webmaster Tools

## Output

- Updated sitemap.ts/xml
- robots.txt configured
- Ready for search engine submission

## Related Commands

- SEO workflow: `/workflows:seo`
- Schema tool: `/tools:schema`
