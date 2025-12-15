# Image Sourcing Guide

**Purpose**: Secure, legal image sourcing for WebLord websites
**Updated**: December 2025
**Sources**: Unsplash, Pexels, Shutterstock, Adobe Stock documentation

---

## Overview

WebLord projects need high-quality images. This guide covers:
- Free stock photo APIs
- Premium stock photo APIs
- AI-generated image considerations
- Licensing compliance
- Implementation patterns

---

## Free Stock Photo APIs

### Unsplash API

**Best For**: High-quality photography, no attribution required

```typescript
// lib/unsplash.ts
import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

// Search for images
export async function searchImages(query: string, page = 1, perPage = 10) {
  const result = await unsplash.search.getPhotos({
    query,
    page,
    perPage,
    orientation: 'landscape',
  });

  return result.response?.results.map(photo => ({
    id: photo.id,
    url: photo.urls.regular,
    thumbnailUrl: photo.urls.thumb,
    downloadUrl: photo.links.download,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    altDescription: photo.alt_description,
    // For purchase tracking
    unsplashUrl: photo.links.html,
  }));
}
```

**Rate Limits**: 50 requests/hour (demo), unlimited (production approved)

**Licensing**:
- Free for commercial use
- No attribution required (but appreciated)
- Cannot resell photos as-is
- Cannot use in competing stock photo service

### Pexels API

**Best For**: Photos AND videos, user-friendly API

```typescript
// lib/pexels.ts
import { createClient } from 'pexels';

const pexels = createClient(process.env.PEXELS_API_KEY!);

export async function searchPexelsImages(query: string, perPage = 15) {
  const response = await pexels.photos.search({
    query,
    per_page: perPage,
    size: 'large',
  });

  if ('photos' in response) {
    return response.photos.map(photo => ({
      id: photo.id,
      url: photo.src.large,
      thumbnailUrl: photo.src.medium,
      originalUrl: photo.src.original,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      altDescription: photo.alt || query,
      // Purchase link for client
      pexelsUrl: photo.url,
    }));
  }
  return [];
}
```

**Rate Limits**: 200 requests/hour, 20,000 requests/month

**Licensing**:
- Free for commercial use
- Attribution not required (but recommended)
- Must display Pexels link when using API
- Cannot sell unmodified photos

### Pixabay API

**Best For**: Illustrations, vectors, and photos

```typescript
// lib/pixabay.ts
export async function searchPixabay(query: string, imageType = 'photo') {
  const params = new URLSearchParams({
    key: process.env.PIXABAY_API_KEY!,
    q: query,
    image_type: imageType, // 'photo', 'illustration', 'vector'
    safesearch: 'true',
    per_page: '20',
  });

  const response = await fetch(`https://pixabay.com/api/?${params}`);
  const data = await response.json();

  return data.hits.map((image: any) => ({
    id: image.id,
    url: image.largeImageURL,
    thumbnailUrl: image.previewURL,
    tags: image.tags,
    user: image.user,
    pixabayUrl: image.pageURL,
  }));
}
```

---

## Premium Stock Photo APIs

### Shutterstock API

**Best For**: High-volume, premium quality, video included

```typescript
// lib/shutterstock.ts
export async function searchShutterstock(query: string) {
  const response = await fetch(
    `https://api.shutterstock.com/v2/images/search?query=${encodeURIComponent(query)}&per_page=20`,
    {
      headers: {
        Authorization: `Bearer ${process.env.SHUTTERSTOCK_API_TOKEN}`,
      },
    }
  );

  const data = await response.json();

  return data.data.map((image: any) => ({
    id: image.id,
    previewUrl: image.assets.preview.url,
    thumbnailUrl: image.assets.small_thumb.url,
    description: image.description,
    // Purchase link for client
    purchaseUrl: `https://www.shutterstock.com/image-photo/${image.id}`,
    // Estimated price (check current pricing)
    estimatedPrice: '$2.90 - $9.80',
  }));
}
```

**Pricing**: Custom (contact sales), ~$0.22-$0.36/image on subscription

### Adobe Stock API

**Best For**: Creative Cloud integration, premium quality

```typescript
// lib/adobe-stock.ts
export async function searchAdobeStock(query: string) {
  const searchParams = new URLSearchParams({
    'search_parameters[words]': query,
    'search_parameters[limit]': '20',
    'result_columns[]': 'id,title,thumbnail_url,comp_url',
  });

  const response = await fetch(
    `https://stock.adobe.io/Rest/Media/1/Search/Files?${searchParams}`,
    {
      headers: {
        'x-api-key': process.env.ADOBE_STOCK_API_KEY!,
        'x-product': 'WebLord/1.0',
      },
    }
  );

  const data = await response.json();

  return data.files.map((file: any) => ({
    id: file.id,
    title: file.title,
    thumbnailUrl: file.thumbnail_url,
    compUrl: file.comp_url, // Watermarked preview
    purchaseUrl: `https://stock.adobe.com/${file.id}`,
    estimatedPrice: 'From $2.99/image',
  }));
}
```

**Note**: As of November 2024, Adobe Stock API is only available to Enterprise customers.

---

## AI-Generated Images: Legal Considerations

### Current Legal Status (2025)

**U.S. Copyright Office Position**:
- AI-generated content without meaningful human input is NOT copyrightable
- Works that meaningfully transform AI output MAY be copyrightable
- Simply selecting from AI variants is NOT sufficient human authorship

**Key Risks**:
1. **Training Data Issues**: AI models may have trained on copyrighted images
2. **No Copyright Protection**: Clients cannot copyright pure AI images
3. **Infringement Risk**: AI might reproduce recognizable copyrighted elements
4. **TOS Violations**: Platform terms may restrict commercial use

### Safer AI Options

```typescript
// Prefer AI tools trained on licensed content
const SAFER_AI_OPTIONS = [
  {
    name: 'Adobe Firefly',
    trainedOn: 'Adobe Stock (licensed)',
    commercialUse: true,
    indemnification: true, // Adobe provides IP indemnification
  },
  {
    name: 'Shutterstock AI',
    trainedOn: 'Shutterstock library (licensed)',
    commercialUse: true,
    indemnification: true,
  },
  {
    name: 'Getty Images AI',
    trainedOn: 'Getty library (licensed)',
    commercialUse: true,
    indemnification: true,
  },
];
```

### Recommendations

1. **Prefer licensed stock photos** for commercial projects
2. **If using AI images**: Use tools trained on licensed content (Adobe Firefly, Shutterstock AI)
3. **Document everything**: Keep records of AI prompts and sources
4. **Client disclosure**: Inform clients if AI images are used
5. **Avoid specific references**: Don't prompt with artist names or copyrighted characters

---

## Implementation Pattern

### Unified Image Search Component

```typescript
// lib/image-search.ts
interface ImageResult {
  id: string;
  source: 'unsplash' | 'pexels' | 'pixabay' | 'shutterstock';
  previewUrl: string;
  thumbnailUrl: string;
  photographer?: string;
  purchaseUrl?: string;
  license: 'free' | 'premium';
  attribution?: string;
}

export async function searchAllSources(query: string): Promise<ImageResult[]> {
  const [unsplashResults, pexelsResults, pixabayResults] = await Promise.all([
    searchUnsplash(query),
    searchPexels(query),
    searchPixabay(query),
  ]);

  // Combine and normalize results
  return [
    ...unsplashResults.map(img => ({ ...img, source: 'unsplash', license: 'free' })),
    ...pexelsResults.map(img => ({ ...img, source: 'pexels', license: 'free' })),
    ...pixabayResults.map(img => ({ ...img, source: 'pixabay', license: 'free' })),
  ];
}

// Generate purchase list for client
export function generatePurchaseList(selectedImages: ImageResult[]): string {
  const premiumImages = selectedImages.filter(img => img.license === 'premium');

  if (premiumImages.length === 0) {
    return 'All selected images are free to use with attribution.';
  }

  return `
## Images Requiring Purchase

${premiumImages.map(img => `- [${img.id}](${img.purchaseUrl}) - ${img.source}`).join('\n')}

## Free Images (Attribution Recommended)

${selectedImages.filter(img => img.license === 'free').map(img =>
  `- ${img.source}: ${img.photographer || 'Unknown'} - ${img.purchaseUrl || img.previewUrl}`
).join('\n')}
`;
}
```

---

## Attribution Best Practices

### When Attribution Is Required

```html
<!-- Pexels attribution (recommended) -->
<figure>
  <img src="/images/hero.webp" alt="Mountain landscape" />
  <figcaption>
    Photo by <a href="[photographer_url]">John Doe</a> on
    <a href="https://pexels.com">Pexels</a>
  </figcaption>
</figure>

<!-- Unsplash attribution (appreciated but not required) -->
<small>Photo by John Doe on Unsplash</small>
```

### Credits Page

```typescript
// components/ImageCredits.tsx
interface ImageCredit {
  imageDescription: string;
  photographer: string;
  photographerUrl: string;
  source: string;
  sourceUrl: string;
}

export function ImageCredits({ credits }: { credits: ImageCredit[] }) {
  return (
    <section aria-labelledby="image-credits">
      <h2 id="image-credits">Image Credits</h2>
      <ul>
        {credits.map((credit, index) => (
          <li key={index}>
            {credit.imageDescription} by{' '}
            <a href={credit.photographerUrl}>{credit.photographer}</a> on{' '}
            <a href={credit.sourceUrl}>{credit.source}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

## Security Checklist

- [ ] API keys stored in environment variables
- [ ] API keys NEVER exposed to client-side
- [ ] Rate limiting implemented
- [ ] Image URLs validated before use
- [ ] Download links proxied through server (not direct API exposure)
- [ ] License compliance documented
- [ ] Attribution properly displayed where required

---

## Quick Reference

| Source | Free | Attribution | Rate Limit | API Docs |
|--------|------|-------------|------------|----------|
| Unsplash | Yes | Appreciated | 50/hr (demo) | [docs](https://unsplash.com/developers) |
| Pexels | Yes | Pexels link | 200/hr | [docs](https://www.pexels.com/api/) |
| Pixabay | Yes | Optional | 100/min | [docs](https://pixabay.com/api/docs/) |
| Shutterstock | No | N/A | Custom | [docs](https://www.shutterstock.com/developers) |
| Adobe Stock | No | N/A | Custom | [docs](https://developer.adobe.com/stock/) |

---

**Remember**: Always generate a purchase list for premium images and document all image sources for legal compliance.
