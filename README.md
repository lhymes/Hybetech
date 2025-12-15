# Hybetech Website

A modern, performant website for Hybetech - a boutique AI solutions company founded by Larry Hymes and Jeff Blake.

**Live Site**: https://hybe.tech

## Tech Stack

- **Framework**: [Astro 5.x](https://astro.build/) - Static site generator with islands architecture
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Motion](https://motion.dev/) - React animation library (useInView hook)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Hosting**: AWS Lightsail (Ubuntu + nginx)
- **SSL**: Let's Encrypt (auto-renewed via certbot)

## Project Structure

```
src/
├── components/
│   ├── islands/          # React components with client-side interactivity
│   │   ├── AnimatedHero.tsx      # Hero with gradient text shine effect
│   │   ├── AnimatedSection.tsx   # Scroll-triggered fade animations
│   │   ├── AnimatedCard.tsx      # Card entrance animations
│   │   ├── AnimatedCounter.tsx   # Number counting animation
│   │   ├── FloatingElements.tsx  # Floating decorative elements
│   │   └── FrostedImage.tsx      # Images with frosted overlay effect
│   └── layout/           # Static layout components
│       ├── Header.astro
│       └── Footer.astro
├── layouts/
│   └── BaseLayout.astro  # Main page layout with SEO, fonts, etc.
├── lib/
│   ├── constants.ts      # Site config, services, CTAs
│   └── images.ts         # Centralized image URLs (Unsplash + placeholders)
├── pages/
│   ├── index.astro       # Homepage
│   ├── about.astro       # About page
│   ├── contact.astro     # Contact page
│   └── services/
│       ├── consultation.astro
│       ├── training.astro
│       ├── implementation.astro
│       └── development.astro
├── styles/
│   ├── global.css        # Global styles
│   └── design-tokens/    # CSS custom properties
└── content/              # MDX content collections
    ├── blog/
    └── case-studies/

public/
├── images/
│   └── og-image.jpg      # Social sharing image
├── logo/                 # Brand assets
└── favicon.svg

docs/
├── discovery-report.md   # Initial project research
├── design-system.md      # Design system documentation
└── architecture-decision.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Features

### Design

- Dark mode by default with smoked glass vignette effect
- Modern, bold, corporate yet approachable aesthetic
- Responsive design (mobile-first)
- WCAG 2.1 AA accessible

### Animations

- Scroll-triggered reveal animations using CSS transitions (mobile-optimized)
- Hero headline glow effect with character-level shine (desktop only)
- Subtle pulse effects on icons throughout the site
- Sequential staggered animations on cards and sections
- CSS-only hover effects for optimal performance
- Respects `prefers-reduced-motion` via CSS media query

### Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, services overview, case study preview |
| About | `/about` | Company story, founders, values |
| Contact | `/contact` | Contact form, booking info |
| Consultation | `/services/consultation` | AI consultation service |
| Training | `/services/training` | AI training programs |
| Implementation | `/services/implementation` | AI implementation service |
| Development | `/services/development` | Custom AI development |

## Configuration

### Environment Variables

Currently no environment variables required. Future additions:

- `FORMSPREE_ID` - For contact form
- `CALENDLY_URL` - For booking integration

### Fonts

- **Headlines**: Plus Jakarta Sans (Google Fonts)
- **Body**: Inter (Google Fonts)

### Colors

Primary palette uses deep slate/navy tones. See `docs/design-system.md` for full color reference.

## Deployment

Currently deployed to **AWS Lightsail** (Ubuntu 22.04 + nginx).

### Production Server

- **IP**: 50.16.3.15
- **Domain**: hybe.tech (with www redirect)
- **SSL**: Let's Encrypt with auto-renewal
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.

### Deploy Process

```bash
# Build the site
pnpm build

# Deploy to server (requires SSH key)
rsync -avz --delete dist/ ubuntu@50.16.3.15:/var/www/hybetech/
```

### Alternative Hosting

The site is static and can also be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

## TODO

- [x] ~~Run Lighthouse performance audit~~
- [x] ~~Add security headers (HSTS, CSP)~~
- [x] ~~Create OG image for social sharing~~
- [ ] Set up Microsoft Graph email integration (Lambda + API Gateway)
- [ ] Replace placeholder team photos with real professional headshots
- [ ] Integrate Calendly booking widget
- [ ] Set up CI/CD deployment (GitHub Actions)

## Documentation

- [Design System](docs/design-system.md) - Colors, typography, components
- [Discovery Report](docs/discovery-report.md) - Project research and requirements
- [Architecture Decision](docs/architecture-decision.md) - Tech stack rationale

## Authors

- **Larry Hymes** - Co-Founder
- **Jeff Blake** - Co-Founder

## License

Private - All rights reserved
