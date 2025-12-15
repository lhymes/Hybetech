# Quick Meta Tags

Quickly add or update meta tags for a page.

## Usage

```
/quick:meta
```

## Steps

### 1. Identify Target Page

Determine which page needs meta tag updates.

### 2. Generate Meta Tags

```typescript
// Essential meta tags template
export const metadata: Metadata = {
  // Title (50-60 characters)
  title: '[Primary Keyword] - [Secondary] | [Brand]',

  // Description (150-160 characters)
  description: '[Compelling description with keywords and call-to-action]',

  // Canonical URL
  alternates: {
    canonical: 'https://example.com/page',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
  },

  // Open Graph
  openGraph: {
    type: 'website',
    url: 'https://example.com/page',
    title: '[Page Title]',
    description: '[Description]',
    siteName: '[Site Name]',
    images: [{
      url: 'https://example.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: '[Image description]',
    }],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@username',
    title: '[Page Title]',
    description: '[Description]',
    images: ['https://example.com/twitter-image.jpg'],
  },
};
```

### 3. Checklist

Verify:
- [ ] Title is 50-60 characters
- [ ] Description is 150-160 characters
- [ ] Canonical URL is correct
- [ ] OG image is 1200x630px
- [ ] All required tags present

## Output

Complete meta tag configuration for the page.

## Related Commands

- Full SEO: `/workflows:seo`
- Schema: `/tools:schema`
