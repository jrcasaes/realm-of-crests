import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { readerEnabled } from './lib/book.server.mjs';

const livro = defineCollection({
  loader: readerEnabled ? glob({ pattern: '*.md', base: './content/livro-i', generateId: ({ data }) => String(data.chapter) }) : async () => [],
  schema: z.object({
    book: z.literal('livro-i'), chapter: z.number().int().min(1).max(24),
    roman: z.string(), title: z.string(), slug: z.string(), lang: z.literal('pt-BR'),
  }),
});
export const collections = { livro };
