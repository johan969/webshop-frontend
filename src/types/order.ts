export type CreateOrderRequest = {
    items: CreateOrderItemRequest[];
}

export type CreateOrderItemRequest = {
    productId: number;
    quantity: number;
}