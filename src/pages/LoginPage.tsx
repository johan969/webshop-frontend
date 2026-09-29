import { useState } from "react";
import { login } from "../service/authService";

function LoginPage() {
  //vad som skrivs i användarfältet
  const [username, setUsername] = useState("");
  //vad som skrivs i lösenordsfältet
  const [password, setPassword] = useState("");
  //felmeddelande om login misslyckas
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await login({
        username,
        password,
      });
    } catch (error) {
      console.error(error);
      setError("Inloggning misslyckades");
    }
  }

  return (
    <div>
      <h2>Logga in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Användarnamn</label>
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
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Logga in</button>
      </form>
      {/*om error får ett felmeddelande, visas det här*/}
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginPage;
