import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import App from "../App";

// Grupperar tester som kontrollerar att App återställer användarens session
describe("App - återställning av session", () => {
  it("återställer användaren när /auth/me svarar 200", async () => {
    // Renderar App i en simulerad router
    render(
      <MemoryRouter initialEntries={["/welcome"]}>
        <App />
      </MemoryRouter>,
    );

    // Kontrollerar att välkomstsidan visas efter att sessionen återställts
    expect(
      await screen.findByRole("heading", { name: /välkommen/i }),
    ).toBeInTheDocument();
  });

  // Testar att användaren betraktas som utloggad när backend svarar 401
  it("skickar användaren till login när /auth/me svarar 401", async () => {
    // Ändrar MSW:s svar till 401 istället för 200
    server.use(
      http.get("*/auth/me", () => {
        return new HttpResponse(null, { status: 401 });
      }),
    );

    // Startar App på en skyddad sida
    render(
      <MemoryRouter initialEntries={["/welcome"]}>
        <App />
      </MemoryRouter>,
    );

    // Kontrollerar att login-sidan visas istället för welcome
    expect(
      await screen.findByRole("heading", { name: "Logga in" }),
    ).toBeInTheDocument();
  });
});
