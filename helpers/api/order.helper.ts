import { expect } from '@playwright/test';
import { z } from 'zod';
import { orderRoute } from '../../data/routes';
import { orderSchema } from '../../data/schemas/order.schema';
import { deleteOrderResponseSchema, orderNotFoundResponseSchema } from '../../data/schemas/delete-order.schema';
import { API_BASE_URL } from '../../data/config';

export async function deleteOrders(
  request: any,
  orders: z.infer<typeof orderSchema>[]
): Promise<void> {
  for (const order of orders) {
    try {
      const deleteResponse = await request.delete(`${API_BASE_URL}${orderRoute.deleteOrderApi(order.id)}`);
      
      const status = deleteResponse.status();
      if (status === 200) {
        const responseBody = await deleteResponse.json();
        deleteOrderResponseSchema.parse(responseBody);
      } else if (status === 404) {
        console.log(`Order ${order.id} was already deleted (404)`);
      } else {
        console.warn(`Unexpected status ${status} when deleting order ${order.id}`);
      }
    } catch (error) {
      console.error(`Failed to delete order ${order.id}:`, error);
    }
  }
}

export async function verifyOrdersDeleted(
  request: any,
  orders: z.infer<typeof orderSchema>[]
): Promise<void> {
  for (const order of orders) {
    const getResponse = await request.get(`${API_BASE_URL}${orderRoute.getOrderApi(order.id)}`);
    expect(getResponse.status()).toBe(404);
    
    const errorResponse = await getResponse.json();
    const validatedError = orderNotFoundResponseSchema.parse(errorResponse);
    expect(validatedError.code).toBe(1);
    expect(validatedError.type).toBe('error');
    expect(validatedError.message).toBe('Order not found');
  }
}

