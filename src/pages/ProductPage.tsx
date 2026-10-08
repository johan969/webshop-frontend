import { useEffect, useState } from "react";
import type { CartItem, Product } from "../types/product-cart";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { categories, type Category } from "../types/category";

function ProductPage() {
  console.log("ProductPage körs");

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  //innehåller vagnens produkter + för att ändra. innehåller en lista av items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  //bestämmer om kundvagn visas
  const [showCart, setShowCart] = useState(false);


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
    <main className="product-page">
      <div className="product-page-header">
        <div>
          <h1>Produkter</h1>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowCart(!showCart)}
        >
          {showCart ? "Dölj kundvagn" : "Visa kundvagn"}
        </button>
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

      {showCart && <Cart items={cartItems} />}

      {error && <p>{error}</p>}

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
    </main>
  );
}

export default ProductPage;
