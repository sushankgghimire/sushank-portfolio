import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(90),
      description: z.string().min(70).max(170),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string().max(140),
      category: z.enum(['ai', 'web']),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      year: z.number(),
      stack: z.array(z.string()),
      links: z.object({
        live: z.url().optional(),
        repo: z.url().optional(),
      }),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    }),
});

export const collections = { blog, projects };
