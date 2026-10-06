import { useState } from "react";
import { register } from "../service/authService";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await register({
        username,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Registreringen misslyckades");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1>Skapa ditt konto</h1>

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
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button className="primary-button" type="submit">
            Skapa konto
          </button>
        </form>

        <p className="register-link">
          Har du redan ett konto? <Link to="/login">Logga in</Link>.
        </p>
        {error && <p className="form-error">{error}</p>}
      </div>
    </main>
  );
}

export default RegisterPage;
