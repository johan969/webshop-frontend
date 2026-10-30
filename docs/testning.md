# Testa frontendens integration med API:t

Frontendtester kan kontrollera att användargränssnittet reagerar rätt på ett API-svar utan att ansluta till ett riktigt backend. I det här projektet anropar tjänsterna API:t med `fetch`, till exempel hämtar `getProducts` produkter från `/products`. Vitest, React Testing Library och MSW har olika roller i testet:

- **Vitest** kör testerna, erbjuder assertions och hanterar testlivscykeln.
- **React Testing Library (RTL)** renderar React-komponenter i en DOM-miljö och låter testerna hitta och interagera med gränssnittet på ett användarnära sätt.
- **MSW (Mock Service Worker)** fångar nätverksanrop och returnerar förutbestämda svar. Applikationens riktiga `fetch`-anrop och tjänstefunktioner körs alltså, men ingen riktig backend kontaktas.

## Projektets nuläge

Vitest är konfigurerat med `jsdom` och använder `src/test/setup.ts`. React Testing Library finns installerat. Det befintliga testet för `ProductCard` är ett komponenttest: det kontrollerar produktinformationen och att ett klick anropar `onAdd`.

MSW är installerat och konfigurerat för Vitest. Standardhandlers finns i `src/test/handlers.ts`, servern startas från `src/test/server.ts`, och `src/test/setup.ts` startar och stänger servern runt testkörningen. Det finns handlers för `GET /auth/me` och `GET /products`, samt tester av dessa i `src/test/apiHandlers.test.ts`.

## Tre testnivåer

| Testnivå | Vad testas? | Backend och nätverk | Exempel i webshoppen |
|---|---|---|---|
| **Komponenttest** | En isolerad komponent, dess visning och interaktioner med props/callbacks. | Vanligen inget API-anrop; data skickas direkt som props. | Rendera `ProductCard` med en produkt och kontrollera namn, pris och knappens callback. |
| **Frontend-integrationstest** | Flera frontend-delar tillsammans, till exempel en sida, dess tjänstefunktion och hantering av API-svar. | Riktiga frontend-anrop fångas av MSW och får simulerade svar. Ingen riktig backend behövs. | Rendera `ProductPage`, låt `getProducts` anropa `/products` och kontrollera att produkten visas. |
| **End-to-end-test (E2E)** | Ett användarflöde genom den körande applikationen, ofta i en riktig webbläsare. | Vanligen använder testet ett dedikerat test-backend eller en testmiljö. Det kan även använda mockar, men då testar det inte hela frontend–backend-integrationen. | Öppna webbshoppen, logga in, hitta en produkt, lägg den i kundvagnen och slutför ett köp. |

Gränsen mellan komponent- och frontend-integrationstest beror på vad testet avsiktligt omfattar. Ett test av en sida som använder riktiga frontend-tjänster och MSW-svar är ett integrationstest även om det körs i jsdom. Ett E2E-test fokuserar i stället på det sammanhängande flödet genom den körande applikationen.

## Exempel: styra API-svaren i ett test

`src/test/handlers.ts` innehåller standardsvaren. Ett test kan tillfälligt skriva över en handler med `server.use`; `server.resetHandlers()` i testuppsättningen återställer sedan standarden efter varje test:

Ett test av produktsidan kan sedan sätta upp ett simulerat API-svar och kontrollera vad användaren ser:

```tsx
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ProductPage from "../pages/ProductPage";
import { server } from "./server";

describe("ProductPage", () => {
  it("visar produkter från API:t", async () => {
    server.use(
      http.get("*/products", () =>
        HttpResponse.json([
          {
            id: 1,
            name: "Testprodukt",
            description: "En produkt från det simulerade API:t",
            price: 199,
            stock: 10,
            category: "Testkategori",
            imageUrl: "/testprodukt.jpg",
          },
        ]),
      ),
    );

    render(
      <MemoryRouter>
        <ProductPage onAddToCart={() => {}} />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Testprodukt")).toBeInTheDocument();
  });
});
```

`findByText` väntar på att det asynkrona anropet ska slutföras och att produkten ska renderas. Eftersom tjänsten bygger URL:en från `VITE_API_BASE_URL` används `*/products` för att matcha `/products` oavsett API:ts origin. MSW fångar fortfarande bara den här testkörningens anrop.

Standardsvaret för `/auth/me` innehåller en testanvändare och standardsvaret för `/products` innehåller `Testdator`. Om ett test behöver simulera en oinloggad session eller ett API-fel kan det byta ut svaret till exempelvis:

```ts
server.use(
  http.get("*/auth/me", () => new HttpResponse(null, { status: 401 })),
  http.get("*/products", () => HttpResponse.json([], { status: 500 })),
);
```

### Vad testet faktiskt ger för säkerhet

Testet ovan täcker samspelet mellan `ProductPage`, `getProducts`, `fetch` och renderingen av produktkort, inklusive att frontend-koden kan tolka svaret. Det testar **inte** att backendens riktiga endpoint finns, att dess databas fungerar eller att backendens faktiska svar följer kontraktet. Sådana kontroller kräver tester mot backend eller en E2E-/testmiljö med backend.

MSW kan också returnera fel eller specialfall, exempelvis ett `500`-svar eller en tom produktlista. Då går det att kontrollera laddnings-, fel- och tomlägen utan att starta om eller ändra backend.

## Förslag direkt från koden i projektet

### Komponenter att testa

| Komponent | Exempel på test |
|---|---|
| `ProductCard` | Kontrollera namn, beskrivning, pris och bildens alt-text. Klick på **Lägg i kundvagn** ska anropa `onAdd` med rätt produkt. Produkten ska visa **Slutsåld** och ha en inaktiverad knapp när lagersaldot är noll. Det befintliga testet täcker redan visning och callback. |
| `Cart` | Visa tomt läge när listan är tom. För en produkt: kontrollera radpris och totalsumma, att `+` och `-` anropar rätt callback och att `+` är inaktiverad när antalet nått lagersaldot. |
| `ProductForm` | Kontrollera att formulärfält går att fylla i, att submit skickar produktinformationen till `onSubmit` och att obligatoriska fält valideras. |
| `Header` / `CartDropdown` | Kontrollera visat kundvagnsantal och att öka/minska/beställ-knappar anropar callbacks. Testa också inloggat respektive utloggat läge och adminlänk med relevanta användardata. |
| `LoginPage` / `RegisterPage` | Som komponenttester kan du testa formulärinteraktioner och visa felmeddelanden genom att mocka tjänstefunktionerna. För API-hanteringen är ett integrationstest med MSW mer värdefullt. |

Komponenttester bör i första hand testa synligt beteende, inte komponentens interna state. Skicka in exempeldata som props och använd RTL:s `screen` och `userEvent`.

### API-anrop att mocka med MSW

Alla anrop nedan finns i `src/service`. För varje anrop är det bra att testa både ett lyckat svar och minst ett relevant fel-/gränsfall.

| Anrop | Användning i frontend | Exempel på testfall |
|---|---|---|
| `GET /auth/me` | `App` försöker återställa inloggad session vid start. | Svara med en användare och kontrollera att inloggat läge visas. Svara `401` och kontrollera att appen fortsätter som utloggad. |
| `POST /auth/login` | `LoginPage` skickar e-post och lösenord. | Lyckat svar ska leda till `/welcome` och uppdatera användaren. Svara exempelvis `401` och kontrollera felmeddelandet. |
| `POST /auth/register` | `RegisterPage` skapar ett konto. | Lyckat svar ska navigera till `/login`; ett fel ska visa registreringsfel. |
| `POST /auth/logout` | `Header` loggar ut användaren. | Kontrollera att anropet skickas och användaren hamnar på `/login`. Testa även fel från API:t. |
| `GET /products` | `ProductPage` och adminproduktsidan hämtar produktlistan. | Kontrollera laddning → produktkort, tom lista, samt felstatus som `500` eller `401`. På `ProductPage` kan du även testa sökning och kategorifilter på mottagna produkter. |
| `GET /products/:id` | `ProductDetailPage` hämtar detalj för en produkt. | Lyckat svar visar detaljen; `404` visar att produkten inte hittades; `stock: 0` gör köpknappen inaktiv. |
| `POST /products` | `createProduct` skickar formuläret för en ny produkt. | Kontrollera metod, JSON-body och att lyckat svar navigerar tillbaka till `/admin`. Testa särskilt `403` för användare utan adminbehörighet. |
| `POST /orders` | Kundvagnens checkout skickar produkt-ID:n och antal. | Kontrollera att rätt `{ items: [{ productId, quantity }] }` skickas. Vid framgång töms kundvagnen; vid fel visas felnotisen/alerten. |

Exempelvis matchar MSW för login både URL och metod:

```ts
http.post("*/auth/login", () =>
  HttpResponse.json({
    username: "test@example.com",
    roles: ["ROLE_USER"],
    expiresIn: 3600,
  }),
)
```

Anpassa svarets fält efter typerna och API-kontraktet i backend. Använd separata handlers för felvarianter, till exempel `HttpResponse.json({}, { status: 401 })`.

### E2E-flöden att prova

E2E-tester bör utgå från vad en användare gör i webbläsaren och passera flera sidor och delar av appen. För att också kontrollera frontendens verkliga backendintegration behöver flödet använda ett dedikerat test-backend. Om MSW används i webbläsartestet är backend fortfarande mockat.

1. **Inloggning och session:** Öppna appen utloggad, logga in med en testanvändare, kontrollera att användaren kommer till `/welcome` och öppna sedan produkterna.
2. **Lägg produkt i kundvagn:** Hämta produktlistan, öppna en produkt, lägg den i kundvagnen, ändra antal och kontrollera totalsumman.
3. **Skicka beställning:** Lägg en produkt i kundvagnen, skicka beställningen och kontrollera bekräftelsen och att kundvagnen töms. Med ett riktigt test-backend kan du även kontrollera att beställningen sparades.
4. **Registrera konto:** Skapa ett nytt testkonto, kontrollera att appen går till `/login` och logga in med det nya kontot. Använd en unik testadress per körning eller återställ testdata.
5. **Admin skapar produkt:** Logga in som admin, öppna admin-sidan, skapa en produkt och kontrollera att den visas i listan. Kontrollera även att en vanlig användare inte kommer åt admin-rutten.
6. **Logga ut:** Logga ut och kontrollera att användaren kommer till `/login` och inte kan öppna den skyddade `/products`-sidan utan att logga in igen.

Projektet har för närvarande inget E2E-testverktyg konfigurerat. Vanliga alternativ är Playwright och Cypress. Testdata, användarkonton och start av backend behöver ordnas separat så att testerna inte använder produktionsdata.
