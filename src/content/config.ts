import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
