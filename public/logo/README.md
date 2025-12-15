# Hybetech Logo System

## Design Philosophy

The Hybetech logo is built on three core principles:

1. **Clarity** - Clean, geometric letterforms ensure legibility at any size
2. **Distinction** - The connection node accent creates instant brand recognition
3. **Meaning** - The extending node suggests connectivity, networks, and AI intelligence

## The Accent Element

The signature element is a small blue node (●) extending from the H's crossbar via a short connector line. This subtle detail:

- Suggests neural networks and AI connectivity
- Creates visual distinction without complexity
- Remains visible at small sizes
- Works as a standalone brand element

## Logo Variants

### Primary Wordmark (`hybetech-wordmark.svg`)
The full "Hybetech" wordmark with accent node. Use this as the primary logo wherever space permits.

- **Minimum width**: 100px (digital), 1 inch (print)
- **Clear space**: Height of the "H" on all sides

### Icon Mark (`hybetech-mark.svg`)
The stylized "H" with connection node. Use for:
- Favicons
- App icons
- Social media avatars
- Small space applications

- **Minimum size**: 24px × 24px
- **Recommended sizes**: 32px, 48px, 64px, 128px, 256px

## Color Specifications

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Letterforms | Adaptive | `currentColor` | Inherits from context |
| Accent Node | Accent Blue | `#3b82f6` | Always this color |
| Light BG | Primary 900 | `#0f172a` | Dark letterforms |
| Dark BG | Primary 100 | `#f1f5f9` | Light letterforms |

## Typography

**Font**: Plus Jakarta Sans Bold (700)

The wordmark uses Plus Jakarta Sans for its:
- Geometric, modern character
- Excellent legibility at all sizes
- Professional yet approachable personality
- Strong "tech company" associations without being cold

## Usage Guidelines

### Do
- Maintain clear space around the logo
- Use on solid or simple gradient backgrounds
- Scale proportionally
- Use the icon mark when space is limited

### Don't
- Stretch or distort the logo
- Change the accent color
- Place on busy backgrounds without contrast
- Recreate the logo in a different font
- Remove or modify the accent node

## File Formats

For production use, export to:
- SVG (web, scalable)
- PNG (raster, with transparency)
- PDF (print)

## Implementation

### HTML/CSS
```html
<img src="/logo/hybetech-wordmark.svg" alt="Hybetech" class="h-8 w-auto" />
```

### Inline SVG (recommended for color control)
```html
<svg class="h-8 w-auto text-white">
  <use href="/logo/hybetech-wordmark.svg#logo" />
</svg>
```

---

*Logo designed with precision for Hybetech - Boutique AI Solutions*
