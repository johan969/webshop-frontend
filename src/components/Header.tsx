import { useNavigate, Link } from "react-router-dom";
import {
  logout,
  isAuthenticated,
  getCurrentUser,
} from "../service/authService";
import type { CartItem } from "../types/product-cart";
import CartDropdown from "./CartDropdown";
import { useState } from "react";
import type { User } from "../types/authType";

type HeaderProps = {

  user: User | null;
  setUser: (user: User | null) => void;
  cartItems: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onCheckout: () => void;
};

function Header({
  setUser,
  cartItems,
  onIncrease,
  onDecrease,
  onCheckout,
}: HeaderProps) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.roles.includes("ROLE_ADMIN");
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [mobileMenu, setMobileMenu] = useState(false);

 async function logoutHandler() {
    logout();
    setUser(null);
    navigate("/login");
  }
  return (
    <header className="header">
      <div className="logo">E.J.E.A</div>

      <nav className="nav">
        <Link to="/products">Produkter</Link>
      </nav>

      <div className="header-actions">
        {isAuthenticated() && (
          <div className="user-menu">
            <span className="user-name">{currentUser?.username}</span>

            <div className="user-dropdown-menu">
              <button onClick={logoutHandler}>Logga ut</button>

              {isAdmin && <Link to="/admin">Admin</Link>}
            </div>
          </div>
        )}
        <div className="cart-window">
          <button type="button" className="cart-button">
            Kundvagn [{cartCount}]
          </button>

          <CartDropdown
            cartItems={cartItems}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onCheckout={onCheckout}
          />
        </div>
      </div>

      <button
        type="button"
        className="mobile-menu-button"
        aria-label={mobileMenu ? "Stäng meny" : "Öppna meny"}
        aria-expanded={mobileMenu}
        aria-controls="mobile-nav"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {mobileMenu ? "X" : "☰"}
      </button>

      {mobileMenu && (
        <nav id="mobile-nav" className="mobile-nav">
          {isAuthenticated() && (
            <>
              <span className="mobile-user-name">{currentUser?.username}</span>
              {isAdmin && (
                <Link to="/admin" onClick={() => setMobileMenu(false)}>
                  Admin
                </Link>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenu(false);
                  logoutHandler();
                }}
              >
                Logga ut
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
