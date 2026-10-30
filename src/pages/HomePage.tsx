import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <header className="header">
        <div className="logo">E.J.E.A</div>
        <nav className="home-page-links">
          <Link className="nav" to="/login">
            {" "}
            Logga in
          </Link>
          <Link className="nav" to="/register">
            {" "}
            Registrera{" "}
          </Link>
        </nav>
      </header>

      <main className="home-page">
        <h1>Välkommen till E.J.E.A</h1>
        <div className="home-page-about">
          <h2>Om oss</h2>
          <p>
            Vi är ett nystartat teknikföretag med en enkel vision. Att göra den
            senaste tekniken tillgänglig för alla. Hos oss hittar du ett brett
            sortiment av noggrant utvalda techprodukter från smidiga
            vardagsprylar till kraftfull elektronik. Vi strävar alltid efter att
            erbjuda hög kvalitet, fantastisk service och en smidig
            shoppingupplevelse.
          </p>
        </div>
        <div className="home-page-about">
          <h2>Bli kund hos oss</h2>
          <div>
            <p>
              För att kunna se vårt sortiment och handla behöver du vara
              inloggad.{" "}
            </p>
            <p>
              <Link to="/login">Logga in</Link> eller{" "}
              <Link to="/register">skapa konto</Link> för att utforska vårt
              sortiment och börja handla.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
