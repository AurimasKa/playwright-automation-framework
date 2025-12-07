import { z } from 'zod';
import { petSchema } from '../schemas/create-pet.schema';

export function createPetPayload(): z.infer<typeof petSchema> {
  return {
    id: 0,
    category: {
      id: 0,
      name: 'string'
    },
    name: 'doggie',
    photoUrls: [
      'string'
    ],
    tags: [
      {
        id: 0,
        name: 'string'
      }
    ],
    status: 'available'
  };
}
