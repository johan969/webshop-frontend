
import type { CreateOrderRequest } from "../types/order";


const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const createOrder = async (order: CreateOrderRequest) => {
  const response = await fetch(`${API_BASE}/orders`, {
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
