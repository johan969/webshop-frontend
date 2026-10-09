import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="page-not-found">
      <h1>404</h1>
      <h2>Rackarns, sidan kunde inte hittas!</h2>
      <p>Små nätverkstroll har norpat den endpoint som du försöker nå</p>
      <Link to="/login" className="primary-button">
        Tillbaka till login
      </Link>
    </main>
  );
}

export default PageNotFound;
