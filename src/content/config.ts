/**
 * Content Collections Configuration
 *
 * Defines schemas for blog posts and case studies.
 */

import { defineCollection, z } from 'astro:content';

// Blog posts collection
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Hybetech Team'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Case studies collection
const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string(),
    industry: z.string(),
    services: z.array(z.string()),
    results: z.array(
      z.object({
        metric: z.string(),
        value: z.string(),
        description: z.string().optional(),
      })
    ),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
  'case-studies': caseStudiesCollection,
};
