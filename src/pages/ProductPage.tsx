import { useEffect, useState } from "react";
import type { Product } from "../types/product-cart";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";

function ProductPage() {
    console.log("ProductPage körs");

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            const data = await getProducts();
            setProducts(data);
        }

        loadProducts();
    }, []);

    return (
        <main>
            <h1>Produkter</h1>

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