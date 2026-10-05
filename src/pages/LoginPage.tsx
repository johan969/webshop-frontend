import { useState } from "react";
import { login } from "../service/authService";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  //vad som skrivs i användarfältet
  const [username, setUsername] = useState("");
  //vad som skrivs i lösenordsfältet
  const [password, setPassword] = useState("");
  //felmeddelande om login misslyckas
  const [error, setError] = useState("");
  //låter komponenten skicka user till en annan route
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await login({
        username,
        password,
      });

      navigate("/welcome");
    } catch (error) {
      console.error(error);
      setError("Inloggning misslyckades");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1>Logga in</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">* E-post</label>
            <input
              id="username"
              type="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">* Lösenord</label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="primary-button" type="submit">
            Logga in
          </button>
        </form>
        {/*om error får ett felmeddelande, visas det här*/}
        {error && <p className="form-error">{error}</p>}

        <p className="register-link">
          Inget konto? Registrera dig <Link to="/register">här</Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
