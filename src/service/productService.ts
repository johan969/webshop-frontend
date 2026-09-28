import type { Product } from "../types/product-cart";

const API_URL = import.meta.env.VITE_API_PRODUCT_SERVICE_URL;

export async function getProducts(): Promise<Product[]> {
    const token = "token";

    const response = await fetch(`${API_URL}/products`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const products: Product[] = await response.json();

    return products;
}