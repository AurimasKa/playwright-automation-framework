import { test as base } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { z } from 'zod';
import { petSchema } from '../data/schemas/create-pet.schema';
import { orderSchema } from '../data/schemas/order.schema';
import { deletePets } from '../helpers/pet.helper';
import { deleteOrders } from '../helpers/order.helper';

export interface TestDataManager {
  pets: z.infer<typeof petSchema>[];
  orders: z.infer<typeof orderSchema>[];
  addPet: (pet: z.infer<typeof petSchema>) => void;
  addOrder: (order: z.infer<typeof orderSchema>) => void;
  addPets: (pets: z.infer<typeof petSchema>[]) => void;
  addOrders: (orders: z.infer<typeof orderSchema>[]) => void;
  cleanup: () => Promise<void>;
}

export const test = base.extend<{
  apiRequest: APIRequestContext;
  testData: TestDataManager;
}>({
  apiRequest: async ({ request }, use) => {
    await use(request);
  },

  testData: async ({ apiRequest }, use) => {
    const testData: TestDataManager = {
      pets: [],
      orders: [],
      addPet: (pet) => {
        testData.pets.push(pet);
      },
      addOrder: (order) => {
        testData.orders.push(order);
      },
      addPets: (pets) => {
        testData.pets.push(...pets);
      },
      addOrders: (orders) => {
        testData.orders.push(...orders);
      },
      cleanup: async () => {
        if (testData.orders.length > 0) {
          await deleteOrders(apiRequest, testData.orders);
        }
        if (testData.pets.length > 0) {
          await deletePets(apiRequest, testData.pets);
        }
        testData.pets = [];
        testData.orders = [];
      },
    };

    await use(testData);
    await testData.cleanup();
  },
});

export const expect = test.expect;


