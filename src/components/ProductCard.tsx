import type { Product } from "../types/product-cart";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>{product.price} kr</strong>
    </article>
  );
}

export default ProductCard;
