import "@testing-library/jest-dom/vitest";
import { beforeAll, afterAll, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "../mocks/server";


beforeAll(() => {
  server.listen({ 
    onUnhandledRequest: 'error',

   });
});

afterEach(() => {
    cleanup();
    server.resetHandlers();
});

afterAll(() => {
    server.close();
});