import type { CartItem } from "../types/product-cart";

//cart måste få en prop som heter items vilket måste vara en CartItem lista
type CartProps = {
  items: CartItem[];
};

//{items} så att listan kan användas
//p taggen går igenom kundvagnen,visar produktsnamn
//key har id och index för react vill ha unikt key värde, ändras i FE-16
function Cart({ items }: CartProps) {
  return (
    <section className="cart">
      <h2>Kundvagn</h2>

      <div className="cart-items">
        {items.map((item, index) => (
          <p className="cart-item" key={`${item.id}-${index}`}>
            {item.name}
          </p>
        ))}
      </div>
    </section>
  );
}

export default Cart;
