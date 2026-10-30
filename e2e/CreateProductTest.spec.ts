import { test, expect } from "@playwright/test";
import process from "node:process";

// Testet kräver att produktservice, gateway och auth-service körs lokalt.

test("admin kan skapa en produkt", async ({ page }) => {
  const username = process.env.E2E_ADMIN_USERNAME;
  const password = process.env.E2E_ADMIN_PASSWORD;

  if (!username || !password) {
    test.skip(
      true,
      "Ange E2E_ADMIN_USERNAME och E2E_ADMIN_PASSWORD för att köra testet.",
    );
    return;
  }

  //vi går till login och fyller i användarnamn och lösen
  await page.goto("/login");
  await page.getByLabel(/e-post/i).fill(username);
  await page.getByLabel(/lösenord/i).fill(password);

  //klicakr logga in
  await page.getByRole("button", { name: "Logga in" }).click();

  // kontrollerar att vi är på rätt sida
  await expect(page).toHaveURL(/\/welcome$/);



  // inann vi går till admin sidan där produkter också synns skapar vi en lysnar och det är ett GET enrop till gateway/products
  const productsResponsePromise = page.waitForResponse(
  (response) =>
    response.url().includes("gateway/products") &&
    response.request().method() === "GET",
);



  // vi går till /admin
  await page.goto("/Admin");


  // vi kontrollerar att att vi får response.ok
  const productsResponse = await productsResponsePromise;
expect(productsResponse.ok()).toBeTruthy();


// vi räkanr hur många produkt-cards det finns, så vi kan se att det har lagts till en
const productCards = page.locator(".product-grid .product-card");
const initialProductCount = await productCards.count();

// Vi klicakr på skapar produkt
  await page.getByRole("link", { name: "Skapa produkt" }).click();

  // Fyller i skapa produkt sidan
  await page.getByPlaceholder("Produktnamn").fill("NyTestProduct");
  await page
    .getByPlaceholder("Beskrivning")
    .fill("Skapad av Playwright E2E-test");
  await page.getByPlaceholder("Pris").fill("1999");
  await page.getByPlaceholder("Lagersaldo").fill("5");
  await page.getByPlaceholder("ImageUrl").fill("example.img");
  await page.locator("select").selectOption("COMPUTERS");

  // innan vi skapar produkten så skapar vi våran lysnare som vi sedan kan kontrollera
  // när vi klickar på skapa produkt så görs ett POST anrop till gateway/products
  const createProductResponse = page.waitForResponse(
    (response) =>
      response.url().includes("gateway/products") &&
      response.request().method() === "POST",
  );

  // skapar produkten
  await page.getByRole("button", { name: "Spara produkt" }).click();

  //kontrollerar att vi fick response.ok och om vi får !response.ok så får vi vårat felmedelande urskrivet
  const response = await createProductResponse;
  expect(
    response.ok(),
    `Produkt-API svarade ${response.status()}: ${await response.text()}`,
  ).toBeTruthy();

  // vi ska nu vara tillbaka på /admin så vi kontrollerar det
  await expect(page).toHaveURL(/\/admin$/);


  // Vi kontrollerar att finns en mer product-card
  await expect(productCards).toHaveCount(initialProductCount + 1);

  // vi kontrollerar att våran nya produkt finns OBS! dennna metod går inte ignom om du kör testet mer än 1gg.
 /*
 await expect(
    page.getByRole("heading", { name: "TestProduct" }),
  ).toBeVisible();
 */


});
