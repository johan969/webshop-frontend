import { useEffect, useState } from "react";
import type { Product } from "../types/product-cart";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";

function ProductPage() {
    console.log("ProductPage körs");

    const [products, setProducts] = useState<Product[]>([]);
     const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try{
                const data = await getProducts();
                 setProducts(data);
            } catch (error: any) {
                setError(error.message);
            }
        }

        loadProducts();
    }, []);

    return (
        <main>
            <h1>Produkter</h1>

            {error && <p>{error}</p>}

            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </main>
    );
}

export default ProductPage;
