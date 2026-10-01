import type { Product } from "../types/product-cart";

type ProductCardProps = {
  product: Product;
  //beskriver vad onAdd är, dvs funktion som tar emot product och returnerar void
  onAdd: (product: Product) => void;
};

function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>{product.price} kr</strong>

      <button onClick={() => onAdd(product)}>Lägg i kundvagn</button>
    </article>
  );
}

export default ProductCard;
