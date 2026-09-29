import type { Product } from "../types/product-cart";

export async function getProducts(): Promise<Product[]> {
  // Byt ut mot aktuell JWT-token
  const token =
    "eyJraWQiOiJ3ZWJzaG9wLWF1dGgta2V5LTEiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwMDAiLCJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXhwIjoxNzkwNjY3NDA0LCJpYXQiOjE3OTA2NjM4MDQsInJvbGVzIjpbIlJPTEVfVVNFUiJdfQ.JHfAvPhs2vEiXuaK-6JkyOPDO_gy8LOmHtiA9h2sMU15fclsZnc6Ny3947Xhhh9Z2U-6X7-o-pZIPbsKfJ-6TsR8Eb5frnHQKXkP4ImCtel8dxQDJL_lKySefYxsb1GG4DgzciNKPgyKE5OFW5KaoxzzCIhkzVTzChsBnczRMCt-U0qLS8dq4r_6f_8p69BqgrH5FjQLhZdqjvYbRWf0gnRGApKf-4PL9Qrl0AUF-S2JrbN88JMh_xHLrL5BuKwbmkUtw0DK4Qmx0uvfC5opPACXZmUFUYpwPfsPoQaEBhS14FfnGPj-Ii1AZ4EGJpIj4uz3gNHKQZskL58EYYE-YA";

  const response = await fetch(`http://localhost:8084/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const products: Product[] = await response.json();

  return products;
}
