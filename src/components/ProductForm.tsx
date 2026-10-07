import { useState } from "react";
import { CreateProductData } from "../types/product-cart";

type ProductFormProps = {
    onSubmit: (product: CreateProductData) => void;
};

//Funktion för att skapa produkt
export default function ProductForm({ onSubmit }: ProductFormProps) {
  // konstanter för vad vi behöver för att skapa en ny produkt, tillsamans med en set metod
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Vi vill inte ladda om sidan när vi skapar en ny produkt
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Vi anropar CreateProduct i productService
    await onSubmit({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
       category,
      imageUrl
      
    });
  };

  // Formulär där vi sätter värdena på våra konstanter
  // setPrice(e.target.value === "" ? "" : Number(e.target.value    Detta gör att om fältet inte är tomt gör vi det till ett numer. annars om fältet var tomt skulle den sätta värdet till 0

  return (
    <form className="product-form" onSubmit={handleSubmit}>
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
            <input
        type="text"
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ImageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      <button className="primary-button" type="submit">
        Spara produkt
      </button>
    </form>
  );
}