import type { User } from "../../types/authType";

//Skapar testdata som motsvarar lyckat svar från /auth/me
export const mockUser: User = {
  username: "testuser",
  roles: ["USER"],
  expiresIn: 3600,
};