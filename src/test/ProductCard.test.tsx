import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductCard from "../components/ProductCard"
import type { Product } from "../types/product-cart";


describe("ProductCard", () => {
  it("visar produktinformation", () => {
    const product: Product = {
      id: 1,
      name: "Testprodukt",
      description: "En testprodukt",
      price: 199,
      stock: 10,
    };

    render(<ProductCard product={product} />);

    expect(screen.getByText("Testprodukt")).toBeInTheDocument();
    expect(screen.getByText("En testprodukt")).toBeInTheDocument();
    expect(screen.getByText("199 kr")).toBeInTheDocument();
    
  });
});