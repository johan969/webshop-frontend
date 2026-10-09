import { getToken } from "./authService";
import type { CreateOrderRequest } from "../types/order";

const API_URL = import.meta.env.VITE_API_ORDER_SERVICE_URL;

export const createOrder = async (
    order: CreateOrderRequest
) => {
    const token = getToken();

    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error("Ordern kunde inte skapas.")
    }
}