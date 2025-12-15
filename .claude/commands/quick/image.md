# Quick Image Optimization

Quickly optimize images for web performance.

## Usage

```
/quick:image
```

## Steps

### 1. Identify Images

Find images that need optimization:
```bash
# Find large images
find . -name "*.png" -o -name "*.jpg" -size +100k
```

### 2. Optimization Checklist

For each image:
- [ ] Convert to WebP/AVIF
- [ ] Resize to appropriate dimensions
- [ ] Add width/height attributes
- [ ] Add descriptive alt text
- [ ] Set lazy loading (below fold)
- [ ] Set priority (above fold/LCP)

### 3. Image Component Usage

**Next.js:**
```typescript
import Image from 'next/image';

// Hero image (LCP - priority)
<Image
  src="/hero.webp"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  priority
/>

// Below-fold image (lazy)
<Image
  src="/photo.webp"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
/>

// Fill container
<div className="relative aspect-video">
  <Image
    src="/photo.webp"
    alt="Descriptive alt text"
    fill
    className="object-cover"
  />
</div>
```

**Astro:**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="Descriptive alt text"
  loading="eager"
/>
```

### 4. Responsive Images

```typescript
<Image
  src="/photo.webp"
  alt="Description"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  width={1200}
  height={800}
/>
```

### 5. Alt Text Guidelines

- **Informative images**: Describe content and purpose
- **Decorative images**: Use empty alt (`alt=""`)
- **Functional images**: Describe the action
- **Complex images**: Brief alt + longer description

## Output

Optimized image implementation with proper attributes.

## Related Commands

- Performance: `/workflows:performance`
- Lighthouse: `/tools:lighthouse`
