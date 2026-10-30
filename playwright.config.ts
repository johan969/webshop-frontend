import { defineConfig } from "@playwright/test";
import process from "node:process";

//Här talar om vart testfilerna finns samt sätter baseurl så vi inte behöver skriva den varja gång

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5173",
  },

  //vilket commando vi ska gör samt viken adress den förväntar sig.
  webServer: {
    command: "npm run dev -- --host localhost",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
