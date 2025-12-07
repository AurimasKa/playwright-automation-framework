import { expect } from '@playwright/test';
import { z } from 'zod';
import { petRoute } from '../../data/routes';
import { createPetPayload } from '../../data/payloads/create-pet';
import { petSchema } from '../../data/schemas/create-pet.schema';
import { deletePetResponseSchema, petNotFoundResponseSchema } from '../../data/schemas/delete-pet.schema';
import { generateUniqueId } from '../../utils/id';
import { API_BASE_URL } from '../../data/config';

export async function createPets(
  request: any,
  count: number
): Promise<z.infer<typeof petSchema>[]> {
  const createdPets: z.infer<typeof petSchema>[] = [];

  for (let i = 1; i <= count; i++) {
    const payload = createPetPayload();
    payload.name = `pet-${i}`;
    payload.id = generateUniqueId();
    payload.status = 'available';

    const response = await request.post(`${API_BASE_URL}${petRoute.createPetApi()}`, {
      data: payload,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    const validatedPet = petSchema.parse(responseBody);
    
    expect(validatedPet.name).toBe(payload.name);
    expect(validatedPet.status).toBe('available');
    
    createdPets.push(validatedPet);
  }

  return createdPets;
}

export async function deletePets(
  request: any,
  pets: z.infer<typeof petSchema>[]
): Promise<void> {
  for (const pet of pets) {
    try {
      const deleteResponse = await request.delete(`${API_BASE_URL}${petRoute.deletePetApi(pet.id)}`, {
        headers: {
          'api_key': 'special-key' // Should be Taken from environment variables
        }
      });
      
      const status = deleteResponse.status();
      if (status === 200) {
        const responseBody = await deleteResponse.json();
        deletePetResponseSchema.parse(responseBody);
      } else if (status === 404) {
        console.log(`Pet ${pet.id} was already deleted (404)`);
      } else {
        console.warn(`Unexpected status ${status} when deleting pet ${pet.id}`);
      }
    } catch (error) {
      console.error(`Failed to delete pet ${pet.id}:`, error);
    }
  }
}

export async function verifyPetsDeleted(
  request: any,
  pets: z.infer<typeof petSchema>[]
): Promise<void> {
  for (const pet of pets) {
    const getResponse = await request.get(`${API_BASE_URL}${petRoute.getPetApi(pet.id)}`);
    expect(getResponse.status()).toBe(404);
    
    const errorResponse = await getResponse.json();
    const validatedError = petNotFoundResponseSchema.parse(errorResponse);
    expect(validatedError.code).toBe(1);
    expect(validatedError.type).toBe('error');
    expect(validatedError.message).toBe('Pet not found');
  }
}

