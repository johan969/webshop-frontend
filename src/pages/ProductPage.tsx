import { useEffect, useState } from "react";
import type { CartItem, Product } from "../types/product-cart";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

function ProductPage() {
  console.log("ProductPage körs");

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  //innehåller vagnens produkter + för att ändra. innehåller en lista av items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  //bestämmer om kundvagn visas
  const [showCart, setShowCart] = useState(false);

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

  function addToCart(product: Product) {
    const cartItem: CartItem = {
      ...product, //kopierar all produktinfo
      quantity: 1,
    };

    //tar alla produkter som finns i kundvagn och lägger till den nya sist
    setCartItems((currentItems) => [...currentItems, cartItem]);

    //alert för bekräftelse av senaste tillägg i kundvagn
    alert(`${product.name} har lagts i kundvagnen`);
  }

  //!showCart byter till det motsatta, så om cart är false så ska den bli true on click
  //showCart ? = om cart visas skrivs dölj annars visa kundvagn
  //showCart && = Om showcart är true rendera cart och produkterna från cart
  return (
    <main>
      <h1>Produkter</h1>
      <button onClick={() => setShowCart(!showCart)}>
        {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
      </button>

      {showCart && <Cart items={cartItems} />}

      {error && <p>{error}</p>}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={addToCart} />
      ))}
    </main>
  );
}

export default ProductPage;
