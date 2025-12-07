import { z } from 'zod';

export const orderSchema = z.object({
  id: z.number(),
  petId: z.number(),
  quantity: z.number(),
  shipDate: z.string(),
  status: z.enum(['placed', 'approved', 'delivered']),
  complete: z.boolean(),
});

