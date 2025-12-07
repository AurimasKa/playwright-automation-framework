import { test, expect } from '../../fixtures/api.fixture';
import { z } from 'zod';
import { orderRoute } from '../../data/routes';
import { createOrderPayload } from '../../data/payloads/order-pet';
import { orderSchema } from '../../data/schemas/order.schema';
import { generateUniqueId } from '../../utils/id';
import { createPets } from '../../helpers/pet.helper';
import { API_BASE_URL } from '../../data/config';

test.describe('user places multiple orders', () => {
  test('place multiple orders for each created pet', async ({ apiRequest, testData }) => {
    const petsToCreate = 4;
    const ordersPerPet = 2;
    const createdOrders: z.infer<typeof orderSchema>[] = [];

    const createdPets = await createPets(apiRequest, petsToCreate);
    testData.addPets(createdPets);

    expect(createdPets).toHaveLength(petsToCreate);

    for (const pet of createdPets) {
      for (let j = 1; j <= ordersPerPet; j++) {
        const orderPayload = createOrderPayload();
        orderPayload.id = generateUniqueId();
        orderPayload.petId = pet.id;
        orderPayload.quantity = j;
        orderPayload.status = 'placed';
        orderPayload.complete = false;

        const orderResponse = await apiRequest.post(`${API_BASE_URL}${orderRoute.createOrderApi()}`, {
          data: orderPayload,
        });

        expect(orderResponse.status()).toBe(200);

        const orderResponseBody = await orderResponse.json();
        const validatedOrder = orderSchema.parse(orderResponseBody);

        expect(validatedOrder.petId).toBe(pet.id);
        expect(validatedOrder.status).toBe('placed');
        expect(validatedOrder.quantity).toBe(j);

        createdOrders.push(validatedOrder);
      }
    }

    testData.addOrders(createdOrders);

    expect(createdOrders).toHaveLength(petsToCreate * ordersPerPet);
    createdOrders.forEach(order => {
      expect(order.status).toBe('placed');
    });

    // Cleanup happens automatically via testData fixture
  });
});

