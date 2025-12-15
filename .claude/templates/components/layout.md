# Layout Component Templates

Core layout components with responsive design and accessibility.

## Header Component

```typescript
// components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logo: React.ReactNode;
  navItems: NavItem[];
  cta?: { text: string; href: string };
}

export function Header({ logo, navItems, cta }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            {logo}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {cta && (
              <Button asChild>
                <Link href={cta.href}>{cta.text}</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{isOpen ? 'Close' : 'Open'} menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {cta && (
                <Button asChild className="mt-2">
                  <Link href={cta.href}>{cta.text}</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

## Footer Component

```typescript
// components/layout/Footer.tsx
import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterProps {
  logo: React.ReactNode;
  description?: string;
  columns: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright: string;
}

export function Footer({ logo, description, columns, socialLinks, copyright }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              {logo}
            </Link>
            {description && (
              <p className="text-gray-400 max-w-sm">{description}</p>
            )}
            {socialLinks && (
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
```

## Container Component

```typescript
// components/layout/Container.tsx
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className, size = 'lg' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-4',
        size === 'sm' && 'max-w-2xl',
        size === 'md' && 'max-w-4xl',
        size === 'lg' && 'max-w-6xl',
        size === 'xl' && 'max-w-7xl',
        size === 'full' && 'max-w-full',
        className
      )}
    >
      {children}
    </div>
  );
}
```

## Section Component

```typescript
// components/layout/Section.tsx
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'div';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'white' | 'gray' | 'primary';
}

export function Section({
  children,
  className,
  as: Component = 'section',
  padding = 'lg',
  background = 'white',
}: SectionProps) {
  return (
    <Component
      className={cn(
        // Padding
        padding === 'none' && 'py-0',
        padding === 'sm' && 'py-8 lg:py-12',
        padding === 'md' && 'py-12 lg:py-16',
        padding === 'lg' && 'py-16 lg:py-24',
        // Background
        background === 'white' && 'bg-white',
        background === 'gray' && 'bg-gray-50',
        background === 'primary' && 'bg-primary-600',
        className
      )}
    >
      {children}
    </Component>
  );
}
```

## Grid Component

```typescript
// components/layout/Grid.tsx
import { cn } from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export function Grid({ children, className, cols = 3, gap = 'md' }: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        // Columns
        cols === 1 && 'grid-cols-1',
        cols === 2 && 'grid-cols-1 md:grid-cols-2',
        cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        cols === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        // Gap
        gap === 'sm' && 'gap-4',
        gap === 'md' && 'gap-6 lg:gap-8',
        gap === 'lg' && 'gap-8 lg:gap-12',
        className
      )}
    >
      {children}
    </div>
  );
}
```

## Usage Notes

- Header includes mobile menu with proper aria attributes
- Footer uses semantic footer element
- Container handles responsive max-width
- Section provides consistent spacing
- Grid is mobile-first responsive
- All components use design tokens
- Touch targets are 44px minimum
