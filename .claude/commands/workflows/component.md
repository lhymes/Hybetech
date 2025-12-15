# Add Component Workflow

Create a new reusable component.

## Usage

```
/workflows:component <component-name>
```

Examples:
- `/workflows:component PricingCard`
- `/workflows:component TestimonialSlider`
- `/workflows:component NewsletterForm`
- `/workflows:component FeatureGrid`

## Steps

### 1. Validate Request

- Verify component name is provided
- Check component doesn't already exist
- Determine component type (UI, Section, Layout)

### 2. Gather Requirements

Determine:
- Component purpose
- Props/parameters needed
- Variants (if any)
- Accessibility requirements
- Responsive behavior

### 3. Create Component File

**React (Next.js):**
```typescript
// src/components/[category]/[ComponentName].tsx
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  variant?: 'primary' | 'secondary';
  className?: string;
  children?: React.ReactNode;
}

export function ComponentName({
  variant = 'primary',
  className,
  children,
}: ComponentNameProps) {
  return (
    <div className={cn('base-styles', variantStyles[variant], className)}>
      {children}
    </div>
  );
}

const variantStyles = {
  primary: 'primary-styles',
  secondary: 'secondary-styles',
};
```

**Astro:**
```astro
---
// src/components/[ComponentName].astro
interface Props {
  variant?: 'primary' | 'secondary';
  class?: string;
}

const { variant = 'primary', class: className } = Astro.props;
---

<div class:list={['base-styles', variant, className]}>
  <slot />
</div>
```

### 4. Apply Design System

Use existing tokens:
- Colors from `design-tokens/colors`
- Typography from `design-tokens/typography`
- Spacing from `design-tokens/spacing`
- Component patterns from `design-tokens/components`

### 5. Ensure Accessibility

Implement:
- Semantic HTML elements
- ARIA attributes (if needed)
- Keyboard navigation (for interactive)
- Focus management (for modals/dialogs)
- Screen reader text (if needed)

### 6. Handle Responsive

Design for:
- Mobile first (320px base)
- Tablet breakpoint (768px)
- Desktop breakpoint (1024px)
- Large desktop (1280px)

### 7. Create Variants

If multiple variants needed:
- Define variant props
- Create variant styles
- Ensure consistent interface

### 8. Document Component

Add JSDoc/TSDoc:
```typescript
/**
 * ComponentName - Brief description
 *
 * @param variant - Visual style variant
 * @param className - Additional CSS classes
 *
 * @example
 * <ComponentName variant="primary">Content</ComponentName>
 */
```

### 9. Export Component

Add to component index:
```typescript
// src/components/index.ts
export { ComponentName } from './[category]/ComponentName';
```

## Component Categories

**UI Components** (`src/components/ui/`):
- Button, Input, Card, Badge, Alert
- Single-purpose, highly reusable

**Section Components** (`src/components/sections/`):
- Hero, Features, Testimonials, FAQ, CTA
- Full-width page sections

**Layout Components** (`src/components/layout/`):
- Header, Footer, Container, Grid
- Page structure elements

## Output

At completion:
- Component file created
- TypeScript types defined
- Design system applied
- Accessibility implemented
- Exported from index

## Related Commands

- Add page: `/workflows:page`
- Full build: `/workflows:build`
