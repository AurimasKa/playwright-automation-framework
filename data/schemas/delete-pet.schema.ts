import { z } from 'zod';

export const deletePetResponseSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
});

export const petNotFoundResponseSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
});

