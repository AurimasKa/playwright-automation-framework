import { z } from 'zod';

export const deleteOrderResponseSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
});

export const orderNotFoundResponseSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
});

