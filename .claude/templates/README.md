# WebLord Starter Templates

Pre-configured starter templates for rapid project initialization.

## Available Templates

### Framework Starters

| Template | Use Case |
|----------|----------|
| `nextjs/` | Web applications, e-commerce, SaaS, auth-required sites |
| `astro/` | Content sites, blogs, marketing, documentation |

### Component Templates

| Template | Description |
|----------|-------------|
| `components/ui/` | Button, Input, Card, Badge, Alert |
| `components/sections/` | Hero, Features, CTA, Testimonials, FAQ |
| `components/layout/` | Header, Footer, Container, Grid |

## Usage

Templates are referenced during `/workflows:architect` and `/workflows:build` to scaffold the project structure.

### Framework Selection

After running `/workflows:architect`, the appropriate framework template is applied:

```bash
# For Next.js projects
cp -r .wlclaude/templates/nextjs/* ./

# For Astro projects
cp -r .wlclaude/templates/astro/* ./
```

### Component Usage

Components are copied and customized during `/workflows:build`:

```bash
# Copy component template
cp .wlclaude/templates/components/sections/Hero.tsx src/components/sections/
```

## Template Structure

Each framework template includes:

```
[framework]/
├── starter.md          # Setup instructions
├── config/             # Configuration files
├── structure/          # Directory structure
└── files/              # Starter files
```

## Customization

Templates are starting points. After copying:

1. Update with project-specific design tokens
2. Customize component styles
3. Add project-specific functionality
4. Update meta tags and content

## Best Practices

- Templates include security headers pre-configured
- Tailwind CSS with design token integration
- TypeScript strict mode enabled
- ESLint with security rules
- Performance optimizations built-in
