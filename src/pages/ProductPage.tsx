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

  //Sätter default category till ALL, så att alla produkter visas vid första renderingen
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  //innehåller texten som användaren skriver i sökfältet
  const [searchTerm, setSearchTerm] = useState("");

  //Lägger till ALL i listan av kategorier
  const categoryOptions = ["ALL", ...categories];

  //trim för att ta bort extra mellanslag och gör till små bokstäver för att kunna jämföra enkelt
  const search = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    //filtrerar genom alla produkter för att se om det ska visas
    const matchCategory =
      selectedCategory === "ALL" || product.category === selectedCategory;

    //kollar om sökordet finns i produktens namn eller beskrivning
    const matchSearch =
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    //returnerar båda filter
    return matchCategory && matchSearch;
  });

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
  }

  function renderFilteredProducts() {
    if (error) {
      return null;
    }
    if (filteredProducts.length === 0) {
      return <p>Inga produkter matchade din sökning</p>;
    }
    return (
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
    );
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

      <input
        type="search"
        placeholder="Sök produkter.."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <select
        className="category-select"
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
      {renderFilteredProducts()}
    </main>
  );
}

export default ProductPage;
