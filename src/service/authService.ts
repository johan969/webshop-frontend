import type { LoginRequest, TokenResponse } from "../types/authType";

// hämtar adressen till authservice
const API_BASE = import.meta.env.VITE_API_BASE_URL;

/* async då function behöver vänta på svar från backend */
export async function login(request: LoginRequest): Promise<TokenResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  //response.status är där för tillfället för utvecklingssyfte
  if (!response.ok) {
    throw new Error(`Inloggningen misslyckades. Status: ${response.status}`);
  }

  const data: TokenResponse = await response.json();

  //sparar jwt token för kommande autentiserade anrop
  sessionStorage.setItem("accessToken", data.accessToken);

  //sparar övrig user data från auth service
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      username: data.username,
      roles: data.roles,
      expiresIn: data.expiresIn,
    }),
  );

  return data;
}
