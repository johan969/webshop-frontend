import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest";
import ProductCard from "../components/ProductCard"
import type { Product } from "../types/product-cart";


describe("ProductCard", () => {
    const product: Product = {
      id: 1,
      name: "Testprodukt",
      description: "En testprodukt",
      price: 199,
      stock: 10,
    };

    it("visar produktinformation", () => {
        const mockAdd = vi.fn();

    render(<ProductCard 
            product={product}
            onAdd={mockAdd}
        />
    );

    expect(screen.getByText("Testprodukt")).toBeInTheDocument();
    expect(screen.getByText("En testprodukt")).toBeInTheDocument();
    expect(screen.getByText("199 kr")).toBeInTheDocument();
    
  });

  it("anropar onAdd med korrekt produkt vid klick", async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();

    render(
        <ProductCard
        product={product}
        onAdd={mockAdd}
        />
    );

    await user.click(
        screen.getByRole("button", { name: /lägg i kundvagn/i })
    );

    expect(mockAdd).toHaveBeenCalledWith(product);

    });

});