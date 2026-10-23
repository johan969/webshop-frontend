
import type { CreateOrderRequest } from "../types/order";

const API_URL = import.meta.env.VITE_API_ORDER_SERVICE_URL;

export const createOrder = async (order: CreateOrderRequest) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Ordern kunde inte skapas.");
  }
};
