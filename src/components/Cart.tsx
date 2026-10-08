import type { CartItem } from "../types/product-cart";

//cart måste få en prop som heter items vilket måste vara en CartItem lista
type CartProps = {
  items: CartItem[];
};

//{items} så att listan kan användas
//p taggen går igenom kundvagnen,visar produktsnamn
//key har id och index för react vill ha unikt key värde, ändras i FE-16
function Cart({ items }: CartProps) {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <section className="cart">
      <h2>Kundvagn</h2>
      {/* Om kundvagnen är tom visas '0'*/}
      {items.length === 0 && <p>Din kundvagn är tom.</p>}

      <div className="cart-items">
        {items.map((item, index) => (
          <p className="cart-item" key={`${item.id}-${index}`}>
            {/* Visar antal av varan och dess pris i kundvagnen. */}
            {item.name} – Antal: {item.quantity} – Pris: {item.price} kr –
            Radpris: {item.price * item.quantity} kr
          </p>
        ))}
      </div>
      <p>Totalt: {totalPrice} kr</p>
    </section>
  );
}

export default Cart;
