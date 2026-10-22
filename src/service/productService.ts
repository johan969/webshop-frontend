import type { Product } from "../types/product-cart";
import type { CreateProductData } from "../types/product-cart";

const API_BASE = import.meta.env.VITE_API_BASE_URL;


export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`, {
    method: "GET",

    credentials: "include"
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Error 401: kunde inte verifiera användaren");
    }
    throw new Error(`Kunde inte hämta produkter. Felkod: ${response.status}`);
  }

  const products: Product[] = await response.json();

  return products;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: "GET",
  credentials: "include"
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Error 401: kunde inte verifiera användaren");
    }

    if (response.status === 404) {
      throw new Error("Error 404: Produkten hittades inte");
    }

    throw new Error(`Kunde inte hämta produkt. Felkod: ${response.status}`);
  }

  const product: Product = await response.json();

  return product;
}

export async function createProduct(
  productData: CreateProductData,
): Promise<Product> {
  const response = await fetch(`${API_BASE}/products`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Error 401: kunde inte verifiera användaren");
    }
    if (response.status === 403) {
      throw new Error(
        "Error 403: Du saknar ADMIN-behörighet för att skapa produkter",
      );
    }
    throw new Error(`Kunde inte skapa produkt. Felkod: ${response.status}`);
  }

  const newProduct: Product = await response.json();

  return newProduct;
}
