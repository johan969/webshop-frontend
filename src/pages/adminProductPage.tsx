import { useEffect, useState } from "react";
import type { Product } from "../types/product-cart";
import { getProducts, CreateProduct } from "../service/productService";
import ProductCard from "../components/ProductCard";

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
    <main>
      <h1>Produkter</h1>
      <CreateProductForm />

      {error && <p>{error}</p>}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
}

//Funktion för att skapa produkt
function CreateProductForm() {
  // konstanter för vad vi behöver för att skapa en ny produkt, tillsamans med en set metod
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");

  // Vi vill inte ladda om sidan när vi skapar en ny produkt
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Vi anropar CreateProduct i productService
    await CreateProduct({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
    });
  };

  // Formulär där vi sätter värdena på våra konstanter
  // setPrice(e.target.value === "" ? "" : Number(e.target.value    Detta gör att om fältet inte är tomt gör vi det till ett numer. annars om fältet var tomt skulle den sätta värdet till 0

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Produktnamn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Pris"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
      />
      <input
        type="number"
        placeholder="Lagersaldo"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
      />

      <button type="submit">Spara produkt</button>
    </form>
  );
}
