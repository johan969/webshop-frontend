function Header() {
  return (
    <header className="header">
      <div className="logo">E.J.E.A</div>

      <nav className="nav">
        <a href="/products">Produkter</a>
      </nav>

      <div className="header-actions">
        <span>User logout here</span>
      </div>
    </header>
  );
}

export default Header;
