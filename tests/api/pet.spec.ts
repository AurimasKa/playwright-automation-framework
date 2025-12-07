import { test, expect } from '../../fixtures/api.fixture';
import { createPets } from '../../helpers/pet.helper';

test.describe('user creates pet', () => {
  test('user creates 4 pets with status "available"', async ({ apiRequest, testData }) => {
    const petsToCreate = 4;
    const createdPets = await createPets(apiRequest, petsToCreate);

    testData.addPets(createdPets);

    expect(createdPets).toHaveLength(4);
    createdPets.forEach(pet => {
      expect(pet.status).toBe('available');
    });
  });
});