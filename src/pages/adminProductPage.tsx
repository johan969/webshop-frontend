import { useEffect, useState } from "react";
import type { Product } from "../types/product-cart";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
  console.log("ProductPage körs");

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className="admin-product-page">

      <div className="admin-product-page-header">
        <h1>Produkter</h1>
        <Link className="primary-button" to="/create-product">
          Skapa produkt
        </Link>
      </div>
      {error && <p>{error}</p>}

      <div className="product-grid">

          {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>

    
    </main>
  );
}