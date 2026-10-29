import { setupServer } from "msw/node";
import { handlers } from "./handlers";

//Skapar en mockserver som får HTTP-anrop under testerna
export const server = setupServer(...handlers);