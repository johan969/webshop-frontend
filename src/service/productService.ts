import type { Product } from "../types/product-cart";


  const getAuthHeaders = (): HeadersInit => {
  const token = sessionStorage.getItem('accessToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};



export async function getProducts(): Promise<Product[]> {
  
  const response = await fetch(`http://localhost:8084/products`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if(!response.ok){
    if(response.status === 401){
      throw new Error("Error 401: kunde inte verifiera användaren");
    }
    throw new Error("Kunde inte hämta producter. Felkod:${response.status}");
  }

  const products: Product[] = await response.json();

  return products;
}
