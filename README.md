# Hybetech Website

A modern, performant website for Hybetech - a boutique AI solutions company founded by Larry Hymes and Jeff Blake.

## Tech Stack

- **Framework**: [Astro 5.x](https://astro.build/) - Static site generator with islands architecture
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Motion](https://motion.dev/) (Framer Motion) - React animation library
- **Language**: TypeScript
- **Package Manager**: pnpm

## Project Structure

```
src/
├── components/
│   ├── islands/          # React components with client-side interactivity
│   │   ├── AnimatedHero.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── AnimatedCard.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── FloatingElements.tsx
│   └── layout/           # Static layout components
│       ├── Header.astro
│       └── Footer.astro
├── layouts/
│   └── BaseLayout.astro  # Main page layout with SEO, fonts, etc.
├── lib/
│   ├── constants.ts      # Site config, services, CTAs
│   └── images.ts         # Centralized image URLs (Unsplash)
├── pages/
│   ├── index.astro       # Homepage
│   ├── about.astro       # About page
│   ├── contact.astro     # Contact page
│   └── services/
│       ├── consultation.astro
│       ├── training.astro
│       ├── implementation.astro
│       └── development.astro
└── styles/
    ├── global.css        # Global styles
    └── design-tokens/    # CSS custom properties

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

- Scroll-triggered reveal animations
- Hero headline glow effect with sweeping illumination
- Subtle pulse effects on icons throughout the site
- Sequential animations on process steps
- CSS-only hover effects for optimal performance
- Respects `prefers-reduced-motion`

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

The site is static and can be deployed to any static hosting:

- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- AWS Lightsail (current)

### Build Output

```bash
pnpm build
# Output in dist/
```

## TODO

- [ ] Configure Formspree form ID
- [ ] Add real client logos to trust bar
- [ ] Integrate Calendly booking widget
- [ ] Replace placeholder team photos
- [ ] Run Lighthouse performance audit
- [ ] Set up CI/CD deployment

## Documentation

- [Design System](docs/design-system.md) - Colors, typography, components
- [Discovery Report](docs/discovery-report.md) - Project research and requirements
- [Architecture Decision](docs/architecture-decision.md) - Tech stack rationale

## Authors

- **Larry Hymes** - Co-Founder
- **Jeff Blake** - Co-Founder

## License

Private - All rights reserved
