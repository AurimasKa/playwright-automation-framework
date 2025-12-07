import { z } from 'zod';
import { orderSchema } from '../schemas/order.schema';

export function createOrderPayload(): z.infer<typeof orderSchema> {
  return {
    id: 0,
    petId: 0,
    quantity: 0,
    shipDate: new Date().toISOString(),
    status: 'placed',
    complete: true,
  };
}

