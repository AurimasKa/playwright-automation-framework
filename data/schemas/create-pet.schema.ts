import { z } from 'zod';

export const petSchema = z.object({
  id: z.number(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }).nullable(),
  name: z.string(),
  photoUrls: z.array(z.string()),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ).nullable(),
  status: z.string(),
});

