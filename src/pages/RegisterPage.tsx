import { useState } from "react";
import { register } from "../service/authService";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Skapa ditt konto</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">E-post</label>
          <input
            id="username"
            type="email"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Lösenord</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Skapa konto</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default RegisterPage;
