import { useEffect, useState } from "react";
import type { Product } from "../types/product-cart";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { categories } from "../types/category";

export default function AdminProductPage() {
  console.log("ProductPage körs");

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
    //Sätter default category till ALL, så att alla produkter visas vid första renderingen
    const [selectedCategory, setSelectedCategory] = useState("ALL");
  
    //Lägger till ALL i listan av kategorier
    const categoryOptions = ["ALL", ...categories];
  
    const filteredProducts =
      selectedCategory === "ALL"
        ? products
        : products.filter((product) => product.category === selectedCategory);

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

       <select className="category-select"
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {error && <p>{error}</p>}

      <div className="product-grid">

          {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>

    
    </main>
  );
}