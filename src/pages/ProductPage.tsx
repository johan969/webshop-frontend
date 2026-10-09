import { useEffect, useState } from "react";
import type { CartItem, Product } from "../types/product-cart";
import { getProducts } from "../service/productService";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { createOrder } from "../service/orderService";

function ProductPage() {
  console.log("ProductPage körs");

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  //innehåller vagnens produkter + för att ändra. innehåller en lista av items
  {
    /* getItem hämtar tidigare sparad kundvagn */
  }
  {
    /* JSON.parse() omvandlar sparad text till lista */
  }
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  //bestämmer om kundvagn visas
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      return;
    }
    const cartItem: CartItem = {
      ...product, //kopierar all produktinfo
      quantity: 1,
    };

    //tar alla produkter som finns i kundvagn och lägger till den nya sist
    setCartItems((currentItems) => [...currentItems, cartItem]);

    //alert för bekräftelse av senaste tillägg i kundvagn
    alert(`${product.name} har lagts i kundvagnen`);
  }

  function increaseQuantity(productId: number) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(productId: number) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Kundvagnen är tom.");
      return;
    }

    // Skapa ny order
    const orderRequest = {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    // Skickar beställningen till backend
    try {
      await createOrder(orderRequest);

      // Tömmer kundvagnen om beställningen lyckas
      setCartItems([]);
      sessionStorage.removeItem("cart");

      alert("Ordern har skapats.");
    } catch {
      alert("Något gick fel när ordern skulle skapas.");
    }
  };

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

      {/* Funktionerna skickas till Cart som props */}
      {showCart && (
        <Cart
          items={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onCheckout={handleCheckout}
        />
      )}
      {error && <p>{error}</p>}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
    </main>
  );
}

export default ProductPage;
