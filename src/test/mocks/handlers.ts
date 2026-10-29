import { http, HttpResponse } from "msw";
import { mockUser } from "./mockUser";

export const handlers = [
//Fånga GET-anrop till /auth/me
  http.get("*/auth/me", () => {
    //Skickar tillbaka testanvändare
    return HttpResponse.json(mockUser, { status: 200 });
  }),
];