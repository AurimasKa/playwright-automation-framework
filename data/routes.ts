export const petRoute = {
    createPetApi: () => '/pet',
    deletePetApi: (petId: number) => `/pet/${petId}`,
    getPetApi: (petId: number) => `/pet/${petId}`,
} as const;

export const orderRoute = {
    createOrderApi: () => '/store/order',
    deleteOrderApi: (orderId: number) => `/store/order/${orderId}`,
    getOrderApi: (orderId: number) => `/store/order/${orderId}`,
} as const;