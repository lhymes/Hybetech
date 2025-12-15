# Schema Tool

Generate JSON-LD structured data.

## Usage

```
/tools:schema
```

## Steps

### 1. Identify Schema Needs

Based on page types:
- **All sites**: Organization, WebSite
- **All pages**: WebPage, BreadcrumbList
- **Blog**: Article, BlogPosting
- **E-commerce**: Product, Offer
- **FAQ**: FAQPage
- **Events**: Event
- **Local business**: LocalBusiness

### 2. Generate Organization Schema

```typescript
// For homepage
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '[Company Name]',
  url: 'https://example.com',
  logo: 'https://example.com/logo.png',
  sameAs: [
    'https://twitter.com/company',
    'https://linkedin.com/company/company',
    'https://facebook.com/company',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-555-5555',
    contactType: 'customer service',
  },
};
```

### 3. Generate WebPage Schema

```typescript
// For each page
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '[Page Title]',
  description: '[Page description]',
  url: 'https://example.com/page',
  isPartOf: {
    '@type': 'WebSite',
    name: '[Site Name]',
    url: 'https://example.com',
  },
};
```

### 4. Generate BreadcrumbList

```typescript
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://example.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Category',
      item: 'https://example.com/category',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Current Page',
    },
  ],
};
```

### 5. Generate Page-Specific Schemas

**Article/Blog:**
```typescript
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '[Article Title]',
  image: '[Image URL]',
  author: {
    '@type': 'Person',
    name: '[Author Name]',
  },
  publisher: {
    '@type': 'Organization',
    name: '[Publisher]',
    logo: {
      '@type': 'ImageObject',
      url: '[Logo URL]',
    },
  },
  datePublished: '[ISO Date]',
  dateModified: '[ISO Date]',
};
```

**FAQ:**
```typescript
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '[Question]',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '[Answer]',
      },
    },
  ],
};
```

**Product:**
```typescript
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: '[Product Name]',
  image: '[Image URL]',
  description: '[Description]',
  offers: {
    '@type': 'Offer',
    price: '[Price]',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
};
```

### 6. Implement Schema

**Next.js:**
```typescript
// In page component
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      {/* Page content */}
    </>
  );
}
```

**Astro:**
```astro
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### 7. Validate Schema

Use Google's Rich Results Test:
https://search.google.com/test/rich-results

Or Schema.org validator:
https://validator.schema.org/

## Output

- JSON-LD schemas for all page types
- Implementation code
- Validation passed

## Related Commands

- SEO workflow: `/workflows:seo`
- Sitemap: `/tools:sitemap`
