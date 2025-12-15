# Image Sourcing Workflow

Source high-quality images for web projects with proper licensing and client purchase tracking.

---

## Context Files to Read First

Read these context files before proceeding:
- `.claude/context/images/image-sourcing.md` - Complete image sourcing guide

---

## Quick Reference

### Free Sources (No Purchase Required)

| Source | Best For | Attribution | Rate Limit |
|--------|----------|-------------|------------|
| **Unsplash** | High-quality photos | Appreciated (not required) | 50/hr demo |
| **Pexels** | Photos + Videos | Pexels link required | 200/hr |
| **Pixabay** | Photos, Illustrations, Vectors | Optional | 100/min |

### Premium Sources (Client Purchase Required)

| Source | Pricing | Notes |
|--------|---------|-------|
| **Shutterstock** | ~$0.22-$0.36/image (subscription) | Generate purchase list |
| **Adobe Stock** | From $2.99/image | Enterprise API only |
| **Getty Images** | Premium pricing | Legal indemnification |

---

## Implementation

### Unified Image Search

```typescript
// lib/image-search.ts
import { createApi } from 'unsplash-js';
import { createClient } from 'pexels';

interface ImageResult {
  id: string;
  source: 'unsplash' | 'pexels' | 'pixabay' | 'shutterstock';
  previewUrl: string;
  thumbnailUrl: string;
  photographer?: string;
  photographerUrl?: string;
  purchaseUrl?: string;
  license: 'free' | 'premium';
  attribution?: string;
}

// Unsplash
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

export async function searchUnsplash(query: string): Promise<ImageResult[]> {
  const result = await unsplash.search.getPhotos({
    query,
    perPage: 10,
    orientation: 'landscape',
  });

  return result.response?.results.map(photo => ({
    id: photo.id,
    source: 'unsplash' as const,
    previewUrl: photo.urls.regular,
    thumbnailUrl: photo.urls.thumb,
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    purchaseUrl: photo.links.html,
    license: 'free' as const,
    attribution: `Photo by ${photo.user.name} on Unsplash`,
  })) || [];
}

// Pexels
const pexels = createClient(process.env.PEXELS_API_KEY!);

export async function searchPexels(query: string): Promise<ImageResult[]> {
  const response = await pexels.photos.search({
    query,
    per_page: 10,
    size: 'large',
  });

  if ('photos' in response) {
    return response.photos.map(photo => ({
      id: String(photo.id),
      source: 'pexels' as const,
      previewUrl: photo.src.large,
      thumbnailUrl: photo.src.medium,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      purchaseUrl: photo.url,
      license: 'free' as const,
      attribution: `Photo by ${photo.photographer} on Pexels`,
    }));
  }
  return [];
}

// Search all sources
export async function searchAllSources(query: string): Promise<ImageResult[]> {
  const [unsplashResults, pexelsResults] = await Promise.all([
    searchUnsplash(query),
    searchPexels(query),
  ]);

  return [...unsplashResults, ...pexelsResults];
}
```

### Generate Purchase List for Client

```typescript
// lib/purchase-list.ts
interface SelectedImage {
  id: string;
  source: string;
  description: string;
  purchaseUrl: string;
  license: 'free' | 'premium';
  photographer?: string;
}

export function generatePurchaseList(images: SelectedImage[]): string {
  const premiumImages = images.filter(img => img.license === 'premium');
  const freeImages = images.filter(img => img.license === 'free');

  let markdown = `# Image Purchase List\n\nGenerated: ${new Date().toLocaleDateString()}\n\n`;

  if (premiumImages.length > 0) {
    markdown += `## Images Requiring Purchase\n\n`;
    markdown += `| Description | Source | Purchase Link |\n`;
    markdown += `|-------------|--------|---------------|\n`;
    premiumImages.forEach(img => {
      markdown += `| ${img.description} | ${img.source} | [Purchase](${img.purchaseUrl}) |\n`;
    });
    markdown += `\n`;
  }

  if (freeImages.length > 0) {
    markdown += `## Free Images (Attribution Recommended)\n\n`;
    markdown += `| Description | Source | Photographer | Link |\n`;
    markdown += `|-------------|--------|--------------|------|\n`;
    freeImages.forEach(img => {
      markdown += `| ${img.description} | ${img.source} | ${img.photographer || 'Unknown'} | [View](${img.purchaseUrl}) |\n`;
    });
  }

  return markdown;
}
```

---

## API Setup

### Unsplash

1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create new application
3. Get Access Key

```bash
# .env.local
UNSPLASH_ACCESS_KEY=your-access-key
```

### Pexels

1. Go to [Pexels API](https://www.pexels.com/api/)
2. Sign up and get API key

```bash
# .env.local
PEXELS_API_KEY=your-api-key
```

### Pixabay

1. Go to [Pixabay API](https://pixabay.com/api/docs/)
2. Get API key from your profile

```bash
# .env.local
PIXABAY_API_KEY=your-api-key
```

---

## AI-Generated Images

### Legal Considerations (2025)

**Key Risks:**
- AI-generated content without meaningful human input is NOT copyrightable (US Copyright Office)
- Training data may include copyrighted images
- Pure AI variants don't constitute human authorship

### Safer AI Options

| Provider | Trained On | Commercial Use | Indemnification |
|----------|------------|----------------|-----------------|
| **Adobe Firefly** | Adobe Stock (licensed) | Yes | Yes |
| **Shutterstock AI** | Shutterstock library | Yes | Yes |
| **Getty Images AI** | Getty library | Yes | Yes |

### Recommendations

1. **Prefer licensed stock photos** for commercial projects
2. **If using AI**: Use tools trained on licensed content
3. **Document everything**: Keep records of prompts and sources
4. **Client disclosure**: Inform clients if AI images are used
5. **Avoid specific references**: No artist names or copyrighted characters

---

## Attribution Component

```tsx
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
      <ul className="text-sm text-gray-600">
        {credits.map((credit, index) => (
          <li key={index}>
            {credit.imageDescription} by{' '}
            <a href={credit.photographerUrl} className="underline">
              {credit.photographer}
            </a>{' '}
            on{' '}
            <a href={credit.sourceUrl} className="underline">
              {credit.source}
            </a>
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
- [ ] Download links proxied through server
- [ ] License compliance documented
- [ ] Attribution properly displayed

---

## Workflow for Client Projects

1. **Development Phase**
   - Use free sources (Unsplash, Pexels, Pixabay)
   - Track all image sources and usage

2. **Review Phase**
   - Present selected images to client
   - Generate purchase list for premium images
   - Get approval for final selections

3. **Production Phase**
   - Client purchases premium images
   - Download licensed versions
   - Replace development placeholders
   - Add attribution where required

---

**Remember**: Always generate a purchase list for premium images and document all image sources for legal compliance.
