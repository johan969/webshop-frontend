
import { http, HttpResponse } from "msw";
import type { Product } from "../types/product-cart";
import type { User } from "../types/authType";

const products: Product[] = [
  {
    id: 1,
    name: "Testdator",
    description: "En mockad produkt för tester",
    price: 9999,
    stock: 5,
    category: "COMPUTERS",
    imageUrl: "/testdator.jpg",
  },
  {
    id: 2,
    name: "Testmonitor",
    description: "En mockad produkt för tester",
    price: 1999,
    stock: 10,
    category: "DISPLAYS",
    imageUrl: "/testmonitor.jpg",
  }
];

export const user: User = {
  username: "test@example.com",
  roles: ["ROLE_USER"],
  expiresIn: 3600,
};



export const handlers = [
  http.get("*/auth/me", () => HttpResponse.json(user)),
  http.get("*/products", () => HttpResponse.json(products)),
];
