# Section Component Templates

Full-width page sections with responsive design and accessibility.

## Hero Section

```typescript
// components/sections/Hero.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  image: { src: string; alt: string };
}

export function Hero({ title, subtitle, primaryCta, secondaryCta, image }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <a href={primaryCta.href}>{primaryCta.text}</a>
              </Button>
              {secondaryCta && (
                <Button asChild variant="outline" size="lg">
                  <a href={secondaryCta.href}>{secondaryCta.text}</a>
                </Button>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-square lg:aspect-[4/3]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Features Section

```typescript
// components/sections/Features.tsx
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export function Features({ title, subtitle, features }: FeaturesProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## CTA Section

```typescript
// components/sections/CTA.tsx
import { Button } from '@/components/ui/Button';

interface CTAProps {
  title: string;
  description: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}

export function CTA({ title, description, primaryCta, secondaryCta }: CTAProps) {
  return (
    <section className="py-16 lg:py-24 bg-primary-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            <a href={primaryCta.href}>{primaryCta.text}</a>
          </Button>
          {secondaryCta && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-primary-700"
            >
              <a href={secondaryCta.href}>{secondaryCta.text}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
```

## Testimonials Section

```typescript
// components/sections/Testimonials.tsx
import Image from 'next/image';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

export function Testimonials({ title, testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
          {title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.quote}"
              </p>
              <footer className="flex items-center">
                {testimonial.avatar && (
                  <Image
                    src={testimonial.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="rounded-full mr-3"
                  />
                )}
                <div>
                  <cite className="not-italic font-semibold text-gray-900">
                    {testimonial.author}
                  </cite>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## FAQ Section

```typescript
// components/sections/FAQ.tsx
'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  items: FAQItem[];
}

export function FAQ({ title, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
          {title}
        </h2>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <span className="ml-4" aria-hidden="true">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Usage Notes

- All sections are responsive (mobile-first)
- Sections use semantic HTML (section, h2, etc.)
- Hero image uses priority for LCP optimization
- Avatar images use empty alt for decorative
- FAQ uses aria-expanded for accessibility
- Customize colors via design tokens
