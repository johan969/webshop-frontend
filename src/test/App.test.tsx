import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, it, expect } from "vitest";
import App from "../App";
 
beforeEach(() => {
  sessionStorage.clear();
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      username: "testuser@email.com",
      roles: ["ROLE_USER"],
      expiresIn: 3600,
    }),
  );
});
 
it("visar produkter för en inloggad användare", async () => {
expect(sessionStorage.getItem("user")).not.toBeNull();
  render(
    <MemoryRouter initialEntries={["/products"]}>
      <App />
    </MemoryRouter>,
  );
 
  expect(await screen.findByText("Laptop")).toBeInTheDocument();
  screen.debug();
});