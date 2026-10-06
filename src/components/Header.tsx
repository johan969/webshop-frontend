import { useNavigate, Link } from "react-router-dom";
import {
  logout,
  isAuthenticated,
  getCurrentUser,
} from "../service/authService";

function Header() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.roles.includes("ROLE_ADMIN");

  function logoutHandler() {
    logout();
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
              <button onClick={logoutHandler}>
                Logga ut
              </button>

              {isAdmin && <Link to="/adminProductPage">Admin</Link>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
