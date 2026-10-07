import type { Product } from "../types/product-cart";

type ProductCardProps = {
  product: Product;
  //beskriver vad onAdd är, dvs funktion som tar emot product och returnerar void
  onAdd?: (product: Product) => void;
};

function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />

      <div className="product-info">
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.category}</p>
        </div>

        <strong>{product.price} kr</strong>
      </div>

      {onAdd && (
        <button className="primary-button" onClick={() => onAdd(product)}>
          Lägg i kundvagn
        </button>
      )}
    </article>
  );
}

export default ProductCard;
